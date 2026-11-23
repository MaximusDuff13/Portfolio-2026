'use client'
import { useEffect, useRef, useState } from 'react'
import { SectionHeader } from './SectionHeader'
import { Develop } from './Develop'
import { ScreensShowcase } from './ScreensShowcase'

/* 04 The system in use (remade Nov 23 2026). Michael: the before/after only answered one of 01's
   findings (colour). Now the section reads in the order of its title, tokens → library → screens:
   1. the component library video;
   2. "Found in 01, fixed": the three findings of 01 (accessibility, colour, type), each as a pair
      of close-ups, old screen | new screen, cut from his two exports. The close-ups stay readable on
      phones; tapping one opens the whole export.
   The two exports are different screens (Before: Submit Institutional Claim; After: Provider
   Enrollment), so nothing here says "the same screen". Figures come from his own exhibits:
   Forest Green #1C8B38 at 4.37:1 (01), Green 60 at 5.1:1 on white (03). */

const FX = '/images/acentra-fixes/'

/* Handwritten notes, in the crop's own pixels. They may run past the crop's edge into the card's
   white space (the overlay doesn't clip). `fs` is the note size in crop pixels, set so every note
   reads at about 19px on desktop whatever the crop's scale. */
type Mark = { text: string; x: number; y: number; path?: string; ring?: [number, number, number, number] }
type Side = { src: string; w: number; h: number; line: string; alt: string; fs: number; marks: Mark[] }
type Fix = { n: string; topic: string; title: string; before: Side; after: Side }

const FIXES: Fix[] = [
  {
    n: '01',
    topic: 'Accessibility',
    title: 'The green passes now',
    before: { src: `${FX}access-before.webp`, w: 266, h: 68, line: 'Forest Green: 4.37:1 on white, fails AA', alt: 'Old buttons: a Forest Green Submit button with pill-shaped outline buttons beside it', fs: 20, marks: [{ text: '#1C###8: 4.37:1, fails AA', x: 120, y: 104, path: 'M 114 96 Q 84 92 70 60', ring: [59, 34, 54, 22] }] },
    after: { src: `${FX}access-after.webp`, w: 324, h: 78, line: 'Green 60: 5.1:1 on white, passes AA', alt: 'New buttons: a Green 60 Next button and a dark Cancel button, both with 2px corners', fs: 20, marks: [{ text: 'button-primary: 5.1:1, passes AA', x: 36, y: 112, path: 'M 60 96 Q 70 88 76 72', ring: [80, 40, 76, 30] }] },
  },
  {
    n: '02',
    topic: 'Colour',
    title: 'Colours come from tokens',
    before: { src: `${FX}colour-before.webp`, w: 380, h: 140, line: 'A colour name only one team understood', alt: 'Old form fields: a Provider ID text field and a Billing Location dropdown, filled with a hand-picked grey', fs: 20, marks: [{ text: 'Oxford Shade 2:', x: 130, y: 166, path: 'M 124 158 Q 104 150 96 134' }, { text: 'meant nothing to other teams', x: 130, y: 190 }] },
    after: { src: `${FX}colour-after.webp`, w: 312, h: 178, line: 'Fields take their colour from tokens', alt: 'New form fields: a Title dropdown and a First Name text field, coloured by the layer and text tokens', fs: 20, marks: [{ text: 'text-primary', x: 60, y: 20, path: 'M 54 14 Q 40 30 58 46' }, { text: 'layer', x: 318, y: 154, path: 'M 314 148 L 300 148' }] },
  },
]

const PEN = '#b15900' // the darker ginger of the pen notes in 01; the cards are white in both themes

function PenNotes({ side, delay }: { side: Side; delay: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${side.w} ${side.h}`}
      className="cs-markup pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      data-on={on || undefined}
      aria-hidden="true"
    >
      {side.marks.map((m, i) => (
        // the close-up develops first; the pen notes wait for it
        <g key={m.text} className="cs-mark-note" style={{ animationDelay: `${delay + 900 + i * 200}ms` }}>
          {m.ring && <ellipse cx={m.ring[0]} cy={m.ring[1]} rx={m.ring[2]} ry={m.ring[3]} className="cs-arrow" style={{ stroke: PEN, strokeWidth: 2.5 }} />}
          {m.path && <path d={m.path} className="cs-arrow" style={{ stroke: PEN, strokeWidth: 2.5 }} />}
          <text x={m.x} y={m.y} style={{ fill: PEN, fontSize: side.fs }}>{m.text}</text>
        </g>
      ))}
    </svg>
  )
}

function Card({ side, label, delay, caption = true }: { side: Side; label: 'Before' | 'After'; delay: number; caption?: boolean }) {
  return (
    <figure className="m-0 flex flex-col">
      <div className="relative flex min-h-[200px] flex-1 items-center justify-center overflow-hidden rounded-lg border border-border bg-white px-4 pb-12 pt-12 sm:px-6">
        <span className={`absolute left-3 top-3 rounded-md px-2.5 py-1 font-sans text-label uppercase ${label === 'Before' ? 'bg-foundation-800 text-body' : 'bg-accent-warm text-body'}`}>{label}</span>
        <div className="relative w-full" style={{ maxWidth: side.w }}>
          <Develop delay={delay}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={side.src} alt={side.alt} width={side.w} height={side.h} loading="lazy" className="block h-auto w-full" />
          </Develop>
          <PenNotes side={side} delay={delay} />
        </div>
      </div>
      {caption && <figcaption className="mt-2 font-sans text-body-sm text-foundation-700">{side.line}</figcaption>}
    </figure>
  )
}

function Heading({ f }: { f: Fix }) {
  return (
    <>
      <p className="m-0 font-sans text-label uppercase text-foundation-700">
        {f.n} · {f.topic}
      </p>
      <h4 id={`fix-${f.n}`} className="m-0 mt-1 font-display text-heading-m text-foundation-900">{f.title}</h4>
    </>
  )
}

/* PICKED C (Nov 23 2026): one sage stage as a table; Before and After are the column heads, each finding a row.
   Tried and dropped: separate bands, two columns, words beside. No tap-to-open (Michael). */
function Fixes() {
  return (
    <div className="mt-8 rounded-xl bg-stage-sage p-4 sm:p-6">
      <div className="hidden md:grid md:grid-cols-[180px_1fr_1fr] md:gap-6">
        <span />
        <span className="font-sans text-label uppercase text-foundation-700">Before</span>
        <span className="font-sans text-label uppercase text-foundation-700">After</span>
      </div>
      {FIXES.map((f, i) => (
        <section key={f.n} aria-labelledby={`fix-${f.n}`} className={`grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr_1fr] md:gap-6 ${i ? 'mt-6 border-t border-border pt-6' : 'mt-4'}`}>
          <div>
            <Heading f={f} />
          </div>
          <Card side={f.before} label="Before" delay={i * 80} />
          <Card side={f.after} label="After" delay={i * 80 + 120} />
        </section>
      ))}
    </div>
  )
}

export function SystemInUse() {
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
        <SectionHeader index="04" eyebrow="The system in use" title="From tokens to real screens" />
        <p className="m-0 max-w-sm text-body-sm font-sans text-foundation-700 md:pb-1">
          The tokens became a component library, and the library rebuilt our product screens.
        </p>
      </div>

      {/* a light sharpen for the library video: a 3×3 unsharp kernel that sums to 1 */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <filter id="video-sharpen">
          <feConvolveMatrix order="3" preserveAlpha="true" kernelMatrix="0 -0.35 0 -0.35 2.4 -0.35 0 -0.35 0" />
        </filter>
      </svg>

      {/* 1. the library */}
      <figure className="m-0 mt-10">
        <div className="rounded-xl bg-stage-sage p-4 sm:p-6">
        <Develop className="rounded-lg">
          {/* the video is 1086 × 720, shown whole and full width (Michael, Nov 23 2026: both theme labels,
              Gray 100 and White, stay in view). The jitter.video watermark in its bottom-right corner
              (about 12% wide, 5% tall, 1.5% in from the right, 2.5% up) is covered by our own label. */}
          <div className="relative aspect-[1086/720] overflow-hidden rounded-lg bg-foundation-900">
            <video
              src="/videos/Component-Video.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              aria-label="The component library, switching between themes"
              className="absolute inset-0 block h-full w-full object-cover"
              // the file is 1086px wide but draws up to ~1400 device pixels, so it looks soft; a light
              // sharpen (the SVG filter below) crisps the text edges. Safari ignores it, harmlessly.
              style={{ filter: "url(#video-sharpen)" }}
            />
            <span aria-hidden="true" className="pointer-events-none absolute flex items-center justify-center rounded-md bg-foundation-900 font-sans text-[clamp(9px,1.1vw,13px)] font-medium text-body shadow-sm" style={{ right: "0.8%", bottom: "1.6%", width: "14.5%", height: "7%" }}>
              Component library
            </span>
          </div>
        </Develop>
        </div>
        <figcaption className="mt-3 font-sans text-body-sm text-foundation-700">
          The component library, switching between Carbon’s White and Gray 100 themes.
        </figcaption>
      </figure>

      {/* 2. 01's three findings, fixed on real screens */}
      <h3 className="mt-16 mb-0 font-display text-heading-m text-foundation-900">What the audit found, fixed on real screens</h3>
      <Fixes />

      {/* 3. screens built with the system (layout on trial) */}
      <ScreensShowcase />
    </>
  )
}
