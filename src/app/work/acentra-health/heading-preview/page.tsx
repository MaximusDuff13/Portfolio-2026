import Link from 'next/link'

const quote =
  'Before building the design system, I partnered with a lead developer to audit the ecosystem — reviewing Figma libraries, component structures, and design workflows to understand what was blocking progress.'

// Each option is rendered at the real left-column width (~col-span-4 of max-w-6xl)
// with a right border to simulate the narrative/evidence divider.
function Col({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[360px] pr-8 border-r border-border flex flex-col gap-4">
      {children}
    </div>
  )
}

// ─── A: Numbered eyebrow + finding headline + quote (CURRENT) ─────────────────
function A() {
  return (
    <Col>
      <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">01 — Audit</p>
      <h2 className="text-heading-xl font-grotesk text-foundation-900">A Fragmented Foundation</h2>
      <p className="text-body-sm font-sans text-foundation-600 italic">{quote}</p>
    </Col>
  )
}

// ─── B: Category heading only + quote (the old simple way) ────────────────────
function B() {
  return (
    <Col>
      <h2 className="text-heading-xl font-grotesk text-foundation-900">Audit</h2>
      <p className="text-body-sm font-sans text-foundation-600 italic">{quote}</p>
    </Col>
  )
}

// ─── C: Number-only eyebrow + finding headline ───────────────────────────────
function C() {
  return (
    <Col>
      <p className="text-label font-grotesk text-foundation-300 uppercase tracking-widest">01</p>
      <h2 className="text-heading-xl font-grotesk text-foundation-900">A Fragmented Foundation</h2>
      <p className="text-body-sm font-sans text-foundation-600 italic">{quote}</p>
    </Col>
  )
}

// ─── D: Finding headline first, category as kicker below ──────────────────────
function D() {
  return (
    <Col>
      <h2 className="text-heading-xl font-grotesk text-foundation-900">A Fragmented Foundation</h2>
      <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">Audit · 01</p>
      <p className="text-body-sm font-sans text-foundation-600 italic mt-2">{quote}</p>
    </Col>
  )
}

// ─── E: Oversized index numeral beside the headline ──────────────────────────
function E() {
  return (
    <div className="w-[360px] pr-8 border-r border-border flex gap-5">
      <span className="text-display-xl font-grotesk text-foundation-200 leading-none flex-shrink-0">01</span>
      <div className="flex flex-col gap-3">
        <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">Audit</p>
        <h2 className="text-heading-l font-grotesk text-foundation-900">A Fragmented Foundation</h2>
        <p className="text-body-sm font-sans text-foundation-600 italic">{quote}</p>
      </div>
    </div>
  )
}

// ─── F: Eyebrow + category headline (the redundant "don't") ──────────────────
function F() {
  return (
    <Col>
      <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">01 — Phase</p>
      <h2 className="text-heading-xl font-grotesk text-foundation-900">Audit</h2>
      <p className="text-body-sm font-sans text-foundation-600 italic">{quote}</p>
    </Col>
  )
}

// ─── G: Minimal — finding headline only, no eyebrow ──────────────────────────
function G() {
  return (
    <Col>
      <h2 className="text-heading-xl font-grotesk text-foundation-900">A Fragmented Foundation</h2>
      <p className="text-body-sm font-sans text-foundation-600 italic">{quote}</p>
    </Col>
  )
}

// ─── H: Eyebrow + headline with a rule under the eyebrow ──────────────────────
function H() {
  return (
    <Col>
      <div className="flex flex-col gap-3">
        <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">01 — Audit</p>
        <div className="w-8 h-px bg-accent-warm" />
      </div>
      <h2 className="text-heading-xl font-grotesk text-foundation-900">A Fragmented Foundation</h2>
      <p className="text-body-sm font-sans text-foundation-600 italic">{quote}</p>
    </Col>
  )
}

const options = [
  { label: 'A — Numbered eyebrow + finding headline + quote',  note: 'CURRENT. Wayfinding (01 — Audit) + a claim. Most skimmable for a process narrative.', Component: A },
  { label: 'B — Category heading only + quote',                note: 'The old simple way. One heading, no eyebrow. Clean but the heading only labels, never claims.', Component: B },
  { label: 'C — Number-only eyebrow + finding headline',        note: 'Keeps the sequence number, drops the word. Quietest way to show "this is step 1".', Component: C },
  { label: 'D — Finding headline first, category as kicker',    note: 'Flips hierarchy: the claim leads, wayfinding follows. More magazine, less product-doc.', Component: D },
  { label: 'E — Oversized index numeral beside headline',       note: 'Big ghosted 01 as a graphic anchor. Strong editorial signature; uses more horizontal room.', Component: E },
  { label: 'F — Eyebrow + category headline (DON\'T)',          note: 'Shown on purpose: eyebrow and heading say the same thing. This is the trap to avoid.', Component: F },
  { label: 'G — Minimal: finding headline only',               note: 'No eyebrow at all. Cleanest. Loses the visible process sequence down the left rail.', Component: G },
  { label: 'H — Eyebrow + warm rule + headline',               note: 'A, plus a short accent-warm rule under the eyebrow. Adds the warm tone as a structural detail.', Component: H },
]

export default function HeadingPreviewPage() {
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

      <div className="max-w-3xl mx-auto flex flex-col gap-16">
        <div>
          <h1 className="text-heading-l font-grotesk text-foundation-900 mb-2">Section heading options</h1>
          <p className="text-body-sm font-sans text-foundation-500">
            Each is rendered at the real left-column width with the divider, so spacing and type read true.
          </p>
        </div>

        {options.map(({ label, note, Component }) => (
          <div key={label}>
            <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-body-sm font-sans text-foundation-500 mb-6">{note}</p>
            <Component />
          </div>
        ))}
      </div>
    </main>
  )
}
