import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { CaseStudyList, type EntryLayout } from '@/components/CaseStudyEntry'
import { SectionHeader } from '@/components/SectionHeader'
import { caseStudies } from '@/data/caseStudies'
import { LabControls } from './LabControls'

/* LAB — five layouts for the home page's case study listing, side by side, all from the
   same typed list (src/data/caseStudies.ts) and the same CaseStudyEntry props. The list is
   by case study; company and role live on each cover sheet. Not linked from the site;
   noindex. Delete once a layout ships. ?n=3|4|6 sets how many entries each layout shows. */

export const metadata: Metadata = {
  title: 'Lab · Case study layouts',
  robots: { index: false, follow: false },
}

const column = 'max-w-6xl mx-auto px-6 sm:px-10 lg:px-section'

const layouts: { id: string; layout: Exclude<EntryLayout, 'card'>; name: string; title: string }[] = [
  { id: 'index-rows', layout: 'index', name: 'Index rows', title: 'A contents page you can skim top to bottom' },
  { id: 'front-page', layout: 'lead', name: 'Front-page lead', title: 'One lead story, the rest as covers beneath it' },
  { id: 'issue-wall', layout: 'wall', name: 'Issue wall', title: 'Large covers; the full sheet slides out of each' },
  { id: 'spotlight-strip', layout: 'strip', name: 'Spotlight strip', title: 'A sideways row where the screens break out' },
  { id: 'dossier', layout: 'dossier', name: 'Dossier', title: 'Each case study is its own case file' },
]

const COUNTS = [3, 4, 6]

export default function CaseStudyLayoutsLab({ searchParams }: { searchParams: { n?: string } }) {
  const n = COUNTS.includes(Number(searchParams.n)) ? Number(searchParams.n) : 4
  const entries = caseStudies.slice(0, n)

  return (
    // overflow-x-clip, as on the home page: the spotlight strip bleeds to the viewport edge
    <main className="bg-body pb-section overflow-x-clip selection:bg-accent-subtle selection:text-foundation-900">
      <div className={`${column} pt-12 lg:pt-16 flex flex-col gap-8`}>
        <h1 className="m-0 text-heading-xl lg:text-display-xl font-grotesk text-foundation-900 max-w-3xl">Case study layouts</h1>
        <p className="m-0 text-body font-sans text-foundation-700 max-w-2xl">
          Five ways to list the case studies, from the same data. Title, company, role and outcome show without hovering
          in every one; hover or tab to an entry for its one moment. Entries after the first two are placeholders, there to
          test 3 to 6 case studies. A prototype, not linked from the site.
        </p>
        <LabControls tabs={layouts.map((l, i) => ({ key: l.id, label: `${i + 1}. ${l.name}` }))} count={n} counts={COUNTS} />
      </div>

      {layouts.map((l, i) => (
        <section key={l.id} id={l.id} aria-labelledby={`${l.id}-heading`} className={`${column} scroll-mt-20 mt-section`}>
          <div className="border-t border-border pt-section">
            <AnimatedSection>
              <div id={`${l.id}-heading`}>
                <SectionHeader index={String(i + 1)} eyebrow={l.name} title={l.title} accessibleEyebrow />
              </div>
            </AnimatedSection>
            <div className="mt-12">
              <CaseStudyList layout={l.layout} entries={entries} />
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
