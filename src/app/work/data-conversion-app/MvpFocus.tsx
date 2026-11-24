// MVP focus — the scope row, directly after Problem, read as the answer to the cost stated there.
//
// SHAPE (Nov 24 2026, Michael picked M1 from /dev/mvp-focus): Problem's full-width column, so the
// two sections read as one voice: italic label, plain serif heading, one short description, then
// the pyramid card at full width. Co-located with the page; it belongs to this case study alone.
//
// COPY. Only what the brief tiles don't already say: no month, no team list, no 2 weeks of design.
// The last sentence is Michael's point, that polish and delight were a lower priority while the
// core features and flows were made to work — not that they were dropped.
//
// SPACING. A leading border-t with pt-section below it, no pb-section, and a closing mt-section
// rule. Problem above pads its own bottom by 80px (the space over this section's rule) and Impact
// below opens with its own pt-section (the space under the closing rule): one 80px source per side
// of every hairline, the contract the rest of the page keeps.
import { AnimatedSection } from '@/components/AnimatedSection'
import { PriorityPyramid, type PyramidTiers } from '@/components/PriorityPyramid'

// Top to bottom: what was cut tapers away above the line, what shipped carries the width below.
const tiers: PyramidTiers = [
  { label: 'Moments of delight' },
  { label: 'Visual aesthetic design' },
  { label: 'Usable', mvp: true },
  { label: 'Functional', mvp: true },
]

export function MvpFocus() {
  return (
    <section className="px-6 sm:px-10 lg:px-section">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="border-t border-border pt-section">
            <h2 className="m-0 font-display accent-italic text-heading-m text-foundation-900">MVP focus</h2>

            <p className="mt-4 max-w-2xl font-display text-heading-l font-medium leading-[1.15] tracking-[-0.02em] text-foundation-900">
              Built to work, designed to be used
            </p>
            <p className="mt-4 max-w-2xl text-body font-sans text-foundation-500">
              The MVP had one job:{' '}
              <strong className="font-medium text-foundation-900">
                prove that AI-drafted mappings could replace weeks of manual Excel work.
              </strong>{' '}
              I designed it around how the conversion team already worked, so checking an AI draft felt familiar. In
              testing, they completed an internal mapping end to end. Visual polish and moments of delight were a lower
              priority: we wanted the core features and user flows working well first, before spending more time on them.
            </p>

            <div className="mt-10">
              <PriorityPyramid
                title="What the MVP prioritised"
                tiers={tiers}
                aboveLabel="Not in the MVP"
                belowLabel="In the MVP"
                note="The dashed line marks where the MVP stopped."
              />
            </div>

            {/* The rule that closes the row off, and the edge Impact opens against. */}
            <div className="mt-section border-t border-border" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
