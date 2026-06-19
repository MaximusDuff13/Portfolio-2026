import type { Metadata } from 'next'
import { BackLink } from '@/components/BackLink'
import { AnimatedSection } from '@/components/AnimatedSection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Acentra Health Design System — Michael Jerome',
  description:
    'How I built a scalable design system that unified tokens, components, and accessibility standards across two product teams.',
}

const description =
  "Without a shared system, two product teams were shipping inconsistent, inaccessible UIs with zero shared vocabulary. I partnered with a lead developer to audit the existing ecosystem, identify the risks, and build Acentra Health Design System from the ground up — a scalable system that unified tokens, components, and accessibility standards across Acentra Health's product suite."

export default function AcentraHealthDarkPage() {
  return (
    <main className="min-h-screen bg-body">
      {/* Layout switcher */}
      <div className="absolute top-6 right-section flex gap-4 text-ui-chrome font-sans text-foundation-400 z-10">
        <Link href="/work/acentra-health" className="hover:text-body transition-colors">A — Editorial Split</Link>
        <span className="text-body font-medium">B — Dark Hero</span>
        <Link href="/work/acentra-health/centered" className="hover:text-body transition-colors">C — Centered</Link>
      </div>

      {/* Dark hero — full bleed */}
      <section className="relative bg-foundation-900 px-section pt-10 pb-16">
        <BackLink href="/" label="Work" />

        <div className="mt-12 mb-10 border-b border-foundation-800 pb-5">
          <span className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
            Case Study · Design Systems
          </span>
        </div>

        <AnimatedSection>
          <h1 className="text-display-xl font-grotesk text-body max-w-3xl">
            One System.<br />Two Brands
          </h1>
        </AnimatedSection>

        <AnimatedSection className="max-w-2xl mt-8">
          <p className="text-body font-sans text-foundation-400">
            {description}
          </p>
        </AnimatedSection>

        {/* Bottom gradient fade to light */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-body pointer-events-none" />
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
