'use client'
import { useState } from 'react'
import { TabBar } from '@/components/TabBar'

/* Jump links between the three variants, on the shared TabBar */
export function LabNav({ tabs }: { tabs: { key: string; label: string }[] }) {
  const [active, setActive] = useState(tabs[0].key)
  return (
    <TabBar
      tabs={tabs}
      active={active}
      layoutId="lab-covers-underline"
      onChange={(k) => {
        setActive(k)
        document.getElementById(k)?.scrollIntoView()
      }}
    />
  )
}
