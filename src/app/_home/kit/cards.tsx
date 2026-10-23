import { ArrowUpRight, Award, Bell, CalendarDays, Hash, MessageSquareQuote } from 'lucide-react'
import {
  about,
  person,
  type Accolade,
  type Article,
  type CaseStudy,
  type Event,
  type Feedback,
  type NoiseItem,
  type Notification,
  type SideProject,
  type Stat,
  type Tags,
} from '../content'
import { Thumb } from './thumbs'

/* One card family, one set of components, used both in the
   noise (compact) and in the tab panels (full). The markup is semantic and unstyled beyond
   class hooks (cd-*); the page's stylesheet gives the family its shape, density and
   material. `compact` drops secondary lines; `interactive=false` renders no links, for the
   noise, which is decorative and hidden from assistive tech. */

type Common = { compact?: boolean; interactive?: boolean }

export function SampleTag({ label = 'Sample' }: { label?: string }) {
  return <span className="cd-sample">{label}</span>
}

export function CaseCard({ item, compact, interactive = true }: Common & { item: CaseStudy }) {
  const Title = interactive ? 'a' : 'span'
  return (
    <article className="cd cd-case" data-compact={compact || undefined}>
      <div className="cd-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image.src} alt={compact ? '' : item.image.alt} loading="lazy" decoding="async" />
        {item.mediaPlaceholder && !compact && <SampleTag label="Placeholder media" />}
      </div>
      <div className="cd-body">
        <h3 className="cd-title">
          <Title {...(interactive ? { href: item.href } : {})} className="cd-link">
            {item.question}
          </Title>
        </h3>
        {!compact && <p className="cd-desc">{item.description}</p>}
        <dl className="cd-sheet">
          <div>
            <dt>Duration</dt>
            <dd>{item.duration}</dd>
          </div>
          <div>
            <dt>Scope</dt>
            <dd>{item.scope}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{item.status}</dd>
          </div>
        </dl>
        <footer className="cd-foot">
          <span className="cd-mark" aria-hidden="true">
            {item.company.charAt(0)}
          </span>
          <span className="cd-names">
            <span className="cd-name">{item.name}</span>
            <span className="cd-company">{item.company}</span>
          </span>
          <ArrowUpRight className="cd-arrow" aria-hidden="true" />
        </footer>
      </div>
    </article>
  )
}

export function SideCard({ item, compact }: Common & { item: SideProject }) {
  return (
    <article className="cd cd-side" data-compact={compact || undefined}>
      <div className="cd-media">
        <Thumb name={item.thumb} />
        {!compact && <SampleTag />}
      </div>
      <div className="cd-body">
        <h3 className="cd-title">{item.title}</h3>
        <p className="cd-desc">{item.description}</p>
        {!compact && (
          <ul className="cd-chips">
            {item.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export function AccoladeRow({ item, compact }: Common & { item: Accolade }) {
  return (
    <article className="cd cd-accolade" data-compact={compact || undefined}>
      <span className="cd-medal" aria-hidden="true">
        <Award />
      </span>
      <div className="cd-body">
        <h3 className="cd-title">{item.title}</h3>
        <p className="cd-meta">{item.issuer}</p>
      </div>
      <span className="cd-year">{item.year}</span>
      {!compact && <SampleTag />}
    </article>
  )
}

export function ArticleCard({ item }: Common & { item: Article }) {
  return (
    <article className="cd cd-article">
      <div className="cd-media">
        <Thumb name={item.thumb} />
      </div>
      <div className="cd-body">
        <p className="cd-meta">{item.source}</p>
        <h3 className="cd-title">{item.title}</h3>
      </div>
    </article>
  )
}

export function EventCard({ item }: Common & { item: Event }) {
  return (
    <article className="cd cd-event">
      <span className="cd-date">
        <span className="cd-month">{item.month}</span>
        <span className="cd-day">{item.day}</span>
      </span>
      <div className="cd-body">
        <h3 className="cd-title">
          <CalendarDays className="cd-icon" aria-hidden="true" />
          {item.title}
        </h3>
        <p className="cd-meta">{item.meta}</p>
      </div>
    </article>
  )
}

export function NotificationCard({ item }: Common & { item: Notification }) {
  return (
    <article className="cd cd-note">
      <span className="cd-avatar" aria-hidden="true">
        {item.from}
      </span>
      <div className="cd-body">
        <h3 className="cd-title">{item.title}</h3>
        <p className="cd-meta">{item.sub}</p>
      </div>
      <span className="cd-time">
        <Bell className="cd-icon" aria-hidden="true" />
        {item.time}
      </span>
    </article>
  )
}

export function FeedbackNote({ item }: Common & { item: Feedback }) {
  return (
    <article className="cd cd-feedback">
      <MessageSquareQuote className="cd-icon" aria-hidden="true" />
      <p className="cd-quote">{item.quote}</p>
      <p className="cd-meta">{item.from}</p>
    </article>
  )
}

export function StatTile({ item }: Common & { item: Stat }) {
  return (
    <article className="cd cd-stat">
      <p className="cd-value">{item.value}</p>
      <p className="cd-meta">{item.label}</p>
    </article>
  )
}

export function TagCluster({ item }: Common & { item: Tags }) {
  return (
    <article className="cd cd-tags">
      <Hash className="cd-icon" aria-hidden="true" />
      <ul>
        {item.tags.map((t) => (
          <li key={t}>{t.replace('#', '')}</li>
        ))}
      </ul>
    </article>
  )
}

export function AboutSnippet({ compact }: Common) {
  return (
    <article className="cd cd-about" data-compact={compact || undefined}>
      <span className="cd-portrait" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/header-kit/web/person-seated-208.webp" alt="" loading="lazy" />
      </span>
      <div className="cd-body">
        <h3 className="cd-title">{person.name}</h3>
        <p className="cd-meta">{about.snippet}</p>
      </div>
      {!compact && <SampleTag label="Sample copy" />}
    </article>
  )
}

/** Any noise item as its compact card */
export function NoiseCard({ item }: { item: NoiseItem }) {
  switch (item.kind) {
    case 'case':
      return <CaseCard item={item} compact interactive={false} />
    case 'side':
      return <SideCard item={item} compact />
    case 'accolade':
      return <AccoladeRow item={item} compact />
    case 'article':
      return <ArticleCard item={item} />
    case 'event':
      return <EventCard item={item} />
    case 'note':
      return <NotificationCard item={item} />
    case 'feedback':
      return <FeedbackNote item={item} />
    case 'stat':
      return <StatTile item={item} />
    case 'tags':
      return <TagCluster item={item} />
    case 'about':
      return <AboutSnippet compact />
  }
}
