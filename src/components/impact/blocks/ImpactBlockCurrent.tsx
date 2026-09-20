// "Current" — the block exactly as Impact.tsx ships it today, for side-by-side comparison in
// the preview. Copied verbatim from src/app/work/data-conversion-app/Impact.tsx; it is a
// baseline, not a treatment, and is not meant to be improved here.
import { AnimatedSection } from '@/components/AnimatedSection'
import { orgLabel, orgLine, quoteText, quoteRole } from './shared'

export default function ImpactBlockCurrent() {
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

      <AnimatedSection>
        <div className="mt-12 border-t border-border pt-6">
          <p className="max-w-2xl text-body font-sans text-foundation-800">{quoteText}</p>
          <p className="mt-3 text-label font-grotesk text-foundation-500 uppercase tracking-widest">
            {quoteRole}
          </p>
        </div>
      </AnimatedSection>
    </>
  )
}
