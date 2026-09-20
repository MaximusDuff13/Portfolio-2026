// Impact — a sibling of the Problem section (ProblemSection.tsx), and co-located with it beside
// the page, so the live page never imports from a temporary preview folder.
//
// SPINE: identical to Problem's — italic label alone in the left margin (md:col-span-3), content
// in the right column (md:col-span-9), label stacking above content on a phone. The big line and
// the paragraph reuse Problem's exact classes so the two sections set as a pair:
//   big line  = Problem's heading    → font-accent accent-italic text-display-xl
//   paragraph = Problem's paragraph  → max-w-lg text-body font-sans text-foundation-700
//
// The big line is the first thing in the content column, so it starts at the same grid row as
// the label, exactly as Problem's stakes line does.
//
// NO LEADING RULE, deliberately. Problem closes on its own `mt-section border-t border-border`,
// so that hairline is already the divider between the two sections; adding a second one here
// reproduced the doubled edge that was removed from the live page. Every divider INSIDE the
// section is a border-t as specified.
//
// THE SERIF is Fraunces italic via `font-accent` + the `.accent-italic` utility — exactly what
// Problem already uses. Nothing was added to tailwind.config.js or to globals.css.
//
// MOTION: each block is its own AnimatedSection, so the blocks cross the viewport threshold a
// beat apart rather than animating as one slab. Reduced motion is handled inside
// AnimatedSection (it swaps fadeUp for fadeIn). The closing block runs its own stagger — see
// ImpactClosing.tsx for why that one needs framer-motion directly.
import { AnimatedSection } from '@/components/AnimatedSection'
import { ImpactClosing } from './ImpactClosing'

// Only the duration takes accent-warm, mirroring Problem's "4 to 6 weeks". It is the one
// accented thing in this section.
const bigAccent = '1 week'
const bigRest = ', drafted by AI'

const paragraph =
  'The MVP drafts the mappings and their transformation rules, and a person confirms them instead of writing each one from scratch.'

// The ledger: a label at left, a plain sentence at right. Deliberately NOT stat tiles — the
// figures are carried inside ordinary sentences and lifted only by weight and colour (Inter 500
// on foundation-900 against foundation-600), never by size, fill, border or accent.
//
// Each sentence is segmented so a figure can take that weight without breaking the string into
// markup. `strong: true` marks a figure.
const ledger = [
  {
    label: 'Speed',
    parts: [
      { text: 'Mapping & transformation went from ' },
      { text: '4 to 6 weeks', strong: true },
      { text: ' to ' },
      { text: '1 week', strong: true },
    ],
  },
  {
    label: 'Coverage',
    parts: [
      { text: '600 of 1,200', strong: true },
      { text: ' target columns mapped at high confidence' },
    ],
  },
  {
    label: 'Real use',
    parts: [
      { text: '2', strong: true },
      { text: ' programs ran real conversions on the MVP' },
    ],
  },
]

export function Impact() {
  return (
    <section className="px-6 sm:px-10 lg:px-section pb-section">
      <div className="max-w-6xl mx-auto">
        <div className="pt-section">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6">

            <div className="md:col-span-3">
              <AnimatedSection>
                <p className="font-accent accent-italic text-heading-m text-foundation-900">
                  Impact
                </p>
              </AnimatedSection>
            </div>

            <div className="md:col-span-9">
              <AnimatedSection>
                <p className="max-w-3xl font-accent accent-italic text-display-xl text-foundation-900">
                  <span className="text-accent-warm">{bigAccent}</span>
                  {bigRest}
                </p>

                <p className="mt-10 max-w-lg text-body font-sans text-foundation-700">
                  {paragraph}
                </p>
              </AnimatedSection>

              {/* Ledger. */}
              <AnimatedSection>
                <div className="mt-12 border-t border-border pt-6">
                  {ledger.map(({ label, parts }) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1 py-2.5 sm:flex-row sm:gap-0"
                    >
                      <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest sm:w-36 sm:shrink-0 sm:pt-1">
                        {label}
                      </p>
                      <p className="max-w-lg text-body-sm font-sans text-foundation-600">
                        {parts.map(({ text, strong }) =>
                          strong ? (
                            <span key={text} className="font-medium text-foundation-900">
                              {text}
                            </span>
                          ) : (
                            text
                          ),
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Closing block — the organization statement and the quote, side by side. Its
                  own component because the left-to-right stagger needs framer-motion directly;
                  see ImpactClosing.tsx. */}
              <ImpactClosing />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
