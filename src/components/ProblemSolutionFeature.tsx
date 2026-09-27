// ProblemSolutionFeature — one problem-and-solution write-up, start to finish, in its own
// full-bleed band: eyebrow + title, the Problem/Solution card, the concept row, the Decision and
// the shipped screenshot.
//
// NEW COMPONENT. The page lists its features in order and renders one of these per entry,
// passing the entry's position as `index`. Everything that alternates is derived from that index
// by featureSurface() below, so a new feature only needs a new entry; nothing is set per feature.
//
// BAND. Full-bleed the way every section on this page is: the <section> spans the viewport and
// carries the background, the gutters (px-6 / sm:px-10 / lg:px-section) sit on it, and the content
// stays in the page's max-w-6xl wrap. Only the background alternates; the wrap width does not.
// py-section gives the band the page's 80px rhythm top and bottom.
//
// CONTRAST. Every colour on the band and inside the Problem/Solution card comes from
// featureSurface(), per ground; the ratios are listed there.
import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { FeatureHeader } from './FeatureHeader'
import { ConceptRow, type Concept } from './ConceptRow'
import { LightboxProvider, LightboxTrigger } from './Lightbox'
import { ShippedConnectors } from './ShippedConnectors'

export type LeadColumn = { icon: LucideIcon; label: string; lead: string; body: string }

export type ProblemSolution = {
  eyebrow: string
  title: string
  lead: LeadColumn[]
  concepts: Concept[]
  /* Titles of the concepts the shipped design borrowed from; each gets a connector line down to
     the shipped screenshot. Must match concept titles exactly. */
  shippedFrom?: string[]
  decision: string
  shipped: { src: string; width: number; height: number; alt: string }
}

/* The alternation rule. The first feature (index 0) gets a dark band, the next the page ground,
   and so on.

   DARK BAND (foundation-800). Text on the band takes the hero's dark-zone classes: headings
   text-body (14.68:1), running text foundation-300 (10.18:1), small labels foundation-400
   (6.01:1). The hero's accent-warm eyebrow is not reused: it measures 3.59:1 on foundation-800,
   under AA for 11px text, so the eyebrow takes the hero's caption tone instead.
   The card is foundation-900, one step darker than the band, set apart by that fill alone, with
   no outline. Inside it: paragraphs foundation-100 (16.03:1), labels text-body (16.92:1), icons
   foundation-400 (6.93:1).

   LIGHT BAND (body). Exactly the styling before the dark band existed: foundation-100 card with
   its border-border outline, foundation-500 eyebrow (4.61:1), foundation-900 titles,
   foundation-600 running text.

   `text` is the band's running text: the concept descriptions and the decision paragraph.

   `connector` colours the leader lines to the shipped screenshot: foundation-400 on the dark
   band (6.01:1), foundation-500 on the page ground (4.61:1), where foundation-400 would fall under
   the 3:1 a meaningful graphic needs. `connectorGround` fills the inside of their origin rings with
   the band colour, so each ring reads as an outline. */
export function featureSurface(index: number) {
  const dark = index % 2 === 0
  return {
    band: dark ? 'bg-foundation-800' : 'bg-body',
    card: dark ? 'bg-foundation-900' : 'border border-border bg-foundation-100',
    cardText: dark ? 'text-foundation-100' : 'text-foundation-600',
    cardLabel: dark ? 'text-body' : 'text-foundation-900',
    cardIcon: dark ? 'text-foundation-400' : 'text-foundation-600',
    eyebrow: dark ? 'text-foundation-400' : 'text-foundation-500',
    title: dark ? 'text-body' : 'text-foundation-900',
    conceptTitle: dark ? 'text-body' : 'text-foundation-900',
    text: dark ? 'text-foundation-300' : 'text-foundation-600',
    connector: dark ? 'text-foundation-400' : 'text-foundation-500',
    connectorGround: dark ? 'fill-foundation-800' : 'fill-body',
  }
}

export function ProblemSolutionFeature({ index, feature }: { index: number; feature: ProblemSolution }) {
  const surface = featureSurface(index)
  const { eyebrow, title, lead, concepts, shippedFrom = [], decision, shipped } = feature
  return (
    <section className={`${surface.band} px-6 sm:px-10 lg:px-section py-section`}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <FeatureHeader
            eyebrow={eyebrow}
            title={title}
            eyebrowClassName={surface.eyebrow}
            titleClassName={surface.title}
          />

          {/* The Problem/Solution card: FigureCard's shape (rounded-lg, p-8 / md:p-12). Its fill,
              and whether it has an outline, come from featureSurface(). */}
          <div
            className={`mt-10 grid grid-cols-1 gap-12 rounded-lg ${surface.card} p-8 md:grid-cols-2 md:p-12`}
          >
            {lead.map(({ icon: Icon, label, lead: first, body }) => (
              <div key={label}>
                <div className="mb-3 flex items-center gap-2">
                  <Icon
                    aria-hidden="true"
                    size={20}
                    strokeWidth={1.5}
                    className={`shrink-0 ${surface.cardIcon}`}
                  />
                  <p className={`m-0 font-grotesk text-body font-medium ${surface.cardLabel}`}>
                    {label}
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <p className={`m-0 font-sans text-body ${surface.cardText}`}>{first}</p>
                  <p className={`m-0 font-sans text-body ${surface.cardText}`}>{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Concepts → the shipped screen → the decision. The sketches make the argument, the real
              product comes once at the full content width, and the decision closes it as plain
              text under the screen it describes.

              WIDE ROW. From lg up the concept row breaks out of the 1152px wrap to
              min(1800px, viewport − 160px), centred on the wrap, so each wireframe column is wider
              than the wrap's three-way split allows. The 160px is the lg gutters (80px a side), so
              the row lines up with where the gutters would be and never reaches the viewport
              edge — no horizontal scroll, even with a classic scrollbar.

              CONNECTORS. The concept row and the screenshot share a `relative` wrapper, which is
              the coordinate space ShippedConnectors draws in. mt-section between them (80px, was
              48px with the Decision box between) gives the lines room to curve.

              ENLARGE. All four images open full-size in one shared lightbox. */}
          <LightboxProvider>
            <div className="relative mt-section">
              <div className="lg:ml-[calc(50%-min(900px,50vw-80px))] lg:w-[min(1800px,calc(100vw-160px))]">
                <ConceptRow
                  concepts={concepts}
                  titleClassName={surface.conceptTitle}
                  bodyClassName={surface.text}
                />
              </div>
              <figure
                data-shipped=""
                className="relative m-0 mt-section overflow-hidden rounded-lg border border-border"
              >
                <Image
                  src={shipped.src}
                  alt={shipped.alt}
                  width={shipped.width}
                  height={shipped.height}
                  sizes="(min-width: 1152px) 1120px, 100vw"
                  className="block h-auto w-full"
                />
                <LightboxTrigger src={shipped.src} alt={shipped.alt} />
              </figure>
              {shippedFrom.length > 0 && (
                <ShippedConnectors
                  from={shippedFrom}
                  lineClassName={surface.connector}
                  groundClassName={surface.connectorGround}
                />
              )}
            </div>
          </LightboxProvider>

          {/* The decision, as plain running text under the screenshot: no box, no border. Its
              measure is the hero intro's (max-w-xl), the page's other body text on a dark ground. */}
          <p className={`m-0 mt-10 max-w-xl font-sans text-body ${surface.text}`}>{decision}</p>
        </AnimatedSection>
      </div>
    </section>
  )
}
