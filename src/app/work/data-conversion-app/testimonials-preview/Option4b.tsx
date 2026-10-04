// OPTION 4b — the split reversed: the project quote small on the left (4 of 12 columns) behind a
// vertical hairline on its right, the design quote large on the right (7 of 12, from column 6).
//
// ORDER. The design quote is first in the markup and is placed into the right-hand column from
// md up, so reading order (screen readers, and the stacked layout below md) still starts with
// the primary quote; only the visual sides swap.
//
// ATTRIBUTION. One line in a full-width row under both columns, after a hairline across them,
// set to start at the large quote's column so it ends the row on the side the eye finishes on.
import { attribution, designQuote, projectQuote, sectionLabel } from './testimonials'
import { ATTRIBUTION, EYEBROW, LARGE, SECTION, SMALL, WRAP } from './split'

export function Option4b() {
  return (
    <section data-testimonials="" className={SECTION}>
      <div className={WRAP}>
        <p className={EYEBROW}>{sectionLabel}</p>
        <figure className="m-0 mt-10">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:items-start">
            <blockquote className={`${LARGE} md:col-span-7 md:col-start-6 md:row-start-1`}>
              {designQuote.text}
            </blockquote>
            <blockquote
              className={`${SMALL} border-t border-foundation-300 pt-8 md:col-span-4 md:col-start-1 md:row-start-1 md:border-r md:border-t-0 md:pr-8 md:pt-0`}
            >
              {projectQuote.text}
            </blockquote>
          </div>
          <div className="mt-12 grid grid-cols-1 border-t border-border pt-6 md:grid-cols-12">
            <figcaption className={`${ATTRIBUTION} md:col-span-7 md:col-start-6`}>{attribution}</figcaption>
          </div>
        </figure>
      </div>
    </section>
  )
}
