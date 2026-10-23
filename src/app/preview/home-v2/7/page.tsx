'use client'
// TEMPORARY — /preview/home-v2/7 "Specimen". The home page as a design system specimen sheet:
// colour tokens, a type scale and components introduce the designer, and the case studies are
// the components. The signature moment: a theme switch that moves the whole page's primary colour
// at once, the way the Acentra Health brand update did. The second colour is that system's own
// "Primary/Forest Green" (#1C8B38, from the colour audit). Motion: swatches grow in, type lines
// slide up, the theme change crossfades. Reduced motion: instant.
import Link from 'next/link'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ahds, dca, media, person } from '../content'
import { CountUp, EASE, MaskLines, Reveal } from '../motion'
import { Switcher, Video } from '../parts'

const themes = {
  warm: { label: 'Warm', primary: '#c2600a', subtle: '#fef3e2', token: 'accent/warm' },
  forest: { label: 'Forest', primary: '#1c8b38', subtle: '#eaf5ec', token: 'primary/forest-green' },
} as const
type ThemeKey = keyof typeof themes

const neutrals = [
  { token: 'foundation/900', hex: '#1c1917' },
  { token: 'foundation/600', hex: '#57534e' },
  { token: 'foundation/300', hex: '#d6d3d1' },
  { token: 'body', hex: '#fdfbf7' },
]

const LABEL = 'font-grotesk text-label uppercase tracking-widest text-foundation-500'
const CODE = 'font-mono text-[12px] text-foundation-500'

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-14">
      <Reveal>
        <h2 className={`m-0 ${LABEL}`}>{title}</h2>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  )
}

function ComponentCard({
  name,
  props,
  story,
  media: picture,
}: {
  name: string
  props: string
  story: typeof dca | typeof ahds
  media: React.ReactNode
}) {
  return (
    <Reveal>
      <p className={`m-0 mb-3 ${CODE}`}>
        &lt;{name} <span style={{ color: 'var(--primary)' }} className="transition-colors duration-500">{props}</span> /&gt;
      </p>
      <Link href={story.href} className="group block overflow-hidden rounded-xl border border-border bg-white no-underline transition-shadow duration-300 hover:shadow-lg">
        <div className="aspect-[16/9] overflow-hidden border-b border-border bg-foundation-100">{picture}</div>
        <div className="p-6">
          <span
            className="inline-block rounded-full px-3 py-1 font-grotesk text-[12px] font-medium transition-colors duration-500"
            style={{ background: 'var(--subtle)', color: 'var(--primary)' }}
          >
            {story.kicker}
          </span>
          <p className="m-0 mt-3 font-grotesk text-heading-m text-foundation-900">{story.headline}</p>
          <p className="m-0 mt-2 font-sans text-body-sm text-foundation-600">{story.deck}</p>
          <span
            className="mt-5 inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-grotesk text-link text-white transition-colors duration-500"
            style={{ background: 'var(--primary)' }}
          >
            Read the case study <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

export default function Specimen() {
  const reduced = useReducedMotion()
  const [theme, setTheme] = useState<ThemeKey>('warm')
  const t = themes[theme]

  return (
    <main
      className="min-h-screen bg-body pb-32 text-foundation-900"
      style={{ ['--primary' as string]: t.primary, ['--subtle' as string]: t.subtle }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 sm:px-10 lg:grid-cols-[200px_1fr] lg:px-0">
        {/* Docs sidebar */}
        <aside className="hidden pt-24 lg:block">
          <nav aria-label="Specimen" className="sticky top-24 space-y-6">
            <div>
              <p className={`m-0 ${LABEL}`}>Foundations</p>
              <ul className="m-0 mt-3 list-none space-y-2 p-0 font-sans text-body-sm">
                <li className="m-0"><a href="#colour" className="text-foundation-700 no-underline hover:text-foundation-900">Colour</a></li>
                <li className="m-0"><a href="#type" className="text-foundation-700 no-underline hover:text-foundation-900">Type</a></li>
              </ul>
            </div>
            <div>
              <p className={`m-0 ${LABEL}`}>Components</p>
              <ul className="m-0 mt-3 list-none space-y-2 p-0 font-sans text-body-sm">
                <li className="m-0"><a href="#case-studies" className="text-foundation-700 no-underline hover:text-foundation-900">CaseStudy</a></li>
                <li className="m-0"><a href="#metrics" className="text-foundation-700 no-underline hover:text-foundation-900">Metric</a></li>
                <li className="m-0"><a href="#quote" className="text-foundation-700 no-underline hover:text-foundation-900">Quote</a></li>
              </ul>
            </div>
          </nav>
        </aside>

        <div className="pt-16 sm:pt-24">
          {/* Header + theme switch */}
          <header className="pb-14">
            <p className={`m-0 ${CODE}`}>v1.0 · {person.focus}</p>
            <h1 className="m-0 mt-4 font-grotesk text-[44px] font-medium leading-[1.04] tracking-[-0.035em] sm:text-display-2xl">
              <MaskLines
                lines={[
                  person.name,
                  <span key="r" className="transition-colors duration-500" style={{ color: 'var(--primary)' }}>
                    {person.role}
                  </span>,
                ]}
              />
            </h1>
            <p className="m-0 mt-6 max-w-xl font-sans text-body text-foundation-600">
              I build design systems and the products that use them. This page is a specimen of one.
              Switch the primary colour: when Acentra Health changed its brand, the whole palette
              moved like this, in two weeks.
            </p>

            <div role="radiogroup" aria-label="Primary colour" className="relative mt-8 inline-flex rounded-full border border-border bg-white p-1">
              {(Object.keys(themes) as ThemeKey[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={theme === k}
                  onClick={() => setTheme(k)}
                  className="relative z-10 flex items-center gap-2 rounded-full px-4 py-2 font-grotesk text-nav-tab text-foundation-900"
                >
                  {theme === k && (
                    <motion.span
                      layoutId="theme-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-foundation-100"
                      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="h-3 w-3 rounded-full" style={{ background: themes[k].primary }} />
                  {themes[k].label}
                </button>
              ))}
            </div>
          </header>

          <Section id="colour" title="Colour">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {[{ token: t.token, hex: t.primary, primary: true }, ...neutrals.map((nn) => ({ ...nn, primary: false }))].map((s, i) => (
                <motion.div
                  key={s.primary ? 'primary' : s.token}
                  initial={reduced ? false : { opacity: 0, scaleY: 0.6 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                  className="origin-bottom"
                >
                  <div
                    className="h-24 rounded-lg border border-border transition-colors duration-500"
                    style={{ background: s.primary ? 'var(--primary)' : s.hex }}
                  />
                  <p className="m-0 mt-2 font-sans text-body-sm text-foundation-900">{s.token}</p>
                  <p className={`m-0 ${CODE} uppercase`}>{s.hex}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section id="type" title="Type">
            <div className="space-y-6">
              {[
                { token: 'display-xl', className: 'font-grotesk text-display-xl', text: 'UX design and design systems' },
                { token: 'heading-m', className: 'font-grotesk text-heading-m', text: 'Two product teams, one design language' },
                { token: 'accent italic', className: 'font-accent accent-italic text-heading-l', text: 'People check the maps.' },
                { token: 'body', className: 'font-sans text-body text-foundation-600', text: dca.body[1] },
              ].map((row, i) => (
                <Reveal key={row.token} delay={i * 0.06} className="grid grid-cols-1 gap-2 sm:grid-cols-[140px_1fr] sm:items-baseline">
                  <span className={CODE}>{row.token}</span>
                  <span className={row.className}>{row.text}</span>
                </Reveal>
              ))}
            </div>
          </Section>

          <Section id="case-studies" title="Components · CaseStudy">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <ComponentCard
                name="CaseStudy"
                props='variant="ai-mvp"'
                story={dca}
                media={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={media.mapping} alt="The Data Conversion App mapping screen." className="h-full w-full object-cover object-left-top" />
                }
              />
              <ComponentCard
                name="CaseStudy"
                props='variant="design-system"'
                story={ahds}
                media={<Video src={media.dsVideo} label="Acentra Health Design System in use." />}
              />
            </div>
          </Section>

          <Section id="metrics" title="Components · Metric">
            <dl className="m-0 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[dca.stats[0], dca.stats[1], ahds.stats[0], ahds.stats[1]].map((s) => (
                <Reveal key={s.label}>
                  <div style={{ borderColor: 'var(--primary)' }} className="border-l-2 pl-4 transition-colors duration-500">
                    <dt className="font-grotesk text-stat"><CountUp value={s.figure} /></dt>
                    <dd className="m-0 mt-2 font-sans text-body-sm text-foundation-600">{s.label}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </Section>

          <Section id="quote" title="Components · Quote">
            <Reveal>
              <blockquote className="m-0 max-w-3xl font-accent accent-italic text-heading-l text-foundation-800">
                “{dca.quote.split('. ')[0]}.”
              </blockquote>
              <p className={`m-0 mt-4 ${LABEL}`}>{dca.quoteBy}</p>
              <Link href="/about" className="mt-10 inline-block font-grotesk text-link text-foundation-900 underline underline-offset-4 transition-colors duration-500 hover:text-[color:var(--primary)]">
                About me and how to get in touch →
              </Link>
            </Reveal>
          </Section>
        </div>
      </div>
      <Switcher current={7} />
    </main>
  )
}
