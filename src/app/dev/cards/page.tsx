import type { Metadata } from 'next'
import Link from 'next/link'
import { caseStudies } from '@/app/_home/content'
import '@/app/_home/home.css'
import { duplicatePresets, galleryItems, PRESETS, type CardItem } from './presets'
import { UnfoldCard, type Variant } from './UnfoldCard'
import './unfold.css'
import './motion.css'

/* /dev/cards: the case-study cards, one per row, stacked, on the strong stage tint. Linked from
   nowhere and kept out of search. ?v=c|e|gallery (default e): c deals supporting screens from
   behind the cover, e plays each card's own motion preset, gallery shows all six presets on
   placeholder cards. &compare=1 sets C and E side by side, &col=810 (default 648, the live Work
   column at 1440), &frame=390 sets the cards in a phone-width column, still. */
export const metadata: Metadata = {
  title: 'Cards',
  robots: { index: false, follow: false },
}

type View = Variant | 'gallery'
const OPTIONS: { v: View; label: string }[] = [
  { v: 'c', label: 'C · Deal from the deck' },
  { v: 'e', label: 'E · Story motion' },
  { v: 'gallery', label: 'Motion gallery' },
]

type Params = { v?: string; compare?: string; col?: string; frame?: string }

export default function CardsPage({ searchParams }: { searchParams: Params }) {
  const state = {
    v: (['c', 'gallery'].includes(searchParams.v ?? '') ? searchParams.v : 'e') as View,
    compare: searchParams.compare === '1',
    wide: searchParams.col === '810',
    phone: searchParams.frame === '390',
  }
  const href = (next: Partial<typeof state>) => {
    const s = { ...state, ...next }
    const q = new URLSearchParams()
    if (s.compare) q.set('compare', '1')
    else q.set('v', s.v)
    if (s.wide) q.set('col', '810')
    if (s.phone) q.set('frame', '390')
    return `?${q}`
  }

  // two cards on one page must not move the same way
  const dupes = state.v === 'gallery' ? [] : duplicatePresets(caseStudies)
  if (dupes.length && process.env.NODE_ENV !== 'production')
    for (const [preset, names] of dupes) console.warn(`[cards] "${preset}" is used by more than one card: ${names.join(', ')}`)

  const column = (v: Variant, items: CardItem[]) => (
    <div className="uf-column" data-phone={state.phone || undefined}>
      <div className="pn pn-work uf-grid" data-settle>
        {items.map((c) => (
          <div key={c.id} className="pn-cell">
            <UnfoldCard item={c} variant={v} tint="strong" still={state.phone} />
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <div className="home-root uf-page" data-wide={state.wide || undefined} data-compare={state.compare || undefined}>
      <nav className="uf-bar" aria-label="Options">
        <div className="uf-seg" role="group" aria-label="Variant">
          {OPTIONS.map((o) => (
            <Link
              key={o.v}
              href={href({ v: o.v, compare: false })}
              scroll={false}
              replace
              aria-current={!state.compare && o.v === state.v ? 'page' : undefined}
            >
              {o.label}
            </Link>
          ))}
          <Link href={href({ compare: true })} scroll={false} replace aria-current={state.compare ? 'page' : undefined}>
            C and E side by side
          </Link>
        </div>
        <Link
          href={href({ wide: !state.wide })}
          scroll={false}
          replace
          className="uf-frame-toggle"
          aria-pressed={state.wide}
        >
          {state.wide ? '✓ ' : ''}810px column
        </Link>
        <Link
          href={href({ phone: !state.phone })}
          scroll={false}
          replace
          className="uf-frame-toggle"
          aria-pressed={state.phone}
        >
          {state.phone ? '✓ ' : ''}390px frame
        </Link>
      </nav>
      {dupes.length > 0 && (
        <p className="uf-warn" role="status">
          {dupes.map(([preset, names]) => `Two cards share the “${PRESETS[preset].name}” motion: ${names.join(', ')}.`).join(' ')}{' '}
          Give each case study its own preset in content.ts.
        </p>
      )}
      {/* the Work tab's column: 648px beside the hero at 1440 (810 to compare), or a phone */}
      {state.compare ? (
        <div className="uf-compare">
          {OPTIONS.filter((o) => o.v !== 'gallery').map((o) => (
            <section key={o.v} aria-label={o.label}>
              <h2 className="uf-compare-label">{o.label}</h2>
              {column(o.v as Variant, caseStudies)}
            </section>
          ))}
        </div>
      ) : state.v === 'gallery' ? (
        column('e', galleryItems)
      ) : (
        column(state.v, caseStudies)
      )}
    </div>
  )
}
