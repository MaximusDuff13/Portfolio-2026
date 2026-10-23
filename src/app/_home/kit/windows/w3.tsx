'use client'
import { useId } from 'react'
import type { WindowProps } from './types'
import './w3.css'

/* Window variant 3 · Hong Kong flat window.
   The loop seen from a high-rise flat: a slim aluminium sliding window in a deep reveal, a
   ledge with a pot of lucky bamboo, a crescent latch on the meeting stile. One frame and a
   single mid-window stile; the front sash is slid over the back one, so the right of the view (where the dog
   runs in) is open glass-free and the left is seen through two panes.

   The sashes are one SVG laid over the loop in the loop's own 2:1 space (1000 x 500 units),
   so the frame scales with the painting. It never touches the figures' opacity: glass is a
   faint tint laid over the painting, and nothing sits over Michael's face or the dog's sit
   spot (the meeting stile at 49–51% of the width, the dog sits near 37–44%).

   Motion, one moment: the front sash slides open when the loop starts playing (A, C) or on
   load (B, which plays from the start). Reduced motion: the sash is simply open. */

// geometry, in units of the 1000 x 500 loop
const F = 20 // outer frame
const FB = 30 // bottom rail
const S = 18 // sash band
const LAP = 3 // the frame's inner lip, which hides the sashes' outer edges
const TOP = F
const BOT = 500 - FB
// Only one frame is drawn. Each sash is glass plus a single stile: the back sash's meeting
// stile stands mid-window; the front sash's stile tucks under the frame's left side while
// it is open, and meets the back one when it slides shut (a CSS translate of +504).
const MEET = 491 // the back sash's meeting stile
const FRONT = { x0: 5, x1: 496 } // drawn open

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

              {/* front sash, slid over the back one */}
              <g className="w3-front">
                <rect className="w3-pane" x={F} y={TOP} width={FRONT.x1 - F} height={BOT - TOP} />
                <polygon className="w3-glint" fill={`url(#${glint})`} points={`400,${TOP} 460,${TOP} 370,${TOP + 112} 340,${TOP + 112}`} />
                <polygon className="w3-glint" fill={`url(#${glint})`} points={`476,${TOP} 486,${TOP} 430,${TOP + 78} 420,${TOP + 78}`} />
                <rect className="w3-sash" x={FRONT.x0} y={TOP} width={S} height={BOT - TOP} />
                {direction === 'b' && (
                  <g className="w3-select">
                    <rect x={F} y={TOP} width={FRONT.x1 - F} height={BOT - TOP} />
                    {[
                      [F, TOP],
                      [FRONT.x1, TOP],
                      [F, BOT],
                      [FRONT.x1, BOT],
                    ].map(([x, y]) => (
                      <rect key={`${x}-${y}`} className="w3-handle" x={x - 7} y={y - 7} width={14} height={14} />
                    ))}
                  </g>
                )}
              </g>

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
