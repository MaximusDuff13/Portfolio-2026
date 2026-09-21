// MVP focus — the scope row, between the product shot and the Problem.
//
// Co-located with the page for the same reason ProblemSection is: it belongs to this case
// study alone. It mirrors that section's structure exactly — an italic serif label alone in
// the left rail, the content in a nine-column right column, stacking to one column on a phone.
// It sits directly after Problem, so it reads as the answer to the cost stated there.
//
// NOT the highlighter. The big accent-warm lines are reserved for Problem and Impact, so the
// heading here is an ordinary heading-xl in foundation-900. This section states the constraint;
// it does not compete with the two sections that carry the numbers.
//
// SPACING. The between-section treatment, which this section took over from Problem when the
// two swapped places: a leading border-t with pt-section below it, no pb-section, and a closing
// mt-section rule. Problem above pads its own bottom by 80px (the space over this section's
// rule) and Impact below opens with its own pt-section (the space under the closing rule) —
// one 80px source per side of every hairline, the contract the rest of the page keeps.
import { AnimatedSection } from '@/components/AnimatedSection'
import { PriorityPyramid, type PyramidTiers } from '@/components/PriorityPyramid'

const paragraph =
  'We came together, me as the designer, one frontend engineer and the AI Center of Excellence team, to build this MVP in a month. The design took 2 weeks of that.'

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
                <p className="font-accent accent-italic text-heading-m text-foundation-900">
                  MVP focus
                </p>
              </div>

              <div className="md:col-span-9">
                <h2 className="text-heading-xl font-grotesk text-foundation-900">
                  An MVP, built in a month
                </h2>

                {/* Same measure as Problem's paragraph, for the same reason: max-w-lg lands
                    Inter at about 69 characters a line here, inside the 60–70 target. */}
                <p className="mt-6 max-w-lg text-body font-sans text-foundation-700">
                  {paragraph}
                </p>

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
