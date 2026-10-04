// OPTION 4a — the original split. The design quote large on the left (7 of 12 columns), the
// project quote small on the right (4 of 12, after a one-column gutter) behind a vertical
// hairline. Below md they stack, the large one first, the hairline turning horizontal.
//
// ATTRIBUTION. One line in its own full-width row under both columns, after a hairline that spans
// them both, so it closes the pair rather than sitting under either quote.
import { attribution, designQuote, projectQuote, sectionLabel } from './testimonials'
import { ATTRIBUTION, EYEBROW, LARGE, SECTION, SMALL, WRAP } from './split'

export function Option4a() {
  return (
    <section data-testimonials="" className={SECTION}>
      <div className={WRAP}>
        <p className={EYEBROW}>{sectionLabel}</p>
        <figure className="m-0 mt-10">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:items-start">
            <blockquote className={`${LARGE} md:col-span-7`}>{designQuote.text}</blockquote>
            <blockquote
              className={`${SMALL} border-t border-foundation-300 pt-8 md:col-span-4 md:col-start-9 md:border-l md:border-t-0 md:pl-8 md:pt-0`}
            >
              {projectQuote.text}
            </blockquote>
          </div>
          <figcaption className={`mt-12 border-t border-border pt-6 ${ATTRIBUTION}`}>{attribution}</figcaption>
        </figure>
      </div>
    </section>
  )
}
