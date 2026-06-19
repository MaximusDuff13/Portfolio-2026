import Link from 'next/link'

const quote =
  'We presented these findings to leadership to align on the risks of the legacy path and the need for a scalable restart.'

// ─── A: Arrow + italic strip (CURRENT) ───────────────────────────────────────
function A() {
  return (
    <div className="border-t border-border py-7 flex items-start gap-5">
      <span className="text-foundation-300 mt-0.5 flex-shrink-0">→</span>
      <p className="text-body font-sans text-foundation-600 italic max-w-2xl">{quote}</p>
    </div>
  )
}

// ─── B: Large editorial pull-quote ───────────────────────────────────────────
// Warm rule, then the line set big. Turns the transition into a moment.
function B() {
  return (
    <div className="py-12 flex flex-col gap-6">
      <div className="w-12 h-px bg-accent-warm" />
      <p className="text-heading-l font-grotesk text-foundation-900 max-w-3xl">{quote}</p>
    </div>
  )
}

// ─── C: Warm callout block ───────────────────────────────────────────────────
// accent-subtle background + warm left border. Reads as a highlighted takeaway.
function C() {
  return (
    <div className="my-4 border-l-2 border-accent-warm bg-accent-subtle rounded-r px-8 py-7">
      <p className="text-label font-grotesk text-accent-warm uppercase tracking-widest mb-3">Outcome</p>
      <p className="text-body font-sans text-foundation-800 italic max-w-2xl">{quote}</p>
    </div>
  )
}

// ─── D: Right-column aligned caption ─────────────────────────────────────────
// Matches the narrative/evidence grid: label in the left col, quote in the right.
function D() {
  return (
    <div className="grid grid-cols-12 gap-8 border-t border-border pt-8">
      <div className="col-span-4 pr-8 flex flex-col gap-3">
        <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">Outcome</p>
        <div className="w-8 h-px bg-accent-warm" />
      </div>
      <p className="col-span-8 text-heading-m font-grotesk text-foundation-900">{quote}</p>
    </div>
  )
}

// ─── E: Centered statement ───────────────────────────────────────────────────
// Full-bleed beat between sections. Warm rule centered above, generous whitespace.
function E() {
  return (
    <div className="py-16 flex flex-col items-center gap-6 text-center">
      <div className="w-10 h-px bg-accent-warm" />
      <p className="text-heading-l font-grotesk text-foundation-900 max-w-3xl">{quote}</p>
    </div>
  )
}

// ─── F: Oversized quote mark + line ──────────────────────────────────────────
// A big warm quotation mark anchors the statement. Classic editorial pull-quote.
function F() {
  return (
    <div className="py-10 flex gap-6">
      <span className="text-[80px] leading-[0.8] font-grotesk text-accent-warm flex-shrink-0">&ldquo;</span>
      <p className="text-heading-m font-grotesk text-foundation-900 max-w-2xl self-center">{quote}</p>
    </div>
  )
}

const options = [
  { label: 'A — Arrow + italic strip (CURRENT)', note: 'Minimal inline transition. Quiet; reads as a footnote to the audit.', Component: A },
  { label: 'B — Large editorial pull-quote',     note: 'Warm rule + big grotesk line. Makes the leadership moment land.', Component: B },
  { label: 'C — Warm callout block',             note: 'accent-subtle panel with a warm left border. Clearly a highlighted takeaway.', Component: C },
  { label: 'D — Right-column aligned caption',   note: 'Reuses the narrative/evidence grid — label left, quote right. Most consistent with the page system.', Component: D },
  { label: 'E — Centered statement',             note: 'Full-bleed beat. Strong pause between Audit and the next section.', Component: E },
  { label: 'F — Oversized warm quote mark',      note: 'Classic pull-quote with a big warm “ mark. Most overtly "quote".', Component: F },
]

export default function QuotePreviewPage() {
  return (
    <main className="min-h-screen bg-body px-section py-section">
      <div className="mb-12">
        <Link
          href="/work/acentra-health"
          className="text-ui-chrome font-sans text-foundation-500 hover:text-foundation-900 transition-colors"
        >
          ← Back to case study
        </Link>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        <div>
          <h1 className="text-heading-l font-grotesk text-foundation-900 mb-2">Post-audit quote — layout options</h1>
          <p className="text-body-sm font-sans text-foundation-500">
            The transition beat after the Audit grid. Rendered at real content width.
          </p>
        </div>

        {options.map(({ label, note, Component }) => (
          <div key={label}>
            <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-body-sm font-sans text-foundation-500 mb-8">{note}</p>
            <Component />
          </div>
        ))}
      </div>
    </main>
  )
}
