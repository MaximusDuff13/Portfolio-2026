'use client'
// TEMPORARY preview route — not linked from nav, not part of the case study.
//
// Renders each candidate "The problem" layout inside the real Data Conversion App page shell
// (main.min-h-screen.bg-body, then each layout carries the page's own px-section / max-w-6xl
// column), so what you see here is what the section would look like in place.
//
// ?only=<key>  renders one layout with no preview chrome. The /preview/problem/frames page uses
//              it to mount each layout in a 390px and a 1280px iframe, which is the only way to
//              exercise the sm/md/lg breakpoints here — an iframe gets its own viewport for media
//              queries, a resized wrapper div does not.
//
// The .preview-still class is defined in globals.css — see the note there.
//
// The param is read with useSearchParams inside a Suspense boundary, not from window.location
// during render: the latter returns nothing on the server and a key on the client, so the two
// trees disagree and hydration fails.
//
// Delete this route, and src/components/problem/, once a layout is chosen.
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { TabBar } from '@/components/TabBar'
import ProblemA from '@/components/problem/ProblemA'
import ProblemB from '@/components/problem/ProblemB'
import ProblemC from '@/components/problem/ProblemC'
import ProblemD from '@/components/problem/ProblemD'
import ProblemE from '@/components/problem/ProblemE'
import ProblemF from '@/components/problem/ProblemF'
import { ProblemSection as ProblemG } from '@/app/work/data-conversion-app/ProblemSection'

const layouts = {
  a: { label: 'A · Spine', Component: ProblemA },
  b: { label: 'B · Ledger', Component: ProblemB },
  c: { label: 'C · Margin rail', Component: ProblemC },
  d: { label: 'D · Track', Component: ProblemD },
  e: { label: 'E · Bracket', Component: ProblemE },
  f: { label: 'F · Inversion', Component: ProblemF },
  g: { label: 'G · Editorial', Component: ProblemG },
} as const

type Key = keyof typeof layouts

const keys = Object.keys(layouts) as Key[]
const tabs = keys.map((k) => ({ key: k, label: layouts[k].label }))

function Preview() {
  const params = useSearchParams()
  const raw = params.get('only')
  const only = raw && (keys as string[]).includes(raw) ? (raw as Key) : null

  const [active, setActive] = useState<Key>('a')

  if (only) {
    const Only = layouts[only].Component
    return (
      <main className="min-h-screen bg-body preview-still">
        <Only />
      </main>
    )
  }

  const Active = layouts[active].Component

  return (
    <main className="min-h-screen bg-body">
      <div className="px-section pt-section">
        <div className="max-w-6xl mx-auto">
          <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-6">
            Preview · The Problem · not linked from nav
          </p>
          <TabBar tabs={tabs} active={active} onChange={setActive} layoutId="problem-preview" />
        </div>
      </div>

      <div className="mt-section">
        <Active />
      </div>
    </main>
  )
}

export default function ProblemPreviewPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-body" />}>
      <Preview />
    </Suspense>
  )
}
