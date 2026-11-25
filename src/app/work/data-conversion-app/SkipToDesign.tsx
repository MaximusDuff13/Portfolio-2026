'use client'
import type { MouseEvent } from 'react'
import { ArrowDown } from 'lucide-react'

/* A shortcut for readers who want the work first (Nov 25 2026, Michael's idea): under the brief, a
   sticky note that jumps past Part one to 01 Requirements, the first design step. Michael picked K1
   (sticky note) from /dev/skip over a plain button, a pen scribble, a ticket and a round stamp.
   Tilted like the design-step notes; straightens and lifts on hover. Smooth scroll unless the reader
   prefers reduced motion; the link still works without JavaScript. */
export function SkipToDesign({ target = 'step-requirements' }: { target?: string }) {
  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(target)
    if (!el) return
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', `#${target}`)
  }
  return (
    <a
      href={`#${target}`}
      onClick={go}
      aria-label="Skip the backstory, see the screens"
      className="group inline-block -rotate-2 rounded-md bg-stage-straw-strong px-6 py-4 no-underline shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-1 hover:rotate-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-4 focus-visible:ring-offset-body motion-reduce:transition-none"
    >
      <span aria-hidden="true" className="block font-hand text-[18px] leading-none text-foundation-600">in a hurry?</span>
      <span aria-hidden="true" className="mt-1 flex items-center gap-2 font-hand text-[28px] leading-tight text-foundation-900">
        skip the backstory, see the screens
        <ArrowDown size={22} strokeWidth={2} className="shrink-0 text-accent-warm transition-transform group-hover:translate-y-1 motion-reduce:transition-none" />
      </span>
    </a>
  )
}
