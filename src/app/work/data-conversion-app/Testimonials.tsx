// Testimonials — the two quotes after the problem-and-solution features, before Keep exploring.
// Treatment 4a ("original split") from the testimonials preview exploration.
//
// LAYOUT. The design quote large on the left (7 of 12 columns), the project quote small on the
// right (4 of 12, after a one-column gutter) behind a vertical hairline. Below md they stack, the
// large one first, the hairline turning horizontal.
//
// GROUND. The page ground (body), like Problem, Impact and Process: no fill of its own. The
// features use body as a section ground too, so the section opens with a border-border hairline
// across the wrap, the way Keep exploring does, rather than running straight on from the light
// band above.
//
// ATTRIBUTION. Both quotes are from the same person, so there is one attribution, not a role
// under each: the single figcaption of one <figure> holding both blockquotes, in its own
// full-width row under both columns after a hairline that spans them.
//
// QUOTES are reproduced verbatim. The project quote also appears, in a different form, in Impact;
// the repetition is intentional.
//
// CONTRAST on body: eyebrow foundation-500 4.61:1; large quote foundation-900 16.9:1; small quote
// foundation-700 10.4:1; attribution foundation-600 7.4:1. The hairlines are decorative.
import { AnimatedSection } from '@/components/AnimatedSection'

const designQuote =
  "Michael's UX design skills are truly impressive. He brings forward creative ideas and different approaches to the product, constantly reminding us how much creativity goes into great UI/UX design."
const projectQuote =
  'We have started using AI-based conversion mapping and were able to produce the first mapping sheet in just 24 hours. However, this is a significant step forward, considering that the same effort would traditionally take approximately 2 to 3 weeks.'
const attribution = 'Pradeep Jain, Program Director'

export function Testimonials() {
  return (
    <section className="px-6 sm:px-10 lg:px-section">
      <div className="max-w-6xl mx-auto border-t border-border py-section">
        <AnimatedSection>
          <p className="font-grotesk text-label uppercase tracking-widest text-foundation-500">Testimonials</p>
          <figure className="m-0 mt-10">
            <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:items-start">
              <blockquote className="m-0 font-accent accent-italic text-heading-m text-foundation-900 md:col-span-7">
                {designQuote}
              </blockquote>
              <blockquote className="m-0 border-t border-foundation-300 pt-8 font-sans text-body-sm text-foundation-700 md:col-span-4 md:col-start-9 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                {projectQuote}
              </blockquote>
            </div>
            <figcaption className="mt-12 border-t border-border pt-6 font-sans text-body-sm font-medium text-foundation-600">
              {attribution}
            </figcaption>
          </figure>
        </AnimatedSection>
      </div>
    </section>
  )
}
