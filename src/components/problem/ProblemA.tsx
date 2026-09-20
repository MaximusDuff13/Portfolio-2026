// Layout A — Editorial spine.
//
// STRUCTURE: the page's existing label-left / content-right section rhythm. A small label holds
// the left column; the setup line and the oversized statement hold the right. Beneath them the
// four-step visual: Step 1 is a filled, bordered block carrying the "This project" marker and its
// four labels, and steps 2 to 4 are quiet rows under it. A hairline separates the whole thing
// from the dark closing band.
//
// WHY THE HEADING IS NOT A SectionHeader: that component's h2 is fixed at text-heading-xl (36px),
// which cannot carry the statement at the scale the section needs. The eyebrow block below is its
// markup copied exactly — label, tracking, colour, and the w-8 accent rule — so the two sections
// still set identically.
//
// TEXT LEVELS (three, plus the one permitted setup line):
//   1. display-xl/2xl heading and the heading-l closing question
//   2. step names
//   3. text-label micro-labels
// The setup line is body-sm foundation-500 and stays clearly under the heading.
import { RailPill } from '@/components/Rail'
import { AnimatedSection } from '@/components/AnimatedSection'

const setup = 'Programs used to accept 12 to 24 month implementations. Now they want 5 to 8.'

const heading = '4 to 6 weeks, mapped by hand'

// Step 1's supporting labels. Tiny tier — they qualify the block, they never explain it.
const stepOneLabels = [
  'Longest step',
  '4 to 5 people, in spreadsheets',
  '~40 fields per provider table',
  'Every rule written by hand',
]

// Steps 2 to 4. The owner sits in its own column, so step 3 is "Fixes" rather than "Fixes by
// Acentra Health" — the column already says who owns it, and the full phrase would set the same
// words twice on one row.
const restSteps = [
  { name: 'State review', owner: 'State' },
  { name: 'Fixes', owner: 'Acentra Health' },
  { name: 'State approval', owner: 'State' },
]

export default function ProblemA() {
  return (
    <section className="px-section pb-section">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="border-t border-border pt-section">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">

              {/* Label column. On a phone this stacks above the content, in reading order. */}
              <div className="md:col-span-3">
                <div className="flex flex-col gap-3">
                  <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                    The Problem
                  </p>
                  <div className="w-8 h-px bg-accent-warm" />
                </div>
              </div>

              <div className="md:col-span-9">
                {/* The one small setup line. Quieter than everything below it by design. */}
                <p className="max-w-xl text-body-sm font-sans text-foundation-500">{setup}</p>

                <h2 className="mt-6 max-w-3xl text-display-xl lg:text-display-2xl font-grotesk text-foundation-900">
                  {heading}
                </h2>

                {/* ── The four-step visual ──
                    Step 1 is a filled block; steps 2 to 4 are rows beneath it at a legible size.
                    The visual says what the heading cannot: that there are four steps, who owns
                    each, and how much of the process Step 1 is. */}
                <div className="mt-12">
                  <div className="rounded-lg border border-border bg-foundation-100 p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                      <p className="text-heading-m font-grotesk text-foundation-900">
                        Mapping &amp; transformation
                      </p>
                      <RailPill accent>This project</RailPill>
                    </div>

                    <p className="mt-2 text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                      Acentra Health
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 border-t border-border pt-5">
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

                  {/* Steps 2 to 4 — quieter, but still at a legible size, never shrunk to markers. */}
                  <div className="mt-2">
                    {restSteps.map((s) => (
                      <div
                        key={s.name}
                        className="flex items-baseline justify-between gap-4 border-b border-border py-4"
                      >
                        <p className="text-body font-grotesk text-foundation-600">{s.name}</p>
                        <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                          {s.owner}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Closing band ──
                Separated by its own hairline, then the dark block. "20 to 25" is the only accent
                text on the band, and it is a stat highlight rather than body copy. */}
            <div className="mt-12 border-t border-border pt-12">
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
