'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { TabBar } from './TabBar'

/* ------------------------------------------------------------------ *
 * Visuals
 *
 * Color visuals are CSS stand-ins for now. When the real exports land,
 * drop the files in /public/images/carbon/ and swap the area's `Visual`
 * to: () => <ImageVisual src="/images/carbon/anchor.png" alt="…" />
 * ------------------------------------------------------------------ */
export function ImageVisual({
  src,
  alt,
  square = false,
  position = 'center',
}: {
  src: string
  alt: string
  /** crop into a 400px square (object-cover) */
  square?: boolean
  /** object-position when square, e.g. 'left' / 'center' */
  position?: string
}) {
  if (square) {
    return (
      <div className="flex justify-center">
        <div className="w-[400px] max-w-full aspect-square rounded border border-border overflow-hidden bg-body">
          <img src={src} alt={alt} className="w-full h-full object-cover block" style={{ objectPosition: position }} />
        </div>
      </div>
    )
  }
  // Cap height so tall (square) specimens shrink and the row gives them top/bottom
  // breathing room; wide specimens are already shorter than the cap, so unaffected.
  return (
    <div className="flex justify-center">
      <img src={src} alt={alt} className="max-h-[400px] max-w-full w-auto rounded border border-border block" />
    </div>
  )
}

function ScaleVisual() {
  const steps = [
    { s: '72', label: 'Display' },
    { s: '36', label: 'Heading' },
    { s: '16', label: 'Body' },
  ]
  return (
    <div className="h-80 rounded border border-border p-5 flex flex-col justify-center gap-3">
      {steps.map((st) => (
        <div key={st.label} className="flex items-baseline gap-4 border-b border-border pb-3 last:border-0">
          <span className="font-grotesk text-foundation-900 leading-none" style={{ fontSize: `${Math.min(Number(st.s), 40)}px` }}>Aa</span>
          <span className="text-caption font-sans text-foundation-500">{st.label} · {st.s}px</span>
        </div>
      ))}
    </div>
  )
}

function HierarchyVisual() {
  const rows = [
    { role: 'Display', wt: 'Medium 500' },
    { role: 'Heading', wt: 'Medium 500' },
    { role: 'Body', wt: 'Regular 400' },
    { role: 'Caption', wt: 'Regular 400' },
  ]
  return (
    <div className="h-80 rounded border border-border p-5 flex flex-col justify-center gap-2.5">
      {rows.map((r) => (
        <div key={r.role} className="flex items-center justify-between border-b border-border pb-2.5 last:border-0">
          <span className="text-body-sm font-grotesk text-foundation-900">{r.role}</span>
          <span className="text-caption font-sans text-foundation-400">{r.wt}</span>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Content
 * ------------------------------------------------------------------ */
type Area = { num: string; title: string; desc: string; Visual: () => JSX.Element }
type TabKey = 'color' | 'typography'

const TABS: { key: TabKey; label: string; areas: Area[] }[] = [
  {
    key: 'color',
    label: 'Color',
    areas: [
      {
        num: '01',
        title: 'Anchor',
        desc: "We partnered with Marketing to select a green that worked for both brand and product — mapped to Carbon's Green 60 to match the luminance of the rest of their colour scale.",
        Visual: () => <ImageVisual src="/images/Carbon/Anchor.png" alt="Acentra palette contrast ratios against light and dark backgrounds" />,
      },
      {
        num: '02',
        title: 'Rhythm',
        desc: '4 steps to 3:1 for large text and UI. 5 steps to 5:1 for body and interactive. Every stop in the ramp has a contrast reason — not just a shade.',
        Visual: () => <ImageVisual src="/images/Carbon/Rythmm.png" alt="The Acentra green ramp — Leaf primary with Green 10 / 60 / 100 contrast magic numbers" />,
      },
      {
        num: '03',
        title: 'Discipline',
        desc: 'Mapped semantic tokens to a purposeful subset — not every foundation shade was exposed. The constraint kept decisions consistent across teams.',
        // TODO(revisit): wide 2:1 diagram sits awkwardly next to the square specimens.
        // Square-crop looked bad; revert to full image for now. Re-export a square or
        // redesign this row later. `square`/`position` props on ImageVisual are ready.
        Visual: () => <ImageVisual src="/images/Carbon/Discpline.png" alt="Token flow — Green 60 mapped through semantic and component tokens to UI" />,
      },
    ],
  },
  {
    key: 'typography',
    label: 'Typography',
    areas: [
      {
        num: '01',
        title: 'Scale',
        desc: "A modular scale on Carbon's IBM Plex foundation, retuned to Acentra's voice — display through caption, each step with a deliberate ratio.",
        Visual: ScaleVisual,
      },
      {
        num: '02',
        title: 'Hierarchy',
        desc: 'Two weights, four roles. Constrained styles so every screen reads consistently and engineers reach for tokens, not pixel values.',
        Visual: HierarchyVisual,
      },
    ],
  },
]

export function BuiltOnCarbon() {
  const [tab, setTab] = useState<TabKey>('color')
  const areas = TABS.find((t) => t.key === tab)!.areas
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setActive(0)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx))
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    refs.current.slice(0, areas.length).forEach((r) => r && obs.observe(r))
    return () => obs.disconnect()
  }, [tab, areas.length])

  const a2 = Math.min(active, areas.length - 1)

  return (
    <section className="border-t border-border pt-section">
      <SectionHeader index="04" eyebrow="Built on Carbon" title="A foundation, not a paint job" />

      <div className="mt-10 mb-4">
        <TabBar tabs={TABS} active={tab} onChange={setTab} layoutId="carbon-tab-underline" />
      </div>

      <div className="relative mt-8">
        {/* base rail */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
        {/* progress fill — dark trail of completed steps */}
        <motion.div
          className="absolute left-5 top-0 w-px bg-foundation-900"
          animate={{ height: `${((a2 + 1) / areas.length) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        {areas.map((a, i) => {
          const done = i < a2
          const cur = i === a2
          return (
            <div
              key={a.title}
              data-idx={i}
              ref={(el) => { refs.current[i] = el }}
              className="grid grid-cols-12 gap-8 items-center min-h-[58vh]"
            >
              {/* node — left-anchored so its centre (w-10 → 20px) lands on the rail at left-5 */}
              <div className="col-span-1 flex justify-start">
                <span
                  className={`shrink-0 w-10 h-10 rounded-full grid place-items-center text-body-sm font-grotesk z-10 transition-colors duration-300 ${
                    cur
                      ? 'bg-accent-warm text-body border border-accent-warm'
                      : done
                        ? 'bg-foundation-900 text-body border border-foundation-900'
                        : 'bg-body border border-border text-foundation-400'
                  }`}
                >
                  {a.num}
                </span>
              </div>
              {/* text */}
              <div className={`col-span-4 transition-opacity duration-300 ${cur ? '' : 'opacity-40'}`}>
                <p className="text-heading-xl font-grotesk text-foundation-900 mb-3">{a.title}</p>
                <p className="text-body font-sans text-foundation-600">{a.desc}</p>
              </div>
              {/* visual — natural height (specimens vary in aspect ratio); rides in the same row, scales up when active */}
              <div className={`col-span-7 transition-all duration-500 ${cur ? 'opacity-100 scale-100' : 'opacity-45 scale-[0.97]'}`}>
                <a.Visual />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
