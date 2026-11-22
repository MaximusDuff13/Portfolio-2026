'use client'
/* 01 Audit's findings, grouped by the screen they were taken from (option B, "Tinted groups", picked
   Nov 22 2026 over the plain row, two rows and a labelled row; an overlapping version with arrows was
   turned down as muddled). One tinted box per source: its screen on top with the inspected button
   ringed, its marked-up panels underneath. Nothing overlaps. Rows are level across the boxes on
   desktop; the panels keep their own heights. Tablets put the panels side by side inside each box. */
import { useEffect, useRef, useState } from 'react'
import { Develop } from './Develop'
import { MarkedUpShot, type Note, type Ring } from './MarkedUpShot'

export type Finding = { tag: string; headline: string; desc: string; src: string; alt: string; w: number; h: number; rings: Ring[]; notes: Note[] }

/* a source screen, cropped from the original audit capture; `ring` is [cx, cy, rx, ry] in its pixels */
type Src = { name: string; img: string; alt: string; w: number; h: number; ring: [number, number, number, number] }
const FORM: Src = {
  name: 'Track Application form',
  img: '/images/acentra-audit/context-form.webp',
  alt: 'The foot of the old Track Application form, its Submit button selected',
  w: 375, h: 190, ring: [305, 128, 48, 25],
}
const LIBRARY: Src = {
  // built by the previous team, before Michael's (confirmed Nov 22 2026)
  name: 'The previous team’s Angular library',
  img: '/images/acentra-audit/context-buttons.webp',
  alt: 'Buttons from the previous team’s Angular library, shown in Figma, the default button selected',
  w: 732, h: 170, ring: [78, 66, 50, 31],
}

/* the screen, with a pen ring drawn on once it scrolls into view */
function Screen({ s }: { s: Src }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const [cx, cy, rx, ry] = s.ring
  return (
    <div ref={ref} data-on={on || undefined} className="cs-markup relative overflow-hidden rounded-lg border border-solid border-border bg-white">
      <Develop>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.img} alt={s.alt} width={s.w} height={s.h} className="block h-auto w-full" />
      </Develop>
      <svg viewBox={`0 0 ${s.w} ${s.h}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} pathLength={1} className="cs-ring" style={{ stroke: 'oklch(var(--c-accent))', strokeWidth: 3, animationDelay: '1100ms' }} />
      </svg>
    </div>
  )
}

const TakenFrom = ({ s }: { s: Src }) => (
  <p className="m-0 text-body-sm font-sans text-foundation-700">
    Taken from: <span className="font-medium text-foundation-900">{s.name}</span>
  </p>
)

const Shot = ({ f, i }: { f: Finding; i: number }) => (
  <MarkedUpShot src={f.src} alt={f.alt} w={f.w} h={f.h} rings={f.rings} notes={f.notes} delay={i * 180} />
)

function Text({ f, i }: { f: Finding; i: number }) {
  return (
    <div>
      <p className="mt-5 mb-0 text-label font-sans uppercase tracking-widest text-foundation-600">{String(i + 1).padStart(2, '0')} · {f.tag}</p>
      <h3 className="mt-2 mb-0 text-heading-m font-display text-foundation-900">{f.headline}</h3>
      <p className="mt-2 mb-0 text-body-sm font-sans text-foundation-700">{f.desc}</p>
    </div>
  )
}

/* items: accessibility (from the form), then colour and type (both from the button library) */
export function AuditFindings({ items }: { items: Finding[] }) {
  const box = 'grid grid-cols-1 content-start gap-y-5 rounded-2xl p-4 sm:p-6 lg:row-span-4 lg:grid-rows-subgrid lg:gap-y-0'
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:grid-rows-[auto_auto_auto_auto] lg:gap-y-0">
      <div className={`${box} bg-stage-sage md:max-lg:grid-cols-2 md:max-lg:grid-rows-[auto_auto_1fr] md:max-lg:gap-x-6`}>
        <div className="md:max-lg:col-span-2 lg:mb-3"><TakenFrom s={FORM} /></div>
        <div className="lg:mb-6"><Screen s={FORM} /></div>
        <div className="md:max-lg:col-start-2 md:max-lg:row-span-2 md:max-lg:row-start-2"><Shot f={items[0]} i={0} /></div>
        <Text f={items[0]} i={0} />
      </div>
      <div className={`${box} bg-stage-straw md:grid-cols-2 md:gap-x-6`}>
        <div className="md:col-span-2 lg:mb-3"><TakenFrom s={LIBRARY} /></div>
        <div className="md:col-span-2 lg:mb-6"><Screen s={LIBRARY} /></div>
        {[1, 2].map((i) => (
          <div key={i} className="lg:row-span-2 lg:grid lg:grid-rows-subgrid">
            <div><Shot f={items[i]} i={i} /></div>
            <Text f={items[i]} i={i} />
          </div>
        ))}
      </div>
    </div>
  )
}
