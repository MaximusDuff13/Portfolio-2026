'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/*  ONE-OFF for the Data Conversion App product-shot section — deliberately NOT in src/components.

    NEW pattern: a client component because it holds hover/tap state. The page stays a server component.

    Resting: the current depth stack — front screen centred, two screens offset up-left behind it.
    Spread:  all three slide into an even left-to-right row. Far-back goes left, mid-back goes right,
             front stays centred and shrinks to match — the anchor never leaves the middle.
             At the same time the whole row scales up (see MAX_SCALE), so it "opens up and comes
             forward" rather than only sliding sideways.

    Everything is expressed as % of the container so both states share one footprint and the
    section never changes height. Vertical placement is FIXED across states: every screen's top
    sits on the resting front screen's top (72px above the hero seam at full width), and the row
    scales from its top edge — so the spread keeps the same hero overlap as the stack. Only
    horizontal position and size animate.

    Contrast: parts of each screen sit on the dark hero. The main fix lives in the SVGs — their
    title bars are foundation-700, lighter than the foundation-900 hero, so the chrome reads as
    its own surface (a near-black bar melted into the hero). Two things here reinforce it:
      - EDGE: a 1px white/16% ring outside the light hairline border. On the hero it reads as a
        crisp light edge; on the light section below it's invisible, so nothing changes there.
      - DIMMING: back layers dim the IMAGE, not the panel, so their edge stays full strength and
        their dark chrome fades toward the light panel ground rather than darker into the hero.

    Input:
      mouse → spreads on pointer enter, restacks on leave
      touch → tap toggles (hover doesn't exist; a sticky :hover after tap would be unreliable)
    Reduced motion: stays stacked and ignores input — the static state with the least movement.

    Images are PLACEHOLDERS: hand-drawn SVGs in public/images/dca-placeholder — no license or
    attribution needed. Swap `src` for real product screenshots (16:9) when they exist.

    Panels use the page's screenshot frame styling: foundation-100 ground, hairline border, rounded-lg. */

const PANEL = 'absolute overflow-hidden rounded-lg border border-border bg-foundation-100 aspect-video'

// Stacked front width, and spread width + gap. 3 × 32 + 2 × 2 = 100.
// Container is the page's max-w-6xl column (1152px), so the resting front screen is ~829px.
const STACK_W = 72
const SPREAD_W = 32
const GAP = 2
// Container ratio = width : stacked panel height (72% × 9/16 = 40.5% of width) → 200 : 81.
// Spread panels are shorter (18% of width) but keep top: 0, so the row hangs from the same line.

// Edge ring (legible on the dark hero, invisible on the light section) + drop shadow per depth.
const RING = '0 0 0 1px rgba(255, 255, 255, 0.16)'
const SHADOW_FRONT = `${RING}, 0 25px 50px -12px rgba(0, 0, 0, 0.3)`
const SHADOW_BACK = `${RING}, 0 10px 15px -3px rgba(0, 0, 0, 0.15)`

// Spread-row scale, on top of a row that already fills the 1152px column. At full scale the row
// is 1440px — 144px past the column on each side, reaching into the section's 80px gutter — so
// it's clamped at runtime to the section's width minus EDGE on each side: it never overflows,
// and never gets closer than 40px to the viewport edge. Full 1.25 needs a viewport of ~1535px;
// narrower screens get whatever fits (e.g. ~1.17 at 1440px), and ~1250px and below don't grow.
const MAX_SCALE = 1.25
const EDGE = 40

// ~380ms ease-out: quick to start, settles gently. Same curve both directions, and the row's
// scale uses the identical timing so position and size move as one gesture.
const EASE = '380ms cubic-bezier(0.22, 1, 0.36, 1)'
const PANEL_TRANSITION = ['left', 'width', 'transform'].map((p) => `${p} ${EASE}`).join(', ')

type Layer = {
  label: string
  src: string
  z: string
  stacked: { offset: number; opacity: number }
  spreadLeft: number
}

const layers: Layer[] = [
  // far back → fans out to the left
  { label: 'Programs', src: '/images/dca-placeholder/programs.svg', z: 'z-10', stacked: { offset: -40, opacity: 0.8 }, spreadLeft: 0 },
  // mid back → slides out to the right
  { label: 'Live view', src: '/images/dca-placeholder/live-view.svg', z: 'z-20', stacked: { offset: -20, opacity: 0.9 }, spreadLeft: 2 * (SPREAD_W + GAP) },
  // front → stays centred
  { label: 'Workspace', src: '/images/dca-placeholder/workspace.svg', z: 'z-30', stacked: { offset: 0, opacity: 1 }, spreadLeft: SPREAD_W + GAP },
]

export function DepthStack() {
  const [spread, setSpread] = useState(false)
  const [scale, setScale] = useState(MAX_SCALE)
  const prefersReduced = useReducedMotion()
  const pointerType = useRef<string>('mouse')
  const wrapRef = useRef<HTMLDivElement>(null)

  // Largest scale that keeps the row at least EDGE px inside the section on both sides.
  const measure = () => {
    const el = wrapRef.current
    const section = el?.parentElement
    if (!el || !section) return
    const avail = section.clientWidth - 2 * EDGE
    // offsetWidth ignores transforms, so this is always the unscaled width
    setScale(Math.max(1, Math.min(MAX_SCALE, avail / el.offsetWidth)))
  }

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const set = (v: boolean) => !prefersReduced && setSpread(v)

  return (
    // pt-10 reserves room for the back layers, which offset up to 40px above the front screen
    <div ref={wrapRef} className="max-w-6xl mx-auto pt-10">
      <div
        className="relative aspect-[200/81] cursor-pointer select-none"
        style={{
          transform: `scale(${spread ? scale : 1})`,
          // top edge stays put while scaling, so the row keeps its hero overlap
          transformOrigin: 'top center',
          transition: prefersReduced ? 'none' : `transform ${EASE}`,
        }}
        onPointerDown={(e) => { pointerType.current = e.pointerType }}
        onPointerEnter={(e) => e.pointerType === 'mouse' && set(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && set(false)}
        onClick={() => pointerType.current !== 'mouse' && set(!spread)}
      >
        {layers.map(({ label, src, z, stacked, spreadLeft }) => (
          <div
            key={label}
            className={`${PANEL} ${z}`}
            style={{
              top: '0%',
              boxShadow: label === 'Workspace' ? SHADOW_FRONT : SHADOW_BACK,
              transition: prefersReduced ? 'none' : PANEL_TRANSITION,
              ...(spread
                ? { left: `${spreadLeft}%`, width: `${SPREAD_W}%`, transform: 'translate(0, 0)' }
                : {
                    left: `${(100 - STACK_W) / 2}%`,
                    width: `${STACK_W}%`,
                    transform: `translate(${stacked.offset}px, ${stacked.offset}px)`,
                  }),
            }}
          >
            {/* dim the image, not the panel — keeps the edge ring at full strength (see header) */}
            <img
              src={src}
              alt={`${label} screen (placeholder)`}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: spread ? 1 : stacked.opacity,
                transition: prefersReduced ? 'none' : `opacity ${EASE}`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
