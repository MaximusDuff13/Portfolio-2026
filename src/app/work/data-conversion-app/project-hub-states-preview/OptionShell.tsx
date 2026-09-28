// One option, framed as the complete Project hub feature: a dev-only caption, then the live
// ProblemSolutionFeature (eyebrow, title, Problem/Solution card, hub screenshot, all from the live
// content), then this option's states on the same dark band.
//
// ORDER. The live feature renders the hub screenshot last; here `states` is left off, so it ends
// on the hub screenshot and the states follow it.
//
// SPACING. Card → hub screenshot is the feature's own mt-section (80px), the gap the live page
// uses between the card and the ConceptRow. Hub screenshot → states is the feature section's
// pb-section (80px), with no extra top margin on the states, so both gaps equal that reference.
//
// WIDTH. The eyebrow, title, card and hub screenshot keep the content wrap; only the states
// widen, through wideRow, the same breakout the ConceptRow uses. The states band clips
// horizontally (overflow-x: clip), so A3's neighbours can run past the wrap to the viewport edge
// without a horizontal scrollbar.
//
// Index 0 gives the dark band and the dark card (foundation-800 / foundation-900, no border).
import { ProblemSolutionFeature } from '@/components/ProblemSolutionFeature'
import { LightboxProvider } from '@/components/Lightbox'
import { wideRow } from '@/components/wideRow'
import { projectHub } from '../projectHub'

const hubFirst = { ...projectHub, states: undefined }

export function OptionShell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div data-option={label}>
      {/* Dev-only caption. Never on the case study page: nothing there imports this folder.
          foundation-400 on foundation-800 is 6.01:1. */}
      <div className="border-t border-foundation-700 bg-foundation-800 px-6 pt-10 sm:px-10 lg:px-section">
        <p className="mx-auto max-w-6xl font-grotesk text-label uppercase tracking-widest text-foundation-400">
          {label}
        </p>
      </div>
      <ProblemSolutionFeature index={0} feature={hubFirst} />
      <div className="overflow-x-clip bg-foundation-800 px-6 pb-section sm:px-10 lg:px-section">
        <div className="mx-auto max-w-6xl">
          <div data-states="" className={wideRow}>
            <LightboxProvider>{children}</LightboxProvider>
          </div>
        </div>
        {/* Marks the end of the states, for measuring layout shift below them. */}
        <div data-below-states="" aria-hidden="true" className="h-px" />
      </div>
    </div>
  )
}
