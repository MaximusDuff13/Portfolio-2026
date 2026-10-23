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

// The 2x sprites and the scale each is drawn at. In the painting the running dog is further
// off than the sitting one, so at a shared scale he runs tiny beside his sit. Here, as big as
// the 64px bar allows: running he is 34px tall and about 70px long, sitting 52px tall, which
// reads as one dog.
const SIT_K = 52 / 259
const RUN_K = 34 / 96
const POSES = {
  sit: { f: 'dog-sit-114', w: 114, h: 259, k: SIT_K },
  turn: { f: 'dog-turn-132', w: 132, h: 259, k: SIT_K },
  run1: { f: 'dog-run-1-198', w: 198, h: 92, k: RUN_K },
  run2: { f: 'dog-run-2-185', w: 185, h: 96, k: RUN_K },
  brake: { f: 'dog-brake-180', w: 180, h: 101, k: RUN_K },
} as const
type Pose = keyof typeof POSES
/** half his running width: aim at a point minus this to put his middle there */
export const RUN_HALF = Math.round((POSES.run1.w * RUN_K) / 2)

// a small dog's gallop: each leg position held about 75ms (48px at 0.64px/ms, about two thirds
// of his length), so the eye reads every stride instead of a blur
const SPEED = 0.64 // px per ms at full gallop
const ACCEL_MS = 220 // from a standing start to full speed
const STRIDE = 48 // px of ground per pose
const LIFT = 4 // px his body rises in the airborne pose (run1, legs stretched)
const SKID_PX = 22
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
  const ballRef = useRef<HTMLSpanElement>(null)
  const ballRaf = useRef(0)

  // the ball: along the ground by x, up by y; its shadow stays down and shrinks as it rises
  const drawBall = (bx: number, by: number, shown: boolean) => {
    const b = ballRef.current
    if (!b) return
    b.dataset.shown = String(shown)
    b.style.transform = `translateX(${bx}px)`
    const [shadow, body] = Array.from(b.children) as HTMLElement[]
    body.style.transform = `translateY(${-by}px)`
    shadow.style.transform = `scale(${Math.max(0.35, 1 - by / 60)})`
  }
  /** Michael throws: from his hand in the logo, one high arc, two bounces and a roll to `to`.
      Resolves when it lies still. */
  const throwBall = (from: number, to: number, id: number) =>
    new Promise<boolean>((done) => {
      const span = to - from
      // [share of the distance, ms, apex in px]; the first starts at hand height
      const legs: [number, number, number][] = [
        [0.6, 460, 44],
        [0.22, 240, 12],
        [0.1, 150, 4],
        [0.08, 220, 0],
      ]
      let leg = 0
      let x0 = from
      let t0 = performance.now()
      const HAND = 22
      const tick = (now: number) => {
        if (id !== run.current) return done(false)
        const [share, ms, apex] = legs[leg]
        const p = Math.min(1, (now - t0) / ms)
        const x1 = x0 + span * share
        let bx: number
        let by: number
        if (apex === 0) {
          // the roll: slowing to a stop
          bx = x0 + (x1 - x0) * (1 - (1 - p) * (1 - p))
          by = 0
        } else {
          bx = x0 + (x1 - x0) * p
          // a parabola through the apex; the first leg leaves from his hand, not the ground
          const start = leg === 0 ? HAND : 0
          by = (1 - p) * start + 4 * (apex - start / 2) * p * (1 - p)
        }
        drawBall(bx, Math.max(0, by), true)
        if (p < 1) {
          ballRaf.current = requestAnimationFrame(tick)
          return
        }
        x0 = x1
        t0 = now
        if (++leg < legs.length) ballRaf.current = requestAnimationFrame(tick)
        else done(true)
      }
      ballRaf.current = requestAnimationFrame(tick)
    })
  /** he lets it go: it drops from his mouth by his feet and gives one small hop */
  const dropBall = (at: number, id: number) =>
    new Promise<boolean>((done) => {
      const t0 = performance.now()
      const tick = (now: number) => {
        if (id !== run.current) return done(false)
        const p = Math.min(1, (now - t0) / 340)
        const q = (p - 0.6) / 0.4
        const by = p < 0.6 ? 18 * (1 - (p / 0.6) ** 2) : 20 * q * (1 - q)
        drawBall(at, by, true)
        if (p < 1) ballRaf.current = requestAnimationFrame(tick)
        else done(true)
      }
      ballRaf.current = requestAnimationFrame(tick)
    })

  const set = (pose?: Pose, facing?: 'left' | 'right', shown?: boolean) => {
    const n = ref.current
    if (!n) return
    if (pose) n.dataset.pose = pose
    if (facing) n.dataset.facing = facing
    if (shown !== undefined) n.dataset.shown = String(shown)
  }
  // the dog moves along the ground; only his body lifts, so his shadow stays on the floor
  const draw = (lift = 0) => {
    const n = ref.current
    if (!n) return
    n.style.transform = `translateX(${x.current}px)`
    const body = n.lastElementChild as HTMLElement | null
    if (body) body.style.transform = lift ? `translateY(${-lift}px)` : ''
  }
  // a puff of dust kicked up at his feet, drifting in `dir`; drawn in code, gone in ~0.7s
  const puff = (at: number, dir: number) => {
    const host = ref.current?.parentElement
    if (!host) return
    const p = document.createElement('span')
    p.className = 'nav-dust'
    p.setAttribute('aria-hidden', 'true')
    p.style.left = `${Math.round(at)}px`
    for (let i = 0; i < 6; i++) {
      const d = document.createElement('i')
      d.style.setProperty('--dx', `${dir * (6 + i * 7)}px`)
      d.style.setProperty('--dy', `${-(4 + (i % 3) * 5)}px`)
      d.style.animationDelay = `${i * 22}ms`
      p.appendChild(d)
    }
    host.appendChild(p)
    window.setTimeout(() => p.remove(), 1000)
  }
  // his front paws in the brake pose, from his left edge, by the way he faces
  const paws = (dir: number) => x.current + (dir < 0 ? 10 : POSES.brake.w * RUN_K - 10)
  const stop = () => {
    run.current++
    cancelAnimationFrame(raf.current)
    cancelAnimationFrame(ballRaf.current)
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
        // the stop: brake pose, sliding SKID_PX and slowing to nothing, dust at his front paws
        set('brake')
        puff(paws(dir) + dir * SKID_PX, dir)
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
    drawBall(0, 0, false)
  }, [])

  // the ball lies at his feet once he is back: just right of where he sits
  const atFeet = (sitX: number) => sitX + POSES.sit.w * SIT_K + 3

  /** Fetch. Michael throws the ball out of the logo; the dog hops out after it, catches it in
      a skid, turns on the spot, runs straight back and sits by the logo with the ball at his
      feet. About three and a half seconds, once (under the 5s at which moving content needs a
      pause control). Under reduced motion he is simply sitting there with the ball. */
  const fetch = useCallback(
    async (fromX: number, sitX: number, farX: number) => {
      if (reduced) {
        place(sitX)
        drawBall(atFeet(sitX), 0, true)
        return
      }
      stop()
      const id = run.current
      busy.current = true
      x.current = fromX
      set('run1', 'right', false)
      draw(0)
      // thrown from Michael's hand, a little right of the logo's centre, to where it stops;
      // he runs to put his mouth on it (his head is at the right of the mirrored brake pose)
      const hand = fromX + RUN_HALF + 8
      const thrown = throwBall(hand, farX, id)
      if (!(await wait(200, id))) return
      const catchX = farX - POSES.brake.w * RUN_K + 8
      if (!(await gallop(catchX, true, id))) return
      if (!(await thrown)) return
      // caught: the ball is in his mouth now
      drawBall(farX, 0, false)
      // turning round: still braced from the skid, a beat, then a hop to face home
      const turnRound = async () => {
        if (!(await wait(160, id))) return false
        set('brake', 'left')
        draw(LIFT)
        // the hop round kicks dust back the way he came
        puff(x.current + (POSES.brake.w * RUN_K) / 2, 1)
        if (!(await wait(90, id))) return false
        draw(0)
        return wait(120, id)
      }
      if (!(await turnRound())) return
      if (!(await gallop(sitX, true, id))) return
      set('sit', 'left')
      // and he drops it at his feet
      await dropBall(atFeet(sitX), id)
      busy.current = false
    },
    // gallop, wait, set and draw only touch refs, so they never go stale
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reduced, place],
  )

  /** back into the logo, still running (he picks the ball up on his way); then he is gone */
  const runIn = useCallback(
    async (inX: number) => {
      if (reduced) return hide()
      stop()
      const id = run.current
      busy.current = true
      drawBall(0, 0, false)
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

  return { ref, ballRef, reduced, place, hide, fetch, runIn, look }
}

export function NavDog({
  dogRef,
  ballRef,
}: {
  dogRef: RefObject<HTMLSpanElement>
  ballRef: RefObject<HTMLSpanElement>
}) {
  return (
    <>
      {/* the ball: drawn in code, in the site's accent, with its own shadow on the ground */}
      <span ref={ballRef} className="nav-ball" aria-hidden="true" data-shown="false">
        <span className="nav-ball-shadow" />
        <span className="nav-ball-body" />
      </span>
      <span ref={dogRef} className="nav-dog" aria-hidden="true" data-pose="sit" data-facing="left" data-shown="false">
        <span className="nav-dog-shadow" />
        {/* the body last: draw() lifts it, and only it */}
        <span className="nav-dog-body">
          {(Object.keys(POSES) as Pose[]).map((p) => {
            const s = POSES[p]
            return (
              <img
                key={p}
                className={`nav-dog-${p}`}
                src={`/header-kit/web/${s.f}.webp`}
                alt=""
                width={Math.round(s.w * s.k)}
                height={Math.round(s.h * s.k)}
              />
            )
          })}
        </span>
      </span>
    </>
  )
}

/** The round logo. Both crops are always loaded, so the cut between them is instant. */
export function DogLogo({ withDog, className = '' }: { withDog: boolean; className?: string }) {
  return (
    <span className={`dog-logo ${className}`}>
      {(['icon-96', 'icon-solo-96'] as const).map((n) => (
        <picture
          key={n}
          style={{
            visibility: (n === 'icon-96') === withDog ? 'visible' : 'hidden',
          }}
        >
          <source type="image/avif" srcSet={`/home/loop/${n}.avif`} />
          <img src={`/home/loop/${n}.webp`} alt="" width={44} height={44} />
        </picture>
      ))}
    </span>
  )
}
