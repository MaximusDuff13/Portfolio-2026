'use client'
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'
import './nav-dog.css'

/* The dog in the site header, and the logo he belongs to. While he is out, the logo shows
   Michael alone; when he runs back in, it cuts to the two of them together. Everything is the
   header kit's own art: the run, brake, sit and turn sprites, and the two logo crops from
   scripts/export-hero-loop.mjs. Poses change by hard cuts only (visibility, never opacity), as
   in the painting.

   The run is drawn frame by frame, not tweened: his legs swap every STRIDE px of ground he
   covers, so his feet keep pace with the ground instead of sliding; his body lifts in the
   airborne pose; he speeds up out of a start and skids to a stop in the brake pose. Positions
   are written straight to the element, so a gallop never re-renders React.

   Under reduced motion he never runs: he is simply where he belongs. On phones (below the sm
   breakpoint) he stays in the logo: no dog in the nav at all. */

// the 2x sprites, all drawn at one scale so the poses keep the painting's proportions
const POSES = {
  sit: { f: 'dog-sit-114', w: 114, h: 259 },
  turn: { f: 'dog-turn-132', w: 132, h: 259 },
  run1: { f: 'dog-run-1-198', w: 198, h: 92 },
  run2: { f: 'dog-run-2-185', w: 185, h: 96 },
  brake: { f: 'dog-brake-180', w: 180, h: 101 },
} as const
type Pose = keyof typeof POSES
const K = 40 / 259 // sitting, he is 40px tall
/** half his running width: aim at a point minus this to put his middle there */
export const RUN_HALF = Math.round((POSES.run1.w * K) / 2)

// a small dog's gallop: each leg position held about 75ms (22px at 0.29px/ms), so the eye
// reads every stride instead of a blur
const SPEED = 0.29 // px per ms at full gallop
const ACCEL_MS = 180 // from a standing start to full speed
const STRIDE = 22 // px of ground per pose
const LIFT = 2 // px his body rises in the airborne pose (run1, legs stretched)
const SKID_PX = 12
const SKID_MS = 150

/** false on phones (below Tailwind's sm, 640px), where the nav is just the logo */
export function useDogEnabled() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const sync = () => setOn(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return on
}

export function useNavDog() {
  const reduced = useReducedMotionSafe()
  const ref = useRef<HTMLSpanElement>(null)
  const x = useRef(0)
  const raf = useRef(0)
  const timers = useRef<number[]>([])
  const run = useRef(0) // bumped by every new routine, so an older one stops where it is
  const busy = useRef(false)

  const set = (pose?: Pose, facing?: 'left' | 'right', shown?: boolean) => {
    const n = ref.current
    if (!n) return
    if (pose) n.dataset.pose = pose
    if (facing) n.dataset.facing = facing
    if (shown !== undefined) n.dataset.shown = String(shown)
  }
  const draw = (lift = 0) => {
    if (ref.current) ref.current.style.transform = `translate(${x.current}px, ${-lift}px)`
  }
  const stop = () => {
    run.current++
    cancelAnimationFrame(raf.current)
    timers.current.forEach(clearTimeout)
    timers.current = []
    busy.current = false
  }
  useEffect(() => stop, [])

  const wait = (ms: number, id: number) =>
    new Promise<boolean>((done) => timers.current.push(window.setTimeout(() => done(id === run.current), ms)))

  /** one gallop to `to`; resolves true on arrival (false if a newer routine took over) */
  const gallop = (to: number, skid: boolean, id: number) =>
    new Promise<boolean>((done) => {
      const from = x.current
      const dir = Math.sign(to - from) || 1
      const runPx = Math.max(0, Math.abs(to - from) - (skid ? SKID_PX : 0))
      set('run1', dir < 0 ? 'left' : 'right', true)
      let covered = 0
      const t0 = performance.now()
      let last = t0
      const tick = (now: number) => {
        if (id !== run.current) return done(false)
        // ease in from a standing start, then hold full speed
        const v = SPEED * Math.min(1, 0.3 + (0.7 * (now - t0)) / ACCEL_MS)
        covered = Math.min(runPx, covered + v * (now - last))
        last = now
        x.current = from + dir * covered
        // the legs follow the ground: a new pose every STRIDE px
        const airborne = Math.floor(covered / STRIDE) % 2 === 0
        set(airborne ? 'run1' : 'run2')
        draw(airborne ? LIFT : 0)
        if (covered < runPx) {
          raf.current = requestAnimationFrame(tick)
          return
        }
        if (!skid) return done(true)
        // the stop: brake pose, sliding SKID_PX and slowing to nothing
        set('brake')
        const s0 = now
        const sx = x.current
        const slide = (t: number) => {
          if (id !== run.current) return done(false)
          const p = Math.min(1, (t - s0) / SKID_MS)
          x.current = sx + dir * SKID_PX * (1 - (1 - p) * (1 - p))
          draw(0)
          if (p < 1) raf.current = requestAnimationFrame(slide)
          else done(true)
        }
        raf.current = requestAnimationFrame(slide)
      }
      raf.current = requestAnimationFrame(tick)
    })

  /** put him somewhere at once */
  const place = useCallback((to: number, pose: Pose = 'sit', shown = true) => {
    stop()
    x.current = to
    set(pose, 'left', shown)
    draw(0)
  }, [])

  const hide = useCallback(() => {
    stop()
    set(undefined, undefined, false)
  }, [])

  /** Out of the logo and the zoomies: a sprint along the empty bar, a skid and a look back at
      you, a dash halfway home, another look, then back to his spot by the logo to sit. About
      four seconds, once (under the 5s at which moving content needs a pause control). */
  const zoomies = useCallback(
    async (fromX: number, sitX: number, farX: number) => {
      if (reduced) return place(sitX)
      stop()
      const id = run.current
      busy.current = true
      x.current = fromX
      set('run1', 'right', true)
      draw(0)
      const midX = Math.round(sitX + (farX - sitX) * 0.45)
      const steps: (() => Promise<boolean>)[] = [
        () => gallop(farX, true, id),
        () => (set('turn'), wait(520, id)),
        () => gallop(midX, true, id),
        () => (set('turn'), wait(360, id)),
        () => gallop(sitX, true, id),
      ]
      for (const step of steps) if (!(await step())) return
      set('sit', 'left')
      busy.current = false
    },
    // gallop, wait, set and draw only touch refs, so they never go stale
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reduced, place],
  )

  /** back into the logo, still running; then he is gone */
  const runIn = useCallback(
    async (inX: number) => {
      if (reduced) return hide()
      stop()
      const id = run.current
      busy.current = true
      if (await gallop(inX, false, id)) {
        set(undefined, undefined, false)
        busy.current = false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reduced, hide],
  )

  /** sitting only: he turns his head to look (hover on the logo) */
  const look = useCallback((on: boolean) => {
    const n = ref.current
    if (busy.current || !n || (n.dataset.pose !== 'sit' && n.dataset.pose !== 'turn')) return
    set(on ? 'turn' : 'sit')
  }, [])

  return { ref, reduced, place, hide, zoomies, runIn, look }
}

export function NavDog({ dogRef }: { dogRef: RefObject<HTMLSpanElement> }) {
  return (
    <span ref={dogRef} className="nav-dog" aria-hidden="true" data-pose="sit" data-facing="left" data-shown="false">
      {(Object.keys(POSES) as Pose[]).map((p) => {
        const s = POSES[p]
        return (
          <img
            key={p}
            className={`nav-dog-${p}`}
            src={`/header-kit/web/${s.f}.webp`}
            alt=""
            width={Math.round(s.w * K)}
            height={Math.round(s.h * K)}
          />
        )
      })}
    </span>
  )
}

/** The round logo. Both crops are always loaded, so the cut between them is instant. */
export function DogLogo({ withDog, className = '' }: { withDog: boolean; className?: string }) {
  return (
    <span className={`dog-logo ${className}`}>
      {(['icon-96', 'icon-solo-96'] as const).map((n) => (
        <picture key={n} style={{ visibility: (n === 'icon-96') === withDog ? 'visible' : 'hidden' }}>
          <source type="image/avif" srcSet={`/home/loop/${n}.avif`} />
          <img src={`/home/loop/${n}.webp`} alt="" width={44} height={44} />
        </picture>
      ))}
    </span>
  )
}
