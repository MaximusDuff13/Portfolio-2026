'use client'
// TEMPORARY — /preview/home-v2/4 "Bento". The whole home page as one grid of tiles (Apple's bento
// layouts, read.cv-style profiles): intro, the two case studies, numbers, a quote, contact.
// Motion: tiles rise in one after another, figures count up, and a soft warm light sits under the
// cursor inside whichever tile it is over. Reduced motion: tiles are simply there, no light.
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ahds, dca, media, person } from '../content'
import { CountUp, EASE } from '../motion'
import { Switcher, Video } from '../parts'

function Tile({
  i,
  className = '',
  href,
  children,
}: {
  i: number
  className?: string
  href?: string
  children: React.ReactNode
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inner = (
    <>
      {!reduced && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(260px circle at var(--x) var(--y), rgba(194,96,10,0.10), transparent 70%)' }}
        />
      )}
      {children}
    </>
  )
  const box = `group relative block h-full overflow-hidden rounded-2xl border border-border bg-[#fffdf9] no-underline transition-[border-color,transform] duration-300 hover:border-foundation-300 ${
    href ? 'hover:-translate-y-0.5 motion-reduce:hover:translate-y-0' : ''
  }`
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.05 + i * 0.06, ease: EASE }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r || !ref.current) return
        ref.current.style.setProperty('--x', `${e.clientX - r.left}px`)
        ref.current.style.setProperty('--y', `${e.clientY - r.top}px`)
      }}
    >
      {href ? (
        <Link href={href} className={box}>
          {inner}
        </Link>
      ) : (
        <div className={box}>{inner}</div>
      )}
    </motion.div>
  )
}

const LABEL = 'font-grotesk text-label uppercase tracking-widest text-foundation-500'

export default function Bento() {
  return (
    <main className="min-h-screen bg-body px-4 pb-32 pt-10 text-foundation-900 sm:px-10 sm:pt-16">
      <div className="mx-auto grid max-w-6xl auto-rows-[minmax(180px,auto)] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Intro */}
        <Tile i={0} className="sm:col-span-2 lg:row-span-2">
          <div className="flex h-full flex-col justify-between p-7">
            <p className={`m-0 ${LABEL}`}>{person.role}</p>
            <div>
              <h1 className="m-0 font-grotesk text-display-xl">{person.name}</h1>
              <p className="m-0 mt-4 max-w-md font-sans text-body text-foundation-600">
                I design products and the systems behind them: most recently an AI-assisted data
                conversion tool, and before that, Acentra Health&rsquo;s design system.
              </p>
            </div>
          </div>
        </Tile>

        {/* DCA */}
        <Tile i={1} href={dca.href} className="sm:col-span-2 lg:row-span-2">
          <div className="flex h-full flex-col">
            <div className="relative min-h-[220px] flex-1 overflow-hidden border-b border-border bg-foundation-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media.mapping} alt="The Data Conversion App mapping screen." className="absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />
            </div>
            <div className="p-6">
              <p className={`m-0 ${LABEL}`}>{dca.kicker}</p>
              <h2 className="m-0 mt-2 font-grotesk text-heading-m">{dca.headline} <span className="text-accent-warm">→</span></h2>
            </div>
          </div>
        </Tile>

        {/* Stats */}
        <Tile i={2}>
          <div className="flex h-full flex-col justify-end p-6">
            <p className="m-0 font-grotesk text-stat"><CountUp value="1 week" /></p>
            <p className="m-0 mt-2 font-sans text-body-sm text-foundation-600">Data conversion mapping, down from 4 to 6 weeks</p>
          </div>
        </Tile>
        <Tile i={3}>
          <div className="flex h-full flex-col justify-end p-6">
            <p className="m-0 font-grotesk text-stat"><CountUp value="19K+" /></p>
            <p className="m-0 mt-2 font-sans text-body-sm text-foundation-600">Design system component insertions in 30 days</p>
          </div>
        </Tile>

        {/* AHDS */}
        <Tile i={4} href={ahds.href} className="sm:col-span-2 lg:row-span-2">
          <div className="flex h-full flex-col">
            <div className="relative min-h-[220px] flex-1 overflow-hidden border-b border-border bg-foundation-100">
              <div className="absolute inset-0">
                <Video src={media.dsVideo} label="Acentra Health Design System in use." />
              </div>
            </div>
            <div className="p-6">
              <p className={`m-0 ${LABEL}`}>{ahds.kicker}</p>
              <h2 className="m-0 mt-2 font-grotesk text-heading-m">{ahds.headline} <span className="text-accent-warm">→</span></h2>
            </div>
          </div>
        </Tile>

        {/* Quote */}
        <Tile i={5} className="sm:col-span-2">
          <div className="flex h-full flex-col justify-between gap-4 p-6">
            <p className={`m-0 ${LABEL}`}>In their words</p>
            <blockquote className="m-0 font-accent accent-italic text-[22px] leading-snug text-foundation-800">
              “{dca.quote.split('. ')[0]}.”
            </blockquote>
            <p className="m-0 font-sans text-caption text-foundation-500">{dca.quoteBy}</p>
          </div>
        </Tile>

        <Tile i={6} className="lg:col-span-2">
          <div className="flex h-full flex-col justify-end p-6">
            <p className="m-0 font-grotesk text-stat"><CountUp value="2 weeks" /></p>
            <p className="m-0 mt-2 font-sans text-body-sm text-foundation-600">For a brand update that once took 6 months</p>
          </div>
        </Tile>

        {/* Contact */}
        <Tile i={7} href="/about" className="lg:col-span-2">
          <div className="flex h-full flex-col justify-between bg-foundation-900 p-6 text-body">
            <p className="m-0 font-grotesk text-label uppercase tracking-widest text-foundation-400">Say hello</p>
            <p className="m-0 font-grotesk text-heading-m">
              About me and how to get in touch
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">→</span>
            </p>
          </div>
        </Tile>
      </div>
      <Switcher current={4} />
    </main>
  )
}
