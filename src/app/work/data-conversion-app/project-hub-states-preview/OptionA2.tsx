'use client'
// OPTION A2 — spotlight grid. All four states visible in the shared 2x2 grid; a spotlight moves
// through them. The spotlit card is plain; the other three sit back at 0.4 opacity, 3px blur and
// 0.985 scale. CSS transitions, 500ms ease-out, between those two resting looks; will-change only
// while a change is under way. Without filter: blur() support the blur is simply not applied.
//
// Hovering or focusing a card spotlights it (and, being inside the stage, pauses autoplay);
// leaving resumes from that card. Every card is always readable, so none is aria-hidden, and the
// pills are aria-pressed toggles rather than tabs. Clicking any card enlarges it.
//
// REDUCED MOTION. All four sharp and static: the motion-reduce overrides win over the inline
// spotlight styles even before the hook has read the preference.
import { useId } from 'react'
import { useLightbox } from '@/components/Lightbox'
import { useStateAutoplay, TRANSITION_MS, EASE_OUT } from '@/components/useStateAutoplay'
import { Controls, ring } from '@/components/StateControls'
import { states, IMAGE_WIDTH } from './states'
import { gridClass, frameRatio } from './grid'

const transition = ['opacity', 'transform', 'filter'].map((p) => `${p} ${TRANSITION_MS}ms ${EASE_OUT}`).join(', ')

export function OptionA2() {
  const autoplay = useStateAutoplay({ count: states.length })
  const { active, spotlight, pause, transitioning, stageProps } = autoplay
  const lightbox = useLightbox()
  const idBase = useId()

  return (
    <div data-anim-option="A2">
      <Controls states={states} autoplay={autoplay} mode="toggles" idBase={idBase} />
      <div {...stageProps} data-stage="" className={`-mx-1 -mb-1 mt-5 p-1 ${gridClass}`} style={{ contain: 'paint' }}>
        {states.map((state, i) => {
          const lit = i === active
          return (
            <div
              key={state.id}
              data-card={state.id}
              onMouseEnter={() => spotlight(i)}
              onFocus={() => spotlight(i)}
              className="relative motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:![filter:none] motion-reduce:!transition-none supports-[filter:blur(0)]:[filter:var(--ph-blur)]"
              style={
                {
                  opacity: lit ? 1 : 0.4,
                  transform: lit ? 'scale(1)' : 'scale(0.985)',
                  '--ph-blur': lit ? 'blur(0px)' : 'blur(3px)',
                  transition,
                  willChange: transitioning ? 'opacity, transform, filter' : undefined,
                } as React.CSSProperties
              }
            >
              <div
                data-frame=""
                className="relative overflow-hidden rounded-lg border border-border"
                style={{ aspectRatio: frameRatio(i) }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={state.src}
                  alt={state.alt}
                  decoding="async"
                  className="absolute inset-x-0 top-0 block w-full"
                  style={{ aspectRatio: `${IMAGE_WIDTH} / ${state.height}` }}
                />
              </div>
              <button
                type="button"
                aria-label={`Enlarge: ${state.label} state`}
                onClick={(e) => {
                  pause()
                  lightbox.open({ src: state.src, alt: state.alt }, e.currentTarget)
                }}
                className={`absolute inset-0 block h-full w-full cursor-zoom-in rounded-lg border-0 bg-transparent p-0 ${ring}`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
