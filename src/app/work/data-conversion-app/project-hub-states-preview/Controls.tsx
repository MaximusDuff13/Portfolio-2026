'use client'
// The controls every animated option shares: the pill row, the accent-warm underline filling
// across the interval on the active pill, and the play/pause button.
//
// `mode`:
//   · 'tabs'    — role=tablist/tab with roving tabindex, arrows, Home/End (one panel shows).
//   · 'toggles' — role=group of aria-pressed buttons (every card is visible, A2).
//
// Both play/pause icons stay mounted and only one shows: swapping the <svg> under the pointer
// made the browser report the next mouseout from a detached node, which React could miss.
//
// CONTRAST on foundation-800: inactive pills foundation-300 (10.18:1) on a foundation-700 border;
// the active pill foundation-900 on foundation-100 (16.03:1); the icon foundation-300 (10.18:1).
import { useRef } from 'react'
import { Pause, Play } from 'lucide-react'
import type { StateAutoplay } from './useStateAutoplay'
import type { SizedState } from './states'

export const ring =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-foundation-100 focus-visible:ring-offset-2 focus-visible:ring-offset-foundation-800'

const fillKeyframes = '@keyframes ph-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}'

export function Controls({
  states,
  autoplay,
  mode,
  idBase,
}: {
  states: SizedState[]
  autoplay: StateAutoplay
  mode: 'tabs' | 'toggles'
  idBase: string
}) {
  const { active, select, autoplayOn, running, reduced, progressKey, intervalMs, togglePlay } = autoplay
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const tabs = mode === 'tabs'

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (!tabs) return
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
    buttons.current[next]?.focus()
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <style>{fillKeyframes}</style>
      <div
        role={tabs ? 'tablist' : 'group'}
        aria-label={tabs ? 'States' : 'Highlighted state'}
        className="flex flex-wrap gap-3"
      >
        {states.map((state, i) => {
          const on = i === active
          return (
            <button
              key={state.id}
              ref={(el) => {
                buttons.current[i] = el
              }}
              id={tabs ? `${idBase}-tab-${i}` : undefined}
              type="button"
              role={tabs ? 'tab' : undefined}
              aria-selected={tabs ? on : undefined}
              aria-controls={tabs ? `${idBase}-panel` : undefined}
              aria-pressed={tabs ? undefined : on}
              tabIndex={tabs ? (on ? 0 : -1) : undefined}
              onClick={() => select(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`relative overflow-hidden rounded-full border px-4 py-2 font-grotesk text-nav-tab transition-colors motion-reduce:transition-none ${ring} ${
                on
                  ? 'border-foundation-100 bg-foundation-100 text-foundation-900'
                  : 'border-foundation-700 text-foundation-300 hover:border-foundation-400'
              }`}
            >
              {state.label}
              {on && autoplayOn && !reduced && (
                <span
                  key={progressKey}
                  aria-hidden="true"
                  data-underline=""
                  className="pointer-events-none absolute inset-x-4 bottom-1 h-0.5 origin-left rounded-full bg-accent-warm"
                  style={{
                    transform: 'scaleX(0)',
                    animation: `ph-fill ${intervalMs}ms linear forwards`,
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
        data-play=""
        aria-label={autoplayOn ? 'Pause automatic cycling' : 'Play automatic cycling'}
        onClick={togglePlay}
        className={`grid h-10 w-10 place-items-center rounded-full border border-foundation-700 text-foundation-300 transition-colors hover:border-foundation-400 motion-reduce:transition-none ${ring}`}
      >
        <Pause aria-hidden="true" size={16} className={autoplayOn ? '' : 'hidden'} />
        <Play aria-hidden="true" size={16} className={autoplayOn ? 'hidden' : ''} />
      </button>
    </div>
  )
}
