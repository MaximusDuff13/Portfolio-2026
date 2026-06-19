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
      <section className="bg-foundation-900 px-section pt-20 pb-24">
        <div className="flex flex-col md:flex-row">

          {/* Left — title */}
          <div className="flex-1 md:pr-20 flex items-center">
            <AnimatedSection>
              <h1 className="text-display-xl font-grotesk text-body">
                One System.<br />Two Brands
              </h1>
            </AnimatedSection>
          </div>

          {/* Vertical divider — respects section padding */}
          <div className="hidden md:block w-px bg-foundation-600" />

          {/* Right — description */}
          <div className="flex-1 md:pl-20 flex items-center">
            <AnimatedSection>
              <p className="text-body font-sans text-foundation-300">
                {description}
              </p>
            </AnimatedSection>
          </div>

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
