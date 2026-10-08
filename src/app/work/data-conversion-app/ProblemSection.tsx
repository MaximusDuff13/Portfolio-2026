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

const setup = 'Design, Develop & Implement (DDI) for a state used to take 12 to 24 months. Our 2026 goal was 5 to 6.'

// A non-breaking space, so the company name never splits across a line break.
const NBSP = ' '
const ACENTRA = `Acentra${NBSP}Health`

// Only the duration takes accent-warm. ", done in Excel" stays on the normal heading
// foreground, so the colour marks the cost rather than the whole line.
const headingAccent = '4 to 6 weeks'
const headingRest = ', done in Excel'

// The body, as three short paragraphs. The old single paragraph bolded "mapping and
// transformation"; the new copy no longer contains that phrase, so nothing is bolded.
//
// The F / M / O example is illustrative prose and stays prose — it is deliberately NOT drawn as
// a table, diagram or field-mapping graphic.
const paragraphs = [
  'Data conversion was one of the biggest levers in that goal. It starts when a state sends its schemas, packaged as data dictionaries, to our conversion team.',
  "The team then sits down with the state and maps the data by hand in Excel, matching each source table and field to ours. Where a field doesn't map one to one, they also write a transformation rule, like turning F, M and O into Female, Male and Others. A team of 4 to 5 people does all of it, with no standard format.",
  `After that, the state reviews the mapping, ${ACENTRA} fixes what's flagged, and the state approves.`,
]

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
                <h2 className="m-0 font-accent accent-italic text-heading-m text-foundation-900">
                  Problem
                </h2>
              </div>

              <div className="md:col-span-9">
                {/* Stakes line — quiet, and above the heading. body-sm on foundation-500 keeps it
                    clearly under both the statement and the paragraph that follows; at body on
                    foundation-800 it competed with the paragraph for the same voice. */}
                <p className="max-w-xl text-body-sm font-sans text-foundation-500">{setup}</p>

                <p className="mt-6 max-w-3xl font-accent accent-italic text-[36px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-display-xl text-foundation-900">
                  <span className="text-accent-warm">{headingAccent}</span>
                  {headingRest}
                </p>

                {/* The body, in the same content column as the heading. gap-6 between paragraphs
                    is the spacing LearnedNextSteps already uses for its prose.
                    NOT max-w-prose: that is 65ch, and ch is the advance of "0", which is narrower
                    than Inter's average glyph, so it ran to ~89 characters a line. Measured against
                    the real text, Inter at 16px averages ~7.4px a character here, so max-w-lg
                    (512px) lands at ~69 — inside the 60–70 target. */}
                <div className="mt-10 flex max-w-lg flex-col gap-6">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph} className="m-0 text-body font-sans text-foundation-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
