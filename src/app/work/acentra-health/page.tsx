import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'Acentra Health Design System — Michael Jerome',
  description:
    'How I built a scalable design system that unified tokens, components, and accessibility standards across two product teams.',
}

const description =
  "Without a shared system, two product teams were shipping inconsistent, inaccessible UIs with zero shared vocabulary. I partnered with a lead developer to audit the existing ecosystem, identify the risks, and build Acentra Health Design System from the ground up — a scalable system that unified tokens, components, and accessibility standards across Acentra Health’s product suite."

export default function AcentraHealthPage() {
  return (
    <main className="min-h-screen bg-body">
      {/* Dark hero */}
      <section className="bg-foundation-900 px-section pt-10 pb-16">
        <div className="mb-10 border-b border-foundation-800 pb-5">
          <span className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
            Case Study · Design Systems
          </span>
        </div>

        {/* Two-column editorial split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start max-w-6xl">
          <AnimatedSection>
            <h1 className="text-display-xl font-grotesk text-body">
              One System.<br />Two Brands
            </h1>
          </AnimatedSection>

          <AnimatedSection className="md:pt-3">
            <p className="text-body font-sans text-foundation-400">
              {description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Meta row — light bg */}
      <section className="px-section py-10 max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="flex flex-wrap items-center gap-8 text-body-sm font-sans text-foundation-500">
            <div>
              <span className="text-label font-grotesk uppercase tracking-widest block mb-1 text-foundation-400">Role</span>
              Lead UX Designer
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div>
              <span className="text-label font-grotesk uppercase tracking-widest block mb-1 text-foundation-400">Timeline</span>
              2023 – 2024
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div>
              <span className="text-label font-grotesk uppercase tracking-widest block mb-1 text-foundation-400">Company</span>
              Acentra Health
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  )
}
