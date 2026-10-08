// MVP focus — the scope row, between the product shot and the Problem.
//
// Co-located with the page for the same reason ProblemSection is: it belongs to this case
// study alone. It mirrors that section's structure exactly — an italic serif label alone in
// the left rail, the content in a nine-column right column, stacking to one column on a phone.
// It sits directly after Problem, so it reads as the answer to the cost stated there.
//
// NOT the highlighter. The accent-warm figures are reserved for Problem and Impact, so the
// display line here is theirs in foundation-900 only. This section states the constraint; it
// does not compete with the two sections that carry the numbers.
//
// SPACING. The between-section treatment, which this section took over from Problem when the
// two swapped places: a leading border-t with pt-section below it, no pb-section, and a closing
// mt-section rule. Problem above pads its own bottom by 80px (the space over this section's
// rule) and Impact below opens with its own pt-section (the space under the closing rule) —
// one 80px source per side of every hairline, the contract the rest of the page keeps.
import { AnimatedSection } from '@/components/AnimatedSection'
import { PriorityPyramid, type PyramidTiers } from '@/components/PriorityPyramid'

const paragraphs = [
  'The MVP had one job: prove that AI-drafted mappings could replace weeks of manual Excel work. We had a month to build it, with me as the only designer, one frontend engineer, and the AI Center of Excellence team. The design work took two of those weeks.',
  'Function came first, but not at the cost of the experience. I designed the flows around how the conversion team already works, so reviewing and correcting an AI draft felt natural, not like learning a new tool. When the team tested it, they completed an internal mapping end to end. Visual polish and moments of delight came later; the experience they needed to get the job done was already there.',
]

// Top to bottom: what was cut tapers away above the line, what shipped carries the width below.
const tiers: PyramidTiers = [
  { label: 'Moments of delight' },
  { label: 'Visual aesthetic design' },
  { label: 'Usable', mvp: true },
  { label: 'Functional', mvp: true },
]

export function MvpFocus() {
  return (
    <section className="px-6 sm:px-10 lg:px-section">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="border-t border-border pt-section">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6">

              {/* The margin label — same treatment as Problem's. */}
              <div className="md:col-span-3">
                <h2 className="m-0 font-accent accent-italic text-heading-m text-foundation-900">
                  MVP focus
                </h2>
              </div>

              <div className="md:col-span-9">
                {/* Problem's and Impact's display line, without their accent-warm span, so the
                    three opening sections share one heading voice and the colour still belongs
                    to the two that carry the numbers. A <p>: the rail label is the h2. */}
                <p className="m-0 max-w-3xl font-accent accent-italic text-[36px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-display-xl text-foundation-900">
                  Built to work, designed to be used
                </p>

                {/* Same measure as Problem's paragraphs, for the same reason: max-w-lg lands
                    Inter at about 69 characters a line here, inside the 60–70 target. gap-6
                    between paragraphs, as in Problem and LearnedNextSteps. */}
                <div className="mt-6 flex max-w-lg flex-col gap-6">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph} className="m-0 text-body font-sans text-foundation-700">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-10">
                  <PriorityPyramid
                    title="What the MVP prioritised"
                    tiers={tiers}
                    aboveLabel="Not in the MVP"
                    belowLabel="In the MVP"
                  />
                </div>
              </div>
            </div>

            {/* The rule that closes the row off, and the edge Impact opens against. */}
            <div className="mt-section border-t border-border" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
