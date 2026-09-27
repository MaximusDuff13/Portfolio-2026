'use client'
// GROUP 1, OPTION 4 — state pills above one large shot; the pills switch which state is shown.
//
// Not the shared TabBar: it isn't on this page, has no tab roles or arrow-key handling, and its
// inactive tabs (foundation-400, 2.44:1) fail AA. This is the WAI-ARIA tabs pattern with manual
// activation: role="tablist"/"tab"/"tabpanel"; only the selected tab is in the Tab order (roving
// tabindex); Left/Right (wrapping), Home and End move focus between tabs; Enter or Space selects
// the focused tab (native button activation); aria-selected and aria-controls follow the choice.
//
// Pills: selected foundation-900 on body text (16.9:1); unselected foundation-600 on body (7.38:1)
// inside a border-border outline. Every shot keeps its own aspect ratio (fit="natural").
import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { LightboxProvider } from '@/components/Lightbox'
import { states } from '../shots'
import { Shot } from '../Shot'

export function G1Option4() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const base = useId().replace(/:/g, '')

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = states.length - 1
    const to =
      e.key === 'ArrowRight' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (to === null) return
    e.preventDefault()
    tabs.current[to]?.focus()
  }

  const current = states[active]
  return (
    <LightboxProvider>
      <div role="tablist" aria-label="Schema & Wiki states" className="flex flex-wrap gap-2">
        {states.map(({ label }, i) => {
          const on = i === active
          return (
            <button
              key={label}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${base}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`rounded-full px-4 py-2 text-nav-tab font-grotesk transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foundation-900 focus-visible:ring-offset-2 focus-visible:ring-offset-body ${
                on
                  ? 'bg-foundation-900 text-body'
                  : 'border border-border bg-body text-foundation-600 hover:border-foundation-400 hover:text-foundation-900'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-tab-${active}`}
        className="mt-8"
      >
        <Shot shot={current.shot} label={current.label} sizes="(min-width: 1152px) 1120px, 100vw" />
      </div>
    </LightboxProvider>
  )
}
