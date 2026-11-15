'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SectionHeader } from './SectionHeader'
import { LightboxProvider, LightboxTrigger } from './Lightbox'
import { MarkedUpShot } from './MarkedUpShot'
import { TokenFlow } from './TokenFlow'
import { FlowNote, HOW, HowDisclosure, MARKUP, type How } from './ColourDetails'
import { Develop } from './Develop'

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
      <h4 className="mt-4 mb-0 text-heading-m font-display text-foundation-900">{BEATS[i].title}</h4>
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
  story: [],
  facts: [],
  groups: [
    { title: 'The problem', body: ['Carbon was built for data-heavy enterprise tools. In our healthcare products, the text was too small.'] },
    {
      title: 'The font',
      body: ['I suggested Roboto over IBM Plex. It’s very legible, which matters in healthcare, and it’s open source, so there’s no licensing fee. We chose it over the company font, Acumin Pro, for every product.'],
    },
    {
      title: 'The sizes',
      body: ['Healthcare products usually start body text at 16px. We build external products and internal tools, so we made two modes:'],
      list: [
        { term: 'Standard', text: '(external): starts at 16px' },
        { term: 'Compact', text: '(internal): 2px smaller on every token' },
      ],
    },
    {
      title: 'How teams use it',
      body: ['Modes live in Figma and in code. Teams switch the mode instead of resizing text, for a whole screen, one component or one area.'],
    },
  ],
}
const HOW_CORNERS: How = {
  story: [],
  facts: [],
  groups: [
    {
      title: 'The problem',
      body: ['Carbon uses square corners. Our healthcare research showed that slightly rounded corners feel friendlier, and that was the only real difference users noticed.'],
    },
    { title: 'Components', body: ['We changed every Carbon component from 0px to 2px. It’s a small change that keeps Carbon familiar.'] },
    {
      title: 'Layouts',
      body: ['Tiles, cards and containers can go further. Teams choose from a scale built on the 8px grid: 0, 2, 4, 8, 12, 16 and 24px.'],
    },
    { title: 'Why both', body: ['Components stay consistent everywhere, and layouts can look different from product to product.'] },
  ],
}

/* Type: one export (type-modes.webp, 1522×700) holds both screens. Each mode shows its own half
   through a window, so the two can sit side by side or stack on a phone without touching the file.
   `x` is where that screen starts in the export; each screen is 680px wide. */
// The windows start 544px down the full export (the text above them is left out) and run to its
// bottom edge, so each mode shows everything the export has of its screen, at a modest size.
const MODES_IMG = { full: `${TR}type-modes-full.webp`, w: 1522, h: 1894, top: 544, half: 680 }
/* The sizes are written on each screen by hand: a note in the white space beside the text it
   names, and a pen line to it. Coordinates are in the window's own pixels (680 × 1350). */
type Mark = { text: string; x: number; y: number; line: [number, number, number, number] }
const TYPE_MODES: { label: string; x: number; alt: string; marks: Mark[] }[] = [
  {
    label: 'Standard: external',
    x: 48,
    alt: 'A beneficiary screen in Standard mode: label, heading and body text are all 16px',
    marks: [
      { text: 'Label 16px', x: 500, y: 520, line: [492, 516, 246, 578] },
      { text: 'Heading 16px', x: 440, y: 722, line: [432, 714, 356, 726] },
      { text: 'Body 16px', x: 340, y: 822, line: [332, 812, 254, 812] },
    ],
  },
  {
    label: 'Compact: internal',
    x: 842,
    alt: 'The same beneficiary screen in Compact mode: label, heading and body text are all 14px',
    marks: [
      { text: 'Label 14px', x: 470, y: 518, line: [462, 514, 228, 574] },
      { text: 'Heading 14px', x: 404, y: 718, line: [396, 710, 328, 722] },
      { text: 'Body 14px', x: 316, y: 816, line: [308, 806, 236, 806] },
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
  const { half, h, top } = MODES_IMG
  return (
    <svg ref={ref} viewBox={`0 0 ${half} ${h - top}`} className="cs-markup pointer-events-none absolute inset-0 h-full w-full" data-on={on || undefined} aria-hidden="true">
      {marks.map((m, i) => {
        const [x1, y1, x2, y2] = m.line
        return (
          // the screenshot develops first; the pen marks wait for it
          <g key={m.text} className="cs-mark-note" style={{ animationDelay: `${delay + 900 + i * 200}ms` }}>
            <path d={`M ${x1} ${y1} Q ${(x1 + x2) / 2 + 8} ${(y1 + y2) / 2 - 10}, ${x2} ${y2}`} className="cs-arrow" style={{ stroke: PEN }} />
            <text x={m.x} y={m.y} style={{ fill: PEN }}>{m.text}</text>
          </g>
        )
      })}
    </svg>
  )
}

function TypeModes({ how }: { how: How }) {
  const { full, w, h, top, half } = MODES_IMG
  const shown = h - top
  return (
    <>
      <figure className="m-0">
        <div className="grid grid-cols-1 gap-8 rounded-xl bg-stage-sage p-4 sm:p-6 md:grid-cols-2">
          {TYPE_MODES.map((m, i) => (
            <div key={m.label} className="mx-auto w-full max-w-[380px]">
              <p className="cs-note m-0 mb-2">{m.label}</p>
              <div className="relative">
                <Develop delay={i * 180} className="rounded-lg">
                  <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: `${half} / ${shown}` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={full}
                      alt={m.alt}
                      width={w}
                      height={h}
                      loading="lazy"
                      className="absolute block h-auto max-w-none"
                      style={{ width: `${(w / half) * 100}%`, left: `${(-m.x / half) * 100}%`, top: `${(-top / shown) * 100}%` }}
                    />
                    <TypeMarks marks={m.marks} delay={i * 180} />
                  </div>
                </Develop>
                <LightboxTrigger always src={full} alt="The same beneficiary screen in Standard, left, and Compact, right: the text is 2px smaller in Compact" />
              </div>            </div>
          ))}
        </div>
        <figcaption className="mt-3 font-sans text-body-sm text-foundation-700">Same screen, both modes. Every token drops 2px in Compact.</figcaption>
      </figure>
      <HowDisclosure how={how} />
    </>
  )
}

/* Corners (picked Nov 15 2026: "D Numbers"): the two ideas as two numbers, each with Michael's
   export underneath, shown whole. The scale gets the wider column so its labels can be read. */
const CORNERS: { stat: string; line: string; src: string; w: number; h: number; alt: string }[] = [
  {
    stat: '2px',
    line: 'on every component',
    src: `${TR}radius-before-after.webp`,
    w: 851,
    h: 310,
    alt: 'A button corner at 16× zoom. Before: token radius-00, a square 0px corner. After: token radius-01, a 2px corner',
  },
  {
    stat: '0 to 24px',
    line: 'a scale for tiles, cards and containers',
    src: `${TR}radius-scale.webp`,
    w: 901,
    h: 288,
    alt: 'Seven tiles showing the radius tokens in order: 0, 2, 4, 8, 12, 16 and 24px',
  },
]

function Corners({ how }: { how: How }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_3fr]">
        {CORNERS.map((c, i) => (
          <div key={c.stat} className="flex flex-col">
            <p className="m-0 font-display text-[40px] leading-none text-accent-warm">{c.stat}</p>
            <p className="m-0 mt-2 mb-4 font-sans text-body-sm text-foundation-700">{c.line}</p>
            <div className="flex flex-1 flex-col justify-center rounded-xl bg-stage-sage p-4 sm:p-6">
              <div className="relative">
                <Develop delay={i * 180} className="rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.src} alt={c.alt} width={c.w} height={c.h} loading="lazy" className="block h-auto w-full rounded-lg" />
                </Develop>
                <LightboxTrigger always src={c.src} alt={c.alt} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <HowDisclosure how={how} />
    </>
  )
}

/* ---------- the fold-out rows ---------- */

function FoldRow({ n, label, teaser, open, children }: { n: string; label: string; teaser: string; open?: boolean; children: ReactNode }) {
  return (
    <details
      name="c04"
      open={open}
      className="group/row scroll-mt-32 border-b border-border"
      // opened some other way (find-in-page, a link): if that pulled the row above the screen, bring it back
      onToggle={(e) => {
        const el = e.currentTarget
        // React passes a "How I did it" toggle up to its row; that one must not move the page
        if (e.target !== el) return
        if (el.open && el.getBoundingClientRect().top < 120) el.scrollIntoView({ block: 'start', behavior: 'instant' })
      }}
    >
      <summary
        // Opening one row closes the others, and a row closing above this one would drag it up the
        // screen. So the row is toggled here by hand and the page is scrolled by exactly the amount
        // the row moved, in the same frame: the row you clicked stays under your pointer.
        // Opening a row also opens every "How I did it" inside it; each can still be closed.
        onClick={(e) => {
          e.preventDefault()
          const summary = e.currentTarget
          const row = summary.parentElement as HTMLDetailsElement
          const before = summary.getBoundingClientRect().top
          row.open = !row.open
          if (row.open) row.querySelectorAll('details').forEach((d) => (d.open = true))
          const moved = summary.getBoundingClientRect().top - before
          if (moved) window.scrollBy({ top: moved, behavior: 'instant' })
        }}
        className="flex min-h-[64px] cursor-pointer list-none items-center gap-x-4 rounded-sm py-3 sm:gap-x-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-warm [&::-webkit-details-marker]:hidden">
        <h3 className="m-0 flex w-28 flex-none items-baseline gap-3 sm:w-32 font-display text-heading-m text-foundation-900">
          {/* the numbers count the three changes; the steps inside a row are not numbered */}
          <span className="font-sans text-caption font-normal tabular-nums text-foundation-600">{n}</span>
          {label}
        </h3>
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
            Carbon was built for enterprise data tools. These three changes made it fit healthcare.
          </p>
        </div>

        <div className="mt-10 border-t border-border">
          <FoldRow open n="01" label="Colour" teaser="Carbon’s blue became our green, accessible in light and dark mode.">
            <div className="-mt-12">
              <ColourStory />
            </div>
          </FoldRow>
          <FoldRow n="02" label="Type" teaser="Clearer, larger text, with a compact mode for staff tools.">
            <TypeModes how={HOW_TYPE} />
          </FoldRow>
          <FoldRow n="03" label="Corners" teaser="Softer corners, because they feel friendlier.">
            <Corners how={HOW_CORNERS} />
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
