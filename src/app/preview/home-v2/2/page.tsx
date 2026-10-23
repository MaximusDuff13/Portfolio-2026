'use client'
// TEMPORARY — /preview/home-v2/2 "Statement". One big sentence about the work, set in the site's
// own hero style (Space Grotesk, the last line in Fraunces italic), sliding up out of a mask line
// by line. Then the two case studies, large, each picture drifting a little slower than the page
// (parallax) and lifting on hover. Reduced motion: no slide, no drift.
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ahds, dca, media, person } from '../content'
import { CountUp, EASE, MaskLines, Reveal } from '../motion'
import { Switcher, Video } from '../parts'

function CaseStudy({
  index,
  story,
  picture,
  stats,
}: {
  index: string
  story: typeof dca | typeof ahds
  picture: React.ReactNode
  stats: { figure: string; label: string }[]
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-6%', '6%'])

  return (
    <Reveal as="article">
      <Link ref={ref} href={story.href} className="group block no-underline">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-foundation-100">
          <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
            <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none">
              {picture}
            </div>
          </motion.div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="m-0 font-grotesk text-label uppercase tracking-widest text-foundation-500">
              {index} · {story.kicker}
            </p>
            <h2 className="m-0 mt-3 font-grotesk text-heading-l text-foundation-900">
              {story.headline}
              <span className="ml-2 inline-block text-accent-warm transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">
                →
              </span>
            </h2>
            <p className="m-0 mt-3 font-sans text-body text-foundation-600">{story.deck}</p>
          </div>
          <dl className="m-0 grid grid-cols-3 gap-4 md:col-span-5 md:self-end">
            {stats.map((s) => (
              <div key={s.label} className="border-t border-border pt-3">
                <dt className="font-grotesk text-heading-m text-foundation-900">
                  <CountUp value={s.figure} />
                </dt>
                <dd className="m-0 mt-1 font-sans text-caption text-foundation-500">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Link>
    </Reveal>
  )
}

export default function Statement() {
  const reduced = useReducedMotion()
  return (
    <main className="min-h-screen bg-body pb-32 text-foundation-900">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-20 sm:px-10 sm:pt-32 lg:px-0">
        <motion.p
          className="m-0 font-grotesk text-label uppercase tracking-widest text-foundation-500"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {person.name} · {person.role}
        </motion.p>
        <h1 className="m-0 mt-6 font-grotesk text-[44px] font-medium leading-[1.04] tracking-[-0.035em] sm:text-display-2xl">
          <MaskLines
            delay={0.15}
            lines={[
              'I design the products,',
              'and the systems',
              <span key="l3" className="font-accent accent-italic font-normal">they are built on.</span>,
            ]}
          />
        </h1>
        <motion.p
          className="m-0 mt-8 max-w-xl font-sans text-body text-foundation-600"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        >
          Senior UX designer focused on {person.focus}. Two recent stories: an AI tool that turned
          weeks of spreadsheet work into one, and a design system five product teams adopted.
        </motion.p>
      </section>

      <div className="mx-auto max-w-6xl space-y-24 px-6 sm:px-10 lg:px-0">
        <CaseStudy
          index="01"
          story={dca}
          stats={dca.stats}
          picture={
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media.mapping} alt="The Data Conversion App mapping screen." className="h-full w-full object-cover object-left-top" />
          }
        />
        <CaseStudy
          index="02"
          story={ahds}
          stats={ahds.stats.slice(0, 3)}
          picture={<Video src={media.dsVideo} label="Acentra Health Design System in use." />}
        />

        <Reveal as="section" className="mx-auto max-w-3xl border-t border-border pt-16 text-center">
          <blockquote className="m-0 font-accent accent-italic text-heading-l text-foundation-800">
            “{dca.quote.split('. ')[0]}.”
          </blockquote>
          <p className="m-0 mt-4 font-grotesk text-label uppercase tracking-widest text-foundation-500">{dca.quoteBy}</p>
          <Link
            href="/about"
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-btn-border px-5 py-3 font-grotesk text-link text-foundation-900 no-underline transition-colors hover:border-foundation-900"
          >
            About me and how to get in touch →
          </Link>
        </Reveal>
      </div>
      <Switcher current={2} />
    </main>
  )
}
