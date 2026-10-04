'use client'
// ShippedConnectors — dashed leader lines from the concepts the shipped design borrowed from, down
// to the shipped screenshot.
//
// NEW COMPONENT. Rendered inside the wrapper that holds the concept row and the shipped
// screenshot; that wrapper is the coordinate space. The source frames are found by their
// data-concept-frame (set by ConceptRow, one per concept title) and the target by data-shipped,
// both inside the wrapper, so no position is hard-coded: every endpoint comes from
// getBoundingClientRect and is recomputed on mount, when the wrapper or any of the three frames
// changes size (images loading, fonts swapping, breakpoints), on window resize, and once each
// image has loaded.
//
// DRAWING. Each connector is three pieces, all in the line colour:
//   · an open ring at the origin, tangent to the bottom centre of its source frame. It is the
//     wireframes' own open-ring mark — Review queue's unselected radio (r 6, 1.2 stroke), scaled
//     by 5/3 with the line (1.5 → 2.5px) — filled with the band colour so it reads as an outlined
//     dot, not a disc. The chevron is scaled by the same factor;
//   · a dashed cubic bezier from the bottom of the ring, leaving heading straight down and
//     arriving heading straight down, so the lines converge cleanly;
//   · an open chevron whose tip sits on the top edge of the screenshot, at its centre.
//
// COLOUR. Passed in, per band, from featureSurface(): foundation-400 on the dark band (6.01:1),
// well away from accent-warm.
//
// BREAKPOINTS. md and up only. Below md the concepts and the screenshot stack in one column, the
// reading order already carries the flow, and no paths are rendered at all.
//
// INTERACTION. pointer-events: none, so the lines never block the lightbox triggers under them.
//
// SHARED MARK. One connector's ring, line and chevron are drawn by `Connector`, exported so
// SequenceRow draws the same mark pointing right, between steps.
import { useCallback, useEffect, useRef, useState } from 'react'

export type Point = { x: number; y: number }
type Line = { from: Point; to: Point }

const MD = '(min-width: 768px)'
const RING_R = 10
const RING_STROKE = 2
const DASH = '5 2'
const LINE_WIDTH = 2.5
const CHEVRON_W = 17 // tip-to-tip width of the chevron's two arms
const CHEVRON_H = 10 // arm drop from the tip

export function ShippedConnectors({
  from,
  lineClassName,
  groundClassName,
}: {
  from: string[]
  /* Text colour class for the line, ring and chevron (drawn with currentColor). */
  lineClassName: string
  /* Fill class matching the band, for the inside of the ring. */
  groundClassName: string
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [lines, setLines] = useState<Line[]>([])

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
      className={`pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block ${lineClassName}`}
    >
      {lines.map(({ from, to }, i) => (
        <Connector key={i} from={from} to={to} direction="down" groundClassName={groundClassName} />
      ))}
    </svg>
  )
}

/* One connector, drawn in currentColor inside an <svg>. `from` is the point on the source frame's
   edge the ring is tangent to, `to` the point on the target's edge the chevron's tip sits on.
   'down' leaves and arrives heading straight down (frame bottom → frame top); 'right' leaves and
   arrives heading straight right (frame right edge → frame left edge). */
export function Connector({
  from: a,
  to: b,
  direction,
  groundClassName,
}: {
  from: Point
  to: Point
  direction: 'down' | 'right'
  groundClassName: string
}) {
  const down = direction === 'down'
  const ring = down ? { x: a.x, y: a.y + RING_R } : { x: a.x + RING_R, y: a.y } // tangent to the edge
  const start = down ? { x: a.x, y: ring.y + RING_R } : { x: ring.x + RING_R, y: a.y } // the ring's far side
  const bend = down ? (b.y - start.y) * 0.5 : (b.x - start.x) * 0.5
  const line = down
    ? `M ${start.x} ${start.y} C ${start.x} ${start.y + bend}, ${b.x} ${b.y - bend}, ${b.x} ${b.y}`
    : `M ${start.x} ${start.y} C ${start.x + bend} ${start.y}, ${b.x - bend} ${b.y}, ${b.x} ${b.y}`
  const chevron = down
    ? `M ${b.x - CHEVRON_W / 2} ${b.y - CHEVRON_H} L ${b.x} ${b.y} L ${b.x + CHEVRON_W / 2} ${b.y - CHEVRON_H}`
    : `M ${b.x - CHEVRON_H} ${b.y - CHEVRON_W / 2} L ${b.x} ${b.y} L ${b.x - CHEVRON_H} ${b.y + CHEVRON_W / 2}`
  return (
    <g data-connector="">
      <path
        data-connector-line=""
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={LINE_WIDTH}
        strokeDasharray={DASH}
      />
      <circle
        data-connector-ring=""
        cx={ring.x}
        cy={ring.y}
        r={RING_R}
        stroke="currentColor"
        strokeWidth={RING_STROKE}
        className={groundClassName}
      />
      <path
        data-connector-chevron=""
        d={chevron}
        fill="none"
        stroke="currentColor"
        strokeWidth={LINE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}
