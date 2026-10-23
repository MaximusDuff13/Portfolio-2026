'use client'
// TEMPORARY — /preview/home-v2/3 "Split". Name, intro and navigation pinned on the left; the work
// scrolls on the right (Brittany Chiang's layout, Adham Dannaway's split). Motion: the nav marker
// grows to show where you are, rows lift into a soft card on hover, and a faint warm light trails
// the cursor. Small screens stack; reduced motion keeps the light still.
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion'
import { ahds, dca, media, person } from '../content'
import { CountUp, EASE, Reveal } from '../motion'
import { Switcher } from '../parts'

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'impact', label: 'Impact' },
  { id: 'words', label: 'In their words' },
]

function useActiveSection() {
  const [active, setActive] = useState('work')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

function WorkRow({ story, img, tags }: { story: typeof dca | typeof ahds; img: string; tags: string[] }) {
  return (
    <Link
      href={story.href}
      className="group -mx-4 grid grid-cols-1 gap-4 rounded-lg p-4 no-underline transition-colors duration-300 hover:bg-foundation-100/70 sm:grid-cols-[180px_1fr]"
    >
      <div className="aspect-[16/10] overflow-hidden rounded border border-border bg-foundation-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt="" className="h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
      </div>
      <div>
        <p className="m-0 font-grotesk text-label uppercase tracking-widest text-foundation-500">{story.kicker}</p>
        <h3 className="m-0 mt-2 font-grotesk text-[19px] font-medium text-foundation-900 group-hover:text-accent-warm">
          {story.headline}
          <span className="ml-1 inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none">↗</span>
        </h3>
        <p className="m-0 mt-2 font-sans text-body-sm text-foundation-600">{story.deck}</p>
        <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
          {tags.map((t) => (
            <li key={t} className="m-0 rounded-full bg-accent-subtle px-3 py-1 font-grotesk text-[12px] text-accent-warm">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

export default function Split() {
  const reduced = useReducedMotion()
  const active = useActiveSection()
  const mx = useMotionValue(-1000)
  const my = useMotionValue(-1000)
  const light = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(194,96,10,0.07), transparent 70%)`

  return (
    <main
      className="relative min-h-screen bg-body text-foundation-900"
      onPointerMove={(e) => {
        if (reduced) return
        mx.set(e.clientX)
        my.set(e.clientY)
      }}
    >
      <motion.div aria-hidden="true" style={{ background: light }} className="pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-32 sm:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:px-0">
        {/* Left, pinned */}
        <header className="pt-20 lg:sticky lg:top-14 lg:flex lg:h-[calc(100vh-56px)] lg:flex-col lg:justify-between lg:py-24">
          <Reveal>
            <h1 className="m-0 font-grotesk text-display-xl text-foundation-900">{person.name}</h1>
            <p className="m-0 mt-3 font-grotesk text-heading-m text-foundation-700">{person.role}</p>
            <p className="m-0 mt-5 max-w-sm font-sans text-body text-foundation-600">
              I design products, and the design systems that let teams build them consistently.
            </p>

            <nav aria-label="On this page" className="mt-14 hidden lg:block">
              <ul className="m-0 list-none space-y-4 p-0">
                {sections.map((s) => {
                  const on = active === s.id
                  return (
                    <li key={s.id} className="m-0">
                      <a href={`#${s.id}`} className="group flex items-center gap-4 no-underline">
                        <motion.span
                          aria-hidden="true"
                          className="h-px bg-foundation-900"
                          animate={{ width: on ? 64 : 32, opacity: on ? 1 : 0.35 }}
                          transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
                        />
                        <span
                          className={`font-grotesk text-label uppercase tracking-widest transition-colors ${
                            on ? 'text-foundation-900' : 'text-foundation-400 group-hover:text-foundation-900'
                          }`}
                        >
                          {s.label}
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 hidden lg:block">
            <Link href="/about" className="font-grotesk text-link text-foundation-600 underline underline-offset-4 hover:text-accent-warm">
              About and contact
            </Link>
          </Reveal>
        </header>

        {/* Right, scrolling */}
        <div className="lg:py-24">
          <section id="work" className="scroll-mt-24 pt-4">
            <h2 className="m-0 mb-6 font-grotesk text-label uppercase tracking-widest text-foundation-500 lg:sr-only">Work</h2>
            <div className="space-y-6">
              <Reveal>
                <WorkRow story={dca} img={media.mapping} tags={['AI', 'MVP', 'Sole designer']} />
              </Reveal>
              <Reveal delay={0.08}>
                <WorkRow story={ahds} img={media.after} tags={['Design system', 'Tokens', 'Accessibility']} />
              </Reveal>
            </div>
          </section>

          <section id="impact" className="mt-24 scroll-mt-24">
            <h2 className="m-0 font-grotesk text-label uppercase tracking-widest text-foundation-500">Impact</h2>
            <dl className="m-0 mt-6 grid grid-cols-2 gap-x-8 gap-y-10">
              {[...dca.stats, ...ahds.stats.slice(0, 3)].map((s, i) => (
                <Reveal key={s.label} delay={i * 0.05}>
                  <dt className="font-grotesk text-stat text-foundation-900">
                    <CountUp value={s.figure} />
                  </dt>
                  <dd className="m-0 mt-2 font-sans text-body-sm text-foundation-600">{s.label}</dd>
                </Reveal>
              ))}
            </dl>
          </section>

          <section id="words" className="mt-24 min-h-[50vh] scroll-mt-24">
            <h2 className="m-0 font-grotesk text-label uppercase tracking-widest text-foundation-500">In their words</h2>
            <Reveal>
              <blockquote className="m-0 mt-6 font-accent accent-italic text-heading-m leading-snug text-foundation-800">
                “{dca.quote}”
              </blockquote>
              <p className="m-0 mt-4 font-grotesk text-label uppercase tracking-widest text-foundation-500">{dca.quoteBy}</p>
            </Reveal>
          </section>
        </div>
      </div>
      <Switcher current={3} />
    </main>
  )
}
