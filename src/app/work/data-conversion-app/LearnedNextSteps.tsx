// LearnedNextSteps — the case study's closing section: Next steps, then What I learned. After
// the design steps, before Keep exploring. Treatment Option 4 from the learned / next-steps preview
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
// GROUND. The page ground, opening with a border-border hairline as Keep
// exploring do.
//
// CONTENT. Rewritten in the 2026-10-08 copy pass (plainer, no dashes); next steps 3 and 4 are
// new drafts for Michael to confirm. The "If I did it again" paragraph was removed at his request.
//
// CONTRAST on body: labels foundation-900 16.9:1; prose and list foundation-700 10.4:1; list
// numbers foundation-500 4.61:1.
import { AnimatedSection } from '@/components/AnimatedSection'

// Michael's copy, verbatim (Nov 25 2026), split into the lead sentence and the rest.
export const nextSteps = [
  { lead: 'Test the MVP with more programs.', body: 'Use the existing testing plan to find what people need to see more clearly and where performance falls short, before adding more features.' },
  { lead: 'Track how much people trust the AI drafts.', body: 'Measure how often people accept a drafted mapping, edit it or rewrite it. That shows whether reviewing really is faster than writing each one.' },
  { lead: 'Watch how new data engineers handle transformation.', body: 'The journey map showed this is where they feel most overwhelmed, so it’s where the AI drafts should help most.' },
  { lead: 'Bring Conversion & sync into the hub.', body: 'It was out of scope for the MVP, but the state-based design was built to take it.' },
]

/* WHAT I LEARNED: Michael's copy, verbatim (Nov 25 2026). Each lesson links back up to the part of
   the case study where it happened (Michael: link this across the case study), so the close ties the
   story together instead of restating it. The ids are the contents-bar anchors in page.tsx. */
// The sticky notes' tints and tilts, in the Part two sketchbook colours.
const NOTE_TINT = ['bg-stage-straw-strong', 'bg-stage-sage-strong', 'bg-stage-sky']
const NOTE_TILT = ['-rotate-2', 'rotate-1', '-rotate-1']

export const learned = [
  { lead: 'Understand the system before simplifying it.', body: 'Data conversion was new to me. Learning the backend from the AI CoE and data engineers showed me what people actually needed to see.', href: '#process', where: 'Process' },
  { lead: 'People first, not systems first.', body: 'The first approved screen had no user flow behind it. Even when AI makes everything fast, research, flows and information architecture still come before screens.', href: '#step-requirements', where: '01 · Requirements' },
  { lead: 'Use AI thoughtfully, not everywhere.', body: 'AI sped up summaries, concepts and sample data. I kept the thinking, critique and final design for myself.', href: '#ai', where: 'Where AI helped' },
]

export function LearnedNextSteps() {
  return (
    <section className="px-6 sm:px-10 lg:px-section">
      <div className="max-w-6xl mx-auto border-t border-border py-section">
        <AnimatedSection>
          {/* NEXT STEPS (Nov 25 2026, Michael picked N4 from /dev/next-steps): just the label, like What
              I learned (Michael: no second heading), then numbered rows split by hairlines: a big
              number, the step in the serif, the detail beside it. No fills. */}
          <h2 className="m-0 font-display accent-italic text-heading-m text-foundation-900">Next steps</h2>
          <ol className="m-0 mt-10 list-none border-t border-border p-0">
            {nextSteps.map((s, i) => (
              <li key={s.lead} className="grid grid-cols-1 gap-3 border-b border-border py-6 last:border-b-0 md:grid-cols-12 md:gap-8">
                <span aria-hidden="true" className="font-display text-heading-l font-medium leading-none text-accent-warm md:col-span-1">{i + 1}</span>
                <p className="m-0 font-display text-heading-m font-medium leading-[1.2] text-foundation-900 md:col-span-5">{s.lead}</p>
                <p className="m-0 font-sans text-body text-foundation-700 md:col-span-6">{s.body}</p>
              </li>
            ))}
          </ol>
          {/* WHAT I LEARNED (Nov 25 2026, Michael picked L5 from /dev/learned): three tilted sticky
              notes in the sketchbook style of Part two, so the page ends in the voice of the design
              work. Each ends with a handwritten '↑ see …' link back to where the lesson happened. */}
          <div className="mt-section border-t border-border pt-section">
            <h2 className="m-0 font-display accent-italic text-heading-m text-foundation-900">What I learned</h2>
            <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
              {learned.map((l, i) => (
                <li key={l.lead} className={`flex flex-col rounded-md p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] ${NOTE_TINT[i]} ${NOTE_TILT[i]}`}>
                  <p className="m-0 font-hand text-[28px] leading-[1.1] text-foundation-900">{l.lead}</p>
                  <p className="m-0 mt-3 font-hand text-[22px] leading-[1.2] text-foundation-700">{l.body}</p>
                  <a href={l.href} className="mt-auto self-start rounded-sm pt-4 font-hand text-[22px] text-accent-warm underline decoration-accent-warm/40 underline-offset-4 hover:decoration-accent-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm">
                    <span aria-hidden="true">↑ </span>see {l.where}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
