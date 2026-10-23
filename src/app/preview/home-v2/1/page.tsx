'use client'
// TEMPORARY — /preview/home-v2/1 "The Index". The design-engineer home page (rauno.me, paco.me,
// emilkowal.ski): one narrow column, plain words, the work as a short list. Motion is small and
// only where it helps: lines settle in on load, other rows dim while you hover one, and a preview
// of the work floats beside the cursor. Reduced motion: no float, no settle.
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ahds, dca, media, person } from '../content'
import { Reveal } from '../motion'
import { Switcher, Video } from '../parts'

const work = [
  { title: 'Data Conversion App', note: dca.headline, year: '2026', href: dca.href, preview: { img: media.mapping } },
  { title: 'Acentra Health Design System', note: ahds.headline, year: '2024', href: ahds.href, preview: { video: media.dsVideo } },
]

const SECTION = 'font-grotesk text-label uppercase tracking-widest text-foundation-500'

export default function TheIndex() {
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 })

  return (
    <main
      className="min-h-screen bg-body px-6 pb-32 pt-20 text-foundation-900 sm:pt-28"
      onPointerMove={(e) => {
        x.set(e.clientX + 24)
        y.set(e.clientY - 90)
      }}
    >
      <div className="mx-auto max-w-[560px]">
        <Reveal>
          <h1 className="m-0 font-grotesk text-[17px] font-medium">{person.name}</h1>
          <p className="m-0 mt-1 font-grotesk text-[17px] text-foundation-500">{person.role}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 space-y-4 font-sans text-body text-foundation-700">
          <p className="m-0">
            I design products and the systems behind them. Most recently, an{' '}
            <Link href={dca.href} className="text-foundation-900 underline decoration-foundation-300 underline-offset-4 hover:decoration-accent-warm">
              AI-assisted data conversion tool
            </Link>{' '}
            that turned four to six weeks of Excel into one.
          </p>
          <p className="m-0">
            Before that, I built{' '}
            <Link href={ahds.href} className="text-foundation-900 underline decoration-foundation-300 underline-offset-4 hover:decoration-accent-warm">
              Acentra Health&rsquo;s design system
            </Link>{' '}
            with a lead developer: tokens, components and accessibility standards that let a brand
            update land in two weeks instead of six months.
          </p>
        </Reveal>

        <Reveal delay={0.16} as="section" className="mt-16">
          <h2 className={`m-0 ${SECTION}`}>Selected work</h2>
          <ul className="m-0 mt-4 list-none p-0" onPointerLeave={() => setHovered(null)}>
            {work.map((w, i) => (
              <li key={w.title} className="m-0 border-t border-border last:border-b">
                <Link
                  href={w.href}
                  onPointerEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  className={`flex items-baseline gap-4 py-4 no-underline transition-opacity duration-300 ${
                    hovered !== null && hovered !== i ? 'opacity-35' : 'opacity-100'
                  }`}
                >
                  <span className="flex-1">
                    <span className="block font-grotesk text-[17px] font-medium text-foundation-900">{w.title}</span>
                    <span className="block font-sans text-body-sm text-foundation-500">{w.note}</span>
                  </span>
                  <span className="font-grotesk text-body-sm tabular-nums text-foundation-400">{w.year}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.24} as="section" className="mt-16">
          <h2 className={`m-0 ${SECTION}`}>In numbers</h2>
          <dl className="m-0 mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-sans text-body-sm">
            {[...dca.stats.slice(0, 2), ...ahds.stats.slice(0, 2)].map((s) => (
              <div key={s.label} className="contents">
                <dt className="font-grotesk font-medium tabular-nums text-foundation-900">{s.figure}</dt>
                <dd className="m-0 text-foundation-600">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.32} as="section" className="mt-16">
          <h2 className={`m-0 ${SECTION}`}>Said about the work</h2>
          <blockquote className="m-0 mt-4 font-sans text-body text-foundation-700">
            “{dca.quote.split('. ')[0]}.”
            <footer className="mt-2 text-body-sm text-foundation-500">{dca.quoteBy}</footer>
          </blockquote>
        </Reveal>

        <Reveal delay={0.4} as="section" className="mt-16">
          <h2 className={`m-0 ${SECTION}`}>Elsewhere</h2>
          <p className="m-0 mt-4 font-sans text-body text-foundation-700">
            More about me, and how to get in touch, on the{' '}
            <Link href="/about" className="text-foundation-900 underline decoration-foundation-300 underline-offset-4 hover:decoration-accent-warm">
              about page
            </Link>
            .
          </p>
        </Reveal>
      </div>

      {/* The floating preview, wide screens with a pointer only */}
      {!reduced && (
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key={hovered}
              aria-hidden="true"
              style={{ left: sx, top: sy }}
              initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-none fixed z-40 hidden h-[180px] w-[280px] overflow-hidden rounded-lg border border-border bg-foundation-100 shadow-xl [@media(hover:hover)]:lg:block"
            >
              {work[hovered].preview.video ? (
                <Video src={work[hovered].preview.video} label="" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={work[hovered].preview.img} alt="" className="h-full w-full object-cover object-left-top" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <Switcher current={1} />
    </main>
  )
}
