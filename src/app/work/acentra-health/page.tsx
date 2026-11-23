import type { Metadata } from 'next'
import Link from 'next/link'
import { links } from '@/data/links'
import { AnimatedSection } from '@/components/AnimatedSection'
import { BriefFacts } from '@/components/BriefFacts'
import { HeroMetrics } from '@/components/HeroMetrics'
import { SystemInUse } from '@/components/SystemInUse'
import { Testimonials } from '@/components/Testimonials'
import { testimonials } from './testimonials'
import { ClosingThoughts } from '@/components/ClosingThoughts'
import { closing } from './closing'
import { BuiltOnCarbon } from '@/components/BuiltOnCarbon'
import { AuditFindings, type Finding } from '@/components/AuditFindings'
import { brands, description, facts, heroMetrics } from './hero-data'
import { KeepExploring, type MoreWorkItem } from '@/components/KeepExploring'
import { SectionHeader } from '@/components/SectionHeader'
import { PenRing } from '@/components/PenRing'
import { Develop } from '@/components/Develop'
import { CaseToc, type TocItem } from '@/components/CaseToc'
import '../case-study.css'

const auditIntro =
  'Before building anything, we audited both products’ Figma libraries, components and workflows to find what was blocking progress.'

// The three audit findings (marked up by hand, picked Nov 7 2026; grouped by source in AuditFindings): each cropped evidence panel
// (public/images/acentra-audit) carries the review pen, with rings and notes in the image's own
// pixels (w × h). headline: the finding in plain words; desc: Michael's card copy, UK spelling (Nov 22 2026).
// The hex codes inside the shots stay: evidence, and not the final colours (Michael); the alt texts don't repeat them.
const auditFindings: Finding[] = [
  {
    tag: 'Accessibility',
    headline: 'The brand green failed contrast',
    desc: 'Existing colour combinations failed WCAG contrast minimums, creating legal and usability risk across the product suite.',
    src: '/images/acentra-audit/contrast.webp',
    alt: 'Stark contrast check: the brand green on white measures 4.37:1, failing WCAG AA for normal text',
    w: 569, h: 730,
    rings: [{ cx: 282, cy: 396, rx: 132, ry: 46 }, { cx: 72, cy: 540, rx: 50, ry: 24 }],
    notes: [{ x: 300, y: 336, text: '0.13 short of AA' }],
  },
  {
    tag: 'Colour',
    headline: 'Colours were hardcoded',
    desc: 'Colours were hardcoded hex values with no shared tokens, so every design change meant hunting across dozens of files.',
    src: '/images/acentra-audit/hex.webp',
    alt: 'Figma fill panel: the button uses a raw hex value rather than a shared token',
    w: 488, h: 650,
    rings: [{ cx: 140, cy: 210, rx: 64, ry: 28 }],
    notes: [{ x: 180, y: 350, text: 'a raw hex, no token', arrow: [214, 318, 176, 250] }],
  },
  {
    tag: 'Typography',
    headline: 'Type had no rules',
    desc: 'Both products used non-brand fonts and ad-hoc sizes, with no shared text styles.',
    // redrawn line for line from the blurry capture (type.webp), at 3x; w × h stay the capture's, so the
    // pen marks line up (Nov 22 2026)
    src: '/images/acentra-audit/type-redrawn.webp',
    alt: 'Figma text panel, redrawn from the original capture: Arial Medium 14, flagged as a missing font, with no text style applied',
    w: 565, h: 636,
    rings: [{ cx: 100, cy: 157, rx: 82, ry: 32 }],
    notes: [{ x: 228, y: 140, text: 'not a brand font,' }, { x: 228, y: 178, text: 'no text style' }],
  },
]

export const metadata: Metadata = {
  title: 'Acentra Health Design System — Michael Jerome',
  description:
    'How I built a scalable design system that unified tokens, components, and accessibility standards across two product teams.',
}

// Choosing the foundation — three options weighed, Adapt & Extend selected.
const foundationOptions = [
  {
    id: 'A',
    name: 'Adopt',
    selected: false,
    desc: 'Quickest to implement, but wouldn’t scale to Acentra’s brand requirements.',
  },
  {
    id: 'B',
    name: 'Adapt & Extend',
    selected: true,
    desc: 'Carbon’s proven foundation, extended with Acentra’s tokens and brand language.',
  },
  {
    id: 'C',
    name: 'Build Custom',
    selected: false,
    desc: 'Maximum flexibility, but too costly for a two-person team and our release timelines.',
  },
]

// Why Carbon, in one sentence: replaced the six Technical / Strategic Fit bullets (Nov 7 2026);
// "AA out of the box" and "accessibility debt eliminated from day one" went, as the audit shows
// the green failing.
const foundationWhy =
  'Carbon fit our Angular stack, let two people ship in small releases instead of one big launch, and its tokens were ready for two brands.'

// More Work — closing cross-case-study links.
const moreWork: MoreWorkItem[] = [
  {
    title: 'Data Conversion App',
    category: 'Product Design',
    desc: 'Designed a lightweight tool that mapped, previewed, and safely converted legacy case data ahead of a system cutover — in two weeks.',
    href: '/work/data-conversion-app',
    // the home page card's cover and stage tint for this case study (content.ts)
    img: '/images/data-conversion-app/project-hub/hub-project-completed.png',
    stage: 'bg-stage-sky',
    meta: 'Product design · 2 weeks',
  },
]

// Results (old 05) were folded into 04 on Nov 23 2026 (Michael): the two results and the Figma
// strip are tiles in the screens bento (ScreensShowcase). ResultsSection.tsx is no longer used.

// Testimonials (07): placeholders show only in development; on the live site the section and its
// contents chip appear once a real quote is in testimonials.ts.
const quotes = testimonials.filter((t) => process.env.NODE_ENV !== 'production' || !t.placeholder)

// the contents list (CaseToc): one entry per section, in page order. Numbers follow the
// section headers (01 to 06, renumbered Nov 22 2026; the brief and the closing are unnumbered).
const toc: TocItem[] = [
  { id: 'brief', label: 'The brief' },
  { id: 'audit', n: '01', label: 'Audit' },
  { id: 'foundation', n: '02', label: 'Foundation' },
  { id: 'carbon', n: '03', label: 'Built on Carbon' },
  { id: 'build', n: '04', label: 'The system in use' },
  ...(quotes.length ? [{ id: 'quotes', n: '05', label: 'Testimonials' }] : []),
  { id: 'closing', label: 'Closing thoughts' },
]

export default function AcentraHealthPage() {
  return (
    <main className="min-h-screen bg-body">

      {/* Hero, in the home page's language (option B, picked Oct 30 2026): the title on one line,
          its second half in olive italic; the outcomes as a row of large figures, each with one
          supporting line (HeroMetrics); the collage on the sage stage the home card uses (so the card's
          morph lands on the same colour); then the brief. */}
      <section className="px-6 sm:px-10 lg:px-section pt-section">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb">
            <ol className="m-0 flex list-none flex-wrap items-baseline gap-x-2 p-0 text-body font-sans">
              <li>
                <Link href={links.home} className="rounded-sm text-foundation-600 underline-offset-4 hover:text-foundation-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-body">Home</Link>
              </li>
              <li aria-hidden="true" className="text-foundation-500">/</li>
              <li aria-current="page" className="font-medium text-foundation-900">Acentra Health Design System</li>
            </ol>
          </nav>
          <h1 className="vt-title-acentra mt-6 mb-0 font-display font-medium text-foundation-900" style={{ fontSize: 'clamp(52px, 8.6vw, 128px)', lineHeight: 0.96, letterSpacing: '-0.03em' }}>
            One system, <span className="cs-lede accent-italic">two brands.</span>
          </h1>
          <HeroMetrics items={heroMetrics} />
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-section pt-4">
        <div className="max-w-6xl mx-auto">
          <div className="vt-media-acentra rounded-2xl bg-stage-sage p-3 sm:p-6 md:p-8">
            {/* the documentation site's hero banner (Nov 14 2026; replaced the four-piece collage).
                Every image on this page arrives through Develop, the standard image animation. */}
            <Develop className="rounded-lg">
              <picture>
                {/* phones get a closer crop, so the title can be read */}
                <source media="(max-width: 639px)" srcSet="/images/acentra-hero/docs-hero-phone.webp" width={1300} height={1219} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/acentra-hero/docs-hero-1200.webp"
                  srcSet="/images/acentra-hero/docs-hero-1200.webp 1200w, /images/acentra-hero/docs-hero-2400.webp 2400w"
                  sizes="(min-width: 1152px) 1088px, 100vw"
                  width={6048}
                  height={3072}
                  alt="The Acentra Health Design System documentation site: the AHDS v1.0 home page beside product screens built on the system, including a pricing page, a project dashboard, an add-user form and an AI query tool"
                  className="block h-auto w-full rounded-lg border border-border shadow-lg"
                />
              </picture>
            </Develop>
          </div>
        </div>
      </section>

      {/* The brief (Oct 30 2026): the merge as one line across the page, like an equation
          (Kepro + CNSI = one design system), between two hairlines and with no container, so it
          doesn't compete with the hero's sage stage; the brief and its facts underneath. */}
      <section id="brief" data-toc-section className="px-6 sm:px-10 lg:px-section pt-section pb-section">
        <div className="max-w-6xl mx-auto">
          {/* two halves that wrap as units on phones: "Kepro + CNSI" over "= One design system" */}
          <figure className="m-0 flex flex-wrap items-center gap-x-5 gap-y-4 border-y border-border py-8 sm:gap-x-8" aria-label="Kepro and CNSI, merged into one design system">
            <span className="flex items-center gap-x-5 sm:gap-x-8">
              {brands.map((b, i) => (
                <span key={b.name} className="contents">
                  {i > 0 && <span aria-hidden="true" className="font-display text-heading-m text-foundation-400 sm:text-heading-xl">+</span>}
                  <img src={b.logo} alt={b.name} width={b.width} height={36} className="h-7 w-auto sm:h-9" />
                </span>
              ))}
            </span>
            <span className="flex items-center gap-x-5 sm:gap-x-8">
              <span aria-hidden="true" className="font-display text-heading-m text-foundation-400 sm:text-heading-xl">=</span>
              <figcaption className="flex items-center gap-3 whitespace-nowrap text-heading-m font-display text-foundation-900 sm:text-heading-xl">
                <img src="/images/logos/marks/acentra-health.webp" alt="" className="h-8 w-8 sm:h-10 sm:w-10" />
                One design system
              </figcaption>
            </span>
          </figure>
          <BriefFacts description={description} facts={facts} />
        </div>
      </section>

      {/* Case study grid */}
      <div className="px-6 sm:px-10 lg:px-section pb-section">
        <div className="max-w-6xl mx-auto">

          {/* Audit: the intro, then the three findings as marked-up exhibits, grouped by the screen
              they were taken from (AuditFindings). */}
          <AnimatedSection>
            <div id="audit" data-toc-section className="border-t border-border pt-section pb-section">
              <div className="max-w-2xl">
                <SectionHeader index="01" eyebrow="Audit" title="A fragmented foundation" />
                <p className="mt-4 mb-0 text-body font-sans text-foundation-700">{auditIntro}</p>
              </div>
              <AuditFindings items={auditFindings} />
              {/* what happened next: was a full-width pull quote, folded in here (Nov 7 2026) */}
              <p className="mt-12 mb-0 max-w-2xl text-body font-sans text-foundation-800">
                We presented these findings to leadership to align on the risks of the legacy path and the need for a scalable restart.
              </p>
            </div>
          </AnimatedSection>

          {/* Choosing the Foundation — three-up comparison + rationale */}
          <AnimatedSection>
            <div id="foundation" data-toc-section className="border-t border-border pt-section pb-section">
              <SectionHeader
                index="02"
                eyebrow="Choosing the Foundation"
                title="Three paths, one fit"
              />

              {/* The trade-off line (picked Nov 7 2026): one axis, fastest to ship → most
                  control, the options as points on it and the chosen one ringed by hand.
                  Phones: the axis turns vertical. */}
              <div className="mt-12">
                <div className="hidden md:flex justify-between text-label font-sans uppercase tracking-widest text-foundation-600">
                  <span>← Fastest to ship</span>
                  <span>Most control →</span>
                </div>
                <ol className="relative mt-4 mb-0 p-0 list-none grid grid-cols-1 gap-10 border-l border-foundation-900 pl-8 md:grid-cols-3 md:gap-8 md:border-l-0 md:border-t md:pl-0 md:pt-10">
                  {foundationOptions.map((o, i) => (
                    <li key={o.id} className={`relative ${['md:text-left', 'md:text-center', 'md:text-right'][i]}`}>
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[37px] top-2 md:top-[-46px] ${['md:left-0', 'md:left-1/2 md:-translate-x-1/2', 'md:left-auto md:right-0'][i]} block rounded-full ${o.selected ? 'h-[18px] w-[18px] -ml-[2px] md:ml-0 md:-mt-[3px] bg-accent-warm' : 'h-3 w-3 border border-foundation-500 bg-body'}`}
                      />
                      <p className="m-0 text-caption font-sans text-foundation-600">
                        Option {o.id}
                        <span className="sr-only">{o.selected ? ', chosen' : ', rejected'}</span>
                      </p>
                      <p className={`relative mt-4 mb-0 inline-block font-display text-heading-m ${o.selected ? 'text-foundation-900' : 'text-foundation-600'}`}>
                        {o.name}
                        {o.selected && <PenRing className="absolute -inset-x-6 -inset-y-2 h-[calc(100%+16px)] w-[calc(100%+48px)]" />}
                      </p>
                      <p className={`mt-4 mb-0 max-w-xs text-body-sm font-sans text-foundation-700 ${['', 'md:mx-auto', 'md:ml-auto'][i]}`}>{o.desc}</p>
                      {o.selected && <p className="cs-note mt-3 mb-0" aria-hidden="true">the fit</p>}
                    </li>
                  ))}
                </ol>
              </div>

              {/* why Carbon (was six bullets) and the sign-off (was a pull quote), Nov 7 2026 */}
              <div className="mt-12 max-w-2xl">
                <p className="m-0 text-body font-sans text-foundation-800">{foundationWhy}</p>
                <p className="mt-4 mb-0 text-body font-sans text-foundation-800">
                  We pitched this to leadership, got their buy-in, and made Carbon our foundation.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Built on Carbon — tabbed Color / Typography spine */}
          <div id="carbon" data-toc-section><BuiltOnCarbon /></div>

        </div>
      </div>

      {/* The system in use (04; Nov 15 2026): the old 05 The Build and 06 The Transformation as one
          section (SystemInUse): one frame, the open exhibit wide and the other a sliver. */}
      <section id="build" data-toc-section className="px-6 sm:px-10 lg:px-section pb-section">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="border-t border-border pt-section">
              <SystemInUse />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials (05 since Nov 23 2026, was 06; Nov 21 2026): the people who worked with the system, in their words, as
          stage cards (Testimonials). It replaced 08 Cross-Team Collaboration, removed the same day. */}
      {quotes.length > 0 && (
        <section id="quotes" data-toc-section className="px-6 sm:px-10 lg:px-section pb-section">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="border-t border-border pt-section">
                <Testimonials items={quotes} />
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Closing thoughts (Nov 21 2026): the last section, then Keep exploring. Replaced the What's
          next bento (three placeholder tiles). Layout F, "In my own pen" (ClosingThoughts, picked
          Nov 22 2026); Michael's text in closing.ts. */}
      <section id="closing" data-toc-section className="px-6 sm:px-10 lg:px-section pb-section">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="border-t border-border pt-section">
              <ClosingThoughts closing={closing} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <KeepExploring items={moreWork} />

      <CaseToc items={toc} />

    </main>
  )
}
