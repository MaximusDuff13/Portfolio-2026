import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { CaseStudy } from '@/app/_home/content'
import { CompanyMark, SampleTag, Value } from '@/app/_home/kit/cards'
import { outcomes, tints } from './data'

/* The case-study card in each direction. Still one card family and one link: the title's link
   stretches over the whole card, so the card is a single tab stop; hover and keyboard focus
   share every effect (lift, title underline, arrow), and nothing is only on hover. */

export type Direction = 'a' | 'b' | 'c'

function Media({ item }: { item: CaseStudy }) {
  return (
    <div className="cd-media hx-media">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.image.src} alt={item.image.alt} loading="lazy" decoding="async" />
      {item.mediaPlaceholder && <SampleTag label="Placeholder media" />}
    </div>
  )
}

function Badge({ item }: { item: CaseStudy }) {
  return (
    <p className="hx-badge">
      <CompanyMark name={item.company} logo={item.logo} className="hx-badge-mark" />
      {item.company}
    </p>
  )
}

function Title({ item, as = 'h3' }: { item: CaseStudy; as?: 'h3' }) {
  const H = as
  return (
    <H className="hx-title">
      <a href={item.href} className="cd-link hx-link">
        {item.question}
      </a>
    </H>
  )
}

/** the meta as pills: what it took, my part, where it stands */
function Pills({ item }: { item: CaseStudy }) {
  return (
    <ul className="hx-pills" aria-label="Project details">
      <li>{item.duration}</li>
      <li>
        <Value value={item.role} />
      </li>
      <li>{item.status}</li>
    </ul>
  )
}

/** A, Case file: a tinted body, the company on top, one outcome, pills */
function CaseFile({ item }: { item: CaseStudy }) {
  const o = outcomes[item.id]
  return (
    <article className="cd hx-card hxa-card" style={{ '--hx-tint': tints[item.id] } as CSSProperties}>
      <Media item={item} />
      <div className="hxa-body">
        <div className="hx-top">
          <Badge item={item} />
          <ArrowUpRight className="hx-arrow" aria-hidden="true" />
        </div>
        <Title item={item} />
        {o && (
          <p className="hxa-outcome">
            <strong>{o.figure}</strong> {o.label}
          </p>
        )}
        <Pills item={item} />
      </div>
    </article>
  )
}

/** B, Outcome first: the result is the headline, the question its subtitle */
function OutcomeFirst({ item }: { item: CaseStudy }) {
  const o = outcomes[item.id]
  return (
    <article className="cd hx-card hxb-card">
      <Media item={item} />
      <div className="hxb-body">
        <div className="hx-top">
          <Badge item={item} />
          <ArrowUpRight className="hx-arrow" aria-hidden="true" />
        </div>
        {o && (
          <p className="hxb-figure">
            <span className="hxb-num">{o.figure}</span>
            <span className="hxb-label">{o.label}</span>
          </p>
        )}
        <Title item={item} />
        <p className="hxb-meta">
          {item.duration} · <Value value={item.role} /> · {item.status}
        </p>
      </div>
    </article>
  )
}

/** C, Margin notes: the outcome written on the card in ink, as on a printed proof */
function MarginNote({ item }: { item: CaseStudy }) {
  const o = outcomes[item.id]
  return (
    <article className="cd hx-card hxc-card">
      <div className="hxc-media-wrap">
        <Media item={item} />
        {o && (
          <p className="hxc-note">
            {o.short}
            <svg className="hxc-note-mark" viewBox="0 0 120 10" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 6 C 30 2, 60 9, 118 4" />
            </svg>
          </p>
        )}
      </div>
      <div className="hxc-body">
        <div className="hx-top">
          <Badge item={item} />
          <ArrowUpRight className="hx-arrow" aria-hidden="true" />
        </div>
        <Title item={item} />
        <p className="cd-desc">{item.description}</p>
        <Pills item={item} />
      </div>
    </article>
  )
}

export function ExploreCard({ item, direction }: { item: CaseStudy; direction: Direction }) {
  if (direction === 'a') return <CaseFile item={item} />
  if (direction === 'b') return <OutcomeFirst item={item} />
  return <MarginNote item={item} />
}
