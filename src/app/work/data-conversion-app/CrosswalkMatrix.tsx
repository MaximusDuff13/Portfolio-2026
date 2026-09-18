/* Hero background illustration — the field crosswalk as the table it actually is.
 *
 * A faint 14×14 lattice with a filled cell wherever a legacy field resolves onto a
 * new-schema field. Most sit on the diagonal; a few are displaced and one row is
 * deliberately empty, which is the case study's stated problem — legacy fields that
 * didn't map 1:1 and needed manual reconciliation before conversion.
 *
 * Decoration only: aria-hidden and pointer-events-none, so it is invisible to
 * assistive tech and cannot intercept a click. Sits behind the hero content via the
 * same layering idiom the split-band sections use (absolute layer + `relative z-10`
 * content). Pure inline SVG — no image asset, no client JS, so the page stays a
 * server component. All geometry is fixed, so SSR and client render identically.
 */

const N = 14

// Row (legacy field) → column (new-schema field). Undefined rows fall on the
// diagonal; listed rows are displaced, and `null` is a field with no target.
const HITS: Record<number, number | null> = { 4: 6, 7: 5, 9: null, 12: 10 }

export function CrosswalkMatrix() {
  const vb = { w: 460, h: 620 }
  const pad = 40
  const span = vb.h - pad * 2
  const step = span / N
  const box = step * 0.52

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${vb.w} ${vb.h}`}
      preserveAspectRatio="xMaxYMid slice"
      className="pointer-events-none absolute inset-y-0 right-0 h-full w-[46%] text-accent-warm opacity-[0.14]"
    >
      {/* The lattice carries the "this is a crosswalk table" reading on its own — at a
          lower stroke opacity only the filled cells survive and it reads as scattered
          squares rather than a table. */}
      {Array.from({ length: N + 1 }, (_, i) => (
        <g key={`grid-${i}`} stroke="currentColor" strokeOpacity={0.7} strokeWidth={0.9}>
          <line x1={pad} y1={pad + i * step} x2={pad + span} y2={pad + i * step} />
          <line x1={pad + i * step} y1={pad} x2={pad + i * step} y2={pad + span} />
        </g>
      ))}

      {Array.from({ length: N }, (_, r) => {
        const c = r in HITS ? HITS[r] : r
        if (c === null) return null
        const cx = pad + c * step + step / 2
        const cy = pad + r * step + step / 2
        return (
          <rect
            key={`cell-${r}`}
            x={cx - box / 2}
            y={cy - box / 2}
            width={box}
            height={box}
            fill="currentColor"
          />
        )
      })}
    </svg>
  )
}
