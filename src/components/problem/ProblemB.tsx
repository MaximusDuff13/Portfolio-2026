// Layout B — Ledger.
//
// STRUCTURE: no columns anywhere. The eyebrow, the setup line and the statement stack full-width,
// and the process is one continuous rule-separated ledger running the width of the column — the
// same row pattern At a glance uses for its scope list, so it is already native to the page.
//
// Two things make the ledger carry the argument rather than just list it:
//   1. Step 1's row is the only one that expands. It fills with foundation-100, takes its marker,
//      and hangs its four labels underneath its own name inside the same row. Steps 2 to 4 are
//      one line each. The dominance is vertical space, not decoration.
//   2. The closing question is the ledger's LAST ROW, inverted to foundation-900, rather than a
//      separate band. The process runs straight into the question, so the turn toward AI reads as
//      the end of the sequence instead of a postscript. (The brief prefers a detached dark band;
//      this is the proposed alternative it allows.)
//
// No step numerals: "01–04" is not in the allowed copy, and order is already carried by position
// and by the unbroken run of hairlines.
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

// The owner is its own column, so step 3 is "Fixes" — the column already names who owns it.
const restSteps = [
  { name: 'State review', owner: 'State' },
  { name: 'Fixes', owner: 'Acentra Health' },
  { name: 'State approval', owner: 'State' },
]

export default function ProblemB() {
  return (
    <section className="px-section pb-section">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="border-t border-border pt-section">

            {/* Head — everything full-width and stacked. No label gutter, which is what separates
                this from the spine layout. */}
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

            {/* ── The ledger ──
                One table. Every row shares the same two columns — name, then owner hard right —
                so the eye can run straight down the owner column and see the alternation without
                any of it being spelled out. */}
            <div className="mt-14 border-t border-border">

              {/* Step 1 — the only row that expands. */}
              <div className="bg-foundation-100 border-b border-border px-5 py-9 sm:px-7 sm:py-11">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    <p className="text-heading-m sm:text-heading-l font-grotesk text-foundation-900">
                      Mapping &amp; transformation
                    </p>
                    <RailPill accent>This project</RailPill>
                  </div>
                  <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                    Acentra Health
                  </p>
                </div>

                {/* The labels hang inside Step 1's own row — they belong to it, so they never sit
                    outside the ledger where they would read as a second list. */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
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

              {/* Steps 2 to 4 — one line each, same two columns, legible but plainly supporting. */}
              {restSteps.map((s) => (
                <div
                  key={s.name}
                  className="flex items-baseline justify-between gap-6 border-b border-border px-5 py-5 sm:px-7"
                >
                  <p className="text-body font-grotesk text-foundation-600">{s.name}</p>
                  <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                    {s.owner}
                  </p>
                </div>
              ))}

              {/* The last row of the same ledger, inverted. The sequence ends in the question. */}
              <div className="bg-foundation-900 px-5 py-10 sm:px-7 sm:py-12">
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
