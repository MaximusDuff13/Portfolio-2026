'use client'
/* 03 Corners, the layout scale (Nov 23 2026). Michael picked "Grows on scroll" and asked for it to
   play on a screen built properly from Carbon layouts. The scale stops at 16px: 24px is for pills
   and other round parts, not for layouts.
   The screen is laid out at a true 1056px (Carbon's lg breakpoint) and scaled to fit, like a
   screenshot. Carbon g10 theme with Acentra green as the interactive colour, Roboto (his pick
   over IBM Plex), UI shell header 48px + side-nav rail 48px, 16-column grid with 32px margins and
   16px gutters, spacing tokens (8/16/24/32), productive type (heading-04 28/36, heading-03 20/28,
   body-compact-01 14/18, label-01 12/16), tiles with 16px padding, data table with 48px rows,
   tags 24px tall and round, buttons 48px / 40px with a 2px corner.
   Only the layout containers (tiles, the table, the side tile) move: 0 → 2 → 4 → 8 → 12 → 16px.
   Reduced motion shows the 16px end state. Everything on it is made up; no hex is printed. */
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Roboto } from 'next/font/google'
import { Bell, Folder, Home, Plus, RotateCcw, Search, Settings, User, Users } from 'lucide-react'

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'], display: 'swap' })

const STEPS = [0, 2, 4, 8, 12, 16]
const STEP_MS = 520
const FRAME_W = 1056

/* Carbon g10 tokens, with Acentra green as interactive */
const C = {
  background: '#f4f4f4',
  layer: '#ffffff',
  layerAccent: '#e0e0e0',
  borderSubtle: '#e0e0e0',
  text: '#161616',
  textSecondary: '#525252',
  shell: '#161616',
  shellBorder: '#393939',
  interactive: '#028202', // Acentra green, never printed as text
}
const TAG = {
  green: { background: '#a7f0ba', color: '#0e6027' },
  gray: { background: '#e0e0e0', color: '#161616' },
  red: { background: '#ffd7d9', color: '#a2191f' },
  blue: { background: '#d0e2ff', color: '#002d9c' },
} as const
type TagKind = keyof typeof TAG

const KPIS = [
  { label: 'Open cases', value: '248', helper: '+12 this week' },
  { label: 'Due today', value: '17', helper: '5 overdue' },
  { label: 'Approved', value: '1,320', helper: 'Last 30 days' },
  { label: 'Average review', value: '2.4 days', helper: 'Target: 3 days' },
]
const ROWS: { id: string; member: string; type: string; tag: [string, TagKind] }[] = [
  { id: 'PA-4821', member: 'Member 10294', type: 'Prior authorization', tag: ['In review', 'blue'] },
  { id: 'AP-1177', member: 'Member 20871', type: 'Appeal', tag: ['Approved', 'green'] },
  { id: 'CR-3390', member: 'Member 31556', type: 'Claim review', tag: ['Needs info', 'red'] },
  { id: 'PA-4809', member: 'Member 10433', type: 'Prior authorization', tag: ['Draft', 'gray'] },
]

/* productive type sets */
const T = {
  heading04: { fontSize: 28, lineHeight: '36px', fontWeight: 400 },
  heading03: { fontSize: 20, lineHeight: '28px', fontWeight: 400 },
  headingCompact01: { fontSize: 14, lineHeight: '18px', fontWeight: 500, letterSpacing: 0.16 },
  bodyCompact01: { fontSize: 14, lineHeight: '18px', fontWeight: 400, letterSpacing: 0.16 },
  label01: { fontSize: 12, lineHeight: '16px', fontWeight: 400, letterSpacing: 0.32 },
  kpi: { fontSize: 32, lineHeight: '40px', fontWeight: 300 },
} satisfies Record<string, CSSProperties>

function Tag({ text, kind }: { text: string; kind: TagKind }) {
  return (
    <span className="inline-flex h-6 items-center px-2" style={{ ...T.label01, ...TAG[kind], borderRadius: 9999 }}>
      {text}
    </span>
  )
}

/* the Carbon screen at its true size; `r` is the layout corner */
function Screen({ r }: { r: number }) {
  const corner: CSSProperties = { borderRadius: r, transition: 'border-radius 320ms cubic-bezier(0.2, 0, 0.38, 0.9)' }
  return (
    <div className={roboto.className} style={{ width: FRAME_W, background: C.background, color: C.text }}>
      {/* UI shell header */}
      <div className="flex h-12 items-center" style={{ background: C.shell, borderBottom: `1px solid ${C.shellBorder}` }}>
        <span className="flex h-12 w-12 items-center justify-center" style={{ borderRight: `1px solid ${C.shellBorder}` }}>
          <span className="block h-[2px] w-4 bg-white shadow-[0_5px_0_#fff,0_-5px_0_#fff]" />
        </span>
        <span className="px-4 text-white" style={T.bodyCompact01}>
          Design system <span style={{ fontWeight: 600 }}>Guidance</span>
        </span>
        <span className="ml-auto flex">
          {[Search, Bell, User].map((I, n) => (
            <span key={n} className="flex h-12 w-12 items-center justify-center text-white"><I size={20} strokeWidth={1.75} /></span>
          ))}
        </span>
      </div>

      <div className="flex">
        {/* side-nav rail */}
        <div className="flex w-12 flex-none flex-col" style={{ background: C.layer, borderRight: `1px solid ${C.borderSubtle}`, minHeight: 600 }}>
          {[Home, Folder, Users, Settings].map((I, n) => (
            <span
              key={n}
              className="flex h-12 w-12 items-center justify-center"
              style={n === 1 ? { background: C.layerAccent, boxShadow: `inset 3px 0 0 ${C.interactive}` } : { color: C.textSecondary }}
            >
              <I size={16} strokeWidth={2} />
            </span>
          ))}
        </div>

        {/* content on the 16-column grid: 32px margins, 16px gutters */}
        <div className="min-w-0 flex-1 px-8 pb-8 pt-6">
          <p className="m-0" style={T.bodyCompact01}>
            <span style={{ color: C.interactive }}>Home</span>
            <span className="px-2" style={{ color: C.textSecondary }}>/</span>
            <span>Cases</span>
          </p>
          <div className="mt-2 flex items-end justify-between">
            <p className="m-0" style={T.heading04}>Cases overview</p>
            {/* primary button, lg: 48px, text left, icon right, 2px corner */}
            <span className="flex h-12 w-[176px] items-center justify-between pl-4 pr-4 text-white" style={{ ...T.bodyCompact01, background: C.interactive, borderRadius: 2 }}>
              New case <Plus size={16} strokeWidth={2} />
            </span>
          </div>

          {/* KPI tiles: 4 columns of the 16 each */}
          <div className="mt-6 grid grid-cols-4 gap-4">
            {KPIS.map((k) => (
              <div key={k.label} className="p-4" style={{ background: C.layer, ...corner }}>
                <p className="m-0" style={{ ...T.label01, color: C.textSecondary }}>{k.label}</p>
                <p className="m-0 mt-2" style={T.kpi}>{k.value}</p>
                <p className="m-0 mt-1" style={{ ...T.label01, color: C.textSecondary }}>{k.helper}</p>
              </div>
            ))}
          </div>

          {/* data table (10 columns) + side tile (6 columns) */}
          <div className="mt-4 grid grid-cols-[10fr_6fr] gap-4">
            <div className="overflow-hidden" style={{ background: C.layer, ...corner }}>
              <div className="px-4 pb-6 pt-4">
                <p className="m-0" style={T.heading03}>Recent requests</p>
                <p className="m-0 mt-0.5" style={{ ...T.bodyCompact01, color: C.textSecondary }}>Updated in the last 7 days</p>
              </div>
              <table className="w-full border-collapse" style={T.bodyCompact01}>
                <thead>
                  <tr className="h-12 text-left" style={{ background: C.layerAccent }}>
                    {['Request', 'Member', 'Type', 'Status'].map((h) => (
                      <th key={h} className="px-4" style={T.headingCompact01}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.id} className="h-12" style={{ borderBottom: `1px solid ${C.borderSubtle}` }}>
                      <td className="px-4">{row.id}</td>
                      <td className="px-4" style={{ color: C.textSecondary }}>{row.member}</td>
                      <td className="px-4" style={{ color: C.textSecondary }}>{row.type}</td>
                      <td className="px-4"><Tag text={row.tag[0]} kind={row.tag[1]} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col p-4" style={{ background: C.layer, ...corner }}>
              <p className="m-0" style={T.heading03}>Waiting on you</p>
              <p className="m-0 mt-2" style={{ ...T.bodyCompact01, color: C.textSecondary }}>
                5 requests have waited more than 2 days for a decision.
              </p>
              <div className="mt-6">
                <div className="flex justify-between" style={T.label01}>
                  <span style={{ color: C.textSecondary }}>Reviewed today</span>
                  <span>12 of 20</span>
                </div>
                {/* Carbon progress bar: 8px track, square */}
                <div className="mt-2 h-2" style={{ background: C.layerAccent }}>
                  <div className="h-2 w-[60%]" style={{ background: C.interactive }} />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag text="Prior authorization" kind="gray" />
                <Tag text="Appeals" kind="gray" />
              </div>
              {/* tertiary button, md: 40px, 2px corner */}
              <span
                className="mt-auto flex h-10 w-[160px] items-center justify-between px-4"
                style={{ ...T.bodyCompact01, color: C.interactive, border: `1px solid ${C.interactive}`, borderRadius: 2 }}
              >
                Open queue
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CornerGrow() {
  const ref = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const [i, setI] = useState(0)
  const [done, setDone] = useState(false)
  const [fit, setFit] = useState({ scale: 0, h: 0 })

  /* scale the 1056px screen to the stage, like a screenshot */
  useEffect(() => {
    const el = ref.current
    const box = inner.current
    if (!el || !box) return
    const ro = new ResizeObserver(() => {
      const scale = el.clientWidth / FRAME_W
      setFit({ scale, h: box.offsetHeight * scale })
    })
    ro.observe(el)
    ro.observe(box)
    return () => ro.disconnect()
  }, [])

  const play = () => {
    if (timer.current) clearInterval(timer.current)
    setDone(false)
    setI(0)
    timer.current = setInterval(() => {
      setI((n) => {
        if (n >= STEPS.length - 1) {
          clearInterval(timer.current)
          setDone(true)
          return n
        }
        return n + 1
      })
    }, STEP_MS)
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setI(STEPS.length - 1)
      setDone(true)
      return
    }
    let wait: ReturnType<typeof setTimeout> | undefined
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      // let the stage develop before the corners start to move
      wait = setTimeout(play, 800)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => {
      io.disconnect()
      if (wait) clearTimeout(wait)
      if (timer.current) clearInterval(timer.current)
    }
  }, [])

  const r = STEPS[i]

  return (
    <div>
      <div
        ref={ref}
        role="img"
        aria-label="A Carbon case-management screen. Its tiles, table and side panel round from 0px to 16px corners; buttons keep a 2px corner and tags stay round"
        className="relative overflow-hidden rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-12px_rgba(0,0,0,0.25)]"
        style={{ height: fit.h || undefined, aspectRatio: fit.h ? undefined : '1056 / 660' }}
      >
        <div ref={inner} aria-hidden="true" className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${fit.scale})`, visibility: fit.scale ? 'visible' : 'hidden' }}>
          <Screen r={r} />
        </div>
      </div>

      {/* the readout under the screen */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-sans text-body-sm">
        <p className="m-0 tabular-nums text-foundation-800">
          Tiles, tables and containers <span className={`font-medium ${done ? 'text-accent-warm' : 'text-foundation-900'}`}>{r}px</span>
          <span className="text-foundation-600"> · buttons 2px · tags round</span>
        </p>
        <button
          type="button"
          onClick={play}
          tabIndex={done ? 0 : -1}
          className={`inline-flex min-h-[32px] cursor-pointer items-center gap-1.5 rounded-full border border-solid border-foundation-300 bg-transparent px-3 font-sans text-caption text-foundation-800 transition-opacity hover:border-foundation-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-warm motion-reduce:hidden ${done ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <RotateCcw size={12} strokeWidth={2} aria-hidden="true" />
          Replay
        </button>
      </div>
    </div>
  )
}
