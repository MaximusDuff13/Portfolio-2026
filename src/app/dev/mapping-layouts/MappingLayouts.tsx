'use client'
// TEMPORARY PREVIEW — five layouts for the Mapping & transformation feature of the Data
// Conversion App case study. Not linked from anywhere, noindex'd. Delete this route once one
// layout is chosen; /work/data-conversion-app is untouched by it.
//
// 'use client' is here for Layout E alone, which needs real tab state. Everything else on the
// page would happily be a server component; splitting it would buy nothing on a dev-only route.
//
// WHY THE "Shipped" TAG IS NOT accent-warm TEXT HERE. On the band's foundation-100 ground
// accent-warm (#c2600a) measures 3.87:1, and on the page cream 4.09:1 — both under AA's 4.5:1 at
// label size, which /dev/glance-layouts already recorded for the same colour. The brief asks for
// the tag in accent-warm AND for every text element to clear 4.5:1, and those cannot both hold.
// The tag therefore keeps accent-warm as its BORDER, where the 3:1 non-text threshold applies and
// 3.87:1 passes, and takes foundation-900 for the word itself (16.03:1). The accent still marks
// the shipped variant; no word on the page is below AA. Flagged in the report.
import { useRef, useState } from 'react'

const IMG_DIR = '/images/data-conversion-app/mapping-variants/'
const src = (file: string) => IMG_DIR + encodeURIComponent(file)

const EYEBROW = 'Mapping & transformation'
const TITLE = 'Three ways to show a lot in one table'

const PROBLEM_LEAD = 'The problem'
const PROBLEM =
  'The mapping and transformation table had to carry everything at once — the mapping, the transformation logic, AI confidence, descriptions, and review status.'
const SOLUTION_LEAD = 'The solution'
const SOLUTION =
  'A table built for scanning and comparing, with a side panel that opens with everything else, so nothing pulls users away from the table.'

const RECOMMENDATION =
  "We tested the review queue with users, and moving them away from the table, where they could compare fields side by side, didn't land well. The inline table's redirects to separate screens for each piece of information added friction instead of removing it. We shipped the detail panel: it kept the table for scanning and comparing, while the side panel gave access to everything else without leaving the page."

type VImage = { file: string; alt: string }
type V = { name: string; shipped: boolean; body: string; images: VImage[] }

const VARIANTS: V[] = [
  {
    name: 'Detail panel',
    shipped: true,
    body: "A table with only what's needed to select a field, plus a side panel that opens with the mapping, transformation, and other detail.",
    images: [
      {
        file: 'Mapping Variant 1 Screen 1.png',
        alt: 'Detail panel variant: a table of fields on the left with a mapping details panel open on the right, showing source mapping, transformation, and AI confidence.',
      },
    ],
  },
  {
    name: 'Inline table',
    shipped: false,
    body: 'A single wide table with every field, linking out to separate screens for descriptions and transformations.',
    images: [
      {
        file: 'Mapping Variant 2 Screen 1.png',
        alt: 'Inline table variant: a full-width table with editable source table and field dropdowns in each row, and links to view descriptions and set transformations.',
      },
    ],
  },
  {
    name: 'Review queue',
    shipped: false,
    body: 'Users selected fields into a queue, then moved to a dedicated review screen with everything in one place.',
    images: [
      {
        file: 'Mapping Variant 3 Screen 1.png',
        alt: 'Review queue variant: a full-width read-only table with a bar at the bottom showing a count of filtered mappings and a Start review button.',
      },
      {
        file: 'Mapping Variant 3 Screen 2.png',
        alt: 'The dedicated review screen: one field at a time, with source mapping, transformation settings, an AI confidence note, and space for additional notes.',
      },
    ],
  },
]

const LABEL = 'text-label font-grotesk uppercase tracking-widest'
const FRAME = 'overflow-hidden rounded-lg border border-border bg-body'

/* One image in its frame. `ratio` is the only thing that changes between layouts. */
function Shot({ image, ratio }: { image: VImage; ratio: string }) {
  return (
    <div className={`${FRAME} relative ${ratio}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src(image.file)}
        alt={image.alt}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  )
}

function Shots({ images, ratio, gap = 'gap-4' }: { images: VImage[]; ratio: string; gap?: string }) {
  return (
    <ul className={`m-0 flex list-none flex-col ${gap} p-0`}>
      {images.map((image) => (
        <li key={image.file} className="m-0 p-0">
          <Shot image={image} ratio={ratio} />
        </li>
      ))}
    </ul>
  )
}

/* The shipped marker. accent-warm edge, foundation-900 word — see the note at the top. */
function ShippedTag() {
  return (
    <span className={`${LABEL} rounded-full border border-accent-warm px-2 py-0.5 text-foundation-900`}>
      Shipped
    </span>
  )
}

function VariantName({ v, size = 'text-body' }: { v: V; size?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <h4 className={`m-0 font-grotesk ${size} font-medium text-foundation-900`}>{v.name}</h4>
      {v.shipped && <ShippedTag />}
    </div>
  )
}

function Body({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`m-0 font-sans text-body-sm text-foundation-600 ${className}`}>{children}</p>
}

/* Problem and Solution as two columns. */
function LeadGrid() {
  return (
    <div className="grid max-w-3xl grid-cols-1 gap-12 md:grid-cols-2">
      <p className="m-0 font-sans text-body text-foundation-600">
        <strong className="font-medium text-foundation-900">{PROBLEM_LEAD}. </strong>
        {PROBLEM}
      </p>
      <p className="m-0 font-sans text-body text-foundation-600">
        <strong className="font-medium text-foundation-900">{SOLUTION_LEAD}. </strong>
        {SOLUTION}
      </p>
    </div>
  )
}

/* Problem and Solution stacked, each a paragraph with an inline bold lead-in. */
function LeadStack({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <p className="m-0 font-sans text-body text-foundation-600">
        <strong className="font-medium text-foundation-900">{PROBLEM_LEAD}. </strong>
        {PROBLEM}
      </p>
      <p className="m-0 mt-6 font-sans text-body text-foundation-600">
        <strong className="font-medium text-foundation-900">{SOLUTION_LEAD}. </strong>
        {SOLUTION}
      </p>
    </div>
  )
}

function Callout() {
  return (
    <div className="mt-12 border-l-2 border-accent-warm bg-foundation-100 p-5">
      <p className="m-0 font-sans text-body text-foundation-600">{RECOMMENDATION}</p>
    </div>
  )
}

function FeatureHead() {
  return (
    <header className="mb-10">
      <p className={`${LABEL} text-foundation-600`}>{EYEBROW}</p>
      <h3 className="mt-3 font-grotesk text-heading-l text-foundation-900">{TITLE}</h3>
    </header>
  )
}

/* ── A — equal row ─────────────────────────────────────────────────────────────── */
function LayoutA() {
  return (
    <>
      <FeatureHead />
      <LeadGrid />
      <ol className="m-0 mt-10 grid list-none grid-cols-1 items-start gap-8 p-0 md:grid-cols-3">
        {VARIANTS.map((v) => (
          <li key={v.name} className="m-0 p-0">
            <VariantName v={v} />
            <Body className="mt-2">{v.body}</Body>
            <div className="mt-6">
              <Shots images={v.images} ratio="aspect-[4/3]" />
            </div>
          </li>
        ))}
      </ol>
      <Callout />
    </>
  )
}

/* ── B — hero plus thumbnails ──────────────────────────────────────────────────── */
function LayoutB() {
  const [hero, ...rest] = VARIANTS
  return (
    <>
      <FeatureHead />
      <LeadGrid />
      <div className="mt-10">
        <VariantName v={hero} />
        <Body className="mt-2 max-w-2xl">{hero.body}</Body>
        <div className="mt-6">
          <Shots images={hero.images} ratio="aspect-[16/9]" />
        </div>
      </div>
      <div className="mt-8">
        <p className="font-sans text-caption text-foundation-600">Also explored</p>
        <ol className="m-0 mt-4 grid list-none grid-cols-1 items-start gap-6 p-0 md:grid-cols-2">
          {rest.map((v) => (
            <li key={v.name} className="m-0 p-0">
              <VariantName v={v} />
              <Body className="mt-2">{v.body}</Body>
              <div className="mt-4">
                <Shots images={v.images} ratio="aspect-[4/3]" />
              </div>
            </li>
          ))}
        </ol>
      </div>
      <Callout />
    </>
  )
}

/* ── C — centered lead, scroll strip ───────────────────────────────────────────── */
function LayoutC() {
  /* The strip's cards. Review queue contributes one card per screen, each numbered so the two
     read as one variant split across two cards rather than as two variants. */
  const cards = VARIANTS.flatMap((v) =>
    v.images.map((image, i) => ({
      key: image.file,
      v,
      image,
      count: v.images.length > 1 ? `${i + 1}/${v.images.length}` : null,
    })),
  )
  return (
    <>
      <FeatureHead />
      <LeadStack className="mx-auto max-w-2xl text-center" />
      {/* overflow-x-auto scopes the scrolling to this container, so the page itself never
          gains a horizontal scrollbar from it. */}
      <ul className="m-0 mt-12 flex list-none gap-6 overflow-x-auto p-0 pb-2">
        {cards.map(({ key, v, image, count }) => (
          <li key={key} className="m-0 w-[320px] flex-shrink-0 p-0">
            <Shot image={image} ratio="aspect-[4/3]" />
            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h4 className="m-0 font-grotesk text-body font-medium text-foundation-900">
                  {v.name}
                </h4>
                {count && <span className="font-sans text-caption text-foundation-600">{count}</span>}
                {v.shipped && <ShippedTag />}
              </div>
              <Body className="mt-2">{v.body}</Body>
            </div>
          </li>
        ))}
      </ul>
      <Callout />
    </>
  )
}

/* ── D — stacked sequence ──────────────────────────────────────────────────────── */
function LayoutD() {
  return (
    <>
      <FeatureHead />
      <LeadStack className="max-w-2xl" />
      <ol className="m-0 mt-12 flex list-none flex-col gap-16 p-0">
        {VARIANTS.map((v) => (
          <li key={v.name} className="m-0 p-0">
            <VariantName v={v} size="text-heading-m" />
            <Body className="mt-3 max-w-2xl">{v.body}</Body>
            <div className="mt-6">
              <Shots images={v.images} ratio="aspect-[16/9]" />
            </div>
          </li>
        ))}
      </ol>
      <Callout />
    </>
  )
}

/* ── E — tabbed single view ────────────────────────────────────────────────────── */
function LayoutE() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  /* Roving tabindex, the WAI-ARIA tabs pattern: one stop for the whole group, arrows move
     between tabs and move focus with the selection. Home/End jump to the ends. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = VARIANTS.length - 1
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

  const v = VARIANTS[active]
  return (
    <>
      <FeatureHead />
      <LeadGrid />

      <div
        role="tablist"
        aria-label="Mapping and transformation variants"
        onKeyDown={onKeyDown}
        className="mt-10 flex flex-wrap gap-2"
      >
        {VARIANTS.map((t, i) => {
          const selected = i === active
          return (
            <button
              key={t.name}
              ref={(el) => {
                refs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`mapping-tab-${i}`}
              aria-selected={selected}
              aria-controls={`mapping-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`rounded-full border px-4 py-2 font-grotesk text-nav-tab transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foundation-900 focus-visible:ring-offset-2 focus-visible:ring-offset-foundation-100 ${
                selected
                  ? 'border-foundation-900 bg-foundation-900 text-body'
                  : 'border-btn-border text-foundation-600 hover:border-foundation-400 hover:text-foundation-900'
              }`}
            >
              {t.name}
              {t.shipped && <span> &middot; Shipped</span>}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`mapping-panel-${active}`}
        aria-labelledby={`mapping-tab-${active}`}
        tabIndex={0}
        className="mt-6 focus:outline-none"
      >
        {/* One 16/9 area. A variant with two screens splits it side by side, so both are
            visible without a second click; below md they stack rather than shrink to nothing. */}
        <div
          className="grid grid-cols-1 gap-4 md:[grid-template-columns:var(--cols)]"
          style={{ ['--cols' as string]: `repeat(${v.images.length}, minmax(0, 1fr))` }}
        >
          {v.images.map((image) => (
            <Shot key={image.file} image={image} ratio="aspect-[16/9]" />
          ))}
        </div>
        <Body className="mt-4 max-w-2xl">{v.body}</Body>
      </div>

      <Callout />
    </>
  )
}

const LAYOUTS = [
  { id: 'Layout A', node: <LayoutA /> },
  { id: 'Layout B', node: <LayoutB /> },
  { id: 'Layout C', node: <LayoutC /> },
  { id: 'Layout D', node: <LayoutD /> },
  { id: 'Layout E', node: <LayoutE /> },
]

export function MappingLayouts() {
  return (
    <>
      {LAYOUTS.map(({ id, node }) => (
        /* Full-bleed band. w-screen with a 50% margin pull escapes any max-width ancestor and
           spans the viewport exactly; overflow-x-clip on <main> keeps the scrollbar's width
           from turning that into a horizontal scroll. */
        <section
          key={id}
          className="w-screen border-b border-t border-border bg-foundation-100"
          style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
        >
          <div className="mx-auto max-w-6xl px-6 py-section sm:px-10 lg:px-section">
            {/* Preview chrome. Dev-only: this caption never ships to the case study page. */}
            <p className={`${LABEL} mb-10 text-foundation-600`}>{id}</p>
            {node}
          </div>
        </section>
      ))}
    </>
  )
}
