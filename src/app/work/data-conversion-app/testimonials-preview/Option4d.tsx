// OPTION 4d — vertical asymmetry, centred. The design quote large in a max-w-4xl measure, the
// project quote beneath it as a small supporting paragraph in a narrower max-w-2xl measure, both
// on one centred axis. The asymmetry is in size and measure, top to bottom, not left to right.
//
// ATTRIBUTION. Last, on the same centred axis, after SectionHeader's short accent-warm mark
// (decorative). Ending a single centred column, it closes everything above it.
import { attribution, designQuote, projectQuote, sectionLabel } from './testimonials'
import { ATTRIBUTION, EYEBROW, LARGE, SECTION, SMALL, WRAP } from './split'

export function Option4d() {
  return (
    <section data-testimonials="" className={SECTION}>
      <div className={`${WRAP} text-center`}>
        <p className={EYEBROW}>{sectionLabel}</p>
        <figure className="m-0 mt-10">
          <blockquote className={`${LARGE} mx-auto max-w-4xl`}>{designQuote.text}</blockquote>
          <blockquote className={`${SMALL} mx-auto mt-8 max-w-2xl`}>{projectQuote.text}</blockquote>
          <div aria-hidden="true" className="mx-auto mt-10 h-px w-8 bg-accent-warm" />
          <figcaption className={`mt-4 ${ATTRIBUTION}`}>{attribution}</figcaption>
        </figure>
      </div>
    </section>
  )
}
