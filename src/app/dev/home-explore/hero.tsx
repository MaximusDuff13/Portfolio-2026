import type { RefObject } from 'react'
import { caseStudies, employers, hero, person, type Employer } from '@/app/_home/content'
import { CompanyMark, Value } from '@/app/_home/kit/cards'
import type { Direction } from './cards'
import { availability, keyPhrase, outcomes, stats } from './data'

/* The hero's text in each direction. The copy is the live copy, word for word; the directions
   only change how it is set and what sits around it. */

/** the headline trail with its key phrase wrapped, so a direction can mark it */
function Trail({ mark }: { mark?: 'highlight' | 'ink' }) {
  const at = hero.trail.indexOf(keyPhrase)
  if (!mark || at < 0) return <span className="a-trail">{hero.trail}</span>
  return (
    <span className="a-trail">
      {hero.trail.slice(0, at)}
      <span className={`hx-key hx-key-${mark}`}>
        {keyPhrase}
      </span>
      {hero.trail.slice(at + keyPhrase.length)}
    </span>
  )
}

/** "Currently at" / "Previously at", as in the live strip */
function CompanyStrip({ items }: { items: Employer[] }) {
  const groups = [
    { label: 'Currently at', items: items.filter((e) => e.current) },
    { label: 'Previously at', items: items.filter((e) => !e.current) },
  ].filter((g) => g.items.length)
  return (
    <div className="a-cos">
      {groups.map((g) => (
        <div key={g.label} className="a-co-group">
          <p className="a-co-label">{g.label}</p>
          <ul className="a-co-list">
            {g.items.map((e) => (
              <li key={e.id} className="a-co">
                <CompanyMark name={e.name} logo={e.logo} className="a-co-mark" />
                <span className="a-co-name">
                  <Value value={e.name} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** A: every logo on one row, current first, no group labels */
function LogoRow({ items }: { items: Employer[] }) {
  return (
    <div className="hxa-logos">
      <p className="a-co-label">Where I’ve worked</p>
      <ul>
        {items.map((e) => (
          <li key={e.id} data-current={e.current || undefined}>
            <CompanyMark name={e.name} logo={e.logo} className="hxa-logo" />
            <span>
              <Value value={e.name} />
              {e.current && <span className="hxa-now"> · now</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function HeroText({ direction, titleRef }: { direction: Direction; titleRef: RefObject<HTMLHeadingElement> }) {
  return (
    <>
      {direction === 'a' && (
        <p className="hxa-open">
          <span className="hxa-dot" aria-hidden="true" />
          {availability}
        </p>
      )}
      <h1 id="a-title" ref={titleRef} tabIndex={-1} className="a-id">
        {person.name}
        <span className="a-id-sep" aria-hidden="true">/</span>
        <span className="a-id-role">{person.role}</span>
      </h1>
      {direction === 'c' && (
        <p className="hxc-aside">
          <svg className="hxc-arrow" viewBox="0 0 40 40" aria-hidden="true">
            <path d="M6 34 C 10 20, 18 12, 32 6 M24 5 L33 5 L30 13" />
          </svg>
          that’s me up there, with the dog
        </p>
      )}
      <p className="a-statement">
        {hero.lead} <Trail mark={direction === 'a' ? 'highlight' : direction === 'c' ? 'ink' : undefined} />
      </p>
      <p className="a-body">{hero.body}</p>

      {direction === 'a' && (
        <>
          <dl className="hxa-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>
                  <Value value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
          <LogoRow items={employers} />
        </>
      )}

      {direction === 'b' && (
        <>
          {/* the proof, in one line each, each a way into its card */}
          <ul className="hxb-proof" aria-label="Recent results">
            {caseStudies.map((c) => (
              <li key={c.id}>
                <a href={c.href}>
                  <strong>{outcomes[c.id]?.figure}</strong> {outcomes[c.id]?.label}
                  <span className="hxb-proof-src"> · {c.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <CompanyStrip items={employers} />
        </>
      )}

      {direction === 'c' && <CompanyStrip items={employers} />}
    </>
  )
}
