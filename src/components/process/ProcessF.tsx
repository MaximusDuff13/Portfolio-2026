// Layout F — Paired columns.
//
// STRUCTURE: no selection, and no single hero image. The four deliverables sit as a two-by-two
// arrangement, each with its name and line above it, so all four names and all four
// deliverables are on the page at once.
//
// This is the most creative of the set because it gives up the thing every other layout is
// built around: one large image standing for the whole body of work. In exchange, a reader
// sees the actual shape of the project — four distinct things, comparable side by side — which
// is closer to how a portfolio reviewer actually reads a process section.
//
// WHY IT IS NOT A THUMBNAIL GRID: a grid of equal small thumbnails was a named failure, and
// the difference is size and rhythm. At two across on a twelve-column measure each frame is
// about half the content width — around 530px at 1280 — which is larger than the image in the
// approved split layout, not smaller. Nothing is cropped to a square, nothing is captioned
// underneath, and the cells are not boxed: they are two columns of work with hairlines above
// the names, the same rule treatment the rest of the page uses.
//
// THE GROUP: "Design" is carried by a single hairline and label spanning the three grouped
// cells rather than by boxing them, which would turn the pairs into cards.
//
// ORDER WITHOUT NUMBERS: reading order, left to right and top to bottom.
import { AnimatedSection } from '@/components/AnimatedSection'
import { DeliverableFrame } from './Deliverable'
import { deliverables, process, closingQuote } from './processData'

const LABEL = 'text-label font-grotesk uppercase tracking-widest'

export default function ProcessF() {
  const ungrouped = deliverables.filter((d) => !d.inDesignGroup)
  const grouped = deliverables.filter((d) => d.inDesignGroup)

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

            <div className="md:col-span-12">
              {/* The ungrouped one leads, on its own row, at half width — so the pair rhythm is
                  established before the group begins. */}
              <AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                  {ungrouped.map((d) => (
                    <div key={d.name} className="border-t border-border pt-5">
                      <p className="text-body font-grotesk text-foundation-900">{d.name}</p>
                      <p className="mt-2 text-body-sm font-sans text-foundation-600">
                        {d.description}
                      </p>
                      <div className="mt-5">
                        <DeliverableFrame item={d} />
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* The group, under one label on one rule spanning all three. */}
              <AnimatedSection>
                <p className={`${LABEL} text-foundation-400 border-t border-border pt-6 mt-14`}>
                  {process.groupLabel}
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                  {grouped.map((d) => (
                    <div key={d.name}>
                      <p className="text-body font-grotesk text-foundation-900">{d.name}</p>
                      <p className="mt-2 text-body-sm font-sans text-foundation-600">
                        {d.description}
                      </p>
                      <div className="mt-5">
                        <DeliverableFrame item={d} />
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

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
