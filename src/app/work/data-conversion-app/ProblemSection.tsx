// The Problem — one full-width column (Nov 24 2026).
//
// The first section after the product shot, answered by MVP focus below it. Co-located with the page.
//
// STRUCTURE (Michael picked B3's layout with B4's words, from /dev/problem-flow):
//   label → heading that introduces the diagram → description (with the cost) → the two-lane flow
//   on a stage card.
// Everything starts from the same left edge, so the heading, the description and the card line up; this
// section deliberately does NOT use the margin-label grid the other rows use, because the diagram
// needs the full width to stay legible.
//
// The paragraphs that used to carry the process are gone: the diagram carries it now. "Close to 6
// weeks" is said once, in the description, so the bracket in the diagram carries no label.
//
// WHAT THE SECTION NO LONGER HOLDS: the closing question ("Could AI draft 20 to 25 of those 40
// fields, rules included?") has moved to the start of Impact. Do not reintroduce it.
//
// THE SERIF is Fraunces (font-display), a font family declared in tailwind.config.js and loaded in
// layout.tsx; the sizes are ordinary type tokens applied to it.
import { AnimatedSection } from '@/components/AnimatedSection'
import { ProblemFlow } from './ProblemFlow'

// The description under the heading carries the cost too (Nov 24: Michael moved "Close to 6 weeks,
// done in Excel" and the engineers line up here from under the card). The duration is the one
// phrase set in the foreground colour, so the cost still stands out in the grey line.
const setup =
  'Design, Develop & Implement (DDI) for a state used to take 12 to 24 months. Data conversion was one of the biggest parts of that time:'
const cost = 'close to 6 weeks, done in Excel'
const costRest = ', by 4 to 5 data engineers on every new state program.'

// SPACING. One source of space per side of every rule, so each hairline sits centred in 160px:
//   · border-t + pt-section at the top — the shot above pads its own bottom by 80px.
//   · pb-section at the bottom — the 80px above MVP focus's own leading rule.
export function ProblemSection() {
  return (
    <section className="px-6 sm:px-10 lg:px-section">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="border-t border-border pt-section pb-section">
            <h2 className="m-0 font-display accent-italic text-heading-m text-foundation-900">Problem</h2>

            <p className="mt-4 max-w-2xl font-display text-heading-l font-medium leading-[1.15] tracking-[-0.02em] text-foundation-900">
              How a state’s data came across, before the app
            </p>
            <p className="mt-4 max-w-2xl text-body font-sans text-foundation-500">
              {setup} <strong className="font-medium text-foundation-900">{cost}</strong>
              {costRest}
            </p>

            {/* The flow, on a stage card like the other cards on the page. */}
            <div className="mt-10 rounded-2xl bg-stage-ginger px-5 py-8 sm:px-10 sm:py-12">
              <ProblemFlow costNote={null} />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
