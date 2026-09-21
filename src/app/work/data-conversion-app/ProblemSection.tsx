// The Problem — editorial row.
//
// The first section after the product shot, answered by MVP focus below it. Co-located with the page, like
// CrosswalkMatrix, so it does not depend on src/components/problem/, which is the temporary
// layout-exploration folder and is meant to be deleted.
//
// STRUCTURE: a small italic section label alone in the left margin, the content in a right
// column, and a hairline closing the row off from whatever follows. On a phone the label stacks
// above the content and everything reads in one column.
//
// The row is now three things only: the stakes line, the statement, and one paragraph. The
// four-step process is carried by that paragraph in prose rather than by a table — the section
// no longer draws the sequence, it states it.
//
// WHAT THE SECTION NO LONGER HOLDS: the closing question ("Could AI draft 20 to 25 of those 40
// fields, rules included?") has moved to the start of Impact, which is a separate section. It is
// deliberately absent here — do not reintroduce it.
//
// THE SERIF is Fraunces italic (font-accent), which is NOT a named type token. It is a font
// family declared in tailwind.config.js and loaded in layout.tsx for the case-study hero; the
// sizes below are ordinary type tokens applied to it. See the report for the exact stack.
import { AnimatedSection } from '@/components/AnimatedSection'

const setup = 'Programs used to accept 12 to 24 month implementations. Now they want 5 to 8.'

// A non-breaking space, so the company name never splits across a line break.
const NBSP = ' '
const ACENTRA = `Acentra${NBSP}Health`

// Only the duration takes accent-warm. ", done in Excel" stays on the normal heading
// foreground, so the colour marks the cost rather than the whole line.
const headingAccent = '4 to 6 weeks'
const headingRest = ', done in Excel'

// The paragraph, split so the one emphasised phrase can take font-medium without the string
// being broken up in the markup. Inter ships here at 400 and 500 only, so font-medium (500) is
// the heaviest available and the correct choice.
//
// The F / M / O example is illustrative prose and stays prose — it is deliberately NOT drawn as
// a table, diagram or field-mapping graphic.
const paraLead =
  "Converting a state's data from its legacy system into ours takes four steps. The first, "
const paraEmphasis = 'mapping and transformation'
const paraRest = `, is the longest and the one this project targets. Mapping matches each old field to a new one. Transformation rules reshape the data to fit, like turning F, M and O into Female, Male and Others. A team of 4 to 5 people does all of it in Excel, with no standard format. The state then reviews the result, ${ACENTRA} fixes it, and the state approves.`

// SPACING. One source of space per side of every rule, so each hairline sits centred in 160px.
// This is the first section after the product shot, and it carries that treatment:
//   · border-t + pt-section at the top — the shot above pads its own bottom by 80px, which is
//     the space above this rule; the pt-section is the 80px below it.
//   · pb-section at the bottom — the 80px above MVP focus's own leading rule.
// The closing rule this section used to draw now belongs to MVP focus, which sits below it.
export function ProblemSection() {
  return (
    <section className="px-6 sm:px-10 lg:px-section">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          {/* Leading rule — the hairline under the product shot. The shot pads its own
              bottom by 80px and draws no rule of its own, so this is the only edge between
              them. */}
          <div className="border-t border-border pt-section pb-section">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6">

              {/* The margin label. */}
              <div className="md:col-span-3">
                <p className="font-accent accent-italic text-heading-m text-foundation-900">
                  Problem
                </p>
              </div>

              <div className="md:col-span-9">
                {/* Stakes line — quiet, and above the heading. body-sm on foundation-500 keeps it
                    clearly under both the statement and the paragraph that follows; at body on
                    foundation-800 it competed with the paragraph for the same voice. */}
                <p className="max-w-xl text-body-sm font-sans text-foundation-500">{setup}</p>

                <p className="mt-6 max-w-3xl font-accent accent-italic text-display-xl text-foundation-900">
                  <span className="text-accent-warm">{headingAccent}</span>
                  {headingRest}
                </p>

                {/* The one paragraph, in the same content column as the heading.
                    NOT max-w-prose: that is 65ch, and ch is the advance of "0", which is narrower
                    than Inter's average glyph, so it ran to ~89 characters a line. Measured against
                    the real text, Inter at 16px averages ~7.4px a character here, so max-w-lg
                    (512px) lands at ~69 — inside the 60–70 target. */}
                <p className="mt-10 max-w-lg text-body font-sans text-foundation-700">
                  {paraLead}
                  <span className="font-medium text-foundation-900">{paraEmphasis}</span>
                  {paraRest}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
