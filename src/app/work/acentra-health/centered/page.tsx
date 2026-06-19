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

export default function AcentraHealthCenteredPage() {
  return (
    <main className="min-h-screen bg-body">
      {/* Layout switcher */}
      <div className="px-section pt-6 flex gap-4 text-ui-chrome font-sans text-foundation-400">
        <Link href="/work/acentra-health" className="hover:text-foundation-900 transition-colors">A — Editorial Split</Link>
        <Link href="/work/acentra-health/dark" className="hover:text-foundation-900 transition-colors">B — Dark Hero</Link>
        <span className="text-foundation-900 font-medium">C — Centered</span>
      </div>

      {/* Hero — centred, full-bleed dark band */}
      <section className="bg-foundation-900 mt-6 px-section py-20 text-center">
        <AnimatedSection>
          <span className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
            Case Study · Design Systems
          </span>
        </AnimatedSection>

        <AnimatedSection>
          <h1 className="text-display-xl font-grotesk text-body mt-6 mx-auto">
            One System. Two Brands
          </h1>
        </AnimatedSection>
      </section>

      {/* Description + meta — light bg, centred */}
      <section className="px-section py-section max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <BackLink href="/" label="Work" />
        </div>

        <AnimatedSection>
          <p className="text-body font-sans text-foundation-600">
            {description}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-12 pt-8 border-t border-border flex flex-wrap justify-center items-center gap-8 text-body-sm font-sans text-foundation-500">
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
