// OPTION 4c — stacked. The design quote large across the top (to a max-w-4xl measure), the
// project quote small below it, inset to the right half behind a vertical hairline. The asymmetry
// is in size and in the step to the right, not in side-by-side columns.
//
// ATTRIBUTION. Leads: the figcaption is the figure's FIRST child, directly under the eyebrow, the
// caption-first pattern Impact's quote uses. Introducing both quotes before either begins, it
// cannot read as belonging to just one.
import { attribution, designQuote, projectQuote, sectionLabel } from './testimonials'
import { ATTRIBUTION, EYEBROW, LARGE, SECTION, SMALL, WRAP } from './split'

export function Option4c() {
  return (
    <section data-testimonials="" className={SECTION}>
      <div className={WRAP}>
        <p className={EYEBROW}>{sectionLabel}</p>
        <figure className="m-0 mt-3">
          <figcaption className={ATTRIBUTION}>{attribution}</figcaption>
          <blockquote className={`${LARGE} mt-10 max-w-4xl`}>{designQuote.text}</blockquote>
          <blockquote className={`${SMALL} mt-12 border-l border-foundation-300 pl-8 md:ml-auto md:w-1/2`}>
            {projectQuote.text}
          </blockquote>
        </figure>
      </div>
    </section>
  )
}
