'use client'
import { motion, useReducedMotion } from 'framer-motion'

/** The case study's hero: real pieces of the system laid out as one collage, each with a small
    label. The pieces arrive one after another once (about two seconds), then the collage sits
    still. Desktop: a 12-column, two-row grid sized so each piece keeps its own shape; phones:
    two columns, the wide pieces across both. Reduced motion: all pieces at once, no movement. */

export type CollagePiece = {
  /** base path without the width suffix: `${src}-${w}.webp` for each width in `widths` */
  src: string
  widths: [number, number]
  alt: string
  label: string
  /** grid placement and crop, desktop and phone */
  className: string
  imgClassName?: string
  /** the corner the label sits in: wherever that piece has empty space */
  labelAt?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

const CORNER = { 'top-left': 'left-3 top-3', 'top-right': 'right-3 top-3', 'bottom-left': 'bottom-3 left-3', 'bottom-right': 'bottom-3 right-3' }

export function HeroCollage({ pieces }: { pieces: CollagePiece[] }) {
  const reduced = useReducedMotion()
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:grid-rows-[55fr_45fr] md:aspect-[1152/680]">
      {pieces.map((p, i) => (
        <motion.figure
          key={p.src}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 0.15 + i * 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`relative m-0 overflow-hidden rounded-lg border border-border bg-white shadow-lg ${p.className}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${p.src}-${p.widths[0]}.webp`}
            srcSet={`${p.src}-${p.widths[0]}.webp ${p.widths[0]}w, ${p.src}-${p.widths[1]}.webp ${p.widths[1]}w`}
            sizes={p.className.includes('md:col-span-8') ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 50vw'}
            alt={p.alt}
            className={`absolute inset-0 h-full w-full object-cover ${p.imgClassName ?? ''}`}
          />
          <figcaption className={`absolute ${CORNER[p.labelAt ?? 'top-left']} whitespace-nowrap rounded-full bg-foundation-900/85 px-2.5 py-1 text-label font-sans text-foundation-100`}>
            {p.label}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}
