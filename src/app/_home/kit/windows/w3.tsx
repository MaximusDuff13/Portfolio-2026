'use client'
import { useId } from 'react'
import type { WindowProps } from './types'
import './w3.css'

/* Window variant 3 · Hong Kong flat window.
   The loop seen from a high-rise flat: a slim aluminium window in a deep reveal, a ledge with
   the things Michael keeps there (his family's photo and his Bible), a crescent latch on the
   meeting stile. One frame and one sash: the
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

      {/* What Michael keeps on the ledge: a photo of his family and his Bible standing beside
          it. Low and in the corner, clear of him in the painting. */}
      <svg className="w3-keepsakes" viewBox="0 0 58 70" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={`w3-photo-${uid}`}>
            <rect x="7" y="33" width="18" height="24" rx="0.5" />
          </clipPath>
        </defs>
        {/* the family photo in a wooden frame, propped on its stand */}
        <g className="w3-photo">
          <path className="w3-stand" d="M23 40 30 68" />
          <rect className="w3-frame-wood" x="3" y="29" width="26" height="39" rx="1.5" />
          <rect className="w3-mat" x="6" y="32" width="20" height="26" />
          <g clipPath={`url(#w3-photo-${uid})`}>
            {/* stand-in picture until the real photo is in: a family, sky behind them */}
            <rect className="w3-pic-sky" x="7" y="33" width="18" height="24" />
            <rect className="w3-pic-ground" x="7" y="50" width="18" height="7" />
            <circle className="w3-pic-person" cx="11.5" cy="41" r="2.4" />
            <path className="w3-pic-person" d="M7.8 57c0-6 1.6-11.6 3.7-11.6s3.7 5.6 3.7 11.6Z" />
            <circle className="w3-pic-person w3-pic-b" cx="19.5" cy="40.4" r="2.5" />
            <path className="w3-pic-person w3-pic-b" d="M15.6 57c0-6.4 1.7-12 3.9-12s3.9 5.6 3.9 12Z" />
            <circle className="w3-pic-person w3-pic-c" cx="15.6" cy="47" r="1.7" />
            <path className="w3-pic-person w3-pic-c" d="M13.2 57c0-4 1.1-7.6 2.4-7.6s2.4 3.6 2.4 7.6Z" />
          </g>
          <rect className="w3-frame-sheen" x="6" y="32" width="20" height="26" />
        </g>
        {/* the Bible, standing, cover out: dark leather, the gilt page edge, a gold cross, the
            ribbon hanging below */}
        <g className="w3-bible">
          <rect className="w3-bible-pages" x="51" y="39.5" width="3" height="27.5" rx="0.6" />
          <rect className="w3-bible-cover" x="34" y="38" width="18.5" height="30" rx="1.6" />
          <path className="w3-bible-spine-line" d="M36.6 39v28" />
          <path className="w3-bible-cross" d="M44 44.5v12.5M40.2 48.6h7.6" />
          <path className="w3-bible-ribbon" d="M49 66.5c.6 1.4.4 2.4-.4 3" />
        </g>
      </svg>
    </div>
  )
}
