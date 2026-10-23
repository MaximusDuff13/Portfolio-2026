'use client'
import { useState, type CSSProperties, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { CoverSheet } from '@/components/CoverSheet'
import type { CaseStudy } from '@/data/home'
import { duration, enterT, exitT, reducedT } from '@/lib/motion'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

/* NEW — a case study as a physical object you pick up, for the listing level only.
   Three variants share one shell and one set of props: a magazine issue, a folded
   newspaper, and a case-file folder.

   Structure: the Link is the static, never-transformed hit area (and a size container, so
   the object is sized in cqw and the stage height is reserved: no layout shift). Inside
   it, a stage with perspective holds the 3D object (preserve-3d): a front, a spine face,
   stacked page edges behind, and a contact shadow under it. The object is decoration with
   pointer-events off, so a cover moving under the cursor can't flicker the hover. The
   title on the front is the real heading; masthead, issue number, stamps and the copy of
   the cover sheet inside are aria-hidden. The real CoverSheet sits under the object and is
   always visible, on every device.

   Motion: hover (mouse only) or keyboard focus opens it over motion.base on the enter
   curve and closes at 70% on the exit curve. Touch keeps the idle angle and a tap goes
   straight through. Reduced motion: no rotation or lift, only a quick cross-fade of the
   shadow and a title underline. will-change is set only while it moves. */

export type CoverVariant = 'magazine' | 'newspaper' | 'folder'

type Props = {
  variant: CoverVariant
  study: CaseStudy
  /** position in the listing, for the issue / file number */
  index: number
  /** heading level for the title, to fit the page outline (default h4: page > section > company) */
  headingLevel?: 'h3' | 'h4'
  /** the cover art is a stand-in; labels it on the cover */
  placeholderArt?: boolean
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-4 focus-visible:ring-offset-body'

// Idle angle: the fore-edge turned slightly toward you, so the page edges show and an
// opening cover swings clear of them (turned the other way, the opened cover would still
// hide the pages). The same at rest on every device.
const IDLE = { rotateY: -8, rotateX: 4 }

/** per variant: object width (--w, in cqw) per breakpoint, as static classes so Tailwind
    sees them, and height / width */
const SIZE: Record<CoverVariant, { w: string; ratio: number }> = {
  magazine: { w: '[--w:66] sm:[--w:62] lg:[--w:56]', ratio: 4 / 3 },
  newspaper: { w: '[--w:62] sm:[--w:54] lg:[--w:50]', ratio: 1.28 },
  folder: { w: '[--w:80] sm:[--w:72] lg:[--w:68]', ratio: 0.82 },
}

const t = { open: enterT(duration.base), rest: exitT(duration.base) }

/** a part's rest and open poses; under reduced motion both are the rest pose */
const pose = (rest: Record<string, number | string>, open: Record<string, number | string>, reduced: boolean): Variants => ({
  rest: { ...rest, transition: t.rest },
  open: { ...(reduced ? rest : open), transition: t.open },
})

export function CaseStudyCover({ variant, study, index, headingLevel = 'h4', placeholderArt = false }: Props) {
  const reduced = useReducedMotionSafe()
  const [open, setOpen] = useState(false)
  const [moving, setMoving] = useState(false)

  const slug = study.href.split('/').pop()
  const ids = { title: `${slug}-${variant}-title`, company: `${slug}-${variant}-company`, desc: `${slug}-${variant}-desc` }
  const no = String(index + 1).padStart(2, '0')
  const size = SIZE[variant]

  const show = () => {
    setOpen(true)
    if (!reduced) setMoving(true)
  }
  const hide = () => setOpen(false)

  const Title = headingLevel
  const title = (
    <Title id={ids.title} className="font-grotesk font-medium text-foundation-900 text-body leading-[1.2] lg:text-heading-m">
      <span className={`underline-offset-4 decoration-accent-warm transition-[text-decoration-color] ${open && reduced ? 'underline' : ''}`}>
        {study.title}
      </span>
    </Title>
  )

  const parts: PartsProps = { study, no, title, reduced, placeholderArt }

  return (
    <Link
      href={study.href}
      aria-labelledby={`${ids.title} ${ids.company}`}
      aria-describedby={ids.desc}
      className={`group block no-underline rounded-sm [container-type:inline-size] ${focusRing}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && show()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && hide()}
      onFocus={(e) => e.currentTarget.matches(':focus-visible') && show()}
      onBlur={hide}
    >
      <span id={ids.company} className="sr-only">
        , {study.sheet.company}
      </span>

      {/* Stage: height reserved from the object's size, so nothing moves around it */}
      <motion.div
        initial={false}
        animate={open ? 'open' : 'rest'}
        className={`relative flex items-end justify-center [perspective:1200px] pointer-events-none ${
          moving ? '[&_[data-anim]]:will-change-transform' : ''
        } ${size.w}`}
        style={{ height: `calc(var(--w) * ${size.ratio} * 1cqw + 16cqw)`, paddingBottom: '7cqw' } as CSSProperties}
        onAnimationComplete={(def) => def === 'rest' && setMoving(false)}
      >
        {/* Contact shadow: grows and softens as the object lifts (cross-fades under reduced motion) */}
        <motion.div
          aria-hidden="true"
          data-anim
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
          style={{
            bottom: '4.5cqw',
            width: 'calc(var(--w) * 1.05cqw)',
            height: '5cqw',
            background: 'radial-gradient(closest-side, rgb(28 25 23 / 0.32), rgb(28 25 23 / 0))',
          }}
          variants={
            reduced
              ? { rest: { opacity: 1, transition: reducedT(duration.base) }, open: { opacity: 0.6, transition: reducedT(duration.base) } }
              : pose({ scaleX: 1, scaleY: 1, opacity: 1 }, { scaleX: 1.14, scaleY: 1.5, opacity: 0.62 }, false)
          }
        />

        {/* The object */}
        <motion.div
          data-anim
          className="relative"
          style={{
            width: 'calc(var(--w) * 1cqw)',
            height: `calc(var(--w) * ${size.ratio} * 1cqw)`,
            transformStyle: 'preserve-3d',
          }}
          variants={pose({ y: 0, ...IDLE }, { y: -6, ...IDLE }, reduced)}
        >
          {variant === 'magazine' && <Magazine {...parts} />}
          {variant === 'newspaper' && <Newspaper {...parts} />}
          {variant === 'folder' && <Folder {...parts} />}
        </motion.div>
      </motion.div>

      <p id={ids.desc} className="mt-2 text-body-sm font-sans text-foundation-600 max-w-md">
        {study.descriptor}
      </p>
      <div className="mt-4">
        <CoverSheet data={study.sheet} fileNo={no} tone="fill" />
      </div>
    </Link>
  )
}

/* ── Shared 3D parts ──────────────────────────────────────────────────────── */

type PartsProps = { study: CaseStudy; no: string; title: ReactNode; reduced: boolean; placeholderArt: boolean }

/** The narrow face on the left, running back from the front by `depth` cqw */
function Spine({ depth, className }: { depth: number; className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute left-0 top-0 h-full ${className}`}
      style={{ width: `${depth}cqw`, transformOrigin: 'left center', transform: 'rotateY(90deg)' }}
    />
  )
}

/** Stacked sheets behind the front, each a little further back and offset right/down */
function PageEdges({ depth, count = 4, className = 'bg-body border border-foundation-300' }: { depth: number; count?: number; className?: string }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const k = count - i // furthest first
        return (
          <div
            key={k}
            aria-hidden="true"
            className={`absolute inset-0 rounded-[1px] ${className}`}
            style={{ transform: `translate3d(${k * 0.35}cqw, ${k * 0.25}cqw, ${-(depth * k) / count}cqw)` }}
          />
        )
      })}
    </>
  )
}

/** The cover sheet again, printed small on an inside surface. Decorative: the real one is below. */
function PrintedSheet({ study, no, scale = 0.62, align = 'top' }: { study: CaseStudy; no: string; scale?: number; align?: 'top' | 'bottom' }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        className={align === 'bottom' ? 'absolute left-0 bottom-0' : undefined}
        style={{ width: `${100 / scale}%`, transform: `scale(${scale})`, transformOrigin: `${align === 'bottom' ? 'bottom' : 'top'} left` }}
      >
        <CoverSheet data={study.sheet} fileNo={no} dense />
      </div>
    </div>
  )
}

function Art({ study, placeholderArt, className = '', imgClassName = '' }: { study: CaseStudy; placeholderArt: boolean; className?: string; imgClassName?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={study.image.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 200px, 60vw"
        className={`object-cover object-left-top ${imgClassName}`}
      />
      {placeholderArt && (
        <span className="absolute left-1 bottom-1 max-w-[calc(100%-8px)] truncate px-1 py-0.5 rounded-sm bg-body text-label font-grotesk uppercase text-foundation-700">
          [Placeholder]
        </span>
      )}
    </div>
  )
}

/* ── A. Magazine issue ────────────────────────────────────────────────────── */

const MAG_DEPTH = 1.6

function Magazine({ study, no, title, reduced, placeholderArt }: PartsProps) {
  // Cover tints alternate between accent.subtle and foundation-200
  const tint = Number(no) % 2 ? 'bg-accent-subtle' : 'bg-foundation-200'
  return (
    <>
      <Spine depth={MAG_DEPTH} className="bg-foundation-700" />
      <PageEdges depth={MAG_DEPTH} />
      {/* First page, revealed as the cover opens */}
      <div className="absolute inset-0 bg-body border border-foundation-300 p-[3cqw]" style={{ transform: 'translateZ(-0.2cqw)' }}>
        <div className="relative w-full h-full">
          <PrintedSheet study={study} no={no} />
        </div>
      </div>
      {/* Front cover: pivots from the spine */}
      <motion.div
        data-anim
        className={`absolute inset-0 ${tint} shadow-[inset_4px_0_0_rgb(28_25_23/0.12)] flex flex-col`}
        style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden' }}
        variants={pose({ rotateY: 0 }, { rotateY: -32 }, reduced)}
      >
        {/* Masthead: issue line, then the company as the title of the magazine */}
        <div aria-hidden="true" className="px-[4cqw] pt-[3.5cqw] pb-[2cqw] border-b border-foundation-900 flex flex-col gap-[1.5cqw]">
          <span className="text-label font-grotesk uppercase text-foundation-700 truncate">
            No. {no} · {study.sheet.dates}
          </span>
          <span className="text-body lg:text-heading-m font-grotesk font-semibold text-foundation-900 !leading-none truncate">
            {study.sheet.company}
          </span>
        </div>
        <Art study={study} placeholderArt={placeholderArt} className="mx-[4cqw] mt-[3cqw] aspect-[2/1] shrink-0" />
        <div className="px-[4cqw] pt-[3cqw] flex-1 min-h-0 overflow-hidden">{title}</div>
        <div aria-hidden="true" className="flex items-center gap-2 px-[4cqw] pb-[3.5cqw] pt-[1.5cqw]">
          <span className="w-3 h-px bg-accent-warm" />
          <span className="text-label font-grotesk uppercase text-foundation-700 truncate">{study.sheet.readTime}</span>
        </div>
      </motion.div>
    </>
  )
}

/* ── B. Newspaper front page ──────────────────────────────────────────────── */

const NEWS_DEPTH = 1.1

function Newspaper({ study, no, title, reduced, placeholderArt }: PartsProps) {
  const lines = (n: number) =>
    Array.from({ length: n }, (_, i) => (
      <span key={i} className="block h-[0.7cqw] min-h-[3px] bg-foundation-300 rounded-full" style={{ width: `${88 - ((i * 17) % 30)}%` }} />
    ))
  return (
    <>
      <Spine depth={NEWS_DEPTH} className="bg-foundation-400" />
      <PageEdges depth={NEWS_DEPTH} count={3} className="bg-foundation-100 border border-foundation-300" />
      {/* Beneath the top half: the sheet underneath, with the cover sheet printed on it */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-body border border-foundation-300 p-[2.5cqw]" style={{ transform: 'translateZ(-0.3cqw)' }}>
        <div className="relative w-full h-full">
          <PrintedSheet study={study} no={no} scale={0.56} align="bottom" />
        </div>
      </div>

      {/* Top panel: masthead, kicker, lead headline. Lifts and tilts back from the fold. */}
      <motion.div
        data-anim
        className="absolute inset-x-0 top-0 h-1/2 bg-foundation-100 border border-foundation-300 border-b-0 px-[3.5cqw] pt-[3cqw] flex flex-col gap-[1.5cqw] overflow-hidden"
        style={{ transformOrigin: 'center bottom', backgroundImage: 'linear-gradient(to bottom, transparent 82%, rgb(28 25 23 / 0.05))' }}
        // rotateX < 0 hinged at its bottom edge = the top comes toward you; the lift uncovers
        // the bottom of the sheet beneath, at the fold
        variants={pose({ rotateX: 0, rotateZ: 0, y: '0%' }, { rotateX: -14, rotateZ: -1.6, y: '-26%' }, reduced)}
      >
        <div aria-hidden="true" className="flex items-center justify-between gap-2 border-b border-foundation-900 pb-[1.2cqw]">
          <span className="text-label font-grotesk uppercase text-foundation-700 truncate">{study.tags[0]}</span>
          <span className="text-label font-grotesk uppercase text-foundation-700 shrink-0">No. {no}</span>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">{title}</div>
        <p aria-hidden="true" className="text-label font-grotesk uppercase text-foundation-600 pb-[2cqw] truncate">
          {study.sheet.company} · {study.sheet.dates}
        </p>
      </motion.div>

      {/* Bottom panel: photo and columns. Tilts the other way. */}
      <motion.div
        data-anim
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-foundation-100 border border-foundation-300 border-t-foundation-400 px-[3.5cqw] py-[3cqw] grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-[2.5cqw]"
        style={{ transformOrigin: 'center top', backgroundImage: 'linear-gradient(to top, transparent 85%, rgb(28 25 23 / 0.06))' }}
        // hinged at its top edge, so rotateX > 0 brings the bottom toward you
        variants={pose({ rotateX: 0, rotateZ: 0 }, { rotateX: 5, rotateZ: 1.2 }, reduced)}
      >
        <Art study={study} placeholderArt={placeholderArt} className="h-full" imgClassName="grayscale contrast-125" />
        <div className="flex flex-col gap-[1.4cqw]">
          {lines(7)}
          <span className="mt-auto text-label font-grotesk uppercase text-foundation-700 truncate">{study.sheet.readTime}</span>
        </div>
      </motion.div>
    </>
  )
}

/* ── C. Case file folder ──────────────────────────────────────────────────── */

const FOLDER_DEPTH = 1.4

function Folder({ study, no, title, reduced, placeholderArt }: PartsProps) {
  const draft = study.sheet.status.toLowerCase() === 'draft'
  return (
    <>
      <Spine depth={FOLDER_DEPTH} className="bg-foundation-400" />
      {/* Back of the folder, with the tab. A darker manila: accent.subtle under a foundation-900 wash. */}
      <div
        className="absolute inset-0 rounded-[2px] bg-accent-subtle border border-foundation-300"
        style={{ transform: `translateZ(-${FOLDER_DEPTH}cqw)`, backgroundImage: 'linear-gradient(rgb(28 25 23 / 0.07), rgb(28 25 23 / 0.07))' }}
      >
        <span
          aria-hidden="true"
          className="absolute left-[4cqw] -top-[6cqw] h-[6.5cqw] max-w-[60%] px-[3cqw] flex items-center rounded-t-[3px] bg-accent-subtle border border-b-0 border-foundation-300 text-label font-grotesk uppercase text-foundation-700 truncate"
          style={{ backgroundImage: 'linear-gradient(rgb(28 25 23 / 0.07), rgb(28 25 23 / 0.07))' }}
        >
          {study.sheet.company}
        </span>
      </div>
      <PageEdges depth={FOLDER_DEPTH * 0.8} count={3} />

      {/* The document inside: slides out as the front opens */}
      <motion.div
        data-anim
        className="absolute left-[5%] right-[5%] top-[4%] bottom-[6%] bg-body border border-foundation-300 p-[2.5cqw] shadow-lift"
        style={{ transform: 'translateZ(-0.6cqw)' }}
        variants={pose({ y: '0%' }, { y: '-22%' }, reduced)}
      >
        <div className="relative w-full h-full">
          <PrintedSheet study={study} no={no} scale={0.58} />
        </div>
      </motion.div>

      {/* Front: hinged at the bottom edge, rotates up toward you */}
      <motion.div
        data-anim
        className="absolute inset-x-0 bottom-0 top-[14%] rounded-[2px] bg-accent-subtle border border-foundation-300 px-[4cqw] pt-[4cqw] pb-[3.5cqw] grid grid-cols-[1fr_auto] grid-rows-[auto_1fr_auto] gap-x-[3cqw] gap-y-[1.5cqw]"
        style={{ transformOrigin: 'center bottom' }}
        variants={pose({ rotateX: 0 }, { rotateX: -26 }, reduced)}
      >
        <span aria-hidden="true" className="text-label font-grotesk uppercase text-foundation-700">File No. {no}</span>
        {/* Stamp: accent.warm, as stamps are allowed; decorative (status is in the cover sheet) */}
        <span
          aria-hidden="true"
          className="row-span-2 self-start -rotate-6 px-1.5 py-1 border-2 border-accent-warm rounded-sm text-label font-grotesk uppercase text-accent-warm"
        >
          {draft ? 'Draft' : study.sheet.status}
        </span>
        <div className="min-h-0 overflow-hidden">{title}</div>
        <div className="col-span-2 flex items-end gap-[3cqw] min-h-0">
          <Art study={study} placeholderArt={placeholderArt} className="w-[30%] aspect-[4/3] border border-foundation-300 shrink-0 -rotate-2" />
          <span aria-hidden="true" className="text-label font-grotesk uppercase text-foundation-700 truncate pb-[0.5cqw]">
            {study.sheet.dates} · {study.sheet.readTime}
          </span>
        </div>
      </motion.div>
    </>
  )
}
