'use client'
/* 07 Testimonials (Nov 21 2026): what the managers, developers and designers Michael worked with
   said, about the system and about him. It sits after 06 Results, so the numbers come first and
   people confirm them, and it replaced 08 Collaboration, whose point ("built with the teams who
   use it") it makes in their words.
   Layout E, "Stage cards", picked Nov 21 2026 (over plain rows and columns, pinned notes,
   portrait cards and hand-underlined cards): each quote on its group's stage tint, the first
   (the manager's) large, the other two stacked beside it; the cards rise in one after another
   when they scroll into view.
   The quotes come from src/app/work/acentra-health/testimonials.ts; the page drops placeholder
   entries outside development. */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import './testimonials.css'

export type Testimonial = {
  /** who they are, shown as a pill: Manager, Developer, Designer or Product */
  group: string
  /** their words, 1 to 3 sentences, exactly as they wrote them */
  quote: string
  name: string
  /** their job title, e.g. Engineering manager */
  role: string
  /** their team or product */
  team: string
  /** optional: how you worked together, e.g. "Managed me directly" */
  relation?: string
  /** optional photo, 240 × 240, in public/images/acentra-quotes/ */
  photo?: string
  /** optional link to their LinkedIn recommendation, so a reader can check it */
  link?: string
  /** true while the entry is a stand-in; shown only in development */
  placeholder?: boolean
}

// each group gets one of the page's stage tints (the hero and 04 use sage), plus its deeper step
// for initials; anything else falls back to mist
const TINTS: Record<string, { bg: string; strong: string }> = {
  Manager: { bg: 'bg-stage-sage', strong: 'bg-stage-sage-strong' },
  Developer: { bg: 'bg-stage-straw', strong: 'bg-stage-straw-strong' },
  Designer: { bg: 'bg-stage-ginger', strong: 'bg-stage-ginger-strong' },
}
const tint = (t: Testimonial) => TINTS[t.group] ?? { bg: 'bg-stage-mist', strong: 'bg-stage-mist-strong' }

/* Sets data-on once the cards are in view, which starts their entrance (testimonials.css). */
function InView({ className = '', children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`qt-in ${className}`} data-on={on || undefined}>
      {children}
    </div>
  )
}
const rise = (i: number) => ({ ['--i' as string]: i }) as CSSProperties

/* the group as a pill, and a dashed tag on stand-ins */
function GroupPill({ t }: { t: Testimonial }) {
  return (
    <span className="flex items-center gap-2">
      <span className="rounded-full bg-body/80 px-3 py-1.5 text-label font-sans uppercase tracking-widest text-foundation-800">{t.group}</span>
      {t.placeholder && (
        <span className="rounded-full border border-dashed border-foundation-400 px-2 py-1 font-sans text-label text-foundation-700">Placeholder</span>
      )}
    </span>
  )
}

/* an opening quote in the display face, in the accent */
const QuoteMark = ({ className = '' }: { className?: string }) => (
  <span aria-hidden="true" className={`block select-none font-display leading-none text-accent-warm ${className}`}>“</span>
)

/* their words; stand-ins are set a shade lighter */
function Quote({ t, big, className = '' }: { t: Testimonial; big: boolean; className?: string }) {
  const type = big ? 'text-[24px] leading-[1.32] sm:text-[30px]' : 'text-[19px] leading-[1.45]'
  return (
    <blockquote className={`m-0 font-display ${type} ${t.placeholder ? 'text-foundation-600' : 'text-foundation-900'} ${className}`}>
      <p className="m-0">{t.quote}</p>
    </blockquote>
  )
}

/* a photo; an empty dashed circle on a stand-in; otherwise their initials on their group's tint */
function Avatar({ t, size = 44 }: { t: Testimonial; size?: number }) {
  const box = { width: size, height: size }
  if (t.photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={t.photo} alt="" width={size} height={size} style={box} className="flex-none rounded-full object-cover" />
  }
  if (t.placeholder) return <span aria-hidden="true" style={box} className="flex-none rounded-full border border-dashed border-foundation-400 bg-body/60" />
  const initials = t.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <span aria-hidden="true" style={{ ...box, fontSize: size * 0.38 }} className={`grid flex-none place-items-center rounded-full font-display text-foundation-800 ${tint(t).strong}`}>
      {initials}
    </span>
  )
}

/* who said it, on one row: avatar, name, role and team, how you worked together, the link */
function Person({ t }: { t: Testimonial }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar t={t} />
      <span className="min-w-0">
        <span className="block text-body-sm font-sans font-medium text-foundation-900">{t.name}</span>
        <span className="block text-caption font-sans text-foundation-700">{t.role}, {t.team}</span>
        {t.relation && <span className="block text-caption font-sans text-foundation-700">{t.relation}</span>}
        {t.link && (
          <a href={t.link} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-caption font-sans font-medium text-foundation-900 underline underline-offset-2 hover:text-accent-warm">
            Read it on LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
      </span>
    </div>
  )
}

/* one quote on its group's tint; `big` for the first, which spans two rows on desktop */
function StageCard({ t, i, big, className = '' }: { t: Testimonial; i: number; big: boolean; className?: string }) {
  return (
    <figure data-rise style={rise(i)} className={`m-0 flex flex-col rounded-2xl p-6 sm:p-8 ${tint(t).bg} ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <GroupPill t={t} />
        <QuoteMark className={big ? '-mt-2 h-[52px] text-[88px]' : '-mt-1 h-[38px] text-[64px]'} />
      </div>
      <Quote t={t} big={big} className={big ? 'mt-6 max-w-2xl' : 'mt-4'} />
      <figcaption className="mt-auto pt-8"><Person t={t} /></figcaption>
    </figure>
  )
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items.length) return null
  const [first, ...rest] = items
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
        <SectionHeader index="07" eyebrow="Testimonials" title="In their own words" />
        <p className="m-0 max-w-sm text-body-sm font-sans text-foundation-700 [text-wrap:balance] md:pb-1">From the managers, developers and designers I worked with.</p>
      </div>
      <InView className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
        <StageCard t={first} i={0} big className="md:col-span-7 md:row-span-2" />
        {rest.map((t, i) => (
          <StageCard key={i} t={t} i={i + 1} big={false} className="md:col-span-5" />
        ))}
      </InView>
    </>
  )
}
