'use client'
// TEMPORARY preview route — not linked from nav, not part of the case study.
//
// Renders the real Impact section (unchanged, imported from the case study), then the new
// Before section, then one Process layout at a time, inside the Data Conversion App page shell.
// The layout switcher is the existing TabBar with its own layoutId.
//
// ?t=<key> opens one layout directly and ?still=1 hides the preview chrome and pins the
// entrance animation's end state, so a single layout can be measured in an iframe at a given
// width. Read with useSearchParams inside Suspense — reading window.location during render
// breaks hydration.
//
// Delete this route, src/components/process/ and src/components/before/ once a layout is
// chosen.
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { TabBar } from '@/components/TabBar'
import { Impact } from '@/app/work/data-conversion-app/Impact'
import { Before } from '@/components/before/Before'
import ProcessA from '@/components/process/ProcessA'
import ProcessB from '@/components/process/ProcessB'
import ProcessC from '@/components/process/ProcessC'
import ProcessD from '@/components/process/ProcessD'
import ProcessE from '@/components/process/ProcessE'
import ProcessF from '@/components/process/ProcessF'

const layouts = {
  a: { label: 'A · Split selector', Component: ProcessA },
  b: { label: 'B · Stacked reveal', Component: ProcessB },
  c: { label: 'C · Index + stage', Component: ProcessC },
  d: { label: 'D · Accordion', Component: ProcessD },
  e: { label: 'E · Margin index', Component: ProcessE },
  f: { label: 'F · Paired columns', Component: ProcessF },
} as const

type Key = keyof typeof layouts

const keys = Object.keys(layouts) as Key[]
const tabs = keys.map((k) => ({ key: k, label: layouts[k].label }))

function Preview() {
  const params = useSearchParams()
  const raw = params.get('t')
  const initial = raw && (keys as string[]).includes(raw) ? (raw as Key) : 'a'
  const chrome = !params.get('still')
  const [active, setActive] = useState<Key>(initial)

  const Layout = layouts[active].Component

  return (
    <main className={`min-h-screen bg-body${chrome ? '' : ' preview-still'}`}>
      {chrome && (
        <div className="px-6 sm:px-10 lg:px-section pt-section">
          <div className="max-w-6xl mx-auto">
            <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-6">
              Preview · Before + Process · not linked from nav
            </p>
            <TabBar tabs={tabs} active={active} onChange={setActive} layoutId="process-preview" />
          </div>
        </div>
      )}

      {/* Impact, unchanged, for context above Before. */}
      <Impact />
      <Before />
      <Layout />
    </main>
  )
}

export default function ProcessPreviewPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-body" />}>
      <Preview />
    </Suspense>
  )
}
