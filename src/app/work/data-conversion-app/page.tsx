import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { BeforeAfter } from '@/components/BeforeAfter'
import { BrowserMockup } from '@/components/BrowserMockup'
import { FindingCard } from '@/components/FindingCard'
import { SectionHeader } from '@/components/SectionHeader'
import { PullQuote } from '@/components/PullQuote'
import { InfoNote } from './InfoNote'
import { DepthStack } from './DepthStack'

export const metadata: Metadata = {
  title: 'Data Conversion App — Michael Jerome',
  description:
    'How a two-week MVP tool let Acentra Health map, preview, and safely convert legacy case data ahead of a system cutover.',
}

const description =
  "DDI — Design, Develop, Implement — is how Acentra moves a state program's data from a legacy system onto [Product]. This MVP reimagines the process with AI, cutting a 2–3 month conversion to 1–2 weeks."

// Result section stats — stated as text, so no month→week conversion is needed here.
const resultStat = {
  conversionAfter: '1–2 weeks',
  conversionCaption: 'Down from a typical 2–3 month conversion timeline',
  designTime: '2 weeks',
  designCaption: 'Design accelerated from months to weeks with AI',
}

// Info-note copy. The design note is still Michael's draft wording — adjust freely.
const conversionNote =
  "The process of moving a state program's claims and provider data from a legacy system onto [Product]."
const designNote =
  'AI generated rapid design variants, letting each iteration take days instead of weeks.'

const meta = [
  { label: 'My Role',  items: ['Product Design', 'Rapid Prototyping'] },
  { label: 'Team',     items: ['1 Developer', '1 Implementation Lead'] },
  { label: 'Timeline', items: ['2 Weeks', '2025'] },
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
      <section className="bg-foundation-900 px-section pt-section pb-44">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row">

          <div className="flex-1 md:pr-20 flex items-center">
            <AnimatedSection>
              <h1 className="text-heading-xl font-grotesk text-body">
                Reimagining data conversion at Acentra Health
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

      {/* Product shots — depth stack. Pulled up with -mt-28 (112px) so it straddles the hero's
          bottom edge; against the hero's pb-44 (176px) that leaves 176 − 112 = 64px of clear dark
          between the hero copy and the top of the screens.

          Screens fan out into an even row on hover (tap on touch). The hover/tap state lives in
          its own client component (DepthStack) — this page stays a server component.

          CONTENT: generic screens only. The Dictionary / Mapping / Transformation story belongs to
          its own section later on the page and is deliberately not previewed here. No browser
          chrome, so this reads as a product shot rather than a re-run of the BrowserMockup.

          pb-section is the only gap to Result — Result has no top padding of its own, so the two
          sections sit exactly one `section` (80px) apart. */}
      <section className="px-section pb-section -mt-28">
        <DepthStack />
      </section>

      {/* ── Result — ledger rows, no boxes. ──
          Explicit column widths (not a 12-col span split): the label column is a fixed 210px so
          both stat numbers start on the same x regardless of label length, and the stat column is
          sized to the widest number rather than a percentage — otherwise the caption drifts far
          from its stat as the viewport grows. Caption is capped at max-w-md to hold its measure.

          Note placement is split on purpose: the top row opens upward and the bottom row downward,
          so each note lands in the section's outer padding instead of covering the other row's
          stat. The note is the flat, restrained treatment — no rotation, no torn edge.

          pb-section only: the product shots above already end with pb-section, so adding a top
          pad here would double the gap to 160px. */}
      <section className="px-section pb-section">
        <div className="max-w-6xl mx-auto border-t border-border">

          <div className="relative grid grid-cols-1 md:grid-cols-[210px_260px_minmax(0,1fr)] gap-x-6 gap-y-2 py-7 border-b border-border md:items-baseline">
            <p className="text-label font-grotesk uppercase tracking-widest text-foundation-400 flex items-center gap-2">
              Data conversion time
              <InfoNote note={conversionNote} label="Data conversion time" placement="above" />
            </p>
            <p className="text-stat font-grotesk text-accent-warm">{resultStat.conversionAfter}</p>
            <p className="text-body-sm font-sans text-foundation-600 max-w-md">{resultStat.conversionCaption}</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-[210px_260px_minmax(0,1fr)] gap-x-6 gap-y-2 py-7 border-b border-border md:items-baseline">
            <p className="text-label font-grotesk uppercase tracking-widest text-foundation-400 flex items-center gap-2">
              Design time
              <InfoNote note={designNote} label="Design time" placement="below" />
            </p>
            <p className="text-stat font-grotesk text-accent-warm">{resultStat.designTime}</p>
            <p className="text-body-sm font-sans text-foundation-600 max-w-md">{resultStat.designCaption}</p>
          </div>

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

          {/* 01 — The Problem */}
          <AnimatedSection>
            <div className="grid grid-cols-12 gap-8">

              <div className="col-span-4 pr-8 pt-section pb-section border-r border-border">
                <SectionHeader
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
                <SectionHeader
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
                <SectionHeader
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
                <SectionHeader
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
                <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-3">More Case Studies</p>
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
