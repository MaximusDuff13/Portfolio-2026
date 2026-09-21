// PriorityPyramid — the MVP scope decision, drawn as a four-tier pyramid.
//
// NEW COMPONENT. Replaces PriorityLayers. The pyramid says what a stack of bars could not:
// the tiers below the cut are the base everything else would have stood on, and the ones above
// taper away because they were the first thing scope pressure took.
//
// THE GEOMETRY IS FIXED FOR EXACTLY FOUR TIERS, with the cut between tier 2 and tier 3. It is
// deliberately not generalised — the coordinates below are hand-placed, and a fifth tier would
// need all of them redrawn rather than a loop.
//
// TWO VARIANTS, one card. From xl the pyramid sits beside a column of leader-line labels; below
// xl there is no room for leaders, so the pyramid stands alone above a plain legend. Both SVGs
// are aria-hidden and purely decorative: every word is in the HTML around them, so a screen
// reader gets the full content and none of the drawing.
//
// CONTRAST. The above-label is foundation-600, not the foundation-500 the spec named. On
// FigureCard's foundation-100 ground foundation-500 measures 4.40:1, under AA's 4.5:1 for text
// this size; foundation-600 measures 6.99:1. The same substitution FigureCard and
// ProcessTimeline already make. The SVG keeps stroke-foundation-500 as specified — that is a
// graphic, where 3:1 applies and 4.40 clears it.
import { Fragment } from 'react'
import { FigureCard } from './FigureCard'

export type PyramidTier = {
  label: string
  mvp?: boolean
}

/** Exactly four, top to bottom. */
export type PyramidTiers = [PyramidTier, PyramidTier, PyramidTier, PyramidTier]

// Local coordinates, shared by both variants. Variant 1 draws them inside translate(90 0).
const FRONT = [
  '160,35 122.5,95 197.5,95',
  '122.5,95 197.5,95 235,155 85,155',
  '85,155 235,155 272.5,215 47.5,215',
  '47.5,215 272.5,215 310,275 10,275',
]

const SIDE = [
  '160,35 197.5,95 237.5,70 200,10',
  '197.5,95 235,155 275,130 237.5,70',
  '235,155 272.5,215 312.5,190 275,130',
  '272.5,215 310,275 350,250 312.5,190',
]

/** Where each tier's leader starts, in local coordinates. */
const DOTS = [
  { x: 227, y: 52.5 },
  { x: 264, y: 112.5 },
  { x: 301.5, y: 172.5 },
  { x: 339, y: 232.5 },
]

/** Each tier's dot as a percentage of the drawing's height, so the HTML labels line up. */
const TIER_TOP = ['18.42%', '39.47%', '60.53%', '81.58%']

/** The cut sits on the tier 2 / tier 3 boundary. */
const CUT_TOP = '54.39%'

function fillFor(tier: PyramidTier) {
  return tier.mvp ? 'fill-accent-subtle' : 'fill-body'
}

/** The solid body of the pyramid. The side faces carry a flat overlay instead of a gradient,
 *  which is what reads as a turned surface without introducing a shadow. */
function Faces({ tiers }: { tiers: PyramidTiers }) {
  return (
    <>
      {FRONT.map((points, i) => (
        <polygon
          key={`front-${i}`}
          points={points}
          strokeWidth={1}
          strokeLinejoin="round"
          className={`stroke-foundation-500 ${fillFor(tiers[i])}`}
        />
      ))}
      {SIDE.map((points, i) => (
        <g key={`side-${i}`}>
          <polygon
            points={points}
            strokeWidth={1}
            strokeLinejoin="round"
            className={`stroke-foundation-500 ${fillFor(tiers[i])}`}
          />
          <polygon points={points} stroke="none" className="fill-foundation-900/15" />
        </g>
      ))}
    </>
  )
}

export function PriorityPyramid({
  title,
  tiers,
  aboveLabel,
  belowLabel,
}: {
  title: string
  tiers: PyramidTiers
  aboveLabel: string
  belowLabel: string
}) {
  return (
    <FigureCard title={title}>
      {/* ---------- Variant 1: xl and up. Pyramid with leader lines. ---------- */}
      <div className="hidden xl:grid xl:grid-cols-[minmax(0,1fr)_220px]">
        <div className="relative">
          <svg
            aria-hidden="true"
            viewBox="0 0 450 285"
            className="h-auto w-full"
          >
            <g transform="translate(90 0)">
              <Faces tiers={tiers} />
              {DOTS.map((d, i) => (
                <g key={`lead-${i}`}>
                  <line
                    x1={d.x}
                    y1={d.y}
                    x2={360}
                    y2={d.y}
                    strokeWidth={1}
                    className="stroke-foundation-400"
                  />
                  <circle cx={d.x} cy={d.y} r={2} className="fill-foundation-500" />
                </g>
              ))}
            </g>

            {/* Root coordinates, not the translated group: the cut runs in from the card's
                left edge and stops short of the pyramid's front-left corner at y=155. */}
            <line
              x1={0}
              y1={155}
              x2={165}
              y2={155}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeDasharray="5 4"
              className="text-accent-warm"
            />
          </svg>

          {/* The two cut labels, stacked either side of the dashed line. */}
          <p
            className="absolute left-0 w-[20%] -translate-y-full pb-1.5 font-sans text-caption text-foundation-600"
            style={{ top: CUT_TOP }}
          >
            {aboveLabel}
          </p>
          <p
            className="absolute left-0 w-[20%] pt-1.5 font-sans text-caption text-foundation-800"
            style={{ top: CUT_TOP }}
          >
            {belowLabel}
          </p>
        </div>

        {/* Every item is absolutely positioned, so the list has no in-flow height and takes
            the drawing's height from the grid row instead. */}
        <ol className="relative m-0 list-none p-0">
          {tiers.map((tier, i) => (
            <li
              key={tier.label}
              className="absolute left-0 right-0 flex -translate-y-[11px] items-start gap-3"
              style={{ top: TIER_TOP[i] }}
            >
              <span aria-hidden="true" className="mt-[11px] h-px w-5 shrink-0 bg-foundation-400" />
              <span className="block">
                <span className="block font-grotesk text-body font-medium leading-snug text-foundation-900">
                  {tier.label}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* ---------- Variant 2: below xl. Pyramid over a legend. ---------- */}
      <div className="xl:hidden">
        <svg aria-hidden="true" viewBox="0 0 360 285" className="mx-auto w-full max-w-[420px]">
          <Faces tiers={tiers} />
        </svg>

        <ol className="m-0 mt-8 flex list-none flex-col gap-y-4 p-0">
          {tiers.map((tier, i) => (
            <Fragment key={tier.label}>
              {/* The cut, as its own item so the two tier groups stay separate. */}
              {i === 2 && (
                <li className="my-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <span className="font-sans text-caption text-foundation-600">{aboveLabel}</span>
                  <span
                    aria-hidden="true"
                    className="border-t border-dashed border-accent-warm sm:flex-1"
                  />
                  <span className="font-sans text-caption text-foundation-800">{belowLabel}</span>
                </li>
              )}
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-1.5 h-3 w-3 shrink-0 rounded-sm border border-border ${
                    tier.mvp ? 'bg-accent-subtle' : 'bg-body'
                  }`}
                />
                <span className="block">
                  <span className="block font-grotesk text-body font-medium text-foundation-900">
                    {tier.label}
                  </span>
                </span>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </FigureCard>
  )
}
