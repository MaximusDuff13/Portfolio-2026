// PrincipleGrid — the working principles that sit under the process chart.
//
// NEW COMPONENT. It is deliberately not a card: it shares the Process FigureCard with the
// timeline and is separated from it by a single rule, so the two read as one figure — the
// sequence of the work, then how the work was run — rather than as two stacked panels.
//
// NO accent-warm, no icon background, no border, no hover state, no motion. The icons are a
// reading aid for a list of four, not emphasis, which is why they carry aria-hidden and the
// list is comprehensible with them removed.
//
// CONTRAST. Measured against FigureCard's foundation-100 ground: the term at foundation-900
// (16.03:1), the sentence and the icons at foundation-600 (6.99:1). foundation-500 is not
// used for text here — it measures 4.40:1 on this ground, under AA's 4.5:1 — which is the
// same trade FigureCard's caption and SectionHeader's accessibleEyebrow already make.
import type { LucideIcon } from 'lucide-react'

export type Principle = {
  term: string
  body: string
  icon: LucideIcon
}

export function PrincipleGrid({ items }: { items: Principle[] }) {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-x-10 gap-y-8 p-0 sm:grid-cols-2">
      {items.map(({ term, body, icon: Icon }) => (
        <li key={term} className="flex gap-4">
          {/* mt-0.5 sets the icon on the cap height of the first line rather than its box. */}
          <Icon
            aria-hidden="true"
            size={20}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0 text-foundation-600"
          />
          <p className="m-0 font-sans text-body-sm text-foundation-600">
            <strong className="font-medium text-foundation-900">{term}</strong>
            {': '}
            {body}
          </p>
        </li>
      ))}
    </ul>
  )
}
