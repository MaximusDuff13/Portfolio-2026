// Layout F — Inversion.
//
// STRUCTURE: the statement and the subject are the same object. The oversized line is set INSIDE
// Step 1's block, under that step's own name, so the block is not an illustration of the heading
// — it is the heading. Steps 2 to 4 then collapse to a single quiet line beneath it.
//
// This is the most compressed of the set: one large object, one thin line of context, one dark
// band. It works because the two jobs stay separate even inside one container — the type says
// what the cost is, and the container's scale against the line below it says which of the four
// steps carries that cost.
//
// The risk is the opposite of the other layouts': with so little around it, the three supporting
// steps must not shrink to nothing, so they keep body size and their owners and sit on their own
// rule rather than becoming a caption.
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

// One line of three. Owner sits under the name, so step 3 is "Fixes".
const restSteps = [
  { name: 'State review', owner: 'State' },
  { name: 'Fixes', owner: 'Acentra Health' },
  { name: 'State approval', owner: 'State' },
]

export default function ProblemF() {
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

            {/* ── The block that IS the statement ──
                Step name and marker first, at the quiet tier, then the oversized line under them.
                The reading order is still step, then what the step costs. */}
            <div className="mt-10 rounded-lg border border-border bg-foundation-100 p-6 sm:p-10 lg:p-14">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <p className="text-body font-grotesk text-foundation-600">
                  Mapping &amp; transformation
                </p>
                <RailPill accent>This project</RailPill>
                <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                  Acentra Health
                </p>
              </div>

              <h2 className="mt-6 max-w-4xl text-display-xl lg:text-display-2xl font-grotesk text-foundation-900">
                {heading}
              </h2>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 border-t border-border pt-7">
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

            {/* The rest of the process, one line, on its own rule. Kept at body size so it reads
                as the remaining three steps and not as a footnote to the block. */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5 border-t border-border pt-6">
              {restSteps.map((s) => (
                <div key={s.name}>
                  <p className="text-body font-grotesk text-foundation-600">{s.name}</p>
                  <p className="mt-1 text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                    {s.owner}
                  </p>
                </div>
              ))}
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
