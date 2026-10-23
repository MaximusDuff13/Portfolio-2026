'use client'
// TEMPORARY — /preview/home-v2/5 "Gallery". A short introduction, then the work as one long strip
// of pictures that scrolling down moves sideways. Each picture arrives in greyscale and comes
// into colour as it reaches the middle of the screen (Michaella Twersky's black-and-white to
// colour). A thin bar shows how far along you are. Small screens and reduced motion: an ordinary
// swipeable row, pictures in colour.
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ahds, dca, media, person } from '../content'
import { MaskLines, Reveal } from '../motion'
import { Switcher, Video } from '../parts'

type Plate = { story: typeof dca | typeof ahds; caption: string; img?: string; video?: string; wide?: boolean }

const plates: Plate[] = [
  { story: dca, caption: 'Mapping: every AI match shows how sure it is', img: media.mapping, wide: true },
  { story: dca, caption: 'The journey map, stage by stage', img: media.journey },
  { story: dca, caption: 'The project hub, every step in plain words', img: media.hub },
  { story: ahds, caption: 'The design system in use', video: media.dsVideo, wide: true },
  { story: ahds, caption: 'A screen, labelled with the tokens it uses', img: media.after },
  { story: ahds, caption: 'Auditing button colours and states in Figma', img: media.audit },
]

function useWide() {
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const q = window.matchMedia('(min-width: 1024px)')
    const apply = () => setWide(q.matches)
    apply()
    q.addEventListener('change', apply)
    return () => q.removeEventListener('change', apply)
  }, [])
  return wide
}

function PlateCard({ plate, animate }: { plate: Plate; animate: boolean }) {
  return (
    <Link
      href={plate.story.href}
      className={`group block shrink-0 snap-start no-underline ${plate.wide ? 'w-[78vw] lg:w-[46vw]' : 'w-[64vw] lg:w-[30vw]'}`}
    >
      <motion.div
        className="relative aspect-[4/3] overflow-hidden rounded-lg bg-foundation-200"
        initial={animate ? { filter: 'grayscale(1)', opacity: 0.75 } : false}
        whileInView={{ filter: 'grayscale(0)', opacity: 1 }}
        viewport={{ amount: 0.7 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        {plate.video ? (
          <Video src={plate.video} label={plate.caption} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={plate.img} alt={plate.caption} className="h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none" />
        )}
      </motion.div>
      <p className="m-0 mt-3 flex justify-between gap-4 font-sans text-body-sm text-foundation-600">
        <span>{plate.caption}</span>
        <span className="shrink-0 font-grotesk text-label uppercase tracking-widest text-foundation-400 group-hover:text-accent-warm">
          {plate.story === dca ? 'DCA' : 'AHDS'} →
        </span>
      </p>
    </Link>
  )
}

function PinnedStrip() {
  const runway = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: runway, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  const x = useTransform(smooth, [0, 1], [0, -distance])

  return (
    <div ref={runway} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-14 flex h-[calc(100vh-56px)] flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-start gap-8 px-10 lg:px-section">
          {plates.map((p) => (
            <PlateCard key={p.caption} plate={p} animate />
          ))}
          <EndCard />
        </motion.div>
        <div className="mx-10 mt-10 h-px bg-border lg:mx-section">
          <motion.div style={{ scaleX: smooth }} className="h-px origin-left bg-foundation-900" />
        </div>
      </div>
    </div>
  )
}

function EndCard() {
  return (
    <div className="flex w-[64vw] shrink-0 snap-start flex-col justify-center lg:w-[26vw]">
      <p className="m-0 font-grotesk text-heading-l text-foundation-900">Read the full stories</p>
      <Link href={dca.href} className="mt-4 font-grotesk text-link text-foundation-900 underline underline-offset-4 hover:text-accent-warm">Data Conversion App</Link>
      <Link href={ahds.href} className="mt-3 font-grotesk text-link text-foundation-900 underline underline-offset-4 hover:text-accent-warm">Acentra Health Design System</Link>
      <Link href="/about" className="mt-3 font-grotesk text-link text-foundation-600 underline underline-offset-4 hover:text-accent-warm">About and contact</Link>
    </div>
  )
}

export default function Gallery() {
  const reduced = useReducedMotion()
  const wide = useWide()
  return (
    <main className="min-h-screen bg-body pb-32 text-foundation-900">
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-20 sm:px-10 sm:pt-28 lg:px-0">
        <p className="m-0 font-grotesk text-label uppercase tracking-widest text-foundation-500">{person.name}</p>
        <h1 className="m-0 mt-5 max-w-4xl font-grotesk text-[40px] font-medium leading-[1.06] tracking-[-0.03em] sm:text-display-xl">
          <MaskLines
            lines={[
              `${person.role}.`,
              <span key="l2" className="text-foundation-400">Two stories, told in pictures.</span>,
            ]}
          />
        </h1>
        <Reveal delay={0.4} className="mt-6 max-w-xl font-sans text-body text-foundation-600">
          <p className="m-0">{dca.deck} {ahds.body[1]}</p>
        </Reveal>
      </section>

      {wide && !reduced ? (
        <PinnedStrip />
      ) : (
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 sm:px-10">
          {plates.map((p) => (
            <PlateCard key={p.caption} plate={p} animate={false} />
          ))}
          <EndCard />
        </div>
      )}
      <Switcher current={5} />
    </main>
  )
}
