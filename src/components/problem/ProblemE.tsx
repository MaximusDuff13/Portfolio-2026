// Layout E — Bracket.
//
// STRUCTURE: the whole process is compressed into ONE quiet line at the top — four names on a
// single rule, separated by hairlines, each with its owner beneath. That line is context and
// nothing more. Then a bracket drops out of Step 1's position on that line and opens into the
// large block beneath it.
//
// The move this layout makes: the sequence and the subject are two different objects at two
// different scales, joined by a drawn connector. You read "there are four of these" in one
// glance, then the bracket physically pulls one of them out and enlarges it. Nothing has to say
// "step one is the longest" — the geometry says it.
//
// The breadcrumb is a four-column grid and the connector is placed in that same grid's first
// column, so the bracket always lands under Step 1 whatever the column widths do.
//
// WHY NOT SectionHeader: its h2 is fixed at text-heading-xl (36px) and cannot carry the statement
// at the scale the squint test needs. The eyebrow below is its markup copied exactly.
import { RailPill } from '@/components/Rail'
import { AnimatedSection } from '@/components/AnimatedSection'

const setup = 'Programs used to accept 12 to 24 month implementations. Now they want 5 to 8.'

const heading = '4 to 6 weeks, mapped by hand'

const stepOneLabels = [
  'Longest step',
  '4 to 5 people, in spreadsheets',
  '~40 fields per provider table',
  'Every rule written by hand',
]

// All four on the breadcrumb, in order. Each carries its owner below, so step 3 is "Fixes" —
// the owner line under it already names Acentra Health.
const allSteps = [
  { name: 'Mapping & transformation', owner: 'Acentra Health', subject: true },
  { name: 'State review', owner: 'State', subject: false },
  { name: 'Fixes', owner: 'Acentra Health', subject: false },
  { name: 'State approval', owner: 'State', subject: false },
]

export default function ProblemE() {
  return (
    <section className="px-section pb-section">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="border-t border-border pt-section">

            <div className="flex flex-col gap-3">
              <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                The Problem
              </p>
              <div className="w-8 h-px bg-accent-warm" />
            </div>

            <p className="mt-8 max-w-xl text-body-sm font-sans text-foundation-500">{setup}</p>

            <h2 className="mt-5 max-w-4xl text-display-xl lg:text-display-2xl font-grotesk text-foundation-900">
              {heading}
            </h2>

            {/* ── The breadcrumb ──
                The whole process on one rule. Step 1 is the only entry in foundation-900 with an
                accent marker; the other three are foundation-400. Two columns on a phone so the
                names never compress to two characters a line. */}
            <div className="mt-14">
              <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-border">
                {allSteps.map((s) => (
                  <div
                    key={s.name}
                    className="border-b sm:border-b-0 border-l first:border-l-0 sm:[&:nth-child(3)]:border-l border-border px-4 py-4 first:pl-0"
                  >
                    <span
                      className={`block w-1.5 h-1.5 rounded-full ${
                        s.subject ? 'bg-accent-warm' : 'bg-foundation-300'
                      }`}
                    />
                    <p
                      className={`mt-3 text-body-sm font-grotesk ${
                        s.subject ? 'text-foundation-900' : 'text-foundation-400'
                      }`}
                    >
                      {s.name}
                    </p>
                    <p className="mt-1 text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                      {s.owner}
                    </p>
                  </div>
                ))}
              </div>

              {/* ── The bracket ──
                  Same four-column grid, so the drop always sits under Step 1. A short accent
                  stem, then the horizontal shoulder that opens into the block below. */}
              <div className="grid grid-cols-2 sm:grid-cols-4" aria-hidden="true">
                <div className="flex flex-col">
                  <span className="w-px h-8 bg-accent-warm" />
                </div>
              </div>
              <div className="h-px bg-accent-warm" aria-hidden="true" />

              {/* Step 1, enlarged. */}
              <div className="rounded-b-lg border-x border-b border-border bg-foundation-100 p-6 sm:p-9">
                {/* No step name here: the bracket already points at Step 1 on the breadcrumb
                    above, so repeating "Mapping & transformation" would set the same words twice
                    inside one visual. The marker alone identifies it. */}
                <RailPill accent>This project</RailPill>

                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 border-t border-border pt-6">
                  {stepOneLabels.map((l) => (
                    <p
                      key={l}
                      className="text-label font-grotesk text-foundation-600 uppercase tracking-widest"
                    >
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-14 border-t border-border pt-14">
              <div className="rounded-lg bg-foundation-900 px-6 py-12 sm:px-12 sm:py-16">
                <p className="max-w-3xl text-heading-m sm:text-heading-l lg:text-heading-xl font-grotesk text-body">
                  Could AI draft <span className="text-accent-warm">20 to 25</span> of those 40
                  fields, rules included?
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
