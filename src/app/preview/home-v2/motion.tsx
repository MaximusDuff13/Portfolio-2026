'use client'
// TEMPORARY — /preview/home-v2 harness. Subtle Framer Motion helpers shared by the seven
// approaches. Each checks useReducedMotion and, when it is on, shows its final state at once.
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

/* Fades and lifts a block into place the first time it scrolls into view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 16,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'section' | 'article'
}) {
  const reduced = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/* Lines that slide up out of a mask, one after another. Pass the lines already broken. */
export function MaskLines({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.09,
}: {
  lines: React.ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
}) {
  const reduced = useReducedMotion()
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={reduced ? false : { y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* Counts the leading number of a figure up from zero when it comes into view, keeping
   whatever follows it ("19K+", "1 week"). Figures with no number are shown as is. */
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const match = value.match(/^([\d,.]+)(.*)$/)
  const target = match ? Number(match[1].replace(/,/g, '')) : NaN
  const suffix = match ? match[2] : ''
  const [shown, setShown] = useState(isNaN(target) ? value : '0' + suffix)

  useEffect(() => {
    if (reduced || isNaN(target)) return setShown(value)
    if (!inView) return
    const controls = animate(0, target, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (n) => setShown(Math.round(n).toLocaleString('en-GB') + suffix),
    })
    return () => controls.stop()
  }, [inView, reduced, target, suffix, value])

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={value}>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}
