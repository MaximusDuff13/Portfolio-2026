'use client'
import { useState, type ReactNode } from 'react'
import { SectionHeader } from './SectionHeader'
import { LightboxProvider, LightboxTrigger } from './Lightbox'
import { MarkedUpShot } from './MarkedUpShot'
import { TokenFlow } from './TokenFlow'
import { FlowNote, HOW, HowDisclosure, MARKUP, type How } from './ColourDetails'
import { Develop } from './Develop'
import { PenRing } from './PenRing'

/* 04 Built on Carbon (Nov 14 2026): what we changed in Carbon, as three fold-out rows so the
   section never grows: Colour (open at first), Type, Corners. Opening one closes the others.
   Colour is the story in Michael's three beats: one green for both of Carbon's themes, the scale
   grown from it with the USWDS magic numbers, and the tokens. Type and Corners show his own
   exports. Every caption is one line; "How I did it" opens the method. Marketing's starting green
   and every hex value are deliberately left out: the page is public. */

type Beat = { title: string; line: string }
const BEATS: Beat[] = [
  { title: 'One green, both themes', line: 'Passes for text on White, and for buttons, icons and large text on Gray 100.' },
  { title: 'A scale from magic numbers', line: 'Ten steps. The gap between two grades sets their contrast.' },
  { title: 'Set up as tokens', line: 'Teams pick a role, not a shade.' },
]

const IMAGES = [
  {
    src: '/images/acentra-colour/themes-800.webp',
    full: '/images/acentra-colour/themes-1600.webp',
    alt: 'Acentra Green as a button beside Carbon’s red, blue, pink and purple, across a white half and a dark half: 5.1:1 against white, 3.6:1 against dark',
  },
  {
    src: '/images/acentra-colour/scale-800.webp',
    full: '/images/acentra-colour/scale-1600.webp',
    alt: 'The Acentra green scale: Leaf, the primary brand colour, with Green 10, 60 and 100 and their magic-number contrast notes',
  },
]

function Caption({ i }: { i: number }) {
  return (
    <>
      <p className="mt-4 mb-0 font-sans text-caption tabular-nums text-foundation-600">{String(i + 1).padStart(2, '0')}</p>
      <h4 className="mt-1 mb-0 text-heading-m font-display text-foundation-900">{BEATS[i].title}</h4>
      <p className="mt-1 mb-0 max-w-[36rem] text-body-sm font-sans text-foundation-700">{BEATS[i].line}</p>
      <HowDisclosure how={HOW[i]} />
    </>
  )
}

/** one export on its sage stage, marked up by hand; tap it to see it full size */
function Shot({ i }: { i: number }) {
  const img = IMAGES[i]
  return (
    <div className="rounded-xl bg-stage-sage p-4 sm:p-6">
      <div className="relative mx-auto max-w-[420px]">
        <MarkedUpShot src={img.src} alt={img.alt} w={800} h={800} rings={MARKUP[i].rings} notes={MARKUP[i].notes} delay={i * 180} />
        <LightboxTrigger src={img.full} alt={img.alt} />
      </div>
    </div>
  )
}

/** the three colour beats; needs a LightboxProvider above it */
export function ColourStory() {
  return (
    <>
      {/* 01 and 02: the two exports, side by side; tap either to see it full size */}
      <ol className="m-0 mt-12 grid list-none grid-cols-1 gap-12 p-0 md:grid-cols-2 md:gap-8">
        {IMAGES.map((img, i) => (
          <li key={img.src}>
            <Shot i={i} />
            <Caption i={i} />
          </li>
        ))}
      </ol>

      {/* 03: the token flow, redrawn in HTML so it is sharp and readable everywhere */}
      <div className="mt-12">
        <div className="rounded-xl bg-stage-sage p-5 sm:p-8">
          <TokenFlow mark={(k) => <FlowNote k={k} />} />
        </div>
        <Caption i={2} />
      </div>
    </>
  )
}

/* ---------- Type and Corners: Michael's exports, two to a row ---------- */

const TR = '/images/acentra-type-radius/'
// Method copy written from Michael's answers (Nov 14 2026).
const HOW_TYPE: How = {
  story: [
    'Carbon ships with IBM Plex. We replaced it with Roboto across the system.',
    'Healthcare products come in two kinds, so I added two type modes. Standard is for external products, where there is room and slightly larger text reads better. Compact is for internal tools, where staff need more on one screen. Every type token is 2px smaller in Compact, so a team switches mode, not individual sizes.',
  ],
  facts: [],
}
const HOW_CORNERS: How = {
  story: [
    'Carbon’s corners are square. I gave every Acentra component a 2px corner, enough to feel friendlier without changing how Carbon looks.',
    'Layout surfaces such as tiles and containers get their own radius tokens, from 2px to 16px, plus round. The steps follow Carbon’s 8px grid, so they stay consistent with the rest of the system.',
  ],
  facts: [],
}

type Export = { src: string; full?: string; w: number; h: number; alt: string; caption: string; note?: ReactNode; ring?: string }
const TYPE_SHOTS: Export[] = [
  {
    src: `${TR}type-modes.webp`,
    full: `${TR}type-modes-full.webp`,
    w: 1522,
    h: 700,
    alt: 'The same beneficiary screen in Standard, left, and Compact, right: the text is 2px smaller in Compact',
    caption: 'The same screen in both modes.',
    note: (
      <span className="grid grid-cols-2 gap-4">
        <span>Standard: external</span>
        <span className="pl-[4%]">Compact: internal</span>
      </span>
    ),
  },
  {
    src: `${TR}type-table.webp`,
    w: 1521,
    h: 769,
    alt: 'Typography size comparison. Body-01: 16 Standard, 14 Compact. Body-02: 18 and 16. Label-01: 16 and 14. Heading-01: 16 and 14',
    caption: 'Every type token has a Standard and a Compact size.',
    note: '2px smaller, on every token',
  },
]
const CORNER_SHOTS: Export[] = [
  {
    src: `${TR}radius-before-after.webp`,
    w: 851,
    h: 310,
    alt: 'A button corner at 16× zoom. Before: token radius-00, a square 0px corner. After: token radius-01, a 2px corner',
    caption: 'Components: a square corner became 2px.',
    note: 'every component',
  },
  {
    src: `${TR}radius-scale.webp`,
    w: 901,
    h: 288,
    alt: 'Seven tiles showing the radius tokens in order, from a square corner to the roundest',
    caption: 'Tiles and containers choose from a scale.',
    note: 'the larger steps are for layouts',
    ring: 'left-[16.5%] top-[15%] h-[62%] w-[15.5%]',
  },
]

/** one export on a sage stage with a handwritten note; tap it to see it full size */
function ExportShot({ shot, delay }: { shot: Export; delay: number }) {
  return (
    <figure className="m-0 flex flex-col">
      <div className="flex flex-1 flex-col justify-center rounded-xl bg-stage-sage p-4 sm:p-6">
        {shot.note && <p className="cs-note m-0 mb-2" aria-hidden="true">{shot.note}</p>}
        <div className="relative">
          <Develop delay={delay} className="rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} loading="lazy" className="block h-auto w-full rounded-lg" />
          </Develop>
          {shot.ring && <PenRing className={`pointer-events-none absolute ${shot.ring}`} />}
          <LightboxTrigger src={shot.full ?? shot.src} alt={shot.alt} />
        </div>
      </div>
      <figcaption className="mt-3 font-sans text-body-sm text-foundation-700">{shot.caption}</figcaption>
    </figure>
  )
}
function Exports({ shots, how }: { shots: Export[]; how: How }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {shots.map((s, i) => (
          <ExportShot key={s.src} shot={s} delay={i * 180} />
        ))}
      </div>
      <HowDisclosure how={how} />
    </>
  )
}

/* ---------- the fold-out rows ---------- */

function FoldRow({ label, teaser, open, children }: { label: string; teaser: string; open?: boolean; children: ReactNode }) {
  return (
    <details
      name="c04"
      open={open}
      className="group/row scroll-mt-32 border-b border-border"
      // opening one row closes the others; if that pulled this row above the screen, bring it back
      onToggle={(e) => {
        const el = e.currentTarget
        if (el.open && el.getBoundingClientRect().top < 120) el.scrollIntoView({ block: 'start' })
      }}
    >
      <summary className="flex min-h-[64px] cursor-pointer list-none items-center gap-x-6 rounded-sm py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-warm [&::-webkit-details-marker]:hidden">
        <h3 className="m-0 w-24 flex-none font-display text-heading-m text-foundation-900">{label}</h3>
        <span className="min-w-0 flex-1 font-sans text-body-sm text-foundation-700">{teaser}</span>
        <span aria-hidden="true" className="flex-none font-sans text-[22px] leading-none text-foundation-900 transition-transform group-open/row:rotate-45 motion-reduce:transition-none">+</span>
      </summary>
      <div className="pb-10 pt-6">{children}</div>
    </details>
  )
}

export function BuiltOnCarbon() {
  return (
    <LightboxProvider>
      <section className="border-t border-border pt-section pb-section">
        <div className="max-w-2xl">
          <SectionHeader index="04" eyebrow="Built on Carbon" title="What we changed in Carbon" />
          <p className="mt-4 mb-0 text-body font-sans text-foundation-700">
            Carbon gave us a tested base. We changed three things to make it Acentra’s: colour, type and corners.
          </p>
        </div>

        <div className="mt-10 border-t border-border">
          <FoldRow open label="Colour" teaser="One green, built for both themes.">
            <div className="-mt-12">
              <ColourStory />
            </div>
          </FoldRow>
          <FoldRow label="Type" teaser="IBM Plex became Roboto, in two sizes: Standard and Compact.">
            <Exports shots={TYPE_SHOTS} how={HOW_TYPE} />
          </FoldRow>
          <FoldRow label="Corners" teaser="2px on every component, and a radius scale for layouts.">
            <Exports shots={CORNER_SHOTS} how={HOW_CORNERS} />
          </FoldRow>
        </div>
      </section>
    </LightboxProvider>
  )
}

/* The typography modes, as a working sketch. Only the temporary /dev/layouts page uses it. */
const MODES = {
  standard: { label: 'Standard', body: 16, small: 16, head: 16, note: 'External healthcare apps' },
  compact: { label: 'Compact', body: 14, small: 14, head: 14, note: 'Internal tools' },
} as const
type Mode = keyof typeof MODES

export function ModeSketch() {
  const [mode, setMode] = useState<Mode>('standard')
  const m = MODES[mode]
  return (
    <div className="rounded-xl bg-stage-sage p-4 sm:p-6">
      <div role="radiogroup" aria-label="Typography mode" className="inline-flex rounded-full border border-foundation-900 p-1">
        {(Object.keys(MODES) as Mode[]).map((k) => (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={mode === k}
            onClick={() => setMode(k)}
            className={`min-h-[36px] rounded-full px-4 text-body-sm font-sans font-medium transition-colors ${mode === k ? 'bg-foundation-900 text-body' : 'text-foundation-800'}`}
          >
            {MODES[k].label}
          </button>
        ))}
      </div>
      <div className="bc-mode mt-4 rounded-lg border border-border bg-body p-5" style={{ ['--b' as string]: `${m.body}px`, ['--s' as string]: `${m.small}px`, ['--h' as string]: `${m.head}px` }}>
        <p className="bc-s m-0 font-sans uppercase tracking-widest text-foundation-600">Prior authorization</p>
        <p className="bc-h mt-2 mb-0 font-sans font-semibold text-foundation-900">Request #48213 is under review</p>
        <p className="bc-b mt-2 mb-0 font-sans text-foundation-700">We received the provider’s notes. A reviewer will reply within two working days.</p>
        <p className="bc-s mt-3 mb-0 font-sans text-foundation-600">Body {m.body}px · {m.note}</p>
      </div>
    </div>
  )
}
