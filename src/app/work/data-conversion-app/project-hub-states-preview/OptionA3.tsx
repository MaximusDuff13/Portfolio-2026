'use client'
// OPTION A3 — focus carousel. The active card sits centred at 68% of the stage width, sharp; its
// previous and next neighbours peek in beside it at 0.92 scale, 0.5 opacity and 3px blur, cut off
// by the stage edges, all top-aligned. Advancing slides everything one position.
//
// POSITIONS come from each card's wrapped offset from the active one: -1, 0, +1, or hidden (the
// fourth card). A card entering or leaving the hidden slot changes by opacity only: it fades out
// where it stood, and fades in already in its new place, so the loop never rewinds and no card
// slides across the stage. Everything else moves on 500ms ease-out CSS transitions; will-change
// only while a change is under way; without filter: blur() support the blur is not applied.
//
// STAGE HEIGHT is from constants: the active card's width (68%) × 1131/3000, as an aspect ratio,
// plus 6px padding top and bottom so the active card's focus ring is not clipped. It is right
// before any image loads.
//
// INTERACTION. Clicking a peeking neighbour brings it to the centre and stops autoplay; clicking
// the active card enlarges it. Neighbours are aria-hidden and not focusable; the pills (tabs) are
// the accessible way through the states.
//
// REDUCED MOTION. Only the active card, no transforms, no blur, instant.
import { useEffect, useId, useRef } from 'react'
import { useLightbox } from '@/components/Lightbox'
import { useStateAutoplay, TRANSITION_MS, EASE_OUT } from './useStateAutoplay'
import { Controls, ring } from './Controls'
import { states, IMAGE_WIDTH, TALLEST } from './states'

const CARD = 0.68
const GAP_PX = 24
const all = ['opacity', 'transform', 'filter'].map((p) => `${p} ${TRANSITION_MS}ms ${EASE_OUT}`).join(', ')
const fadeOnly = `opacity ${TRANSITION_MS}ms ${EASE_OUT}`

type Slot = -1 | 0 | 1 | null

function slotOf(i: number, active: number, n: number): Slot {
  const d = (i - active + n) % n
  return d === 0 ? 0 : d === 1 ? 1 : d === n - 1 ? -1 : null
}

const shift = (slot: number) => `translateX(calc(${slot} * (100% + ${GAP_PX}px)))`

export function OptionA3() {
  const autoplay = useStateAutoplay({ count: states.length })
  const { active, select, pause, reduced, transitioning, stageProps } = autoplay
  const lightbox = useLightbox()
  const idBase = useId()
  const n = states.length

  // The previous render's active card, and where each card last stood while visible.
  const prevActive = useRef(active)
  const lastSlot = useRef<number[]>(states.map((_, i) => slotOf(i, 0, n) ?? 2))
  useEffect(() => {
    prevActive.current = active
    states.forEach((_, i) => {
      const s = slotOf(i, active, n)
      if (s !== null) lastSlot.current[i] = s
    })
  }, [active, n])

  const current = states[active]

  return (
    <div data-anim-option="A3">
      <Controls states={states} autoplay={autoplay} mode="tabs" idBase={idBase} />
      <div
        {...stageProps}
        id={`${idBase}-panel`}
        role="tabpanel"
        aria-labelledby={`${idBase}-tab-${active}`}
        aria-live="off"
        data-stage=""
        className="mt-6 overflow-hidden py-1.5"
        style={{ contain: 'paint' }}
      >
        <div className="relative w-full" style={{ aspectRatio: `${IMAGE_WIDTH} / ${TALLEST * CARD}` }}>
          {states.map((state, i) => {
            const slot = slotOf(i, active, n)
            const before = slotOf(i, prevActive.current, n)
            const crossing = (slot === null) !== (before === null)
            const center = slot === 0
            const peek = slot === 1 || slot === -1
            const at = slot ?? before ?? lastSlot.current[i]

            const style = reduced
              ? { opacity: center ? 1 : 0, transform: 'none', '--ph-blur': 'none', transition: 'none' }
              : {
                  opacity: center ? 1 : peek ? 0.5 : 0,
                  transform: `${shift(at)} scale(${center ? 1 : 0.92})`,
                  '--ph-blur': center ? 'blur(0px)' : 'blur(3px)',
                  transition: crossing ? fadeOnly : all,
                  willChange: transitioning ? 'opacity, transform, filter' : undefined,
                }

            return (
              <div
                key={state.id}
                data-card={state.id}
                data-slot={slot ?? 'hidden'}
                aria-hidden={center ? undefined : true}
                onClick={peek ? () => select(i) : undefined}
                className={`absolute top-0 origin-top supports-[filter:blur(0)]:[filter:var(--ph-blur)] ${
                  center
                    ? 'motion-reduce:!transition-none'
                    : 'motion-reduce:!opacity-0 motion-reduce:!transform-none motion-reduce:![filter:none] motion-reduce:!transition-none'
                } ${peek ? 'cursor-pointer' : ''} ${slot === null ? 'pointer-events-none' : ''}`}
                style={{ left: `${((1 - CARD) / 2) * 100}%`, width: `${CARD * 100}%`, ...style } as React.CSSProperties}
              >
                <div
                  className="overflow-hidden rounded-lg border border-border"
                  style={{ aspectRatio: `${IMAGE_WIDTH} / ${state.height}` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={state.src} alt={state.alt} decoding="async" className="block h-full w-full" />
                </div>
                {center && (
                  <button
                    type="button"
                    aria-label={`Enlarge: ${current.label} state`}
                    onClick={(e) => {
                      pause()
                      lightbox.open({ src: current.src, alt: current.alt }, e.currentTarget)
                    }}
                    className={`absolute inset-0 block h-full w-full cursor-zoom-in rounded-lg border-0 bg-transparent p-0 ${ring}`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
