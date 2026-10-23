'use client'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { TabBar } from '@/components/TabBar'
import { duration, enterT, exitT, reducedT } from '@/lib/motion'
import type { Company } from '@/data/home'

/* Header company chips. Selecting a company swaps the one line below (role, years and a
   verb-first sentence). The TabBar underline slide is the page's one signature motion;
   the line itself only cross-fades, so it doesn't compete. Works with zero interaction:
   the current company is selected by default. */
export function CompanyChips({ companies }: { companies: Company[] }) {
  const prefersReduced = useReducedMotion()
  const [active, setActive] = useState(companies[0].id)
  const c = companies.find((x) => x.id === active) ?? companies[0]

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none]">
        <TabBar
          tabs={companies.map((x) => ({ key: x.id, label: x.name }))}
          active={active}
          onChange={setActive}
          layoutId="header-company-underline"
        />
      </div>
      <div className="min-h-[3.3em]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={c.id}
            className="text-body-sm font-sans text-foundation-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: prefersReduced ? reducedT(duration.base) : enterT(duration.base) }}
            exit={{ opacity: 0, transition: prefersReduced ? reducedT(duration.fast) : exitT(duration.fast) }}
          >
            <span className="font-medium text-foundation-900">
              {c.role} · {c.years}
            </span>{' '}
            — {c.line}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
