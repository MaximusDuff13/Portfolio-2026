'use client'
// TEMPORARY — /preview/home harness. Framer Motion helpers for the home page. Every one
// of them checks useReducedMotion and, when it is on, renders its final state with no movement.
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const EASE = [0.2, 0.7, 0.25, 1] as const

/* Counts the leading number of a figure up from zero when it comes into view, keeping
   whatever follows it ("19K+", "1 week", "2 weeks"). Figures with no number are shown as is. */
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const match = value.match(/^([\d,.]+)(.*)$/)
  const target = match ? Number(match[1].replace(/,/g, '')) : NaN
  const suffix = match ? match[2] : ''
  const [shown, setShown] = useState(reduced || isNaN(target) ? value : '0' + suffix)

  useEffect(() => {
    if (!inView || reduced || isNaN(target)) {
      if (reduced || isNaN(target)) setShown(value)
      return
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (n) => setShown(Math.round(n).toLocaleString('en-GB') + suffix),
    })
    return () => controls.stop()
  }, [inView, reduced, target, suffix, value])

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}

/* Types a line out letter by letter, like copy coming off the wire. The full text is always in
   the accessibility tree; only the visible letters animate. */
export function Typed({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const [count, setCount] = useState(reduced ? text.length : 0)

  useEffect(() => {
    if (reduced) return setCount(text.length)
    if (!inView) return
    const controls = animate(0, text.length, {
      duration: Math.min(1.6, text.length * 0.035),
      delay,
      ease: 'linear',
      onUpdate: (n) => setCount(Math.round(n)),
    })
    return () => controls.stop()
  }, [inView, reduced, text, delay])

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span aria-hidden="true" className="invisible">{text.slice(count)}</span>
    </span>
  )
}
