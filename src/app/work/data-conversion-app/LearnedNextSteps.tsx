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
// CONTENT. Rewritten in the 2026-10-08 copy pass (plainer, no dashes); the last learned
// paragraph and next steps 3 and 4 are new drafts for Michael to confirm.
//
// CONTRAST on body: labels foundation-900 16.9:1; prose and list foundation-700 10.4:1; list
// numbers foundation-500 4.61:1.
import { AnimatedSection } from '@/components/AnimatedSection'

const nextSteps = [
  "Test the MVP with more programs to see where it holds up and where it doesn't.",
  'Use the testing plan already in place to learn what people need to see more clearly and where performance falls short, before layering more features on top.',
  "Watch how new staff handle transformation. The journey map showed that's where they feel most overwhelmed, and where the AI drafts should help most.",
  'Bring Conversion & sync into the hub. It was out of scope for the MVP, but the state based design was built to take it.',
]

const learned = [
  'This project changed how I think about designing with AI, in two ways.',
  'First, I sat with the AI Center of Excellence to understand what was really happening on the backend, then worked out which parts of it people should see. That meant collating mapping batches into a summary so grouping tables got easier, and showing the mapping and transformation logic in a way people could actually read. Seeing the backend up close changed what I thought the UI could show.',
  "Second, I used AI to explore ideas myself. Understanding the requirement and the user is still my favorite part of the work. What changed was how fast I could get from a thought to a shaped design: with Claude Design I went from notes to three or four layout options to something ready for Figma much faster than before.",
  "If I did it again, I'd bring the journey map in before any screens get built, so the first conversation with leadership is about the flow rather than individual pages.",
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
