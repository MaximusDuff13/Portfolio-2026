'use client'
// A hand-drawn ring round a word, in the page's ginger, drawn on once when it scrolls into view
// (the 03 decision in the Acentra case study). Sits absolutely over its relative parent.
import { useEffect, useRef, useState } from 'react'

export function PenRing({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <svg ref={ref} viewBox="0 0 220 90" preserveAspectRatio="none" aria-hidden="true" data-on={on || undefined} className={`cs-pen-ring ${className}`}>
      <path pathLength={1} d="M12 52 C 10 22, 70 6, 118 8 C 172 10, 214 26, 210 48 C 206 74, 150 86, 104 84 C 52 82, 8 70, 14 40 C 18 24, 40 14, 66 10" />
    </svg>
  )
}
