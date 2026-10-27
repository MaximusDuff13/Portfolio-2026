'use client'
import { useRef, type CSSProperties, type PointerEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { CardLayer, CaseStudy } from '@/app/_home/content'
import { CompanyMark, SampleTag, Value } from '@/app/_home/kit/cards'

/* The case-study card, unfolding. Same card family and markup hooks as the live CaseCard
   (cd, cd-case, cd-title, cd-link, cd-desc, cd-foot), one link stretched over the card, plus a
   stage behind the image where supporting screens wait below the edge and rise around the cover
   on hover or keyboard focus. Every position comes from the card data (content.ts). */

export type Variant = 'a' | 'b' | 'c'

/** a light browser frame: three dots and an address bar, the screen below */
function Frame({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="uf-frame">
      <div className="uf-chrome" aria-hidden="true">
        <span />
        <span />
        <span />
        <i />
      </div>
      <div className="uf-screen">
        {children}
        {label && <span className="uf-label">{label}</span>}
      </div>
    </div>
  )
}

/** a code-drawn stand-in screen: neutral blocks, one layout per kind, no image */
function Placeholder({ kind }: { kind: CardLayer['kind'] }) {
  return (
    <div className={`uf-ph uf-ph-${kind}`} aria-hidden="true">
      <b className="uf-ph-head" />
      <div className="uf-ph-main">
        {kind !== 'detail' && <b className="uf-ph-side" />}
        <div className="uf-ph-content">
          {kind === 'dashboard' && (
            <>
              <div className="uf-ph-tiles">
                <b />
                <b />
                <b />
              </div>
              <b className="uf-ph-chart" />
            </>
          )}
          {kind === 'form' && (
            <>
              <b className="uf-ph-field" />
              <b className="uf-ph-field" />
              <b className="uf-ph-field uf-ph-short" />
              <b className="uf-ph-button" />
            </>
          )}
          {kind === 'list' && [0, 1, 2, 3, 4].map((i) => <b key={i} className="uf-ph-row" />)}
          {kind === 'detail' && (
            <>
              <b className="uf-ph-title" />
              <div className="uf-ph-split">
                <b />
                <b />
              </div>
              <b className="uf-ph-button" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/** where a layer waits and where it settles; variant c deals the screens out from behind the
    cover instead of raising them from below the edge */
function placement(l: CardLayer, i: number, variant: Variant) {
  const rest = variant === 'c' ? { x: l.open.x * 0.32, y: 9 + i * 2, rotate: l.open.rotate * 1.2 } : { ...l.rest, rotate: 0 }
  const open = variant === 'c' ? { x: l.open.x * 1.08, y: 12 + Math.max(0, l.open.y - 30) * 0.5, rotate: l.open.rotate } : l.open
  return {
    '--rx': rest.x,
    '--ry': rest.y,
    '--rr': rest.rotate,
    '--ox': open.x,
    '--oy': open.y,
    '--or': open.rotate,
    '--w': `${l.width}%`,
    // c keeps every screen behind the cover: they peek out at rest and spread from behind it
    '--z': variant === 'c' ? 1 : l.z,
    '--i': i,
  } as CSSProperties
}

export function UnfoldCard({ item, variant }: { item: CaseStudy; variant: Variant }) {
  const pill = useRef<HTMLSpanElement>(null)
  // b: the "Read" pill follows the pointer inside the card (written straight to the style, no
  // re-render); touch never shows it
  const follow = (e: PointerEvent<HTMLElement>) => {
    if (!pill.current || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    pill.current.style.setProperty('--px', `${e.clientX - r.left + 14}px`)
    pill.current.style.setProperty('--py', `${e.clientY - r.top + 14}px`)
  }
  return (
    <article
      className="cd cd-case uf-card"
      data-uf={variant}
      style={{ '--uf-stage': item.stage ?? 'transparent' } as CSSProperties}
      onPointerMove={variant === 'b' ? follow : undefined}
    >
      <div className="uf-stage">
        {item.layers?.map((l, i) => (
          <div key={i} className="uf-layer" style={placement(l, i, variant)}>
            <Frame label={l.src ? undefined : l.label}>
              {l.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={l.src} alt={l.alt ?? ''} loading="lazy" decoding="async" />
              ) : (
                <Placeholder kind={l.kind} />
              )}
            </Frame>
          </div>
        ))}
        <div className="uf-cover">
          <Frame>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image.src} alt={item.image.alt} loading="lazy" decoding="async" />
          </Frame>
        </div>
        {item.mediaPlaceholder && <SampleTag label="Placeholder media" />}
        {variant === 'b' && (
          <span className="uf-pill uf-pill-key" aria-hidden="true">
            Read →
          </span>
        )}
      </div>
      <div className="cd-body uf-body">
        <h3 className="cd-title">
          <a href={item.href} className="cd-link uf-link">
            {item.question}
          </a>
        </h3>
        <p className="uf-meta">
          {item.duration} · <Value value={item.role} /> · {item.status}
        </p>
        <p className="cd-desc uf-desc">{item.description}</p>
        <footer className="cd-foot">
          <CompanyMark name={item.company} logo={item.logo} />
          <span className="cd-names">
            <span className="cd-name">{item.name}</span>
            <span className="cd-company">{item.company}</span>
          </span>
          <ArrowUpRight className="cd-arrow" aria-hidden="true" />
        </footer>
      </div>
      {variant === 'b' && (
        <span ref={pill} className="uf-pill uf-pill-cursor" aria-hidden="true">
          Read →
        </span>
      )}
    </article>
  )
}
