'use client'
// StateCycler — one step of a flow, shown in each of its states in turn: a row of pills naming the
// states, then a stage showing one state's screenshot at a time.
//
// NEW COMPONENT. Must sit inside a LightboxProvider: clicking the stage enlarges the state showing.
//
// STAGE. A fixed shape, so switching states never moves the page: aspect-ratio 3000 / 1131, the
// natural ratio of the tallest image, set in CSS so it holds before any image loads. Every image
// is stacked absolutely at the stage's full width, top-aligned and never cropped, so the card's
// top edge stays put and a shorter card leaves band background below it. Each image carries the
// screenshot frame itself (rounded-lg, border-border, as on the shipped screen), so the frame
// outlines the card and not the empty space under it.
//
// AUTOPLAY. Advances every intervalMs and loops. It runs only while mounted, at least 60% in view,
// not hovered, without focus inside, and not paused by the user. Choosing a pill, pressing Pause
// or enlarging the stage pauses it until Play is pressed; nothing resumes it behind the user's back.
// The timer keeps what was left of the interval across a hover or scroll pause, and the active
// pill's accent-warm underline (the only accent here) fills over the same interval and freezes
// with it.
//
// REDUCED MOTION. Starts paused on the first state; swaps are instant and the underline is hidden.
// Pills still work, and Play still starts cycling if the user asks for it.
//
// HYDRATION. The server and first client render show the first state with autoplay not yet
// running; timers, the observer and the motion query all start in effects.
//
// CONTRAST on foundation-800: inactive pills foundation-300 text (10.18:1) on a foundation-700
// border; the active pill foundation-900 on foundation-100 (16.0:1); the pause/play icon
// foundation-300 (10.18:1).
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useLightbox } from './Lightbox'

export type CyclerState = { id: string; label: string; src: string; alt: string }

const ring =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-foundation-100 focus-visible:ring-offset-2 focus-visible:ring-offset-foundation-800'

const fillKeyframes = '@keyframes state-cycler-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}'

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

/* Calls onTick after `interval` ms of running time. Stopping keeps the time left, so a pause
   resumes where it froze; `resetKey` changing starts a fresh interval. */
function usePausableTimer(running: boolean, interval: number, resetKey: string, onTick: () => void) {
  const remaining = useRef(interval)
  const tick = useRef(onTick)
  tick.current = onTick

  useEffect(() => {
    remaining.current = interval
  }, [interval, resetKey])

  useEffect(() => {
    if (!running) return
    const start = Date.now()
    let fired = false
    const id = window.setTimeout(() => {
      fired = true
      tick.current()
    }, remaining.current)
    return () => {
      window.clearTimeout(id)
      if (!fired) remaining.current = Math.max(0, remaining.current - (Date.now() - start))
    }
  }, [running, resetKey])
}

export function StateCycler({ states, intervalMs = 4000 }: { states: CyclerState[]; intervalMs?: number }) {
  const lightbox = useLightbox()
  const baseId = useId()
  const root = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const [active, setActive] = useState(0)
  // Bumped when Play is pressed, so the interval and the underline start over.
  const [cycle, setCycle] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    if (reduced) setUserPaused(true)
  }, [reduced])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.6), {
      threshold: [0, 0.6, 1],
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const autoplayOn = !userPaused
  const running = mounted && autoplayOn && inView && !hovered && !focused
  const resetKey = `${active}-${cycle}`

  usePausableTimer(running, intervalMs, resetKey, () => setActive((a) => (a + 1) % states.length))

  const select = useCallback((i: number) => {
    setActive(i)
    setUserPaused(true)
  }, [])

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const last = states.length - 1
    const next =
      e.key === 'ArrowRight' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    select(next)
    tabs.current[next]?.focus()
  }

  const togglePlay = () => {
    if (userPaused) setCycle((c) => c + 1)
    setUserPaused((p) => !p)
  }

  const current = states[active]
  const tabId = (i: number) => `${baseId}-tab-${i}`
  const panelId = `${baseId}-panel`

  return (
    <div
      ref={root}
      data-state-cycler=""
      data-active={current.id}
      data-running={running ? 'true' : 'false'}
      className="mt-section"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
      }}
    >
      <style>{fillKeyframes}</style>

      <div className="flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="States" className="flex flex-wrap gap-3">
          {states.map((state, i) => {
            const selected = i === active
            return (
              <button
                key={state.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                id={tabId(i)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`relative overflow-hidden rounded-full border px-4 py-2 font-grotesk text-nav-tab transition-colors motion-reduce:transition-none ${ring} ${
                  selected
                    ? 'border-foundation-100 bg-foundation-100 text-foundation-900'
                    : 'border-foundation-700 text-foundation-300 hover:border-foundation-400'
                }`}
              >
                {state.label}
                {selected && autoplayOn && !reduced && (
                  <span
                    key={resetKey}
                    aria-hidden="true"
                    data-underline=""
                    className="pointer-events-none absolute inset-x-4 bottom-1 h-0.5 origin-left rounded-full bg-accent-warm"
                    style={{
                      transform: 'scaleX(0)',
                      animation: `state-cycler-fill ${intervalMs}ms linear forwards`,
                      animationPlayState: running ? 'running' : 'paused',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          aria-label={autoplayOn ? 'Pause automatic cycling' : 'Play automatic cycling'}
          onClick={togglePlay}
          className={`grid h-10 w-10 place-items-center rounded-full border border-foundation-700 text-foundation-300 transition-colors hover:border-foundation-400 motion-reduce:transition-none ${ring}`}
        >
          {/* Both icons stay mounted and only one shows. Swapping the <svg> node under the cursor
              made the browser report the next mouseout from a detached node, which React could
              miss, leaving the cycler "hovered" and autoplay stuck paused. */}
          <Pause aria-hidden="true" size={16} className={autoplayOn ? '' : 'hidden'} />
          <Play aria-hidden="true" size={16} className={autoplayOn ? 'hidden' : ''} />
        </button>
      </div>

      {/* The stage. The images are the tabpanel's content, so their alt text is read; the enlarge
          button is laid over them (as LightboxTrigger is) and sits outside the clipped frame so
          its focus ring and offset are not cut off. */}
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(active)}
        aria-live="off"
        className="relative mt-6"
        style={{ aspectRatio: '3000 / 1131' }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          {states.map((state, i) => {
            const shown = i === active
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={state.id}
                src={state.src}
                alt={shown ? state.alt : ''}
                aria-hidden={shown ? undefined : true}
                decoding="async"
                className={`absolute inset-x-0 top-0 block h-auto w-full rounded-lg border border-border object-contain object-top ${
                  reduced ? '' : 'transition-opacity duration-300 ease-out'
                } motion-reduce:transition-none ${shown ? 'opacity-100' : 'opacity-0'}`}
              />
            )
          })}
        </div>
        <button
          type="button"
          aria-label={`Enlarge: ${current.label} state`}
          onClick={(e) => {
            setUserPaused(true)
            lightbox.open({ src: current.src, alt: current.alt }, e.currentTarget)
          }}
          className={`absolute inset-0 block h-full w-full cursor-zoom-in rounded-lg border-0 bg-transparent p-0 ${ring}`}
        />
      </div>
    </div>
  )
}
