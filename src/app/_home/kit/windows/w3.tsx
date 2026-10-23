'use client'
import { useId } from 'react'
import type { WindowProps } from './types'
import './w3.css'

/* Window variant 3 · Hong Kong flat window.
   The loop seen from a high-rise flat: a slim aluminium window in a deep reveal, a ledge with
   a pot of lucky bamboo, a crescent latch on the meeting stile. One frame and one sash: the
   left of the view is seen through its glass, the right (where the dog runs in) is open. It
   doesn't move: the sliding front sash, and its open/shut moment, were taken out.

   The sash is one SVG laid over the loop in the loop's own 2:1 space (1000 x 500 units), so
   the frame scales with the painting. It never touches the figures' opacity: glass is a faint
   tint laid over the painting, and nothing sits over Michael's face or the dog's sit spot
   (the meeting stile at 49–51% of the width, the dog sits near 37–44%). */

// geometry, in units of the 1000 x 500 loop
const F = 20 // outer frame
const FB = 30 // bottom rail
const S = 18 // sash band
const LAP = 3 // the frame's inner lip, which hides the sashes' outer edges
const TOP = F
const BOT = 500 - FB
// One frame and one sash: glass on the left and the sash's meeting stile mid-window
const MEET = 491

export default function W3({ direction, children }: WindowProps) {
  const uid = useId().replace(/:/g, '')
  const glint = `w3-glint-${uid}`
  const wobble = `w3-wobble-${uid}`
  const hand = direction === 'c'

  return (
    <div className={`w3 w3-${direction}`}>
      <div className="w3-reveal">
        <div className="w3-glass">
          {children}
          <svg className="w3-sashes" viewBox="0 0 1000 500" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id={glint} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" className="w3-glint-a" />
                <stop offset="1" className="w3-glint-b" />
              </linearGradient>
              {hand && (
                <filter id={wobble} x="-2%" y="-2%" width="104%" height="104%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" />
                  <feDisplacementMap in="SourceGraphic" scale="3" />
                </filter>
              )}
            </defs>

            <g filter={hand ? `url(#${wobble})` : undefined}>
              {/* back sash, closed on the left: glass and its meeting stile */}
              <g className="w3-rear">
                <rect className="w3-pane" x={F} y={TOP} width={MEET - F} height={BOT - TOP} />
                <rect className="w3-sash" x={MEET} y={TOP} width={S} height={BOT - TOP} />
                {/* crescent latch on the meeting stile, its keeper slid away with the front sash */}
                <g className="w3-latch">
                  <rect x={MEET - 1} y={226} width={S + 2} height={40} rx={4} />
                  <path d={`M${MEET + S / 2} 236 a14 14 0 0 1 -14 -12`} className="w3-lever" />
                </g>
              </g>

              {/* the glint on the glass */}
              <polygon className="w3-glint" fill={`url(#${glint})`} points={`400,${TOP} 460,${TOP} 370,${TOP + 112} 340,${TOP + 112}`} />
              <polygon className="w3-glint" fill={`url(#${glint})`} points={`476,${TOP} 486,${TOP} 430,${TOP + 78} 420,${TOP + 78}`} />

              {/* the one outer frame, in front of both sashes */}
              <path className="w3-frame" fillRule="evenodd" d={`M0 0H1000V500H0Z M${F + LAP} ${F + LAP}V${BOT - LAP}H${1000 - F - LAP}V${F + LAP}Z`} />
            </g>
          </svg>
        </div>
      </div>

      <div className="w3-sill" aria-hidden="true" />

      {/* lucky bamboo on the ledge, the plant on half the window ledges in Hong Kong */}
      <svg className="w3-plant" viewBox="0 0 60 92" aria-hidden="true" focusable="false">
        <g filter={hand ? `url(#${wobble})` : undefined}>
          <path className="w3-stalk" d="M23 70V10" />
          <path className="w3-stalk" d="M31 70V24" />
          <path className="w3-stalk" d="M39 70V36" />
          <path className="w3-node" d="M20.5 30h5M20.5 50h5M28.5 44h5M36.5 54h5" />
          <path className="w3-leaf" d="M23 12c-6-5-13-5-17-2 5 4 11 5 17 2Z" />
          <path className="w3-leaf" d="M23 14c4-7 11-10 16-9-3 6-9 9-16 9Z" />
          <path className="w3-leaf" d="M31 26c-5-6-12-7-16-5 4 5 10 7 16 5Z" />
          <path className="w3-leaf" d="M39 38c5-5 12-6 16-4-4 5-10 6-16 4Z" />
          <path className="w3-leaf" d="M31 28c3-6 8-9 13-9-2 5-7 8-13 9Z" />
          <path className="w3-leaf" d="M39 40c-4-6-10-8-14-7 3 5 8 7 14 7Z" />
          <path className="w3-pot" d="M12 67h36l-3 21a3 3 0 0 1-3 2.6H18a3 3 0 0 1-3-2.6Z" />
          <path className="w3-pot-rim" d="M10 63.5h40a1 1 0 0 1 1 1V69a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-4.5a1 1 0 0 1 1-1Z" />
        </g>
      </svg>
    </div>
  )
}
