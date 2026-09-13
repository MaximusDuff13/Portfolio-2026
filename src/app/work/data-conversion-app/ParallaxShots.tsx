'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/*  ONE-OFF for the Data Conversion App product-shot section — deliberately NOT in src/components.
    Only exists to render option 5 of the layout comparison; delete with the losing options.

    Three layers drift at different rates as the section passes through the viewport, so the
    screens read as sitting at different depths rather than on one flat plane. Under
    prefers-reduced-motion every layer is pinned to 0 and it renders as a static composition.

    Panel styling is kept in step with the page's `Shot` helper (foundation-100 ground, border,
    rounded-lg). Duplicated rather than shared because this whole file is disposable.  */

const PANEL = 'absolute overflow-hidden rounded-lg border border-border bg-foundation-100'

function PanelLabel({ children }: { children: string }) {
  return (
    <span className="absolute inset-0 grid place-items-center text-caption font-grotesk uppercase tracking-widest text-foundation-400">
      {children}
    </span>
  )
}

export function ParallaxShots() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // 0 when the section's top hits the viewport bottom, 1 when its bottom hits the viewport top.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const back = useTransform(scrollYProgress, [0, 1], [60, -60])
  const mid = useTransform(scrollYProgress, [0, 1], [30, -30])
  const front = useTransform(scrollYProgress, [0, 1], [-15, 15])

  const y = (v: typeof back) => (prefersReduced ? 0 : v)

  return (
    // fixed height: children are absolutely placed so they can overlap at different depths
    <div ref={ref} className="relative mx-auto max-w-5xl h-[380px] md:h-[520px]">
      <motion.div
        style={{ y: y(back) }}
        className={`${PANEL} hidden md:block left-0 top-16 w-[42%] aspect-[16/10] shadow-lg`}
      >
        <PanelLabel>Detail</PanelLabel>
      </motion.div>

      <motion.div
        style={{ y: y(mid) }}
        className={`${PANEL} hidden md:block right-0 top-24 w-[42%] aspect-[16/10] shadow-lg`}
      >
        <PanelLabel>Live view</PanelLabel>
      </motion.div>

      {/* Centred with left-0/right-0/mx-auto, NOT -translate-x-1/2: framer-motion writes its own
          inline `transform` for the y value, which silently overrides any translate utility class
          — the panel drifted off-centre and buried the right-hand layer behind it. */}
      <motion.div
        style={{ y: y(front) }}
        className={`${PANEL} left-0 right-0 mx-auto top-0 w-full md:w-[64%] aspect-video shadow-2xl`}
      >
        <PanelLabel>Workspace</PanelLabel>
      </motion.div>
    </div>
  )
}
