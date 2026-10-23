'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'
import './nav-dog.css'

/* The dog in the nav, and the logo he belongs to. While he is out in the nav (beside the
   active home tab, or beside the logo on other pages) the logo shows Michael alone; when he
   runs back into it, the logo cuts to the two of them together. Everything is the header kit's
   own art: the run, brake, sit and turn sprites, and the two logo crops from
   scripts/export-hero-loop.mjs. Poses change by hard cuts only (visibility, never opacity), as
   in the painting. Under reduced motion he never runs: he is simply where he belongs. On
   phones (below the sm breakpoint) he stays in the logo: no dog in the nav at all. */

// the 2x sprites, all drawn at one scale so the poses keep the painting's proportions
const POSES = {
  sit: { f: 'dog-sit-114', w: 114, h: 259 },
  turn: { f: 'dog-turn-132', w: 132, h: 259 },
  run1: { f: 'dog-run-1-198', w: 198, h: 92 },
  run2: { f: 'dog-run-2-185', w: 185, h: 96 },
  brake: { f: 'dog-brake-180', w: 180, h: 101 },
} as const
export type Pose = keyof typeof POSES
const K = 40 / 259 // sitting, he is 40px tall
/** half his running width: aim at a point minus this to put his middle there */
export const RUN_HALF = Math.round((POSES.run1.w * K) / 2)

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

type Facing = 'left' | 'right'
type DogState = { x: number; pose: Pose; facing: Facing; ms: number; shown: boolean }

export function useNavDog() {
  const reduced = useReducedMotionSafe()
  const [st, setSt] = useState<DogState>({ x: 0, pose: 'sit', facing: 'left', ms: 0, shown: false })
  const xRef = useRef(0)
  const running = useRef(false)
  const timers = useRef<number[]>([])
  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    running.current = false
  }
  useEffect(() => clear, [])

  /** put him somewhere at once, no run */
  const place = useCallback((x: number, pose: Pose = 'sit', shown = true) => {
    clear()
    xRef.current = x
    setSt((s) => ({ ...s, x, ms: 0, pose, shown }))
  }, [])

  /** gallop to x (hard cuts between the two run poses); `end: 'sit'` brakes and sits there,
      `end: 'run'` arrives still running (into the logo, where he vanishes) */
  const runTo = useCallback(
    (to: number, done?: () => void, end: 'sit' | 'run' = 'sit') => {
      clear()
      const from = xRef.current
      xRef.current = to
      if (reduced || Math.abs(to - from) < 2) {
        setSt((s) => ({ ...s, x: to, ms: 0, pose: 'sit', shown: true }))
        done?.()
        return
      }
      const d = Math.min(800, Math.max(320, Math.abs(to - from) * 1.3))
      running.current = true
      setSt((s) => ({ ...s, x: to, ms: d, pose: 'run1', facing: to < from ? 'left' : 'right', shown: true }))
      const at = (t: number, f: () => void) => timers.current.push(window.setTimeout(f, t))
      let frame = 0
      const stride = end === 'sit' ? d - 120 : d
      for (let t = 90; t < stride; t += 90) at(t, () => setSt((s) => ({ ...s, pose: ++frame % 2 ? 'run2' : 'run1' })))
      if (end === 'sit') {
        at(d - 120, () => setSt((s) => ({ ...s, pose: 'brake' })))
        at(d + 60, () => {
          running.current = false
          setSt((s) => ({ ...s, pose: 'sit' }))
          done?.()
        })
      } else {
        at(d, () => {
          running.current = false
          done?.()
        })
      }
    },
    [reduced],
  )

  const hide = useCallback(() => {
    clear()
    setSt((s) => ({ ...s, shown: false }))
  }, [])

  /** sitting only: he turns his head to look (hover on the logo) */
  const look = useCallback((on: boolean) => {
    if (running.current) return
    setSt((s) => (s.pose === 'sit' || s.pose === 'turn' ? { ...s, pose: on ? 'turn' : 'sit' } : s))
  }, [])

  return { ...st, reduced, place, runTo, hide, look }
}

export function NavDog({ x, pose, facing, ms, shown }: Pick<DogState, 'x' | 'pose' | 'facing' | 'ms' | 'shown'>) {
  return (
    <span
      className="nav-dog"
      aria-hidden="true"
      style={{ transform: `translateX(${x}px)`, transitionDuration: `${ms}ms`, visibility: shown ? undefined : 'hidden' }}
    >
      {(Object.keys(POSES) as Pose[]).map((p) => {
        const s = POSES[p]
        // the kit's run poses face left; mirror them when he runs right
        const flip = facing === 'right' && p !== 'sit' && p !== 'turn'
        return (
          <img
            key={p}
            src={`/header-kit/web/${s.f}.webp`}
            alt=""
            width={Math.round(s.w * K)}
            height={Math.round(s.h * K)}
            style={{ visibility: shown && p === pose ? 'visible' : 'hidden', transform: flip ? 'scaleX(-1)' : undefined }}
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
