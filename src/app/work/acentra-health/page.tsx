import type { Metadata } from 'next'
import { BackLink } from '@/components/BackLink'
import { AnimatedSection } from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'Acentra Health Design System — Michael Jerome',
  description:
    'How I built a scalable design system that unified tokens, components, and accessibility standards across two product teams.',
}

export default function AcentraHealthPage() {
  return (
    <main className="min-h-screen bg-body">
      {/* Hero */}
      <section className="px-section py-section max-w-5xl mx-auto">
        <BackLink href="/" label="Work" />

        <div className="mt-12 mb-10 border-b border-border pb-6">
          <span className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
            Case Study · Design Systems
          </span>
        </div>

        <AnimatedSection>
          <h1 className="text-display-xl font-grotesk text-foundation-900 mb-8">
            One System. Two Brands
          </h1>
        </AnimatedSection>

        <AnimatedSection className="max-w-2xl">
          <p className="text-body font-sans text-foundation-600">
            Without a shared system, two product teams were shipping inconsistent, inaccessible UIs
            with zero shared vocabulary. I partnered with a lead developer to audit the existing
            ecosystem, identify the risks, and build Acentra Health Design System from the ground
            up — a scalable system that unified tokens, components, and accessibility standards
            across Acentra Health&apos;s product suite.
          </p>
        </AnimatedSection>

        {/* Meta row */}
        <AnimatedSection>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-body-sm font-sans text-foundation-500">
            <div>
              <span className="text-label font-grotesk uppercase tracking-widest block mb-1">Role</span>
              Lead UX Designer
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div>
              <span className="text-label font-grotesk uppercase tracking-widest block mb-1">Timeline</span>
              2023 – 2024
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div>
              <span className="text-label font-grotesk uppercase tracking-widest block mb-1">Company</span>
              Acentra Health
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  )
}
