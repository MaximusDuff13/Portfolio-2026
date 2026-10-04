// OPTION 2 — the two quotes stacked full-width, a horizontal rule between them. The emphasis
// changes from one to the next so they don't read as one template twice: the first in the accent
// italic, aligned left; the second in grotesk, aligned right from md up, its role following it.
//
// DISTINCT FROM PROBLEM/SOLUTION. No card and no band colour: the section keeps the page ground
// and is set apart by hairlines above and below it (border-border), with the eyebrow's short
// accent-warm rule (SectionHeader's mark) under the label.
//
// TOKENS. Ground bg-body; rules border-border; quote 1 font-accent accent-italic text-heading-m
// foundation-900; quote 2 font-grotesk text-heading-m foundation-700; roles and eyebrow text-label
// grotesk uppercase foundation-500. CONTRAST on body: foundation-900 16.9:1, foundation-700 10.4:1,
// foundation-500 4.61:1.
import { designQuote, projectQuote, sectionLabel } from './testimonials'

const ROLE = 'font-grotesk text-label uppercase tracking-widest text-foundation-500'

export function Option2() {
  return (
    <section data-testimonials="" className="bg-body px-6 sm:px-10 lg:px-section">
      <div className="mx-auto max-w-6xl border-y border-border py-section">
        <p className={ROLE}>{sectionLabel}</p>
        <div aria-hidden="true" className="mt-3 h-px w-8 bg-accent-warm" />

        <figure className="m-0 mt-10 max-w-4xl">
          <blockquote className="m-0 font-accent accent-italic text-heading-m text-foundation-900">
            {designQuote.text}
          </blockquote>
          <figcaption className={`mt-6 ${ROLE}`}>{designQuote.role}</figcaption>
        </figure>

        <hr className="my-12 border-0 border-t border-border" />

        <figure className="m-0 max-w-4xl md:ml-auto md:text-right">
          <blockquote className="m-0 font-grotesk text-heading-m font-normal text-foundation-700">
            {projectQuote.text}
          </blockquote>
          <figcaption className={`mt-6 ${ROLE}`}>{projectQuote.role}</figcaption>
        </figure>
      </div>
    </section>
  )
}
