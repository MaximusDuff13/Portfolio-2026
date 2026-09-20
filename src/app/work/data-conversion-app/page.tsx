import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionHeader } from '@/components/SectionHeader'
import { RailBlock, RailPill } from '@/components/Rail'
import { CrosswalkMatrix } from './CrosswalkMatrix'
import { ProblemSection } from './ProblemSection'
import { Impact } from './Impact'

export const metadata: Metadata = {
  title: 'Data Conversion App — Michael Jerome',
  description:
    'How an AI-assisted MVP let Acentra Health map, preview, and safely convert legacy case data ahead of a system cutover.',
}

const description =
  "DDI — Design, Develop, Implement — is how Acentra Health moves a state program's data from a legacy system onto our product. This MVP reimagines the mapping and transformation step with AI, cutting it from 4 to 6 weeks to 1 week."

// Hero eyebrow. The headline follows it directly — the old lead-in line restated
// the role, which the sidebar's My Role block already covers.
const heroEyebrow = 'Data conversion · AI-assisted MVP · August 2026'

// Hero sidebar. Same label / value / supporting note shape as the rest of the case
// study heroes. My Role is now the page's only statement of the role, so it absorbs
// the scope phrasing that used to sit in a separate What I Owned block.
const heroMeta = [
  {
    label: 'My Role',
    value: 'Product Design',
    note: 'Requirements, ideation and mockups, from legacy mapping through safe cutover',
  },
  {
    label: 'Collaboration',
    value: 'AI Center of Excellence and Program Implementation teams',
    note: 'Partnered through build and rollout ahead of the state program cutover',
  },
]

// Process timeline — one rail. Sequence is carried by a drawn line rather than by step numbers:
// the pre-UX build is the earlier, quieter segment at the left of the same track, and my four
// stages run along the rest of it. Numbering everything 01–09 used to give the first build the
// same weight as the design work, which is exactly the impression the section should not leave.
//
// Every block on the rail — the before and the four stages — is the same RailBlock component with
// a `muted` flag, so the two sides cannot drift apart: there is no separate "before" markup to
// keep in sync. The before is secondary through colour and label weight alone, never through a
// different height or a different shape.
//
// Each block is two tiers: what was done (quiet) and the takeaway (highlighted). The takeaway is
// the part a skimmer should be able to read on its own.
const railBefore = {
  title: 'AI engineering team, no UX involvement',
  did: 'Mapping and transformation logic built. Screens generated with AI.',
  takeaway: "UI designed from a technical standpoint, not the user's.",
}

const railStages = [
  {
    title: 'Stakeholder discovery',
    did: 'Data analyst, project owner and AI Center of Excellence.',
    takeaway:
      'Each person saw their own process, and no one saw how a user moves from screen to screen.',
  },
  {
    title: 'Information architecture',
    did: 'Touchpoints and how conversion works, with AI to summarise and understand.',
    takeaway: 'What users need to make decisions, and where AI can make the interface easier.',
  },
  {
    title: 'Design',
    did: 'Claude Design with our design system, then Figma for final touches.',
    takeaway: 'Faster ideation and validation than manual exploration.',
  },
  {
    title: 'Dev + testing',
    did: 'Working with the dev team.',
    takeaway: 'Helped with design reviews.',
  },
]

const moreWork = [
  { num: '02', title: 'Acentra Health Design System', category: 'Design System', desc: 'Built a scalable design system that unified tokens, components, and accessibility standards across two product teams.', href: '/work/acentra-health', img: undefined as string | undefined },
  { num: '03', title: 'Project Three', category: 'Product Design', desc: 'One line on the problem and the outcome you drove.', href: '#', img: undefined as string | undefined },
]

function NextImage({ label, src, className = '' }: { label: string; src?: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-border bg-foundation-900 ${className}`}>
      {src ? (
        <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center px-4 text-center">
          <span className="text-caption font-grotesk uppercase tracking-widest text-foundation-500">{label}</span>
        </div>
      )}
    </div>
  )
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className}>
      <path d="M5 11h11M12 6l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
      <circle cx="8" cy="8" r="7.25" stroke="#c2600a" strokeWidth="1" />
      <path d="M5 8.2l2 2 4-4.2" stroke="#c2600a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MetricIcon({ name, className = '' }: { name: 'clock' | 'layers'; className?: string }) {
  if (name === 'clock') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
        <circle cx="8" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.1" />
        <path d="M8 6v3l2 1.4M6 1.5h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1.8l6 3-6 3-6-3 6-3z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M2 8l6 3 6-3M2 11l6 3 6-3" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  )
}

export default function DataConversionAppPage() {
  return (
    <main className="min-h-screen bg-body">

      {/* Dark hero. px-section + max-w-6xl is the page's content column — the product shots and
          Result below use the same pair, so all three share one left/right edge. pb-44 (176px)
          leaves room for the product shots to overlap the band's bottom edge (see below). */}
      <section className="relative overflow-hidden bg-foundation-900 px-6 sm:px-10 lg:px-section pt-section pb-44">

        {/* Background illustration, behind the content. overflow-hidden clips its bleed
            to the dark band; the product shots below are a sibling section, so their
            -mt-28 overlap is unaffected. */}
        <CrosswalkMatrix />

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Headline column — eyebrow, two-part headline, description. */}
          <div className="md:col-span-8">
            <AnimatedSection>
              <p className="text-label font-grotesk text-accent-warm uppercase">
                {heroEyebrow}
              </p>

              {/* The closing phrase carries the accent face — Fraunces italic, WONK pinned
                  off via .accent-italic. Everything ahead of it stays Space Grotesk, so the
                  face change is the emphasis. */}
              <h1 className="mt-6 text-display-2xl font-grotesk text-body">
                Reimagining data conversion at
                <br />
                <span className="font-accent accent-italic text-accent-warm">
                  Acentra Health
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-body font-sans text-foundation-300">
                {description}
              </p>
            </AnimatedSection>
          </div>

          {/* Role / ownership / collaboration, on border-border rules. */}
          <div className="md:col-span-4 flex flex-col justify-end">
            <AnimatedSection>
              {heroMeta.map(({ label, value, note }) => (
                <div key={label} className="border-t border-border pt-4 pb-6">
                  <p className="text-label font-grotesk text-accent-warm uppercase">{label}</p>
                  <p className="mt-2 text-heading-m font-grotesk text-body">{value}</p>
                  <p className="mt-2 text-caption font-sans text-foundation-400">{note}</p>
                </div>
              ))}
            </AnimatedSection>
          </div>

        </div>
      </section>

      {/* Product shot — a single screen. Pulled up with -mt-28 (112px) so it straddles the hero's
          bottom edge; against the hero's pb-44 (176px) that leaves 176 − 112 = 64px of clear dark
          between the hero copy and the top of the screen.

          This replaced a three-screen depth stack that fanned out on hover. The hover left dead
          space beneath the spread row, and one screen states the product more plainly — so this is
          static, and the page no longer needs a client component here.

          CONTENT: a generic screen only. The Dictionary / Mapping / Transformation story belongs to
          its own section later on the page and is deliberately not previewed here. No browser
          chrome, so this reads as a product shot rather than a re-run of the BrowserMockup (the
          demo video keeps that treatment, further down).

          The 1px white ring is carried over from the depth stack: the panel's top half sits on the
          dark hero, where a light hairline reads as a crisp edge, and it disappears against the
          light section below.

          pb-section is the only gap to the Problem section, which has no top rule of its own,
          so the two sit exactly one `section` (80px) apart. */}
      {/* relative z-10 is load-bearing: the hero above is `relative` (it has to be, to hold the
          background illustration), and a positioned element paints over a static sibling no matter
          the DOM order — which clipped the top 112px of this shot. Lifting this section explicitly
          puts the overlap back on top where it belongs. */}
      <section className="relative z-10 px-6 sm:px-10 lg:px-section pb-section -mt-28">
        <div className="max-w-6xl mx-auto">
          <div
            className="overflow-hidden rounded-lg border border-border bg-foundation-100 aspect-video"
            style={{
              boxShadow:
                '0 0 0 1px rgba(255, 255, 255, 0.16), 0 25px 50px -12px rgba(0, 0, 0, 0.3)',
            }}
          >
            <img
              src="/images/dca-placeholder/workspace.svg"
              alt="The Data Conversion App workspace: batch progress, records mapped, match rate and recent activity for a state program conversion."
              className="w-full h-full object-cover object-top block"
            />
          </div>
        </div>
      </section>

      {/* ── The Problem, then Impact ──
          This pair replaced At a glance. Problem states what step 1 cost when it was done by
          hand; Impact answers it and carries the results, the organizational read and the two
          quotes. Both are co-located components — see ProblemSection.tsx and Impact.tsx, which
          share one spine and the Fraunces italic (a font family, not a named type token).

          Impact carries no leading rule: Problem closes on its own, and that hairline is the
          divider between the two. */}
      <ProblemSection />

      <Impact />

      {/* ── Process timeline ──
          One rail. See the consts above for the reasoning; the mechanics worth knowing here:

          ALIGNMENT. Both phases label the same way — a Pill of fixed height (h-7) on its own row —
          which is what puts the two rules on one horizontal line. An earlier version had the
          before's rule first with a plain text label beneath it, and the two rules sat 38px apart,
          so the sides read as unrelated rather than as one timeline.

          THE TAKEAWAY ROW. At lg each stage wrapper is `contents`, so its three parts drop into
          the parent grid directly and the parent runs grid-flow-col over three rows — title, did,
          takeaway. Every column therefore draws from the same three row heights and the takeaways
          start on one line whatever the copy does. Pushing each takeaway down with mt-auto instead
          would bottom-align them, which is not the same thing: their tops would land wherever each
          one's line count put them. The middle row is 1fr so the slack pools in the did row.

          MOBILE. The wrapper carries border-l below md and drops it at md, where each side takes
          its own border-t. One unbroken vertical line on a phone, one horizontal line in two
          aligned segments on a desktop — and because a single element draws it, the stacked
          alignment is exact. `contents` switches off below lg, where each stage is a plain block.

          ACCENT. accent-warm is on the joined pill's outline and dot, the stage markers, and the
          takeaway's left edge — all graphics, where 3:1 applies. The pill's own text is
          foundation-900, because accent text at 11px measures 4.1:1 on the cream ground and fails
          AA. No body text is ever accent-coloured.

          KNOWN LIMIT: the before's takeaway does not share the stages' takeaway row. The two sides
          are separate rail segments with their own rules, so their row heights are independent;
          only a single grid spanning all five columns could lock them together, and that would
          mean giving up the two-segment rule this section is built on. */}
      <section className="px-6 sm:px-10 lg:px-section pb-section">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionHeader
              accessibleEyebrow
              eyebrow="Process Timeline"
              title="Brought in after the first build"
            />

            <div className="mt-12 border-l border-border pl-6 md:border-l-0 md:pl-0">
              <div className="flex flex-col gap-10 md:flex-row md:gap-8">
                <div className="md:w-80 md:shrink-0">
                  <div className="mb-4">
                    <RailPill>Before</RailPill>
                  </div>
                  <div className="md:border-t md:border-border md:pt-4">
                    <RailBlock muted {...railBefore} />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <RailPill accent>I joined here</RailPill>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-flow-col lg:grid-rows-[auto_1fr_auto] gap-x-8 gap-y-10 md:border-t md:border-border md:pt-4">
                    {railStages.map((stage) => (
                      <RailBlock key={stage.title} contents {...stage} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Keep exploring ──
          The page now ends on the Process timeline, so this is the only way onward. It was
          nested two levels inside the old case-study grid wrapper; with that wrapper gone it
          becomes a section in its own right and carries the page gutters itself. */}
      <section className="px-6 sm:px-10 lg:px-section pb-section">
        <div className="max-w-6xl mx-auto">
        {/* More Work — closing case-study index */}
        <AnimatedSection>
          <div className="border-t border-border pt-section">
            <div className="mb-10">
              <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest mb-3">More Case Studies</p>
              <div className="w-8 h-px bg-accent-warm mb-6" />
              <h2 className="text-heading-l font-grotesk text-foundation-900">Keep exploring</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
              {moreWork.map((p) => (
                <a
                  key={p.num}
                  href={p.href}
                  className="group rounded-lg border border-border p-8 flex flex-col transition-colors hover:border-foundation-900"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-caption font-grotesk text-foundation-400">{p.num}</span>
                    <ArrowRight className="text-foundation-300 group-hover:text-accent-warm group-hover:translate-x-1 transition-all" />
                  </div>
                  <span className="text-label font-grotesk uppercase tracking-widest text-foundation-400 mb-3">{p.category}</span>
                  <p className="text-heading-m font-grotesk text-foundation-900 group-hover:text-accent-warm transition-colors">{p.title}</p>
                  <p className="text-body-sm font-sans text-foundation-600 mt-3">{p.desc}</p>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                    <div className="overflow-hidden">
                      <NextImage
                        label={p.title}
                        src={p.img}
                        className="mt-6 aspect-[16/9] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                      />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
        </div>
      </section>

    </main>
  )
}
