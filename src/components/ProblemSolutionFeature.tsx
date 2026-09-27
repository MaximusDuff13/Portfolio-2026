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
// CONTRAST. Every text colour on the band comes from featureSurface(), per ground; the ratios are
// listed there. Inside the card nothing changes, since the card is always a light ground.
import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { FeatureHeader } from './FeatureHeader'
import { ConceptRow, type Concept } from './ConceptRow'
import { Decision } from './Decision'
import { LightboxProvider, LightboxTrigger } from './Lightbox'

export type LeadColumn = { icon: LucideIcon; label: string; lead: string; body: string }

export type ProblemSolution = {
  eyebrow: string
  title: string
  lead: LeadColumn[]
  concepts: Concept[]
  decision: string
  shipped: { src: string; width: number; height: number; alt: string }
}

/* The alternation rule. The first feature (index 0) gets a dark band, the next the page ground,
   and so on.

   DARK BAND (foundation-800). Text on the band takes the hero's dark-zone classes: headings
   text-body (14.68:1), running text foundation-300 (10.18:1), small labels foundation-400
   (6.01:1). The hero's accent-warm eyebrow is not reused: it measures 3.59:1 on foundation-800,
   under AA for 11px text, so the eyebrow takes the hero's caption tone instead. The card becomes
   a light card on the dark ground (bg-body), and everything inside it keeps its light styling.

   LIGHT BAND (body). Exactly the styling before the dark band existed: foundation-100 card,
   foundation-500 eyebrow (4.61:1), foundation-900 titles, foundation-600 running text. */
export function featureSurface(index: number) {
  const dark = index % 2 === 0
  return {
    band: dark ? 'bg-foundation-800' : 'bg-body',
    card: dark ? 'bg-body' : 'bg-foundation-100',
    eyebrow: dark ? 'text-foundation-400' : 'text-foundation-500',
    title: dark ? 'text-body' : 'text-foundation-900',
    conceptTitle: dark ? 'text-body' : 'text-foundation-900',
    conceptBody: dark ? 'text-foundation-300' : 'text-foundation-600',
  }
}

export function ProblemSolutionFeature({ index, feature }: { index: number; feature: ProblemSolution }) {
  const surface = featureSurface(index)
  const { eyebrow, title, lead, concepts, decision, shipped } = feature
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

          {/* The Problem/Solution card: FigureCard's shape (rounded-lg, border-border,
              p-8 / md:p-12) on whichever ground the band is not. */}
          <div
            className={`mt-10 grid grid-cols-1 gap-12 rounded-lg border border-border ${surface.card} p-8 md:grid-cols-2 md:p-12`}
          >
            {lead.map(({ icon: Icon, label, lead: first, body }) => (
              <div key={label}>
                <div className="mb-3 flex items-center gap-2">
                  <Icon
                    aria-hidden="true"
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-foundation-600"
                  />
                  <p className="m-0 font-grotesk text-body font-medium text-foundation-900">
                    {label}
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <p className="m-0 font-sans text-body text-foundation-600">{first}</p>
                  <p className="m-0 font-sans text-body text-foundation-600">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Concepts → decision → the shipped screen. The sketches make the argument; the real
              product comes once, last, at the full content width, as the payoff.

              WIDE ROW. From lg up the concept row breaks out of the 1152px wrap to
              min(1800px, viewport − 160px), centred on the wrap, so each wireframe column is wider
              than the wrap's three-way split allows. The 160px is the lg gutters (80px a side), so
              the row lines up with where the gutters would be and never reaches the viewport
              edge — no horizontal scroll, even with a classic scrollbar.

              ENLARGE. All four images open full-size in one shared lightbox. */}
          <LightboxProvider>
            <div className="mt-section lg:ml-[calc(50%-min(900px,50vw-80px))] lg:w-[min(1800px,calc(100vw-160px))]">
              <ConceptRow
                concepts={concepts}
                titleClassName={surface.conceptTitle}
                bodyClassName={surface.conceptBody}
              />
            </div>
            <div className="mt-12">
              <Decision statement={decision} />
            </div>
            <figure className="relative m-0 mt-12 overflow-hidden rounded-lg border border-border">
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
          </LightboxProvider>
        </AnimatedSection>
      </div>
    </section>
  )
}
