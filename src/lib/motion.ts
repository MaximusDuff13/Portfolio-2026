export const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const staggerItem = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const scaleUp = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const slideInLeft = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

/* NEW — shared motion tokens (home page brief). Paper-like: slide, settle, small lifts.
   No springs, scale-pops or blur. Define timing here once; never inline durations or curves.
   - fast  150ms: small UI feedback
   - base  280ms: tiles, cards, the TabBar underline
   - slow  600ms: full-width surfaces only (section entrances)
   Exits run at 70% of the enter duration on an accelerating curve. Reduced motion is a
   plain cross-fade at a quarter of the normal duration, with no translation. */
export const duration = { fast: 0.15, base: 0.28, slow: 0.6 } as const

export const ease = {
  enter: [0.22, 1, 0.36, 1],
  exit:  [0.6, 0, 0.8, 0.6],
} as const

const EXIT_RATIO = 0.7
const REDUCED_RATIO = 0.25

export const enterT   = (d: number) => ({ duration: d, ease: ease.enter })
export const exitT    = (d: number) => ({ duration: d * EXIT_RATIO, ease: ease.exit })
export const reducedT = (d: number) => ({ duration: d * REDUCED_RATIO, ease: 'linear' as const })

/** Section entrance: a 16px settle, or a quick fade under reduced motion. */
export const sectionEnter = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: enterT(duration.slow) },
}

export const sectionEnterReduced = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: reducedT(duration.slow) },
}

/* NEW — depth settle for the interstitial figures: they start slightly smaller and
   lighter, as if further back, and come forward over motion.slow. Ease-out only, so
   there is no overshoot. */
export const depthEnter = {
  hidden:  { opacity: 0.5, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: enterT(duration.slow) },
}

export const depthEnterReduced = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: reducedT(duration.slow) },
}
