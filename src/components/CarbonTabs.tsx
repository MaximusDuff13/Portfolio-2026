'use client'
/* 03's three parts as picture tabs (option B, picked Nov 22 2026 over plain tabs, a side list, tinted
   folds and the old fold-out rows): each tab a tinted card with a small drawing of the change, so all
   three show at a glance; one part is open at a time. */
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

export type Part = { key: 'colour' | 'type' | 'corners'; n: string; label: string; teaser: string; body: ReactNode }

const TINT: Record<Part['key'], string> = { colour: 'bg-stage-sage', type: 'bg-stage-straw', corners: 'bg-stage-ginger' }
const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-warm'

/* a small drawing of each change: the green scale, the two text sizes, the corner */
function Picture({ k }: { k: Part['key'] }) {
  if (k === 'colour')
    return (
      <span aria-hidden="true" className="flex h-12 w-28 overflow-hidden rounded-md">
        {[0.93, 0.84, 0.74, 0.64, 0.53, 0.42, 0.32, 0.22].map((l) => (
          <span key={l} className="flex-1" style={{ background: `oklch(${l} ${l > 0.9 ? 0.06 : 0.15} 143)` }} />
        ))}
      </span>
    )
  if (k === 'type')
    return (
      <span aria-hidden="true" className="flex h-12 items-baseline gap-3 font-sans font-medium text-foundation-900">
        <span className="text-[46px] leading-none">Aa</span>
        <span className="text-[30px] leading-none text-foundation-600">Aa</span>
      </span>
    )
  return (
    <span aria-hidden="true" className="flex h-12 items-center gap-3">
      <span className="block h-11 w-11 border-2 border-solid border-foundation-400" />
      <span className="block h-11 w-11 rounded-xl border-2 border-solid border-foundation-900" />
    </span>
  )
}

/* arrow keys move between tabs; only the current tab is in the tab order */
function useTabs(parts: Part[]) {
  const [i, setI] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const onKeyDown = (e: KeyboardEvent) => {
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    const to = d ? (i + d + parts.length) % parts.length : e.key === 'Home' ? 0 : e.key === 'End' ? parts.length - 1 : -1
    if (to < 0) return
    e.preventDefault()
    setI(to)
    refs.current[to]?.focus()
  }
  const tab = (j: number) => ({
    id: `c03-tab-${parts[j].key}`,
    role: 'tab' as const,
    type: 'button' as const,
    'aria-selected': j === i,
    'aria-controls': `c03-panel-${parts[j].key}`,
    tabIndex: j === i ? 0 : -1,
    onClick: () => setI(j),
    onKeyDown,
    ref: (el: HTMLButtonElement | null) => {
      refs.current[j] = el
    },
  })
  return { i, tab }
}

function Panels({ parts, i, className = '' }: { parts: Part[]; i: number; className?: string }) {
  return (
    <div className={className}>
      {parts.map((p, j) => (
        <div key={p.key} id={`c03-panel-${p.key}`} role="tabpanel" aria-labelledby={`c03-tab-${p.key}`} hidden={j !== i}>
          {p.body}
        </div>
      ))}
    </div>
  )
}

/* on phones the tabs stack, the picture beside the words */
export function CarbonTabs({ parts }: { parts: Part[] }) {
  const { i, tab } = useTabs(parts)
  return (
    <div className="mt-10">
      <div role="tablist" aria-label="What we changed in Carbon" className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {parts.map((p, j) => (
          <button key={p.key} {...tab(j)} className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-solid p-4 text-left transition-colors sm:flex-col sm:items-start sm:gap-0 sm:p-5 ${TINT[p.key]} ${FOCUS} ${j === i ? 'border-foundation-900' : 'border-transparent hover:border-foundation-400'}`}>
            <span className="w-28 flex-none sm:w-auto"><Picture k={p.key} /></span>
            <span className="min-w-0">
              <span className="block font-display text-[20px] leading-tight text-foundation-900 sm:mt-5 sm:text-heading-m">{p.label}</span>
              <span className="mt-1 block font-sans text-caption text-foundation-700 sm:text-body-sm">{p.teaser}</span>
            </span>
          </button>
        ))}
      </div>
      <Panels parts={parts} i={i} className="pt-10" />
    </div>
  )
}
