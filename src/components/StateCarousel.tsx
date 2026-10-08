'use client'
// StateCarousel — one step shown in each of its states: a focus carousel. The active card sits
// centred at 64% of the stage width, sharp; its previous and next neighbours peek in beside it at
// 0.92 scale, 0.5 opacity and 3px blur, all top-aligned. Advancing slides everything one position.
// Autoplay, pausing and the controls come from useStateAutoplay and StateControls. Must sit inside
// a LightboxProvider.
//
// EDGES. Meant for the wide row (wideRow). From lg up the stage overflows visibly: the neighbours
// run on past the wrap and are cut off only where the band clips them (overflow-x: clip on the
// band, see ProblemSolutionFeature), at the viewport edge. contain: paint would clip them at the stage, so from lg up
// it is dropped. Below lg the stage clips at the wrap edge, with contain: paint, as before.
//
// POSITIONS come from each card's wrapped offset from the active one: -1, 0, +1, or hidden (the
// fourth card). A card entering or leaving the hidden slot changes by opacity only: it fades out
// where it stood, and fades in already in its new place, so the loop never rewinds and no card
// slides across the stage. Everything else moves on 500ms ease-out CSS transitions; will-change
// only while a change is under way; without filter: blur() support the blur is not applied.
//
// STAGE HEIGHT is from the states' own sizes: the active card's width (64%, 86% below lg) × the tallest image's
// height / width, as an aspect ratio,
// plus 6px padding top and bottom so the active card's focus ring is not clipped. It is right
// before any image loads.
//
// INTERACTION. Clicking a peeking neighbour brings it to the centre and stops autoplay; clicking
// the active card enlarges it. Neighbours are aria-hidden and not focusable; the pills (tabs) are
// the accessible way through the states.
//
// REDUCED MOTION. Only the active card, no transforms, no blur, instant.
import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'
import { useLightbox } from './Lightbox'
import { useStateAutoplay, TRANSITION_MS, EASE_OUT } from './useStateAutoplay'
import { Controls, stateTone, type StateTone } from './StateControls'

/* One state: its pill label, its screenshot, and the screenshot's natural size, so every card has
   its shape before the image loads. */
export type CyclerState = { id: string; label: string; src: string; alt: string; width: number; height: number }

// The active card's share of the stage width: 64% from lg up, where the neighbours peek into the
// wide row; 86% below lg, where at 64% a phone showed the active screen at ~217px wide.
const CARD_LG = 0.64
const CARD_SM = 0.86
const LG = '(min-width: 1024px)'
const GAP_PX = 24

function useCardShare() {
  const [card, setCard] = useState(CARD_LG)
  useEffect(() => {
    const query = window.matchMedia(LG)
    const update = () => setCard(query.matches ? CARD_LG : CARD_SM)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return card
}
const all = ['opacity', 'transform', 'filter'].map((p) => `${p} ${TRANSITION_MS}ms ${EASE_OUT}`).join(', ')
const fadeOnly = `opacity ${TRANSITION_MS}ms ${EASE_OUT}`

type Slot = -1 | 0 | 1 | null

function slotOf(i: number, active: number, n: number): Slot {
  const d = (i - active + n) % n
  return d === 0 ? 0 : d === 1 ? 1 : d === n - 1 ? -1 : null
}

const shift = (slot: number) => `translateX(calc(${slot} * (100% + ${GAP_PX}px)))`

/* `tone` is the band's: it colours the controls and the active card's focus ring. */
export function StateCarousel({ states, tone = 'dark' }: { states: CyclerState[]; tone?: StateTone }) {
  const card = useCardShare()
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
  }, [active, n, states])

  const current = states[active]
  // The stage takes the tallest card's shape.
  const tallest = states.reduce((a, s) => (s.height / s.width > a.height / a.width ? s : a))

  return (
    <div data-state-carousel="">
      <Controls states={states} autoplay={autoplay} mode="tabs" idBase={idBase} tone={tone} />
      <div
        {...stageProps}
        id={`${idBase}-panel`}
        role="tabpanel"
        aria-labelledby={`${idBase}-tab-${active}`}
        aria-live="off"
        data-stage=""
        className="mt-6 overflow-hidden py-1.5 [contain:paint] lg:overflow-visible lg:[contain:none]"
      >
        <div className="relative w-full" style={{ aspectRatio: `${tallest.width} / ${tallest.height * card}` }}>
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
                style={{ left: `${((1 - card) / 2) * 100}%`, width: `${card * 100}%`, ...style } as React.CSSProperties}
              >
                <div
                  className="overflow-hidden rounded-lg border border-border"
                  style={{ aspectRatio: `${state.width} / ${state.height}` }}
                >
                  <Image src={state.src} alt={state.alt} width={state.width} height={state.height} sizes="(min-width: 1024px) 58vw, 86vw" className="block h-full w-full" />
                </div>
                {center && (
                  <button
                    type="button"
                    aria-label={`Enlarge: ${current.label} state`}
                    onClick={(e) => {
                      pause()
                      lightbox.open({ src: current.src, alt: current.alt }, e.currentTarget)
                    }}
                    className={`absolute inset-0 block h-full w-full cursor-zoom-in rounded-lg border-0 bg-transparent p-0 ${stateTone(tone).ring}`}
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
