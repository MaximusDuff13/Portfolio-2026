'use client'
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

/* LAB — the three nav directions. Every bar is live: click a tab to see its active state move.
   All art is the real kit: the logo is public/home/loop/icon-96, the dog is the header kit's
   own sprites (public/header-kit/web). Figures change pose by hard cuts only (visibility, never
   opacity), as everywhere else on the site. */

const TABS = [
  { id: 'work', label: 'Work', count: 2 },
  { id: 'side', label: 'Side projects', count: 3 },
  { id: 'accolades', label: 'Accolades', count: 4 },
  { id: 'about', label: 'About' },
] as const
type TabId = (typeof TABS)[number]['id']

function Logo({ className = '' }: { className?: string }) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet="/home/loop/icon-96.avif" />
      <img src="/home/loop/icon-96.webp" alt="" width={44} height={44} />
    </picture>
  )
}

/** The tab buttons; each direction styles them and adds its own active marker */
function TabRow({
  active,
  onPick,
  prefix,
  tabRef,
  children,
}: {
  active: TabId
  onPick: (id: TabId) => void
  prefix: string
  tabRef?: (id: TabId, el: HTMLButtonElement | null) => void
  children?: ReactNode
}) {
  return (
    <div className={`${prefix}-tabs`}>
      {TABS.map((t) => (
        <button
          key={t.id}
          ref={(el) => tabRef?.(t.id, el)}
          type="button"
          aria-pressed={t.id === active}
          className={`${prefix}-tab`}
          onClick={() => onPick(t.id)}
        >
          <span className={`${prefix}-label`}>{t.label}</span>
          {'count' in t && <span className={`${prefix}-count`}>{t.count}</span>}
          {prefix === 'pm' && t.id === active && <Brush />}
        </button>
      ))}
      {children}
    </div>
  )
}

/* ── 1 · The dog leads ─────────────────────────────────────────────────────── */

// sprite sizes are the 2x files; everything is drawn at one scale so the poses match the painting
const POSES = {
  sit: { f: 'dog-sit-114', w: 114, h: 259 },
  turn: { f: 'dog-turn-132', w: 132, h: 259 },
  run1: { f: 'dog-run-1-198', w: 198, h: 92 },
  run2: { f: 'dog-run-2-185', w: 185, h: 96 },
  brake: { f: 'dog-brake-180', w: 180, h: 101 },
} as const
type Pose = keyof typeof POSES
const SIT_H = 40
const K = SIT_H / 259

function Dog({ x, pose, facing, ms }: { x: number; pose: Pose; facing: 'left' | 'right'; ms: number }) {
  return (
    <span
      className="dg-dog"
      aria-hidden="true"
      style={{ transform: `translateX(${x}px)`, transitionDuration: `${ms}ms` }}
    >
      {(Object.keys(POSES) as Pose[]).map((p) => {
        const s = POSES[p]
        // the run poses face left in the kit; mirror them when running right
        const flip = facing === 'right' && p !== 'sit' && p !== 'turn'
        return (
          <img
            key={p}
            src={`/header-kit/web/${s.f}.webp`}
            alt=""
            width={Math.round(s.w * K)}
            height={Math.round(s.h * K)}
            style={{ visibility: p === pose ? 'visible' : 'hidden', transform: flip ? 'scaleX(-1)' : undefined }}
          />
        )
      })}
    </span>
  )
}

function useDog(active: TabId) {
  const reduced = useReducedMotionSafe()
  const tabs = useRef(new Map<TabId, HTMLButtonElement>())
  const [x, setX] = useState(0)
  const [pose, setPose] = useState<Pose>('sit')
  const [facing, setFacing] = useState<'left' | 'right'>('left')
  const [ms, setMs] = useState(0)
  const xRef = useRef(0)
  const timers = useRef<number[]>([])

  // the dog sits in the gap just right of the active tab, feet on the bar's bottom line
  const target = useCallback((id: TabId) => {
    const el = tabs.current.get(id)
    return el ? el.offsetLeft + el.offsetWidth + 6 : 0
  }, [])

  const place = useCallback(() => {
    const to = target(active)
    xRef.current = to
    setMs(0)
    setX(to)
  }, [active, target])

  // first placement, after fonts, and on resize: no run
  useLayoutEffect(() => {
    document.fonts?.ready.then(place)
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
    // only on mount; tab changes run below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    timers.current.forEach(clearTimeout)
    timers.current = []
    const from = xRef.current
    const to = target(active)
    xRef.current = to
    if (reduced || from === to) {
      setMs(0)
      setX(to)
      setPose('sit')
      return
    }
    const d = Math.min(800, Math.max(320, Math.abs(to - from) * 1.3))
    setFacing(to < from ? 'left' : 'right')
    setMs(d)
    setX(to)
    // gallop: hard cuts between the two run poses, then brake, then sit
    let frame = 0
    setPose('run1')
    const step = 90
    for (let t = step; t < d - 120; t += step) {
      timers.current.push(window.setTimeout(() => setPose(++frame % 2 ? 'run2' : 'run1'), t))
    }
    timers.current.push(window.setTimeout(() => setPose('brake'), d - 120))
    timers.current.push(window.setTimeout(() => setPose('sit'), d + 60))
  }, [active, reduced, target])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const tabRef = (id: TabId, el: HTMLButtonElement | null) => {
    if (el) tabs.current.set(id, el)
  }
  return { x, pose, facing, ms, tabRef }
}

function DogBar() {
  const [active, setActive] = useState<TabId>('work')
  const dog = useDog(active)
  return (
    <div className="bar dg-bar">
      <Logo className="logo dg-logo" />
      <TabRow active={active} onPick={setActive} prefix="dg" tabRef={dog.tabRef}>
        <Dog x={dog.x} pose={dog.pose} facing={dog.facing} ms={dog.ms} />
      </TabRow>
    </div>
  )
}

function DogHeader() {
  const [hover, setHover] = useState(false)
  return (
    <div className="bar dg-bar dg-head">
      <a
        href="#"
        className="dg-home"
        aria-label="Michael Jerome, home"
        onClick={(e) => e.preventDefault()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        <Logo className="logo dg-logo" />
        {/* he sits beside the logo; point at it and he turns to look */}
        <Dog x={0} pose={hover ? 'turn' : 'sit'} facing="left" ms={0} />
      </a>
    </div>
  )
}

/* ── 2 · Window ledge ──────────────────────────────────────────────────────── */

function LedgeBar({ tabs = true }: { tabs?: boolean }) {
  const [active, setActive] = useState<TabId>('work')
  return (
    <div className="bar lg-bar">
      <span className="lg-sill" aria-hidden="true" />
      <Logo className="logo lg-logo" />
      {tabs && <TabRow active={active} onPick={setActive} prefix="lg" />}
    </div>
  )
}

/* ── 3 · Watercolour postmark ──────────────────────────────────────────────── */

// a hand-painted stroke under the active label: one rough shape, roughened again by a filter
function Brush() {
  return (
    <svg className="pm-brush" viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden="true">
      <path d="M1 8.5 C 14 5.2, 38 4.4, 62 5.1 S 92 5.6, 99 4.2 L 98.4 9.6 C 86 10.8, 66 9.4, 44 10.4 S 12 12.6, 2.4 12.2 Z" filter="url(#pm-rough)" />
    </svg>
  )
}

// torn paper: a jagged bottom edge, fixed so it never shimmers between renders
const DECKLE = (() => {
  let d = 'M0 0 H1440 V4'
  let seed = 7
  for (let x = 1440; x >= 0; x -= 9) {
    seed = (seed * 9301 + 49297) % 233280
    d += ` L${x} ${(4 + (seed / 233280) * 5).toFixed(1)}`
  }
  return d + ' Z'
})()

function Stamp() {
  return (
    <span className="pm-stamp-wrap" aria-hidden="true">
      <span className="pm-stamp">
        <Logo className="pm-stamp-art" />
      </span>
      {/* the cancellation: a ring and three waves across the stamp's corner */}
      <svg className="pm-cancel" viewBox="0 0 64 34">
        <circle cx="16" cy="17" r="12.5" />
        <path d="M30 9 q6 -4 12 0 t12 0 t12 0" />
        <path d="M30 17 q6 -4 12 0 t12 0 t12 0" />
        <path d="M30 25 q6 -4 12 0 t12 0 t12 0" />
      </svg>
    </span>
  )
}

function PostmarkBar({ tabs = true }: { tabs?: boolean }) {
  const [active, setActive] = useState<TabId>('work')
  return (
    <div className="bar pm-bar">
      <a href="#" className="pm-home" aria-label="Michael Jerome, home" onClick={(e) => e.preventDefault()}>
        <Stamp />
      </a>
      {tabs && <TabRow active={active} onPick={setActive} prefix="pm" />}
      <svg className="pm-deckle" viewBox="0 0 1440 10" preserveAspectRatio="none" aria-hidden="true">
        <path d={DECKLE} />
      </svg>
    </div>
  )
}

/* ── The page ──────────────────────────────────────────────────────────────── */

function Frame({ label, children, kind }: { label: string; children: ReactNode; kind: 'home' | 'case' }) {
  return (
    <figure className="frame">
      <figcaption>{label}</figcaption>
      <div className="frame-view">
        {children}
        {kind === 'home' ? (
          <div className="ctx-home" aria-hidden="true">
            <span />
            <span />
          </div>
        ) : (
          <div className="ctx-case" aria-hidden="true">
            <p className="ctx-eyebrow">Data conversion · AI-assisted MVP</p>
            <p className="ctx-title">
              Reimagining data conversion at <em>Acentra Health</em>
            </p>
          </div>
        )}
      </div>
    </figure>
  )
}

const DIRECTIONS = [
  {
    n: '01',
    name: 'The dog leads',
    tone: 'Playful minimal: a calm bar with one smile detail',
    note: 'The dog from the painting is the active-tab marker. Pick a tab and it gallops over (the kit’s own run poses, hard cuts), brakes and sits. On case studies he sits by the logo and turns to look when you point at it.',
    home: <DogBar />,
    head: <DogHeader />,
  },
  {
    n: '02',
    name: 'Window ledge',
    tone: 'Modern skeuomorphic: the hero window’s sill, carried down the page',
    note: 'The bar is the aluminium sill from the Hong Kong window, with its highlight and its shadow. The logo sits on it like the bamboo pot; the active tab is a terracotta tile in the pot’s colour.',
    home: <LedgeBar />,
    head: <LedgeBar tabs={false} />,
  },
  {
    n: '03',
    name: 'Watercolour postmark',
    tone: 'Storybook paper: grain, a sky wash and a torn edge',
    note: 'Paper with the painting’s sky bleeding in and a deckled bottom edge. The logo is a perforated stamp with a cancellation mark; tabs are set in the case studies’ italic accent face, the active one underlined with a brushstroke.',
    home: <PostmarkBar />,
    head: <PostmarkBar tabs={false} />,
  },
]

export function NavLab() {
  return (
    <main className="navlab">
      {/* the brushstroke's roughening filter, shared by every stroke */}
      <svg width="0" height="0" className="pm-defs" aria-hidden="true">
        <filter id="pm-rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="2.4" />
        </filter>
      </svg>
      <header className="navlab-intro">
        <p className="navlab-kicker">Lab · not linked from the site</p>
        <h1>Three navs with character</h1>
        <p>Each direction is shown as the home page’s docked tab bar and as the case study header. The bars are live: click the tabs.</p>
      </header>
      {DIRECTIONS.map((d) => (
        <section key={d.n} className="navlab-dir" aria-labelledby={`dir-${d.n}`}>
          <div className="navlab-meta">
            <span className="navlab-n">{d.n}</span>
            <div>
              <h2 id={`dir-${d.n}`}>{d.name}</h2>
              <p className="navlab-tone">{d.tone}</p>
              <p className="navlab-note">{d.note}</p>
            </div>
          </div>
          <div className="navlab-frames">
            <Frame label="Home · docked tab bar" kind="home">
              {d.home}
            </Frame>
            <Frame label="Case study · header" kind="case">
              {d.head}
            </Frame>
          </div>
        </section>
      ))}
    </main>
  )
}
