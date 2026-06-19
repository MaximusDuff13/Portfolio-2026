'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'

const quote =
  'We presented these findings to leadership to align on the risks of the legacy path and the need for a scalable restart.'

const EASE = [0.16, 1, 0.3, 1] as const

const ruleDraw: Variants = {
  hidden:  { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
}

// ─── 1: Word-by-word fade-up stagger ─────────────────────────────────────────
const wordContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.25 } },
}
const wordFade: Variants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}
function V1() {
  return (
    <motion.div className="py-12 flex flex-col gap-6" initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-60px' }}>
      <motion.div className="w-12 h-px bg-accent-warm origin-left" variants={ruleDraw} />
      <motion.p className="text-heading-l font-grotesk text-foundation-900 max-w-3xl" variants={wordContainer}>
        {quote.split(' ').map((w, i) => (
          <motion.span key={i} variants={wordFade} className="inline-block mr-[0.26em]">{w}</motion.span>
        ))}
      </motion.p>
    </motion.div>
  )
}

// ─── 2: Word mask-rise (lines rise from behind a clip) ───────────────────────
const maskContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.25 } },
}
const maskWord: Variants = {
  hidden:  { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.6, ease: EASE } },
}
function V2() {
  return (
    <motion.div className="py-12 flex flex-col gap-6" initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-60px' }}>
      <motion.div className="w-12 h-px bg-accent-warm origin-left" variants={ruleDraw} />
      <motion.p className="text-heading-l font-grotesk text-foundation-900 max-w-3xl" variants={maskContainer}>
        {quote.split(' ').map((w, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.26em] pb-[0.14em] -mb-[0.14em] align-bottom">
            <motion.span className="inline-block" variants={maskWord}>{w}</motion.span>
          </span>
        ))}
      </motion.p>
    </motion.div>
  )
}

// ─── 3: Whole-line fade-up (subtle) ──────────────────────────────────────────
const lineContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}
const lineFade: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}
function V3() {
  return (
    <motion.div className="py-12 flex flex-col gap-6" initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-60px' }} variants={lineContainer}>
      <motion.div className="w-12 h-px bg-accent-warm origin-left" variants={ruleDraw} />
      <motion.p className="text-heading-l font-grotesk text-foundation-900 max-w-3xl" variants={lineFade}>{quote}</motion.p>
    </motion.div>
  )
}

const options = [
  { label: '1 — Word fade-up stagger', note: 'Each word fades and lifts in sequence after the rule draws. Lively, premium.', Component: V1 },
  { label: '2 — Word mask-rise',        note: 'Words rise from behind a clip mask. The most high-end / "designed" feel.', Component: V2 },
  { label: '3 — Whole-line fade-up',    note: 'Rule draws, then the line lifts as one block. Subtle and restrained.', Component: V3 },
]

export default function QuoteAnimPreviewPage() {
  const [run, setRun] = useState(0)
  return (
    <main className="min-h-screen bg-body px-section py-section">
      <div className="mb-12 flex items-center justify-between">
        <Link href="/work/acentra-health" className="text-ui-chrome font-sans text-foundation-500 hover:text-foundation-900 transition-colors">
          ← Back to case study
        </Link>
        <button
          onClick={() => setRun(r => r + 1)}
          className="text-label font-grotesk uppercase tracking-widest text-foundation-900 border border-btn-border rounded px-4 py-2 hover:bg-foundation-100 transition-colors"
        >
          ↻ Replay all
        </button>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-20" key={run}>
        <div>
          <h1 className="text-heading-l font-grotesk text-foundation-900 mb-2">Pull-quote animation options</h1>
          <p className="text-body-sm font-sans text-foundation-500">Layout B with motion. Hit “Replay all” to re-watch. All respect prefers-reduced-motion in production.</p>
        </div>

        {options.map(({ label, note, Component }) => (
          <div key={label}>
            <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-body-sm font-sans text-foundation-500 mb-2">{note}</p>
            <Component />
          </div>
        ))}
      </div>
    </main>
  )
}
