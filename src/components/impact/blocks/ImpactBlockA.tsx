// Treatment A — Hanging rule.
//
// STRUCTURE: both parts stay stacked, as now, but only the FIRST carries a hairline. The quote
// is no longer a second identical unit — it is indented behind a vertical rule and set in the
// serif italic, so the change of axis and the change of face separate it from the statement
// without a second horizontal divider. That is the whole move: one rule across, one rule down.
//
// WHY THE SERIF: Problem's heading and Impact's big line already use font-accent italic, so the
// face is established on this page as "the voice that isn't body copy". Putting the quote in it
// stops it reading as another paragraph, and — because it is set at body-sm, not display — it
// cannot compete with the big line above.
//
// THE BRACKETS: "[an implementation]" is the one thing in the quote that looks like a mistake in
// plain body type. In the italic serif it reads as what it is, an editorial insertion in someone
// else's sentence.
//
// THE ATTRIBUTION: released onto its own line with mt-6 and a short foundation-300 rule above
// it, rather than the cramped mt-3 it had. The rule is 24px, the same width the page uses for
// its accent eyebrow rules, so it reads as part of the system.
import { AnimatedSection } from '@/components/AnimatedSection'
import { orgLabel, orgLine, quoteText, quoteRole } from './shared'

export default function ImpactBlockA() {
  return (
    <>
      {/* Organization statement — the "so what". One hairline opens the whole part. */}
      <AnimatedSection>
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
            {orgLabel}
          </p>
          <p className="mt-3 max-w-xl text-body font-sans text-foundation-700">{orgLine}</p>
        </div>
      </AnimatedSection>

      {/* Quote — indented behind a vertical rule. No border-t: the indent and the face are the
          separation, and a second horizontal rule is what made the two blur together before. */}
      <AnimatedSection>
        {/* The rule and indent start at sm. At 390 the page gutters (px-section, 80px a side)
            already leave the column ~215px, and a 24px indent took the quote down to 190px —
            about 25 characters a line. Below sm the serif face alone does the separating. */}
        <div className="mt-10 sm:border-l sm:border-border sm:pl-8">
          <p className="max-w-2xl font-accent accent-italic text-body text-foundation-800">
            {quoteText}
          </p>

          <div className="mt-6">
            <div className="w-6 h-px bg-foundation-300" />
            <p className="mt-3 text-label font-grotesk text-foundation-500 uppercase tracking-widest">
              {quoteRole}
            </p>
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}
