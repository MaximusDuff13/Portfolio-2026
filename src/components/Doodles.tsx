'use client'
import { useEffect, useId, useRef, useState } from 'react'

/* Small hand-drawn illustrations for the number tiles in 04's bento (Nov 23 2026, Michael asked for
   drawn illustrations in place of the round icons). Same pen as the audit notes: ginger ink, round
   caps, a touch of wobble from a displacement filter, and each line draws itself in (cs-ring, from
   case-study.css) once the tile is on screen. Still for reduced motion. */

type Props = { ink: string; label?: string }

function Doodle({ ink, paths }: Props & { paths: string[] }) {
  const ref = useRef<SVGSVGElement>(null)
  const [on, setOn] = useState(false)
  const id = useId().replace(/:/g, '')
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <svg ref={ref} viewBox="0 0 100 72" width={96} height={69} aria-hidden="true" className="cs-markup block overflow-visible" data-on={on || undefined}>
      <defs>
        {/* a little irregularity, so the lines read as drawn by hand rather than set by a computer */}
        <filter id={`wob-${id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.2" />
        </filter>
      </defs>
      <g filter={`url(#wob-${id})`}>
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength={1}
            className="cs-ring"
            style={{ stroke: ink, strokeWidth: 2.6, fill: 'none', strokeLinejoin: 'round', animationDelay: `${i * 110}ms` }}
          />
        ))}
      </g>
    </svg>
  )
}

const head = (x: number, y: number, r = 5.5) => `M ${x - r} ${y} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`
// a rounded torso from just under the head down to the shared ground line at y 52
const body = (x: number, y: number) => `M ${x - 7} 52 L ${x - 7} ${y + 17} Q ${x - 7} ${y + 9} ${x} ${y + 9} Q ${x + 7} ${y + 9} ${x + 7} ${y + 17} L ${x + 7} 52`

/* five people of different heights standing on one line: 5 teams on one system */
export function TeamsDoodle({ ink }: Props) {
  const people: [number, number][] = [[13, 24], [31, 17], [50, 12], [69, 19], [87, 26]]
  return (
    <Doodle
      ink={ink}
      paths={[
        ...people.flatMap(([x, y]) => [head(x, y), body(x, y)]),
        'M 2 55 C 28 51, 70 58, 98 53',
      ]}
    />
  )
}

/* a brush laying down a sweep of new colour: the rebrand */
export function BrushDoodle({ ink }: Props) {
  return (
    <Doodle
      ink={ink}
      paths={[
        'M 90 6 L 68 28',
        'M 64 23 L 72 31 L 65 38 L 57 30 Z',
        'M 57 30 Q 47 39 42 47 Q 51 45 65 38',
        'M 6 60 C 22 44, 34 68, 50 56 S 78 48, 94 60',
        'M 20 12 L 20 24 M 14 18 L 26 18',
        'M 36 28 L 36 34 M 33 31 L 39 31',
      ]}
    />
  )
}

/* Figma's component mark with a cursor dropping it in: component inserts */
export function ComponentDoodle({ ink }: Props) {
  return (
    <Doodle
      ink={ink}
      paths={[
        'M 46 10 L 54 18 L 46 26 L 38 18 Z',
        'M 60 24 L 68 32 L 60 40 L 52 32 Z',
        'M 46 38 L 54 46 L 46 54 L 38 46 Z',
        'M 32 24 L 40 32 L 32 40 L 24 32 Z',
        'M 70 44 L 70 66 L 75 61 L 80 70 L 85 68 L 80 59 L 87 58 Z',
        'M 6 22 L 16 22 M 4 32 L 14 32 M 6 42 L 16 42',
        'M 84 12 L 84 22 M 79 17 L 89 17',
      ]}
    />
  )
}

/* ---- Closing thoughts (Nov 23 2026): one drawing per lesson ---- */

/* a compass: central guidance */
export function CompassDoodle({ ink }: Props) {
  return (
    <Doodle
      ink={ink}
      paths={[
        'M 26 36 a 24 24 0 1 0 48 0 a 24 24 0 1 0 -48 0',
        'M 50 17 L 57 36 L 50 55 L 43 36 Z',
        'M 43 36 L 57 36',
        'M 50 6 L 50 11 M 50 61 L 50 66 M 20 36 L 15 36 M 80 36 L 85 36',
        'M 88 12 L 88 20 M 84 16 L 92 16',
      ]}
    />
  )
}

/* a sharp corner bending into a round one: room for flexibility */
export function CornersDoodle({ ink }: Props) {
  return (
    <Doodle
      ink={ink}
      paths={[
        'M 8 22 L 36 22 L 36 50 L 8 50 Z',
        'M 42 30 Q 50 22 58 30',
        'M 53 26 L 58 30 L 53 33',
        'M 74 22 L 84 22 Q 94 22 94 32 L 94 40 Q 94 50 84 50 L 74 50 Q 64 50 64 40 L 64 32 Q 64 22 74 22 Z',
        'M 14 60 L 30 60 M 70 60 L 88 60',
      ]}
    />
  )
}

/* a stack of layers (tokens, guidelines, specs) with the framework swapping on top: plan for change */
export function LayersDoodle({ ink }: Props) {
  return (
    <Doodle
      ink={ink}
      paths={[
        'M 50 34 L 82 46 L 50 58 L 18 46 Z',
        'M 18 52 L 50 64 L 82 52',
        'M 18 58 L 50 70 L 82 58',
        'M 36 22 L 64 22 L 64 8 L 36 8 Z',
        'M 70 12 C 82 12, 86 22, 80 30',
        'M 76 27 L 80 31 L 84 26',
      ]}
    />
  )
}

/* Data Conversion App hero (Nov 23 2026): a stopwatch with its hand swept half way round and speed
   lines behind it: 30 minutes to the first mapping sheet */
export function StopwatchDoodle({ ink }: Props) {
  return (
    <Doodle
      ink={ink}
      paths={[
        'M 74 40 A 22 22 0 1 1 74 39.9',
        'M 47 10 L 57 10 M 52 10 L 52 18',
        'M 68 20 L 72 16',
        'M 52 40 L 52 26',
        'M 52 24 A 16 16 0 0 1 52 56',
        'M 6 30 L 18 30 M 2 41 L 18 41 M 8 52 L 20 52',
      ]}
    />
  )
}

/* Data Conversion App hero: two mapping sheets, each ticked off: 2 programs ran real conversions */
export function ProgramsDoodle({ ink }: Props) {
  return (
    <Doodle
      ink={ink}
      paths={[
        'M 10 12 L 42 12 L 42 54 L 10 54 Z',
        'M 16 22 L 36 22 M 16 31 L 36 31 M 16 40 L 30 40',
        'M 56 8 L 88 8 L 88 50 L 56 50 Z',
        'M 62 18 L 82 18 M 62 27 L 82 27 M 62 36 L 76 36',
        'M 18 62 L 23 67 L 33 57',
        'M 64 58 L 69 63 L 79 53',
      ]}
    />
  )
}
