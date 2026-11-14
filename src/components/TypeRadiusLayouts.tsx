'use client'
/* TRIAL (Nov 14 2026): five layouts for Type and Radius in the Acentra section 04, reviewed at
   /dev/type-radius?v=a|b|c|d|e. Each topic has its own space; every block is wide and short.
   Facts from Michael: IBM Plex was swapped for Roboto; Standard and Compact type modes were
   added (external / internal products; every token is 2px smaller in Compact, per his table);
   every component has a 2px corner; layout surfaces (tiles, containers) get radius tokens from
   2px to 16px plus round, on steps that follow Carbon's 8px grid.
   Once one is picked: move it into BuiltOnCarbon.tsx, delete the rest and the review page. */
import { useState, type ReactNode } from 'react'
import { IBM_Plex_Sans, Roboto } from 'next/font/google'
import { HowDisclosure, type How } from './ColourDetails'
import { PenRing } from './PenRing'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' })
const plex = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '600'], display: 'swap' })

/* ---------- content ---------- */

const TYPE = {
  title: 'Roboto, in two sizes',
  line: 'IBM Plex became Roboto. Standard is for external products, Compact for dense internal tools.',
}
const RADIUS = {
  title: 'Softer corners',
  line: 'Every component has a 2px corner. Tiles and containers choose from 2px up to round.',
}
// DRAFT method copy, written from Michael's answers; he should check it.
const HOW_TYPE: How = {
  story: [
    'Carbon ships with IBM Plex. We replaced it with Roboto across the system.',
    'Healthcare products come in two kinds, so I added two type modes. Standard is for external products, where there is room and slightly larger text reads better. Compact is for internal tools, where staff need more on one screen. Every type token is 2px smaller in Compact, so a team switches mode, not individual sizes.',
  ],
  facts: [],
}
const HOW_RADIUS: How = {
  story: [
    'Carbon’s corners are square. I gave every Acentra component a 2px corner, enough to feel friendlier without changing how Carbon looks.',
    'Layout surfaces such as tiles and containers get their own radius tokens, from 2px to 16px, plus round. The steps follow Carbon’s 8px grid, so they stay consistent with the rest of the system.',
  ],
  facts: [],
}

type Mode = 'standard' | 'compact'
const MODES: Record<Mode, { label: string; who: string; body: number; body2: number }> = {
  standard: { label: 'Standard', who: 'External products', body: 16, body2: 18 },
  compact: { label: 'Compact', who: 'Internal tools', body: 14, body2: 16 },
}
const TOKENS = [
  { name: 'Body-01', standard: 16, compact: 14 },
  { name: 'Body-02', standard: 18, compact: 16 },
  { name: 'Label-01', standard: 16, compact: 14 },
  { name: 'Heading-01', standard: 16, compact: 14, bold: true },
]
const LAYOUT_RADII = [2, 4, 8, 12, 16, 'round'] as const
type R = (typeof LAYOUT_RADII)[number] | 0
const px = (r: R) => (r === 'round' ? 9999 : r)
const rLabel = (r: R) => (r === 'round' ? 'round' : `${r}px`)

/* ---------- shared pieces ---------- */

const GREEN = '#028202' // Acentra green as a fill; never printed as text
const ROWS = [
  ['Date of birth', '02/04/1951'],
  ['Beneficiary ID', '1218600432'],
  ['Subscriber ID', '3780921'],
  ['Location', 'Hornell, NY'],
  ['Country', 'United States'],
  ['Contract', 'West Virginia'],
]

/** the beneficiary screen from the type export, redrawn in HTML so both modes are real text */
function Record({ mode, h = 280 }: { mode: Mode; h?: number }) {
  const m = MODES[mode]
  return (
    <div
      role="img"
      aria-label={`A beneficiary record in ${m.label} mode: body text at ${m.body}px`}
      className="relative overflow-hidden rounded-lg border border-[#e0e0e0] bg-white"
      style={{ height: h }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-white to-transparent" />
      <div aria-hidden="true" className={`${roboto.className} text-[#161616] transition-[font-size] duration-200 motion-reduce:transition-none`} style={{ fontSize: m.body, lineHeight: 1.4 }}>
        <div className="flex items-center gap-3 px-4 pt-4">
          <span className="grid flex-none place-items-center rounded-full bg-[#f4f4f4] font-bold" style={{ width: '3em', height: '3em' }}>VV</span>
          <div className="min-w-0">
            <p className="m-0 font-bold" style={{ fontSize: m.body2 }}>Valerie Vicari</p>
            <p className="m-0 mt-1 flex gap-1.5">
              {['Female', '74 years'].map((t) => (
                <span key={t} className="rounded-full bg-[#e0e0e0] px-2">{t}</span>
              ))}
            </p>
          </div>
        </div>
        <div className="mx-4 mt-3 px-4 text-white" style={{ background: GREEN, borderRadius: 2, paddingBlock: '0.6em' }}>Create case</div>
        <p className="m-0 mx-4 mt-4 border-b border-[#e0e0e0] font-bold" style={{ paddingBottom: '0.6em' }}>Identify &amp; coverage</p>
        <div className="mx-4">
          {ROWS.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-[#e0e0e0]" style={{ paddingBlock: '0.6em' }}>
              <span>{k}</span>
              <span className="text-right">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FontSwap({ big = 44 }: { big?: number }) {
  return (
    <div>
      <p className={`${plex.className} m-0 text-[18px] leading-none text-foundation-600 line-through decoration-1`}>IBM Plex Sans</p>
      <p className={`${roboto.className} m-0 mt-2 font-medium leading-none text-foundation-900`} style={{ fontSize: big }}>Roboto</p>
    </div>
  )
}

function Seg<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { v: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-full border border-foundation-900 p-1">
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          role="radio"
          aria-checked={value === o.v}
          onClick={() => onChange(o.v)}
          className={`min-h-[36px] rounded-full px-3.5 font-sans text-body-sm font-medium tabular-nums transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-warm motion-reduce:transition-none ${value === o.v ? 'bg-foundation-900 text-body' : 'text-foundation-800 hover:bg-foundation-900/10'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

const Stage = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-xl bg-stage-sage p-4 text-foundation-900 sm:p-6 ${className}`}>{children}</div>
)
const Words = ({ t, how }: { t: { title: string; line: string }; how: How }) => (
  <div>
    <h3 className="m-0 text-heading-m font-display text-foundation-900">{t.title}</h3>
    <p className="mt-2 mb-0 max-w-[30rem] text-body-sm font-sans text-foundation-700">{t.line}</p>
    <HowDisclosure how={how} />
  </div>
)
/** words on one side, stage on the other: the block is as tall as its stage */
const Row = ({ t, how, flip, children }: { t: { title: string; line: string }; how: How; flip?: boolean; children: ReactNode }) => (
  <div className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
    <div className={`md:col-span-4 ${flip ? 'md:order-2' : ''}`}><Words t={t} how={how} /></div>
    <div className="md:col-span-8">{children}</div>
  </div>
)
/** a small layout tile with the given corner */
const Tile = ({ r, w = 72, h = 52, dim }: { r: R; w?: number; h?: number; dim?: boolean }) => (
  <span className={`block border bg-white ${dim ? 'border-dashed border-[#a8a8a8]' : 'border-[#c6c6c6]'}`} style={{ width: w, height: h, borderRadius: px(r) }} />
)
/** a corner at 16x zoom, as in the radius export */
const Corner = ({ r }: { r: number }) => (
  <span className="relative block h-[84px] w-[116px] overflow-hidden rounded-md border border-[#e0e0e0] bg-white">
    <span className="absolute left-6 top-6 block h-40 w-60" style={{ background: GREEN, borderTopLeftRadius: r * 16 }} />
  </span>
)
const Cap = ({ children }: { children: ReactNode }) => <span className="mt-2 block font-sans text-caption tabular-nums text-foundation-700">{children}</span>
const Kicker = ({ children }: { children: ReactNode }) => <p className="m-0 font-sans text-body-sm font-medium text-foundation-900">{children}</p>

/* ---------- A  Try it: a switch for each ---------- */

function TypeA() {
  const [mode, setMode] = useState<Mode>('standard')
  const m = MODES[mode]
  return (
    <Row t={TYPE} how={HOW_TYPE}>
      <Stage className="grid items-center gap-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <FontSwap />
          <div className="mt-6">
            <Seg label="Type mode" value={mode} onChange={setMode} options={[{ v: 'standard', label: 'Standard' }, { v: 'compact', label: 'Compact' }]} />
          </div>
          <p className="mt-3 mb-0 font-sans text-body-sm tabular-nums text-foundation-800" aria-live="polite">{m.who} · body {m.body}px</p>
        </div>
        <Record mode={mode} h={264} />
      </Stage>
    </Row>
  )
}
function RadiusA() {
  const [r, setR] = useState<R>(8)
  return (
    <Row t={RADIUS} how={HOW_RADIUS} flip>
      <Stage>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Kicker>Layout corner</Kicker>
          <Seg label="Layout corner" value={String(r)} onChange={(v) => setR(v === 'round' ? 'round' : (Number(v) as R))} options={LAYOUT_RADII.map((x) => ({ v: String(x), label: x === 'round' ? 'round' : String(x) }))} />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className={`${roboto.className} w-full max-w-[340px] border border-[#c6c6c6] bg-white px-8 py-6 text-[#161616] transition-[border-radius] duration-300 motion-reduce:transition-none`} style={{ borderRadius: Math.min(px(r), 80) }}>
            <p className="m-0 text-[16px] font-bold">Open cases</p>
            <p className="m-0 mt-1 text-[14px] text-[#525252]">Three need a review today.</p>
            <span className="mt-4 inline-block px-4 py-2 text-[14px] text-white" style={{ background: GREEN, borderRadius: 2 }}>Create case</span>
          </div>
          <p className="cs-note m-0 max-w-[12rem]">the tile changes; the button stays 2px</p>
        </div>
      </Stage>
    </Row>
  )
}

/* ---------- B  Side by side: nothing to press ---------- */

function TypeB() {
  return (
    <Row t={TYPE} how={HOW_TYPE}>
      <Stage>
        <div className="grid gap-4 sm:grid-cols-2">
          {(['standard', 'compact'] as Mode[]).map((k) => (
            <div key={k}>
              <p className="m-0 mb-2 font-sans text-body-sm tabular-nums text-foundation-800"><span className="font-medium text-foundation-900">{MODES[k].label}</span> · {MODES[k].who.toLowerCase()} · {MODES[k].body}px</p>
              <Record mode={k} h={216} />
            </div>
          ))}
        </div>
        <p className="mt-4 mb-0 flex flex-wrap items-baseline gap-x-3 text-foundation-900">
          <span className={`${plex.className} text-[16px] text-foundation-600 line-through decoration-1`}>IBM Plex Sans</span>
          <span aria-hidden="true">→</span>
          <span className={`${roboto.className} text-[22px] font-medium`}>Roboto</span>
        </p>
      </Stage>
    </Row>
  )
}
function RadiusB() {
  return (
    <Row t={RADIUS} how={HOW_RADIUS} flip>
      <Stage className="grid gap-8 sm:grid-cols-[auto_minmax(0,1fr)]">
        <div>
          <Kicker>Components</Kicker>
          <div className="mt-3 flex items-center gap-3">
            <div><Corner r={0} /><Cap>Carbon, 0px</Cap></div>
            <span aria-hidden="true" className="-mt-6 text-foundation-800">→</span>
            <div><Corner r={2} /><Cap>Acentra, 2px</Cap></div>
          </div>
        </div>
        <div className="min-w-0">
          <Kicker>Layouts: tiles and containers</Kicker>
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-x-3 gap-y-4 p-0 lg:flex-nowrap">
            {LAYOUT_RADII.map((r) => (
              <li key={r}><Tile r={r} w={46} h={84} /><Cap>{rLabel(r)}</Cap></li>
            ))}
          </ul>
        </div>
      </Stage>
    </Row>
  )
}

/* ---------- C  Rulers: one wide strip each, marked by hand ---------- */

const StripHead = ({ t, how }: { t: { title: string; line: string }; how: How }) => (
  <div className="mb-5 grid items-end gap-x-10 gap-y-2 md:grid-cols-12">
    <h3 className="m-0 text-heading-m font-display text-foundation-900 md:col-span-4">{t.title}</h3>
    <div className="md:col-span-8">
      <p className="m-0 max-w-[36rem] text-body-sm font-sans text-foundation-700">{t.line}</p>
    </div>
    <div className="md:col-span-8 md:col-start-5 -mt-2"><HowDisclosure how={how} /></div>
  </div>
)
function TypeC() {
  return (
    <div>
      <StripHead t={TYPE} how={HOW_TYPE} />
      <Stage className="grid items-center gap-8 lg:grid-cols-[auto_minmax(0,1fr)]">
        <FontSwap big={40} />
        <div className="min-w-0 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr>
                <th className="w-28 pb-2 font-sans text-caption font-normal text-foundation-700"><span className="sr-only">Mode</span></th>
                {TOKENS.map((t) => (
                  <th key={t.name} scope="col" className="pb-2 font-sans text-caption font-normal text-foundation-700">{t.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(['standard', 'compact'] as Mode[]).map((k) => (
                <tr key={k} className="border-t border-foundation-900/20">
                  <th scope="row" className="py-3 pr-4 align-baseline font-sans text-body-sm font-medium text-foundation-900">{MODES[k].label}</th>
                  {TOKENS.map((t) => (
                    <td key={t.name} className="whitespace-nowrap py-3 pr-4 align-baseline">
                      <span className={`${roboto.className} text-[#161616] ${t.bold ? 'font-bold' : ''}`} style={{ fontSize: t[k], lineHeight: 1.3 }}>Create case</span>
                      <span className="ml-2 font-sans text-caption tabular-nums text-foundation-700">{t[k]}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="cs-note m-0 mt-1 pl-28">2px smaller, on every token</p>
        </div>
      </Stage>
    </div>
  )
}
function RadiusC() {
  return (
    <div>
      <StripHead t={RADIUS} how={HOW_RADIUS} />
      <Stage>
        <div className="overflow-x-auto">
          <div className="flex min-w-[640px] items-start gap-4 pb-1 pt-2 pl-3">
            <div className="opacity-70"><Tile r={0} w={80} h={60} dim /><Cap>0px, Carbon</Cap></div>
            <div className="relative">
              <Tile r={2} w={80} h={60} />
              <PenRing className="pointer-events-none absolute -left-3 -top-3 h-[84px] w-[104px]" />
              <Cap>2px</Cap>
              <p className="cs-note m-0 mt-1 whitespace-nowrap">every component</p>
            </div>
            <div className="ml-4">
              <ul className="m-0 flex list-none gap-4 p-0">
                {LAYOUT_RADII.slice(1).map((r) => (
                  <li key={r}><Tile r={r} w={80} h={60} /><Cap>{rLabel(r)}</Cap></li>
                ))}
              </ul>
              <div aria-hidden="true" className="mt-2 h-2 rounded-b-md border-x border-b border-foundation-700" />
              <p className="cs-note m-0 mt-1 text-center">layouts: tiles and containers</p>
            </div>
          </div>
        </div>
      </Stage>
    </div>
  )
}

/* ---------- D  Ledger: Carbon → Acentra, the two tables side by side ---------- */

function Ledger({ t, how, rows }: { t: { title: string; line: string }; how: How; rows: { k: string; from: ReactNode; to: ReactNode }[] }) {
  return (
    <div>
      <h3 className="m-0 text-heading-m font-display text-foundation-900">{t.title}</h3>
      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-foundation-900">
            <th className="w-[26%] pb-2"><span className="sr-only">What</span></th>
            <th scope="col" className="w-[30%] pb-2 font-sans text-caption font-normal text-foundation-700">Carbon</th>
            <th scope="col" className="pb-2 font-sans text-caption font-medium text-foundation-900">Acentra</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.k} className="border-b border-border">
              <th scope="row" className="py-4 pr-3 align-middle font-sans text-body-sm font-normal text-foundation-700">{r.k}</th>
              <td className="py-4 pr-3 align-middle text-foundation-600">{r.from}</td>
              <td className="py-4 align-middle text-foundation-900">{r.to}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <HowDisclosure how={how} />
    </div>
  )
}
const mini = 'font-sans text-body-sm tabular-nums'
function TypeD() {
  return (
      <Ledger
        t={TYPE}
        how={HOW_TYPE}
        rows={[
          { k: 'Typeface', from: <span className={`${plex.className} text-[20px]`}>IBM Plex Sans</span>, to: <span className={`${roboto.className} text-[24px] font-medium`}>Roboto</span> },
          {
            k: 'Type modes',
            from: <span className={mini}>None</span>,
            to: (
              <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span><span className={`${roboto.className} text-[16px] text-foundation-900`}>Standard</span> <span className={`${mini} text-foundation-700`}>16px</span></span>
                <span><span className={`${roboto.className} text-[14px] text-foundation-900`}>Compact</span> <span className={`${mini} text-foundation-700`}>14px</span></span>
              </span>
            ),
          },
        ]}
      />
  )
}
function RadiusD() {
  return (
      <Ledger
        t={RADIUS}
        how={HOW_RADIUS}
        rows={[
          { k: 'Components', from: <span className="flex items-center gap-3"><Tile r={0} w={44} h={30} /><span className={mini}>0px</span></span>, to: <span className="flex items-center gap-3"><Tile r={2} w={44} h={30} /><span className={mini}>2px</span></span> },
          {
            k: 'Layouts',
            from: <span className="flex items-center gap-3"><Tile r={0} w={44} h={30} /><span className={mini}>0px</span></span>,
            to: (
              <span className="flex flex-wrap items-center gap-x-2 gap-y-2">
                {LAYOUT_RADII.map((r) => <Tile key={r} r={r} w={30} h={30} />)}
                <span className={`${mini} basis-full`}>2 to 16px, round</span>
              </span>
            ),
          },
        ]}
      />
  )
}

/* ---------- E  Your exports, marked by hand (the colour beats' language) ---------- */

function TypeE() {
  const W = 1522, TOP = 544, H = 700 // the two browser screens in the 1522px export
  return (
    <Row t={TYPE} how={HOW_TYPE}>
      <Stage>
        <div className="mb-2 grid grid-cols-2 gap-4">
          <p className="cs-note m-0">Standard: external</p>
          <p className="cs-note m-0 pl-[4%]">Compact: internal</p>
        </div>
        <div className="relative overflow-hidden rounded-lg bg-white" style={{ aspectRatio: `${W} / ${H}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/acentra-hero/Typograohy%20comparisons.png" alt="The same beneficiary screen in Standard, left, and Compact, right: the text is 2px smaller in Compact" loading="lazy" className="absolute left-0 block w-full max-w-none" style={{ top: `${(-TOP / H) * 100}%` }} />
        </div>
      </Stage>
    </Row>
  )
}
function RadiusE() {
  return (
    <Row t={RADIUS} how={HOW_RADIUS} flip>
      <Stage>
        <div className="relative overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/acentra-hero/Border%20Radius%20System.png" alt="Seven tiles showing the radius tokens, from a square 0px corner to 24px" width={901} height={288} loading="lazy" className="block h-auto w-full" />
          <PenRing className="pointer-events-none absolute left-[16.5%] top-[15%] h-[62%] w-[15.5%]" />
        </div>
        <div className="mt-2 flex flex-wrap gap-x-10">
          <p className="cs-note m-0 pl-[10%]">2px, every component</p>
          <p className="cs-note m-0">the larger steps are for layouts</p>
        </div>
      </Stage>
    </Row>
  )
}

/* ---------- the five ---------- */

export type TRVariant = 'a' | 'b' | 'c' | 'd' | 'e'

const PARTS = { a: [TypeA, RadiusA], b: [TypeB, RadiusB], c: [TypeC, RadiusC], d: [TypeD, RadiusD], e: [TypeE, RadiusE] } as const

/** one topic of one variant, for the tab and fold-out wrappers */
export function TRPart({ v, part }: { v: TRVariant; part: 'type' | 'radius' }) {
  const C = PARTS[v][part === 'type' ? 0 : 1]
  return <C />
}

export function TypeRadius({ v }: { v: TRVariant }) {
  const [T, Rd] = PARTS[v]
  return (
    <div className={v === 'd' ? 'grid gap-12 md:grid-cols-2 md:gap-10' : 'grid gap-14 [&>*]:min-w-0'}>
      <T />
      <Rd />
    </div>
  )
}
