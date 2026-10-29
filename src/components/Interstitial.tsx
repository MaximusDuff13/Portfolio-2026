'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { depthEnter, depthEnterReduced } from '@/lib/motion'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

/* NEW — a short watercolour pause between company blocks (never inside one). Unframed: the
   illustration bleeds out to the right edge of the viewport (about 60% of the width on
   desktop) on soft washes that fade into the body colour. One compact tile on the left
   (label, one-line caption, "Read more") overlaps the illustration's edge slightly and is
   the only card in the section. On phones the illustration sits on top, full bleed, with
   the tile below it at full width.

   When the illustration scrolls into view its figures play once: they start slightly
   smaller and lighter, as if further back, and come forward over motion.slow with an
   ease-out settle. Placeholder art for now: token-coloured washes and a line sketch, with
   the dog as a recurring character. Swap <Sketch> for a painting; the wash and motion stay.

   Must sit inside a page column; the bleed is measured against the viewport, so the page
   clips horizontal overflow (see `overflow-x-clip` on <main>). */

export type InterstitialTopic = 'travel' | 'games' | 'volunteering'

/** Set before following "Read more", so /about's back link can return with scroll restored */
export const FROM_HOME_KEY = 'about-from-home'

export function Interstitial({
  topic,
  label,
  caption,
  href,
}: {
  topic: InterstitialTopic
  label: string
  caption: string
  href: string
}) {
  const prefersReduced = useReducedMotionSafe()
  return (
    <aside aria-label={label} className="relative flex flex-col sm:block sm:h-[300px]">
      {/* Illustration: full bleed on phones; from sm it starts just inside the tile's right
          edge (so the tile overlaps it by about 20px on desktop) and runs to the viewport edge */}
      <div
        className="relative h-[220px] sm:h-full sm:absolute sm:inset-y-0 sm:left-[200px] lg:left-[260px] -mx-6 sm:mx-0 sm:[right:calc(-1*(100vw-100%)/2)]"
        data-interstitial-art
      >
        {/* Washes: token colours as soft radial stains, multiplied, fading to the body colour.
            The mask feathers the left edge so there is no hard frame. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 isolate [mask-image:linear-gradient(to_right,transparent,black_18%,black_88%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_18%)]"
        >
          <div className="absolute left-[4%] top-[8%] w-[62%] h-[84%] mix-blend-multiply bg-[radial-gradient(closest-side,theme(colors.accent.subtle),transparent)]" />
          <div className="absolute left-[38%] top-[-6%] w-[56%] h-[78%] mix-blend-multiply opacity-60 bg-[radial-gradient(closest-side,theme(colors.success.border),transparent)]" />
          <div className="absolute left-[30%] top-[40%] w-[44%] h-[66%] mix-blend-multiply opacity-60 bg-[radial-gradient(closest-side,theme(colors.warning.border),transparent)]" />
        </div>

        <motion.div
          aria-hidden="true"
          className="absolute left-[18%] right-[8%] sm:right-auto sm:w-[min(420px,70%)] top-[10%] bottom-[6%] origin-bottom text-foundation-600"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={prefersReduced ? depthEnterReduced : depthEnter}
        >
          <svg viewBox="0 0 260 160" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <Sketch topic={topic} />
            <Dog />
          </svg>
        </motion.div>
      </div>

      {/* The one tile. Overlaps the illustration's left edge from sm. */}
      <div className="relative z-10 mt-4 sm:mt-0 sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2 w-full sm:w-[260px] lg:w-[280px] p-5 bg-body border border-border rounded-sm shadow-lift flex flex-col gap-3">
        <p className="text-label font-sans uppercase text-foundation-600">{label}</p>
        <p className="text-body-sm font-sans text-foundation-900">{caption}</p>
        <Link
          href={href}
          onClick={() => {
            try {
              sessionStorage.setItem(FROM_HOME_KEY, '1')
            } catch {}
          }}
          className="self-start rounded-sm text-link font-sans text-foundation-900 underline decoration-accent-warm underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-body"
        >
          Read more <span aria-hidden="true">→</span>
          <span className="sr-only"> about {label.toLowerCase()}</span>
        </Link>
      </div>
    </aside>
  )
}

function Sketch({ topic }: { topic: InterstitialTopic }) {
  if (topic === 'travel') {
    return (
      <g>
        <path d="M10 140 L60 80 L90 112 L130 60 L190 140" />
        <path d="M120 74 l10 -14 l10 14" />
        <path d="M30 40 Q 100 0 200 36" strokeDasharray="4 6" />
        <path d="M196 30 l10 6 l-10 6 l3 -6 z" />
      </g>
    )
  }
  if (topic === 'games') {
    return (
      <g>
        <path d="M40 70 Q40 50 64 50 H136 Q160 50 160 70 L168 112 Q170 128 154 128 Q144 128 136 114 L128 102 H72 L64 114 Q56 128 46 128 Q30 128 32 112 Z" />
        <path d="M64 76 v20 M54 86 h20" />
        <circle cx="128" cy="80" r="4" />
        <circle cx="140" cy="92" r="4" />
      </g>
    )
  }
  return (
    <g>
      <path d="M100 66 C 100 40, 60 40, 60 66 C 60 92, 100 112, 100 124 C 100 112, 140 92, 140 66 C 140 40, 100 40, 100 66 Z" />
      <path d="M20 140 h60 v-30 h-60 z M20 110 l30 -16 l30 16" />
    </g>
  )
}

/** The recurring dog, sitting at the right: large upright ears, a muzzle and a blue collar
    (placeholder art colour, not a UI token), matching the header scene's dog. */
function Dog() {
  return (
    <g transform="translate(196 92)">
      <path d="M10 64 Q6 46 12 34 Q10 28 14 24 L20 23 Q26 22 29 26 Q33 34 34 46 Q35 56 32 64 Z" />
      <path d="M14 25 L11 5 L20 18 M24 22 L28 3 L30 22" />
      <path d="M17 18 Q22 13 30 17 Q38 20 45 24 Q47 28 42 29 Q34 29 28 29" />
      <circle cx="41" cy="25" r="1" fill="currentColor" />
      <path d="M32 61 Q44 60 48 50" />
      <path d="M13 31 Q20 35 28 31" stroke="#2f6fdf" strokeWidth="2.5" />
    </g>
  )
}
