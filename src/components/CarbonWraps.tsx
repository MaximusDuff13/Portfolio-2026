'use client'
/* TRIAL (Nov 14 2026): ways to hold Colour, Type and Radius in section 04 without making the
   page longer. Reviewed at /dev/type-radius?w=tabs|pair|rows|stack (&v=a-e picks the Type and
   Radius look). Once one is picked it moves into BuiltOnCarbon.tsx and this file goes. */
import { useState, type ReactNode } from 'react'
import { ColourStory } from './BuiltOnCarbon'
import { LightboxProvider } from './Lightbox'
import { SectionHeader } from './SectionHeader'
import { TabBar } from './TabBar'
import { TRPart, TypeRadius, type TRVariant } from './TypeRadiusLayouts'

export type Wrap = 'tabs' | 'pair' | 'rows' | 'rows3' | 'stack'

const Head = () => (
  <div className="max-w-2xl">
    <SectionHeader index="04" eyebrow="Built on Carbon" title="What we changed in Carbon" />
    <p className="mt-4 mb-0 text-body font-sans text-foundation-700">Carbon gave us a tested base. We changed three things to make it Acentra’s: colour, type and corners.</p>
  </div>
)
const ColourHead = () => (
  <div className="mt-12 max-w-2xl">
    <h3 className="m-0 text-heading-l font-display text-foundation-900">One green, built for both themes</h3>
    <p className="mt-3 mb-0 text-body font-sans text-foundation-700">I tuned Acentra’s green to work on White and Gray 100, grew it into a scale with magic numbers, and set it up as tokens.</p>
  </div>
)
const Colour = () => (
  <>
    <ColourHead />
    <ColourStory />
  </>
)

/* tabs: Colour | Type | Corners. One topic on screen at a time. */
function Tabs3({ v }: { v: TRVariant }) {
  const [tab, setTab] = useState<'colour' | 'type' | 'radius'>('colour')
  return (
    <>
      <div className="mt-10">
        <TabBar layoutId="c04-wrap" active={tab} onChange={setTab} tabs={[{ key: 'colour', label: 'Colour' }, { key: 'type', label: 'Type' }, { key: 'radius', label: 'Corners' }]} />
      </div>
      {tab === 'colour' ? <Colour /> : <div className="mt-12"><TRPart v={v} part={tab} /></div>}
    </>
  )
}

/* colour stays open; Type and Corners share one space under it */
function Pair({ v }: { v: TRVariant }) {
  const [tab, setTab] = useState<'type' | 'radius'>('type')
  return (
    <>
      <Colour />
      <div className="mt-16">
        <TabBar layoutId="c04-pair" active={tab} onChange={setTab} tabs={[{ key: 'type', label: 'Type' }, { key: 'radius', label: 'Corners' }]} />
        <div className="mt-10"><TRPart v={v} part={tab} /></div>
      </div>
    </>
  )
}

/* colour stays open; Type and Corners are two closed rows that open in place */
function FoldRow({ label, teaser, open, children }: { label: string; teaser: string; open?: boolean; children: ReactNode }) {
  return (
    <details
      name="c04-rows"
      open={open}
      className="group/row scroll-mt-32 border-b border-border"
      // opening one row closes the others; if that pulled this row above the screen, bring it back
      onToggle={(e) => {
        const el = e.currentTarget
        if (el.open && el.getBoundingClientRect().top < 120) el.scrollIntoView({ block: 'start' })
      }}
    >
      <summary className="flex min-h-[64px] cursor-pointer list-none items-center gap-x-6 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-warm [&::-webkit-details-marker]:hidden">
        <span className="w-24 flex-none font-display text-heading-m text-foundation-900">{label}</span>
        <span className="min-w-0 flex-1 font-sans text-body-sm text-foundation-700">{teaser}</span>
        <span aria-hidden="true" className="flex-none font-sans text-[22px] leading-none text-foundation-900 transition-transform group-open/row:rotate-45 motion-reduce:transition-none">+</span>
      </summary>
      <div className="pb-10 pt-6">{children}</div>
    </details>
  )
}
function Rows({ v }: { v: TRVariant }) {
  return (
    <>
      <Colour />
      <div className="mt-16 border-t border-border">
        <FoldRow label="Type" teaser="IBM Plex became Roboto, in two sizes."><TRPart v={v} part="type" /></FoldRow>
        <FoldRow label="Corners" teaser="2px on every component, and a scale for layouts."><TRPart v={v} part="radius" /></FoldRow>
      </div>
    </>
  )
}

/* all three are rows; Colour starts open, and opening one closes the others */
function Rows3({ v }: { v: TRVariant }) {
  return (
    <div className="mt-10 border-t border-border">
      <FoldRow open label="Colour" teaser="One green, built for both themes."><div className="-mt-12"><ColourStory /></div></FoldRow>
      <FoldRow label="Type" teaser="IBM Plex became Roboto, in two sizes."><TRPart v={v} part="type" /></FoldRow>
      <FoldRow label="Corners" teaser="2px on every component, and a scale for layouts."><TRPart v={v} part="radius" /></FoldRow>
    </div>
  )
}

export function CarbonWrap({ w, v }: { w: Wrap; v: TRVariant }) {
  return (
    <LightboxProvider>
      <section id="tr" className="pt-12">
        <Head />
        {w === 'tabs' && <Tabs3 v={v} />}
        {w === 'pair' && <Pair v={v} />}
        {w === 'rows' && <Rows v={v} />}
        {w === 'rows3' && <Rows3 v={v} />}
        {w === 'stack' && (
          <>
            <Colour />
            <div className="mt-16"><TypeRadius v={v} /></div>
          </>
        )}
      </section>
    </LightboxProvider>
  )
}
