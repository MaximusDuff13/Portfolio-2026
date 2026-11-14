// TEMPORARY review page (Nov 14 2026): section 04 with Colour, Type and Radius together.
// /dev/type-radius?w=tabs|pair|rows|stack (how the three share the section)
//                 &v=a|b|c|d|e            (how Type and Radius look). Delete once chosen.
import type { Metadata } from 'next'
import Link from 'next/link'
import { CarbonWrap, type Wrap } from '@/components/CarbonWraps'
import type { TRVariant } from '@/components/TypeRadiusLayouts'
import '../../work/case-study.css'

const WRAPS: Record<Wrap, { name: string; note: string }> = {
  tabs: { name: 'Three tabs', note: 'Colour, Type and Corners are tabs. One is on screen at a time, so the section is never longer than the colour story.' },
  pair: { name: 'Colour + two tabs', note: 'Colour stays open. Type and Corners share one space under it, behind two tabs.' },
  rows3: { name: 'Three fold-out rows', note: 'Colour, Type and Corners are all rows. Colour starts open; opening another closes it, so only one is open at a time.' },
  rows: { name: 'Colour + two rows', note: 'Colour stays open. Type and Corners are two closed rows; each opens in place.' },
  stack: { name: 'All open', note: 'Everything open, one under the other. The longest; here for comparison.' },
}
const LOOKS: Record<TRVariant, string> = { a: 'Try it', b: 'Side by side', c: 'Rulers', d: 'Ledger', e: 'Marked exports' }

export const metadata: Metadata = { title: 'Section 04 layouts', robots: { index: false, follow: false } }

const chip = (on: boolean) =>
  `inline-flex min-h-[40px] items-center rounded-full border px-4 font-sans text-body-sm font-medium no-underline ${on ? 'border-foundation-900 bg-foundation-900 text-body' : 'border-btn-border text-foundation-800 hover:border-foundation-900'}`

export default function Page({ searchParams }: { searchParams: { v?: string; w?: string } }) {
  const v = (searchParams.v && searchParams.v in LOOKS ? searchParams.v : 'c') as TRVariant
  const w = (searchParams.w && searchParams.w in WRAPS ? searchParams.w : 'rows3') as Wrap
  return (
    <main className="min-h-screen bg-body px-6 pb-24 sm:px-10 lg:px-section">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-border py-4">
          <nav aria-label="How the three share the section" className="flex flex-wrap items-center gap-2">
            <span className="w-full font-sans text-caption text-foundation-700 sm:w-40">Fit in the section</span>
            {(Object.keys(WRAPS) as Wrap[]).map((k) => (
              <Link key={k} href={`?w=${k}&v=${v}`} scroll={false} aria-current={k === w ? 'page' : undefined} className={chip(k === w)}>{WRAPS[k].name}</Link>
            ))}
          </nav>
          <nav aria-label="Type and Radius look" className="mt-2 flex flex-wrap items-center gap-2">
            <span className="w-full font-sans text-caption text-foundation-700 sm:w-40">Type and Corners look</span>
            {(Object.keys(LOOKS) as TRVariant[]).map((k) => (
              <Link key={k} href={`?w=${w}&v=${k}`} scroll={false} aria-current={k === v ? 'page' : undefined} className={chip(k === v)}>{k.toUpperCase()} · {LOOKS[k]}</Link>
            ))}
          </nav>
          <p className="mt-3 mb-0 max-w-3xl font-sans text-body-sm text-foundation-700">{WRAPS[w].note}</p>
        </div>
        <CarbonWrap key={`${w}-${v}`} w={w} v={v} />
      </div>
    </main>
  )
}
