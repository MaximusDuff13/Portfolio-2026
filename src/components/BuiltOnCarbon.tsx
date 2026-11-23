'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SectionHeader } from './SectionHeader'
import { LightboxProvider, LightboxTrigger } from './Lightbox'
import { MarkedUpShot } from './MarkedUpShot'
import { TokenFlow } from './TokenFlow'
import { FlowNote, MARKUP } from './ColourDetails'
import { DesignNote, DesignNotesProvider, DesignNotesSwitch, type NoteKey } from './DesignNotes'
import { Develop } from './Develop'
import { CarbonTabs, type Part } from './CarbonTabs'
import { CornerGrow } from './CornerScales'

/* 03 Built on Carbon (Nov 14 2026): what we changed in Carbon, as three picture tabs so the
   section never grows (CarbonTabs): Colour (open at first), Type, Corners.
   Colour is the story in Michael's three beats: one green for both of Carbon's themes, the scale
   grown from it with the USWDS magic numbers, and the tokens. Type and Corners show his own
   exports. Every caption is one line; the Design notes switch shows how each was done. Marketing's starting green
   and every hex value are deliberately left out: the page is public. */

type Beat = { k: NoteKey; title: string; line: string }
const BEATS: Beat[] = [
  { k: 'green', title: 'One green, both themes', line: 'Passes for text on White, and for buttons, icons and large text on Gray 100.' },
  { k: 'scale', title: 'A scale from magic numbers', line: 'Ten steps. The gap between two grades sets their contrast.' },
  { k: 'tokens', title: 'Set up as tokens', line: 'Teams pick a role, not a shade.' },
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
      <h4 className="mt-4 mb-0 text-heading-m font-display text-foundation-900">{BEATS[i].title}</h4>
      <p className="mt-1 mb-0 max-w-[36rem] text-body-sm font-sans text-foundation-700">{BEATS[i].line}</p>
    </>
  )
}

/** one export on its sage stage, marked up by hand; tap it to see it full size */
function Shot({ i }: { i: number }) {
  const img = IMAGES[i]
  return (
    <div className="flex-1 rounded-xl bg-stage-sage p-4 sm:p-6">
      <div className="relative mx-auto max-w-[420px]">
        <MarkedUpShot src={img.src} alt={img.alt} w={800} h={800} rings={MARKUP[i].rings} notes={MARKUP[i].notes} delay={i * 180} />
        <LightboxTrigger src={img.full} alt={img.alt} />
      </div>
      <DesignNote k={BEATS[i].k} />
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
          <li key={img.src} className="flex flex-col">
            <Shot i={i} />
            <Caption i={i} />
          </li>
        ))}
      </ol>

      {/* 03: the token flow, redrawn in HTML so it is sharp and readable everywhere */}
      <div className="mt-12">
        <div className="relative rounded-xl bg-stage-sage p-5 sm:p-8">
          <TokenFlow mark={(k) => <FlowNote k={k} />} />
          <DesignNote k="tokens" />
        </div>
        <Caption i={2} />
      </div>
    </>
  )
}

/* ---------- Type and Corners: Michael's exports, two to a row ---------- */

const TR = '/images/acentra-type-radius/'

/* Type (Nov 23 2026): Michael's two full exports, Type-Standard.png and Type-Compact.png
   (public/images/acentra-hero), cropped to the profile panel and the first form fields. The crop
   leaves out the header ("[Name]"), the browser bar and the dummy SSN field (never shown).
   They replace the old half-cut export and its pen marks. */
/* The sizes are written on each screen by hand, in the white space beside the text they name,
   with a pen line to it. Coordinates are in the crop's own pixels (1442 × 1372). */
type Mark = { text: string; x: number; y: number; line: [number, number, number, number] }
const CROP = { w: 1442, h: 1372 }
const TYPE_MODES: { label: string; size: string; src: string; alt: string; marks: Mark[] }[] = [
  {
    label: 'Standard',
    size: '16px · for customers',
    src: `${TR}type-standard-crop.webp`,
    alt: 'A beneficiary profile in Standard mode: text at 16px, so “United States of America” wraps onto two lines',
    marks: [
      { text: 'Heading 16px', x: 440, y: 396, line: [430, 378, 356, 378] },
      { text: 'Label 16px', x: 1100, y: 642, line: [1090, 624, 1020, 624] },
      { text: 'Body 16px', x: 440, y: 1066, line: [450, 1080, 380, 1106] },
    ],
  },
  {
    label: 'Compact',
    size: '14px · for internal staff',
    src: `${TR}type-compact-crop.webp`,
    alt: 'The same profile in Compact mode: text at 14px, so more fits and “United States of America” stays on one line',
    marks: [
      { text: 'Heading 14px', x: 410, y: 384, line: [400, 366, 328, 366] },
      { text: 'Label 14px', x: 1084, y: 628, line: [1074, 610, 1004, 610] },
      { text: 'Body 14px', x: 420, y: 950, line: [430, 964, 350, 990] },
    ],
  },
]
const PEN = '#b15900' // the darker ginger of the pen rings; the screens are white in both themes

function TypeMarks({ marks, delay }: { marks: Mark[]; delay: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <svg ref={ref} viewBox={`0 0 ${CROP.w} ${CROP.h}`} className="cs-markup pointer-events-none absolute inset-0 h-full w-full" data-on={on || undefined} aria-hidden="true">
      {marks.map((m, i) => {
        const [x1, y1, x2, y2] = m.line
        return (
          // the screenshot develops first; the pen marks wait for it
          <g key={m.text} className="cs-mark-note" style={{ animationDelay: `${delay + 900 + i * 200}ms` }}>
            <path d={`M ${x1} ${y1} Q ${(x1 + x2) / 2 + 6} ${(y1 + y2) / 2 - 12}, ${x2} ${y2}`} className="cs-arrow" style={{ stroke: PEN, strokeWidth: 5 }} />
            <text x={m.x} y={m.y} style={{ fill: PEN, fontSize: 56 }}>{m.text}</text>
          </g>
        )
      })}
    </svg>
  )
}

function TypeModes() {
  return (
    <figure className="m-0">
      <div className="grid grid-cols-1 gap-6 rounded-xl bg-stage-sage p-4 sm:p-6 md:grid-cols-2">
        {TYPE_MODES.map((m, i) => (
          <div key={m.label}>
            <p className="m-0 mb-2 font-sans text-body-sm text-foundation-800">
              <span className="font-medium text-foundation-900">{m.label}</span> {m.size}
            </p>
            <div className="relative">
              <Develop delay={i * 180} className="rounded-lg">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.src} alt={m.alt} width={CROP.w} height={CROP.h} loading="lazy" className="block h-auto w-full rounded-lg border border-[#e0e0e0]" />
                  <TypeMarks marks={m.marks} delay={i * 180} />
                </div>
              </Develop>
              <LightboxTrigger always src={m.src} alt={m.alt} />
            </div>
          </div>
        ))}
        <DesignNote k="type" className="md:col-span-2 -mt-6" />
      </div>
      <figcaption className="mt-3 font-sans text-body-sm text-foundation-700">Same screen, both modes. Every text token drops 2px in Compact.</figcaption>
    </figure>
  )
}

/* Corners (picked Nov 15 2026: "D Numbers"): the two ideas as two numbers, each over its picture.
   Redrawn in code Nov 23 2026 (the audit: Michael's exports were too small to read, and 0px vs 2px
   was invisible). Scale and values are his: components 2px; layouts 0, 2, 4, 8, 12, 16, 24px. */
const ZOOM = 16
const CORNER_GREEN = '#028202' // Acentra green as the edge; never printed as text
const CORNER_TINT = '#e6f4e6' // a pale green fill, so the two zooms don't outweigh the screen beside them

/* one corner at 16x zoom, as in Michael's export: a component's top-left corner, drawn as a pale
   fill with a green edge so the curve reads at a glance. Fills its share of the column's height
   (audit Nov 23 2026: the column had empty sage above and below). */
function ZoomCorner({ r, label, after }: { r: number; label: string; after?: boolean }) {
  return (
    <div className="flex min-h-0 flex-col">
      <p className="m-0 mb-2 font-sans text-body-sm text-foundation-800">
        {label} <span className={`font-medium tabular-nums ${after ? 'text-accent-warm' : 'text-foundation-900'}`}>{r}px</span>
      </p>
      <div className="relative h-[130px] overflow-hidden rounded-lg border border-[#e0e0e0] bg-white sm:h-[160px] md:h-auto md:min-h-[120px] md:flex-1">
        <span
          className="absolute left-8 top-8 block h-[600px] w-[800px]"
          style={{ background: CORNER_TINT, borderTop: `4px solid ${CORNER_GREEN}`, borderLeft: `4px solid ${CORNER_GREEN}`, borderTopLeftRadius: r * ZOOM }}
        />
        <span className="absolute bottom-2 right-3 font-sans text-caption text-[#0e6027]">16× zoom</span>
      </div>
    </div>
  )
}

function Corners() {
  return (
    <>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-8">
        <div className="flex flex-col">
          <p className="m-0 font-display text-[40px] leading-none text-accent-warm">2px</p>
          <p className="m-0 mt-2 mb-4 font-sans text-body-sm text-foundation-700">border radius on every component</p>
          <div className="flex flex-1 flex-col rounded-xl bg-stage-sage p-4 sm:p-6">
            <Develop className="flex flex-1 flex-col rounded-lg">
              <div role="img" aria-label="A button corner at 16 times zoom. Carbon: a square 0px corner. Acentra: a 2px corner" className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-1 md:grid-rows-2">
                <ZoomCorner r={0} label="Carbon" />
                <ZoomCorner r={2} label="Acentra" after />
              </div>
            </Develop>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="m-0 font-display text-[40px] leading-none text-accent-warm">0 to 16px</p>
          <p className="m-0 mt-2 mb-4 font-sans text-body-sm text-foundation-700">border radius for tiles, tables and containers; tags stay round</p>
          <div className="flex flex-1 flex-col justify-center rounded-xl bg-stage-sage p-4 sm:p-6">
            <Develop delay={180} className="rounded-lg">
              <CornerGrow />
            </Develop>
          </div>
        </div>
      </div>
      <DesignNote k="corners" card="bg-stage-sage" />
    </>
  )
}

const PARTS: Part[] = [
  { key: 'colour', n: '01', label: 'Colour', teaser: 'Carbon’s blue became our green, accessible in light and dark themes.', body: <div className="-mt-12"><ColourStory /></div> },
  { key: 'type', n: '02', label: 'Type', teaser: 'Clearer, larger text, with a compact mode for staff tools.', body: <TypeModes /> },
  { key: 'corners', n: '03', label: 'Border radius', teaser: 'Softer corners, after studying our competitors: friendlier and more flexible.', body: <Corners /> },
]

export function BuiltOnCarbon() {
  return (
    <LightboxProvider>
      <DesignNotesProvider>
      <section className="border-t border-border pt-section">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div className="max-w-2xl">
            <SectionHeader index="03" eyebrow="Built on Carbon" title="What we changed in Carbon" />
            <p className="mt-4 mb-0 text-body font-sans text-foundation-700">
              Carbon was built for enterprise data tools. These three changes made it fit healthcare.
            </p>
          </div>
          <DesignNotesSwitch />
        </div>

        <CarbonTabs parts={PARTS} />
      </section>
      </DesignNotesProvider>
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
