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
  // Nov 15 2026: each beat reads as problem, solution, result, the way Type's method does.
  {
    story: [],
    facts: [],
    groups: [
      {
        title: 'The problem',
        body: ['Carbon has two main backgrounds, White and Gray 100. Accessibility was a hard requirement for the organisation, so Acentra’s brand green had to hold up on both.'],
      },
      {
        title: 'The solution',
        body: [
          'I worked in OKLCH. I held the brand hue fixed and moved only lightness and chroma, the approach Stripe used for its accessible colours, until the green passed and still read as Acentra’s.',
          'Then I placed it at Carbon’s step 60, so it carries the same weight as Carbon’s red, blue, pink and purple beside it.',
        ],
      },
      {
        title: 'The result',
        body: [],
        list: [
          { term: 'Just over 5:1 on White:', text: 'passes AA for text, which needs 4.5:1.' },
          { term: '3.6:1 on Gray 100:', text: 'passes for buttons, icons and large text, which need 3:1.' },
        ],
      },
    ],
  },
  {
    story: [],
    facts: [],
    groups: [
      {
        title: 'The problem',
        body: ['A system needs more than one green, and every pair of greens used together has to pass contrast. Nobody should have to run a check each time.'],
      },
      {
        title: 'The solution',
        body: [
          'From that green I built a ten-step scale, from 10 (lightest) to 100 (darkest), on the USWDS “magic numbers”: the gap between two steps’ grades tells you their contrast.',
          'Any two steps 40 apart reach 3:1, enough for large text and UI. Any two 50 apart reach 4.5:1, enough for body text. Teams subtract the grades instead of running a check.',
        ],
      },
      {
        title: 'The result',
        body: [],
        list: [
          { term: 'Green 10:', text: '3:1 with Green 50, 4.5:1 with Green 60 and darker.' },
          { term: 'Green 60, Acentra’s green:', text: '3:1 with Green 20 and lighter and with Green 90; 4.5:1 with Green 10.' },
          { term: 'Green 100:', text: '3:1 with Green 60, 4.5:1 with Green 50 and lighter.' },
        ],
      },
    ],
  },
  {
    story: [],
    facts: [],
    groups: [
      {
        title: 'The problem',
        body: ['With all ten greens on offer, each team would pick its own shade for the same job.'],
      },
      {
        title: 'The solution',
        body: [
          'I exposed only a few tokens. Green 60 is a primitive: it lives in the library, but nobody picks it directly.',
          'One component token, button-primary, and three semantic tokens, focus-primary, icon-interactive and border-interactive, point at it.',
        ],
      },
      {
        title: 'The result',
        body: ['Teams choose a role and the right green comes with it, so the same decision gets made the same way on every team.'],
      },
    ],
  },
]

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
