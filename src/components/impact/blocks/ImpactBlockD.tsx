// Treatment D — Closing band.
//
// STRUCTURE: the two parts are separated by GROUND, not by type, indent or position. The
// statement sits on the page's own cream; the quote sits on a foundation-100 fill that runs the
// width of the content column and closes the section. Nothing else changes axis.
//
// The fill has NO border and no radius beyond the page's usual rounding. That is deliberate: a
// bordered, rounded card here would read as a component and would pull against the display-xl
// big line, which has to stay the strongest thing on screen. foundation-100 against #fdfbf7 is
// about as quiet as a ground change can be while still being unmistakable — it is the same fill
// Problem's earlier step-1 block used, so the page has already established it as "this is set
// apart", not "this is important".
//
// Because the ground already does the separating, the quote stays at body size and keeps the
// serif italic only for voice. The attribution sits at the foot of the band with real space
// above it, inside the same fill, so it reads as part of the quoted unit rather than as a
// caption stuck underneath one.
import { AnimatedSection } from '@/components/AnimatedSection'
import { orgLabel, orgLine, quoteText, quoteRole } from './shared'

export default function ImpactBlockD() {
  return (
    <>
      <AnimatedSection>
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
            {orgLabel}
          </p>
          <p className="mt-3 max-w-xl text-body font-sans text-foundation-700">{orgLine}</p>
        </div>
      </AnimatedSection>

      {/* The band. No border — the fill alone is the signal. */}
      <AnimatedSection>
        {/* px-5 below sm, not px-6: at 390 the page gutters already leave the column ~210px,
            and the band's own padding took the quote to 162px — about 21 characters a line. */}
        <div className="mt-10 rounded-lg bg-foundation-100 px-5 py-8 sm:px-10 sm:py-10">
          <p className="max-w-2xl font-accent accent-italic text-body text-foundation-800">
            {quoteText}
          </p>
          <p className="mt-7 text-label font-grotesk text-foundation-500 uppercase tracking-widest">
            {quoteRole}
          </p>
        </div>
      </AnimatedSection>
    </>
  )
}
