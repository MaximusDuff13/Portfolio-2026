'use client'
import { useId, type ReactNode } from 'react'
import { HOT, Stroke, Wobble, useOnScreen } from './pen'

/* The sketchbook layout for the design features (Part two), Nov 24 2026: Michael picked it (D5)
   for Requirements gathering, and it carries through the features after it.

   SketchIntro    the number and area, the question on the left; the problem and what I did as two
                  tilted sticky notes on the right, one line each.
   AnnotatedImage a screenshot or diagram with pen circles and handwritten notes laid over it. The
                  overlay's viewBox is the image's own proportions, so marks stay on their targets
                  at any width. */

const note = 'flex-1 rounded-md p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]'

export function SketchIntro({ n, area, question, problem, did }: { n: string; area: string; question: string; problem: string; did: string }) {
  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="m-0 font-sans text-label uppercase tracking-widest text-foundation-500">{n} · {area}</p>
        <h3 className="m-0 mt-4 font-display text-heading-xl font-medium leading-[1.1] text-foundation-900">{question}</h3>
      </div>
      <div className="flex flex-col gap-6 sm:flex-row lg:col-span-7">
        <div className={`${note} -rotate-2 bg-stage-straw-strong`}>
          <p className="m-0 font-hand text-[22px] text-foundation-600">the problem</p>
          <p className="m-0 mt-2 font-hand text-[26px] leading-[1.15] text-foundation-900">{problem}</p>
        </div>
        <div className={`${note} rotate-1 bg-stage-sage-strong`}>
          <p className="m-0 font-hand text-[22px] text-foundation-600">what I did</p>
          <p className="m-0 mt-2 font-hand text-[26px] leading-[1.15] text-foundation-900">{did}</p>
        </div>
      </div>
    </div>
  )
}

/** A mark: a pen path (a circle or a leader), and optionally a handwritten note at x, y. */
export type Mark = { d: string; note?: { x: number; y: number; text: string } }

export function AnnotatedImage({
  src, width, height, alt, box, marks, fontSize = 50,
}: {
  src: string
  width: number
  height: number
  alt: string
  /** The overlay's coordinate space, [w, h], in the image's proportions. */
  box: [number, number]
  marks: Mark[]
  fontSize?: number
}) {
  const [ref, on] = useOnScreen<SVGSVGElement>()
  const id = useId().replace(/:/g, '')
  return (
    <div className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width} height={height} className="block h-auto w-full" />
      <svg ref={ref} viewBox={`0 0 ${box[0]} ${box[1]}`} className="cs-markup pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true" data-on={on || undefined}>
        <defs><Wobble id={`w${id}`} /></defs>
        <g filter={`url(#w${id})`}>
          {marks.map((m, i) => <Stroke key={i} d={m.d} ink={HOT} w={4} delay={200 + i * 300} />)}
        </g>
        {/* inline size and ink on each note: case-study.css sets .cs-mark-note text to 36px in the
            lighter dark-panel ginger, which would override the attribute and shrink these notes */}
        <g className="cs-mark-note">
          {marks.filter((m) => m.note).map((m, i) => (
            <text key={i} x={m.note!.x} y={m.note!.y} className="font-hand" style={{ fontSize: `${fontSize}px`, fill: HOT }}>
              {/* a newline in the note breaks it onto the next line */}
              {m.note!.text.split('\n').map((line, j) => <tspan key={j} x={m.note!.x} dy={j ? "1.05em" : 0}>{line}</tspan>)}
            </text>
          ))}
        </g>
      </svg>
    </div>
  )
}


/* Crops whatever it wraps (an AnnotatedImage) to a region given as fractions of its width and
   height, so empty parts of a screen can be trimmed while its pen marks, which scale with the
   image, stay on target. ratio is the full image's width / height. */
export function CropBox({ ratio, x0, x1, y0, y1, children }: { ratio: number; x0: number; x1: number; y0: number; y1: number; children: ReactNode }) {
  const w = x1 - x0
  const h = y1 - y0
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${w * ratio} / ${h}` }}>
      <div className="absolute" style={{ width: `${100 / w}%`, left: `${(-x0 / w) * 100}%`, top: `${(-y0 / h) * 100}%` }}>{children}</div>
    </div>
  )
}
