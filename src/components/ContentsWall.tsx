'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { CoverSheet, type CoverSheetData } from '@/components/CoverSheet'
import { duration, enterT, exitT, reducedT } from '@/lib/motion'
import { usePageVisible } from '@/lib/usePageVisible'

/* NEW — the contents wall: one tile per company that has a case study, newest first, then
   a Resume tile. Mixed widths (5 / 4 / 3 of 12 columns) and aspect ratios, with staggered
   top edges like magazine cover lines. Built on flex-wrap + flex-basis so it collapses on
   its own: two up on tablets, one column on phones, with the stagger removed.

   Each tile's image is a layered composition (a back plate and 2-3 offset screens). On a
   desktop with a fine pointer, hover or focus lifts the tile, plays a muted loop if the
   tile has one, and settles the cover sheet onto the image. Video never loads on touch
   or narrower screens, and pauses when the tab is hidden. Elsewhere the cover sheet sits
   below the tile, always visible. */

export type ContentsTile = {
  id: string
  href: string
  company: string
  role: string
  years: string
  title: string
  current?: boolean
  plate: 'warm' | 'cool' | 'neutral'
  screens: { src: string; alt: string }[]
  video?: string
  sheet: CoverSheetData
}

// Basis per position. 48px = the two 24px gaps in a full row of three.
const SLOTS = [
  { basis: 'lg:basis-[calc((100%-48px)*5/12)]', aspect: 'aspect-[4/3]', offset: 'lg:mt-0' },
  { basis: 'lg:basis-[calc((100%-48px)*4/12)]', aspect: 'aspect-[4/5]', offset: 'lg:mt-16' },
]
const RESUME_SLOT = 'lg:basis-[calc((100%-48px)*3/12)] lg:mt-8'
const STACK = 'basis-full sm:basis-[calc(50%-12px)]'

// Offsets for up to three screens, back to front
const SCREEN_POS = [
  { left: '7%', top: '9%', width: '64%' },
  { left: '27%', top: '27%', width: '64%' },
  { left: '15%', top: '45%', width: '62%' },
]

const PLATE = {
  warm: 'bg-accent-subtle',
  cool: 'bg-success-fill',
  neutral: 'bg-foundation-100',
}

const REVEAL_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 1280px)'

const focusRing =
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-4 focus-visible:ring-offset-body'

/** null until mounted, so the first paint is decided by CSS rather than a guess. */
function useCanReveal() {
  const [can, setCan] = useState<boolean | null>(null)
  useEffect(() => {
    const mq = window.matchMedia(REVEAL_QUERY)
    const update = () => setCan(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return can
}

const lift: Variants = {
  rest: { y: 0, transition: exitT(duration.base) },
  open: { y: -12, transition: enterT(duration.base) },
}

const settle: Variants = {
  hidden: { opacity: 0, y: 8, transition: exitT(duration.base) },
  shown:  { opacity: 1, y: 0, transition: enterT(duration.base) },
}

const fade: Variants = {
  hidden: { opacity: 0, transition: reducedT(duration.base) },
  shown:  { opacity: 1, transition: reducedT(duration.base) },
}

function Tile({
  tile,
  slot,
  fileNo,
  canReveal,
}: {
  tile: ContentsTile
  slot: (typeof SLOTS)[number]
  fileNo: string
  canReveal: boolean | null
}) {
  const prefersReduced = useReducedMotion()
  const pageVisible = usePageVisible()
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const open = hovered || focused
  const videoRef = useRef<HTMLVideoElement>(null)

  const titleId = `${tile.id}-tile-title`
  const sheetId = `${tile.id}-tile-sheet`
  const sheetState = canReveal === null ? undefined : canReveal && !open ? 'hidden' : 'shown'
  const withVideo = Boolean(tile.video && canReveal && !prefersReduced)
  const playing = withVideo && open && pageVisible

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (playing) v.play().catch(() => {})
    else v.pause()
  }, [playing])

  return (
    <li className={`list-none ${STACK} ${slot.basis} ${slot.offset}`}>
      <motion.div
        initial={false}
        animate={open && !prefersReduced ? 'open' : 'rest'}
        variants={lift}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <Link
          href={tile.href}
          aria-labelledby={titleId}
          aria-describedby={sheetId}
          className={`group block no-underline ${focusRing}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <div className={`relative ${slot.aspect}`}>
            <div className={`absolute inset-0 rounded-sm border border-border overflow-hidden ${PLATE[tile.plate]}`}>
              {tile.screens.slice(0, 3).map((s, i) => (
                <div
                  key={s.src}
                  className="absolute aspect-[16/10] rounded-sm border border-border overflow-hidden bg-body shadow-lift"
                  style={SCREEN_POS[i]}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 26vw, (min-width: 640px) 34vw, 70vw"
                    className="object-cover object-left-top"
                  />
                </div>
              ))}
              {withVideo && (
                <motion.video
                  ref={videoRef}
                  src={tile.video}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={false}
                  animate={{ opacity: open ? 1 : 0 }}
                  transition={open ? enterT(duration.base) : exitT(duration.base)}
                />
              )}
            </div>

            {/* Overlay copy: only shown where hover reveal applies. The arbitrary variants
                mirror REVEAL_QUERY so the first paint is right before hydration. */}
            <motion.div
              className="hidden [@media(hover:hover)_and_(pointer:fine)_and_(min-width:1280px)]:block absolute inset-x-3 bottom-3 z-10 opacity-0 shadow-lift"
              initial={false}
              animate={sheetState}
              variants={prefersReduced ? fade : settle}
            >
              <CoverSheet data={tile.sheet} fileNo={fileNo} id={sheetId} dense />
            </motion.div>
          </div>

          {/* Index-row caption */}
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <p className="flex items-center gap-2 text-label font-grotesk uppercase text-foundation-600">
              {tile.current && (
                <>
                  <span className="w-4 h-0.5 bg-accent-warm shrink-0" aria-hidden="true" />
                  <span className="sr-only">Current role: </span>
                </>
              )}
              {tile.company} · {tile.role}
            </p>
            <p className="text-label font-grotesk uppercase text-foundation-500 shrink-0">{tile.years}</p>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <h3
              id={titleId}
              className="text-heading-m font-grotesk text-foundation-900 group-hover:text-foundation-700 transition-colors"
            >
              {tile.title}
            </h3>
          </div>
        </Link>
      </motion.div>

      {/* Always-visible copy for touch and narrower screens. Hidden from assistive tech: the
          link already describes itself with the overlay copy, which stays in the DOM. */}
      <div className="mt-4 [@media(hover:hover)_and_(pointer:fine)_and_(min-width:1280px)]:hidden" aria-hidden="true">
        <CoverSheet data={tile.sheet} fileNo={fileNo} />
      </div>
    </li>
  )
}

export function ContentsWall({
  tiles,
  resume,
}: {
  tiles: ContentsTile[]
  resume: { href: string; kicker: string; title: string; cta: string }
}) {
  const canReveal = useCanReveal()
  return (
    <ul className="flex flex-wrap items-start gap-x-6 gap-y-12 m-0 p-0">
      {tiles.map((tile, i) => (
        <Tile
          key={tile.id}
          tile={tile}
          slot={SLOTS[i] ?? SLOTS[SLOTS.length - 1]}
          fileNo={String(i + 1).padStart(2, '0')}
          canReveal={canReveal}
        />
      ))}

      <li className={`list-none ${STACK} ${RESUME_SLOT}`}>
        <a
          href={resume.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-col justify-between gap-8 min-h-[240px] p-5 bg-accent-subtle border border-border no-underline group ${focusRing}`}
        >
          <div className="flex flex-col gap-3">
            <p className="text-label font-grotesk uppercase text-foundation-600">{resume.kicker}</p>
            <p className="text-heading-m font-grotesk text-foundation-900">{resume.title}</p>
          </div>
          <span className="text-link font-grotesk text-foundation-900 underline decoration-accent-warm underline-offset-4">
            {resume.cta} <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </span>
        </a>
      </li>
    </ul>
  )
}
