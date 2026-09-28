'use client'
// OPTION A1 — blur-through. One stage, one card at a time, all four stacked at the same spot and
// top-aligned. On a change the outgoing card fades, blurs to 10px and settles to 0.985 while the
// incoming card comes in from 10px blur and 1.015, overlapping, over 500ms ease-out.
//
// The two cards move differently (one shrinks away, one settles in), so the change runs as a pair
// of Web Animations with explicit from/to frames rather than CSS transitions between resting
// styles. At rest nothing is blurred: the active card is plain, the rest are transparent.
// will-change is set on the two cards for the length of the animation only. Without
// filter: blur() support the frames drop the filter, leaving opacity and scale.
//
// STAGE. aspect-ratio 3000 / 1131 (the tallest image) from constants, so it has its shape before
// any image loads; shorter cards leave band background below them. contain: paint keeps the
// scaled cards' repaints inside it. The whole stage is one real button that enlarges the state
// showing; the image's alt text is attached as its description.
import { useEffect, useId, useRef } from 'react'
import { useLightbox } from '@/components/Lightbox'
import { useStateAutoplay, TRANSITION_MS, EASE_OUT } from './useStateAutoplay'
import { Controls, ring } from './Controls'
import { states, IMAGE_WIDTH, TALLEST } from './states'

type Frame = { opacity: number; transform: string; filter?: string }

const OUT: Frame[] = [
  { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' },
  { opacity: 0, transform: 'scale(0.985)', filter: 'blur(10px)' },
]
const IN: Frame[] = [
  { opacity: 0, transform: 'scale(1.015)', filter: 'blur(10px)' },
  { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' },
]

export function OptionA1() {
  const autoplay = useStateAutoplay({ count: states.length })
  const { active, reduced, stageProps, pause } = autoplay
  const lightbox = useLightbox()
  const idBase = useId()
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const shown = useRef(active)

  useEffect(() => {
    const from = shown.current
    shown.current = active
    if (from === active || reduced) return
    const blur = CSS.supports('filter', 'blur(1px)')
    const strip = (frames: Frame[]) => (blur ? frames : frames.map(({ filter, ...f }) => f))
    const running: Animation[] = []
    for (const [el, frames] of [
      [cards.current[from], OUT],
      [cards.current[active], IN],
    ] as const) {
      if (!el) continue
      el.style.willChange = blur ? 'opacity, transform, filter' : 'opacity, transform'
      const anim = el.animate(strip([...frames]), { duration: TRANSITION_MS, easing: EASE_OUT })
      const clear = () => {
        el.style.willChange = ''
      }
      anim.finished.then(clear, clear)
      running.push(anim)
    }
    return () => running.forEach((a) => a.cancel())
  }, [active, reduced])

  const current = states[active]

  return (
    <div data-anim-option="A1">
      <Controls states={states} autoplay={autoplay} mode="tabs" idBase={idBase} />
      <div
        {...stageProps}
        id={`${idBase}-panel`}
        role="tabpanel"
        aria-labelledby={`${idBase}-tab-${active}`}
        aria-live="off"
        data-stage=""
        className="mt-6"
      >
        <button
          type="button"
          aria-label={`Enlarge: ${current.label} state`}
          aria-describedby={`${idBase}-img-${active}`}
          onClick={(e) => {
            pause()
            lightbox.open({ src: current.src, alt: current.alt }, e.currentTarget)
          }}
          className={`block w-full cursor-zoom-in rounded-lg border-0 bg-transparent p-0 text-left ${ring}`}
        >
          <div
            className="relative w-full"
            style={{ aspectRatio: `${IMAGE_WIDTH} / ${TALLEST}`, contain: 'paint' }}
          >
            {states.map((state, i) => {
              const on = i === active
              return (
                <div
                  key={state.id}
                  ref={(el) => {
                    cards.current[i] = el
                  }}
                  aria-hidden={on ? undefined : true}
                  className={`absolute inset-x-0 top-0 origin-top overflow-hidden rounded-lg border border-border ${
                    on ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ aspectRatio: `${IMAGE_WIDTH} / ${state.height}` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    id={`${idBase}-img-${i}`}
                    src={state.src}
                    alt={state.alt}
                    decoding="async"
                    className="block h-full w-full object-contain object-top"
                  />
                </div>
              )
            })}
          </div>
        </button>
      </div>
    </div>
  )
}
