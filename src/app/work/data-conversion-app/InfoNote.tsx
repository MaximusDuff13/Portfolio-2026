'use client'

import { useEffect, useRef, useState } from 'react'

/*  ONE-OFF for the Data Conversion App Result section — deliberately NOT in src/components.
    Promote it to the shared library only once a note treatment is locked and a second page needs it.

    Two treatments to compare:
      A — restrained : flat card, hairline border, ruled lines, no rotation
      B — full effect: same ruled lines, plus slight rotation and a torn bottom edge

    Ruled-line math (so handwriting sits ON the rules rather than floating above them):
      rules repeat every LINE_H, offset by PAD_Y + BASELINE from the padding-box top,
      where BASELINE ≈ (LINE_H − FONT_SIZE) / 2 + the face's ascender.

    FONT_SIZE / LINE_H are component-local optical values, NOT new tailwind.config.js tokens.
    Caveat sets small for its nominal size — at the 16px body token it read cramped, so the
    note runs slightly larger. Nothing outside this popover uses these numbers.
*/

const RULE_COLOR = '#e7e5e4' // foundation-200 / border — matched by hex because CSS gradients can't read a Tailwind class
const FONT_SIZE = 19
const LINE_H = 32
// Measured, not estimated: Caveat at 19px reports ascent 18 / descent 6 via canvas metrics,
// so the baseline sits at (32 − 24) / 2 + 18 = 22px from the top of each line band.
const BASELINE = 22
const WIDTH = 440 // was 288 — wider so the handwriting gets full lines to run along
const PAD_X = 28
const PAD_Y = 22

// Torn bottom edge for variant B. Jittered points across the bottom only; the other three
// edges stay straight so the card still reads as a card.
const TORN_EDGE =
  'polygon(0% 0%, 100% 0%, 100% 93%, 96.5% 97%, 93% 92.5%, 89.5% 96.5%, 86% 92%, 82.5% 96%, 79% 93%, 75.5% 97.5%, 72% 94%, 68.5% 98%, 65% 93.5%, 61.5% 97%, 58% 92.5%, 54.5% 96.5%, 51% 93%, 47.5% 97.5%, 44% 94%, 40.5% 98%, 37% 93.5%, 33.5% 97%, 30% 92.5%, 26.5% 96%, 23% 93%, 19.5% 97.5%, 16% 94%, 12.5% 98%, 9% 93.5%, 5.5% 97%, 2% 92.5%, 0% 96%)'

function InfoIcon() {
  // Hand-rolled to match CheckMark / ArrowRight / MetricIcon already in this route —
  // the project has no icon library and this avoids adding one for a single glyph.
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="5.6" stroke="currentColor" strokeWidth="1" />
      <path d="M6.5 5.7v3.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6.5" cy="3.8" r="0.7" fill="currentColor" />
    </svg>
  )
}

export function InfoNote({
  note,
  label,
  variant = 'A',
  placement = 'below',
}: {
  note: string
  /** names the thing being explained, for screen readers — e.g. "Data conversion time" */
  label: string
  variant?: 'A' | 'B'
  /**
   * Which way the note opens, relative to the ROW it sits in — 'above' clears the row's top
   * edge, 'below' its bottom edge. Pick whichever side faces open space.
   *
   * NOTE: the popover anchors to the nearest positioned ancestor, which must be the row
   * (give it `relative`). It deliberately does NOT anchor to the trigger: the ledger aligns
   * label and stat on a shared baseline, so "above the trigger" still lands on top of a 48px
   * stat number. Anchoring to the row makes clearance independent of the stat's font size.
   */
  placement?: 'above' | 'below'
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLSpanElement>(null)
  const id = `note-${label.replace(/\s+/g, '-').toLowerCase()}-${variant}`

  // Escape dismisses, and a tap/click outside closes it — so it isn't mouse-only or a trap.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  // B needs extra room at the foot so the torn edge bites into empty paper, not the last line.
  const padBottom = variant === 'B' ? PAD_Y + 16 : PAD_Y

  const card = (
    <span
      id={id}
      role="tooltip"
      // span, not div: this renders inside a <p> label, where a block element would be invalid.
      // normal-case / tracking-normal undo the label's uppercase + widest tracking, which would
      // otherwise be inherited and make the handwriting render as spaced-out capitals.
      // font-normal matters: the label this sits inside is text-label (weight 700), and without
      // it the handwriting inherits bold. normal-case / tracking-normal undo the same inheritance.
      className={`relative block font-hand font-normal normal-case tracking-normal text-foundation-700 bg-body ${
        variant === 'A' ? 'rounded-md border border-border shadow-sm' : 'rounded-sm'
      }`}
      style={{
        width: `${WIDTH}px`,
        padding: `${PAD_Y}px ${PAD_X}px ${padBottom}px`,
        ...(variant === 'B' ? { clipPath: TORN_EDGE } : null),
      }}
    >
      {/* Ruling sits on its own layer so it can run the full width of the card — like real ruled
          paper — while staying bounded to the text block vertically. Painting it on the card itself
          let the gradient tile upward into the top padding as stray borders; painting it on the
          text element stopped the rules at the text's own box, so they only showed in trailing
          whitespace. Inset top/bottom by the padding = exactly the content area. */}
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: `${PAD_Y}px`,
          bottom: `${padBottom}px`,
          backgroundImage: `repeating-linear-gradient(to bottom, ${RULE_COLOR} 0px, ${RULE_COLOR} 1px, transparent 1px, transparent ${LINE_H}px)`,
          backgroundPosition: `0 ${BASELINE}px`,
        }}
      />
      <span
        className="relative block"
        style={{ fontSize: `${FONT_SIZE}px`, lineHeight: `${LINE_H}px` }}
      >
        {note}
      </span>
    </span>
  )

  return (
    // no `relative` here on purpose — see the placement prop docs; the row is the anchor
    <span ref={wrapRef} className="inline-flex items-center">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        aria-label={`About ${label}`}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        // negative margin keeps the larger touch target from disturbing the label's spacing
        className="p-1 -m-1 text-foundation-400 hover:text-accent-warm focus-visible:text-accent-warm rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm transition-colors"
      >
        <InfoIcon />
      </button>

      {open && (
        <span
          className={`absolute left-0 z-20 block ${
            placement === 'above' ? 'bottom-full mb-3' : 'top-full mt-3'
          }`}
        >
          {variant === 'B' ? (
            // outer element carries rotation + shadow, because clip-path on the card itself
            // would clip a box-shadow away; drop-shadow follows the torn silhouette instead.
            <span
              className="block"
              style={{ transform: 'rotate(-1.5deg)', filter: 'drop-shadow(0 6px 14px rgba(28,25,23,0.14))' }}
            >
              {card}
            </span>
          ) : (
            card
          )}
        </span>
      )}
    </span>
  )
}
