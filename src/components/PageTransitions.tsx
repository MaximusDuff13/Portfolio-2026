'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import './page-transitions.css'

/* How the screen changes between pages: the case card becomes the case study. The page
   fades and eases back while the next rises and settles in, and a case card's image and title
   morph into the case study's hero (and back). Styled in page-transitions.css; the home tabs'
   own slide lives in the home page's CSS.

   It has a direction, set on html as data-tx-dir for the length of the change: opening a case
   study ('in') takes its time, about a second, so the arrival reads; coming back home ('out')
   is quick; anything else sits between.

   Page changes use the View Transitions API (Chrome, Edge, Safari 18+): internal link clicks
   are caught here and run through transitionTo(). Where it's missing, or under reduced
   motion, the page simply changes. While a transition runs, html carries data-transitioning,
   and 'pagetransitionend' fires on window when it ends, so the header's dog can wait for it. */

let push: ((href: string) => void) | null = null
let landed: (() => void) | null = null

/** Go to an internal page with the page transition. */
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
  const path = new URL(href, window.location.href).pathname
  html.dataset.txDir = path.startsWith('/work/') ? 'in' : path === '/' ? 'out' : 'across'
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
    delete html.dataset.txDir
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

  return null
}
