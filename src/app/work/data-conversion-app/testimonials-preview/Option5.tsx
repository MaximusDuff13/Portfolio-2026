// OPTION 5 — minimal, text only. No card, no border, no band colour, no glyph: the two quotes
// centred in a narrow measure, with twice the page's section spacing above and below, and the
// section spacing between them. Typography and whitespace alone set it apart.
//
// DISTINCT FROM PROBLEM/SOLUTION. Everything the features have, it drops: no eyebrow-and-title
// header block, no card, no image, left alignment replaced by a centred axis.
//
// TOKENS. Ground bg-body; quotes font-grotesk text-heading-m font-normal foundation-900, in a
// max-w-3xl measure; roles and eyebrow text-label grotesk uppercase foundation-500. Spacing
// calc(section × 2) above and below (160px), gap-section between. CONTRAST on body:
// foundation-900 16.9:1, foundation-500 4.61:1.
import { sectionLabel, testimonials } from './testimonials'

const LABEL = 'font-grotesk text-label uppercase tracking-widest text-foundation-500'

export function Option5() {
  return (
    <section
      data-testimonials=""
      className="bg-body px-6 py-[calc(theme(spacing.section)*2)] text-center sm:px-10 lg:px-section"
    >
      <div className="mx-auto max-w-3xl">
        <p className={LABEL}>{sectionLabel}</p>
        <div className="mt-12 flex flex-col gap-section">
          {testimonials.map((t) => (
            <figure key={t.id} className="m-0">
              <blockquote className="m-0 font-grotesk text-heading-m font-normal text-foundation-900">{t.text}</blockquote>
              <figcaption className={`mt-6 ${LABEL}`}>{t.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
