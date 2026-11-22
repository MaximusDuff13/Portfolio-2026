/* The hero's outcomes as a row of large figures (option A, "A line for each", picked Nov 22 2026):
   every figure has a label and one quiet supporting line, nothing struck through. Subgrid lines the
   supporting lines up whatever the labels' heights. */
export type HeroMetric = { n: string; label: string; note: string }

export function HeroMetrics({ items }: { items: HeroMetric[] }) {
  return (
    <dl className="mt-12 mb-0 grid grid-cols-2 border-t border-foundation-900 md:grid-cols-4">
      {items.map((m, i) => (
        <div
          key={m.n}
          className={`row-span-3 grid grid-rows-subgrid gap-y-0 py-6 pr-3 md:px-6 ${i ? 'md:border-l md:border-border' : 'md:pl-0'} ${i % 2 ? 'pl-5 border-l border-border md:pl-6' : ''}`}
        >
          <dt className="mt-3 text-body-sm font-sans text-foundation-800">{m.label}</dt>
          <dd className="order-first m-0 whitespace-nowrap font-display font-medium text-accent-warm" style={{ fontSize: 'clamp(40px, 5.2vw, 72px)', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</dd>
          <dd className="m-0 mt-1.5 text-caption font-sans text-foundation-600">{m.note}</dd>
        </div>
      ))}
    </dl>
  )
}
