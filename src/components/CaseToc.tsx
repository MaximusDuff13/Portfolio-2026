'use client'
import { useEffect, useRef, useState } from 'react'
import './case-toc.css'

/* A contents bar for a long case study (picked Nov 14 2026, layout D of four tried): a slim bar
   under the header, every section in a row, the one being read underlined, and a progress line
   that follows the sections rather than the page's length. It appears once the reader is past
   the hero; on phones the row scrolls sideways to keep the current section in view. Each
   section on the page carries data-toc-section and an id. */

export type TocItem = { id: string; n?: string; label: string }

/** which section is being read, how far through it (0..1), and whether we're past the hero */
function useReading(items: TocItem[]) {
  const [active, setActive] = useState(-1)
  const [frac, setFrac] = useState(0)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const line = window.innerHeight * 0.35
      let a = -1
      items.forEach((it, i) => {
        const el = document.getElementById(it.id)
        if (el && el.getBoundingClientRect().top <= line) a = i
      })
      const max = document.documentElement.scrollHeight - window.innerHeight
      // how far through the current section, 0..1: from its top to the next one's top (the
      // last runs to its own bottom). At the very bottom of the page, the last one is read.
      let f = 0
      if (max > 0 && window.scrollY >= max - 2) { a = items.length - 1; f = 1 }
      else if (a >= 0) {
        const top = document.getElementById(items[a].id)!.getBoundingClientRect().top
        const nextEl = items[a + 1] && document.getElementById(items[a + 1].id)
        const end = nextEl ? nextEl.getBoundingClientRect().top : document.getElementById(items[a].id)!.getBoundingClientRect().bottom
        f = end > top ? Math.min(1, Math.max(0, (line - top) / (end - top))) : 1
      }
      setActive(a)
      setFrac(f)
      const first = document.getElementById(items[0]?.id)
      setShown(!!first && first.getBoundingClientRect().top < window.innerHeight * 0.8)
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [items])
  return { active, frac, shown }
}

/* the bar, under the header */
function Bar({ items }: { items: TocItem[] }) {
  const { active, frac, shown } = useReading(items)
  const strip = useRef<HTMLOListElement>(null)
  const nav = useRef<HTMLElement>(null)
  const line = useRef<HTMLSpanElement>(null)
  // the progress line follows the chips, not the page's length: reading section i, it runs from
  // the start of chip i to the start of chip i+1 (the last: to its end). Measured on screen, so it
  // stays under the chips while the strip scrolls sideways on phones.
  const pos = useRef({ active, frac })
  pos.current = { active, frac }
  useEffect(() => {
    const s = strip.current
    const place = () => {
      const n = nav.current, l = line.current
      if (!s || !n || !l) return
      const { active: a, frac: f } = pos.current
      const chips = Array.from(s.children) as HTMLElement[]
      const base = n.getBoundingClientRect().left
      const pad = 10 // the link's side padding: start at the text
      const start = (i: number) => chips[i].getBoundingClientRect().left + pad - base
      let w = 0
      if (a >= 0 && chips[a]) {
        const from = start(a)
        const to = chips[a + 1] ? start(a + 1) : chips[a].getBoundingClientRect().right - pad - base
        w = from + f * (to - from)
      }
      l.style.width = `${Math.max(0, w)}px`
    }
    place()
    s?.addEventListener('scroll', place, { passive: true })
    window.addEventListener('resize', place)
    return () => {
      s?.removeEventListener('scroll', place)
      window.removeEventListener('resize', place)
    }
  }, [active, frac])
  // keep the current section in view along the strip (horizontal only: never moves the page)
  useEffect(() => {
    const s = strip.current
    const el = s?.children[active] as HTMLElement | undefined
    if (!s || !el) return
    const left = el.offsetLeft - s.clientWidth / 2 + el.clientWidth / 2
    s.scrollTo({ left, behavior: 'smooth' })
  }, [active])
  return (
    <nav ref={nav} aria-label="On this page" className="toc-d" data-shown={shown}>
      <div className="toc-d-row">
        <p className="toc-d-head">Contents</p>
        <ol ref={strip}>
          {items.map((it, i) => (
            <li key={it.id}>
              <a href={`#${it.id}`} data-tx-skip aria-current={i === active ? 'location' : undefined}>
                {it.n && <span className="toc-num">{it.n}</span>}
                {it.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
      <span ref={line} aria-hidden="true" className="toc-d-progress" />
    </nav>
  )
}

export function CaseToc({ items }: { items: TocItem[] }) {
  return <Bar items={items} />
}
