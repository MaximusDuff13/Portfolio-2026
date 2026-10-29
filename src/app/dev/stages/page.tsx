import type { Metadata } from 'next'
import { STAGES } from '@/app/_home/content'

/* /dev/stages: the showcase backgrounds a case study can put behind its screens, each pale and
   strong, with a screen on it so the pick is judged against real content. Kept out of search. */
export const metadata: Metadata = {
  title: 'Showcase backgrounds',
  robots: { index: false, follow: false },
}

const NOTES: Record<keyof typeof STAGES, string> = {
  sage: 'The hills. Acentra Health uses it.',
  sky: 'The sky. Data Conversion uses it.',
  harbour: 'The water: a cooler, greener blue than sky.',
  straw: 'The dry grass: the page’s own family, deeper.',
  ginger: 'Maggie: warm, for a playful or personal project.',
  mist: 'The far hills: near-neutral, for busy screens.',
}

export default function StagesPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8">
      <p className="text-label font-sans uppercase tracking-widest text-foundation-500">Case study backgrounds</p>
      <h1 className="mt-3 text-heading-xl font-display text-foundation-900">Showcase backgrounds</h1>
      <p className="mt-3 max-w-[60ch] text-body font-sans text-foundation-600">
        Pick one per case study, never the same one twice on a page. In content.ts:{' '}
        <code className="text-body-sm">stage: STAGES.harbour.pale, stageStrong: STAGES.harbour.strong</code>. In
        Tailwind: <code className="text-body-sm">bg-stage-harbour</code>,{' '}
        <code className="text-body-sm">bg-stage-harbour-strong</code>.
      </p>
      <ul className="mt-12 grid gap-10 sm:grid-cols-2">
        {(Object.keys(STAGES) as (keyof typeof STAGES)[]).map((name) => (
          <li key={name}>
            <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border">
              {(['pale', 'strong'] as const).map((step) => (
                <div key={step} className="grid aspect-[4/3] place-items-center p-6" style={{ background: STAGES[name][step] }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/beforeafter/After.png" alt="" className="w-full rounded-md shadow-lift" />
                </div>
              ))}
            </div>
            <p className="mt-3 text-heading-m font-display text-foundation-900 capitalize">{name}</p>
            <p className="text-body-sm font-sans text-foundation-600">
              {NOTES[name]} <span className="text-foundation-500">Pale · strong.</span>
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}
