import type { Note, Ring } from './MarkedUpShot'
import type { FlowMark } from './TokenFlow'

/* The detail behind the 04 colour story (picked Nov 14 2026: "C + A"). Skimmers get the facts
   handwritten on the exports, the way the 01 Audit is marked up; readers who want the method
   open "How I did it" under each beat. Facts come from Michael's brief and exports only.
   No hex values anywhere: the page is public and his exports mask them too. The White ratio is
   written "just over 5:1" because his export says 5.1 and the measured value is 5.0. */

/* `groups` is for a longer method that reads better in titled parts (Type): a small subheading,
   its paragraphs, and an optional short list. The subheadings use the same style as the facts'
   titles below, so they help a reader scan without looking like page sections. */
export type HowGroup = { title: string; body: string[]; list?: { term: string; text: string }[] }
export type How = { story: string[]; facts: { title: string; body: string }[]; groups?: HowGroup[] }

export const HOW: How[] = [
  {
    story: [
      'I started from Acentra’s brand green and checked it against Carbon’s two main backgrounds, White and Gray 100. Accessibility was a hard requirement for the organisation, so the green had to hold up on both.',
      'I worked in OKLCH. I held the brand hue fixed and moved only lightness and chroma, the approach Stripe used for its accessible colours, until the green passed and still read as Acentra’s. Then I placed it at Carbon’s step 60, so it carries the same weight as Carbon’s red, blue, pink and purple beside it.',
    ],
    facts: [
      { title: 'Just over 5:1 on White', body: 'Passes AA for text, which needs 4.5:1.' },
      { title: '3.6:1 on Gray 100', body: 'Passes for buttons, icons and large text, which need 3:1.' },
    ],
  },
  {
    story: [
      'From that green I built a ten-step scale, from 10 (lightest) to 100 (darkest), on the USWDS “magic numbers”: the gap between two steps’ grades tells you their contrast.',
      'Any two steps 40 apart reach 3:1, enough for large text and UI. Any two 50 apart reach 4.5:1, enough for body text. So nobody has to run a contrast check to pair two greens; they subtract the grades. Every step has a job, and the scale sits alongside Carbon’s other hues in both themes.',
    ],
    facts: [
      { title: 'Green 10', body: '3:1 with Green 50, 4.5:1 with Green 60 and darker.' },
      { title: 'Green 60, Acentra’s green', body: '3:1 with Green 20 and lighter and with Green 90; 4.5:1 with Green 10.' },
      { title: 'Green 100', body: '3:1 with Green 60, 4.5:1 with Green 50 and lighter.' },
    ],
  },
  {
    story: [
      'Instead of handing teams all ten greens, I exposed only a few tokens. Green 60 is a primitive: it lives in the library, but nobody picks it directly.',
      'One component token, button-primary, and three semantic tokens, focus-primary, icon-interactive and border-interactive, point at it. Teams choose a role and the right green comes with it, so the same decision gets made the same way on every team.',
    ],
    facts: [],
  },
]

export function HowDisclosure({ how }: { how: How }) {
  return (
    // a grouped method spreads its groups across the full width in columns, so it stays short
    <details className={`group mt-3 ${how.groups ? '' : 'max-w-[38rem]'}`}>
      <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-1.5 font-sans text-body-sm font-medium text-foundation-900 underline decoration-foundation-300 underline-offset-4 hover:decoration-accent-warm [&::-webkit-details-marker]:hidden">
        How I did it
        <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90 motion-reduce:transition-none">›</span>
      </summary>
      <div className={`mt-1 border-l border-border pl-4 ${how.groups ? 'grid grid-cols-1 gap-x-8 gap-y-5 pb-3 md:grid-cols-2 xl:grid-cols-4' : ''}`}>
        {how.story.map((p) => (
          <p key={p.slice(0, 24)} className="mt-0 mb-3 font-sans text-body-sm text-foundation-800">{p}</p>
        ))}
        {how.groups?.map((g) => (
          <div key={g.title}>
            <h4 className="m-0 mb-1 font-sans text-body-sm font-medium text-foundation-900">{g.title}</h4>
            {g.body.map((p) => (
              <p key={p.slice(0, 24)} className="mt-0 mb-2 font-sans text-body-sm text-foundation-800 last:mb-0">{p}</p>
            ))}
            {g.list && (
              <ul className="m-0 mt-2 list-disc pl-5 marker:text-foundation-500">
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
