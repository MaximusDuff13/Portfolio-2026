// Pieces every option shares, so the options differ only in sizing and arrangement.
//
// The title, body and frame classes are the live ConceptRow's, unchanged: border border-border
// rounded-lg bg-body p-4 around an object-contain image. Anything an option changes is passed in.
import Image from 'next/image'
import { type Concept, natural } from './content'

export function ConceptText({ concept, className = '' }: { concept: Concept; className?: string }) {
  return (
    <div className={className}>
      <h4 className="m-0 mb-3 font-grotesk text-heading-m font-medium text-foundation-900">
        {concept.title}
      </h4>
      <p className="m-0 mb-6 font-sans text-body-sm text-foundation-600">{concept.body}</p>
    </div>
  )
}

/* One wireframe in the live frame.
   fit="fill": the image box fills whatever height the option gives the frame (fixed heights).
   fit="hug":  the image box takes the wireframe's own aspect ratio, so the frame wraps it with
               nothing but its p-4 padding — no letterboxing. */
export function Frame({
  concept,
  fit,
  className = '',
  sizes,
}: {
  concept: Concept
  fit: 'fill' | 'hug'
  className?: string
  sizes: string
}) {
  const n = natural[concept.title]
  return (
    <div className={`rounded-lg border border-border bg-body p-4 ${className}`} data-frame="">
      <div
        className={`relative w-full ${fit === 'fill' ? 'h-full' : ''}`}
        style={fit === 'hug' ? { aspectRatio: `${n.w} / ${n.h}` } : undefined}
      >
        <Image src={concept.image} alt={concept.alt} fill sizes={sizes} className="object-contain" />
      </div>
    </div>
  )
}
