// LearnedNextSteps — the case study's closing section: Next steps, then What I learned. After
// Testimonials, before Keep exploring. Treatment Option 4 from the learned / next-steps preview
// exploration.
//
// ORDER. Next steps first, What I learned last, so the case study ends on the personal reflection
// rather than the roadmap.
//
// LAYOUT. The page's margin rail, as Problem, MVP focus, Impact and Process use it, so the case
// study closes in the structure it opened with: a 12-column grid, the section name in 3 columns
// as a margin label (ProblemSection's accent italic), the content in the other 9. Two rows, a
// hairline between them. Below md the label stacks above its content.
//
// READING WIDTH. The list and the prose are held to max-w-lg (512px), ProblemSection's measure:
// ~63 characters a line on average at this size, inside the 60–70 target.
//
// GROUND. The page ground, opening with a border-border hairline as Testimonials and Keep
// exploring do.
//
// CONTENT is reproduced verbatim.
//
// CONTRAST on body: labels foundation-900 16.9:1; prose and list foundation-700 10.4:1; list
// numbers foundation-500 4.61:1.
import { AnimatedSection } from '@/components/AnimatedSection'

const nextSteps = [
  "Test the MVP with more programs to see where it holds up and where it doesn't.",
  'Learn what data needs to be more visible to the user, and where the performance gaps are, using the testing plan already in place.',
  'Understand how people are actually using the product before building on top of it — the foundation needs to hold before more features get layered on.',
]

const learned = [
  'This project reshaped how I think about AI as a designer, in two ways.',
  'The first was sitting with the AI Center of Excellence to understand what was actually happening on the backend, then figuring out what of that could surface to the user directly: collating mapping batches into a summary so grouping tables became easier, and showing the transformation and mapping logic in a way people could actually read. Seeing the backend side up close changed what I thought was possible to expose in the UI.',
  "The second was ideating with AI myself. Understanding the requirement and the user has always been my favorite part of this work, and that didn't change. What changed was the distance between a thought and a shaped design. Claude Design let me move from notes to a summary document to three or four layout options to something polished enough to bring into Figma and hand to the team, much faster than I was used to.",
  'Going forward, integrating an MCP connection would let me bring designs from Claude back into Figma for final touches, review, and moving between tools.',
]

const ROW = 'grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-12'
const LABEL = 'm-0 font-accent accent-italic text-heading-m text-foundation-900 md:col-span-3'
const TEXT = 'font-sans text-body text-foundation-700'

export function LearnedNextSteps() {
  return (
    <section className="px-6 sm:px-10 lg:px-section">
      <div className="max-w-6xl mx-auto border-t border-border py-section">
        <AnimatedSection>
          <div className={ROW}>
            <h2 className={LABEL}>Next steps</h2>
            <ol className="m-0 flex max-w-lg list-decimal flex-col gap-4 pl-5 marker:text-foundation-500 md:col-span-9">
              {nextSteps.map((step) => (
                <li key={step} className={`pl-1 ${TEXT}`}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className={`${ROW} mt-section border-t border-border pt-section`}>
            <h2 className={LABEL}>What I learned</h2>
            <div className="flex max-w-lg flex-col gap-6 md:col-span-9">
              {learned.map((paragraph) => (
                <p key={paragraph} className={`m-0 ${TEXT}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
