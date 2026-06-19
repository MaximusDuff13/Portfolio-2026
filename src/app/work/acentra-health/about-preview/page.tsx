import Link from 'next/link'

const meta = [
  { label: 'My Role',  items: ['Design Ops', 'Accessibility', 'Token Strategy'] },
  { label: 'Team',     items: ['1 Developer', 'Lead Designer'] },
  { label: 'Timeline', items: ['8 months', '2024'] },
]

function Eyebrow() {
  return (
    <div className="mb-8 flex flex-col gap-3">
      <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">About this Project</p>
      <div className="w-8 h-px bg-accent-warm" />
    </div>
  )
}

function Dot() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-foundation-400 flex-shrink-0">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="2" fill="currentColor" />
    </svg>
  )
}

// ─── A: Bordered 3-col grid (CURRENT) ────────────────────────────────────────
function A() {
  return (
    <section className="grid grid-cols-3 border border-border">
      {meta.map(({ label, items }, i) => (
        <div key={label} className={`bg-body px-10 py-8 ${i > 0 ? 'border-l border-border' : ''}`}>
          <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest mb-5">{label}</p>
          <div className="flex flex-col gap-3">
            {items.map(item => (
              <span key={item} className="inline-flex items-center gap-2 text-body font-sans text-foundation-800">
                <Dot />
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

// ─── B: Colophon / spec rows ─────────────────────────────────────────────────
// Full-width credit rows. Label left, values right, hairline between. Magazine masthead feel.
function B() {
  return (
    <div className="border-t border-border">
      {meta.map(({ label, items }) => (
        <div key={label} className="grid grid-cols-12 gap-8 py-5 border-b border-border items-baseline">
          <p className="col-span-3 text-label font-grotesk text-foundation-500 uppercase tracking-widest">{label}</p>
          <p className="col-span-9 text-body font-sans text-foundation-800">
            {items.join('  ·  ')}
          </p>
        </div>
      ))}
    </div>
  )
}

// ─── C: Open columns, borderless ─────────────────────────────────────────────
// No box. Each column led by a short warm rule. Values stacked, no dots. Airy, editorial.
function C() {
  return (
    <div className="grid grid-cols-3 gap-12">
      {meta.map(({ label, items }) => (
        <div key={label} className="flex flex-col gap-4">
          <div className="w-6 h-px bg-accent-warm" />
          <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">{label}</p>
          <div className="flex flex-col gap-1.5">
            {items.map(item => (
              <span key={item} className="text-body font-sans text-foundation-800">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── D: Compact inline strip ─────────────────────────────────────────────────
// Single band, three groups divided by vertical rules. Values inline. Minimal vertical footprint.
function D() {
  return (
    <div className="flex border-y border-border">
      {meta.map(({ label, items }, i) => (
        <div key={label} className={`flex-1 px-8 py-6 ${i > 0 ? 'border-l border-border' : ''}`}>
          <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest mb-2">{label}</p>
          <p className="text-body-sm font-sans text-foundation-800">{items.join('  ·  ')}</p>
        </div>
      ))}
    </div>
  )
}

const options = [
  { label: 'A — Bordered 3-col grid (CURRENT)', note: 'Boxed cells with dotted lists. Structured, product-doc feel.', Component: A },
  { label: 'B — Colophon / spec rows',          note: 'Full-width credit rows, label left / values right. Reads like a magazine masthead.', Component: B },
  { label: 'C — Open borderless columns',       note: 'No box; each column led by a short warm rule. Airiest, most editorial.', Component: C },
  { label: 'D — Compact inline strip',          note: 'One slim band, vertical dividers. Smallest footprint — good if the meta should stay quiet.', Component: D },
]

export default function AboutPreviewPage() {
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
          <h1 className="text-heading-l font-grotesk text-foundation-900 mb-2">About-block layout options</h1>
          <p className="text-body-sm font-sans text-foundation-500">
            Rendered at the real content width, with the eyebrow in context.
          </p>
        </div>

        {options.map(({ label, note, Component }) => (
          <div key={label}>
            <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-body-sm font-sans text-foundation-500 mb-8">{note}</p>
            <Eyebrow />
            <Component />
          </div>
        ))}
      </div>
    </main>
  )
}
