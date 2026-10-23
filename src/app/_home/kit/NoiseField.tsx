'use client'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { noiseDeck, verdictOf, type NoiseItem, type Verdict } from '../content'
import { NoiseCard } from './cards'
import type { Phase } from './useIntro'

/* The noise layer: an absolutely positioned field over the stage
   that never takes part in layout, so nothing below it moves when the intro resolves (no
   layout shift). Each card is a .n-item placed by transform from --x/--y/--r, with its state
   in data-state; the page's stylesheet owns every transition.

   Flow: render every card hidden, measure them, ask the page's `place` for positions
   (which must avoid the `exclude` elements: the hero text and the loop), then reveal them as
   `shown` grows. During cleanup the page's `stateOf` decides each card's state and may
   move it (a snap, a cluster). The layer is decorative: aria-hidden and inert. */

export type Rect = { x: number; y: number; w: number; h: number }
export type Placement = { x: number; y: number; r?: number }
export type ItemState = 'hidden' | 'in' | 'marked' | 'out' | 'kept'
export type StateCtx = {
  index: number
  /** position in left-to-right order, 0..n-1 */
  sweep: number
  n: number
  item: NoiseItem
  verdict: Verdict
  pos: Placement
  size: { w: number; h: number }
  field: { w: number; h: number }
  /** the hero's box (and any other exclusions), in field pixels */
  exclude: Rect[]
  phase: Phase
  shown: number
  step: number
}
export type ItemOut = { state: ItemState; x?: number; y?: number; r?: number; delay?: number }

/** A seeded PRNG (mulberry32), so a replay can reshuffle and a resize can't */
export function rng(seed: number) {
  let a = seed | 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** The deck for this screen: the work first (so it survives a small cap), the rest shuffled */
export function useNoiseDeck(capSmall: number, capLarge: number, seed: number) {
  const [width, setWidth] = useState<number | null>(null)
  useEffect(() => setWidth(window.innerWidth), [])
  return useMemo(() => {
    const cap = width != null && width < 720 ? capSmall : capLarge
    const pinned = noiseDeck.filter((i) => verdictOf(i) === 'keep')
    const rest = noiseDeck.filter((i) => verdictOf(i) !== 'keep')
    const r = rng(seed * 97 + 11)
    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1))
      ;[rest[i], rest[j]] = [rest[j], rest[i]]
    }
    const deck = [...pinned, ...rest].slice(0, cap)
    // interleave so the work isn't always the first to arrive
    const order = rng(seed * 31 + 7)
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(order() * (i + 1))
      ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck
  }, [width, capSmall, capLarge, seed])
}

const overlaps = (a: Rect, b: Rect) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y

/** Spread cards as far from each other as possible, outside the exclusions. `bleed` lets a card
    hang off the field's edge by that fraction of its size. */
export function scatter({ rotate = 0, bleed = 0.2, snap = 1 }: { rotate?: number; bleed?: number; snap?: number } = {}) {
  return (sizes: { w: number; h: number }[], field: { w: number; h: number }, exclude: Rect[], r: () => number): Placement[] => {
    const placed: (Placement & { cx: number; cy: number })[] = []
    return sizes.map(({ w, h }) => {
      let best: (Placement & { cx: number; cy: number }) | null = null
      let bestScore = -1
      for (let k = 0; k < 140; k++) {
        let x = -w * bleed + r() * (field.w + w * bleed * 2 - w)
        let y = -h * bleed * 0.5 + r() * (field.h + h * bleed - h)
        x = Math.round(x / snap) * snap
        y = Math.round(y / snap) * snap
        if (exclude.some((e) => overlaps({ x, y, w, h }, e))) continue
        const cx = x + w / 2
        const cy = y + h / 2
        let d = 1e9
        for (const p of placed) d = Math.min(d, Math.hypot(cx - p.cx, cy - p.cy))
        if (d > bestScore) {
          bestScore = d
          best = { x, y, cx, cy, r: rotate ? (r() * 2 - 1) * rotate : 0 }
        }
      }
      // nowhere free: park it below the field, where it never shows
      const p = best ?? { x: 0, y: field.h + 200, cx: 0, cy: field.h + 200, r: 0 }
      placed.push(p)
      return p
    })
  }
}

export function NoiseField({
  items,
  run,
  phase,
  shown,
  step,
  exclude,
  place,
  stateOf,
  extra,
  className = '',
  style,
}: {
  items: NoiseItem[]
  run: number
  phase: Phase
  shown: number
  step: number
  exclude: RefObject<HTMLElement>[]
  place: (sizes: { w: number; h: number }[], field: { w: number; h: number }, exclude: Rect[], r: () => number) => Placement[]
  /** cleanup and final states; noise is handled here */
  stateOf: (ctx: StateCtx) => ItemOut
  /** per-card overlay, e.g. a verdict label or a pencil mark */
  extra?: (ctx: StateCtx, out: ItemOut) => ReactNode
  className?: string
  style?: CSSProperties
}) {
  const field = useRef<HTMLDivElement>(null)
  const nodes = useRef<(HTMLDivElement | null)[]>([])
  const [layout, setLayout] = useState<{ pos: Placement[]; sizes: { w: number; h: number }[]; field: { w: number; h: number }; exclude: Rect[] } | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    field.current?.setAttribute('inert', '')
  }, [])

  // Re-place on a new run, a new deck, or a resize during the intro
  useEffect(() => {
    if (phase === 'final') return
    let id = 0
    const onResize = () => {
      window.clearTimeout(id)
      id = window.setTimeout(() => setTick((t) => t + 1), 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.clearTimeout(id)
    }
  }, [phase])

  useLayoutEffect(() => {
    const f = field.current
    if (!f) return
    const fr = f.getBoundingClientRect()
    const sizes = items.map((_, i) => {
      const el = nodes.current[i]
      return { w: el?.offsetWidth ?? 0, h: el?.offsetHeight ?? 0 }
    })
    const pad = 20
    const ex = exclude
      .map((ref) => ref.current?.getBoundingClientRect())
      .filter((r): r is DOMRect => !!r && r.width > 0)
      .map((r) => ({ x: r.left - fr.left - pad, y: r.top - fr.top - pad, w: r.width + pad * 2, h: r.height + pad * 2 }))
    const size = { w: fr.width, h: fr.height }
    setLayout({ pos: place(sizes, size, ex, rng(run * 131 + 5)), sizes, field: size, exclude: ex })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, run, tick])

  const sweep = useMemo(() => {
    if (!layout) return items.map((_, i) => i)
    const order = items.map((_, i) => i).sort((a, b) => layout.pos[a].x - layout.pos[b].x)
    const rank: number[] = []
    order.forEach((idx, k) => (rank[idx] = k))
    return rank
  }, [items, layout])

  return (
    <div ref={field} aria-hidden="true" data-phase={phase} data-step={step} className={`n-field ${className}`} style={style}>
      {items.map((item, i) => {
        const pos = layout?.pos[i] ?? { x: 0, y: 0, r: 0 }
        const ctx: StateCtx = {
          index: i,
          sweep: sweep[i],
          n: items.length,
          item,
          verdict: verdictOf(item),
          pos,
          size: layout?.sizes[i] ?? { w: 0, h: 0 },
          field: layout?.field ?? { w: 0, h: 0 },
          exclude: layout?.exclude ?? [],
          phase,
          shown,
          step,
        }
        const out: ItemOut =
          !layout ? { state: 'hidden' } : phase === 'noise' ? { state: i < shown ? 'in' : 'hidden' } : stateOf(ctx)
        return (
          <div
            key={`${run}-${item.kind}-${item.id}`}
            ref={(el) => {
              nodes.current[i] = el
            }}
            className="n-item"
            data-kind={item.kind}
            data-verdict={ctx.verdict}
            data-state={layout ? out.state : 'measure'}
            style={
              {
                '--x': `${out.x ?? pos.x}px`,
                '--y': `${out.y ?? pos.y}px`,
                '--r': `${out.r ?? pos.r ?? 0}deg`,
                '--d': `${out.delay ?? 0}ms`,
                '--i': i,
              } as CSSProperties
            }
          >
            <NoiseCard item={item} />
            {extra?.(ctx, out)}
          </div>
        )
      })}
    </div>
  )
}
