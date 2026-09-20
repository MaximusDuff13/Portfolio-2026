'use client'
// Treatment B2 — Split, aligned.
//
// A refinement of B. B's two columns had different anatomies: the left was label-then-sentence,
// the right was quote-then-attribution with the attribution pushed to the bottom of the column,
// where it read as detached. B2 gives both columns the SAME anatomy — label, then text — so the
// pair reads as two of the same thing rather than as two different things side by side.
//
// HOW THE BASELINES LINE UP, without a single pixel offset:
//   · both labels are the same element with the same classes, and the label token is 11px on a
//     1.00 line-height, so their first baselines are identical;
//   · both texts sit under an identical `mt-3`;
//   · both texts are text-body, 16px on the same 1.65 line-height — the serif italic and Inter
//     differ in face, not in leading.
// Matching anatomy plus matching leading is what aligns them; the grid only has to top-align the
// two columns, which it does by putting them in one row.
//
// THE HAIRLINE spans the full row height rather than the right column's content height, because
// grid items stretch by default. That is what makes it run to the bottom of the TALLER column.
// It only looks right if the two columns actually end together, which is what the width split
// below is for.
//
// WIDTH SPLIT: 6/6, not B's 7/5. The two texts are near-identical in length (28 words against
// 27), so equal columns with symmetric gutters (pr-10 / pl-10) land them within a line of each
// other. B's 7/5 was sized for a layout where the attribution hung at the bottom and the right
// column needed less room.
//
// MARKUP: the quote is a <figure> whose FIRST child is the <figcaption> carrying the
// attribution, followed by the <blockquote>. So the document order — and therefore the screen
// reader and tab order — is "For Acentra Health", sentence, "Product Owner", quote, which is
// also the visual order. No display:contents is used anywhere, so the figure keeps its role in
// the accessibility tree.
//
// MOTION: the repo's staggerContainer / staggerItem variants, so the left column lands a beat
// before the right. AnimatedSection is not used here because it has no delay prop and the two
// columns would animate simultaneously. Reduced motion swaps the travel out for a plain fade.
import { motion, useReducedMotion } from 'framer-motion'
import { fadeIn, staggerContainer, staggerItem } from '@/lib/motion'
import { orgLabel, orgLine, quoteText, quoteRole } from './shared'

// One string, used for both labels, so they cannot drift apart in size, weight, colour or
// tracking. This is the design-system label token.
const LABEL = 'text-label font-grotesk text-foundation-500 uppercase tracking-widest'

export default function ImpactBlockB2() {
  const prefersReduced = useReducedMotion()
  const item = prefersReduced ? fadeIn : staggerItem

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="mt-12 border-t border-border pt-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8">

        {/* Left — label, then sentence. */}
        <motion.div variants={item} className="md:col-span-6 md:pr-10">
          <p className={LABEL}>{orgLabel}</p>
          <p className="mt-3 text-body font-sans text-foundation-700">{orgLine}</p>
        </motion.div>

        {/* Right — same anatomy. The hairline is on this column and, because grid items stretch,
            it runs the height of the row. Below md it turns horizontal, since a vertical rule
            has nothing to divide in a single column. */}
        <motion.div
          variants={item}
          className="md:col-span-6 border-t border-border pt-6 md:border-t-0 md:pt-0 md:border-l md:border-border md:pl-10"
        >
          <figure>
            <figcaption className={LABEL}>{quoteRole}</figcaption>
            <blockquote className="mt-3 font-accent accent-italic text-body text-foundation-800">
              {quoteText}
            </blockquote>
          </figure>
        </motion.div>
      </div>
    </motion.div>
  )
}
