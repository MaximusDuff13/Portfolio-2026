// OPTION 1 — two cards side by side, equal weight. Each card: a large quotation-mark glyph, the
// quote, the role as a small caption below.
//
// DISTINCT FROM PROBLEM/SOLUTION. The band is accent-subtle, a ground no feature uses, and the
// cards are bg-body panels with no outline (the feature cards are foundation-100 with a border, or
// foundation-900 on the dark band).
//
// TOKENS. Band accent-subtle; cards bg-body, rounded-lg; glyph font-accent text-display-2xl in
// accent-warm (decorative, aria-hidden); quote font-sans text-body foundation-800; role and
// eyebrow text-label grotesk uppercase. CONTRAST: quote foundation-800 on body 14.7:1; role
// foundation-500 on body 4.61:1; eyebrow foundation-600 on accent-subtle (measured in the checks).
import { sectionLabel, testimonials } from './testimonials'

export function Option1() {
  return (
    <section data-testimonials="" className="bg-accent-subtle px-6 py-section sm:px-10 lg:px-section">
      <div className="mx-auto max-w-6xl">
        <p className="font-grotesk text-label uppercase tracking-widest text-foundation-600">{sectionLabel}</p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.id} className="m-0 flex flex-col rounded-lg bg-body p-8 md:p-10">
              <span aria-hidden="true" className="block h-12 font-accent text-display-2xl leading-none text-accent-warm">
                “
              </span>
              <blockquote className="m-0 mt-4 font-sans text-body text-foundation-800">{t.text}</blockquote>
              <figcaption className="mt-auto pt-6 font-grotesk text-label uppercase tracking-widest text-foundation-500">
                {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
