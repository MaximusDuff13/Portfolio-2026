'use client'
// TEMPORARY preview route — not linked from nav, not part of the case study.
//
// Swaps the CLOSING PART of Impact (the "For Acentra Health" statement plus the quote) between
// treatments, rendered under the real, unchanged top of Impact — label, big line, paragraph and
// the three-row ledger — inside the Data Conversion App page shell, so each is judged in place.
//
// The top of Impact is reproduced below rather than imported, because Impact.tsx is one
// component with no seam to render half of. It is copied verbatim and must not be edited here:
// the live section is the one in src/app/work/data-conversion-app/Impact.tsx.
//
// Delete this route and src/components/impact/blocks/ once a treatment is chosen.
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatedSection } from '@/components/AnimatedSection'
import { TabBar } from '@/components/TabBar'
import ImpactBlockCurrent from '@/components/impact/blocks/ImpactBlockCurrent'
import ImpactBlockA from '@/components/impact/blocks/ImpactBlockA'
import ImpactBlockB from '@/components/impact/blocks/ImpactBlockB'
import ImpactBlockB2 from '@/components/impact/blocks/ImpactBlockB2'
import ImpactBlockC from '@/components/impact/blocks/ImpactBlockC'
import ImpactBlockD from '@/components/impact/blocks/ImpactBlockD'
import ImpactBlockE from '@/components/impact/blocks/ImpactBlockE'

const treatments = {
  current: { label: 'Current', Component: ImpactBlockCurrent },
  a: { label: 'A · Hanging rule', Component: ImpactBlockA },
  b: { label: 'B · Split', Component: ImpactBlockB },
  b2: { label: 'B2 · Split, aligned', Component: ImpactBlockB2 },
  c: { label: 'C · Hanging margin', Component: ImpactBlockC },
  d: { label: 'D · Closing band', Component: ImpactBlockD },
  e: { label: 'E · Margin aside', Component: ImpactBlockE },
} as const

type Key = keyof typeof treatments

const keys = Object.keys(treatments) as Key[]
const tabs = keys.map((k) => ({ key: k, label: treatments[k].label }))

// ── Impact's unchanged top, copied verbatim ──────────────────────────────────────────────────
const bigAccent = '1 week'
const bigRest = ', drafted by AI'
const paragraph =
  'The MVP drafts the mappings and their transformation rules, and a person confirms them instead of writing each one by hand.'
const ledger = [
  {
    label: 'Speed',
    parts: [
      { text: 'Mapping & transformation went from ' },
      { text: '4 to 6 weeks', strong: true },
      { text: ' to ' },
      { text: '1 week', strong: true },
    ],
  },
  {
    label: 'Coverage',
    parts: [
      { text: '600 of 1,200', strong: true },
      { text: ' target columns mapped at high confidence' },
    ],
  },
  {
    label: 'Real use',
    parts: [{ text: '2', strong: true }, { text: ' programs ran real conversions on the MVP' }],
  },
]

function Preview() {
  // ?t=<key> opens a treatment directly and ?still=1 pins the animation end state, so the frames
  // harness can mount one treatment per iframe. Read via useSearchParams inside Suspense, not
  // from window.location during render, which would break hydration.
  const params = useSearchParams()
  const t = params.get('t')
  const initial = t && (keys as string[]).includes(t) ? (t as Key) : 'current'
  const chrome = !params.get('still')
  const [active, setActive] = useState<Key>(initial)
  // Switching tabs remounts the blocks, so their whileInView animations replay and a screenshot
  // taken straight after catches them mid-fade. `still` pins the end state (see globals.css).
  const [still, setStill] = useState(!chrome)
  const Block = treatments[active].Component

  return (
    <main className={`min-h-screen bg-body${still ? ' preview-still' : ''}`}>
      {chrome && (
      <div className="px-section pt-section">
        <div className="max-w-6xl mx-auto">
          <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-6">
            Preview · Impact closing block · not linked from nav
          </p>
          <TabBar tabs={tabs} active={active} onChange={setActive} layoutId="impact-blocks" />
          <button
            onClick={() => setStill((v) => !v)}
            className="mt-4 text-label font-grotesk text-foundation-400 uppercase tracking-widest hover:text-foundation-600"
          >
            {still ? 'Motion: off' : 'Motion: on'}
          </button>
        </div>
      </div>
      )}

      <section className="px-section pb-section">
        <div className="max-w-6xl mx-auto">
          <div className="pt-section">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6">
              <div className="md:col-span-3">
                <AnimatedSection>
                  <p className="font-accent accent-italic text-heading-m text-foundation-900">
                    Impact
                  </p>
                </AnimatedSection>
              </div>

              <div className="md:col-span-9">
                <AnimatedSection>
                  <p className="max-w-3xl font-accent accent-italic text-display-xl text-foundation-900">
                    <span className="text-accent-warm">{bigAccent}</span>
                    {bigRest}
                  </p>
                  <p className="mt-10 max-w-lg text-body font-sans text-foundation-700">
                    {paragraph}
                  </p>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="mt-12 border-t border-border pt-6">
                    {ledger.map(({ label, parts }) => (
                      <div key={label} className="flex flex-col gap-1 py-2.5 sm:flex-row sm:gap-0">
                        <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest sm:w-36 sm:shrink-0 sm:pt-1">
                          {label}
                        </p>
                        <p className="max-w-lg text-body-sm font-sans text-foundation-600">
                          {parts.map(({ text, strong }) =>
                            strong ? (
                              <span key={text} className="font-medium text-foundation-900">
                                {text}
                              </span>
                            ) : (
                              text
                            ),
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>

                {/* ── the part under test ── */}
                <Block />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function ImpactBlocksPreviewPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-body" />}>
      <Preview />
    </Suspense>
  )
}
