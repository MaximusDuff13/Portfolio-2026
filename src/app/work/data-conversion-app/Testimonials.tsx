// Testimonials — the design quote after the problem-and-solution features, before Next steps.
//
// ONE QUOTE. The project quote used to sit here too, small beside the design quote, while an
// edited copy of it ran in Impact. It now appears once, verbatim, in Impact (ImpactClosing.tsx),
// so this section holds the design quote alone, as a single pull quote. The 7 / 4 split went with
// it. If a second voice is added later (an analyst or the engineer), the split can come back.
//
// GROUND. The page ground (body), like Problem, Impact and Process: no fill of its own. The
// features use body as a section ground too, so the section opens with a border-border hairline
// across the wrap, the way Keep exploring does, rather than running straight on from the light
// band above.
//
// QUOTE is reproduced verbatim.
//
// LABEL. The rail sections' Fraunces label (Problem, Impact, Process…), as the section h2. The
// attribution has no rule above it: spacing carries that break, so the close of the page does not
// stack hairlines.
//
// CONTRAST on body: label foundation-900 16.9:1; quote foundation-900 16.9:1; attribution
// foundation-600 7.4:1.
import { AnimatedSection } from '@/components/AnimatedSection'

const designQuote =
  "Michael's UX design skills are truly impressive. He brings forward creative ideas and different approaches to the product, constantly reminding us how much creativity goes into great UI/UX design."
const attribution = 'Pradeep Jain, Program Director'

export function Testimonials() {
  return (
    <section className="px-6 sm:px-10 lg:px-section">
      <div className="max-w-6xl mx-auto border-t border-border py-section">
        <AnimatedSection>
          <h2 className="m-0 font-accent accent-italic text-heading-m text-foundation-900">Testimonial</h2>
          <figure className="m-0 mt-10 max-w-3xl">
            <blockquote className="m-0 font-accent accent-italic text-heading-m text-foundation-900">
              {designQuote}
            </blockquote>
            <figcaption className="mt-8 font-sans text-body-sm font-medium text-foundation-600">
              {attribution}
            </figcaption>
          </figure>
        </AnimatedSection>
      </div>
    </section>
  )
}
