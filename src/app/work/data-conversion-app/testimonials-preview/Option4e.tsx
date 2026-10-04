// OPTION 4e — two thirds and a sidebar. The design quote takes 2 of 3 columns; the project quote
// sits in a narrow sidebar behind a vertical divider that runs the full height of the row (grid
// items stretch), aligned to the sidebar's foot so the two quotes are offset top and bottom.
// Below md they stack, the divider turning horizontal.
//
// ATTRIBUTION. The figure's last child, under both columns. The hairline above it meets the foot
// of the vertical divider, so the rules frame both quotes as one block, and the attribution
// sits outside that frame, under the whole of it.
import { attribution, designQuote, projectQuote, sectionLabel } from './testimonials'
import { ATTRIBUTION, EYEBROW, LARGE, SECTION, SMALL, WRAP } from './split'

export function Option4e() {
  return (
    <section data-testimonials="" className={SECTION}>
      <div className={WRAP}>
        <p className={EYEBROW}>{sectionLabel}</p>
        <figure className="m-0 mt-10">
          <div className="grid grid-cols-1 border-b border-border md:grid-cols-3">
            <blockquote className={`${LARGE} pb-10 md:col-span-2 md:pr-12`}>{designQuote.text}</blockquote>
            <div className="flex flex-col justify-end border-t border-foundation-300 py-10 md:border-l md:border-t-0 md:pb-10 md:pl-8 md:pt-0">
              <blockquote className={SMALL}>{projectQuote.text}</blockquote>
            </div>
          </div>
          <figcaption className={`pt-6 ${ATTRIBUTION}`}>{attribution}</figcaption>
        </figure>
      </div>
    </section>
  )
}
