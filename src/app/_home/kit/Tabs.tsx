'use client'
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'
import { duration, enterT, reducedT } from '@/lib/motion'
import { tabs, type TabId } from '../content'

/* The four home tabs as a real tablist: roving tabindex, arrow
   keys move and select (wrapping), Home and End jump to the ends. The accent indicator is one
   element that slides between tabs (Framer layoutId); under reduced motion it cross-fades in
   place. The page styles it entirely through the class props. */

const ids = tabs.map((t) => t.id)

export function TabList({
  active,
  onChange,
  idPrefix,
  className = '',
  tabClassName = '',
  indicatorClassName = '',
  countClassName = '',
  label = 'Portfolio sections',
}: {
  active: TabId
  onChange: (id: TabId) => void
  idPrefix: string
  className?: string
  tabClassName?: string
  indicatorClassName?: string
  countClassName?: string
  label?: string
}) {
  const reduced = useReducedMotionSafe()
  const refs = useRef(new Map<TabId, HTMLButtonElement>())
  const listRef = useRef<HTMLDivElement>(null)
  const [overflow, setOverflow] = useState(false)

  // does the row fit? (phones, or narrower once docked). The 28px end padding that
  // data-overflow adds is taken off again, so the answer doesn't depend on itself.
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const check = () => {
      const pad = list.hasAttribute('data-overflow') ? 28 : 0
      setOverflow(list.scrollWidth - pad > list.clientWidth + 1)
    }
    const ro = new ResizeObserver(check)
    ro.observe(list)
    check()
    return () => ro.disconnect()
  }, [])

  // where the row is narrower than its tabs (phones), keep the selected one scrolled into view;
  // set scrollLeft directly, since scrollIntoView would also scroll the page
  useEffect(() => {
    const tab = refs.current.get(active)
    const list = tab?.parentElement
    if (!tab || !list || list.scrollWidth <= list.clientWidth) return
    const left = tab.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft
    if (left < list.scrollLeft) list.scrollLeft = left
    else if (left + tab.offsetWidth > list.scrollLeft + list.clientWidth - 28) list.scrollLeft = left + tab.offsetWidth - list.clientWidth + 28
  }, [active, overflow])

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const i = ids.indexOf(active)
    let next: number | null = null
    if (e.key === 'ArrowRight') next = (i + 1) % ids.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + ids.length) % ids.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = ids.length - 1
    if (next === null) return
    e.preventDefault()
    onChange(ids[next])
    refs.current.get(ids[next])?.focus()
  }

  return (
    <div ref={listRef} role="tablist" aria-label={label} className={className} data-overflow={overflow || undefined}>
      {tabs.map((t) => {
        const on = t.id === active
        return (
          <button
            key={t.id}
            ref={(el) => {
              if (el) refs.current.set(t.id, el)
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${t.id}`}
            aria-controls={`${idPrefix}-panel-${t.id}`}
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={onKey}
            className={`relative ${tabClassName}`}
          >
            <span>{t.label}</span>
            {t.count != null && <span className={countClassName}>{t.count}</span>}
            {on &&
              (reduced ? (
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={reducedT(duration.base)}
                  className={indicatorClassName}
                />
              ) : (
                <motion.span aria-hidden="true" layoutId={`${idPrefix}-indicator`} transition={enterT(duration.base)} className={indicatorClassName} />
              ))}
          </button>
        )
      })}
    </div>
  )
}

export function TabPanel({
  id,
  active,
  idPrefix,
  className = '',
  children,
}: {
  id: TabId
  active: TabId
  idPrefix: string
  className?: string
  children: ReactNode
}) {
  return (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${id}`}
      aria-labelledby={`${idPrefix}-tab-${id}`}
      hidden={id !== active}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  )
}
