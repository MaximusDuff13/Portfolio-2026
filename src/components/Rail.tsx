// Rail — the process-timeline track used by the Data Conversion App case study.
//
// One continuous timeline where the pre-UX build is the earlier, quieter segment and the design
// work runs along the rest. Both phases are rendered by the SAME block component, separated only
// by a `muted` flag, which is what stops the two sides drifting apart: there is no second set of
// markup to keep in sync, so the before can never end up at a different height or a different
// shape from the stages. It is secondary through colour and label weight alone.

export type RailItem = {
  title: string
  /** What was done. The quiet tier. */
  did: string
  /** What it meant. The highlighted tier — the part a skimmer should be able to read alone. */
  takeaway: string
}

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

/**
 * One block on the rail: marker, title, what was done, takeaway.
 *
 * TWO TIERS
 *   did      — body-sm in foundation-500. Ordinary body weight, deliberately quiet.
 *   takeaway — body-sm in foundation-900 on a foundation-100 fill with an accent-warm left edge.
 *              The fill and the edge carry the emphasis, so the accent stays on a rule rather than
 *              on type. The muted block swaps that edge for foundation-400 and the type for
 *              foundation-600 — same structure, lower voice.
 *
 * `contents` dissolves the wrapper at lg so the three parts join the parent grid directly. The
 * parent runs grid-flow-col over three rows, so every column draws from the same row heights and
 * the takeaways start on one line however long each `did` runs. Below lg the wrapper is an
 * ordinary stacked block.
 */
export function RailBlock({
  title,
  did,
  takeaway,
  muted,
  contents,
}: RailItem & { muted?: boolean; contents?: boolean }) {
  return (
    <div className={contents ? 'lg:contents' : undefined}>
      <div>
        <span
          className={`block w-1.5 h-1.5 rounded-full ${
            muted ? 'bg-foundation-400' : 'bg-accent-warm'
          }`}
        />
        <p
          className={`mt-3 font-grotesk ${
            muted ? 'text-body-sm text-foundation-500' : 'text-heading-m text-foundation-900'
          }`}
        >
          {title}
        </p>
      </div>

      <p className="mt-2 text-body-sm font-sans text-foundation-500">{did}</p>

      <p
        className={`mt-4 border-l pl-4 py-2 text-body-sm font-sans bg-foundation-100 ${
          muted
            ? 'border-foundation-400 text-foundation-600'
            : 'border-accent-warm text-foundation-900'
        }`}
      >
        {takeaway}
      </p>
    </div>
  )
}
