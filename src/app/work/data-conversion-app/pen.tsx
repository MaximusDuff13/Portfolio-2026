'use client'
import { useEffect, useRef, useState } from 'react'

/* The case study's hand-drawn pen, shared by the Problem flow and the MVP focus drawing (Nov 24
   2026). Same pen as Doodles.tsx: round caps, a touch of wobble from a displacement filter, each
   line draws itself in (cs-ring from case-study.css) once on screen. Dark ink for plain lines,
   ginger ink only where the drawing wants your eye. */

export const INK = '#44403c' // foundation-700-ish: the plain steps
export const HOT = '#b15900' // ginger, same as the hero doodles: the costly bits

export function useOnScreen<T extends Element>() {
  const ref = useRef<T>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, on] as const
}

export function Wobble({ id }: { id: string }) {
  return (
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" />
      <feDisplacementMap in="SourceGraphic" scale="2.4" />
    </filter>
  )
}

/* One stroked path that draws itself in. */
export function Stroke({ d, ink = INK, w = 2.4, delay = 0, dash }: { d: string; ink?: string; w?: number; delay?: number; dash?: boolean }) {
  return (
    <path
      d={d}
      pathLength={1}
      className="cs-ring"
      style={{
        stroke: ink,
        strokeWidth: w,
        fill: 'none',
        strokeLinejoin: 'round',
        animationDelay: `${delay}ms`,
        ...(dash ? { strokeDasharray: '0.012 0.014', strokeDashoffset: 0, animation: 'none' } : {}),
      }}
    />
  )
}
