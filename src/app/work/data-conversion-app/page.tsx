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
import { KeepExploring, type MoreWorkItem } from '@/components/KeepExploring'
import { SiteFooter } from '@/components/footer/SiteFooter'
import { Users } from 'lucide-react'
import { MvpFocus } from './MvpFocus'
import { ProblemSection } from './ProblemSection'
import { Impact } from './Impact'
import { ProcessSection } from './ProcessSection'
import { ChapterBreak } from './ChapterBreak'
import { RequirementsFeature } from './RequirementsFeature'
import { SchemaFeature } from './SchemaFeature'
import { MappingFeature } from './MappingFeature'
import { HubFeature } from './HubFeature'
import { LearnedNextSteps } from './LearnedNextSteps'
import { CaseToc, type TocItem } from '@/components/CaseToc'

/* The contents bar (CaseToc, as on Acentra Health; Nov 25 2026). Grouped (Michael: twelve entries
   was too many): six, each the first section of its group, so the underline stays on a group while
   you read any part of it. Problem covers MVP focus; Process & AI covers 'Where AI helped'; Design
   covers steps 01–04; Learnings covers next steps and what I learned (the quotes moved into Impact, Nov 25). The other sections keep their
   ids, so links to them still work. */
const toc: TocItem[] = [
  { id: 'brief', label: 'Brief' },
  { id: 'problem', label: 'Problem' },
  { id: 'impact', label: 'Impact' },
  { id: 'process', label: 'Process & AI' },
  { id: 'step-requirements', label: 'Design' },
  { id: 'learned', label: 'Learnings' },
]

export const metadata: Metadata = {
  title: 'Data Conversion App — Michael Jerome',
  description:
    'How an AI-assisted MVP let Acentra Health map, preview, and safely convert legacy case data ahead of a system cutover.',
}

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

      <section id="brief" data-toc-section className="px-6 sm:px-10 lg:px-section pt-section pb-section">
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
          Problem, MVP focus, Impact and Process share one full-width shape (Nov 24 2026): italic
          label, plain serif heading, one-line description, then the visual. Each is co-located
          beside this page. */}
      <ChapterBreak part="Part one" title="Understanding the work" />
      <div id="problem" data-toc-section><ProblemSection /></div>

      {/* ── MVP focus ──
          The scope row. Sits after the Problem so the cost of the old process is stated
          first and the constraint the MVP worked under answers it. It closes on its own
          hairline; see MvpFocus.tsx for the spacing contract. */}
      <div id="mvp" data-toc-section><MvpFocus /></div>

      <div id="impact" data-toc-section><Impact /></div>

      {/* ── Process ── its own section, see ProcessSection.tsx. */}
      <div id="process" data-toc-section><ProcessSection /></div>

      {/* ── Part two: the design features ──
          In the user's journey order, all four in the sketchbook layout (Sketch.tsx): Requirements,
          Project hub (HubFeature.tsx, second since Nov 25: every later step opens from it), Schema & Wiki, Mapping. Each opens with its
          question and sticky notes; a sky "where AI helped" note appears only where AI helped. */}
      <ChapterBreak part="Part two" title="Designing the app" />
      <div id="step-requirements" data-toc-section><RequirementsFeature /></div>
      <div id="step-hub" data-toc-section><HubFeature /></div>
      <div id="step-schema" data-toc-section><SchemaFeature /></div>
      <div id="step-mapping" data-toc-section><MappingFeature /></div>

      {/* ── Next steps, then What I learned ──
          The case study's closing section, right after the design steps. On the margin rail, like the
          opening sections, ending on the reflection (see LearnedNextSteps). */}
      <div id="learned" data-toc-section><LearnedNextSteps /></div>

      <KeepExploring items={moreWork} />

      {/* the site footer, on every page (Nov 23 2026); light only here, like the rest of the case study */}
      <SiteFooter />

      {/* the contents bar, as on Acentra Health (Nov 25 2026, Michael) */}
      <CaseToc items={toc} />

    </main>
  )
}
