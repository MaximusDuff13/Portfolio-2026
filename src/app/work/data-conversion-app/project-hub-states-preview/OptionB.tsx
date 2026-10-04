// OPTION B — static grid, the baseline. The shared 2x2 grid with no motion, no blur and no timers.
// A state label above each frame (label token, foundation-400 on foundation-800, 6.01:1), and
// every image enlarges through the existing LightboxTrigger. The intro label sits centred above the
// grid, and the grid is a group named by it.
import { useId } from 'react'
import { LightboxTrigger } from '@/components/Lightbox'
import { StatesIntro } from '@/components/StateControls'
import { states, IMAGE_WIDTH } from './states'
import { gridClass, frameRatio } from './grid'

export function OptionB() {
  const introId = `${useId()}-intro`
  return (
    <div data-static-option="B">
      <StatesIntro id={introId} />
      <div role="group" aria-labelledby={introId} className={gridClass}>
        {states.map((state, i) => (
          <div key={state.id} data-card={state.id}>
            <p className="mb-3 font-grotesk text-label uppercase tracking-widest text-foundation-400">{state.label}</p>
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
              <LightboxTrigger src={state.src} alt={state.alt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
