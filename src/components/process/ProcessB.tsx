// Layout B — Stacked reveal.
//
// STRUCTURE: no selection at all. Every deliverable is on the page at once, as four full-width
// rows running down the section: the name and its one line in a narrow left column, the
// deliverable large on the right. The four names are visible because all four rows are.
//
// WHY NO SELECTION: this is the only layout where a skimmer who never clicks misses nothing.
// Everything A hides behind three unclicked tabs is simply present. The cost is length — the
// section becomes the tallest of the set — which is the honest trade.
//
// The "Design" group label sits on its own rule immediately before the first grouped row, so
// the grouping survives without boxing the rows or indenting them.
//
// ORDER WITHOUT NUMBERS: vertical position only. No numerals anywhere.
//
// Each row is its own AnimatedSection, which gives the stack a light cascade as it scrolls in
// rather than four rows arriving at once. Nothing auto-advances; there is nothing to advance.
import { AnimatedSection } from '@/components/AnimatedSection'
import { DeliverableFrame } from './Deliverable'
import { deliverables, process, closingQuote } from './processData'

const LABEL = 'text-label font-grotesk uppercase tracking-widest'

export default function ProcessB() {
  const firstGrouped = deliverables.findIndex((d) => d.inDesignGroup)

  return (
    <section className="px-6 sm:px-10 lg:px-section">
      <div className="max-w-6xl mx-auto">
        <div className="pt-section">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6">

            <div className="md:col-span-3">
              <AnimatedSection>
                <p className="font-accent accent-italic text-heading-m text-foundation-900">
                  {process.label}
                </p>
              </AnimatedSection>
            </div>

            {/* Full width, for the same reason as every other layout here: nested in the nine
                columns beside the label the deliverables shrink to thumbnails. */}
            <div className="md:col-span-12">

              {/* An index of all four names across the top. Without it the stack fails the rule
                  that the whole set is visible at once: the rows are tall enough that names two
                  to four sit below the fold. The names repeat as each row's own heading further
                  down, which is what lets the index stay this quiet. */}
              <AnimatedSection>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-3 border-t border-border pt-5">
                  {deliverables.map((d) => (
                    <p key={d.name} className="text-body-sm font-grotesk text-foundation-500">
                      {d.name}
                    </p>
                  ))}
                </div>
              </AnimatedSection>

              {deliverables.map((d, i) => (
                <AnimatedSection key={d.name}>
                  {i === firstGrouped && (
                    <p className={`${LABEL} text-foundation-400 border-t border-border pt-6 mt-12`}>
                      {process.groupLabel}
                    </p>
                  )}

                  <div
                    className={`grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-5 ${
                      i === 0 ? 'mt-12' : 'mt-14'
                    }`}
                  >
                    <div className="md:col-span-4">
                      <p className="text-body font-grotesk text-foundation-900">{d.name}</p>
                      <p className="mt-2 max-w-sm text-body-sm font-sans text-foundation-600">
                        {d.description}
                      </p>
                    </div>

                    <div className="md:col-span-8">
                      <DeliverableFrame item={d} />
                    </div>
                  </div>
                </AnimatedSection>
              ))}

              <AnimatedSection>
                <div className="mt-14 border-t border-border pt-6">
                  <figure>
                    <figcaption className={`${LABEL} text-foundation-500`}>
                      {closingQuote.role}
                    </figcaption>
                    <blockquote className="mt-3 max-w-2xl font-accent accent-italic text-body text-foundation-800">
                      {closingQuote.text}
                    </blockquote>
                  </figure>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
