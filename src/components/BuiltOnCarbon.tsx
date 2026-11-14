'use client'
import { useState } from 'react'
import { SectionHeader } from './SectionHeader'
import { LightboxProvider, LightboxTrigger } from './Lightbox'
import { MarkedUpShot } from './MarkedUpShot'
import { TokenFlow } from './TokenFlow'
import { FlowNote, HOW, HowDisclosure, MARKUP } from './ColourDetails'

/* 04 Built on Carbon (rebuilt Nov 14 2026): the colour story in Michael's three beats.
   1 one green that works on both of Carbon's themes, White and Gray 100;
   2 the scale grown from it with the USWDS magic numbers;
   3 how it was set up in the design system as tokens.
   His exports do the talking, marked up by hand like the 01 Audit; each caption is one line,
   and "How I did it" under it opens the method (ColourDetails.tsx). Marketing's starting green
   and every hex value are deliberately left out: the page is public. Type and Shape were single
   facts, not a story, so they are one slim "Also changed" row underneath. */

type Beat = { title: string; line: string }
const BEATS: Beat[] = [
  { title: 'One green, both themes', line: 'Passes for text on White, and for buttons, icons and large text on Gray 100.' },
  { title: 'A scale from magic numbers', line: 'Ten steps. The gap between two grades sets their contrast.' },
  { title: 'Set up as tokens', line: 'Teams pick a role, not a shade.' },
]

const IMAGES = [
  {
    src: '/images/acentra-colour/themes-800.webp',
    full: '/images/acentra-colour/themes-1600.webp',
    alt: 'Acentra Green as a button beside Carbon’s red, blue, pink and purple, across a white half and a dark half: 5.1:1 against white, 3.6:1 against dark',
  },
  {
    src: '/images/acentra-colour/scale-800.webp',
    full: '/images/acentra-colour/scale-1600.webp',
    alt: 'The Acentra green scale: Leaf, the primary brand colour, with Green 10, 60 and 100 and their magic-number contrast notes',
  },
]

function Caption({ i }: { i: number }) {
  return (
    <>
      <p className="mt-4 mb-0 font-sans text-caption tabular-nums text-foundation-600">{String(i + 1).padStart(2, '0')}</p>
      <h3 className="mt-1 mb-0 text-heading-m font-display text-foundation-900">{BEATS[i].title}</h3>
      <p className="mt-1 mb-0 max-w-[36rem] text-body-sm font-sans text-foundation-700">{BEATS[i].line}</p>
      <HowDisclosure how={HOW[i]} />
    </>
  )
}

/** one export on its sage stage, marked up by hand; tap it to see it full size */
function Shot({ i }: { i: number }) {
  const img = IMAGES[i]
  return (
    <div className="rounded-xl bg-stage-sage p-4 sm:p-6">
      <div className="relative mx-auto max-w-[420px]">
        <MarkedUpShot src={img.src} alt={img.alt} w={800} h={800} rings={MARKUP[i].rings} notes={MARKUP[i].notes} delay={i * 180} />
        <LightboxTrigger src={img.full} alt={img.alt} />
      </div>
    </div>
  )
}

function AlsoChanged() {
  const items = [
    { line: <><s className="text-foundation-600 decoration-1">IBM Plex</s> → Acumin Pro, the brand font</>, art: true },
    { line: <>Standard and Compact type modes, for external and internal apps</>, img: { src: '/images/acentra-hero/type-modes.webp', alt: 'The same beneficiary screen in Standard, left, and Compact, right' } },
    { line: <>0 → 2px corners, for a friendlier product</>, img: { src: '/images/acentra-hero/radius-before-after.webp', alt: 'Before: border-radius token radius-00, a 0px corner. After: radius-01, a 2px corner, shown at 16× zoom' } },
  ]
  return (
    <div className="mt-16 border-t border-border pt-6">
      <h3 className="m-0 text-label font-sans uppercase tracking-widest text-foundation-600">Also changed</h3>
      <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-3 sm:gap-6">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-4 sm:block">
            <div className="relative grid h-[72px] w-[112px] flex-none place-items-center overflow-hidden rounded-lg bg-stage-sage sm:h-[120px] sm:w-full">
              {it.img ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.img.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  <LightboxTrigger src={it.img.src} alt={it.img.alt} />
                </>
              ) : (
                <p className="m-0 whitespace-nowrap font-display text-[18px] text-foundation-900 sm:text-[30px]">Acumin Pro</p>
              )}
            </div>
            <p className="m-0 text-body-sm font-sans text-foundation-800 sm:mt-3">{it.line}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BuiltOnCarbon() {
  return (
    <LightboxProvider>
      <section className="border-t border-border pt-section pb-section">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionHeader index="04" eyebrow="Built on Carbon" title="One green, built for both themes" />
            <p className="mt-4 mb-0 text-body font-sans text-foundation-700">
              I tuned Acentra’s green to work on White and Gray 100, grew it into a scale with magic numbers, and set it up as tokens.
            </p>
          </div>
        </div>

        {/* 01 and 02: the two exports, side by side; tap either to see it full size */}
        <ol className="m-0 mt-12 grid list-none grid-cols-1 gap-12 p-0 md:grid-cols-2 md:gap-8">
          {IMAGES.map((img, i) => (
            <li key={img.src}>
              <Shot i={i} />
              <Caption i={i} />
            </li>
          ))}
        </ol>

        {/* 03: the token flow, redrawn in HTML so it is sharp and readable everywhere */}
        <div className="mt-12">
          <div className="rounded-xl bg-stage-sage p-5 sm:p-8">
            <TokenFlow mark={(k) => <FlowNote k={k} />} />
          </div>
          <Caption i={2} />
        </div>

        <AlsoChanged />
      </section>
    </LightboxProvider>
  )
}

/* The typography modes, as a working sketch. Only the temporary /dev/layouts page uses it. */
const MODES = {
  standard: { label: 'Standard', body: 16, small: 16, head: 16, note: 'External healthcare apps' },
  compact: { label: 'Compact', body: 14, small: 14, head: 14, note: 'Internal tools' },
} as const
type Mode = keyof typeof MODES

export function ModeSketch() {
  const [mode, setMode] = useState<Mode>('standard')
  const m = MODES[mode]
  return (
    <div className="rounded-xl bg-stage-sage p-4 sm:p-6">
      <div role="radiogroup" aria-label="Typography mode" className="inline-flex rounded-full border border-foundation-900 p-1">
        {(Object.keys(MODES) as Mode[]).map((k) => (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={mode === k}
            onClick={() => setMode(k)}
            className={`min-h-[36px] rounded-full px-4 text-body-sm font-sans font-medium transition-colors ${mode === k ? 'bg-foundation-900 text-body' : 'text-foundation-800'}`}
          >
            {MODES[k].label}
          </button>
        ))}
      </div>
      <div className="bc-mode mt-4 rounded-lg border border-border bg-body p-5" style={{ ['--b' as string]: `${m.body}px`, ['--s' as string]: `${m.small}px`, ['--h' as string]: `${m.head}px` }}>
        <p className="bc-s m-0 font-sans uppercase tracking-widest text-foundation-600">Prior authorization</p>
        <p className="bc-h mt-2 mb-0 font-sans font-semibold text-foundation-900">Request #48213 is under review</p>
        <p className="bc-b mt-2 mb-0 font-sans text-foundation-700">We received the provider’s notes. A reviewer will reply within two working days.</p>
        <p className="bc-s mt-3 mb-0 font-sans text-foundation-600">Body {m.body}px · {m.note}</p>
      </div>
    </div>
  )
}
