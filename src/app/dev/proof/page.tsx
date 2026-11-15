'use client'
/* TRIAL, round two (Nov 15 2026): six more layouts for "The proof", the merge of 07 Small wins
   and 09 Results. Round one (A to F) was six arrangements of figures and was turned down, so
   each of these is built round one object instead: a demo, a log, a screenshot, a report card,
   a correction, a calendar. Same facts in each. The live page is untouched.
   Delete this route once one is picked. */
import { useState, type CSSProperties, type ReactNode } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import '../../work/case-study.css'

const TITLE = 'Tested by a rebrand, adopted by five teams'
const STORY =
  'Marketing changed the colour scheme, and the product team expected months of rework. We changed the values in one token config, and the whole primary palette updated in two weeks, in Figma and in Angular.'

const GREEN = '#028202' // Acentra's Green 60: content, as in the 04 token flow
const PEN = '#b15900' // the pen on light grounds
const PEN_LIGHT = '#e39849' // the pen on dark grounds
const hand = (size: number, color = PEN): CSSProperties => ({ font: `400 ${size}px/1 var(--font-hand), cursive`, color })

const Label = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <p className={`m-0 text-label font-sans uppercase tracking-widest text-foundation-600 ${className}`}>{children}</p>
)

const WideHeader = ({ line = STORY }: { line?: string }) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
    <SectionHeader index="06" eyebrow="The proof" title={TITLE} />
    <p className="m-0 max-w-md text-body-sm font-sans text-foundation-700 md:pb-1">{line}</p>
  </div>
)

/* the adoption half, as one line of larger type; the numbers carry the weight */
const B = ({ children }: { children: ReactNode }) => <span className="whitespace-nowrap font-medium text-accent-warm">{children}</span>
const AdoptionLine = ({ className = '', dark = false }: { className?: string; dark?: boolean }) => (
  <p className={`m-0 font-display text-[20px] leading-snug sm:text-[22px] ${dark ? 'text-foundation-200' : 'text-foundation-900'} ${className}`}>
    Then <B>5</B> project teams used it <B>19K+</B> times in 30 days, and one shipped a supporting tool in <B>1 month</B>.
  </p>
)

/* ── G: Run it. The rebrand as something you can press: one control, forty components. ── */
function Glyph({ i, on }: { i: number; on: boolean }) {
  const c = on ? GREEN : 'oklch(var(--c-f300))'
  const t = 'block transition-colors duration-300 motion-reduce:transition-none'
  const d = { transitionDelay: `${i * 28}ms` }
  const kind = i % 4
  return (
    <span className="grid h-9 place-items-center">
      {kind === 0 && <span className={`${t} h-4 w-10 rounded-[2px]`} style={{ ...d, background: c }} />}
      {kind === 1 && <span className={`${t} h-4 w-10 rounded-[2px] border-2 bg-white`} style={{ ...d, borderColor: c }} />}
      {kind === 2 && <span className={`${t} h-4 w-4 rounded-full border-2`} style={{ ...d, borderColor: c }} />}
      {kind === 3 && <span className={`${t} h-4 w-10 border-0 border-b-2 border-solid`} style={{ ...d, borderColor: c }} />}
    </span>
  )
}
function RunIt() {
  const [on, setOn] = useState(false)
  return (
    <div>
      <WideHeader />
      <div className="mt-10 grid grid-cols-1 items-center gap-8 rounded-xl bg-stage-sage p-5 sm:p-8 md:grid-cols-[auto_1fr]">
        <div>
          <Label>One token config</Label>
          <button
            type="button"
            aria-pressed={on}
            onClick={() => setOn(!on)}
            className="mt-3 inline-flex min-h-[44px] cursor-pointer items-center gap-3 rounded-md border border-solid border-foundation-900 bg-body px-4 font-sans text-body-sm font-medium text-foundation-900 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-warm"
          >
            <span aria-hidden="true" className="block h-4 w-4 rounded-[3px] transition-colors duration-300" style={{ background: on ? GREEN : 'oklch(var(--c-f300))' }} />
            {on ? 'Undo' : 'Change the palette'}
          </button>
          <p className="mt-3 mb-0" style={hand(26)} aria-live="polite">{on ? '40+ components, 2 weeks' : 'press it'}</p>
        </div>
        <div>
          <div aria-hidden="true" className="grid grid-cols-8 md:grid-cols-10">
            {Array.from({ length: 40 }, (_, i) => <Glyph key={i} i={i} on={on} />)}
          </div>
          <p className="mt-3 mb-0 font-sans text-body-sm text-foundation-700">
            Every component reads the palette from that one place. The estimate without tokens was <s className="decoration-1">6 months</s>.
          </p>
        </div>
      </div>
      <AdoptionLine className="mt-6 max-w-3xl" />
    </div>
  )
}

/* ── H: The log. The rebrand as the developer saw it: one file, three ticks. ── */
function Log() {
  const Tick = () => <span aria-hidden="true" style={{ color: PEN_LIGHT }}>✓</span>
  return (
    <div>
      <div className="max-w-2xl"><SectionHeader index="06" eyebrow="The proof" title={TITLE} /></div>
      <div className="mt-8 grid grid-cols-1 items-center gap-8 md:grid-cols-[7fr_5fr]">
        <div className="rounded-xl bg-foundation-900 p-5 font-mono text-[13px] leading-8 text-foundation-200 sm:p-7 sm:text-[14px]">
          <p className="m-0 flex justify-between gap-4 text-foundation-400"><span>tokens.config · primary palette</span><span>1 file changed</span></p>
          <p className="m-0 mt-2 border-0 border-t border-solid border-foundation-700 pt-2"><Tick /> 40+ components updated</p>
          <p className="m-0"><Tick /> Figma library and Angular build, together</p>
          <p className="m-0"><Tick /> shipped in <span className="text-body">2 weeks</span> <s className="ml-2 text-foundation-400 decoration-1">legacy: 6 months</s></p>
        </div>
        <div>
          <p className="m-0 mb-4 -rotate-2" style={hand(30)}>← one file. that was the rebrand.</p>
          <p className="m-0 font-sans text-body-sm text-foundation-700">Marketing changed the colour scheme, and the product team expected months of rework.</p>
          <AdoptionLine className="mt-4" />
        </div>
      </div>
    </div>
  )
}

/* ── I: The evidence. Figma's own analytics strip, marked up by hand like the 01 audit shots:
   the page opens on evidence of the problem and closes on evidence of the result. ── */
function Evidence() {
  const note = { fontSize: 28 }
  return (
    <div>
      <WideHeader />
      <div className="mt-10 overflow-x-auto rounded-xl bg-[#2c2c2c]">
        <svg viewBox="0 0 760 250" className="cs-markup block h-auto w-full min-w-[640px]" data-on role="img" aria-label="Figma library analytics: used by 10 teams, 119 components, 30 styles, 307 variables, 1.2k inserts this week. Marked by hand: 5 teams in the first quarter, built by two people, 19K+ inserts in the first 30 days">
          <image href="/images/acentra-hero/Metrics.png" x="0" y="95" width="1089" height="81" />
          <ellipse cx="62" cy="145" rx="52" ry="20" pathLength={1} className="cs-ring" transform="rotate(-3 62 145)" />
          <ellipse cx="195" cy="145" rx="80" ry="20" pathLength={1} className="cs-ring" transform="rotate(-2 195 145)" style={{ animationDelay: '260ms' }} />
          <ellipse cx="573" cy="145" rx="62" ry="20" pathLength={1} className="cs-ring" transform="rotate(-3 573 145)" style={{ animationDelay: '520ms' }} />
          <g className="cs-mark-note" style={{ animationDelay: '800ms' }}>
            <path d="M 96 66 Q 78 84, 68 118" className="cs-arrow" />
            <text x="26" y="52" style={note}>5 in the first quarter</text>
          </g>
          <g className="cs-mark-note" style={{ animationDelay: '1000ms' }}>
            <path d="M 236 206 Q 214 196, 204 172" className="cs-arrow" />
            <text x="246" y="222" style={note}>built by two people</text>
          </g>
          <g className="cs-mark-note" style={{ animationDelay: '1200ms' }}>
            <path d="M 548 66 Q 572 84, 580 120" className="cs-arrow" />
            <text x="430" y="52" style={note}>19K+ in the first 30 days</text>
          </g>
        </svg>
      </div>
      <p className="mt-3 mb-0 font-sans text-body-sm text-foundation-700">The library’s analytics in Figma. The rebrand reached all of it in 2 weeks, where the legacy estimate was 6 months.</p>
    </div>
  )
}

/* ── J: The report card. What was expected, printed and struck; what happened, written in. ── */
const CARD = [
  { what: 'Products on the system', asked: '2–3', got: '5 project teams' },
  { what: 'Design-to-dev handoff', asked: '30% faster', got: '50% faster' },
  { what: 'A new brand palette', asked: '6 months', got: '2 weeks' },
]
function ReportCard() {
  return (
    <div>
      <WideHeader line="Leadership set two targets. Then Marketing changed the colour scheme, and the system was tested for real." />
      <div className="mt-8 border-0 border-t border-solid border-foundation-900">
        <div className="hidden grid-cols-[1.3fr_1fr_1.3fr] gap-6 py-3 md:grid">
          <span />
          <Label>Expected</Label>
          <Label>What happened</Label>
        </div>
        {CARD.map((r) => (
          <div key={r.what} className="grid grid-cols-2 items-baseline gap-x-6 gap-y-1 border-0 border-t border-solid border-border py-4 md:grid-cols-[1.3fr_1fr_1.3fr]">
            <p className="col-span-2 m-0 font-sans text-body-sm text-foundation-900 md:col-span-1">{r.what}</p>
            <p className="m-0 font-display text-[26px] leading-none text-foundation-500"><s className="decoration-1">{r.asked}</s></p>
            <p className="m-0 flex items-baseline gap-2" style={hand(38)}>
              {r.got}
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 flex-none self-center" fill="none" stroke={PEN} strokeWidth="2.4" strokeLinecap="round"><path d="M3 13 C 6 15, 8 18, 9 21 C 12 13, 16 7, 22 3" /></svg>
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 mb-0 font-sans text-body-sm text-foundation-700">The handoff figure is the developers’ estimate. In its first 30 days the library was used 19K+ times.</p>
    </div>
  )
}

/* ── K: The correction. The page's one dark band: the old estimate in print, struck out,
   and the real one written over it. ── */
function Correction() {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 bg-foundation-900 px-6 py-16 sm:px-10 lg:px-section">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-[5fr_7fr]">
        <div>
          <p className="m-0 text-label font-sans uppercase tracking-widest text-foundation-400">06 — The proof</p>
          <div className="mt-3 mb-4 h-px w-8 bg-accent-warm" />
          <h2 className="m-0 text-heading-xl font-display text-body">{TITLE}</h2>
          <p className="mt-4 mb-0 font-sans text-body-sm text-foundation-300">{STORY}</p>
        </div>
        <div>
          <p className="relative m-0 inline-block font-display font-medium leading-none text-foundation-600" style={{ fontSize: 'clamp(56px, 10vw, 140px)' }}>
            6 months
            <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" fill="none" stroke={PEN_LIGHT} strokeWidth="5" strokeLinecap="round">
              <path d="M -2 58 C 20 46, 38 66, 58 52 S 88 60, 103 46" vectorEffect="non-scaling-stroke" />
            </svg>
          </p>
          <p className="m-0 -mt-2 ml-[18%] -rotate-3 sm:-mt-4" style={{ ...hand(0, PEN_LIGHT), fontSize: 'clamp(56px, 9vw, 128px)' }}>2 weeks</p>
          <p className="mt-6 mb-0 font-sans text-body-sm text-foundation-300">40+ components, updated through tokens.</p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-0 border-t border-solid border-foundation-700 pt-6">
        <AdoptionLine dark />
      </div>
    </div>
  )
}

/* ── L: The calendar. Six months drawn as 26 weeks; two are used, the rest are struck. ── */
function Calendar() {
  return (
    <div>
      <WideHeader />
      <div className="mt-10 rounded-xl bg-stage-sage p-5 sm:p-8">
        <div className="flex items-end justify-between gap-6">
          <p className="m-0 font-display text-[40px] font-medium leading-none text-accent-warm">2 weeks</p>
          <p className="m-0 text-right" style={hand(26)}>24 weeks we never needed</p>
        </div>
        <div className="relative mt-4">
          <div aria-hidden="true" className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1.5 md:grid-cols-[repeat(26,minmax(0,1fr))]">
            {Array.from({ length: 26 }, (_, i) => (
              <span key={i} className={`block aspect-square rounded-[3px] ${i < 2 ? 'bg-accent-warm' : 'border border-solid border-foundation-400'}`} />
            ))}
          </div>
          {/* the strike runs over weeks 3 to 26; on a phone the weeks wrap to two rows, so it is left off */}
          <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-y-0 right-0 hidden h-full w-[92%] overflow-visible md:block" fill="none" stroke={PEN} strokeWidth="3" strokeLinecap="round">
            <path d="M 0 56 C 14 40, 30 66, 48 50 S 82 62, 100 44" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <p className="mt-3 mb-0 font-sans text-body-sm text-foundation-700">One square is one week. The legacy estimate for the same palette change was 6 months; 40+ components updated through tokens.</p>
      </div>
      <AdoptionLine className="mt-6 max-w-3xl" />
    </div>
  )
}

const OPTIONS: { id: string; name: string; note: string; el: ReactNode }[] = [
  { id: 'G', name: 'Run it', note: 'The rebrand as a demo: press one control and forty components change.', el: <RunIt /> },
  { id: 'H', name: 'The log', note: 'The rebrand as the developer saw it: one file changed, three ticks.', el: <Log /> },
  { id: 'I', name: 'The evidence', note: 'Figma’s analytics strip, marked up by hand like the audit shots in 01.', el: <Evidence /> },
  { id: 'J', name: 'The report card', note: 'What was expected, struck out; what happened, written in.', el: <ReportCard /> },
  { id: 'K', name: 'The correction', note: 'A dark band: the old estimate struck, the real one written over it.', el: <Correction /> },
  { id: 'L', name: 'The calendar', note: 'Six months drawn as 26 weeks; two used, the rest struck.', el: <Calendar /> },
]

export default function ProofLayouts() {
  return (
    <main className="min-h-screen overflow-x-clip bg-body px-6 pb-section sm:px-10 lg:px-section">
      {OPTIONS.map((o) => (
        <section key={o.id} id={o.id} className="mx-auto max-w-6xl pt-section">
          <p className="mb-10 border-b border-foundation-900 pb-3 font-sans text-body-sm text-foundation-900">
            <strong className="font-semibold">Option {o.id}: {o.name}.</strong> <span className="text-foundation-600">{o.note}</span>
          </p>
          <div data-opt>{o.el}</div>
        </section>
      ))}
    </main>
  )
}
