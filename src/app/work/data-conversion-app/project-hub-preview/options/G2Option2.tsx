// GROUP 2, OPTION 2 — left-to-right timeline: a dashed line with a step marker above each shot.
//
// The marks are the live Mapping & transformation connectors' own (ShippedConnectors): a 2.5px
// line dashed 5 2, and open rings r 10 with a 2px stroke, filled with the ground so each reads as
// an outline. Colour is the light-band connector tone, foundation-500 (4.61:1 on the page ground),
// ring fill `fill-body`.
//
// ALIGNMENT. The three columns have no gap; each carries px-3 instead, so every column's centre
// sits at exactly 1/6, 3/6 and 5/6 of the row, and the markers are placed at those percentages in
// the SVG — no measuring. The row is pulled out by -mx-3 so the outer frames still meet the wrap's
// edges. From lg it takes the concept row's wide breakout.
//
// Below md the steps stack; a horizontal timeline means nothing there, so it is hidden.
import { LightboxProvider } from '@/components/Lightbox'
import { sequence } from '../shots'
import { Shot } from '../Shot'

const CENTRES = ['16.6667%', '50%', '83.3333%']

export function G2Option2() {
  return (
    <LightboxProvider>
      <div className="lg:ml-[calc(50%-min(900px,50vw-80px))] lg:w-[min(1800px,calc(100vw-160px))]">
        <div className="md:-mx-3">
          <svg aria-hidden="true" data-timeline="" className="hidden h-6 w-full overflow-visible text-foundation-500 md:block">
            <line
              x1={CENTRES[0]}
              x2={CENTRES[2]}
              y1="12"
              y2="12"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeDasharray="5 2"
            />
            {CENTRES.map((cx) => (
              <circle key={cx} cx={cx} cy="12" r="10" stroke="currentColor" strokeWidth={2} className="fill-body" />
            ))}
          </svg>
          <ol className="m-0 grid list-none grid-cols-1 gap-y-10 p-0 md:mt-6 md:grid-cols-3 md:gap-y-0">
            {sequence.map(({ label, shot }) => (
              <li key={label} className="min-w-0 md:px-3">
                <Shot shot={shot} label={label} sizes="(min-width: 768px) 33vw, 100vw" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </LightboxProvider>
  )
}
