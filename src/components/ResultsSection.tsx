/* 05 Results (Nov 21 2026): the old 07 Small Wins and 09 Results as one short section, in plain
   words for hiring managers. Each result is a number, what it means and what it beat, with its
   proof directly underneath at full width: layout E, "Claim, then proof", picked Nov 21 2026 (A to
   D put the proof beside the results; F to H were the marked-up, five-screens and card versions).
   The Figma strip is the only real evidence on hand. The rebrand's before/after is a dashed slot
   until Michael sends the two screens; it renders only in development, so production shows
   nothing under "2 weeks" until then. */
import type { ReactNode } from 'react'
import { ChevronsLeftRight } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { Develop } from './Develop'
import { LightboxProvider, LightboxTrigger } from './Lightbox'

export type Result = { id: string; n: string; what: string; vs: string }

const DEV = process.env.NODE_ENV !== 'production'

// The summary strip of Figma's library analytics, 1089 × 81.
const ANALYTICS = {
  src: '/images/acentra-hero/Metrics.png',
  alt: 'Figma library analytics for the design system: used by 10 teams, 119 components, 30 styles, 307 variables, 1.2k inserts this week',
}
const FIGMA_PANEL = 'bg-[#2c2c2c]' // the strip's own background, so its frame reads as part of it
// the export carries a dark 6px edge on the left and a panel divider in its last 4px: clip both,
// and the frame's matching grey shows through
const STRIP_CLIP = '[clip-path:inset(0_4px_0_6px)]'

/* One result on one line: the number, what it means, what it beat. */
function MetricLine({ r }: { r: Result }) {
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-[12rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8">
      <p className="m-0 whitespace-nowrap font-display text-heading-l text-accent-warm">{r.n}</p>
      <p className="m-0 text-body font-sans text-foundation-800">{r.what}</p>
      <p className="m-0 text-body-sm font-sans text-foundation-600 md:text-right">{r.vs}</p>
    </div>
  )
}

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="text-label font-sans uppercase tracking-widest text-foundation-600">{children}</span>
)

/* The Figma strip at full width. Phones scroll it sideways inside its frame so the text stays
   readable; it also opens in the lightbox. */
function Strip() {
  return (
    <figure className="m-0">
      <Develop className="rounded-lg">
        <div className={`relative overflow-x-auto rounded-lg ${FIGMA_PANEL}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ANALYTICS.src} alt={ANALYTICS.alt} width={1089} height={81} className={`block h-auto w-[1089px] max-w-none md:w-full md:max-w-[1089px] ${STRIP_CLIP}`} />
          <LightboxTrigger src={ANALYTICS.src} alt={ANALYTICS.alt} />
        </div>
      </Develop>
      <figcaption className="mt-3 mb-0 text-body-sm font-sans text-foundation-700">Figma’s library analytics for the system. Its 10 teams are Figma team projects, which belong to 5 key teams. Its 119 components include variants and other parts of 39 components.</figcaption>
    </figure>
  )
}

/* The rebrand as one before/after frame, the drag-to-compare slider it will become (as in 05,
   BeforeAfter). A slot until the two screens arrive. */
function BeforeAfterSlot() {
  return (
    <div className="relative grid aspect-[4/3] grid-cols-2 overflow-hidden rounded-lg border border-dashed border-foundation-400 bg-foundation-100 sm:aspect-[2/1]">
      <div className="p-4"><Tag>Before the rebrand</Tag></div>
      <div className="border-0 border-l border-dashed border-foundation-400 p-4 text-right"><Tag>Two weeks later</Tag></div>
      <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-solid border-foundation-400 bg-body text-foundation-700">
        <ChevronsLeftRight size={18} />
      </span>
      <p className="absolute inset-x-0 bottom-0 m-0 bg-foundation-100 px-4 py-3 text-caption font-sans text-foundation-700">
        To add: the same product screen before the rebrand and after it. 2 PNGs, 1600 × 800. It becomes a drag-to-compare slider.
      </p>
    </div>
  )
}

// Each result's proof, by id. The rebrand slot is development-only, so production shows no
// empty box.
const PROOF: Record<string, ReactNode> = {
  teams: <Strip />,
  ...(DEV ? { rebrand: <BeforeAfterSlot /> } : {}),
}

export function ResultsSection({ results }: { results: Result[] }) {
  return (
    <LightboxProvider>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
        <SectionHeader index="05" eyebrow="Results" title="More teams than planned" />
        <p className="m-0 max-w-sm text-body-sm font-sans text-foundation-700 md:pb-1">Then a rebrand put it to a real test.</p>
      </div>
      <div className="mt-10 border-0 border-t border-solid border-foundation-900">
        {results.map((r, i) => (
          <div key={r.id} className={`py-8 ${i ? 'border-0 border-t border-solid border-border' : ''}`}>
            <MetricLine r={r} />
            {PROOF[r.id] && <div className="mt-5">{PROOF[r.id]}</div>}
          </div>
        ))}
      </div>
    </LightboxProvider>
  )
}
