// OPTION 3 — large pull quotes. Both quotes in the accent italic at heading-l, each under
// PullQuote's mark (a 48px accent-warm rule), with the role as a small label beneath, stacked in
// one wide section.
//
// REUSE. PullQuote's anatomy (rule, then large text, gap-6) and the Impact quote's face
// (font-accent + accent-italic, Fraunces with WONK off). Static: PullQuote's word-by-word reveal
// is left out, since these quotes are much longer and would take seconds to finish appearing.
//
// DISTINCT FROM PROBLEM/SOLUTION. The ground is foundation-900, the hero's, one step darker than
// the feature dark band (foundation-800), with no card inside it.
//
// TOKENS. Ground foundation-900; rule accent-warm (decorative); quotes font-accent accent-italic
// text-heading-l text-body (the page ground colour, as the hero's headline uses it); roles and
// eyebrow text-label grotesk uppercase foundation-400. CONTRAST on foundation-900: body 17.0:1,
// foundation-400 6.9:1.
import { sectionLabel, testimonials } from './testimonials'

const LABEL = 'font-grotesk text-label uppercase tracking-widest text-foundation-400'

export function Option3() {
  return (
    <section data-testimonials="" className="bg-foundation-900 px-6 py-section sm:px-10 lg:px-section">
      <div className="mx-auto max-w-6xl">
        <p className={LABEL}>{sectionLabel}</p>
        <div className="mt-12 flex flex-col gap-section">
          {testimonials.map((t) => (
            <figure key={t.id} className="m-0 flex max-w-4xl flex-col gap-6">
              <div aria-hidden="true" className="h-px w-12 bg-accent-warm" />
              <blockquote className="m-0 font-accent accent-italic text-heading-l text-body">{t.text}</blockquote>
              <figcaption className={LABEL}>{t.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
