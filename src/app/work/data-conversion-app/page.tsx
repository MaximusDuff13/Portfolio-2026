import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { ProcessTimeline } from '@/components/ProcessTimeline'
import { CrosswalkMatrix } from './CrosswalkMatrix'
import { MvpFocus } from './MvpFocus'
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

const processPhases = [
  { label: 'Stakeholder discovery', items: ['Data analyst', 'Project owner', 'AI Center of Excellence'] },
  { label: 'Information architecture', items: ['Touchpoints', 'How conversion works', 'AI to summarise and understand'] },
  { label: 'Design', items: ['Claude Design with our design system', 'Figma for final touches'] },
  { label: 'Dev + testing', items: ['Working with the dev team'] },
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

      {/* ── MVP focus ──
          The scope row. Sits after the Problem so the cost of the old process is stated
          first and the constraint the MVP worked under answers it. It closes on its own
          hairline; see MvpFocus.tsx for the spacing contract. */}
      <MvpFocus />

      <Impact />

      {/* ── Process ──
          The label sits in the left rail and the figure takes the right column, tops
          aligned on the same grid row — the same two-column shape Problem and MVP focus
          use. The visible heading, the Before block and the joined pill were removed; the
          section keeps an accessible heading through an sr-only h2, so the document outline
          is unchanged even though nothing is drawn for it.

          ACCENT. accent-warm is on the eyebrow tick and the figure card’s tick, both
          graphics. The figure itself uses no accent at all, and no body text is ever
          accent-coloured. */}
      <section className="px-6 sm:px-10 lg:px-section pb-section">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            {/* The heading is not drawn, but the section still needs one. */}
            <h2 className="sr-only">Process</h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6">
              <div className="md:col-span-3">
                <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                  Process
                </p>
                <div className="mt-3 h-px w-8 bg-accent-warm" />
              </div>

              <div className="md:col-span-9">
                <ProcessTimeline title="Process overview" phases={processPhases} />
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
