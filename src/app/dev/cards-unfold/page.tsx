import type { Metadata } from 'next'
import Link from 'next/link'
import { caseStudies } from '@/app/_home/content'
import { CaseCard } from '@/app/_home/kit/cards'
import '@/app/_home/home.css'
import { UnfoldCard, type Variant } from './UnfoldCard'
import './unfold.css'

/* /dev/cards-unfold: the case-study cards unfolding on hover and focus, three ways, against the
   live card. Linked from nowhere and kept out of search. ?v=a|b|c (none = baseline), &frame=390
   sets the cards in a phone-width column. */
export const metadata: Metadata = {
  title: 'Cards unfold',
  robots: { index: false, follow: false },
}

const OPTIONS: { v: Variant | 'base'; label: string }[] = [
  { v: 'base', label: 'Baseline' },
  { v: 'a', label: 'A · Rise and fan' },
  { v: 'b', label: 'B · A + Read pill' },
  { v: 'c', label: 'C · Deal from the deck' },
]

export default function CardsUnfoldPage({ searchParams }: { searchParams: { v?: string; frame?: string } }) {
  const v = OPTIONS.some((o) => o.v === searchParams.v) ? (searchParams.v as Variant | 'base') : 'base'
  const phone = searchParams.frame === '390'
  const href = (next: { v?: string; phone?: boolean }) => {
    const q = new URLSearchParams()
    const nv = next.v ?? v
    if (nv !== 'base') q.set('v', nv)
    if (next.phone ?? phone) q.set('frame', '390')
    return `?${q}`
  }
  return (
    <div className="home-root uf-page">
      <nav className="uf-bar" aria-label="Variant">
        <div className="uf-seg">
          {OPTIONS.map((o) => (
            <Link key={o.v} href={href({ v: o.v })} scroll={false} replace aria-current={o.v === v ? 'page' : undefined}>
              {o.label}
            </Link>
          ))}
        </div>
        <Link href={href({ phone: !phone })} scroll={false} replace className="uf-frame-toggle" aria-pressed={phone}>
          {phone ? '✓ ' : ''}390px frame
        </Link>
      </nav>
      {/* the Work tab's column: 648px wide beside the hero at 1440, or a phone */}
      <div className="uf-column" data-phone={phone || undefined}>
        <div className="pn pn-work uf-grid" data-settle>
          {caseStudies.map((c) => (
            <div key={c.id} className="pn-cell">
              {v === 'base' ? <CaseCard item={c} /> : <UnfoldCard item={c} variant={v} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
