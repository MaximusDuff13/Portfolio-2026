import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { BeforeAfter } from '@/components/BeforeAfter'
import { BrowserMockup } from '@/components/BrowserMockup'
import { FindingCard } from '@/components/FindingCard'
import { SectionHeader } from '@/components/SectionHeader'
import { PullQuote } from '@/components/PullQuote'
import { CrosswalkMatrix } from './CrosswalkMatrix'

export const metadata: Metadata = {
  title: 'Data Conversion App — Michael Jerome',
  description:
    'How a two-week MVP tool let Acentra Health map, preview, and safely convert legacy case data ahead of a system cutover.',
}

const description =
  "DDI — Design, Develop, Implement — is how Acentra moves a state program's data from a legacy system onto [Product]. This MVP reimagines it with AI, cutting a 2 to 3 month conversion to 1 to 2 weeks."

// Headline result — stated as text, so no month→week conversion is needed here.
// Shown as the At a Glance outcome.
const resultStat = {
  conversionAfter: '1 to 2 weeks',
  conversionCaption: 'Down from a typical 2 to 3 month conversion timeline',
}

const meta = [
  { label: 'My Role',  items: ['Product Design', 'Rapid Prototyping'] },
  { label: 'Team',     items: ['1 Developer', '1 Implementation Lead'] },
  { label: 'Timeline', items: ['2 Weeks', '2025'] },
]

// Hero eyebrow. The headline follows it directly — the old lead-in line restated
// the role, which the sidebar's My Role block already covers.
const heroEyebrow = 'Data conversion · AI-assisted MVP · Shipped 2025'

// Hero sidebar. Same label / value / supporting note shape as the rest of the case
// study heroes. My Role is now the page's only statement of the role, so it absorbs
// the scope phrasing that used to sit in a separate What I Owned block.
const heroMeta = [
  {
    label: 'My Role',
    value: 'Product Design',
    note: 'Product design and rapid prototyping, from legacy mapping through safe cutover',
  },
  {
    label: 'Collaboration',
    value: 'AI Center of Excellence and Program Implementation teams',
    note: 'Partnered through build and rollout ahead of the state program cutover',
  },
]

// At a glance — scan facts. Every value here restates something the page already
// establishes (meta above, and the results below); nothing new is claimed.
const glanceFacts = [
  { label: 'Role', value: 'Product Design', sub: 'Rapid prototyping' },
  { label: 'Timeline', value: '2 weeks', sub: '2025' },
  { label: 'Team', value: '1 Developer', sub: '1 Implementation Lead' },
  { label: 'Status', value: 'Shipped', sub: 'On schedule, zero slip' },
]

// The headline outcome is the conversion-time result — the same number the hero
// description leads with. Read straight from `resultStat` rather than restated,
// so there is one place to change it.
const glanceOutcome = {
  label: 'Outcome',
  value: resultStat.conversionAfter,
  sub: resultStat.conversionCaption,
}

// TESTIMONIAL — intentionally null. No quote from anyone on this project exists in
// the repo, and an attributed testimonial is not something to invent. Fill this in
// and the block renders itself beneath the outcome stat; leave it null and the
// strip is simply the stat plus the four facts.
const testimonial: { quote: string; name: string; role: string } | null = null

// Process timeline — the whole project, not only my part of it. Numbered 1–9 without a
// break so it reads as one timeline. The before phase stays terse on purpose: the
// Problem section below explains what went wrong; this only lays out the sequence.
// Before-steps are titles only — the write-ups belong to my steps. Step 05 keeps its
// outcome in the title: it's the failure point that got me brought in.
const timelineBefore = [
  'Wiki generation',
  'Mapping workflow',
  'Transformation logic defined',
  'Requirements phase',
  "UI screens — didn't work out",
]

const timelineAfter = [
  {
    title: 'Stakeholder discovery',
    desc: "Met with three groups — data analyst, project owner and the AI Center of Excellence — to understand what existed and what wasn't working. Key finding: there was no real understanding of how a user would actually flow through the system.",
  },
  {
    title: 'Journey mapping',
    desc: 'Mapped the full landscape — every interaction point a user would have with the system, end to end.',
  },
  {
    title: 'Design',
    desc: 'Built on the existing design system, which kept it fast. Used AI against the design-system files to simulate and generate multiple design directions, ideating and validating faster than manual exploration.',
  },
  { title: 'Dev + testing', desc: '' },
]

const problemFindings = [
  {
    title: 'Inconsistent Field Mapping',
    description: "Legacy fields didn't map 1:1 to the new schema — some required manual reconciliation before conversion.",
    src: '/images/dca-problem/Field Mapping.png',
  },
  {
    title: 'No Preview Before Commit',
    description: 'The existing export tool wrote directly to the new system with no way to catch errors before they landed.',
    src: '/images/dca-problem/No Preview.png',
  },
]

const approachSteps = [
  'Field-mapping screen surfaces legacy → new-system correspondences, with mismatches flagged inline',
  'Preview step renders a side-by-side of source and converted record before anything writes',
  'Commit step runs in batches with a rollback log, so a bad batch doesn’t take down the whole migration',
]

// Committed vs. shipped — same ledger pattern as the Acentra Health page, trimmed to 2 rows for a 2-week scope.
const results = [
  {
    metric: 'Accuracy',
    committed: '99%',
    committedNote: 'Target match rate, legacy → new',
    delivered: '99.6%',
    deliveredNote: 'Verified match rate across 3 batches',
  },
  {
    metric: 'Timeline',
    committed: '2 weeks',
    committedNote: 'Delivery target before cutover',
    delivered: '2 weeks',
    deliveredNote: 'Shipped on schedule, zero slip',
  },
]

const smallStats = [
  { stat: '3', label: 'Legacy record batches converted', desc: 'Processed across three sequential migration batches.' },
  { stat: '0', label: 'Records lost in migration', desc: 'Every flagged mismatch was caught in preview, not production.' },
]

const moreWork = [
  { num: '02', title: 'Acentra Health Design System', category: 'Design System', desc: 'Built a scalable design system that unified tokens, components, and accessibility standards across two product teams.', href: '/work/acentra-health', img: undefined as string | undefined },
  { num: '03', title: 'Project Three', category: 'Product Design', desc: 'One line on the problem and the outcome you drove.', href: '#', img: undefined as string | undefined },
]

function NextImage({ label, src, className = '' }: { label: string; src?: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-border bg-foundation-900 ${className}`}>
      {src ? (
        <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center px-4 text-center">
          <span className="text-caption font-grotesk uppercase tracking-widest text-foundation-500">{label}</span>
        </div>
      )}
    </div>
  )
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className}>
      <path d="M5 11h11M12 6l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
      <circle cx="8" cy="8" r="7.25" stroke="#c2600a" strokeWidth="1" />
      <path d="M5 8.2l2 2 4-4.2" stroke="#c2600a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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

export default function DataConversionAppPage() {
  return (
    <main className="min-h-screen bg-body">

      {/* Dark hero. px-section + max-w-6xl is the page's content column — the product shots and
          Result below use the same pair, so all three share one left/right edge. pb-44 (176px)
          leaves room for the product shots to overlap the band's bottom edge (see below). */}
      <section className="relative overflow-hidden bg-foundation-900 px-section pt-section pb-44">

        {/* Background illustration, behind the content. overflow-hidden clips its bleed
            to the dark band; the product shots below are a sibling section, so their
            -mt-28 overlap is unaffected. */}
        <CrosswalkMatrix />

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Headline column — eyebrow, two-part headline, description. */}
          <div className="md:col-span-8">
            <AnimatedSection>
              <p className="text-label font-grotesk text-accent-warm uppercase">
                {heroEyebrow}
              </p>

              {/* The closing phrase carries the accent face — Fraunces italic, WONK pinned
                  off via .accent-italic. Everything ahead of it stays Space Grotesk, so the
                  face change is the emphasis. */}
              <h1 className="mt-6 text-display-2xl font-grotesk text-body">
                Reimagining data conversion at
                <br />
                <span className="font-accent accent-italic text-accent-warm">
                  Acentra Health
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-body font-sans text-foundation-300">
                {description}
              </p>
            </AnimatedSection>
          </div>

          {/* Role / ownership / collaboration, on border-border rules. */}
          <div className="md:col-span-4 flex flex-col justify-end">
            <AnimatedSection>
              {heroMeta.map(({ label, value, note }) => (
                <div key={label} className="border-t border-border pt-4 pb-6">
                  <p className="text-label font-grotesk text-accent-warm uppercase">{label}</p>
                  <p className="mt-2 text-heading-m font-grotesk text-body">{value}</p>
                  <p className="mt-2 text-caption font-sans text-foundation-400">{note}</p>
                </div>
              ))}
            </AnimatedSection>
          </div>

        </div>
      </section>

      {/* Product shot — a single screen. Pulled up with -mt-28 (112px) so it straddles the hero's
          bottom edge; against the hero's pb-44 (176px) that leaves 176 − 112 = 64px of clear dark
          between the hero copy and the top of the screen.

          This replaced a three-screen depth stack that fanned out on hover. The hover left dead
          space beneath the spread row, and one screen states the product more plainly — so this is
          static, and the page no longer needs a client component here.

          CONTENT: a generic screen only. The Dictionary / Mapping / Transformation story belongs to
          its own section later on the page and is deliberately not previewed here. No browser
          chrome, so this reads as a product shot rather than a re-run of the BrowserMockup (the
          demo video keeps that treatment, further down).

          The 1px white ring is carried over from the depth stack: the panel's top half sits on the
          dark hero, where a light hairline reads as a crisp edge, and it disappears against the
          light section below.

          pb-section is the only gap to At a Glance — that section has no top padding of its own,
          so the two sit exactly one `section` (80px) apart. */}
      {/* relative z-10 is load-bearing: the hero above is `relative` (it has to be, to hold the
          background illustration), and a positioned element paints over a static sibling no matter
          the DOM order — which clipped the top 112px of this shot. Lifting this section explicitly
          puts the overlap back on top where it belongs. */}
      <section className="relative z-10 px-section pb-section -mt-28">
        <div className="max-w-6xl mx-auto">
          <div
            className="overflow-hidden rounded-lg border border-border bg-foundation-100 aspect-video"
            style={{
              boxShadow:
                '0 0 0 1px rgba(255, 255, 255, 0.16), 0 25px 50px -12px rgba(0, 0, 0, 0.3)',
            }}
          >
            <img
              src="/images/dca-placeholder/workspace.svg"
              alt="The Data Conversion App workspace: batch progress, records mapped, match rate and recent activity for a state program conversion."
              className="w-full h-full object-cover object-top block"
            />
          </div>
        </div>
      </section>

      {/* ── At a glance ──
          Outcome-led: the headline number leads on the left at text-stat, with the four scan facts
          gridded 2×2 on the right behind a vertical rule. accent-warm is spent on the outcome value
          and nothing else in this strip.

          The testimonial slot sits under the stat so the two read as one unit — the number makes
          the claim, the quote corroborates it. It renders only when `testimonial` is filled in;
          see the const above. */}
      <section className="px-section pb-section">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="mb-4 flex flex-col gap-3">
              <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                At a Glance
              </p>
              <div className="w-8 h-px bg-accent-warm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-b border-border py-9">
              <div className="md:col-span-5 md:pr-8 md:border-r md:border-border">
                <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                  {glanceOutcome.label}
                </p>
                <p className="mt-3 text-stat font-grotesk text-accent-warm">
                  {glanceOutcome.value}
                </p>
                <p className="mt-2 text-caption font-sans text-foundation-500">
                  {glanceOutcome.sub}
                </p>

                {testimonial && (
                  <div className="mt-8">
                    <p className="text-body-sm font-sans text-foundation-800 italic">
                      “{testimonial.quote}”
                    </p>
                    <p className="mt-3 text-caption font-sans text-foundation-500">
                      — {testimonial.name}, {testimonial.role}
                    </p>
                  </div>
                )}
              </div>

              <div className="md:col-span-7 grid grid-cols-2 gap-x-8 gap-y-7">
                {glanceFacts.map(({ label, value, sub }) => (
                  <div key={label}>
                    <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                      {label}
                    </p>
                    <p className="mt-2 text-heading-m font-grotesk text-foundation-900">{value}</p>
                    <p className="mt-1 text-caption font-sans text-foundation-500">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Process timeline ──
          Side-by-side split: the phase before I joined on the left (4/12), my process on the
          right (8/12). The width ratio carries the 5-vs-4 imbalance — five short steps fit a
          third of the width, four detailed ones get two thirds. The "I joined here" transition is an
          accent pill heading my column, directly above step 06 — and the section's only accent.
          The column divider is neutral. Stacks on mobile, where the divider turns horizontal.

          Accessibility, measured against the cream ground (#fdfbf7):
          - The before phase is muted through SIZE (body vs heading-m) and weight, not low
            contrast. A foundation-100 fill with foundation-400 text measured 2.3:1; on cream,
            foundation-500 is 4.6:1 and foundation-600 is 7.0:1 — both clear AA's 4.5:1.
          - The badge label is foundation-900, not accent-warm: accent text at 11px is 4.1:1 and
            fails. The accent is on its outline and dot, non-text graphics, where 3:1 applies.
          - The transition is stated in text, not just drawn: each phase has an h3 under the
            section's h2, so screen-reader users can jump between them and hear where I joined.
          - role="list" restores list semantics that Safari/VoiceOver drops once Tailwind's
            preflight sets list-style: none. The second list starts at 6, matching the numbering. */}
      <section className="px-section pb-section">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionHeader accessibleEyebrow eyebrow="Process Timeline" title="Brought in after the first build" />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-8">

              {/* Phase headers are a matched pair of pills — neutral "Before", accent "I joined
                  here" — each at the top of its column, on the same line, with one line of
                  context beneath. Pills are an existing pattern (the Acentra tag pill), and both
                  keep the label scale the site uses for every group header; the shape is what
                  gives them presence, not a bigger size competing with the step titles. */}

              {/* Before I joined */}
              <div className="md:col-span-4 md:pr-8">
                <h3 className="inline-flex items-center gap-2 rounded-full border border-foundation-300 px-3 py-1.5 text-label font-grotesk text-foundation-600 uppercase tracking-widest">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full border border-foundation-500" />
                  Before
                </h3>
                <p className="mt-3 text-body-sm font-sans text-foundation-600">
                  AI engineering team, no UX involvement
                </p>

                {/* No card: the unwrapped list starts on the same line as my list, so 01 and 06
                    align (the card's 24px padding + 1px border had pushed 01 down 25px). The
                    phases are still told apart by the pills, type size, colour, column width
                    and the divider. Numbers use pt-2 on both sides so 01 and 06 match exactly.
                    Titles only — body (16px) grotesk, one step under my heading-m titles. */}
                <ol role="list" className="mt-6 flex flex-col gap-6">
                  {timelineBefore.map((title, i) => (
                    <li key={title} className="flex gap-3">
                      <span className="w-5 shrink-0 text-label font-grotesk text-foundation-500 pt-2">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-body font-grotesk text-foundation-600">{title}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* My process. The column divider is neutral — the "I joined here" pill is the
                  section's only accent, and it sits directly above step 06, where I joined. */}
              <div className="md:col-span-8 border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8">
                {/* Accent is on the outline and dot only (graphics, 3:1) — accent text at 11px
                    measures 4.1:1 and fails AA, so the label itself is foundation-900. */}
                <h3 className="inline-flex items-center gap-2 rounded-full border border-accent-warm px-3 py-1.5 text-label font-grotesk text-foundation-900 uppercase tracking-widest">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-warm" />
                  I joined here
                </h3>
                <p className="mt-3 text-body-sm font-sans text-foundation-600">My process</p>

                <ol role="list" start={timelineBefore.length + 1} className="mt-6 flex flex-col gap-12">
                  {timelineAfter.map(({ title, desc }, i) => (
                    <li key={title} className="flex gap-4">
                      <span className="w-6 shrink-0 text-label font-grotesk text-foundation-500 pt-2">
                        {String(timelineBefore.length + i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-heading-m font-grotesk text-foundation-900">{title}</p>
                        {desc && (
                          <p className="mt-4 max-w-2xl text-body-sm font-sans text-foundation-600">{desc}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Browser mockup — split dark/light background */}
      <div className="relative">
        <div className="absolute inset-0 top-0 h-1/2 bg-foundation-900" />
        <section className="relative z-10 px-section pt-section pb-0">
          <div className="max-w-6xl mx-auto">
            <BrowserMockup src="/videos/dca-demo.mp4" url="acentrahealth.com/data-conversion" />
          </div>
        </section>
      </div>

      {/* Case study grid */}
      <div className="px-section pb-section">
        <div className="max-w-6xl mx-auto">

          {/* Meta */}
          <AnimatedSection>
            <div className="mt-section mb-4 flex flex-col gap-3">
              <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                About this Project
              </p>
              <div className="w-8 h-px bg-accent-warm" />
            </div>
            <section className="border-t border-border">
              {meta.map(({ label, items }) => (
                <div key={label} className="grid grid-cols-12 gap-8 py-5 border-b border-border items-baseline">
                  <p className="col-span-2 text-label font-grotesk text-foundation-500 uppercase tracking-widest">{label}</p>
                  <p className="col-span-10 text-body font-sans text-foundation-800">
                    {items.map((item, idx) => (
                      <span key={item}>
                        {idx > 0 && <span className="text-foundation-300">{'  ·  '}</span>}
                        {item}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </section>
          </AnimatedSection>

          {/* 01 — The Problem */}
          <AnimatedSection>
            <div className="grid grid-cols-12 gap-8">

              <div className="col-span-4 pr-8 pt-section pb-section border-r border-border">
                <SectionHeader accessibleEyebrow
                  index="01"
                  eyebrow="The Problem"
                  title="A Cutover With No Room for Silent Failure"
                  quote="Legacy records had inconsistent field formats, orphaned references, and manual overrides accumulated over years — a straight database migration risked corrupting exactly the records implementation teams cared about most."
                />
              </div>

              <div className="col-span-8 pt-section pb-section grid grid-cols-2 gap-4 content-start">
                {problemFindings.map(f => (
                  <FindingCard key={f.title} {...f} />
                ))}
              </div>

            </div>
          </AnimatedSection>

          {/* 02 — The Approach */}
          <AnimatedSection>
            <div className="border-t border-border pt-section grid grid-cols-12 gap-8">

              <div className="col-span-4 pr-8 border-r border-border">
                <SectionHeader accessibleEyebrow
                  index="02"
                  eyebrow="The Approach"
                  title="Map, Preview, Commit"
                  quote="With one developer and two weeks, the fastest path wasn't the safest one. We scoped a three-step flow so implementation staff could catch problems before they became production data."
                />
              </div>

              <div className="col-span-8 flex flex-col gap-4 justify-center">
                <ul className="flex flex-col gap-4 list-none m-0 p-0">
                  {approachSteps.map((step) => (
                    <li key={step} className="flex gap-3 text-body-sm font-sans text-foundation-600">
                      <CheckMark />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </AnimatedSection>

          {/* Transition pull-quote */}
          <div className="border-t border-border">
            <PullQuote>
              We treated the conversion tool itself as a small product — not a script — because the people running the migration needed to trust what it showed them.
            </PullQuote>
          </div>

          {/* 03 — The Build */}
          <AnimatedSection>
            <div className="border-t border-border pt-section pb-section">
              <div className="max-w-2xl mb-10">
                <SectionHeader accessibleEyebrow
                  index="03"
                  eyebrow="The Build"
                  title="A Focused Tool for a Focused Team"
                  quote="Drag to compare — the legacy spreadsheet-based export process against the conversion tool's mapping screen."
                />
              </div>
              <BeforeAfter
                before="/images/dca-beforeafter/Legacy Export.png"
                after="/images/dca-beforeafter/Conversion Tool.png"
              />
            </div>
          </AnimatedSection>

          {/* 04 — Results */}
          <AnimatedSection>
            <div className="border-t border-border pt-section grid grid-cols-12 gap-8">

              <div className="col-span-4 pr-8 border-r border-border">
                <SectionHeader accessibleEyebrow
                  index="04"
                  eyebrow="Results"
                  title="Every Record Accounted For"
                  quote="We scoped two commitments before the sprint started. Both held, and the migration went live on schedule."
                />
              </div>

              <div className="col-span-8">
                <div className="grid grid-cols-12 gap-6 pb-3 border-b border-foundation-300">
                  <p className="col-span-3" />
                  <p className="col-span-4 text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                    Committed
                  </p>
                  <p className="col-span-5 text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                    Shipped
                  </p>
                </div>

                {results.map((r) => (
                  <div
                    key={r.metric}
                    className="grid grid-cols-12 gap-6 py-6 border-b border-border items-baseline"
                  >
                    <p className="col-span-3 text-heading-m font-grotesk text-foundation-900">
                      {r.metric}
                    </p>
                    <div className="col-span-4">
                      <p className="text-stat font-grotesk text-foundation-400">{r.committed}</p>
                      <p className="text-caption font-sans text-foundation-500 mt-1">
                        {r.committedNote}
                      </p>
                    </div>
                    <div className="col-span-5">
                      <p className="text-stat font-grotesk text-accent-warm">{r.delivered}</p>
                      <p className="text-caption font-sans text-foundation-600 mt-1">
                        {r.deliveredNote}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-5 mt-8">
                  {smallStats.map((m) => (
                    <div key={m.label} className="rounded-lg border border-border p-6 flex flex-col">
                      <div className="flex items-center gap-2 text-foundation-400 mb-6">
                        <MetricIcon name={m.label.includes('batches') ? 'layers' : 'clock'} />
                        <span className="text-label font-grotesk uppercase tracking-widest">{m.label}</span>
                      </div>
                      <p className="text-stat font-grotesk text-accent-warm">{m.stat}</p>
                      <p className="text-caption font-sans text-foundation-500 italic mt-auto pt-4">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </AnimatedSection>

          {/* More Work — closing case-study index */}
          <AnimatedSection>
            <div className="border-t border-border pt-section">
              <div className="mb-10">
                <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest mb-3">More Case Studies</p>
                <div className="w-8 h-px bg-accent-warm mb-6" />
                <h2 className="text-heading-l font-grotesk text-foundation-900">Keep exploring</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                {moreWork.map((p) => (
                  <a
                    key={p.num}
                    href={p.href}
                    className="group rounded-lg border border-border p-8 flex flex-col transition-colors hover:border-foundation-900"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-caption font-grotesk text-foundation-400">{p.num}</span>
                      <ArrowRight className="text-foundation-300 group-hover:text-accent-warm group-hover:translate-x-1 transition-all" />
                    </div>
                    <span className="text-label font-grotesk uppercase tracking-widest text-foundation-400 mb-3">{p.category}</span>
                    <p className="text-heading-m font-grotesk text-foundation-900 group-hover:text-accent-warm transition-colors">{p.title}</p>
                    <p className="text-body-sm font-sans text-foundation-600 mt-3">{p.desc}</p>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                      <div className="overflow-hidden">
                        <NextImage
                          label={p.title}
                          src={p.img}
                          className="mt-6 aspect-[16/9] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                        />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>

    </main>
  )
}
