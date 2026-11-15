'use client'
import { useState } from 'react'
import { BeforeAfter } from './BeforeAfter'
import { SectionHeader } from './SectionHeader'

/* 05 The system in use (picked Nov 15 2026: "G Accordion"). The old 05 The Build and 06 The
   Transformation in one frame: the open exhibit is wide, the other is a sliver you click to swap.
   Phones: the sliver becomes a short bar. Both are cropped to fill the frame (object-cover). */

type K = 'library' | 'screen'
const PANELS: { key: K; label: string; line: string }[] = [
  { key: 'library', label: 'The library', line: 'The component library, themed live across both Acentra Health brands.' },
  { key: 'screen', label: 'A real screen', line: 'The same screen, rebuilt on the system. Drag to compare the old, fragmented screen with the redesign.' },
]
const BEFORE = '/images/beforeafter/Before Image.png'
const AFTER = '/images/beforeafter/After.png'

export function SystemInUse() {
  const [on, setOn] = useState<K>('screen')
  const [swapped, setSwapped] = useState(false)
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
        <SectionHeader index="05" eyebrow="The system in use" title="From tokens to real screens" />
        <p className="m-0 max-w-sm text-body-sm font-sans text-foundation-700 md:pb-1">
          The tokens became a component library, and the library rebuilt our product screens.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3 md:aspect-[2.5/1] md:flex-row">
        {PANELS.map((x, i) => {
          const active = x.key === on
          return (
            <div
              key={x.key}
              className={`relative overflow-hidden rounded-xl bg-foundation-900 transition-[flex-grow] duration-500 motion-reduce:transition-none ${active ? 'aspect-[2/1] md:aspect-auto md:flex-[5]' : 'h-16 md:h-auto md:flex-[1] md:hover:flex-[1.3]'}`}
            >
              {x.key === 'library' ? (
                <video
                  src="/videos/Component-Video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={active}
                  aria-label="The component library, switching between themes"
                  className="absolute inset-0 block h-full w-full object-cover"
                />
              ) : active ? (
                <div className="absolute inset-0 [&>div]:h-full [&>div]:rounded-none [&>div]:border-0">
                  <BeforeAfter aspect="auto" before={BEFORE} after={AFTER} />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={AFTER} alt="" className="absolute inset-0 h-full w-full object-cover object-left" />
              )}
              {!active && (
                // The closed panel asks to be opened: a handwritten "click me" over a round arrow
                // that nudges sideways every few seconds, until the reader has swapped once. On
                // hover the panel widens a little and the arrow fills in.
                <button
                  type="button"
                  onClick={() => {
                    setOn(x.key)
                    setSwapped(true)
                  }}
                  className="group/sl absolute inset-0 flex cursor-pointer items-center justify-between border-0 bg-foundation-900/80 p-4 font-sans text-body-sm font-medium text-body transition-colors hover:bg-foundation-900/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-warm motion-reduce:transition-none md:flex-col md:justify-center"
                >
                  <span className="md:absolute md:bottom-4 md:left-4">
                    <span className="mr-2 tabular-nums text-foundation-300">0{i + 1}</span>
                    {x.label}
                  </span>
                  <span className="flex items-center gap-3 md:flex-col">
                    <span aria-hidden="true" className="cs-hand-light md:-rotate-6">
                      <span className="md:hidden">tap me</span>
                      <span className="hidden md:inline">click me</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid h-11 w-11 place-items-center rounded-full bg-body text-[22px] leading-none text-accent-warm shadow-lg transition-colors group-hover/sl:bg-accent-warm group-hover/sl:text-body motion-reduce:transition-none ${swapped ? '' : 'cs-nudge'}`}
                    >
                      ›
                    </span>
                  </span>
                </button>
              )}
            </div>
          )
        })}
      </div>
      <p className="mt-4 mb-0 font-sans text-body-sm text-foundation-700">{PANELS.find((x) => x.key === on)!.line}</p>
    </>
  )
}
