import Link from 'next/link'

const roles = ['Design Ops', 'Accessibility', 'Token Strategy']
const team = ['1 Developer', 'Lead Designer']
const timeline = ['8 months', '2024']
const meta = [
  { label: 'My Role', items: roles },
  { label: 'Team',    items: team },
  { label: 'Timeline', items: timeline },
]

function Dot() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-foundation-400 flex-shrink-0">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="2" fill="currentColor" />
    </svg>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-body font-sans text-foundation-800">
      <Dot />
      {label}
    </span>
  )
}

// ─── V1: Three columns, top-ruled ────────────────────────────────────────────
function V1() {
  return (
    <div className="grid grid-cols-3 gap-0 border-t border-border">
      {meta.map(({ label, items }, i) => (
        <div key={i} className={`py-8 pr-12 ${i > 0 ? 'pl-12 border-l border-border' : ''}`}>
          <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-4">{label}</p>
          <div className="flex flex-col gap-2">
            {items.map(item => <Tag key={item} label={item} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── V2: Horizontal strip, inline tags ───────────────────────────────────────
function V2() {
  return (
    <div className="flex items-start gap-0 border-t border-border pt-8">
      {meta.map(({ label, items }, i) => (
        <div key={i} className={`flex-1 ${i > 0 ? 'pl-12 border-l border-border ml-12' : ''}`}>
          <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-3">{label}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {items.map(item => <Tag key={item} label={item} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── V3: Table rows — label left, tags right ─────────────────────────────────
function V3() {
  return (
    <div className="flex flex-col divide-y divide-border border-t border-border">
      {meta.map(({ label, items }) => (
        <div key={label} className="grid grid-cols-12 gap-6 py-6">
          <p className="col-span-2 text-label font-grotesk text-foundation-400 uppercase tracking-widest pt-0.5">{label}</p>
          <div className="col-span-10 flex flex-wrap gap-x-8 gap-y-2">
            {items.map(item => <Tag key={item} label={item} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── V4: Pill tags grouped under large labels ─────────────────────────────────
function V4() {
  return (
    <div className="grid grid-cols-3 gap-12 border-t border-border pt-8">
      {meta.map(({ label, items }) => (
        <div key={label}>
          <p className="text-heading-m font-grotesk text-foundation-900 mb-4">{label}</p>
          <div className="flex flex-col gap-3">
            {items.map(item => (
              <span key={item} className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-body font-sans text-foundation-800 w-fit">
                <Dot />
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── V5: Asymmetric — role wider, team + timeline narrower ───────────────────
function V5() {
  return (
    <div className="grid grid-cols-12 gap-0 border-t border-border">
      <div className="col-span-5 py-8 pr-12 border-r border-border">
        <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-4">My Role</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {roles.map(item => <Tag key={item} label={item} />)}
        </div>
      </div>
      <div className="col-span-4 py-8 px-12 border-r border-border">
        <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-4">Team</p>
        <div className="flex flex-col gap-2">
          {team.map(item => <Tag key={item} label={item} />)}
        </div>
      </div>
      <div className="col-span-3 py-8 pl-12">
        <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-4">Timeline</p>
        <div className="flex flex-col gap-2">
          {timeline.map(item => <Tag key={item} label={item} />)}
        </div>
      </div>
    </div>
  )
}

// ─── V6: Dark card — matches hero ─────────────────────────────────────────────
function V6() {
  return (
    <div className="grid grid-cols-3 gap-px bg-foundation-800">
      {meta.map(({ label, items }) => (
        <div key={label} className="bg-foundation-900 px-10 py-8">
          <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest mb-5">{label}</p>
          <div className="flex flex-col gap-3">
            {items.map(item => (
              <span key={item} className="inline-flex items-center gap-2 text-body font-sans text-foundation-300">
                <Dot />
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── V7: Numbered rows ────────────────────────────────────────────────────────
function V7() {
  return (
    <div className="flex flex-col gap-0 border-t border-border">
      {meta.map(({ label, items }, i) => (
        <div key={label} className="grid grid-cols-12 items-start py-7 border-b border-border">
          <span className="col-span-1 text-label font-grotesk text-foundation-300 pt-0.5">0{i + 1}</span>
          <p className="col-span-2 text-label font-grotesk text-foundation-400 uppercase tracking-widest pt-0.5">{label}</p>
          <div className="col-span-9 flex flex-wrap gap-x-8 gap-y-2">
            {items.map(item => <Tag key={item} label={item} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── V8: Single flowing line ──────────────────────────────────────────────────
function V8() {
  return (
    <div className="border-t border-border pt-8 flex flex-wrap items-baseline gap-x-3 gap-y-3">
      {meta.map(({ label, items }, i) => (
        <span key={label} className="inline-flex items-baseline gap-x-3 flex-wrap">
          {i > 0 && <span className="text-foundation-300 text-body px-2">—</span>}
          <span className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">{label}</span>
          {items.map(item => (
            <span key={item} className="inline-flex items-center gap-1.5 text-body font-sans text-foundation-800">
              <Dot />
              {item}
            </span>
          ))}
        </span>
      ))}
    </div>
  )
}

// ─── V9: Large category heading, items in a row beneath ──────────────────────
function V9() {
  return (
    <div className="grid grid-cols-3 gap-0 border-t border-border">
      {meta.map(({ label, items }, i) => (
        <div key={label} className={`py-10 ${i > 0 ? 'pl-12 border-l border-border' : 'pr-12'}`}>
          <p className="text-heading-xl font-grotesk text-foundation-900 mb-6">{label}</p>
          <div className="flex flex-col gap-2.5">
            {items.map(item => (
              <span key={item} className="flex items-center gap-2 text-body font-sans text-foundation-600">
                <span className="w-1 h-1 rounded-full bg-foundation-400 flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── V10: Compact two-line stack with hairline left accent ───────────────────
function V10() {
  return (
    <div className="flex gap-16 border-t border-border pt-8">
      {meta.map(({ label, items }) => (
        <div key={label} className="border-l-2 border-foundation-900 pl-4">
          <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-3">{label}</p>
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

export default function MetaPreviewPage() {
  return (
    <main className="min-h-screen bg-body px-section py-section">
      <div className="mb-12">
        <Link href="/work/acentra-health" className="text-ui-chrome font-sans text-foundation-500 hover:text-foundation-900 transition-colors">
          ← Back to case study
        </Link>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-20">
        {[
          { label: 'V1 — Three columns, top-ruled',         Component: V1  },
          { label: 'V2 — Horizontal strip, inline tags',    Component: V2  },
          { label: 'V3 — Table rows, label left',           Component: V3  },
          { label: 'V4 — Pill tags under large labels',     Component: V4  },
          { label: 'V5 — Asymmetric columns',               Component: V5  },
          { label: 'V6 — Dark cards, matches hero',         Component: V6  },
          { label: 'V7 — Numbered rows',                    Component: V7  },
          { label: 'V8 — Single flowing line',              Component: V8  },
          { label: 'V9 — Large category heading',           Component: V9  },
          { label: 'V10 — Left accent, compact stack',      Component: V10 },
        ].map(({ label, Component }) => (
          <div key={label}>
            <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-6">{label}</p>
            <Component />
          </div>
        ))}
      </div>
    </main>
  )
}
