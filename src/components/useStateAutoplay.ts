'use client'
// useStateAutoplay — the autoplay model for a set of states shown in turn (StateCarousel, and the
// unlinked states preview): which state is active, whether it is advancing, and why not.
//
// STAGE ONLY. The hover/focus pause and the visibility check attach to the stage (via
// `stageProps`), never to the pills or the play/pause button. The first version paused on hover or
// focus anywhere in the component, so pressing Play left the pointer or focus on Play and nothing
// advanced; here pressing Play always resumes, from the current state.
//
// RUNS WHEN: mounted, not paused by the user, the stage at least 30% in view, and the stage
// neither hovered nor holding focus. Choosing a state (`select`) or `pause()` (e.g. opening the
// lightbox) stops it until Play. `spotlight` changes the state without stopping autoplay, for
// options where hovering a card highlights it.
//
// TIMER. Keeps the time left across a hover or scroll pause; a new state, or pressing Play,
// starts a fresh interval. `progressKey` changes at the same moments, so an underline keyed on it
// restarts with the interval.
//
// REDUCED MOTION. Starts paused. Play still starts it if the user asks.
//
// HYDRATION. Server and first client render: state 0, not running. Timers, the observer and the
// motion query start in effects.
import { useCallback, useEffect, useRef, useState } from 'react'

export const TRANSITION_MS = 500
export const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

export function useStateAutoplay({ count, intervalMs = 4000 }: { count: number; intervalMs?: number }) {
  const [active, setActive] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(false)
  const [stage, setStage] = useState<HTMLElement | null>(null)
  // True for one transition after the state changes, so will-change is only set while moving.
  const [transitioning, setTransitioning] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    if (reduced) setUserPaused(true)
  }, [reduced])

  // Visibility of the stage alone, so a tall pill row or a small screen never blocks it.
  useEffect(() => {
    if (!stage) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.3), {
      threshold: [0, 0.3, 1],
    })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [stage])

  const autoplayOn = !userPaused
  const running = mounted && autoplayOn && inView && !hovered && !focused
  const progressKey = `${active}-${cycle}`

  // The pausable timer.
  const remaining = useRef(intervalMs)
  useEffect(() => {
    remaining.current = intervalMs
  }, [intervalMs, progressKey])
  useEffect(() => {
    if (!running) return
    const start = Date.now()
    let fired = false
    const id = window.setTimeout(() => {
      fired = true
      setActive((a) => (a + 1) % count)
    }, remaining.current)
    return () => {
      window.clearTimeout(id)
      if (!fired) remaining.current = Math.max(0, remaining.current - (Date.now() - start))
    }
  }, [running, progressKey, count])

  // will-change window. Skipped on the first render and under reduced motion.
  const firstActive = useRef(true)
  useEffect(() => {
    if (firstActive.current) {
      firstActive.current = false
      return
    }
    if (reduced) return
    setTransitioning(true)
    const id = window.setTimeout(() => setTransitioning(false), TRANSITION_MS)
    return () => window.clearTimeout(id)
  }, [active, reduced])

  const select = useCallback((i: number) => {
    setActive(i)
    setUserPaused(true)
  }, [])
  const spotlight = useCallback((i: number) => setActive(i), [])
  const pause = useCallback(() => setUserPaused(true), [])
  const togglePlay = useCallback(() => {
    if (userPaused) setCycle((c) => c + 1)
    setUserPaused(!userPaused)
  }, [userPaused])

  const stageProps = {
    ref: setStage,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
    },
  }

  return {
    active,
    select,
    spotlight,
    pause,
    togglePlay,
    autoplayOn,
    running,
    reduced,
    transitioning,
    progressKey,
    intervalMs,
    stageProps,
  }
}

export type StateAutoplay = ReturnType<typeof useStateAutoplay>
