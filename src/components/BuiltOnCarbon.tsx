'use client'
import { useState } from 'react'
import { SectionHeader } from './SectionHeader'
import { Develop } from './Develop'
import { GROUPS, RADIUS_SCALE, TYPE_MODES, type Change } from '@/app/work/acentra-health/carbon-data'

/* 04 Built on Carbon (rewritten Nov 7 2026): what Carbon gave us, and what we changed, in two
   groups built differently on purpose. Colour is one still row of the exports, side by side;
   Type is a spec sheet, one column per mode; Shape is a slider through the radius scale.
   Each change can name the Carbon default it replaced, struck through the way the hero does. */

export function Shot({ src, alt, imgClass = 'max-h-[360px]' }: { src: string; alt: string; imgClass?: string }) {
  return (
    <div className="flex justify-center rounded-xl bg-stage-sage p-4 sm:p-6">
      <img src={src} alt={alt} loading="lazy" className={`block w-auto max-w-full rounded border border-border ${imgClass}`} />
    </div>
  )
}

// A slot still waiting for Michael's export; dashed, and says what goes in it.
export function Needed({ what, className = 'min-h-[240px]' }: { what: string; className?: string }) {
  return (
    <div className={`grid ${className} place-items-center rounded-xl border border-dashed border-foundation-500 p-6 text-center`}>
      <p className="m-0 text-body-sm font-sans text-foundation-700">
        <span className="block text-label font-semibold uppercase tracking-widest text-foundation-600">To come</span>
        {what}
      </p>
    </div>
  )
}

/* The typography modes, as a working sketch: one screen fragment, Standard or Compact, at the
   real token sizes (Heading-01, Body-01, Label-01). Only the dev layouts page uses it now. */
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
      <p className="mt-3 mb-0 text-caption font-sans text-foundation-700">A sketch of the idea, set in this site’s font; the real sizes live in the Figma library.</p>
    </div>
  )
}

export function Evidence({ c, imgClass }: { c: Change; imgClass?: string }) {
  if (c.img) return <Shot src={c.img.src} alt={c.img.alt} imgClass={imgClass} />
  if (c.needed) return <Needed what={c.needed} />
  return <ModeSketch />
}

const Was = ({ c, className = '' }: { c: Change; className?: string }) =>
  c.was ? <s className={`block text-body-sm font-sans text-foundation-600 decoration-1 ${className}`}>Carbon: {c.was}</s> : null

const GroupHead = ({ label, count }: { label: string; count: number }) => (
  <h3 className="m-0 flex items-baseline justify-between border-b border-foundation-900 pb-3 text-label font-sans font-semibold uppercase tracking-widest text-foundation-900">
    {label}
    <span className="font-normal text-foundation-600">{count} {count === 1 ? 'change' : 'changes'}</span>
  </h3>
)

/* Colour: the exports are the story, so they hang side by side as one still wall. Each print
   keeps its own shape and they share one height, so the row fills the column exactly: the two
   square exports and the wide token flow, no scrolling. On phones they stack. */
function ColourWall({ label, changes }: { label: string; changes: Change[] }) {
  return (
    <div className="mt-14">
      <GroupHead label={label} count={changes.length} />
      <ol aria-label="Colour changes" className="m-0 mt-8 flex list-none flex-col gap-10 p-0 md:flex-row md:gap-6">
        {changes.map((c) => (
          // flex-grow by shape (width ÷ height) gives every print the same height
          <li key={c.title} className="min-w-0 md:[flex:var(--r)_1_0%]" style={{ ['--r' as string]: c.img?.ratio ?? 1 }}>
            {c.img && (
              <Develop className="rounded-xl">
                <img src={c.img.src} alt={c.img.alt} loading="lazy" style={{ aspectRatio: c.img.ratio }} className="block w-full rounded-xl border border-border bg-white object-cover" />
              </Develop>
            )}
            <h4 className="mt-4 mb-0 text-heading-m font-display text-foundation-900">{c.title}</h4>
            <p className="mt-2 mb-0 text-body-sm font-sans text-foundation-700">{c.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

const [COLOUR, TYPE, SHAPE] = GROUPS
const [FONT, MODE_CHANGE] = TYPE.changes
const [CORNER] = SHAPE.changes
const SIZES = MODE_CHANGE.sizes ?? []
// the two halves are cut from one export, so they must share one scale: Compact's half is
// narrower (737 vs 785px) and stretching it to the same width would inflate its text
const HALF_W = TYPE_MODES.map((m) => m.img.ratio * 1366)
const SCALE_COLS = HALF_W.map((w) => `${w}fr`).join(' ')

const ChangeTitle = ({ c, className = '' }: { c: Change; className?: string }) => (
  <>
    <Was c={c} />
    <h4 className={`mt-1 mb-0 text-heading-xl font-display text-foundation-900 ${className}`}>{c.title}</h4>
    <p className="mt-3 mb-0 text-body font-sans text-foundation-700">{c.desc}</p>
  </>
)
const Export = ({ img, className = '', style }: { img: { src: string; alt: string; ratio: number }; className?: string; style?: React.CSSProperties }) => (
  <Develop className={`rounded-xl ${className}`} style={style}>
    <img src={img.src} alt={img.alt} loading="lazy" style={{ aspectRatio: img.ratio }} className="block w-full rounded-xl border border-border bg-white" />
  </Develop>
)
const FontLine = () => (
  <>
    <p className="m-0 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foundation-900">
      <s className="text-foundation-500 decoration-2">IBM Plex</s> became Acumin Pro.
    </p>
    <p className="mt-4 mb-0 max-w-[40rem] text-body font-sans text-foundation-700">{FONT.desc}</p>
    {FONT.needed && <Needed what={FONT.needed} className="mt-6 min-h-[120px] max-w-[40rem]" />}
  </>
)

/* Type: a spec sheet. The font swap is a sentence set large; then the two modes as two columns
   of one sheet: name, when to use it, its half of the screen, and its own sizes underneath, so
   each column reads top to bottom as one mode. */
function TypeSpec() {
  return (
    <>
      <FontLine />
      <div className="mt-16 max-w-[40rem]">
        <ChangeTitle c={MODE_CHANGE} />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-10 sm:gap-8 sm:[grid-template-columns:var(--cols)]" style={{ ['--cols' as string]: SCALE_COLS }}>
        {TYPE_MODES.map((m, i) => (
          <section key={m.key} aria-label={`${m.label} mode`}>
            <div className="flex items-baseline gap-3 border-b border-foundation-900 pb-3">
              <h5 className="m-0 text-heading-m font-display text-foundation-900">{m.label}</h5>
              <span className="text-label font-sans font-semibold uppercase tracking-widest text-foundation-600">{m.tag}</span>
            </div>
            <ul className="m-0 mt-4 list-none p-0 text-body-sm font-sans text-foundation-700">
              {m.when.map((w) => (
                <li key={w} className="py-1">{w}</li>
              ))}
            </ul>
            {/* stacked on phones, each half keeps its share of the export width so Compact stays smaller */}
            <Export img={m.img} className="mt-5 sm:!w-full" style={{ width: `${(HALF_W[i] / HALF_W[0]) * 100}%` }} />
            <dl className="m-0 mt-5 grid grid-cols-[1fr_auto] font-sans text-body-sm">
              {SIZES.map(([token, standard, compact]) => (
                <div key={token} className="contents">
                  <dt className="border-b border-border py-2 text-foundation-700">{token}</dt>
                  <dd className="m-0 border-b border-border py-2 text-right tabular-nums text-foundation-900">{i === 0 ? standard : compact}px</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </>
  )
}


/* Shape: a slider, not a sheet or a gallery. One sample tile and a slider through the seven
   radius tokens: drag it and the corner, the token name and the px value change together.
   Michael's zoomed before/after sits with the words as the proof. */
function ShapeSlider() {
  const [i, setI] = useState(1)
  const [token, px] = RADIUS_SCALE[i]
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-5">
        <ChangeTitle c={CORNER} />
        {CORNER.img && <Export img={CORNER.img} className="mt-8" />}
      </div>
      <div className="md:col-span-7">
        <div className="rounded-xl bg-stage-sage p-6 sm:p-10">
          <div className="mx-auto flex max-w-sm flex-col gap-4 border border-border bg-body p-6 transition-[border-radius] duration-200" style={{ borderRadius: px }}>
            <p className="m-0 text-body font-sans font-semibold text-foundation-900">Tile title</p>
            <p className="m-0 text-body-sm font-sans text-foundation-700">Supporting text for this tile.</p>
            <span className="self-start px-4 py-2 text-body-sm font-sans font-semibold text-white transition-[border-radius] duration-200" style={{ borderRadius: px, background: '#028202' }}>Button</span>
          </div>
          <p className="mt-8 mb-0 text-center font-sans">
            <span className="text-heading-m font-display tabular-nums text-foundation-900">{px}px</span>
            <span className="ml-3 text-body-sm text-foundation-700">{token}</span>
          </p>
          <label className="mt-4 block">
            <span className="sr-only">Border radius token</span>
            <input type="range" min={0} max={RADIUS_SCALE.length - 1} step={1} value={i} onChange={(e) => setI(Number(e.target.value))} aria-valuetext={`${token}, ${px}px`} className="w-full accent-[#028202]" />
          </label>
          <div className="mt-1 flex justify-between font-sans text-caption text-foundation-600">
            <span>radius-00</span>
            <span>radius-06</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function BuiltOnCarbon() {
  const [colour, type, shape] = [COLOUR, TYPE, SHAPE]
  return (
    <section className="border-t border-border pt-section pb-section">
      <div className="max-w-2xl">
        <SectionHeader index="04" eyebrow="Built on Carbon" title="Carbon, made Acentra’s" />
        <p className="mt-4 mb-0 text-body font-sans text-foundation-700">We kept Carbon’s structure and changed what makes it look and read like Acentra: the colour, the type and the corners.</p>
      </div>
      <ColourWall label={colour.label} changes={colour.changes} />
      <div className="mt-20">
        <GroupHead label={type.label} count={type.changes.length} />
        <div className="mt-10">
          <TypeSpec />
        </div>
      </div>
      <div className="mt-20">
        <GroupHead label={shape.label} count={shape.changes.length} />
        <div className="mt-8">
          <ShapeSlider />
        </div>
      </div>
    </section>
  )
}
