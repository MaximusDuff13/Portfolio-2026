'use client'
// TEMPORARY PREVIEW — four full-bleed layouts for the Mapping & transformation feature of the
// Data Conversion App case study. Not linked from anywhere, noindex'd. Delete this folder once a
// layout is chosen; /work/data-conversion-app does not import it.
//
// WHY FULL-BLEED. The screenshots are 3936×3117 and 2624×1668/2428 and dense with small UI text.
// Squeezed into a column they drop to 8–25% of their natural width and the tables stop being
// readable. Here every screenshot spans the whole band.
//
// HOW THE BLEED WORKS. No 100vw and no negative margins. The root layout's content wrapper and
// <main> both span the full client width, so each band is simply NOT wrapped: text goes inside
// WRAP (max-w-6xl, the page gutters), images sit outside it. The image is then exactly the
// document's client width. 100vw would include the vertical scrollbar, so on a desktop with a
// classic scrollbar it would overhang by ~15px and slice that much off the right-hand columns of
// each table — the very thing this exploration exists to avoid.
//
// NO CROPPING. Images are plain <img> at w-full h-auto with their natural width/height
// attributes, so the box takes the file's own aspect ratio and object-contain has nothing to
// trim. next/image is not used: its srcset would swap in a resized file, and the scale
// percentages the review asks for are measured against the original's naturalWidth.
//
// GROUND. Images sit straight on the page's body ground with a hairline above and below — no
// foundation-100 band, whose grey would clash with the screenshots' own white chrome.
//
// ACCENT. accent-warm appears on two things only: the "Shipped" tag's border and the callout's
// left border. The tag's WORD is foundation-900, because accent-warm text measures 4.09:1 on the
// body ground, under AA's 4.5:1 at label size. Same resolution /dev/mapping-layouts made.
//
// CONTRAST, against the ground each element sits on:
//   · foundation-900 on body — variant names, title, bold leads, tag word: 16.9:1
//   · foundation-600 on body — body copy, controls: 7.38:1
//   · foundation-500 on body — eyebrow, dev caption, disabled arrow: 4.64:1
//   · foundation-600 on foundation-100 — the callout: 6.99:1
//   · body on foundation-900 — a selected control: 16.9:1
import { useCallback, useEffect, useRef, useState } from 'react'
import { FeatureHeader } from '@/components/FeatureHeader'

/* ── Shared content (verbatim from the brief) ───────────────────────────────────── */

const EYEBROW = 'Mapping & transformation'
const TITLE = 'Three ways to show a lot in one table'
const PROBLEM =
  'The mapping and transformation table had to carry everything at once — the mapping, the transformation logic, AI confidence, descriptions, and review status.'
const SOLUTION =
  'A table built for scanning and comparing, with a side panel that opens with everything else, so nothing pulls users away from the table.'
const RECOMMENDATION =
  "We tested the review queue with users, and moving them away from the table, where they could compare fields side by side, didn't land well. The inline table's redirects to separate screens for each piece of information added friction instead of removing it. We shipped the detail panel: it kept the table for scanning and comparing, while the side panel gave access to everything else without leaving the page."

type Shot = { file: string; w: number; h: number; alt: string; label: string }
type Variant = { name: string; shipped: boolean; body: string; shots: Shot[] }

const IMG_DIR = '/images/data-conversion-app/mapping-variants/'

// Alt text is carried over unchanged from /dev/mapping-layouts. `label` is only used where a
// variant has two screens and each one needs a name.
const DETAIL: Variant = {
  name: 'Detail panel',
  shipped: true,
  body: "A table with only what's needed to select a field, plus a side panel that opens with the mapping, transformation, and other detail.",
  shots: [
    {
      file: 'Mapping Variant 1 Screen 1.png',
      w: 3936,
      h: 3117,
      label: 'Detail panel',
      alt: 'Detail panel variant: a table of fields on the left with a mapping details panel open on the right, showing source mapping, transformation, and AI confidence.',
    },
  ],
}
const INLINE: Variant = {
  name: 'Inline table',
  shipped: false,
  body: 'A single wide table with every field, linking out to separate screens for descriptions and transformations.',
  shots: [
    {
      file: 'Mapping Variant 2 Screen 1.png',
      w: 2624,
      h: 1668,
      label: 'Inline table',
      alt: 'Inline table variant: a full-width table with editable source table and field dropdowns in each row, and links to view descriptions and set transformations.',
    },
  ],
}
const QUEUE: Variant = {
  name: 'Review queue',
  shipped: false,
  body: 'Users selected fields into a queue, then moved to a dedicated review screen with everything in one place.',
  shots: [
    {
      file: 'Mapping Variant 3 Screen 1.png',
      w: 2624,
      h: 1668,
      label: 'Table view',
      alt: 'Review queue variant: a full-width read-only table with a bar at the bottom showing a count of filtered mappings and a Start review button.',
    },
    {
      file: 'Mapping Variant 3 Screen 2.png',
      w: 2624,
      h: 2428,
      label: 'Dedicated review screen',
      alt: 'The dedicated review screen: one field at a time, with source mapping, transformation settings, an AI confidence note, and space for additional notes.',
    },
  ],
}
const VARIANTS = [DETAIL, INLINE, QUEUE]

/* ── Shared pieces ───────────────────────────────────────────────────────────────── */

// w-full: several wraps are flex-column items, where mx-auto alone would shrink them to fit.
const WRAP = 'mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-section'
const LABEL = 'text-label font-grotesk uppercase tracking-widest'
const FOCUS =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-foundation-900 focus-visible:ring-offset-2 focus-visible:ring-offset-body'

/* The whole point of the page: one screenshot, the full client width, never cropped. */
function Bleed({ shot, className = '' }: { shot: Shot; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={IMG_DIR + encodeURIComponent(shot.file)}
      alt={shot.alt}
      width={shot.w}
      height={shot.h}
      data-bleed=""
      className={`block h-auto w-full border-y border-border object-contain ${className}`}
    />
  )
}

function ShippedTag() {
  return (
    <span
      className={`${LABEL} rounded-full border border-accent-warm px-2 py-0.5 text-foundation-900`}
    >
      Shipped
    </span>
  )
}

function VariantText({ v, children }: { v: Variant; children?: React.ReactNode }) {
  return (
    <div className={WRAP}>
      <div className="max-w-2xl" data-reading="">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h4 className="m-0 font-grotesk text-heading-m text-foundation-900">{v.name}</h4>
          {v.shipped && <ShippedTag />}
        </div>
        <p className="m-0 mt-3 font-sans text-body text-foundation-600">{v.body}</p>
        {children}
      </div>
    </div>
  )
}

function Intro() {
  return (
    <div className={WRAP}>
      <FeatureHeader eyebrow={EYEBROW} title={TITLE} />
      <div className="mt-8 grid max-w-3xl grid-cols-1 gap-6" data-reading="">
        <p className="m-0 font-sans text-body text-foundation-600">
          <strong className="font-medium text-foundation-900">The problem. </strong>
          {PROBLEM}
        </p>
        <p className="m-0 font-sans text-body text-foundation-600">
          <strong className="font-medium text-foundation-900">The solution. </strong>
          {SOLUTION}
        </p>
      </div>
    </div>
  )
}

function Callout() {
  return (
    <div className={WRAP}>
      <div className="max-w-3xl border-l-2 border-accent-warm bg-foundation-100 p-5" data-reading="">
        <p className="m-0 font-sans text-body text-foundation-600">{RECOMMENDATION}</p>
      </div>
    </div>
  )
}

/* A small "n of 2" marker, used wherever Review queue's two screens need telling apart. */
function ScreenCount({ n, of, label }: { n: number; of: number; label: string }) {
  return (
    <p className="m-0 flex flex-wrap items-baseline gap-x-2 font-sans text-body-sm text-foundation-600">
      <span className={`${LABEL} text-foundation-500`}>
        Screen {n} of {of}
      </span>
      <span className="text-foundation-900">{label}</span>
    </p>
  )
}

/* WAI-ARIA tabs keyboard pattern: arrows move and select, Home/End jump to the ends. */
function useRovingTabs(count: number, active: number, setActive: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = count - 1
    let next: number | null = null
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActive(next)
    refs.current[next]?.focus()
  }
  return { refs, onKeyDown }
}

function pill(selected: boolean) {
  return `rounded-full border px-4 py-2 font-grotesk text-nav-tab transition-colors ${FOCUS} ${
    selected
      ? 'border-foundation-900 bg-foundation-900 text-body'
      : 'border-btn-border text-foundation-600 hover:border-foundation-400 hover:text-foundation-900'
  }`
}

/* ── Layout 1 — sequential bands; Review queue switches in place ─────────────────
   Every variant in order, each with its own full-bleed screenshot, so all three can be compared
   by scrolling. Review queue gets a two-option control directly above its one image slot: the
   reader sees "Screen 1 of 2" and a second option, so two screens are obvious, but only one
   ever occupies the band. */
function QueueToggle() {
  const [active, setActive] = useState(0)
  const { refs, onKeyDown } = useRovingTabs(QUEUE.shots.length, active, setActive)
  const shot = QUEUE.shots[active]
  return (
    <>
      <VariantText v={QUEUE}>
        <div
          role="tablist"
          aria-label="Review queue screens"
          onKeyDown={onKeyDown}
          className="mt-6 flex flex-wrap gap-2"
        >
          {QUEUE.shots.map((s, i) => (
            <button
              key={s.file}
              ref={(el) => {
                refs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`l1-queue-tab-${i}`}
              aria-selected={i === active}
              aria-controls="l1-queue-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={pill(i === active)}
            >
              {i + 1}. {s.label}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <ScreenCount n={active + 1} of={QUEUE.shots.length} label={shot.label} />
        </div>
      </VariantText>
      <div
        role="tabpanel"
        id="l1-queue-panel"
        aria-labelledby={`l1-queue-tab-${active}`}
        className="mt-6"
      >
        <Bleed shot={shot} />
      </div>
    </>
  )
}

function Layout1() {
  return (
    <div className="flex flex-col gap-16">
      <Intro />
      {[DETAIL, INLINE].map((v) => (
        <div key={v.name}>
          <VariantText v={v} />
          <div className="mt-6">
            <Bleed shot={v.shots[0]} />
          </div>
        </div>
      ))}
      <div>
        <QueueToggle />
      </div>
      <Callout />
    </div>
  )
}

/* ── Layout 2 — sequential bands; Review queue's second screen stands on its own ─────
   The comparison run shows each variant's FIRST screen only, so all three bands are like for
   like: three tables. Review queue's band says "Screen 1 of 2" and links down to its second
   screen, which comes after the recommendation as a separately captioned figure — the screen
   the recommendation talks about ("moving them away from the table"), placed where it lands as
   evidence rather than as a fourth table in a row of three. */
function Layout2() {
  const [first, second] = QUEUE.shots
  return (
    <div className="flex flex-col gap-16">
      <Intro />
      {[DETAIL, INLINE].map((v) => (
        <div key={v.name}>
          <VariantText v={v} />
          <div className="mt-6">
            <Bleed shot={v.shots[0]} />
          </div>
        </div>
      ))}
      <div>
        <VariantText v={QUEUE}>
          <div className="mt-4 flex flex-col gap-2">
            <ScreenCount n={1} of={2} label={first.label} />
            <a
              href="#l2-queue-screen-2"
              className={`w-fit font-sans text-body-sm text-foundation-900 underline underline-offset-4 ${FOCUS}`}
            >
              Screen 2 of 2: {second.label} ↓
            </a>
          </div>
        </VariantText>
        <div className="mt-6">
          <Bleed shot={first} />
        </div>
      </div>
      <Callout />
      <figure id="l2-queue-screen-2" className="m-0 scroll-mt-24">
        <figcaption className={WRAP}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-grotesk text-heading-m text-foundation-900">{QUEUE.name}</span>
          </div>
          <div className="mt-3">
            <ScreenCount n={2} of={2} label={second.label} />
          </div>
        </figcaption>
        <div className="mt-6">
          <Bleed shot={second} />
        </div>
      </figure>
    </div>
  )
}

/* ── Layout 3 — one variant at a time; Review queue discloses its second screen ─────
   A variant switcher over a single full-bleed stage, so the reader looks at one table at a
   time at full size and flips between them. Inside Review queue the first screen shows, and a
   native <details> below it ("Screen 2 of 2") expands the second in place — progressive
   disclosure: collapsed by default so the stage stays one image, but both CAN be open together,
   which the toggle in Layout 1 never allows. */
function Layout3() {
  const [active, setActive] = useState(0)
  const { refs, onKeyDown } = useRovingTabs(VARIANTS.length, active, setActive)
  const v = VARIANTS[active]
  return (
    <div className="flex flex-col gap-10">
      <Intro />
      <div className={WRAP}>
        <div
          role="tablist"
          aria-label="Mapping and transformation variants"
          onKeyDown={onKeyDown}
          className="flex flex-wrap gap-2"
        >
          {VARIANTS.map((t, i) => (
            <button
              key={t.name}
              ref={(el) => {
                refs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`l3-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`l3-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={pill(i === active)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
      <div role="tabpanel" id={`l3-panel-${active}`} aria-labelledby={`l3-tab-${active}`}>
        <VariantText v={v}>
          {v.shots.length > 1 && (
            <div className="mt-4">
              <ScreenCount n={1} of={v.shots.length} label={v.shots[0].label} />
            </div>
          )}
        </VariantText>
        <div className="mt-6">
          <Bleed shot={v.shots[0]} />
        </div>
        {v.shots.length > 1 && (
          <details key={v.name} className="group mt-6">
            <summary
              className={`${WRAP} flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden`}
            >
              <span
                className={`inline-flex items-center gap-2 rounded-full border border-btn-border px-4 py-2 font-grotesk text-nav-tab text-foundation-900 group-open:border-foundation-900 ${FOCUS}`}
              >
                <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90">
                  ›
                </span>
                Screen 2 of 2: {v.shots[1].label}
              </span>
            </summary>
            <div className="mt-6">
              <Bleed shot={v.shots[1]} />
            </div>
          </details>
        )}
      </div>
      <Callout />
    </div>
  )
}

/* ── Layout 4 — a full-bleed filmstrip; Review queue is a two-step run ──────────────
   All four screens sit side by side in one horizontally scrolling strip, each slide the full
   client width and snapping into place. Only one is on screen at a time, but they are in one
   continuous row, so the reader compares by swiping or with the arrows. Review queue's two
   screens are consecutive slides labelled "Step 1 of 2" and "Step 2 of 2", and the progress bar
   above groups their two segments under one bracket, so the pair reads as one variant with two
   screens, not as a fourth variant. The variant text above the strip follows the slide. */
const SLIDES = VARIANTS.flatMap((v) =>
  v.shots.map((shot, i) => ({ v, shot, step: v.shots.length > 1 ? i + 1 : 0 })),
)

function Layout4() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = useCallback(() => {
    const el = track.current
    if (!el) return
    setActive(Math.round(el.scrollLeft / el.clientWidth))
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [onScroll])

  /* The strip's height follows the slide on screen. A flex row is as tall as its tallest item,
     so without this every short slide would sit above a band of empty ground. */
  useEffect(() => {
    const el = track.current
    if (!el) return
    const fit = () => {
      const slide = el.children[active] as HTMLElement | undefined
      if (slide) el.style.height = slide.offsetHeight + 'px'
    }
    fit()
    const ro = new ResizeObserver(fit)
    ;[...el.children].forEach((c) => ro.observe(c))
    return () => ro.disconnect()
  }, [active])

  const go = (i: number) => {
    const el = track.current
    if (!el) return
    const next = Math.max(0, Math.min(SLIDES.length - 1, i))
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }

  const { v, shot, step } = SLIDES[active]
  const arrow = `grid h-10 w-10 place-items-center rounded-full border border-btn-border font-grotesk text-foundation-900 transition-colors hover:border-foundation-900 disabled:cursor-not-allowed disabled:border-border disabled:text-foundation-500 disabled:hover:border-border ${FOCUS}`

  return (
    <div className="flex flex-col gap-10">
      <Intro />
      <div>
        <div className={WRAP}>
          {/* Progress: one segment per slide, grouped per variant. Review queue's group holds
              two segments under one name, which is what makes "two screens" visible at a glance. */}
          <div className="flex flex-wrap items-end gap-4">
            {VARIANTS.map((variant) => {
              const first = SLIDES.findIndex((s) => s.v === variant)
              return (
                <div key={variant.name} className="flex flex-col gap-2">
                  <span className="font-sans text-caption text-foundation-600">{variant.name}</span>
                  <div className="flex gap-1">
                    {variant.shots.map((s, i) => {
                      const idx = first + i
                      return (
                        <button
                          key={s.file}
                          type="button"
                          aria-label={
                            variant.shots.length > 1
                              ? `${variant.name}, step ${i + 1} of ${variant.shots.length}`
                              : variant.name
                          }
                          aria-current={idx === active ? 'true' : undefined}
                          onClick={() => go(idx)}
                          className={`h-1.5 w-14 rounded-full ${FOCUS} ${
                            idx === active ? 'bg-foundation-900' : 'bg-foundation-300'
                          }`}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                aria-label="Previous screen"
                className={arrow}
                disabled={active === 0}
                onClick={() => go(active - 1)}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next screen"
                className={arrow}
                disabled={active === SLIDES.length - 1}
                onClick={() => go(active + 1)}
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8" aria-live="polite">
          <VariantText v={v}>
            {step > 0 && (
              <p className="m-0 mt-4 flex flex-wrap items-baseline gap-x-2 font-sans text-body-sm text-foundation-600">
                <span className={`${LABEL} text-foundation-500`}>
                  Step {step} of {v.shots.length}
                </span>
                <span className="text-foundation-900">{shot.label}</span>
              </p>
            )}
          </VariantText>
        </div>

        {/* The strip scrolls inside itself; the page never gains a horizontal scrollbar from it.
            items-start keeps each slide at its own height rather than stretching to the tallest. */}
        <div
          ref={track}
          tabIndex={0}
          aria-label="Mapping and transformation screens"
          role="region"
          className={`mt-6 flex snap-x snap-mandatory items-start overflow-x-auto overflow-y-hidden overscroll-x-contain transition-[height] duration-300 motion-reduce:transition-none ${FOCUS}`}
        >
          {SLIDES.map(({ shot: s }) => (
            <div key={s.file} className="w-full flex-shrink-0 snap-start">
              <Bleed shot={s} />
            </div>
          ))}
        </div>
      </div>
      <Callout />
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────────────── */

const LAYOUTS = [
  { id: 'Layout 1', node: <Layout1 /> },
  { id: 'Layout 2', node: <Layout2 /> },
  { id: 'Layout 3', node: <Layout3 /> },
  { id: 'Layout 4', node: <Layout4 /> },
]

export function LayoutPreview() {
  return (
    <>
      {LAYOUTS.map(({ id, node }, i) => (
        <section
          key={id}
          id={`layout-${i + 1}`}
          className={`pb-section ${i > 0 ? 'border-t border-foundation-300 pt-section' : ''}`}
        >
          {/* Preview chrome. Dev-only: this caption never ships to the case study page. */}
          <div className={WRAP}>
            <p className={`${LABEL} mb-10 text-foundation-500`}>{id}</p>
          </div>
          {node}
        </section>
      ))}
    </>
  )
}
