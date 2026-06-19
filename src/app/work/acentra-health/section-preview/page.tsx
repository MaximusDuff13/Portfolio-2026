import Link from 'next/link'

const quote =
  'Before building the design system, I partnered with a lead developer to audit the ecosystem — reviewing Figma libraries, component structures, and design workflows to understand what was blocking progress.'

const findings = [
  {
    title: 'Color Audit',
    description: 'Colors were hardcoded hex values with no shared tokens — every design change meant hunting across dozens of files.',
    src: '/images/audit/Color Audit.png',
  },
  {
    title: 'Text Styles',
    description: 'Typography was inconsistent. Non-brand fonts and ad-hoc sizes with no shared text styles across either product.',
    src: '/images/audit/Text Styles.png',
  },
  {
    title: 'Accessibility Risk',
    description: 'Existing color combinations failed WCAG contrast minimums, creating legal and usability risk across the product suite.',
    src: '/images/audit/Accessibility.png',
  },
]

// ─── A: Quote strip → 3-col image cards (image top, text bottom) ─────────────
// Most visual. Images lead, text captions follow. ~420px total.
function A() {
  return (
    <div className="border-t border-border">
      <div className="py-7 flex items-start gap-5 border-b border-border">
        <span className="text-foundation-300 mt-0.5 flex-shrink-0">→</span>
        <p className="text-body font-sans text-foundation-600 italic">{quote}</p>
      </div>
      <div className="grid grid-cols-3 gap-px bg-border mt-px">
        {findings.map(f => (
          <div key={f.title} className="bg-body flex flex-col">
            <div className="w-full overflow-hidden bg-foundation-900">
              <img src={f.src} alt={f.title} className="w-full h-auto block" />
            </div>
            <div className="px-6 py-5">
              <p className="text-body font-grotesk font-medium text-foundation-900 mb-1">{f.title}</p>
              <p className="text-body-sm font-sans text-foundation-600">{f.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── B: Quote left / bento grid right ───────────────────────────────────────
// Accessibility is the hero card (full width, tall). Color Audit + Text Styles
// sit below it as two equal smaller cards.
function B() {
  const [accessibility, ...rest] = findings.slice().reverse() // Accessibility last in array → hero
  const hero = findings[2]   // Accessibility Risk
  const small = [findings[0], findings[1]] // Color Audit, Text Styles

  return (
    <div className="grid grid-cols-12 gap-0 border-t border-border">
      {/* Quote column */}
      <div className="col-span-3 pr-10 py-10 border-r border-border flex flex-col justify-start gap-4 pt-10">
        <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">Audit</p>
        <p className="text-body-sm font-sans text-foundation-600 italic">{quote}</p>
      </div>

      {/* Bento grid */}
      <div className="col-span-9 pl-10 py-10 flex flex-col gap-4">
        {/* Hero card — Accessibility */}
        <div className="flex flex-col gap-3">
          <div className="w-full rounded border border-border overflow-hidden bg-foundation-900 h-72">
            <img src={hero.src} alt={hero.title} className="w-full h-full object-cover object-center block" />
          </div>
          <div>
            <p className="text-body-sm font-grotesk font-medium text-foundation-900 mb-0.5">{hero.title}</p>
            <p className="text-[13px] leading-snug font-sans text-foundation-600">{hero.description}</p>
          </div>
        </div>

        {/* Two smaller cards */}
        <div className="grid grid-cols-2 gap-4">
          {small.map(f => (
            <div key={f.title} className="flex flex-col gap-3">
              <div className="w-full rounded border border-border overflow-hidden bg-foundation-900">
                <img src={f.src} alt={f.title} className="w-full h-auto block" />
              </div>
              <div>
                <p className="text-body-sm font-grotesk font-medium text-foundation-900 mb-0.5">{f.title}</p>
                <p className="text-[13px] leading-snug font-sans text-foundation-600">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── C: Full-bleed image strip → text row below ──────────────────────────────
// Images are clipped to a shallow fixed height — readable at a glance.
// Text lives below in a 3-col row. Very minimal vertical impact.
function C() {
  return (
    <div className="border-t border-border">
      <div className="py-6 flex items-start gap-5 border-b border-border">
        <span className="text-foundation-300 mt-0.5 flex-shrink-0">→</span>
        <p className="text-body font-sans text-foundation-600 italic">{quote}</p>
      </div>
      <div className="grid grid-cols-3 gap-px bg-border mt-px">
        {findings.map(f => (
          <div key={f.title} className="bg-foundation-900 overflow-hidden">
            <img src={f.src} alt={f.title} className="w-full h-auto block" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-px bg-border">
        {findings.map((f, i) => (
          <div key={f.title} className="bg-body px-6 py-5">
            <p className="text-body font-grotesk font-medium text-foundation-900 mb-1">{f.title}</p>
            <p className="text-body-sm font-sans text-foundation-600">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── D: Numbered rows — image right, text left ───────────────────────────────
// Alternating evidence rows. More vertical but each finding gets full width.
// Good if the screenshots need to be read clearly.
function D() {
  return (
    <div className="border-t border-border">
      <div className="py-7 flex items-start gap-5 border-b border-border">
        <span className="text-foundation-300 mt-0.5 flex-shrink-0">→</span>
        <p className="text-body font-sans text-foundation-600 italic">{quote}</p>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {findings.map((f, i) => (
          <div key={f.title} className="grid grid-cols-12 gap-0 items-center">
            <div className="col-span-5 py-8 pr-10 flex flex-col gap-3">
              <span className="text-label font-grotesk text-foundation-300">0{i + 1}</span>
              <p className="text-body font-grotesk font-medium text-foundation-900">{f.title}</p>
              <p className="text-body-sm font-sans text-foundation-600">{f.description}</p>
            </div>
            <div className="col-span-7 overflow-hidden border-l border-border bg-foundation-900">
              <img src={f.src} alt={f.title} className="w-full h-auto block" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SectionPreviewPage() {
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

      <div className="max-w-5xl mx-auto flex flex-col gap-24">
        {([
          {
            label: 'A — Quote strip + 3-col image cards (image top, caption below)',
            note: 'Most visual. Images lead, descriptions follow.',
            Component: A,
          },
          {
            label: 'B — Quote left column, 3-col evidence right (most compact)',
            note: 'Quote and all three screenshots share one row height.',
            Component: B,
          },
          {
            label: 'C — Quote strip, shallow image band, text row below',
            note: 'Images clipped to 200px — evidence without taking over the page.',
            Component: C,
          },
          {
            label: 'D — Numbered rows: text left, full image right',
            note: 'Each finding gets full width. Tallest option but clearest screenshots.',
            Component: D,
          },
        ] as const).map(({ label, note, Component }) => (
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
