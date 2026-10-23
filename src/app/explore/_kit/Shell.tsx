'use client'
import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'

/* TEMPORARY — /explore harness. Wraps a direction: sets data-dir and data-theme on the root
   (each direction's tokens read them through light-dark()), and floats a small comparison
   switcher in the bottom-left: the five directions plus a System / Light / Dark toggle. The
   switcher is harness chrome, not part of any design. The theme choice is remembered per
   browser when storage allows; the page works without it. */

type Theme = 'system' | 'light' | 'dark'
const order: Theme[] = ['system', 'light', 'dark']
const KEY = 'explore-theme'

export const directions = [
  { id: 'a', name: 'House Style' },
  { id: 'b', name: 'Canvas' },
  { id: 'c', name: 'Affinity Wall' },
  { id: 'd', name: 'Grid System' },
  { id: 'e', name: 'Contact Sheet' },
] as const

export function Shell({ dir, className = '', children }: { dir: string; className?: string; children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    try {
      const t = window.localStorage.getItem(KEY) as Theme | null
      if (t && order.includes(t)) setTheme(t)
    } catch {}
  }, [])

  const cycle = () => {
    const next = order[(order.indexOf(theme) + 1) % order.length]
    setTheme(next)
    try {
      window.localStorage.setItem(KEY, next)
    } catch {}
  }

  const Icon = theme === 'system' ? Monitor : theme === 'light' ? Sun : Moon

  return (
    <div className={`explore-root dir-${dir} ${className}`} data-theme={theme === 'system' ? undefined : theme}>
      {children}
      <nav aria-label="Compare directions" className="x-switch">
        <Link href="/explore" className="x-switch-home">
          Explore
        </Link>
        {directions.map((d) => (
          <Link key={d.id} href={`/explore/${d.id}`} aria-current={d.id === dir ? 'page' : undefined} title={d.name}>
            {d.id.toUpperCase()}
          </Link>
        ))}
        <button type="button" onClick={cycle} aria-label={`Theme: ${theme}. Change theme`} title={`Theme: ${theme}`}>
          <Icon size={14} aria-hidden="true" />
        </button>
      </nav>
    </div>
  )
}
