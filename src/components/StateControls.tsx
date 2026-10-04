'use client'
// StateControls — the controls for a set of states shown in turn: the intro label, the pill row,
// the accent-warm underline filling across the interval on the active pill, and the play/pause
// button. Used by StateCarousel and the unlinked states preview.
//
// CENTRED on the stage's axis (the wide row's centre, which is also the carousel's active card). From lg up
// the row is a 1fr / auto / 1fr grid: the pills sit in the middle column, exactly on the axis, and
// the play/pause button hangs in the third column without pushing them off it. Below lg the pills
// and button wrap as one centred flex row.
//
// The intro label names the group: the tablist or toggle group is aria-labelledby it.
//
// `mode`:
//   · 'tabs'    — role=tablist/tab with roving tabindex, arrows, Home/End (one panel shows).
//   · 'toggles' — role=group of aria-pressed buttons (every card is visible).
//
// Both play/pause icons stay mounted and only one shows: swapping the <svg> under the pointer
// made the browser report the next mouseout from a detached node, which React could miss.
//
// `tone` follows the band the controls sit on (featureSurface in ProblemSolutionFeature):
//   · 'dark'  (foundation-800, the default): intro foundation-400 (6.01:1); inactive pills
//     foundation-300 (10.18:1) on a foundation-700 border; the active pill foundation-900 on
//     foundation-100 (16.03:1); the icon foundation-300 (10.18:1).
//   · 'light' (body): intro foundation-500 (4.61:1); inactive pills foundation-600 (7.38:1) in a
//     border-border outline; the active pill body on foundation-900 (16.9:1); the icon
//     foundation-600 (7.38:1). The dark tone's colours all but vanish on this ground.
import { useRef } from 'react'
import { Pause, Play } from 'lucide-react'
import type { StateAutoplay } from './useStateAutoplay'
import type { CyclerState } from './StateCarousel'

export type StateTone = 'dark' | 'light'

export const ring =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-foundation-100 focus-visible:ring-offset-2 focus-visible:ring-offset-foundation-800'

const ringLight =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-foundation-900 focus-visible:ring-offset-2 focus-visible:ring-offset-body'

export function stateTone(tone: StateTone) {
  const dark = tone === 'dark'
  return {
    ring: dark ? ring : ringLight,
    intro: dark ? 'text-foundation-400' : 'text-foundation-500',
    pillOn: dark
      ? 'border-foundation-100 bg-foundation-100 text-foundation-900'
      : 'border-foundation-900 bg-foundation-900 text-body',
    pillOff: dark
      ? 'border-foundation-700 text-foundation-300 hover:border-foundation-400'
      : 'border-border text-foundation-600 hover:border-foundation-400 hover:text-foundation-900',
    play: dark
      ? 'border-foundation-700 text-foundation-300 hover:border-foundation-400'
      : 'border-border text-foundation-600 hover:border-foundation-400 hover:text-foundation-900',
  }
}

/* "One step, four states": the label token, centred, in the tone's small-label colour. No accent:
   accent-warm is kept for the timing underline. mb-3 (12px) to the pills. */
export function StatesIntro({ id, tone = 'dark' }: { id: string; tone?: StateTone }) {
  return (
    <p
      id={id}
      className={`mb-3 text-center font-grotesk text-label uppercase tracking-widest ${stateTone(tone).intro}`}
    >
      One step, four states
    </p>
  )
}

const fillKeyframes = '@keyframes ph-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}'

export function Controls({
  states,
  autoplay,
  mode,
  idBase,
  tone = 'dark',
}: {
  states: CyclerState[]
  autoplay: StateAutoplay
  mode: 'tabs' | 'toggles'
  idBase: string
  tone?: StateTone
}) {
  const { active, select, autoplayOn, running, reduced, progressKey, intervalMs, togglePlay } = autoplay
  const t = stateTone(tone)
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
    <div>
      <style>{fillKeyframes}</style>
      <StatesIntro id={`${idBase}-intro`} tone={tone} />
      <div className="flex flex-wrap items-center justify-center gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <div
          role={tabs ? 'tablist' : 'group'}
          aria-labelledby={`${idBase}-intro`}
          data-pills=""
          className="flex flex-wrap justify-center gap-3 lg:col-start-2"
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
                className={`relative overflow-hidden rounded-full border px-4 py-2 font-grotesk text-nav-tab transition-colors motion-reduce:transition-none ${t.ring} ${
                  on ? t.pillOn : t.pillOff
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
          className={`grid h-10 w-10 place-items-center rounded-full border lg:justify-self-start ${t.play} transition-colors motion-reduce:transition-none ${t.ring}`}
        >
          <Pause aria-hidden="true" size={16} className={autoplayOn ? '' : 'hidden'} />
          <Play aria-hidden="true" size={16} className={autoplayOn ? 'hidden' : ''} />
        </button>
      </div>
    </div>
  )
}
