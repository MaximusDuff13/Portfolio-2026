'use client'
/* The hero image (Nov 23 2026, option A "Perspective sweep" from the /dev/dca-hero trial, with a
   gentler tilt at Michael's request): six screens from the page laid on one tilted plane on the sky
   stage, running off its edges. Purely visual: the UI isn't meant to be read here, the sections
   below carry the detail. The corrected mapping screen sits top centre, where the eye lands.

   ARRIVAL. The screens are dealt onto the plane one by one, each sliding in from beyond its own
   edge of the stage (they move inside the tilted plane, so they travel along the table, not up the
   page). The outer screens land first and the mapping screen last, so the hero assembles around it.
   The site's paper easing (lib/motion: ease.enter), no springs, scale or blur. Plays once, when the
   stage is in view. Reduced motion: a plain fade, no travel. */
import Image from 'next/image'
import { motion } from 'framer-motion'
import { duration, ease, reducedT } from '@/lib/motion'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

const D = '/images/data-conversion-app/'

// Grid order, three columns: top row left/centre/right, then bottom row. `from` is where each
// screen starts, as a share of its own size, pointing away from the centre; `order` is its place
// in the deal (the mapping screen, top centre, goes last).
const SCREENS = [
  { src: D + 'schema-mapping/upload-and-prompt.png', w: 5248, h: 3580, from: { x: '-70%', y: '-30%' }, order: 1 },
  { src: D + 'mapping-variants/Table%20Mapping%20screen.png', w: 3936, h: 3045, from: { x: '0%', y: '-80%' }, order: 5 },
  { src: D + 'project-hub/hub-project-completed.png', w: 2624, h: 1902, from: { x: '70%', y: '-30%' }, order: 4 },
  { src: D + 'schema-mapping/documents-list.png', w: 5248, h: 3804, from: { x: '-70%', y: '40%' }, order: 0 },
  { src: D + 'schema-mapping/success-and-append.png', w: 5248, h: 3200, from: { x: '0%', y: '80%' }, order: 2 },
  { src: D + 'project-hub/Mapping%20Screen%20-%20In%20Progress.png', w: 5248, h: 3804, from: { x: '70%', y: '40%' }, order: 3 },
]

const TRAVEL = duration.slow * 1.5 // 0.9s: a full-stage move, longer than a section's settle
const GAP = 0.14 // seconds between one screen and the next

export function HeroSweep() {
  const reduced = useReducedMotionSafe()
  return (
    // The frame starts the deal (not each screen: they begin outside the clipped stage, so on their
    // own they would never count as in view). The variants pass down to every screen.
    <motion.div
      role="img"
      aria-label="Screens from the Data Conversion App: the data dictionary upload, the mapping table with AI confidence scores, the project hub and the documents list."
      className="vt-media-dca relative h-[260px] overflow-hidden rounded-2xl bg-stage-sky sm:h-[420px] md:h-[560px]"
      initial="dealt"
      whileInView="placed"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div
        className="absolute left-1/2 top-1/2 grid w-[112%] grid-cols-3 gap-4 sm:gap-6"
        style={{ transform: 'translate(-50%, -50%) perspective(2600px) rotateX(24deg) rotateZ(-12deg)' }}
      >
        {SCREENS.map((s, i) => (
          <motion.div
            key={s.src}
            className="overflow-hidden rounded-lg border border-border bg-white shadow-[0_24px_60px_-20px_rgba(30,40,60,0.35)]"
            style={{ marginTop: i % 3 === 1 ? '-10%' : 0 }}
            // The timing lives inside the 'placed' variant: when a parent starts the animation, framer
            // ignores the child's own transition prop and falls back to a spring, which overshot
            // (screens overlapped, then slid back). Fixed Nov 23 2026.
            variants={{
              dealt: reduced ? { opacity: 0 } : { opacity: 0, x: s.from.x, y: s.from.y },
              placed: {
                opacity: 1,
                // '0%', not 0: the start is in %, and a % to px move skips the timing below
                x: '0%',
                y: '0%',
                transition: reduced
                  ? reducedT(duration.slow)
                  : {
                      x: { duration: TRAVEL, ease: ease.enter, delay: 0.15 + s.order * GAP },
                      y: { duration: TRAVEL, ease: ease.enter, delay: 0.15 + s.order * GAP },
                      // the fade finishes early, so each screen is solid for most of its slide
                      opacity: { duration: TRAVEL * 0.4, ease: 'linear', delay: 0.15 + s.order * GAP },
                    },
              },
            }}
          >
            <Image src={s.src} alt="" width={s.w} height={s.h} priority sizes="(min-width: 1152px) 420px, 40vw" className="block h-auto w-full" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
