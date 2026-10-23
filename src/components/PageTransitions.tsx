'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import './page-transitions.css'

/* How the screen changes between pages and between the home tabs. Four modes, set as
   html[data-tx] and styled in page-transitions.css (pages) and the home page's own CSS (tabs):

   1 · Quiet crossfade: the page fades and eases back, the next rises and settles in (about
       half a second); tabs slide in from the side you went toward.
   2 · The card becomes the case study: as 1, and a case card's image and title morph into
       the case study's hero (and back).
   3 · Colour wipe: the old page dims to near-black and the next wipes up over it from below.
   4 · Fold-out: pages as 1; a tab's cards settle in one after another.

   Page changes use the View Transitions API (Chrome, Edge, Safari 18+): internal link clicks
   are caught here and run through transitionTo(). Where it's missing, or under reduced
   motion, the page simply changes. While a transition runs, html carries data-transitioning,
   and 'pagetransitionend' fires on window when it ends, so the header's dog can wait for it.

   TEMPORARY while the four are compared: a switcher in the bottom-right corner, in
   development builds only. Once one is chosen, fix MODE and delete the switcher. */

export type TxMode = '1' | '2' | '3' | '4'
const MODES: { id: TxMode; name: string }[] = [
  { id: '1', name: 'Quiet crossfade' },
  { id: '2', name: 'Card becomes the case study' },
  { id: '3', name: 'Colour wipe' },
  { id: '4', name: 'Fold-out' },
]
const DEFAULT: TxMode = '2'
const KEY = 'tx-mode'

let push: ((href: string) => void) | null = null
let landed: (() => void) | null = null

/** Go to an internal page with the current transition. */
export function transitionTo(href: string) {
  if (!push) {
    window.location.href = href
    return
  }
  const go = push
  const doc = document as Document & { startViewTransition?: (cb: () => Promise<void>) => { finished: Promise<void> } }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !doc.startViewTransition) {
    go(href)
    return
  }
  const html = document.documentElement
  html.dataset.transitioning = ''
  const vt = doc.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        landed = resolve
        go(href)
        // never hold the page hostage if the route is slow to arrive
        window.setTimeout(resolve, 2500)
      }),
  )
  vt.finished.finally(() => {
    delete html.dataset.transitioning
    window.dispatchEvent(new Event('pagetransitionend'))
  })
}

/** Run `start` now, or once the page transition in progress has finished. */
export function afterPageTransition(start: () => void) {
  if (document.documentElement.dataset.transitioning === undefined) {
    start()
    return () => {}
  }
  const once = () => start()
  window.addEventListener('pagetransitionend', once, { once: true })
  return () => window.removeEventListener('pagetransitionend', once)
}

export function PageTransitions() {
  const router = useRouter()
  const pathname = usePathname()
  const [mode, setMode] = useState<TxMode>(DEFAULT)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY) as TxMode | null
      if (saved && MODES.some((m) => m.id === saved)) setMode(saved)
    } catch {}
  }, [])
  useEffect(() => {
    document.documentElement.dataset.tx = mode
  }, [mode])

  useEffect(() => {
    push = (href) => router.push(href)
    return () => {
      push = null
    }
  }, [router])

  // the new page is in: let the transition animate to it. Straight from the effect, not on an
  // animation frame: while a view transition waits for its update, the browser pauses
  // rendering, frames included, so a frame callback would only run after the time-out.
  useEffect(() => {
    if (!landed) return
    const done = landed
    landed = null
    done()
  }, [pathname])

  // internal links: caught before Next's own Link handler (capture, on window), which then
  // sees the event handled and stands aside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a')
      if (!a || a.hasAttribute('download') || (a.target && a.target !== '_self') || a.dataset.txSkip !== undefined) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin) return
      // same page (a #hash within it): leave it to the browser
      if (url.pathname === window.location.pathname) return
      e.preventDefault()
      transitionTo(url.pathname + url.search + url.hash)
    }
    window.addEventListener('click', onClick, true)
    return () => window.removeEventListener('click', onClick, true)
  }, [])

  if (process.env.NODE_ENV !== 'development') return null
  return (
    <nav aria-label="Transition style (development only)" className="tx-switch">
      <span>Transitions</span>
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          title={m.name}
          aria-pressed={mode === m.id}
          onClick={() => {
            setMode(m.id)
            try {
              window.localStorage.setItem(KEY, m.id)
            } catch {}
          }}
        >
          {m.id}
        </button>
      ))}
    </nav>
  )
}
