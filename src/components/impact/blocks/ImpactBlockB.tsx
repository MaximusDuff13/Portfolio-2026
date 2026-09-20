// Treatment B — Split.
//
// STRUCTURE: the two things stop being stacked. They sit SIDE BY SIDE across the content column,
// divided by a vertical hairline: the organization statement on the left, the quote on the
// right. One horizontal rule opens the pair, and the vertical rule between them is what says
// "these are two separate things" — you can see the division before reading a word.
//
// The columns are 7/5, not 6/6. The statement is two sentences and the quote is one, so equal
// columns left the quote column short and the statement column tall, and the pair read as
// unbalanced rather than as a split. 7/5 lets both run to roughly the same depth.
//
// The quote keeps the serif italic — the same face Problem's heading and Impact's big line use —
// so even out of the corner of your eye the right-hand column is someone talking, not more body
// copy. The attribution sits at the foot of its own column with room above it.
//
// MOBILE: the vertical rule cannot survive a single column, so below md it becomes a horizontal
// one above the quote. The division stays, it just turns ninety degrees.
import { AnimatedSection } from '@/components/AnimatedSection'
import { orgLabel, orgLine, quoteText, quoteRole } from './shared'

export default function ImpactBlockB() {
  return (
    <AnimatedSection>
      <div className="mt-12 border-t border-border pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8">

          {/* Organization statement. */}
          <div className="md:col-span-7 md:pr-10">
            <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
              {orgLabel}
            </p>
            <p className="mt-3 text-body font-sans text-foundation-700">{orgLine}</p>
          </div>

          {/* Quote. The divider is vertical from md and horizontal below it, drawn by the same
              element so the two states cannot drift apart. */}
          <div className="md:col-span-5 border-t border-border pt-6 md:border-t-0 md:pt-0 md:border-l md:pl-10 flex flex-col">
            <p className="font-accent accent-italic text-body text-foundation-800">{quoteText}</p>

            <p className="mt-8 text-label font-grotesk text-foundation-500 uppercase tracking-widest">
              {quoteRole}
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
