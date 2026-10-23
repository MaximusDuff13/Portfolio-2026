import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionHeader } from '@/components/SectionHeader'
import { interests, person } from '@/data/home'
import { BackToWork } from './BackToWork'

export const metadata: Metadata = {
  title: `About — ${person.name}`,
  description: `Travel, games and volunteering: the interests behind ${person.name}'s design work.`,
}

// DEVIATION — responsive gutter, as on the home page
const column = 'max-w-3xl mx-auto px-6 sm:px-10 lg:px-section'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-body">
      <div className={`${column} pt-12 pb-section`}>
        <BackToWork />
        <h1 className="mt-12 text-heading-xl sm:text-display-xl font-grotesk text-foundation-900">
          [ABOUT PAGE HEADLINE]
        </h1>
        <p className="mt-6 text-body font-sans text-foundation-700">[ONE-LINE INTRO TO THE INTERESTS BELOW]</p>

        {interests.map((i) => (
          <section key={i.id} id={i.id} className="scroll-mt-20 mt-section border-t border-border pt-section">
            <AnimatedSection className="flex flex-col gap-6">
              <SectionHeader eyebrow={i.label} title={`[${i.label.toUpperCase()} HEADLINE]`} accessibleEyebrow />
              {i.about.map((p) => (
                <p key={p} className="text-body font-sans text-foundation-700">
                  {p}
                </p>
              ))}
            </AnimatedSection>
          </section>
        ))}
      </div>
    </main>
  )
}
