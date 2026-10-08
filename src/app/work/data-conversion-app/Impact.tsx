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

// The results: three figures side by side, each a label, the figure in the stat token, and the
// rest of its sentence below. This replaced a ledger of body-sm sentences, where the page's
// strongest results read like footnotes. Still no fill, border or accent: size carries them.
// The wording is the ledger's, split around the figure.
const stats = [
  { label: 'Speed', figure: '1 week', rest: 'Mapping & transformation, down from 4 to 6 weeks' },
  { label: 'Coverage', figure: '600', rest: 'of 1,200 target columns mapped at high confidence' },
  { label: 'Real use', figure: '2', rest: 'programs ran real conversions on the MVP' },
]

export function Impact() {
  return (
    <section className="px-6 sm:px-10 lg:px-section pb-section">
      <div className="max-w-6xl mx-auto">
        <div className="pt-section">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6">

            <div className="md:col-span-3">
              <AnimatedSection>
                <h2 className="m-0 font-accent accent-italic text-heading-m text-foundation-900">
                  Impact
                </h2>
              </AnimatedSection>
            </div>

            <div className="md:col-span-9">
              <AnimatedSection>
                <p className="max-w-3xl font-accent accent-italic text-[36px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-display-xl text-foundation-900">
                  <span className="text-accent-warm">{bigAccent}</span>
                  {bigRest}
                </p>

                <p className="mt-10 max-w-lg text-body font-sans text-foundation-700">
                  {paragraph}
                </p>
              </AnimatedSection>

              {/* Results. A <dl>: each label names its figure. */}
              <AnimatedSection>
                <dl className="m-0 mt-12 grid grid-cols-1 gap-8 border-t border-border pt-8 md:grid-cols-3 md:gap-10">
                  {stats.map(({ label, figure, rest }) => (
                    <div key={label} className="flex flex-col">
                      <dt className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                        {label}
                      </dt>
                      <dd className="m-0 mt-4 text-stat font-grotesk text-foundation-900">{figure}</dd>
                      <dd className="m-0 mt-3 text-body-sm font-sans text-foundation-600">{rest}</dd>
                    </div>
                  ))}
                </dl>
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
