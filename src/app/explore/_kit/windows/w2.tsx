'use client'
import type { WindowProps } from './types'
import './w2.css'

/* TEMPORARY — /explore window variant 2: a casement window.

   A fixed transom light across the top (two panes) over a pair of casements that meet in the
   middle, a frame with depth around it and a sill below: looking out from a room.

   The glazing is an overlay on top of the loop, never a mask, so the painting runs on behind the
   bars like a real view. Bars are placed against the painting's figures (loopCrop.json): Michael
   and the dog's sit sit at 17–40% across and 43–82% down the window, so the transom sits at 30%
   and the meeting stiles at 50%; the dog runs in through the right casement and passes behind
   the stiles. Nothing here changes a figure's opacity, and nothing moves.

   A, B: bars are drawn in CSS. C: the bars are marker on paper strips, so they are one SVG
   (vector-effect keeps the marker width fixed while the window scales). */

export default function W2({ direction, children }: WindowProps) {
  return (
    <div className={`w2 w2-${direction}`}>
      <div className="w2-case">
        <div className="w2-view">
          {children}
          {direction === 'c' ? <PaperGlazing /> : <Glazing />}
        </div>
      </div>
      <div className="w2-sill" aria-hidden="true">
        {direction === 'c' && <PaperSill />}
      </div>
    </div>
  )
}

function Glazing() {
  return (
    <div className="w2-glazing" aria-hidden="true">
      <span className="w2-sheen" />
      <span className="w2-sash w2-sash-l" />
      <span className="w2-sash w2-sash-r" />
      <span className="w2-sash w2-sash-t" />
      <span className="w2-transom" />
      <span className="w2-muntin" />
      <span className="w2-stile" />
      <span className="w2-handle">
        <span />
      </span>
    </div>
  )
}

/* C · paper strips with a marker edge. 200 x 100 units = the window's 2:1. Each strip is a
   slightly uneven quad so it reads as torn and stuck down by hand, not drawn by a tool. */
function PaperGlazing() {
  return (
    <svg className="w2-paper" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
      {/* outer frame: the polaroid's paper carries on a little into the photo, edged in marker */}
      <path className="w2-band" d="M-1 -1 H201 V101 H-1 Z M3.6 4.1 C60 3.4 140 4.4 196.3 3.7 L196.6 96.2 C130 96.8 70 95.9 3.4 96.4 Z" />
      <path className="w2-ink" d="M3.6 4.1 C60 3.4 140 4.4 196.3 3.7 L196.6 96.2 C130 96.8 70 95.9 3.4 96.4 Z" />
      {/* transom strip */}
      <path className="w2-strip" d="M2.2 27.6 C70 26.9 130 28.3 197.8 27.4 L197.9 32.2 C130 32.9 70 31.8 2.1 32.6 Z" />
      {/* meeting stiles: one strip from the transom down */}
      <path className="w2-strip" d="M97.6 2.6 L102.3 2.9 C102.1 40 102.6 70 102.4 97.6 L97.4 97.3 C97.7 70 97.2 40 97.6 2.6 Z" />
      {/* a marker line down the middle of the stiles, where the two casements meet */}
      <path className="w2-ink w2-ink-thin" d="M100.1 32.6 C100 55 100.2 75 100 97" />
      {/* handle: a backplate and a lever turned down, in marker red, on the right casement */}
      <path className="w2-mark" d="M104.8 56.6 L104.9 64.8 M104.9 58.4 C106.4 61.6 107.4 65 107.9 69.4" />
    </svg>
  )
}

function PaperSill() {
  return (
    <svg viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true">
      <path className="w2-strip" d="M0.6 1.4 C60 0.6 140 1.6 199.4 0.9 L198.6 8.8 C130 9.4 70 8.5 1.4 9.1 Z" />
      <path className="w2-ink w2-ink-thin" d="M3 5.2 C60 4.8 140 5.6 197 5" />
    </svg>
  )
}
