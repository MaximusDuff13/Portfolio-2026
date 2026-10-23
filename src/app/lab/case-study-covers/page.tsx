import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { CaseStudyCover, type CoverVariant } from '@/components/CaseStudyCover'
import { SectionHeader } from '@/components/SectionHeader'
import { companies } from '@/data/home'
import { links } from '@/data/links'
import { LabNav } from './LabNav'

/* LAB — prototype route for comparing three case study listing objects with the same data
   and props. Each variant is shown nested under its company block, as it would sit in
   "Where I've worked". Not linked from the site; noindex. Delete once a variant ships. */

export const metadata: Metadata = {
  title: 'Lab · Case study covers',
  robots: { index: false, follow: false },
}

const column = 'max-w-6xl mx-auto px-6 sm:px-10 lg:px-section'

const variants: { id: string; variant: CoverVariant; eyebrow: string; title: string }[] = [
  { id: 'a-magazine', variant: 'magazine', eyebrow: 'Magazine issue', title: 'The cover opens from the spine' },
  { id: 'b-newspaper', variant: 'newspaper', eyebrow: 'Newspaper front page', title: 'The fold lifts on the lead story' },
  { id: 'c-folder', variant: 'folder', eyebrow: 'Case file folder', title: 'The file slides out of its folder' },
]

const withWork = companies.filter((c) => c.caseStudies.length > 0)

export default function CaseStudyCoversLab() {
  return (
    <main className="bg-body pb-section">
      <div className={`${column} pt-12 lg:pt-16 flex flex-col gap-6`}>
        <p className="text-label font-grotesk uppercase text-foundation-600">Lab · Prototype · Not linked from the site</p>
        <h1 className="text-heading-xl lg:text-display-xl font-grotesk text-foundation-900 max-w-3xl">Case study covers</h1>
        <p className="text-body font-sans text-foundation-700 max-w-2xl">
          Three ways to list a case study as an object you pick up. Same data and props in each. Hover or tab to a cover
          to open it; on touch, the cover sheet is always visible and a tap goes straight to the case study.
        </p>
        <div className="overflow-x-auto [scrollbar-width:none]">
          <LabNav tabs={variants.map((v) => ({ key: v.id, label: `${v.id[0].toUpperCase()}. ${v.eyebrow}` }))} />
        </div>
      </div>

      {variants.map((v, vi) => (
        <section key={v.id} id={v.id} aria-labelledby={`${v.id}-title`} className={`${column} scroll-mt-20 mt-section`}>
          <div className="border-t border-border pt-section">
            <AnimatedSection>
              <div id={`${v.id}-title`}>
                <SectionHeader index={String.fromCharCode(65 + vi)} eyebrow={v.eyebrow} title={v.title} accessibleEyebrow />
              </div>
            </AnimatedSection>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-16">
              {withWork.map((c) => (
                <article key={c.id} aria-labelledby={`${v.id}-${c.id}-name`} className="flex flex-col gap-6 min-w-0">
                  {/* Company block header, as in Where I've worked */}
                  <div className="flex flex-col gap-2 border-t border-border pt-4">
                    <h3 id={`${v.id}-${c.id}-name`} className="flex items-center gap-3 text-heading-m font-grotesk text-foundation-900">
                      {c.current && <span className="w-4 h-0.5 bg-accent-warm shrink-0" aria-hidden="true" />}
                      {c.name}
                      {c.current && <span className="sr-only"> (current role)</span>}
                    </h3>
                    <p className="text-label font-grotesk uppercase text-foundation-600 leading-[1.6]">
                      {c.role} · {c.city} · {c.years}
                    </p>
                  </div>
                  {c.caseStudies.map((cs) => (
                    <CaseStudyCover
                      key={cs.href}
                      variant={v.variant}
                      study={cs}
                      index={withWork.indexOf(c)}
                      placeholderArt={cs.href === links.caseStudy.dataConversionApp}
                    />
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
