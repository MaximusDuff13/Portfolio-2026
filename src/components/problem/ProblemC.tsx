// Layout C — Margin rail.
//
// STRUCTURE: an asymmetric 8 / 4 split. Step 1 is a tall panel holding two thirds of the width;
// steps 2 to 4 live in a narrow right-hand margin as a vertical rail hung off a single hairline.
// Dominance here is COLUMN WIDTH and height, not fill or type size — Step 1 is simply given most
// of the page, and the remaining three are pushed into the margin the way a sidenote is.
//
// What separates it from the ledger: the four steps are no longer a single list in one column.
// They sit in two different places with two different shapes, and the reader understands the
// hierarchy before reading a word of it.
//
// Step 1's labels stack VERTICALLY down the panel on their own hairlines, one per line. Set four
// across, as the flatter layouts do, they read as a row of equal facts; stacked, they read as the
// panel accumulating weight, which is the impression this layout is built around.
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

// In the margin the owner sets beneath the name rather than in its own column, so step 3 keeps
// its full "Fixes by Acentra Health" — there is no separate owner column to repeat it.
const restSteps = [
  { name: 'State review', owner: 'State' },
  { name: 'Fixes by Acentra Health', owner: 'Acentra Health' },
  { name: 'State approval', owner: 'State' },
]

export default function ProblemC() {
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

            {/* ── The split ──
                items-stretch so the margin rail's hairline runs the full height of the panel
                beside it; the rail then reads as the edge of the same object rather than as a
                floating list. */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-10 items-stretch">

              {/* Step 1 — two thirds of the width, full height. */}
              <div className="md:col-span-8">
                <div className="h-full rounded-lg border border-border bg-foundation-100 p-6 sm:p-9">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    <p className="text-heading-m sm:text-heading-l font-grotesk text-foundation-900">
                      Mapping &amp; transformation
                    </p>
                    <RailPill accent>This project</RailPill>
                  </div>

                  <p className="mt-3 text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                    Acentra Health
                  </p>

                  {/* One label per hairline, stacked. */}
                  <div className="mt-8">
                    {stepOneLabels.map((l) => (
                      <p
                        key={l}
                        className="border-t border-border py-3 text-label font-grotesk text-foundation-600 uppercase tracking-widest"
                      >
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Steps 2 to 4 — the margin. One hairline down the left edge, entries hung off it.
                  Below md the hairline and the indent stay, so the rail keeps its identity when
                  it stacks under the panel instead of beside it. */}
              <div className="md:col-span-4">
                <div className="h-full border-l border-border pl-6 flex flex-col justify-center gap-8">
                  {restSteps.map((s) => (
                    <div key={s.name}>
                      <p className="text-body font-grotesk text-foundation-600">{s.name}</p>
                      <p className="mt-1.5 text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                        {s.owner}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Closing band, across the full width beneath both columns. */}
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
