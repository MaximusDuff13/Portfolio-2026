// Treatment E — Margin aside.
//
// STRUCTURE: the two parts are not peers. The statement runs at full measure as the section's
// closing thought, and the quote is pushed out to the far right as a narrow aside — a sidenote
// in the outer margin of the content column, set small, with its attribution ABOVE it rather
// than below.
//
// Two things make it work. First, the gap: the aside starts at column 9 of 12 while the
// statement stops at column 7, so a whole empty column sits between them and the separation is
// done by air, not by a rule, a fill or an indent. Second, the inverted order — the attribution
// leads, the way a marginal note names its source before it speaks. That also removes the
// cramped-attribution problem at the root: there is nothing above the quote to crowd it into.
// The inversion is visual only — the DOM keeps quote-then-attribution, so the reading order for
// keyboard and screen readers is unchanged.
//
// The aside is body-sm, the smallest thing in the part. It is evidence in the margin, not a
// second statement, and at that size it cannot threaten the big line.
//
// MOBILE: an outer margin does not exist at 390, so the aside becomes a full-width block under
// the statement, still attribution-first and still at body-sm, separated by a hairline that only
// appears below md — where the horizontal gap it replaces has gone.
import { AnimatedSection } from '@/components/AnimatedSection'
import { orgLabel, orgLine, quoteText, quoteRole } from './shared'

export default function ImpactBlockE() {
  return (
    <AnimatedSection>
      <div className="mt-12 border-t border-border pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8">

          {/* Statement — full measure, stopping at column 7. */}
          <div className="md:col-span-7">
            <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
              {orgLabel}
            </p>
            <p className="mt-3 text-body font-sans text-foundation-700">{orgLine}</p>
          </div>

          {/* Aside — starts at column 9, leaving column 8 empty as the separator. Attribution
              first. Below md the empty column is gone, so a hairline stands in for it. */}
          {/* DOM order is quote, then attribution — the order a screen reader and the tab
              sequence get. The visual inversion is done with flex order, so the attribution
              reads first with the eye without reordering the document. Flagged in the report. */}
          <div className="md:col-span-4 md:col-start-9 border-t border-border pt-6 md:border-t-0 md:pt-0 flex flex-col">
            <p className="order-2 font-accent accent-italic text-body-sm text-foundation-800">
              {quoteText}
            </p>
            <p className="order-1 mb-4 text-label font-grotesk text-foundation-500 uppercase tracking-widest">
              {quoteRole}
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
