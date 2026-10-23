'use client'
import type { WindowProps } from './types'
import './w1.css'

/* TEMPORARY — /explore window variant 1: the arched window.
   An elliptical arch with a slim frame, a fanlight (hub, three radiating bars and a transom at
   the springline) and a shallow sill. The painting is 2:1; the glass is 1.45:1, so the loop is
   drawn wider than the glass and cropped evenly at the sides (Michael stays left of centre, the
   dog still runs in from the right). The fanlight sits in the sky, above Michael's head, so the
   bars never cross a figure. Nothing moves here, so there is no reduced-motion path to add.

   Glazing is one SVG in a 100x100 box stretched over the glass; strokes do not scale, so the bars
   stay the same weight at every size. Geometry: springline at 38% of the glass height (matches
   the CSS radius), hub a concentric ellipse at 28% of the width. */

const RISE = 38
const HUB = 0.28
// a point on the arch ellipse (rx 50, ry RISE) at angle a, scaled by k
const at = (deg: number, k = 1) => {
  const a = (deg * Math.PI) / 180
  return `${(50 + 50 * k * Math.cos(a)).toFixed(2)} ${(RISE - RISE * k * Math.sin(a)).toFixed(2)}`
}
const spokes = [45, 90, 135].map((d) => `M${at(d, HUB)} L${at(d)}`).join(' ')
const fanlight = `M0 ${RISE} H100 M${at(180, HUB)} A${50 * HUB} ${RISE * HUB} 0 0 1 ${at(0, HUB)} ${spokes}`
const outline = `M0 100 V${RISE} A50 ${RISE} 0 0 1 100 ${RISE} V100 Z`

export default function W1({ direction, children }: WindowProps) {
  const hand = direction === 'c'
  return (
    <div className={`w1 w1-${direction}`}>
      <div className="w1-window">
        <div className="w1-glass">
          <div className="w1-scene">{children}</div>
        </div>
        <svg className="w1-bars" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          {direction === 'b' && <path className="w1-bars-edge" d={fanlight} />}
          <path className="w1-bars-line" d={fanlight} />
          {hand && <path className="w1-bars-line w1-bars-outline" d={outline} />}
        </svg>
      </div>
      <div className="w1-sill" aria-hidden="true">
        {hand && (
          <svg viewBox="0 0 100 10" preserveAspectRatio="none" focusable="false">
            <path d="M1 1.5 H99 V8.5 H1 Z" />
          </svg>
        )}
      </div>
      {hand && (
        <svg width="0" height="0" className="w1-defs" aria-hidden="true" focusable="false">
          <filter id="w1-marker" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="1" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="3" />
          </filter>
        </svg>
      )}
    </div>
  )
}
