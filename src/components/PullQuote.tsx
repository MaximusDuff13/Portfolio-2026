'use client'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const ruleDraw: Variants = {
  hidden:  { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
}

const container: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.25 } },
}

const word: Variants = {
  hidden:  { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.6, ease: EASE } },
}

export function PullQuote({ children }: { children: string }) {
  const prefersReduced = useReducedMotion()

  // Static fallback — no motion, same layout.
  if (prefersReduced) {
    return (
      <div className="py-12 flex flex-col gap-6">
        <div className="w-12 h-px bg-accent-warm" />
        <p className="text-heading-l font-grotesk text-foundation-900 max-w-3xl">{children}</p>
      </div>
    )
  }

  return (
    <motion.div
      className="py-12 flex flex-col gap-6"
      initial="hidden"
      whileInView="visible"
      // Trigger on a fraction in view (not an edge peek) so the reveal plays
      // even when the quote is the last element on the page with little room below.
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div className="w-12 h-px bg-accent-warm origin-left" variants={ruleDraw} />
      <motion.p className="text-heading-l font-grotesk text-foundation-900 max-w-3xl" variants={container}>
        {children.split(' ').map((w, i) => (
          // overflow-hidden clip + extra bottom room so descenders (g, y, p) aren't cut
          <span key={i} className="inline-block overflow-hidden mr-[0.26em] pb-[0.14em] -mb-[0.14em] align-bottom">
            <motion.span className="inline-block" variants={word}>{w}</motion.span>
          </span>
        ))}
      </motion.p>
    </motion.div>
  )
}
