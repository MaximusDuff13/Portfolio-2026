import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { BrowserMockup } from '@/components/BrowserMockup'
import { BuiltOnCarbon } from '@/components/BuiltOnCarbon'
import { FindingCard } from '@/components/FindingCard'
import { SectionHeader } from '@/components/SectionHeader'
import { PullQuote } from '@/components/PullQuote'

const auditQuote =
  'Before building the design system, I partnered with a lead developer to audit the ecosystem — reviewing Figma libraries, component structures, and design workflows to understand what was blocking progress.'

// The hero finding leads the bento grid; the two smaller findings sit below it.
const heroFinding = {
  title: 'Accessibility Risk',
  description: 'Existing color combinations failed WCAG contrast minimums, creating legal and usability risk across the product suite.',
  src: '/images/audit/Accessibility.png',
}

const auditFindings = [
  {
    title: 'Color Audit',
    description: 'Colors were hardcoded hex values with no shared tokens — every design change meant hunting across dozens of files.',
    src: '/images/audit/Color Audit.png',
  },
  {
    title: 'Text Styles',
    description: 'Typography was inconsistent. Non-brand fonts and ad-hoc sizes with no shared text styles across either product.',
    src: '/images/audit/Text Styles.png',
  },
]

export const metadata: Metadata = {
  title: 'Acentra Health Design System — Michael Jerome',
  description:
    'How I built a scalable design system that unified tokens, components, and accessibility standards across two product teams.',
}

const description =
  "Without a shared system, two product teams were shipping inconsistent, inaccessible UIs with zero shared vocabulary. I partnered with a lead developer to audit the existing ecosystem, identify the risks, and build Acentra Health Design System from the ground up — a scalable system that unified tokens, components, and accessibility standards across Acentra Health's product suite."

const meta = [
  { label: 'My Role',  items: ['Design Ops', 'Accessibility', 'Token Strategy'] },
  { label: 'Team',     items: ['1 Developer', 'Lead Designer'] },
  { label: 'Timeline', items: ['8 months', '2024'] },
]

// Goals committed to leadership vs. what the first release delivered.
const goals = [
  {
    metric: 'Compliance',
    committed: '90%',
    committedNote: 'Target AA compliance coverage',
    delivered: '60%',
    deliveredNote: 'AA coverage, month one',
  },
  {
    metric: 'Adoption',
    committed: '2–3',
    committedNote: 'Products with unified components',
    delivered: '5',
    deliveredNote: 'Projects adopted AHDS in a quarter',
  },
  {
    metric: 'Efficiency',
    committed: '30%',
    committedNote: 'Design-to-dev handoff reduction',
    delivered: '50%',
    deliveredNote: 'Faster handoff, dev estimate',
  },
]

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

const foundationRationale = [
  {
    group: 'Technical Fit',
    points: [
      'Native compatibility with our Angular stack',
      'WCAG 2.2 AA compliant out of the box',
      'Eliminated accessibility debt from day one',
    ],
  },
  {
    group: 'Strategic Fit',
    points: [
      'Small team constraint — one designer, one developer, zero downtime',
      'Ship incrementally vs. waiting for a big-bang launch',
      "Modular token architecture ready for Acentra's dual-brand future",
    ],
  },
]

function SelectedTag() {
  return (
    <span className="inline-flex items-center rounded-full bg-foundation-900 px-2.5 py-1 text-label font-grotesk uppercase tracking-widest text-body">
      Selected
    </span>
  )
}

function RejectedTag() {
  return (
    <span className="inline-flex items-center text-label font-grotesk uppercase tracking-widest text-foundation-400">
      Rejected
    </span>
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

export default function AcentraHealthPage() {
  return (
    <main className="min-h-screen bg-body">

      {/* Dark hero */}
      <section className="bg-foundation-900 px-section pt-section pb-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row">

          <div className="flex-1 md:pr-20 flex items-center">
            <AnimatedSection>
              <h1 className="text-display-2xl font-grotesk text-body">
                One System.<br />Two Brands
              </h1>
            </AnimatedSection>
          </div>

          <div className="hidden md:block w-px bg-foundation-600" />

          <div className="flex-1 md:pl-20 flex items-center">
            <AnimatedSection>
              <p className="text-body font-sans text-foundation-300">
                {description}
              </p>
            </AnimatedSection>
          </div>

        </div>
      </section>

      {/* Browser mockup — split dark/light background */}
      <div className="relative">
        <div className="absolute inset-0 top-0 h-1/2 bg-foundation-900" />
        <section className="relative z-10 px-section pt-section pb-0">
          <div className="max-w-6xl mx-auto">
            <BrowserMockup src="/videos/acentra-health.mp4" url="acentrahealth.com/design-system" />
          </div>
        </section>
      </div>

      {/* Case study grid */}
      <div className="px-section pb-section">
        <div className="max-w-6xl mx-auto">

          {/* Meta */}
          <AnimatedSection>
            <div className="mt-section mb-4 flex flex-col gap-3">
              <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">
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

          {/* Audit & Findings */}
          <AnimatedSection>
            <div className="grid grid-cols-12 gap-8">

              {/* Narrative column */}
              <div className="col-span-4 pr-8 pt-section pb-section border-r border-border">
                <SectionHeader
                  index="01"
                  eyebrow="Audit"
                  title="A Fragmented Foundation"
                  quote={auditQuote}
                />
              </div>

              {/* Bento grid */}
              <div className="col-span-8 pt-section pb-section flex flex-col gap-4">
                {/* Hero — Accessibility Risk */}
                <FindingCard variant="hero" {...heroFinding} />

                {/* Two smaller cards */}
                <div className="grid grid-cols-2 gap-4">
                  {auditFindings.map(f => (
                    <FindingCard key={f.title} {...f} />
                  ))}
                </div>
              </div>

            </div>
          </AnimatedSection>

          {/* Post-audit pull-quote — transition into the brief */}
          <div className="border-t border-border">
            <PullQuote>
              We presented these findings to leadership to align on the risks of the legacy path and the need for a scalable restart.
            </PullQuote>
          </div>

          {/* Goals & Outcomes — narrative rail + committed-vs-delivered ledger */}
          <AnimatedSection>
            <div className="border-t border-border pt-section grid grid-cols-12 gap-8">

              {/* Narrative rail */}
              <div className="col-span-4 pr-8 border-r border-border">
                <SectionHeader
                  index="02"
                  eyebrow="Goals & Outcomes"
                  title="Measured against the promise"
                  quote="We committed to three targets in the leadership review. One release in, two were already exceeded and the third was well on track."
                />
              </div>

              {/* Ledger as evidence */}
              <div className="col-span-8">
                {/* Column headers */}
                <div className="grid grid-cols-12 gap-6 pb-3 border-b border-foundation-300">
                  <p className="col-span-3" />
                  <p className="col-span-4 text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                    Committed
                  </p>
                  <p className="col-span-5 text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                    First Release
                  </p>
                </div>

                {/* One row per metric */}
                {goals.map((g) => (
                  <div
                    key={g.metric}
                    className="grid grid-cols-12 gap-6 py-6 border-b border-border items-baseline"
                  >
                    <p className="col-span-3 text-heading-m font-grotesk text-foundation-900">
                      {g.metric}
                    </p>
                    <div className="col-span-4">
                      <p className="text-stat font-grotesk text-foundation-400">{g.committed}</p>
                      <p className="text-caption font-sans text-foundation-500 mt-1">
                        {g.committedNote}
                      </p>
                    </div>
                    <div className="col-span-5">
                      <p className="text-stat font-grotesk text-accent-warm">{g.delivered}</p>
                      <p className="text-caption font-sans text-foundation-600 mt-1">
                        {g.deliveredNote}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </AnimatedSection>

          {/* Choosing the Foundation — three-up comparison + rationale */}
          <AnimatedSection>
            <div className="border-t border-border pt-section pb-section">
              <SectionHeader
                index="03"
                eyebrow="Choosing the Foundation"
                title="Three paths, one fit"
              />

              {/* The three options weighed side by side */}
              <div className="grid grid-cols-3 gap-5 mt-10 mb-12">
                {foundationOptions.map((o) => (
                  <div
                    key={o.id}
                    className={`rounded-lg border p-6 flex flex-col ${
                      o.selected
                        ? 'border-foundation-900 shadow-[0_1px_0_#1c1917] -translate-y-1'
                        : 'border-border opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-caption font-grotesk text-foundation-400">Option {o.id}</span>
                      {o.selected ? <SelectedTag /> : <RejectedTag />}
                    </div>
                    <p
                      className={`text-heading-m font-grotesk mb-3 ${
                        o.selected ? 'text-foundation-900' : 'text-foundation-500'
                      }`}
                    >
                      {o.name}
                    </p>
                    <p className="text-body-sm font-sans text-foundation-600">{o.desc}</p>
                  </div>
                ))}
              </div>

              {/* Why Carbon won */}
              <div className="border-t border-border pt-10 grid grid-cols-12 gap-10">
                <p className="col-span-12 text-heading-m font-grotesk text-foundation-900 -mb-2">
                  Why Carbon was the right foundation
                </p>
                {foundationRationale.map((r) => (
                  <div key={r.group} className="col-span-6">
                    <p className="text-label font-grotesk text-foundation-900 uppercase tracking-widest mb-4">
                      {r.group}
                    </p>
                    <ul className="flex flex-col gap-3 list-none m-0 p-0">
                      {r.points.map((p) => (
                        <li key={p} className="flex gap-3 text-body-sm font-sans text-foundation-600">
                          <CheckMark />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Foundation pull-quote — buy-in secured, transition into the build */}
          <div className="border-t border-border">
            <PullQuote>
              We pitched the adapt-and-extend approach to leadership, secured buy-in, and set Carbon as the foundation, the decision that made everything else possible.
            </PullQuote>
          </div>

          {/* Built on Carbon — tabbed Color / Typography spine */}
          <BuiltOnCarbon />

        </div>
      </div>

    </main>
  )
}
