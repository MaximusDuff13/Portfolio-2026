'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

/* The home intro's clock.

   noise    cards arrive one by one, the gaps shrinking from `popFrom` to `popTo` ms, so the
            stage speeds up until it is overwhelming
   cleanup  `cleanupSteps.length` steps, each held for its duration; the page decides what
            each step does (a status line, a sweep, a snap) from `step`
   final    the resolved page

   Skip jumps to final at any point. Replay starts again from an empty stage. Reduced motion
   opens on final and never plays by itself; Replay then runs the cross-fade version: every
   card at once, a short hold, the cleanup steps at a reading pace, then final.

   A hash on the URL (#work, #about...) opens on final, so a deep link never waits, and so
   does a second visit in the same session (back from a case study, say): the intro plays once. */

export type Phase = 'noise' | 'cleanup' | 'final'

export type IntroOptions = {
  /** how many noise cards this run shows */
  count: number
  /** ms each cleanup step holds */
  cleanupSteps: number[]
  /** gap before the first card, then between cards, easing from popFrom to popTo */
  popFrom?: number
  popTo?: number
  startDelay?: number
  /** the overwhelmed beat between the last card and the first cleanup step */
  hold?: number
}

export function useIntro({ count, cleanupSteps, popFrom = 260, popTo = 45, startDelay = 300, hold = 600 }: IntroOptions) {
  const reduced = useReducedMotionSafe()
  const [phase, setPhase] = useState<Phase>('noise')
  const [shown, setShown] = useState(0)
  const [step, setStep] = useState(0)
  /** increments on every play, so a direction can re-seed its layout */
  const [run, setRun] = useState(0)
  const timers = useRef<number[]>([])
  const started = useRef(false)

  const clear = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }
  const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms))

  const play = useCallback(
    (crossFade: boolean) => {
      clear()
      setRun((r) => r + 1)
      setPhase('noise')
      setStep(0)
      setShown(0)
      let t = crossFade ? 80 : startDelay
      if (crossFade) {
        at(t, () => setShown(count))
        t += 1400
      } else {
        for (let i = 0; i < count; i++) {
          const n = i + 1
          at(t, () => setShown(n))
          t += popFrom * Math.pow(popTo / popFrom, count > 1 ? i / (count - 1) : 0)
        }
        t += hold
      }
      at(t, () => setPhase('cleanup'))
      cleanupSteps.forEach((ms, i) => {
        if (i > 0) at(t, () => setStep(i))
        t += crossFade ? Math.max(ms, 650) : ms
      })
      at(t, () => setPhase('final'))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, cleanupSteps.join(','), popFrom, popTo, startDelay, hold],
  )

  const skip = useCallback(() => {
    clear()
    setPhase('final')
  }, [])

  const replay = useCallback(() => play(reduced), [play, reduced])

  // First play: after mount, once fonts are in (so the layout measures real text)
  useEffect(() => {
    if (started.current || count === 0) return
    const t = window.setTimeout(() => {
      if (started.current) return
      started.current = true
      let seen = false
      try {
        seen = window.sessionStorage.getItem('home-intro-seen') === '1'
        window.sessionStorage.setItem('home-intro-seen', '1')
      } catch {}
      if (reduced || window.location.hash || seen) {
        setPhase('final')
        return
      }
      const fonts = document.fonts?.ready ?? Promise.resolve()
      Promise.race([fonts, new Promise((r) => setTimeout(r, 1200))]).then(() => play(false))
    }, 0)
    return () => window.clearTimeout(t)
  }, [count, reduced, play])

  useEffect(() => clear, [])

  return {
    phase,
    shown,
    step,
    run,
    reduced,
    skip,
    replay,
    /** label for the always-visible control */
    controlLabel: phase === 'final' ? 'Replay intro' : 'Skip intro',
    onControl: phase === 'final' ? replay : skip,
  }
}
