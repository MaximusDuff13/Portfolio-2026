import type { Metadata } from 'next'
import Link from 'next/link'
import { HomePage } from '@/app/_home/HomePage'
import type { Direction } from './cards'
import { ExploreHome } from './ExploreHome'
import './explore.css'

/* /dev/home-explore: three directions for the hero column and the case cards, against the
   live page as the baseline. Linked from nowhere and kept out of search. ?v=a|b|c, or none. */
export const metadata: Metadata = {
  title: 'Home explorations',
  robots: { index: false, follow: false },
}

const OPTIONS: { v: Direction | 'base'; label: string }[] = [
  { v: 'base', label: 'Baseline' },
  { v: 'a', label: 'A · Case file' },
  { v: 'b', label: 'B · Outcome first' },
  { v: 'c', label: 'C · Margin notes' },
]

export default function HomeExplorePage({ searchParams }: { searchParams: { v?: string } }) {
  const v = OPTIONS.some((o) => o.v === searchParams.v) ? (searchParams.v as Direction | 'base') : 'base'
  return (
    <>
      {v === 'base' ? <HomePage /> : <ExploreHome key={v} direction={v} />}
      <nav className="hx-switch" aria-label="Direction">
        {OPTIONS.map((o) => (
          <Link key={o.v} href={o.v === 'base' ? '?' : `?v=${o.v}`} scroll={false} replace aria-current={o.v === v ? 'page' : undefined}>
            {o.label}
          </Link>
        ))}
      </nav>
    </>
  )
}
