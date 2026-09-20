// The Problem — editorial row.
//
// Sits between At a glance and the Process timeline. Co-located with the page, like
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

// SPACING. The section pads neither its own top nor its own bottom:
//   · no pb-section — the space BELOW the closing hairline belongs to the next section's
//     pt-section. Having both put 161px under the rule against 80px over it.
//   · no pt-section — the section above already pads its bottom, and the two stacked to 181px
//     where every other gap on this page is one section (80px).
// One source of space per gap, so the closing hairline sits centred in 160px.
export function ProblemSection() {
  return (
    <section className="px-6 sm:px-10 lg:px-section">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          {/* No leading rule: the section above closes the gap on its own, and a second
              hairline here read as a doubled edge. See the spacing note above the component. */}
          <div>
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

            {/* The rule that closes the row off. Part of the editorial row, not of the question
                that used to sit above it. */}
            <div className="mt-section border-t border-border" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
