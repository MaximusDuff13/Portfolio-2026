// OPTION 4 — asymmetric split. The design quote large on the left (7 of 12 columns), the project
// quote smaller on the right (4 of 12, after a one-column gutter), behind a vertical hairline.
// Below md they stack, the large one first.
//
// WHY THE DESIGN QUOTE LEADS. This is a portfolio: the quote about Michael's own work is the one
// only this section can carry. The project quote's claim (first mapping in 24 hours instead of
// 2 to 3 weeks) is already made in Impact, so here it supports rather than repeats at full volume.
//
// DISTINCT FROM PROBLEM/SOLUTION. A foundation-100 band, edge to edge, with no card inside it;
// the features use foundation-100 only as a bordered card on the page ground.
//
// TOKENS. Band foundation-100; large quote font-accent accent-italic text-heading-m
// foundation-900; small quote font-sans text-body-sm foundation-700; hairline border-foundation-300
// (decorative); roles and eyebrow text-label grotesk uppercase foundation-600. foundation-500 is
// not used for the labels: on foundation-100 it measures under 4.5:1. CONTRAST on foundation-100:
// foundation-900 16.1:1, foundation-700 9.9:1, foundation-600 7.0:1.
import { designQuote, projectQuote, sectionLabel } from './testimonials'

const LABEL = 'font-grotesk text-label uppercase tracking-widest text-foundation-600'

export function Option4() {
  return (
    <section data-testimonials="" className="bg-foundation-100 px-6 py-section sm:px-10 lg:px-section">
      <div className="mx-auto max-w-6xl">
        <p className={LABEL}>{sectionLabel}</p>
        <div className="mt-10 grid grid-cols-1 gap-y-12 md:grid-cols-12 md:items-start">
          <figure className="m-0 md:col-span-7">
            <blockquote className="m-0 font-accent accent-italic text-heading-m text-foundation-900">
              {designQuote.text}
            </blockquote>
            <figcaption className={`mt-6 ${LABEL}`}>{designQuote.role}</figcaption>
          </figure>
          <figure className="m-0 border-t border-foundation-300 pt-8 md:col-span-4 md:col-start-9 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <blockquote className="m-0 font-sans text-body-sm text-foundation-700">{projectQuote.text}</blockquote>
            <figcaption className={`mt-4 ${LABEL}`}>{projectQuote.role}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
