'use client'
// ShippedConnectors — hand-drawn lines from the concepts the shipped design borrowed from, down to
// the shipped screenshot.
//
// NEW COMPONENT. Rendered inside the wrapper that holds the concept row and the shipped
// screenshot; that wrapper is the coordinate space. The source frames are found by their
// data-concept-frame (set by ConceptRow, one per concept title) and the target by data-shipped,
// both inside the wrapper, so no position is hard-coded: every endpoint comes from
// getBoundingClientRect and is recomputed on mount, when the wrapper or any of the three frames
// changes size (images loading, fonts swapping, breakpoints), on window resize, and once each
// image has loaded.
//
// ENDPOINTS. Each line starts at the bottom centre of its source frame and ends at the top edge
// of the screenshot, at the centre of the screenshot. The lines converge there: the shipped design
// is one screen that took from both.
//
// HAND-DRAWN LOOK. A cubic bezier per line, bent so it leaves each frame heading straight down and
// arrives at the screenshot heading straight down, then roughened by an SVG filter
// (feTurbulence → feDisplacementMap). No sketch library: the filter is plain SVG.
//
// COLOUR. foundation-400 on the foundation-800 band, 6.01:1 — clear, and well away from
// accent-warm. foundation-500 would be quieter, but at 3.16:1 it only just clears the 3:1 minimum
// for a graphic that carries meaning, too thin a margin for a 1.5px line the filter roughens.
//
// BREAKPOINTS. md and up only. Below md the concepts and the screenshot stack in one column, the
// reading order already carries the flow, and no paths are rendered at all.
//
// INTERACTION. pointer-events: none, so the lines never block the lightbox triggers under them.
import { useCallback, useEffect, useId, useRef, useState } from 'react'

type Point = { x: number; y: number }
type Line = { from: Point; to: Point }

const MD = '(min-width: 768px)'

export function ShippedConnectors({ from }: { from: string[] }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [lines, setLines] = useState<Line[]>([])
  const filterId = useId().replace(/:/g, '')

  const measure = useCallback(() => {
    const svg = svgRef.current
    const wrap = svg?.parentElement
    if (!svg || !wrap) return
    if (!window.matchMedia(MD).matches) {
      setLines([])
      return
    }
    const origin = wrap.getBoundingClientRect()
    const target = wrap.querySelector<HTMLElement>('[data-shipped]')?.getBoundingClientRect()
    if (!target) return
    const to = { x: target.left + target.width / 2 - origin.left, y: target.top - origin.top }
    setLines(
      from.flatMap((title) => {
        const frame = wrap.querySelector<HTMLElement>(`[data-concept-frame="${CSS.escape(title)}"]`)
        if (!frame) return []
        const r = frame.getBoundingClientRect()
        return [{ from: { x: r.left + r.width / 2 - origin.left, y: r.bottom - origin.top }, to }]
      }),
    )
  }, [from])

  useEffect(() => {
    const svg = svgRef.current
    const wrap = svg?.parentElement
    if (!wrap) return
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(wrap)
    wrap.querySelectorAll('[data-concept-frame], [data-shipped]').forEach((el) => observer.observe(el))
    const images = Array.from(wrap.querySelectorAll('img'))
    images.forEach((img) => img.addEventListener('load', measure))
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      images.forEach((img) => img.removeEventListener('load', measure))
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      data-connectors=""
      className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
    >
      <defs>
        {/* userSpaceOnUse with a generous region: the default filter box is the path's own bounding
            box, which clips the displaced stroke on near-vertical lines. */}
        <filter id={filterId} filterUnits="userSpaceOnUse" x="-2000" y="-2000" width="8000" height="8000">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      {lines.map(({ from: a, to: b }, i) => {
        const bend = (b.y - a.y) * 0.55
        return (
          <path
            key={i}
            d={`M ${a.x} ${a.y} C ${a.x} ${a.y + bend}, ${b.x} ${b.y - bend}, ${b.x} ${b.y}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            filter={`url(#${filterId})`}
            className="text-foundation-400"
          />
        )
      })}
    </svg>
  )
}
