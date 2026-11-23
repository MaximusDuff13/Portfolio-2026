import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { links } from '@/data/links'
import { HeroMetrics } from '@/components/HeroMetrics'
import { BriefFacts } from '@/components/BriefFacts'
import { HeroSweep } from './HeroSweep'
import { StopwatchDoodle, ProgramsDoodle } from '@/components/Doodles'
import { description, facts, heroMetrics } from './hero-data'
import '../case-study.css'
import { AnimatedSection } from '@/components/AnimatedSection'
import { KeepExploring, type MoreWorkItem } from '@/components/KeepExploring'
import { SiteFooter } from '@/components/footer/SiteFooter'
import { ProcessTimeline } from '@/components/ProcessTimeline'
import { PrincipleGrid } from '@/components/PrincipleGrid'
import { ProblemSolutionFeature, type ProblemSolution } from '@/components/ProblemSolutionFeature'
import { ClipboardCheck, Users, Eye, CheckCircle2, Rows3, PanelRight, LayoutGrid, Route, FileQuestion, MessageSquarePlus } from 'lucide-react'
import { projectHub } from './projectHub'
import { MvpFocus } from './MvpFocus'
import { ProblemSection } from './ProblemSection'
import { Impact } from './Impact'
import { Testimonials } from './Testimonials'
import { LearnedNextSteps } from './LearnedNextSteps'

export const metadata: Metadata = {
  title: 'Data Conversion App — Michael Jerome',
  description:
    'How an AI-assisted MVP let Acentra Health map, preview, and safely convert legacy case data ahead of a system cutover.',
}

const processPhases = [
  { label: 'Stakeholder discovery', items: ['Data analysts', 'Project owners', 'AI Center of Excellence'] },
  { label: 'Information architecture', items: ['Touchpoints across the journey', 'How conversion works, end to end', 'Where AI could summarise and simplify'] },
  { label: 'Design', items: ['Claude Design, using our design system', 'Figma for final polish'] },
  { label: 'Dev + testing', items: ['Partnered with the dev team through build and testing'] },
]

// Each principle points at a moment in this project rather than general advice.
const processPrinciples = [
  {
    icon: Users,
    term: 'Start with the people',
    body: 'Before any screens, I mapped the journey with the analysts and project owners who do this work, so the AI was built around a real flow.',
  },
  {
    icon: ClipboardCheck,
    term: 'Learn the backend first',
    body: 'I sat with the AI Center of Excellence to understand what their models were doing before I designed anything that showed it.',
  },
  {
    icon: Eye,
    term: 'Let the evidence argue',
    body: "Testing showed the AI couldn't pick up every business rule from a data dictionary. That result, not an opinion, is what got the prompt field into scope.",
  },
  {
    icon: CheckCircle2,
    term: 'Agree on what to cut',
    body: 'We settled early on what the MVP would leave out: delight and visual polish went, usable and functional stayed. MoSCoW on each screen kept those calls quick.',
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
    body: 'Every field lived right in the table, but each description or transformation setting sent people off to another screen. Too much back and forth for a table this dense.',
    image: mappingDir + 'wireframe-2-inline-table-labeled.svg',
    alt: 'Inline table wireframe',
  },
  {
    title: 'Review queue',
    body: 'People queued up fields, then reviewed them one at a time on their own screen. It kept picking separate from reviewing, but taking people off the table made it hard to compare fields side by side.',
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
    body: 'About 1,200 target columns needed mapping, and each one came with its own decisions: which source field it came from, how sure the AI was, whether a transformation rule applied, and where it was in review. Showing all of that at once would bury the one thing someone needed right then, the field in front of them.',
  },
  {
    icon: PanelRight,
    label: 'Solution',
    lead: 'Keep the table focused on scanning and comparing, and open everything else in a panel beside it.',
    body: "The panel opens with the first row already selected. Mapping and Transformation are separate tabs, so a field that needs no transformation just leaves that tab empty. We also kept one idea from the inline table: a large crosswalk, like turning F and M into Female and Male, is too big for the panel, so it opens on its own screen and the person can focus on that one thing.",
  },
]

const mappingShipped = {
  // Nov 23 2026: Michael's re-export with correct mapping data (replaced Mapping Variant 1 Screen 1)
  src: mappingDir + 'Table%20Mapping%20screen.png',
  width: 3936,
  height: 3045,
  alt: 'The Detail panel as shipped: a table of fields with a mapping details panel open, showing source mapping, transformation, and AI confidence.',
}

// How people know when to trust a match. Shown under the shipped screen.
const mappingShippedCaption =
  'Every match shows how sure the AI is (high, medium or low) and whether the AI suggested it or a person set it. People can filter by AI score to start with the weakest matches, change the source field in the panel, and move each mapping through review until the state approves it.'

/* Requirements gathering. No concepts or shipped screen: the card, then the journey map the
   solution describes. Icons: LayoutGrid (the separate screens) and Route (the journey between
   them), drawn like the other card icons. */
const requirementsDir = '/images/data-conversion-app/requirement-gathering/'

const requirementsLead = [
  {
    icon: LayoutGrid,
    label: 'Problem',
    lead: 'The first screens were each built with AI and shown to leadership to win their support, but they had no flow.',
    body: "Nobody knew where a user would come from, what they'd click, or what they'd do next. It was a set of big screens with nothing defined between them.",
  },
  {
    icon: Route,
    label: 'Solution',
    lead: 'Start with the people building it and the people using it, not the screens.',
    body: "I mapped the current journey with stakeholders, then worked with the AI Center of Excellence to learn what they'd built and which parts of the process they were going after. Putting the two together showed exactly where AI could save time. For the MVP we picked one piece of that flow and built it so the rest could follow.",
  },
]

const journeyMap = {
  src: requirementsDir + 'journey-map-horizontal.png',
  width: 3600,
  height: 2338,
  alt: 'Customer journey map for data conversion across five stages — agreement, initial mapping, state review, transformation, and conversion and sync — showing steps, touchpoints, actors, where AI can help, and an emotion curve. Initial mapping is the low point; at transformation, experienced staff stay neutral while new staff are overwhelmed. The Data Conversion App spans the first four stages.',
}

/* Schema & Wiki creation. No concepts and no single image: the card, then the three screens in
   the order a person meets them, each with its label and sentence. Icons: FileQuestion (what
   happens after upload was undefined) and MessageSquarePlus (the prompt added beside the upload),
   drawn like the other card icons. The Solution column is a single paragraph. */
const schemaWikiDir = '/images/data-conversion-app/schema-mapping/'

const schemaWikiLead = [
  {
    icon: FileQuestion,
    label: 'Problem',
    lead: "Once the agreement is signed, the state hands over a data dictionary describing the outgoing vendor's tables and fields. The original scope was just to let people upload it.",
    body: "Nobody had defined what came after the upload: whether people could see the result, handle an edge case or make a change. Upload alone would have been quicker to build, but early testing showed the AI couldn't work out every business rule from the dictionary by itself.",
  },
  {
    icon: MessageSquarePlus,
    label: 'Solution',
    lead: "Add a prompt field next to the upload, so a person can describe the business rules the AI would otherwise miss. Underneath it's a Markdown file, so a later phase can let people edit it directly instead of only reading a PDF.",
  },
]

const schemaWikiSequence = [
  {
    src: schemaWikiDir + 'upload-and-prompt.png',
    width: 5248,
    height: 3580,
    alt: 'The Schema and Wiki setup screen with Upload data dictionaries selected, a drag-and-drop upload area, and an optional Additional Wiki guidance text field with placeholder text about business definitions, field relationships, and code values.',
    caption: 'Upload, with an optional prompt',
    sentence: 'A person uploads the data dictionary from the state, and can add a short prompt about any business rules the AI should know.',
  },
  {
    src: schemaWikiDir + 'success-and-append.png',
    width: 5248,
    height: 3200,
    alt: 'The Schema and Wiki setup screen after success, showing 147 table Wikis generated, source and target schema details, and Return to project and Append more data dictionary buttons.',
    caption: 'Generated, with room to add more',
    sentence: 'The AI writes the Source Wikis from the dictionary and the prompt. If something was missed, the person can add more dictionaries.',
  },
  {
    src: schemaWikiDir + 'documents-list.png',
    width: 5248,
    height: 3804,
    alt: "The project's Documents tab showing the Source Wiki list: 147 source tables and 124 target tables, with a searchable table of names, descriptions, field counts, and view and download actions per row.",
    caption: 'Visible in Documents, not just the backend',
    sentence: "Every Wiki shows up in the Project Hub's Documents tab, where people can open or download it instead of it living only in the backend.",
  },
]

/* Problem-and-solution features, in page order. Each entry renders as its own full-bleed band;
   the band and card backgrounds alternate by position (see ProblemSolutionFeature), so adding a
   feature is adding an entry here.

   ORDER. The user's journey: Requirements, then Schema & Wiki creation (the upload the
   mappings are drafted from), then Mapping & transformation. Project hub, the overview of
   every stage, comes last, once the reader has met those stages. */
const problemSolutions: ProblemSolution[] = [
  {
    eyebrow: 'Requirements gathering',
    title: 'Where does the user go next?',
    lead: requirementsLead,
    image: journeyMap,
  },
  {
    eyebrow: 'Schema & Wiki creation',
    title: 'The AI needed context, not just a file',
    lead: schemaWikiLead,
    sequence: schemaWikiSequence,
  },
  {
    eyebrow: 'Mapping & transformation',
    title: 'How do you fit everything into one table?',
    lead: mappingLead,
    concepts: mappingConcepts,
    // The shipped detail panel took the panel from Detail panel and the on-table density from
    // Inline table; Review queue contributed nothing, so it gets no connector.
    shippedFrom: ['Detail panel', 'Inline table'],
    shipped: mappingShipped,
    shippedCaption: mappingShippedCaption,
  },
  projectHub,
]

const moreWork: MoreWorkItem[] = [
  {
    title: 'Acentra Health Design System',
    category: 'Design System',
    desc: 'Built a scalable design system that unified tokens, components, and accessibility standards across two product teams.',
    href: '/work/acentra-health',
    // the home page card's cover and stage tint for this case study (content.ts)
    img: '/images/beforeafter/After.png',
    stage: 'bg-stage-sage',
    meta: 'Design system',
  },
]

function CheckMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
      <circle cx="8" cy="8" r="7.25" className="stroke-accent-warm" strokeWidth="1" />
      <path d="M5 8.2l2 2 4-4.2" className="stroke-accent-warm" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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

      {/* Hero, in the Acentra Health case study's shape (Nov 23 2026): breadcrumb; the title on one
          line, its second half in olive italic; the outcomes as a row of large figures (HeroMetrics);
          the screen on the sky stage the home card uses, so the card's morph lands on the same colour;
          then the brief and its four facts (BriefFacts). */}
      <section className="px-6 sm:px-10 lg:px-section pt-section">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb">
            <ol className="m-0 flex list-none flex-wrap items-baseline gap-x-2 p-0 text-body font-sans">
              <li>
                <Link href={links.home} className="rounded-sm text-foundation-600 underline-offset-4 hover:text-foundation-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-body">Home</Link>
              </li>
              <li aria-hidden="true" className="text-foundation-500">/</li>
              <li aria-current="page" className="font-medium text-foundation-900">Data Conversion App</li>
            </ol>
          </nav>
          <h1 className="vt-title-dca mt-6 mb-0 font-display font-medium text-foundation-900" style={{ fontSize: 'clamp(38px, 6.2vw, 88px)', lineHeight: 1.02, letterSpacing: '-0.03em' }}>
            Faster data conversion,{' '}<br className="hidden sm:inline" /><span className="cs-lede accent-italic">with a human in the loop.</span>
          </h1>
          {/* each figure with its doodle on the left, in the accent ink Acentra's light tiles use */}
          <HeroMetrics items={heroMetrics.map((m, i) => ({ ...m, art: i === 0 ? <StopwatchDoodle ink="#b15900" /> : <ProgramsDoodle ink="#b15900" /> }))} />
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-section pt-4">
        <div className="max-w-6xl mx-auto">
          <HeroSweep />
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-section pt-section pb-section">
        <div className="max-w-6xl mx-auto">
          <BriefFacts
            description={description}
            facts={facts}
            teamArt={<>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/acentra-team/michael.webp" alt="" width={48} height={48} className="h-12 w-12 rounded-full border-2 border-solid border-stage-straw" />
              <span className="-ml-1.5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-solid border-stage-straw bg-stage-straw-strong text-foundation-900"><Users size={22} strokeWidth={1.75} /></span>
            </>}
          />
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6">
              {/* The rail label, set like Problem's, MVP focus's and Impact's, and the section's
                  real h2 (it replaced an uppercase label + tick over an sr-only heading). */}
              <div className="md:col-span-3">
                <h2 className="m-0 font-display accent-italic text-heading-m text-foundation-900">
                  Process
                </h2>
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
                    <p className="mb-6 font-sans text-label uppercase tracking-widest text-foundation-600">
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

          ACCENT. None: no body text or graphic in these bands is accent-coloured.

          HEADING. Each band's title is an h3, so the run gets an sr-only h2 of its own; without
          it the four titles nested under Process in the outline. */}
      <h2 className="sr-only">Key design decisions</h2>
      {problemSolutions.map((feature, i) => (
        <ProblemSolutionFeature key={feature.eyebrow} index={i} feature={feature} />
      ))}

      {/* ── Testimonials ──
          After the features, before Keep exploring. Not another feature band: it sits on the
          page ground behind a hairline, with its own layout (see Testimonials). */}
      <Testimonials />

      {/* ── Next steps, then What I learned ──
          The case study's closing section, after Testimonials. On the margin rail, like the
          opening sections, ending on the reflection (see LearnedNextSteps). */}
      <LearnedNextSteps />

      <KeepExploring items={moreWork} />

      {/* the site footer, on every page (Nov 23 2026); light only here, like the rest of the case study */}
      <SiteFooter />

    </main>
  )
}
