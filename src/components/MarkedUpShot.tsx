'use client'
// A screenshot marked up by hand (the Acentra audit): ginger rings round the evidence and Caveat notes beside them,
// drawn on once when the shot scrolls into view. Coordinates are in the image's own pixels.
import { useEffect, useRef, useState } from 'react'
import { Develop } from './Develop'

export type Ring = { cx: number; cy: number; rx: number; ry: number }
export type Note = { x: number; y: number; text: string; arrow?: [number, number, number, number] }

// a loose, hand-drawn ellipse: starts at the left, goes round once and overshoots a little
function ringPath({ cx, cy, rx, ry }: Ring) {
  const k = 0.5523
  const a = rx * 1.04
  const b = ry * 1.1
  return [
    `M ${cx - a} ${cy + b * 0.12}`,
    `C ${cx - a} ${cy - b * k}, ${cx - a * k} ${cy - b}, ${cx} ${cy - b}`,
    `C ${cx + a * k} ${cy - b * 1.02}, ${cx + a} ${cy - b * k}, ${cx + a} ${cy - b * 0.04}`,
    `C ${cx + a} ${cy + b * k}, ${cx + a * k} ${cy + b * 0.96}, ${cx} ${cy + b * 0.96}`,
    `C ${cx - a * k} ${cy + b * 0.96}, ${cx - a * 0.96} ${cy + b * k}, ${cx - a * 0.94} ${cy - b * 0.2}`,
    `C ${cx - a * 0.9} ${cy - b * 0.6}, ${cx - a * 0.7} ${cy - b * 0.92}, ${cx - a * 0.42} ${cy - b * 1.08}`,
  ].join(' ')
}

export function MarkedUpShot({ src, alt, w, h, rings, notes, delay = 0 }: { src: string; alt: string; w: number; h: number; rings: Ring[]; notes: Note[]; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className="cs-markup relative overflow-hidden rounded-xl bg-[#2c2c2c]" data-on={on || undefined} style={{ ['--d' as string]: `${delay + 900}ms` }}>
      {/* the screenshot develops first; the pen marks wait 900ms for it */}
      <Develop delay={delay}>
        <img src={src} alt={alt} width={w} height={h} className="block h-auto w-full" />
      </Develop>
      <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        {rings.map((r, i) => (
          <path key={i} d={ringPath(r)} pathLength={1} className="cs-ring" style={{ animationDelay: `calc(var(--d) + ${i * 260}ms)` }} />
        ))}
        {notes.map((n, i) => (
          <g key={i} className="cs-mark-note" style={{ animationDelay: `calc(var(--d) + ${rings.length * 260 + 200 + i * 200}ms)` }}>
            {n.arrow && <path d={`M ${n.arrow[0]} ${n.arrow[1]} Q ${(n.arrow[0] + n.arrow[2]) / 2 + 14} ${(n.arrow[1] + n.arrow[3]) / 2 - 14}, ${n.arrow[2]} ${n.arrow[3]}`} className="cs-arrow" />}
            <text x={n.x} y={n.y}>{n.text}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
