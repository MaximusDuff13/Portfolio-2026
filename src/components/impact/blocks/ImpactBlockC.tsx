// Treatment C — Hanging margin.
//
// STRUCTURE: the quote gets its own hanging margin. The block repeats the section's 3/9 shape
// INSIDE the content column, and puts the ATTRIBUTION in that margin with the quote beside it at
// heading-m in the serif italic.
//
// To be exact about what this does and does not do: the treatment renders inside the section's
// 9-column content column, so this inner margin does NOT line up with the "Impact" label out in
// the page gutter — it is a second, smaller hanging margin nested within the first. What it
// borrows is the RULE the page has already taught twice: a short label at the left of a block
// says who or what that block belongs to. The quote is therefore attributed by position before
// a word of it is read, and the attribution can never look cramped, because nothing sits on top
// of it.
//
// The quote steps up from body to heading-m. It is the last voice in the section, and at body
// size in a 9-column measure it read as a caption. heading-m keeps it well under the display-xl
// big line, so the squint order is unchanged.
//
// MOBILE: the grid collapses and the attribution sits above the quote rather than beside it,
// which is the same reading order the screen reader gets at every width.
import { AnimatedSection } from '@/components/AnimatedSection'
import { orgLabel, orgLine, quoteText, quoteRole } from './shared'

export default function ImpactBlockC() {
  return (
    <>
      {/* Organization statement — unchanged in kind, the quiet "so what". */}
      <AnimatedSection>
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
            {orgLabel}
          </p>
          <p className="mt-3 max-w-xl text-body font-sans text-foundation-700">{orgLine}</p>
        </div>
      </AnimatedSection>

      {/* Quote — on its own hanging margin. No rule: the placement is the signal. */}
      <AnimatedSection>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-4">
          <div className="md:col-span-3">
            <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest md:pt-2">
              {quoteRole}
            </p>
          </div>

          <div className="md:col-span-9">
            <p className="max-w-2xl font-accent accent-italic text-heading-m text-foundation-800">
              {quoteText}
            </p>
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}
