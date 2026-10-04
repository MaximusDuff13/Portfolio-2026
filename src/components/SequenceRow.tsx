'use client'
// SequenceRow — a real sequence of screens, in order (this, then this, then this), as captioned
// screenshots side by side, joined by the same dashed connector ShippedConnectors draws.
//
// NEW COMPONENT. Unlike ConceptRow, the images are not alternatives being compared: each step
// leads to the next, so each gets a connector to the next one. Sits in the normal content wrap,
// not the wide row: these are full application screenshots, not wireframes.
//
// EQUAL FRAMES. Every column is the same width (the grid, ConceptRow's gap-9), and every frame
// takes the shape of the tallest step, so the three frames are identical and their vertical
// centres line up for the connectors. Shorter screenshots sit centred inside with object-contain:
// natural aspect ratio, never cropped. The frame is the page's screenshot frame (rounded-lg,
// border-border, bg-body).
//
// CONNECTORS. `Connector` from ShippedConnectors, pointing right: the ring tangent to the right
// edge of step n, the chevron's tip on the left edge of step n + 1, at the frames' vertical centre.
// Measured from getBoundingClientRect on mount, on resize of the row or any frame, and when each
// image loads. lg and up only. Below lg the steps stack in one column, the reading order carries
// the flow, and no connector is drawn, the way ShippedConnectors behaves below its breakpoint.
//
// CAPTIONS below each frame, body-sm, in the band's running-text colour (passed in): foundation-600
// on the page ground (7.38:1), foundation-300 on the dark band (10.18:1).
//
// ENLARGE. Each frame has a LightboxTrigger; the caller supplies the LightboxProvider.
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LightboxTrigger } from './Lightbox'
import { Connector, type Point } from './ShippedConnectors'

export type SequenceStep = {
  /* Path under public/, used as-is as the src. */
  src: string
  alt: string
  caption: string
  /* The screenshot's natural size, so every frame has its shape before the image loads. */
  width: number
  height: number
}

const LG = '(min-width: 1024px)'

export function SequenceRow({
  steps,
  captionClassName = 'text-foundation-600',
  lineClassName,
  groundClassName,
}: {
  steps: SequenceStep[]
  captionClassName?: string
  /* Text colour class for the connectors (drawn with currentColor). */
  lineClassName: string
  /* Fill class matching the band, for the inside of each connector's ring. */
  groundClassName: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<{ from: Point; to: Point }[]>([])
  // The frames take the tallest step's shape.
  const tallest = steps.reduce((a, s) => (s.height / s.width > a.height / a.width ? s : a))

  const measure = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    if (!window.matchMedia(LG).matches) {
      setLines([])
      return
    }
    const origin = wrap.getBoundingClientRect()
    const frames = Array.from(wrap.querySelectorAll<HTMLElement>('[data-step-frame]')).map((el) =>
      el.getBoundingClientRect(),
    )
    setLines(
      frames.slice(0, -1).map((r, i) => {
        const next = frames[i + 1]
        return {
          from: { x: r.right - origin.left, y: r.top + r.height / 2 - origin.top },
          to: { x: next.left - origin.left, y: next.top + next.height / 2 - origin.top },
        }
      }),
    )
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(wrap)
    wrap.querySelectorAll('[data-step-frame]').forEach((el) => observer.observe(el))
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
    <div ref={wrapRef} data-sequence-row="" className="relative">
      <ol className="m-0 grid list-none grid-cols-1 gap-9 p-0 lg:grid-cols-3">
        {steps.map((step) => (
          <li key={step.src} className="m-0 p-0">
            <figure className="m-0">
              <div
                data-step-frame=""
                className="relative overflow-hidden rounded-lg border border-border bg-body"
                style={{ aspectRatio: `${tallest.width} / ${tallest.height}` }}
              >
                <Image
                  src={step.src}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-contain"
                />
                <LightboxTrigger src={step.src} alt={step.alt} />
              </div>
              <figcaption className={`mt-3 font-sans text-body-sm ${captionClassName}`}>{step.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ol>
      <svg
        aria-hidden="true"
        data-connectors=""
        className={`pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block ${lineClassName}`}
      >
        {lines.map(({ from, to }, i) => (
          <Connector key={i} from={from} to={to} direction="right" groundClassName={groundClassName} />
        ))}
      </svg>
    </div>
  )
}
