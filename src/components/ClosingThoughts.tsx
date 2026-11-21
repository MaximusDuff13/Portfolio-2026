'use client'
/* Closing thoughts (Nov 21–22 2026): the Acentra case study's last section, after 06 Testimonials
   and before Keep exploring. The words are Michael's (closing.ts): three lessons, each with what
   happened and what he'd do next time, then an "In short" line.
   Layout F, "In my own pen", picked Nov 22 2026 (over a margin rail, columns, a signed note,
   summary first, split cards, big numbers and a summary poster): the 01 audit's review pen turned
   on the system's own lessons. Each lesson is typeset; "Next time" is handwritten beside it with
   an arrow, its key phrase underlined; the summary ends with the pen's underline and a signature.
   The page opens and closes marked up. On phones the notes sit under their lesson, no arrows.
   The underlined phrases (`mark`, `inShortMark`) are suggested emphasis, for Michael to change. */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { SectionHeader } from './SectionHeader'
import type { Lesson } from '@/app/work/acentra-health/closing'
import './closing.css'

type Closing = { title: string; lessons: Lesson[]; inShort: string; inShortMark?: string }

const LABEL = 'm-0 text-label font-sans uppercase tracking-widest'
const num = (i: number) => String(i + 1).padStart(2, '0')
const rise = (i: number) => ({ ['--i' as string]: i }) as CSSProperties

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

/* text with one phrase underlined by the pen */
function Marked({ text, mark }: { text: string; mark?: string }) {
  const at = mark ? text.indexOf(mark) : -1
  if (at < 0 || !mark) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <span className="cl-key">{mark}</span>
      {text.slice(at + mark.length)}
    </>
  )
}

/* the pen's arrow from the lesson into the note beside it (desktop only) */
const SideArrow = ({ className = '' }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 60 34" className={className}>
    <path pathLength={1} className="cl-draw" d="M3 8 C 18 3, 34 6, 50 20 M 39 21 C 44 21.5, 48 21.5, 52 21.5 C 51 17.5, 50.5 14, 50 10" />
  </svg>
)

export function ClosingThoughts({ closing: c }: { closing: Closing }) {
  return (
    <div>
      <SectionHeader eyebrow="Closing thoughts" title={c.title} />
      <InView className="mt-10">
        <ol role="list" className="m-0 list-none border-0 border-t border-solid border-foundation-900 p-0">
          {c.lessons.map((l, i) => (
            <li key={l.title} data-rise style={rise(i)} className="grid grid-cols-1 gap-5 border-0 border-b border-solid border-border py-9 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-16">
              <div>
                <p className={`${LABEL} text-foundation-600`}>{num(i)}</p>
                <h3 className="m-0 mt-2 font-display text-heading-m text-foundation-900">{l.title}</h3>
                <p className="m-0 mt-3 font-sans text-body text-foundation-700">{l.what}</p>
              </div>
              <div className="relative md:pt-7">
                <SideArrow className="absolute -left-14 top-3 hidden h-8 w-14 md:block" />
                <p className="cl-hand m-0">
                  Next time: <Marked text={l.next} mark={l.mark} />
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div data-rise style={rise(3)} className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12">
          <div>
            <p className={`${LABEL} text-foundation-600`}>In short</p>
            <p className="m-0 mt-3 max-w-4xl font-display text-[26px] leading-[1.3] text-foundation-900 sm:text-[34px]">
              <Marked text={c.inShort} mark={c.inShortMark} />
            </p>
          </div>
          {/* the signature: .cs-note's face, set inline so its 22px ink size gives way */}
          <span className="cs-note block -rotate-2" style={{ fontSize: 40, lineHeight: 1, color: 'oklch(var(--c-accent))' }}>Michael</span>
        </div>
      </InView>
    </div>
  )
}
