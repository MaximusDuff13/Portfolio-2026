'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { duration, enterT, exitT, reducedT } from '@/lib/motion'

/* NEW — a stamp-style resume link for the contact band: accent-subtle paper, hairline
   border, resting at a slight tilt. Hover or focus straightens it and lifts it a touch,
   then it settles back on leave. Under reduced motion it stays put. */

export function ResumeStamp({ href, label = 'Resume' }: { href: string; label?: string }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex flex-col gap-1 px-4 py-3 bg-accent-subtle border border-border rounded-sm no-underline shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-foundation-900"
      aria-label={`${label} (PDF, opens in a new tab)`}
      initial={false}
      // a static tilt, so server and client render the same; only the hover settle moves
      style={{ rotate: -3 }}
      whileHover={prefersReduced ? undefined : { rotate: 0, y: -2, transition: enterT(duration.base) }}
      whileFocus={prefersReduced ? undefined : { rotate: 0, y: -2, transition: enterT(duration.base) }}
      transition={prefersReduced ? reducedT(duration.base) : exitT(duration.base)}
    >
      <span className="text-label font-grotesk uppercase text-foundation-600">PDF</span>
      <span className="text-body-sm font-grotesk font-medium text-foundation-900">
        {label} <span aria-hidden="true">↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </span>
    </motion.a>
  )
}
