'use client'
import { isValidElement, useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'
import type { Direction, WindowProps } from './types'
import './w4.css'

/* TEMPORARY — /explore window variant 4: shutters that open.
   The loop sits behind a pair of shutters. They open once, when the loop is first allowed to
   play and the window is in view (A and C: after the page resolves; B: on load), then rest
   folded back into the frame's side reveals, beside the glass, never over it. The story is the
   page's own: noise, cleanup, then the clear view.

   No layout shift: the frame's padding is static and the leaves are absolute overlays inside
   it. Only the leaves move (a rotateY about the outer hinge, plus their own shading). The
   loop's pause control stays above the leaves at every moment. Reduced motion: the leaves are
   drawn open from the first paint (CSS media query), with no transition. */

const DELAY: Record<Direction, number> = { a: 450, b: 300, c: 500 }
// how long the open runs, so B can drop its "animating" outline when it ends
const DURATION: Record<Direction, number> = { a: 1500, b: 700, c: 1400 }

export default function W4({ direction, children }: WindowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduced = useReducedMotionSafe()
  // The pages decide when the loop may play; the shutters follow the same cue.
  const playing = isValidElement(children) ? (children.props as { playing?: boolean }).playing !== false : true

  const [state, setState] = useState<'closed' | 'opening' | 'open'>('closed')

  useEffect(() => {
    if (state !== 'closed') return
    if (reduced) {
      setState('open')
      return
    }
    if (!playing || !inView) return
    const id = window.setTimeout(() => setState('opening'), DELAY[direction])
    return () => window.clearTimeout(id)
  }, [state, reduced, playing, inView, direction])

  useEffect(() => {
    if (state !== 'opening') return
    const id = window.setTimeout(() => setState('open'), DURATION[direction] + 200)
    return () => window.clearTimeout(id)
  }, [state, direction])

  return (
    <div ref={ref} className={`w4 w4-${direction}`} data-state={state}>
      <div className="w4-glass">{children}</div>
      {direction === 'c' && <MarkerFrame />}
      <Leaf side="l" direction={direction} />
      <Leaf side="r" direction={direction} />
    </div>
  )
}

function Leaf({ side, direction }: { side: 'l' | 'r'; direction: Direction }) {
  return (
    <div className="w4-leaf" data-side={side} aria-hidden="true">
      <div className="w4-face">
        {direction === 'c' && <PaperLouvres />}
        <span className="w4-pull" />
      </div>
    </div>
  )
}

/* C: louvres ruled by hand in marker, so each line wanders a little */
function PaperLouvres() {
  const rows = 11
  return (
    <svg className="w4-c-louvres" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path
        d="M9 6 L8.5 94 M91 5.5 L91.5 94.5"
        className="w4-c-stile"
        vectorEffect="non-scaling-stroke"
      />
      {Array.from({ length: rows }, (_, i) => {
        const y = 11 + i * 7.8
        const wob = ((i * 37) % 7) / 10 - 0.3
        return (
          <path
            key={i}
            d={`M13 ${y + wob} Q50 ${y - 0.9 + wob} 87 ${y + 0.4}`}
            vectorEffect="non-scaling-stroke"
          />
        )
      })}
    </svg>
  )
}

/* C: the window frame drawn round the photo in marker, slightly off-square */
function MarkerFrame() {
  return (
    <svg className="w4-c-frame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0.6 1.2 C30 0.4 70 1.6 99.4 0.7 C99.8 30 99.1 70 99.5 99.2 C70 99.8 30 98.9 0.4 99.5 C0.9 70 0.2 30 0.6 1.2 Z"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
