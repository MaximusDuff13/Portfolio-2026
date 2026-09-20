// Before — a sibling of Problem and Impact, built once and never varied across the Process
// layout explorations.
//
// SPINE: identical to Problem's and Impact's — italic serif label alone in the left margin
// (md:col-span-3), content in the right column (md:col-span-9), label stacking above content on
// a phone. The big line reuses the same `font-accent accent-italic text-display-xl` the other
// two sections use; no new serif, font or token.
//
// SPACING: one source per gap. The section pads neither its own top nor its own bottom — the
// section above supplies the 80px above, and the section below supplies the 80px under the
// closing hairline. This is the same rule Problem follows, and it is what keeps every hairline
// centred in a 160px gap.
//
// The closing hairline belongs to this section (mt-section border-t), so whatever follows needs
// only its own pt-section.
import { AnimatedSection } from '@/components/AnimatedSection'
import { before } from '@/components/process/processData'

export function Before() {
  return (
    <section className="px-6 sm:px-10 lg:px-section">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6">
              <div className="md:col-span-3">
                <p className="font-accent accent-italic text-heading-m text-foundation-900">
                  {before.label}
                </p>
              </div>

              <div className="md:col-span-9">
                <p className="max-w-3xl font-accent accent-italic text-display-xl text-foundation-900">
                  {before.bigLine}
                </p>

                <p className="mt-10 max-w-lg text-body font-sans text-foundation-700">
                  {before.line}
                </p>
              </div>
            </div>

            {/* Closing hairline. The next section supplies the space beneath it. */}
            <div className="mt-section border-t border-border" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
