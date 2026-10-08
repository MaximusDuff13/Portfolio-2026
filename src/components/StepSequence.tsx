'use client'
// StepSequence — a real sequence of screens, in order, as an alternating vertical walk-through:
// each step is a screenshot beside a short label and sentence, the image switching sides from
// step to step, joined by one continuous dashed connector.
//
// NEW COMPONENT. Replaced a three-up row of screenshots: the steps get room to be read, and the
// connector shows the order without squeezing into a narrow gutter.
//
// WIDTH. The block stays in the band's max-w-6xl wrap, on the same edges as the card above it.
// It used to break out full-bleed (capped at 1800px), which gave each band three competing
// widths; only the state carousel still breaks out, to the wide row.
//
// LAYOUT. md and up: a 12-column grid per step, the image in 7 columns (a bit over half the row)
// and the text in the other 5, vertically centred. Steps 1 and 3 put the image left, step 2
// right. Below md: image above text for every step, gap-section (80px) apart, a full section's
// rhythm. md and up: twice that (160px), so each connector segment has the height to cross from
// one side to the other and still arrive heading straight down into its chevron, the way the
// Mapping & transformation connector does; at 80px the curve ran nearly flat and met the chevron
// side-on.
//
// FRAMES. The page's screenshot frame (rounded-lg, border-border), the image at its natural
// aspect ratio (h-auto), never cropped, with a LightboxTrigger. The caller supplies the
// LightboxProvider.
//
// TEXT. The caption is a label (the eyebrow's token: text-label, grotesk, uppercase,
// tracking-widest, with leading-snug so a wrapped label does not touch) in the band's small-label
// colour; the sentence is text-body in the band's
// running-text colour. Both colours are passed in from featureSurface().
//
// CONNECTOR. `Connector` from ShippedConnectors: one dashed path, a ring at the top and a chevron
// at the bottom of each segment. md and up: two segments, from the bottom centre of each
// step's image to the top centre of the next, bending sideways because the images alternate.
// Below md: one straight segment down a 40px left gutter (pl-10 on the list), from the top of the
// first image to the bottom of the last step, so the line never crosses an image. Endpoints come
// from getBoundingClientRect and are recomputed on mount, on resize of the block or any frame,
// on window resize, and when each image loads.
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LightboxTrigger } from './Lightbox'
import { Connector, type Line } from './ShippedConnectors'

export type SequenceStep = {
  /* Path under public/, used as-is as the src. */
  src: string
  /* The screenshot's natural size, so every frame has its shape before the image loads. */
  width: number
  height: number
  alt: string
  /* Short label above the sentence. */
  caption: string
  sentence: string
}

const MD = '(min-width: 768px)'
// Centre of the below-md line inside the 40px gutter: the ring (r 10, 2px stroke) sits clear of
// the edge.
const GUTTER_X = 12
// Control points at 90% of each segment's height (Connector's default is 50%): the segments
// cross up to ~750px sideways in ~140px of height, and at 50% they met the chevron side-on.
const BEND = 0.9

export function StepSequence({
  steps,
  labelClassName,
  textClassName,
  lineClassName,
  groundClassName,
}: {
  steps: SequenceStep[]
  labelClassName: string
  textClassName: string
  /* Text colour class for the connector (drawn with currentColor). */
  lineClassName: string
  /* Fill class matching the band, for the inside of each ring. */
  groundClassName: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [segments, setSegments] = useState<Line[]>([])

  const measure = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const origin = wrap.getBoundingClientRect()
    const frames = Array.from(wrap.querySelectorAll<HTMLElement>('[data-step-frame]')).map((el) =>
      el.getBoundingClientRect(),
    )
    if (frames.length < 2) return setSegments([])
    if (window.matchMedia(MD).matches) {
      setSegments(
        frames.slice(0, -1).map((r, i) => {
          const next = frames[i + 1]
          return {
            from: { x: r.left + r.width / 2 - origin.left, y: r.bottom - origin.top },
            to: { x: next.left + next.width / 2 - origin.left, y: next.top - origin.top },
          }
        }),
      )
      return
    }
    const steps = wrap.querySelectorAll<HTMLElement>('[data-step]')
    const last = steps[steps.length - 1].getBoundingClientRect()
    const list = wrap.querySelector<HTMLElement>('[data-steps]')!.getBoundingClientRect()
    const x = list.left - origin.left + GUTTER_X
    setSegments([{ from: { x, y: frames[0].top - origin.top }, to: { x, y: last.bottom - origin.top } }])
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(wrap)
    wrap.querySelectorAll('[data-step-frame], [data-step]').forEach((el) => observer.observe(el))
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
    <div data-step-sequence="">
      <div ref={wrapRef} className="relative">
        <ol
          data-steps=""
          className="m-0 flex list-none flex-col gap-section p-0 pl-10 md:gap-[calc(theme(spacing.section)*2)] md:pl-0"
        >
          {steps.map((step, i) => {
            const imageRight = i % 2 === 1
            return (
              <li
                key={step.src}
                data-step=""
                className="m-0 grid grid-cols-1 gap-6 p-0 md:grid-cols-12 md:items-center md:gap-12"
              >
                <div
                  data-step-frame=""
                  className={`relative overflow-hidden rounded-lg border border-border md:col-span-7 md:row-start-1 ${
                    imageRight ? 'md:col-start-6' : 'md:col-start-1'
                  }`}
                >
                  <Image
                    src={step.src}
                    alt={step.alt}
                    width={step.width}
                    height={step.height}
                    sizes="(min-width: 1152px) 672px, (min-width: 768px) 58vw, 100vw"
                    className="block h-auto w-full"
                  />
                  <LightboxTrigger src={step.src} alt={step.alt} />
                </div>
                <div
                  className={`md:col-span-5 md:row-start-1 ${imageRight ? 'md:col-start-1' : 'md:col-start-8'}`}
                >
                  {/* leading-snug over the label token's 1.0: a step label can wrap at md, and at
                      1.0 its two lines touch. */}
                  <p className={`m-0 font-grotesk text-label uppercase leading-snug tracking-widest ${labelClassName}`}>
                    {step.caption}
                  </p>
                  <p className={`m-0 mt-3 font-sans text-body ${textClassName}`}>{step.sentence}</p>
                </div>
              </li>
            )
          })}
        </ol>
        <svg
          aria-hidden="true"
          data-connectors=""
          className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${lineClassName}`}
        >
          {segments.length > 0 && <Connector segments={segments} groundClassName={groundClassName} bend={BEND} />}
        </svg>
      </div>
    </div>
  )
}
