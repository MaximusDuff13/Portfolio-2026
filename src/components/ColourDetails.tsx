import type { Note, Ring } from './MarkedUpShot'
import type { FlowMark } from './TokenFlow'

/* The detail behind the 04 colour story (picked Nov 14 2026: "C + A"). Skimmers get the facts
   handwritten on the exports, the way the 01 Audit is marked up; the method is in the Design notes
   (DesignNotes.tsx). HowDisclosure is only used by the temporary /dev pages now. Facts come from Michael's brief and exports only.
   No hex values anywhere: the page is public and his exports mask them too. The White ratio is
   written "just over 5:1" because his export says 5.1 and the measured value is 5.0. */

/* `groups` is for a longer method that reads better in titled parts (Type): a small subheading,
   its paragraphs, and an optional short list. The subheadings use the same style as the facts'
   titles below, so they help a reader scan without looking like page sections. */
export type HowGroup = { title: string; body: string[]; list?: { term: string; text: string }[] }
export type How = { story: string[]; facts: { title: string; body: string }[]; groups?: HowGroup[] }

export function HowDisclosure({ how }: { how: How }) {
  return (
    // a grouped method spreads its groups across the full width in columns, so it stays short
    // open from the start, so the method is there as soon as its row opens; it can be closed
    <details open className={`group mt-3 ${how.groups ? '' : 'max-w-[38rem]'}`}>
      <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-1.5 font-sans text-body-sm font-medium text-foundation-900 underline decoration-foundation-300 underline-offset-4 hover:decoration-accent-warm [&::-webkit-details-marker]:hidden">
        How I did it
        <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90 motion-reduce:transition-none">›</span>
      </summary>
      {/* the groups flow into as many 240px-or-wider columns as fit: four across the full width,
          two in a half-width beat, one on a phone. Columns, not a grid, so a wrapped group sits
          straight under the one before it with no gap. */}
      <div className={`mt-1 border-l border-border pl-4 ${how.groups ? 'gap-x-8 [columns:240px]' : ''}`}>
        {how.story.map((p) => (
          <p key={p.slice(0, 24)} className="mt-0 mb-3 font-sans text-body-sm text-foundation-800">{p}</p>
        ))}
        {how.groups?.map((g) => (
          <div key={g.title} className="break-inside-avoid pb-5">
            <h4 className="m-0 mb-1 font-sans text-body-sm font-medium text-foundation-900">{g.title}</h4>
            {g.body.map((p) => (
              <p key={p.slice(0, 24)} className="mt-0 mb-2 font-sans text-body-sm text-foundation-800 last:mb-0">{p}</p>
            ))}
            {g.list && (
              <ul className={`m-0 list-disc pl-5 marker:text-foundation-500 ${g.body.length ? 'mt-2' : ''}`}>
                {g.list.map((li) => (
                  <li key={li.term} className="mt-1 font-sans text-body-sm text-foundation-800">
                    <strong className="font-semibold text-foundation-900">{li.term}</strong> {li.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {how.facts.length > 0 && (
          <dl className="m-0 mt-4 grid gap-3">
            {how.facts.map((d) => (
              <div key={d.title}>
                <dt className="font-sans text-body-sm font-medium text-foundation-900">{d.title}</dt>
                <dd className="m-0 font-sans text-body-sm text-foundation-700">{d.body}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </details>
  )
}

/* the handwritten marks, in the 800px exports' pixels */
export const MARKUP: { rings: Ring[]; notes: Note[] }[] = [
  {
    rings: [{ cx: 96, cy: 72, rx: 70, ry: 38 }, { cx: 700, cy: 72, rx: 70, ry: 38 }],
    notes: [
      { x: 44, y: 186, text: 'AA for text' },
      { x: 468, y: 186, text: 'for buttons & icons' },
    ],
  },
  {
    rings: [{ cx: 470, cy: 440, rx: 250, ry: 24 }],
    notes: [{ x: 290, y: 196, text: '50 apart = 4.5:1', arrow: [430, 206, 470, 412] }],
  },
]

export const FLOW_NOTES: Record<FlowMark, string> = {
  primitive: 'never used directly',
  tokens: 'a role each',
  interface: 'what teams see',
}
export const FlowNote = ({ k }: { k: FlowMark }) => (
  <span className="cs-note ml-2 inline-block normal-case tracking-normal" aria-hidden="true">{FLOW_NOTES[k]}</span>
)
