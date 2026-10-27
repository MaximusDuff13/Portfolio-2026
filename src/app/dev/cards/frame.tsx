import type { Slot } from '@/app/_home/content'

/* The frames screens sit in on the stage, and the code-drawn stand-ins shown until a slot gets a
   real image. Neutral foundation blocks only, every stand-in labelled top-left. */

export type PlaceholderKind = 'dashboard' | 'form' | 'list' | 'detail' | 'page' | 'dense' | 'phone'

/** a light browser frame: three dots and an address bar, the screen below */
export function Frame({ children, label }: { children: React.ReactNode; label?: string }) {
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

/** a phone: rounded body, a speaker slot, the screen inside */
export function Phone({ slot, kind = 'phone' }: { slot: Slot; kind?: PlaceholderKind }) {
  return (
    <div className="mo-phone">
      <div className="mo-phone-screen">
        <SlotImage slot={slot} kind={kind} />
        {!slot.src && <span className="uf-label">{slot.label}</span>}
      </div>
    </div>
  )
}

/** a slot's image, or its stand-in */
export function SlotImage({ slot, kind, eager }: { slot: Slot; kind: PlaceholderKind; eager?: boolean }) {
  if (!slot.src) return <Placeholder kind={kind} />
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={slot.src} alt={slot.alt ?? ''} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  )
}

const rows = (n: number, className = 'uf-ph-row') => Array.from({ length: n }, (_, i) => <b key={i} className={className} />)

/** a code-drawn stand-in screen: neutral blocks, one layout per kind, no image */
export function Placeholder({ kind }: { kind: PlaceholderKind }) {
  if (kind === 'phone')
    return (
      <div className="uf-ph uf-ph-phone" aria-hidden="true">
        <b className="uf-ph-head" />
        <b className="uf-ph-hero" />
        {rows(4)}
        <b className="uf-ph-button" />
      </div>
    )
  if (kind === 'page')
    // a long page: the top of it is what the cover shows at rest
    return (
      <div className="uf-ph uf-ph-page" aria-hidden="true">
        <b className="uf-ph-head" />
        <b className="uf-ph-hero" />
        <div className="uf-ph-tiles">
          <b />
          <b />
          <b />
        </div>
        {rows(6)}
        <b className="uf-ph-chart" />
        <div className="uf-ph-tiles">
          <b />
          <b />
        </div>
        {rows(4)}
        <b className="uf-ph-foot" />
      </div>
    )
  if (kind === 'dense')
    // the "before": crowded, every option on screen at once
    return (
      <div className="uf-ph uf-ph-dense" aria-hidden="true">
        <b className="uf-ph-head" />
        <div className="uf-ph-main">
          <b className="uf-ph-side" />
          <div className="uf-ph-grid">{rows(18, '')}</div>
          <b className="uf-ph-side" />
        </div>
      </div>
    )
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
          {kind === 'list' && rows(5)}
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
