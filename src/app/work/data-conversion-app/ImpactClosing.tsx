'use client'
// The closing block of Impact — the "For Acentra Health" statement and the Product Owner quote,
// side by side. This is treatment B2 ("Split, aligned") from the preview exploration.
//
// It is its own file, and the only 'use client' part of the section, for one reason: the left →
// right stagger needs framer-motion's staggerContainer, and AnimatedSection has no delay prop.
// Isolating it here keeps Impact.tsx itself a server component.
//
// BOTH COLUMNS HAVE THE SAME ANATOMY — label, then text. An earlier version had the statement as
// label-then-sentence and the quote as quote-then-attribution, with the attribution pushed to
// the bottom of its column, where it read as detached from the words it belonged to.
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
// grid items stretch by default. That is what makes it run to the bottom of the TALLER column,
// with no dead gap beneath either one.
//
// WIDTH SPLIT: 6/6 with symmetric gutters. The two texts are near-identical in length (28 words
// against 27), so equal columns land them on the same line count — measured at four lines each.
//
// MARKUP: the quote is a <figure> whose FIRST child is the <figcaption> carrying the
// attribution, followed by the <blockquote>. Document order — and so screen reader and tab
// order — is "For Acentra Health", sentence, "Product Owner", quote, matching the visual order.
// No display:contents is used, so the figure keeps its role in the accessibility tree.
import { motion, useReducedMotion } from 'framer-motion'
import { fadeIn, staggerContainer, staggerItem } from '@/lib/motion'

// A non-breaking space, so the company name never splits across a line break.
const NBSP = ' '
const ACENTRA = `Acentra${NBSP}Health`

const orgLabel = `For ${ACENTRA}`

// Qualitative only. There is no measured figure for the overall implementation speed-up, so this
// states the direction and stops. It also re-states which step is meant, so a reader coming
// straight from Problem needs no numbering.
const orgLine = `Mapping and transformation is the longest step in converting a state's data. Shortening it gets ${ACENTRA} to the state's review sooner and speeds up the overall implementation.`

// Reproduced verbatim, including the square brackets and the speaker's own grammar, and wrapped
// in typographic quotation marks written as plain characters. Attribution is role only.
const quoteText =
  '“We have started using the AI based conversion mapping for [an implementation] and were able to produce the first mapping in just 24 hours from 2 to 3 weeks.”'
const quoteRole = 'Product Owner'

// One constant for both labels, so they cannot drift apart in size, weight, colour or tracking.
const LABEL = 'text-label font-grotesk text-foundation-500 uppercase tracking-widest'

export function ImpactClosing() {
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
