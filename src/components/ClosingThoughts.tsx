'use client'
/* Closing thoughts (Nov 21–23 2026): the Acentra case study's last section, after 05 Testimonials
   and before Keep exploring. The words are Michael's (closing.ts): three lessons, each with what
   happened and what he'd do next time, then an "In short" line.
   PICKED D, "Dark finale" (Michael, Nov 23 2026), when he asked to rethink the section: the page
   ends on the dark stage of 04's Jira tile; three lessons in columns, each with a pen drawing in
   ginger (Doodles.tsx), white titles, "Next time" in ginger; the summary large and signed.
   Tried and dropped the same day: lesson cards, a road with stops, a then / next time table, and
   the Nov 22 pick (typeset lessons with handwritten notes). Before that, on Nov 22: margin rail,
   columns, signed note, summary first, split cards, big numbers, poster. */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { SectionHeader } from './SectionHeader'
import { CompassDoodle, CornersDoodle, LayersDoodle } from './Doodles'
import type { Lesson } from '@/app/work/acentra-health/closing'
import './closing.css'

type Closing = { title: string; lessons: Lesson[]; inShort: string; inShortMark?: string }

const LABEL = 'm-0 text-label font-sans uppercase tracking-widest'
const rise = (i: number) => ({ ['--i' as string]: i }) as CSSProperties
const INK = '#e39849' // the pen's ginger on dark (as in 04's dark tiles)

/* one drawing per lesson, in order */
const ART = [CompassDoodle, CornersDoodle, LayersDoodle]

/* Sets data-on once the section is in view, which starts its entrance (closing.css). */
function InView({ className = '', children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`cl-in ${className}`} data-on={on || undefined}>
      {children}
    </div>
  )
}

export function ClosingThoughts({ closing: c }: { closing: Closing }) {
  return (
    <div>
      <SectionHeader eyebrow="Closing thoughts" title={c.title} />
      <InView className="mt-10">
        <div className="rounded-2xl bg-[#161616] p-6 sm:p-10">
          <ol role="list" className="m-0 grid list-none grid-cols-1 gap-10 p-0 md:grid-cols-3 md:gap-10">
            {c.lessons.map((l, i) => {
              const Art = ART[i]
              return (
                <li key={l.title} data-rise style={rise(i)}>
                  {Art && <Art ink={INK} />}
                  <h3 className="m-0 mt-4 font-display text-heading-m text-white">{l.title}</h3>
                  <p className="m-0 mt-3 font-sans text-body-sm text-[#c6c6c6]">{l.what}</p>
                  <p className="m-0 mt-4 font-sans text-body-sm" style={{ color: INK }}>
                    <span className="font-medium">Next time:</span> {l.next}
                  </p>
                </li>
              )
            })}
          </ol>
          <div data-rise style={rise(3)} className="mt-12 grid grid-cols-1 gap-6 border-0 border-t border-solid border-white/15 pt-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12">
            <div>
              <p className={`${LABEL} text-[#c6c6c6]`}>In short</p>
              <p className="m-0 mt-3 max-w-4xl font-display text-[26px] leading-[1.3] text-white sm:text-[36px]">{c.inShort}</p>
            </div>
            {/* the signature: .cs-note's face, set inline so its 22px ink size gives way */}
            <span className="cs-note block -rotate-2" style={{ fontSize: 44, lineHeight: 1, color: INK }}>
              Michael
            </span>
          </div>
        </div>
      </InView>
    </div>
  )
}
