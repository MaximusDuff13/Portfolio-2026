import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SystemInUse } from '@/components/SystemInUse'
import { BuiltOnCarbon } from '@/components/BuiltOnCarbon'
import { CrossTeamCollab } from '@/components/CrossTeamCollab'
import { MarkedUpShot, type Note, type Ring } from '@/components/MarkedUpShot'
import { brands, description, facts, heroMetrics, targets } from './hero-data'
import { KeepExploring, type MoreWorkItem } from '@/components/KeepExploring'
import { SectionHeader } from '@/components/SectionHeader'
import { PenRing } from '@/components/PenRing'
import { Develop } from '@/components/Develop'
import { CaseToc, type TocItem } from '@/components/CaseToc'
import '../case-study.css'

const auditIntro =
  'Before building the design system, I partnered with a lead developer to audit the ecosystem — reviewing Figma libraries, component structures, and design workflows to understand what was blocking progress.'

// The three audit findings (option C, "marked up", picked Nov 7 2026): each cropped evidence panel
// (public/images/acentra-audit) carries the review pen, with rings and notes in the image's own
// pixels (w × h). headline: the finding in plain words; desc: Michael's original card copy.
const auditFindings: { tag: string; headline: string; desc: string; src: string; alt: string; w: number; h: number; rings: Ring[]; notes: Note[] }[] = [
  {
    tag: 'Accessibility',
    headline: 'The brand green failed contrast',
    desc: 'Existing color combinations failed WCAG contrast minimums, creating legal and usability risk across the product suite.',
    src: '/images/acentra-audit/contrast.webp',
    alt: 'Stark contrast check: the brand green #1C8B38 on white measures 4.37:1, failing WCAG AA for normal text',
    w: 569, h: 730,
    rings: [{ cx: 282, cy: 396, rx: 132, ry: 46 }, { cx: 72, cy: 540, rx: 50, ry: 24 }],
    notes: [{ x: 300, y: 336, text: '0.13 short of AA' }],
  },
  {
    tag: 'Color',
    headline: 'Colours were hardcoded',
    desc: 'Colors were hardcoded hex values with no shared tokens — every design change meant hunting across dozens of files.',
    src: '/images/acentra-audit/hex.webp',
    alt: 'Figma fill panel: the button uses the raw hex 1C8B38 rather than a shared token',
    w: 488, h: 650,
    rings: [{ cx: 140, cy: 210, rx: 64, ry: 28 }],
    notes: [{ x: 180, y: 350, text: 'a raw hex, no token', arrow: [214, 318, 176, 250] }],
  },
  {
    tag: 'Typography',
    headline: 'Type had no rules',
    desc: 'Typography was inconsistent. Non-brand fonts and ad-hoc sizes with no shared text styles across either product.',
    src: '/images/acentra-audit/type.webp',
    alt: 'Figma text panel: Arial Medium 14, flagged as a missing font, with no text style applied',
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
    desc: "Quickest to implement, but wouldn't scale to Acentra's brand requirements.",
  },
  {
    id: 'B',
    name: 'Adapt & Extend',
    selected: true,
    desc: "Carbon's proven foundation, extended with Acentra's tokens and brand language.",
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

// Small Wins (07) — a pilot proving the system's impact.
const smallWinsBody = [
  'When the new marketing team updated the color scheme, the product team expected months of rework. Instead, we used AHDS tokens to update the entire primary palette in just two weeks — across both design (Figma) and development (Angular).',
  "By changing values in a single token config, the update propagated instantly, proving the system wasn't just a library — it was infrastructure for speed, consistency, and accessibility.",
]

const smallWins = [
  {
    icon: 'clock',
    label: 'Time to Value',
    stat: '2 weeks',
    value: 'Brand update rolled out in 2 weeks',
    note: 'vs. 6 months in legacy environment',
  },
  {
    icon: 'layers',
    label: 'Coverage',
    stat: '40+',
    value: '40+ components refreshed instantly',
    note: 'propagated via global tokens',
  },
] as const

// More Work — closing cross-case-study links.
const moreWork: MoreWorkItem[] = [
  { title: 'Data Conversion App', category: 'Product Design', desc: 'Designed a lightweight tool that mapped, previewed, and safely converted legacy case data ahead of a system cutover — in two weeks.', href: '/work/data-conversion-app' },
]

// Results (09) — the payoff metrics (first three tiles; WCAG tile dropped per Michael).
const results = [
  { stat: '19K+', label: 'Component insertions · 30 days', desc: 'Used 19,000 times across 5 project teams.' },
  { stat: '5', label: 'Project teams adopting', desc: 'Five project teams adopted the system in its first quarter.' },
  { stat: '1 Month', label: 'Faster UI delivery', desc: 'A supporting tool shipped in one month.' },
]

function MetricIcon({ name, className = '' }: { name: 'clock' | 'layers'; className?: string }) {
  if (name === 'clock') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
        <circle cx="8" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.1" />
        <path d="M8 6v3l2 1.4M6 1.5h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1.8l6 3-6 3-6-3 6-3z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M2 8l6 3 6-3M2 11l6 3 6-3" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  )
}

// Placeholder image tile for the What's Next bento — pass `src` when the real renders land.
function NextImage({ label, src, className = '' }: { label: string; src?: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-border bg-foundation-900 ${className}`}>
      {src ? (
        <Develop className="absolute inset-0">
          <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover" />
        </Develop>
      ) : (
        <div className="absolute inset-0 grid place-items-center px-4 text-center">
          <span className="text-caption font-sans uppercase tracking-widest text-foundation-400">{label}</span>
        </div>
      )}
    </div>
  )
}

// the contents list (CaseToc): one entry per section, in page order. Numbers follow the
// section headers (there is no 02 on the page today).
const toc: TocItem[] = [
  { id: 'brief', label: 'The brief' },
  { id: 'audit', n: '01', label: 'Audit' },
  { id: 'foundation', n: '03', label: 'Foundation' },
  { id: 'carbon', n: '04', label: 'Built on Carbon' },
  { id: 'build', n: '05', label: 'The system in use' },
  { id: 'wins', n: '07', label: 'Small wins' },
  { id: 'collab', n: '08', label: 'Collaboration' },
  { id: 'results', n: '09', label: 'Results' },
  { id: 'next', label: 'What’s next' },
]

export default function AcentraHealthPage() {
  return (
    <main className="min-h-screen bg-body">

      {/* Hero, in the home page's language (option B, picked Oct 30 2026): the title on one line,
          its second half in olive italic; the outcomes as a row of large figures, each with what it
          replaced struck through; the collage on the sage stage the home card uses (so the card's
          morph lands on the same colour); then the brief. */}
      <section className="px-6 sm:px-10 lg:px-section pt-section">
        <div className="max-w-6xl mx-auto">
          <p className="m-0 flex flex-wrap items-baseline gap-x-2 text-body font-sans text-foundation-900">
            <span className="font-medium">Acentra Health</span>
            <span className="text-foundation-600">/ Design system · 8 months · 2024</span>
          </p>
          <h1 className="vt-title-acentra mt-6 mb-0 font-display font-medium text-foundation-900" style={{ fontSize: 'clamp(52px, 8.6vw, 128px)', lineHeight: 0.96, letterSpacing: '-0.03em' }}>
            One system, <span className="cs-lede accent-italic">two brands.</span>
          </h1>
          <dl className="mt-12 mb-0 grid grid-cols-2 border-t border-foundation-900 md:grid-cols-4">
            {heroMetrics.map((m, i) => (
              <div key={m.n} className={`flex flex-col py-6 md:px-6 ${i ? 'md:border-l md:border-border' : 'md:pl-0'} ${i % 2 ? 'pl-5 border-l border-border md:pl-6' : ''}`}>
                <dt className="order-last mt-3 text-body-sm font-sans text-foundation-600">
                  {m.label}
                  {m.was && <s className="block mt-1 text-caption text-foundation-500 decoration-1">was {m.was}</s>}
                </dt>
                <dd className="m-0 whitespace-nowrap font-display font-medium text-accent-warm" style={{ fontSize: 'clamp(40px, 5.2vw, 72px)', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-section pt-4">
        <div className="max-w-6xl mx-auto">
          <div className="vt-media-acentra rounded-2xl bg-stage-sage p-3 sm:p-6 md:p-8">
            {/* the documentation site's hero banner (Nov 14 2026; replaced the four-piece collage).
                Every image on this page arrives through Develop, the standard image animation. */}
            <Develop className="rounded-lg">
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
            </Develop>
          </div>
        </div>
      </section>

      {/* The brief (Oct 30 2026): the merge as one line across the page, like an equation
          (Kepro + CNSI = one design system), between two hairlines and with no container, so it
          doesn't compete with the hero's sage stage; the brief and its facts underneath, flush left. */}
      <section id="brief" data-toc-section className="px-6 sm:px-10 lg:px-section pt-section pb-16">
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
          <div className="mt-10 max-w-4xl">
            <p className="m-0 text-label font-sans uppercase tracking-widest text-foundation-600">The brief</p>
            <p className="mt-4 mb-0 text-[20px] leading-[1.6] font-sans text-foundation-800">{description}</p>
            <p className="mt-4 mb-0 text-[20px] leading-[1.6] font-sans text-foundation-800">{targets}</p>
            <dl className="mt-6 mb-0 flex flex-wrap gap-x-6 gap-y-2 text-body-sm font-sans">
              {facts.map((x) => (
                <div key={x.k} className="flex gap-1.5">
                  <dt className="text-foundation-900">{x.k}:</dt>
                  <dd className="m-0 text-foundation-600">{x.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Case study grid */}
      <div className="px-6 sm:px-10 lg:px-section pb-section">
        <div className="max-w-6xl mx-auto">

          {/* Audit: the intro, then the three findings as marked-up exhibits. The shots share a
              bottom line (subgrid), so the three headlines start on one row whatever each
              shot's height. */}
          <AnimatedSection>
            <div id="audit" data-toc-section className="pt-section pb-section">
              <div className="max-w-2xl">
                <SectionHeader index="01" eyebrow="Audit" title="A fragmented foundation" />
                <p className="mt-4 mb-0 text-body font-sans text-foundation-700">{auditIntro}</p>
              </div>
              <ol className="mt-12 mb-0 p-0 list-none grid grid-cols-1 gap-12 md:grid-cols-3 md:grid-rows-[auto_auto] md:gap-x-8 md:gap-y-0">
                {auditFindings.map((f, i) => (
                  <li key={f.tag} className="md:row-span-2 md:grid md:grid-rows-subgrid">
                    <div className="md:self-end">
                      <MarkedUpShot src={f.src} alt={f.alt} w={f.w} h={f.h} rings={f.rings} notes={f.notes} delay={i * 180} />
                    </div>
                    <div>
                      <p className="mt-5 mb-0 text-label font-sans uppercase tracking-widest text-foundation-600">{String(i + 1).padStart(2, '0')} · {f.tag}</p>
                      <h3 className="mt-2 mb-0 text-heading-m font-display text-foundation-900">{f.headline}</h3>
                      <p className="mt-2 mb-0 text-body-sm font-sans text-foundation-700">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
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
                index="03"
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
                      <p className={`relative mt-1 mb-0 inline-block font-display text-heading-m ${o.selected ? 'text-foundation-900' : 'text-foundation-600'}`}>
                        {o.name}
                        {o.selected && <PenRing className="absolute -inset-x-6 -inset-y-3 h-[calc(100%+24px)] w-[calc(100%+48px)]" />}
                      </p>
                      <p className={`mt-2 mb-0 max-w-xs text-body-sm font-sans text-foundation-700 ${['', 'md:mx-auto', 'md:ml-auto'][i]}`}>{o.desc}</p>
                      {o.selected && <p className="cs-note mt-3 mb-0" aria-hidden="true">the fit</p>}
                    </li>
                  ))}
                </ol>
              </div>

              {/* why Carbon (was six bullets) and the sign-off (was a pull quote), Nov 7 2026 */}
              <div className="mt-12 max-w-2xl">
                <p className="m-0 text-body font-sans text-foundation-800">{foundationWhy}</p>
                <p className="mt-4 mb-0 text-body font-sans text-foundation-800">
                  We pitched the adapt-and-extend approach to leadership, secured buy-in, and set Carbon as the foundation, the decision that made everything else possible.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Built on Carbon — tabbed Color / Typography spine */}
          <div id="carbon" data-toc-section><BuiltOnCarbon /></div>

        </div>
      </div>

      {/* The system in use (05; Nov 15 2026): the old 05 The Build and 06 The Transformation as one
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

      {/* Small Wins (07) — pilot proving the system's impact (stat cards) */}
      <section id="wins" data-toc-section className="px-6 sm:px-10 lg:px-section pb-section">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="border-t border-border pt-section grid grid-cols-1 md:grid-cols-12 gap-8">

              {/* Narrative */}
              <div className="md:col-span-4 md:pr-8">
                <SectionHeader
                  index="07"
                  eyebrow="Small Wins"
                  title="Proving value through a pilot"
                />
                <div className="mt-6 flex flex-col gap-4">
                  {smallWinsBody.map((p) => (
                    <p key={p} className="text-body-sm font-sans text-foundation-600">{p}</p>
                  ))}
                </div>
              </div>

              {/* Stat cards */}
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {smallWins.map((m) => (
                  <div key={m.label} className="rounded-lg border border-border p-6 flex flex-col">
                    <div className="flex items-center gap-2 text-foundation-500 mb-6">
                      <MetricIcon name={m.icon} />
                      <span className="text-label font-sans uppercase tracking-widest">{m.label}</span>
                    </div>
                    <p className="text-stat font-display text-accent-warm">{m.stat}</p>
                    <p className="text-body-sm font-sans text-foundation-700 mt-3">{m.value}</p>
                    <p className="text-caption font-sans text-foundation-500 italic mt-auto pt-4">{m.note}</p>
                  </div>
                ))}
              </div>

            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Cross-Team Collaboration & Governance (08) — tabbed, mirrors section 04 */}
      <div id="collab" data-toc-section><CrossTeamCollab /></div>

      {/* Results (09) — narrative rail + payoff-metric ledger */}
      <section id="results" data-toc-section className="px-6 sm:px-10 lg:px-section pb-section">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="border-t border-border pt-section grid grid-cols-1 md:grid-cols-12 gap-8">

              {/* Narrative rail — DRAFT title/quote, Michael to finalize */}
              <div className="md:col-span-4 md:pr-8 md:border-r border-border">
                <SectionHeader
                  index="09"
                  eyebrow="Results"
                  title="A system teams actually adopted"
                  quote="One release in, the system was already being used thousands of times a week — adoption, not just availability."
                />
              </div>

              {/* Payoff-metric ledger */}
              <div className="md:col-span-8">
                {results.map((r) => (
                  <div
                    key={r.stat}
                    className="grid grid-cols-12 gap-x-6 gap-y-2 py-6 border-b border-border items-baseline first:pt-0"
                  >
                    <p className="col-span-12 sm:col-span-5 text-stat font-display text-accent-warm">{r.stat}</p>
                    <p className="col-span-12 sm:col-span-7 text-body-sm font-sans text-foundation-600">
                      <span className="block text-body-sm font-display text-foundation-900">{r.label}</span>
                      {r.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What's Next — forward-looking "Next Chapter" bento (one large + two stacked) */}
      <section id="next" data-toc-section className="px-6 sm:px-10 lg:px-section pb-section">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="border-t border-border pt-section">
              <div className="max-w-2xl mb-10">
                <SectionHeader
                  eyebrow="Next Chapter"
                  title="What's Next: Scaling with Insight and Structure"
                />
                <p className="text-body font-sans text-foundation-600 mt-6">
                  Moving from adoption to optimization by expanding comprehensive guides, building
                  Acentra-driven patterns, and scaling into charts and dashboards.
                </p>
              </div>
              <div className="grid grid-cols-1 auto-rows-[180px] gap-4 md:grid-cols-12 md:grid-rows-2 md:auto-rows-auto md:h-[520px]">
                <NextImage label="Comprehensive guides" className="md:col-span-7 md:row-span-2 h-full" />
                <NextImage label="Acentra-driven patterns" className="md:col-span-5 h-full" />
                <NextImage label="Charts & dashboards" className="md:col-span-5 h-full" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <KeepExploring items={moreWork} />

      <CaseToc items={toc} />

    </main>
  )
}
