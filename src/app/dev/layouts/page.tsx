// TEMPORARY review page (Nov 7 2026): layout options for the Acentra sections 04 (Built on
// Carbon: what we changed) and 05 (the component video), side by side with what follows.
// /dev/layouts?s=04&v=a|b|c|d and ?s=05&v=a|b|c|d. Same content in every option. Delete once chosen.
import Link from 'next/link'
import { BeforeAfter } from '@/components/BeforeAfter'
import { BuiltOnCarbon, ModeSketch } from '@/components/BuiltOnCarbon'
import { GROUPS } from '../../work/acentra-health/carbon-data'
import { SectionHeader } from '@/components/SectionHeader'
import '../../work/case-study.css'

const pad = 'px-6 sm:px-10 lg:px-section'
const Head04 = () => (
  <div className="max-w-2xl">
    <SectionHeader index="04" eyebrow="Built on Carbon" title="A foundation, not a paint job" />
    <p className="mt-4 mb-0 text-body font-sans text-foundation-700">Carbon gave us a tested base. These are the places we changed it for Acentra.</p>
  </div>
)

/* Round 2 (Nov 7): Colour and Type must not share a layout. Each option builds Colour out of
   colour and Type out of type. The ten greens are sampled from Michael's ramp export (Rythmm.png),
   light to dark; no hex is printed because the export masks them. */
const RAMP = ['#dcfed9', '#a0ef9b', '#76dd6f', '#52c14c', '#2ea02c', '#028202', '#016101', '#024404', '#022d05', '#081909']
const [COLOUR, TYPE] = GROUPS
const SAMPLE = { s: 'Prior authorization', h: 'Request #48213 is under review', b: 'We received the provider’s notes. A reviewer will reply within two working days.' }
const SCALES = [
  { label: 'Standard', note: 'External healthcare apps', h: 22, b: 16, s: 14 },
  { label: 'Compact', note: 'Internal tools', h: 18, b: 14, s: 12 },
]
// both modes at once, side by side: the difference is read, not toggled
const ModesSideBySide = ({ dark = false }: { dark?: boolean }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {SCALES.map((m) => (
      <div key={m.label} className={`rounded-xl border p-5 ${dark ? 'border-white/15' : 'border-border bg-body'}`}>
        <p className="m-0 text-label font-sans font-semibold uppercase tracking-widest text-foundation-900">{m.label} <span className="font-normal text-foundation-600">· {m.note}</span></p>
        <p className="mt-4 mb-0 font-sans uppercase tracking-widest text-foundation-600" style={{ fontSize: m.s }}>{SAMPLE.s}</p>
        <p className="mt-2 mb-0 font-sans font-semibold text-foundation-900" style={{ fontSize: m.h, lineHeight: 1.3 }}>{SAMPLE.h}</p>
        <p className="mt-2 mb-0 font-sans text-foundation-700" style={{ fontSize: m.b, lineHeight: 1.5 }}>{SAMPLE.b}</p>
        <p className="mt-4 mb-0 text-caption font-sans text-foundation-600">Head {m.h} · Body {m.b} · Small {m.s}px</p>
      </div>
    ))}
  </div>
)
const TypeHead = () => (
  <h3 className="m-0 border-b border-foundation-900 pb-3 text-label font-sans font-semibold uppercase tracking-widest text-foundation-900">Type</h3>
)

/* 04 · B  Green room | type page. Colour leaves the cream: a full-bleed band in Acentra's darkest
   green with the ramp running across its top edge, the exports in a row. Then Type comes back to
   cream and is all type: the font swap set huge, the two modes side by side. */
function B04() {
  return (
    <>
      <Head04 />
      <div className="relative mt-14 left-1/2 w-screen -translate-x-1/2 overflow-hidden" style={{ background: RAMP[9] }}>
        <div className="flex h-3">{RAMP.map((c) => <span key={c} className="flex-1" style={{ background: c }} />)}</div>
        <div className={`${pad} py-16`}>
          <div className="mx-auto max-w-6xl">
            <p className="m-0 text-label font-sans font-semibold uppercase tracking-widest" style={{ color: RAMP[1] }}>Colour</p>
            <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
              {COLOUR.changes.map((c) => (
                <div key={c.title}>
                  {c.img && <img src={c.img.src} alt={c.img.alt} loading="lazy" className={`block aspect-square w-full rounded-lg ${c.img.src.includes("Discpline") ? "bg-white object-contain" : "object-cover"}`} />}
                  {c.was && <s className="mt-5 block text-body-sm font-sans decoration-1" style={{ color: RAMP[2] }}>Carbon: {c.was}</s>}
                  <p className={`${c.was ? 'mt-1' : 'mt-5'} mb-0 text-heading-m font-display`} style={{ color: RAMP[0] }}>{c.title}</p>
                  <p className="mt-2 mb-0 text-body-sm font-sans" style={{ color: RAMP[1] }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <TypeHead />
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <s className="block font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-foundation-500 decoration-2">IBM Plex</s>
            <p className="mt-3 mb-0 font-display text-[clamp(3rem,8vw,7rem)] leading-none text-foundation-900">Acumin Pro</p>
          </div>
          <div className="md:col-span-5">
            <p className="m-0 text-body font-sans text-foundation-700">{TYPE.changes[0].desc}</p>
            <p className="cs-note mt-3 mb-0">set here in this site’s serif; the real specimen is to come</p>
          </div>
        </div>
        <div className="mt-16 max-w-2xl">
          <s className="block text-body-sm font-sans text-foundation-600 decoration-1">Carbon: {TYPE.changes[1].was}</s>
          <p className="mt-1 mb-0 text-heading-xl font-display text-foundation-900">{TYPE.changes[1].title}</p>
          <p className="mt-3 mb-0 text-body font-sans text-foundation-700">{TYPE.changes[1].desc}</p>
        </div>
        <div className="mt-8"><ModesSideBySide /></div>
      </div>
    </>
  )
}

/* 04 · C  Ramp | scale. Colour is told down the ramp itself: ten swatches as a tall column, each
   change pinned beside the part of the ramp it is about. Type is told as a measured scale: the
   same lines stepped down Standard against Compact, with the sizes ruled off like a spec sheet. */
function C04() {
  const pins = [5, 0, 7] // anchor at Green 60; the ramp from the top; tokens low in the ramp
  return (
    <>
      <Head04 />
      <div className="mt-14">
        <h3 className="m-0 border-b border-foundation-900 pb-3 text-label font-sans font-semibold uppercase tracking-widest text-foundation-900">Colour</h3>
        <div className="mt-10 grid grid-cols-[56px_1fr] gap-6 sm:grid-cols-[88px_1fr] md:gap-10">
          <div className="grid overflow-hidden rounded-lg" style={{ gridTemplateRows: `repeat(${RAMP.length}, minmax(0, 1fr))` }}>
            {RAMP.map((c, i) => (
              <span key={c} className="relative" style={{ background: c }}>
                {i === 5 && <span className="absolute inset-y-0 -right-3 w-3 border-y-2 border-r-2 border-accent-warm" aria-hidden="true" />}
              </span>
            ))}
          </div>
          <ol className="m-0 flex list-none flex-col gap-12 p-0">
            {COLOUR.changes.map((c, i) => (
              <li key={c.title} className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-center">
                <div className="md:col-span-5">
                  <p className="m-0 text-label font-sans uppercase tracking-widest text-foundation-600">Step {['60', '10 → 100', '60 → tokens'][i]}</p>
                  {c.was && <s className="mt-1 block text-body-sm font-sans text-foundation-600 decoration-1">Carbon: {c.was}</s>}
                  <p className="mt-1 mb-0 text-heading-m font-display text-foundation-900">{c.title}</p>
                  <p className="mt-2 mb-0 text-body-sm font-sans text-foundation-700">{c.desc}</p>
                </div>
                {c.img && <img src={c.img.src} alt={c.img.alt} loading="lazy" data-pin={pins[i]} className="block w-full rounded-lg border border-border md:col-span-7" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="mt-20">
        <TypeHead />
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <s className="block text-body-sm font-sans text-foundation-600 decoration-1">Carbon: {TYPE.changes[0].was}</s>
            <p className="mt-1 mb-0 text-heading-xl font-display text-foundation-900">{TYPE.changes[0].title}</p>
            <p className="mt-3 mb-0 text-body-sm font-sans text-foundation-700">{TYPE.changes[0].desc}</p>
            <s className="mt-10 block text-body-sm font-sans text-foundation-600 decoration-1">Carbon: {TYPE.changes[1].was}</s>
            <p className="mt-1 mb-0 text-heading-xl font-display text-foundation-900">{TYPE.changes[1].title}</p>
            <p className="mt-3 mb-0 text-body-sm font-sans text-foundation-700">{TYPE.changes[1].desc}</p>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-[64px_1fr_1fr] border-t border-foundation-900 text-foundation-900">
              <span />
              {SCALES.map((m) => <p key={m.label} className="m-0 py-3 text-label font-sans font-semibold uppercase tracking-widest">{m.label}</p>)}
              {(['h', 'b', 's'] as const).map((k) => (
                <div key={k} className="contents">
                  <p className="m-0 border-t border-border py-5 text-caption font-sans text-foundation-600">{{ h: 'Head', b: 'Body', s: 'Small' }[k]}</p>
                  {SCALES.map((m) => (
                    <div key={m.label} className="border-t border-border py-5 pr-4">
                      <p className={`m-0 font-sans ${k === 'h' ? 'font-semibold' : ''}`} style={{ fontSize: m[k], lineHeight: 1.3 }}>{k === 'h' ? SAMPLE.h : k === 'b' ? 'A reviewer will reply soon.' : SAMPLE.s}</p>
                      <p className="mt-2 mb-0 text-caption font-sans text-foundation-600">{m[k]}px</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-3 mb-0 text-caption font-sans text-foundation-700">Sizes are placeholders until the Figma library values are in.</p>
          </div>
        </div>
      </div>
    </>
  )
}

/* 04 · D  Gallery | essay. Colour is a horizontal strip you scroll through, the exports large like
   prints on a wall. Type is a narrow essay column, read top to bottom, with the mode toggle set
   inline in the text where the reader reaches it. */
function D04() {
  return (
    <>
      <Head04 />
      <div className="mt-14">
        <h3 className="m-0 flex items-baseline justify-between border-b border-foundation-900 pb-3 text-label font-sans font-semibold uppercase tracking-widest text-foundation-900">
          Colour <span className="cs-note normal-case tracking-normal">scroll the wall →</span>
        </h3>
        <ol className="m-0 mt-8 flex list-none snap-x snap-mandatory gap-6 overflow-x-auto p-0 pb-4">
          {COLOUR.changes.map((c) => (
            <li key={c.title} className="w-[82%] shrink-0 snap-start md:w-[46%]">
              {c.img && <img src={c.img.src} alt={c.img.alt} loading="lazy" className="block aspect-square w-full rounded-xl border border-border object-cover" />}
              {c.was && <s className="mt-4 block text-body-sm font-sans text-foundation-600 decoration-1">Carbon: {c.was}</s>}
              <p className={`${c.was ? 'mt-1' : 'mt-4'} mb-0 text-heading-m font-display text-foundation-900`}>{c.title}</p>
              <p className="mt-2 mb-0 text-body-sm font-sans text-foundation-700">{c.desc}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-20 mx-auto max-w-[40rem]">
        <TypeHead />
        <p className="mt-10 mb-0 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foundation-900">
          <s className="text-foundation-500 decoration-2">IBM Plex</s> became Acumin Pro.
        </p>
        <p className="mt-4 mb-0 text-body font-sans text-foundation-700">{TYPE.changes[0].desc}</p>
        <p className="mt-12 mb-0 text-heading-xl font-display text-foundation-900">{TYPE.changes[1].title}</p>
        <p className="mt-3 mb-0 text-body font-sans text-foundation-700">{TYPE.changes[1].desc}</p>
        <div className="mt-8"><ModeSketch /></div>
      </div>
    </>
  )
}

/* ---------------- 05: the component video, and the 06 slider that follows ---------------- */
const video = '/videos/Component-Video.mp4'
const caption = 'The component library, themed live across both Acentra Health brands.'
const Video = ({ className = '' }: { className?: string }) => (
  <video src={video} autoPlay muted loop playsInline controls className={`block w-full rounded-lg border border-border ${className}`} />
)
const Slider = () => <BeforeAfter before="/images/beforeafter/Before Image.png" after="/images/beforeafter/After.png" />
const Head06 = () => (
  <SectionHeader index="06" eyebrow="The transformation" title="The same screen, rebuilt on the system" />
)
const Rule = () => <div className="my-section border-t border-border" />

/* 05 · A  The same band, made light: cream page, the video on the sage stage like the hero. */
function A05() {
  return (
    <>
      <div className="max-w-2xl">
        <SectionHeader index="05" eyebrow="The build" title="From tokens to components" />
      </div>
      <div className="mt-10 rounded-2xl bg-stage-sage p-3 sm:p-6 md:p-8"><Video /></div>
      <p className="mt-4 mb-0 text-body-sm font-sans text-foundation-700">{caption}</p>
      <Rule />
      <Head06 />
      <div className="mt-10"><Slider /></div>
    </>
  )
}

/* 05 · B  Text beside the clip: the build as a short two-column beat, video smaller on the right. */
function B05() {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-4">
          <SectionHeader index="05" eyebrow="The build" title="From tokens to components" />
          <p className="mt-4 mb-0 text-body font-sans text-foundation-700">{caption}</p>
        </div>
        <div className="md:col-span-8 rounded-2xl bg-stage-sage p-3 sm:p-5"><Video /></div>
      </div>
      <Rule />
      <Head06 />
      <div className="mt-10"><Slider /></div>
    </>
  )
}

/* 05 · C  Merged into 06: one section, "from tokens to the screen". The slider leads; the clip
   sits under it as the how, with a margin note. One heading instead of two. */
function C05() {
  return (
    <>
      <div className="max-w-2xl">
        <SectionHeader index="05" eyebrow="The build" title="The same screen, rebuilt on the system" />
        <p className="mt-4 mb-0 text-body font-sans text-foundation-700">Drag to compare the old screen with the one rebuilt from the system’s components.</p>
      </div>
      <div className="mt-10"><Slider /></div>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
        <div className="md:col-span-5"><Video /></div>
        <div className="md:col-span-7">
          <p className="cs-note m-0">and the parts it’s made of ↖</p>
          <p className="mt-2 mb-0 text-body-sm font-sans text-foundation-700">{caption}</p>
        </div>
      </div>
    </>
  )
}

/* 05 · D  Cut: the video goes, 06 carries the build on its own. */
function D05() {
  return (
    <>
      <div className="max-w-2xl">
        <Head06 />
      </div>
      <div className="mt-10"><Slider /></div>
    </>
  )
}

const SETS = {
  '04': {
    a: ['Wall | spread (live now)', () => <BuiltOnCarbon />],
    b: ['Green room | type page', B04],
    c: ['Ramp | scale', C04],
    d: ['Gallery | essay', D04],
  },
  '05': {
    a: ['Light stage', A05],
    b: ['Text beside clip', B05],
    c: ['Merged into 06', C05],
    d: ['Cut', D05],
  },
} as const

export default function LayoutsReview({ searchParams }: { searchParams: { s?: string; v?: string } }) {
  const s = (searchParams.s === '05' ? '05' : '04') as keyof typeof SETS
  const set = SETS[s]
  const v = (searchParams.v && searchParams.v in set ? searchParams.v : 'a') as keyof typeof set
  const View = set[v][1]
  return (
    <main className="min-h-screen bg-body pb-section">
      <nav className={`${pad} pt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-nav-tab font-sans`}>
        {(Object.keys(SETS) as (keyof typeof SETS)[]).map((k) => (
          <span key={k} className="flex flex-wrap gap-x-4 gap-y-2">
            <span className="font-semibold text-foundation-900">{k}:</span>
            {Object.entries(SETS[k]).map(([key, [name]]) => (
              <Link key={key} href={`/dev/layouts?s=${k}&v=${key}`} className={k === s && key === v ? 'text-foundation-900 underline underline-offset-4' : 'text-foundation-500'}>
                {key.toUpperCase()} · {name}
              </Link>
            ))}
            <span aria-hidden="true" className="text-foundation-400">|</span>
          </span>
        ))}
      </nav>
      <section className={`${pad} pt-section`}>
        <div className="max-w-6xl mx-auto"><View /></div>
      </section>
    </main>
  )
}
