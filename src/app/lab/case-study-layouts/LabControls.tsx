'use client'
import { useState } from 'react'
import Link from 'next/link'
import { TabBar } from '@/components/TabBar'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-body'

/* Jump to a layout (the shared TabBar), and set how many case studies every layout shows */
export function LabControls({ tabs, count, counts }: { tabs: { key: string; label: string }[]; count: number; counts: number[] }) {
  const [active, setActive] = useState(tabs[0].key)
  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-x-auto [scrollbar-width:none]">
        <TabBar
          tabs={tabs}
          active={active}
          layoutId="lab-layouts-underline"
          onChange={(k) => {
            setActive(k)
            document.getElementById(k)?.scrollIntoView()
          }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span id="count-label" className="text-body-sm font-sans text-foundation-700">
          Case studies in each layout
        </span>
        <div role="group" aria-labelledby="count-label" className="inline-flex rounded-sm border border-btn-border overflow-hidden">
          {counts.map((n) => (
            <Link
              key={n}
              href={`?n=${n}`}
              scroll={false}
              aria-current={n === count ? 'true' : undefined}
              className={`min-w-11 h-11 inline-flex items-center justify-center px-3 text-body-sm font-grotesk font-medium no-underline border-l border-btn-border first:border-l-0 ${focusRing} ${
                n === count ? 'bg-foundation-900 text-foundation-100' : 'bg-body text-foundation-800 hover:bg-foundation-100'
              }`}
            >
              {n}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
