import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { ProcessTimeline } from '@/components/ProcessTimeline'
import { PrincipleGrid } from '@/components/PrincipleGrid'
import { ProblemSolutionFeature, type ProblemSolution } from '@/components/ProblemSolutionFeature'
import { ClipboardCheck, Users, Eye, CheckCircle2, Rows3, PanelRight, LayoutGrid, Route, Workflow, ListChecks } from 'lucide-react'
import type { CyclerState } from '@/components/StateCycler'
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
  { label: 'Stakeholder discovery', items: ['Data analysts', 'Project owners', 'AI Center of Excellence'] },
  { label: 'Information architecture', items: ['Touchpoints across the journey', 'How conversion works, end to end', 'Where AI could summarise and simplify'] },
  { label: 'Design', items: ['Claude Design, using our design system', 'Figma for final polish'] },
  { label: 'Dev + testing', items: ['Partnered with the dev team through build and testing'] },
]

const processPrinciples = [
  {
    icon: ClipboardCheck,
    term: 'Do your homework',
    body: "Communicate clearly in standups about what decisions you need and by when. A simple sheet with timelines and required attention windows keeps everyone aligned.",
  },
  {
    icon: Users,
    term: 'Build relationships',
    body: "Know whether the person you're speaking with can actually make the decision, and bring evidence and backing from your teammates into every conversation.",
  },
  {
    icon: Eye,
    term: "Show, don't tell",
    body: 'Back design decisions with real data and user research. A concrete example or case study persuades faster than an argument.',
  },
  {
    icon: CheckCircle2,
    term: 'Done is better than perfect',
    body: "Use a prioritisation framework, I prefer MoSCoW, for each screen so the team always knows what matters most.",
  },
]

/* PROBLEM-AND-SOLUTION FEATURES. One so far: Mapping & transformation. Its pieces are defined
   here and gathered into the problemSolutions list below; nothing is stubbed out for features
   that do not exist yet.

   Every image lives in public/images/data-conversion-app/mapping-variants/ and is referenced by
   its public path. Names with spaces are written pre-encoded (%20), the same way the screenshots
   always have been, so the src is exactly the URL the browser requests. */
const mappingDir = '/images/data-conversion-app/mapping-variants/'

const mappingConcepts = [
  {
    title: 'Detail panel',
    body: 'A lean table for scanning and comparing, with a side panel that opens for mapping, transformation, and AI confidence. This is the concept we shipped.',
    image: mappingDir + 'wireframe-1-detail-panel-labeled.svg',
    alt: 'Detail panel wireframe',
  },
  {
    title: 'Inline table',
    body: 'Every field lived directly in the table, but each description or transformation setting sent people to a separate screen. Too many redirects for a table this dense.',
    image: mappingDir + 'wireframe-2-inline-table-labeled.svg',
    alt: 'Inline table wireframe',
  },
  {
    title: 'Review queue',
    body: 'People queued fields, then reviewed them one at a time on a dedicated screen. It separated selecting from reviewing, but pulling users off the table hurt their ability to compare fields side by side.',
    image: mappingDir + 'wireframe-3-review-queue-labeled.svg',
    alt: 'Review queue wireframe',
  },
]

/* Problem/Solution lead, in a card. Each column opens with an icon + label header, then two
   paragraphs: the lead sentence, and one supporting paragraph.

   ICONS. Rows3 (the dense table) and PanelRight (the side panel) are a deliberate addition,
   drawn the way the "Working with stakeholders" icons are: 20px, 1.5 stroke, foundation-600,
   aria-hidden, since the label beside each one already says what it means. */
const mappingLead = [
  {
    icon: Rows3,
    label: 'Problem',
    lead: 'A single table had to carry the mapping, the transformation logic, AI confidence, descriptions, and review status, all at once.',
    body: 'About 1,200 target columns needed mapping, and each one carried its own set of decisions: which source field it came from, how confident the AI was in that match, whether a transformation rule applied, and where it stood in review. Putting all of that in front of someone at once risked burying the one thing they actually needed right then: the field in front of them.',
  },
  {
    icon: PanelRight,
    label: 'Solution',
    lead: 'Keep the table focused on scanning and comparing, and open everything else in a panel beside it.',
    body: 'The panel opens with the first row selected by default, and keeps Mapping and Transformation as two separate tabs, so a field that needs no transformation can simply leave that tab empty. We also borrowed an idea from the inline table: when a transformation involves a large crosswalk, like turning F and M into Female and Male, that table is too big for the panel, so it opens in a screen of its own instead, keeping the user focused on one thing at a time.',
  },
]

const mappingShipped = {
  src: mappingDir + 'Mapping%20Variant%201%20Screen%201.png',
  width: 3936,
  height: 3117,
  alt: 'The Detail panel as shipped: a table of fields with a mapping details panel open, showing source mapping, transformation, and AI confidence.',
}

/* Requirements gathering. No concepts or shipped screen: the card, then the journey map the
   solution describes. Icons: LayoutGrid (the separate screens) and Route (the journey between
   them), drawn like the other card icons. */
const requirementsDir = '/images/data-conversion-app/requirement-gathering/'

const requirementsLead = [
  {
    icon: LayoutGrid,
    label: 'Problem',
    lead: 'The first screens were built individually with AI and shown to leadership to win buy-in, but they had no flow.',
    body: "There was no sense of where a user would come from, what they'd click, or what they'd do next — just a set of major screens, with the journey between them left undefined.",
  },
  {
    icon: Route,
    label: 'Solution',
    lead: 'Start with the people building it and the people using it, not the screens.',
    body: 'I mapped the current customer journey with stakeholders, then worked with the AI Center of Excellence to understand what they had built and which parts of the process they were targeting. Bringing the two together gave us a user journey that showed exactly where AI could make things faster. For the MVP we scoped down to one piece of that flow, built to scale to the rest later.',
  },
]

const journeyMap = {
  src: requirementsDir + 'journey-map-horizontal.png',
  width: 3600,
  height: 2338,
  alt: 'Customer journey map for data conversion across five stages — agreement, initial mapping, state review, transformation, and conversion and sync — showing steps, touchpoints, actors, where AI can help, and an emotion curve. Initial mapping is the low point; at transformation, experienced staff stay neutral while new staff are overwhelmed. The Data Conversion App spans the first four stages.',
}

/* Project hub. The card, then one step cycling through its states, then the finished hub. No
   concepts and no captions. Icons: Workflow (the steps a project moves through) and ListChecks
   (each step's state), drawn like the other card icons. */
const projectHubDir = '/images/data-conversion-app/project-hub/'

const projectHubLead = [
  {
    icon: Workflow,
    label: 'Problem',
    lead: 'A process like this moves through several steps, and each step can be ready to start, running, failed, or finished.',
    body: 'A simple progress bar would have been enough for the MVP, but data conversion would later add stages of its own, and the design needed to handle them without a rebuild.',
  },
  {
    icon: ListChecks,
    label: 'Solution',
    lead: 'Build the hub around states, not just a progress bar.',
    body: 'Each step reports what is happening in plain words, with the next action beside it. Source Wiki generation shows all four states, and the same pattern already carries Mapping & transformation, so new stages can slot in without redesigning the hub.',
  },
]

// The states the cycler steps through, in order. Reordering them is reordering this list.
const projectHubStates: CyclerState[] = [
  {
    id: 'enable',
    label: 'Enable',
    src: projectHubDir + 'schema-wiki-enable.png',
    alt: 'Schema and Wiki step in its enable state: a prompt to set up the schema for this project, with source and target schema both not configured.',
  },
  {
    id: 'generating',
    label: 'Generating',
    src: projectHubDir + 'schema-wiki-generating.png',
    alt: 'Schema and Wiki step while generating: a progress bar showing 68 of 147 tables documented, with a View details button.',
  },
  {
    id: 'success',
    label: 'Success',
    src: projectHubDir + 'schema-wiki-success.png',
    alt: 'Schema and Wiki step after success: 147 table Wikis generated, with Continue to mapping and View Wiki buttons, and the source schema, target schema and generation date listed.',
  },
  {
    id: 'error',
    label: 'Error',
    src: projectHubDir + 'schema-wiki-error.png',
    alt: 'Schema and Wiki step after an error: Source Wiki generation failed, with a note that the saved selections are kept, and Try again and View details buttons.',
  },
]

const projectHubCompleted = {
  src: projectHubDir + 'hub-project-completed.png',
  width: 2624,
  height: 1902,
  alt: 'The project hub after every step is finished, showing a Project completed banner with a download signoff mapping button, and Schema and Wiki and Mapping and transformation both listed as completed.',
}

/* Problem-and-solution features, in page order. Each entry renders as its own full-bleed band;
   the band and card backgrounds alternate by position (see ProblemSolutionFeature), so adding a
   feature is adding an entry here. */
const problemSolutions: ProblemSolution[] = [
  {
    eyebrow: 'Mapping & transformation',
    title: 'How do you fit everything into one table?',
    lead: mappingLead,
    concepts: mappingConcepts,
    // The shipped detail panel took the panel from Detail panel and the on-table density from
    // Inline table; Review queue contributed nothing, so it gets no connector.
    shippedFrom: ['Detail panel', 'Inline table'],
    shipped: mappingShipped,
  },
  {
    eyebrow: 'Requirements gathering',
    title: 'Where does the user go next?',
    lead: requirementsLead,
    image: journeyMap,
  },
  {
    eyebrow: 'Project hub',
    title: 'How do you show where a project stands?',
    lead: projectHubLead,
    states: projectHubStates,
    image: projectHubCompleted,
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
                <ProcessTimeline title="Process overview" phases={processPhases}>
                  {/* Same card, second half. The rule is the only separator: a second
                      FigureCard here would break the figure into two unrelated panels. */}
                  <div className="mt-12 border-t border-border pt-10">
                    {/* foundation-600, not the foundation-500 the brief named — on this
                        card's foundation-100 ground foundation-500 measures 4.40:1, under
                        the 4.5:1 the same brief requires. Same trade as FigureCard's own
                        caption. */}
                    <p className="mb-6 font-grotesk text-label uppercase tracking-widest text-foundation-600">
                      Working with stakeholders
                    </p>
                    <PrincipleGrid items={processPrinciples} />
                  </div>
                </ProcessTimeline>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Problem-and-solution features ──
          Sits between Process and Keep exploring. Each feature is its own full-bleed band,
          rendered by ProblemSolutionFeature from the problemSolutions list; the band and card
          backgrounds alternate by position, so the next feature is a new list entry.

          NO RAIL, unlike Problem, MVP focus, Impact and Process. Those sections put a label at
          col-span-3 and their content at col-span-9; these run the full wrap, because on the spine
          each wireframe column came out at 255px, too narrow to read a dense table.

          ACCENT. None: no body text or graphic in these bands is accent-coloured. */}
      {problemSolutions.map((feature, i) => (
        <ProblemSolutionFeature key={feature.eyebrow} index={i} feature={feature} />
      ))}

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
