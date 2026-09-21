// Rail — the pill marker shared by the case studies.
//
// This file once also held RailBlock, the two-tier block that drew the Data Conversion App
// process timeline. That timeline is now the ProcessTimeline figure and the block had no
// callers left, so only the pill remains. RailPill is still used by the Problem layout
// explorations in src/components/problem/.

/**
 * The phase marker. Both pills are this component at the same fixed height, and that fixed height
 * is what puts the two rules on one horizontal line: each pill sits on its own row above its
 * phase's rule, so the rules start from the same baseline.
 *
 * accent-warm is on the outline and the dot — graphics, where WCAG's 3:1 applies. The label text
 * is foundation-900, not accent: accent text at 11px measures 4.1:1 on the cream ground and fails
 * AA's 4.5:1.
 */
export function RailPill({
  accent,
  children,
}: {
  accent?: boolean
  children: React.ReactNode
}) {
  return (
    <span
      className={`inline-flex h-7 items-center gap-2 rounded-full border px-3 ${
        accent ? 'border-accent-warm' : 'border-border'
      }`}
    >
      {accent && <span className="w-1.5 h-1.5 rounded-full bg-accent-warm" />}
      <span
        className={`text-label font-grotesk uppercase tracking-widest ${
          accent ? 'text-foundation-900' : 'text-foundation-500'
        }`}
      >
        {children}
      </span>
    </span>
  )
}
