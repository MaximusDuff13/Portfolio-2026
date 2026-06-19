import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { BrowserMockup } from '@/components/BrowserMockup'
import { FindingCard } from '@/components/FindingCard'
import { SectionHeader } from '@/components/SectionHeader'
import { PullQuote } from '@/components/PullQuote'

const auditQuote =
  'Before building the design system, I partnered with a lead developer to audit the ecosystem — reviewing Figma libraries, component structures, and design workflows to understand what was blocking progress.'

// The hero finding leads the bento grid; the two smaller findings sit below it.
const heroFinding = {
  title: 'Accessibility Risk',
  description: 'Existing color combinations failed WCAG contrast minimums, creating legal and usability risk across the product suite.',
  src: '/images/audit/Accessibility.png',
}

const auditFindings = [
  {
    title: 'Color Audit',
    description: 'Colors were hardcoded hex values with no shared tokens — every design change meant hunting across dozens of files.',
    src: '/images/audit/Color Audit.png',
  },
  {
    title: 'Text Styles',
    description: 'Typography was inconsistent. Non-brand fonts and ad-hoc sizes with no shared text styles across either product.',
    src: '/images/audit/Text Styles.png',
  },
]

export const metadata: Metadata = {
  title: 'Acentra Health Design System — Michael Jerome',
  description:
    'How I built a scalable design system that unified tokens, components, and accessibility standards across two product teams.',
}

const description =
  "Without a shared system, two product teams were shipping inconsistent, inaccessible UIs with zero shared vocabulary. I partnered with a lead developer to audit the existing ecosystem, identify the risks, and build Acentra Health Design System from the ground up — a scalable system that unified tokens, components, and accessibility standards across Acentra Health's product suite."

const meta = [
  { label: 'My Role',  items: ['Design Ops', 'Accessibility', 'Token Strategy'] },
  { label: 'Team',     items: ['1 Developer', 'Lead Designer'] },
  { label: 'Timeline', items: ['8 months', '2024'] },
]

export default function AcentraHealthPage() {
  return (
    <main className="min-h-screen bg-body">

      {/* Dark hero */}
      <section className="bg-foundation-900 px-section pt-section pb-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row">

          <div className="flex-1 md:pr-20 flex items-center">
            <AnimatedSection>
              <h1 className="text-display-2xl font-grotesk text-body">
                One System.<br />Two Brands
              </h1>
            </AnimatedSection>
          </div>

          <div className="hidden md:block w-px bg-foundation-600" />

          <div className="flex-1 md:pl-20 flex items-center">
            <AnimatedSection>
              <p className="text-body font-sans text-foundation-300">
                {description}
              </p>
            </AnimatedSection>
          </div>

        </div>
      </section>

      {/* Browser mockup — split dark/light background */}
      <div className="relative">
        <div className="absolute inset-0 top-0 h-1/2 bg-foundation-900" />
        <section className="relative z-10 px-section pt-section pb-0">
          <div className="max-w-6xl mx-auto">
            <BrowserMockup src="/videos/acentra-health.mp4" url="acentrahealth.com/design-system" />
          </div>
        </section>
      </div>

      {/* Case study grid */}
      <div className="px-section pb-section">
        <div className="max-w-6xl mx-auto">

          {/* Meta */}
          <AnimatedSection>
            <div className="mt-section mb-4 flex flex-col gap-3">
              <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                About this Project
              </p>
              <div className="w-8 h-px bg-accent-warm" />
            </div>
            <section className="border-t border-border">
              {meta.map(({ label, items }) => (
                <div key={label} className="grid grid-cols-12 gap-8 py-5 border-b border-border items-baseline">
                  <p className="col-span-2 text-label font-grotesk text-foundation-500 uppercase tracking-widest">{label}</p>
                  <p className="col-span-10 text-body font-sans text-foundation-800">
                    {items.map((item, idx) => (
                      <span key={item}>
                        {idx > 0 && <span className="text-foundation-300">{'  ·  '}</span>}
                        {item}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </section>
          </AnimatedSection>

          {/* Audit & Findings */}
          <AnimatedSection>
            <div className="grid grid-cols-12 gap-8">

              {/* Narrative column */}
              <div className="col-span-4 pr-8 pt-section pb-section border-r border-border">
                <SectionHeader
                  index="01"
                  eyebrow="Audit"
                  title="A Fragmented Foundation"
                  quote={auditQuote}
                />
              </div>

              {/* Bento grid */}
              <div className="col-span-8 pt-section pb-section flex flex-col gap-4">
                {/* Hero — Accessibility Risk */}
                <FindingCard variant="hero" {...heroFinding} />

                {/* Two smaller cards */}
                <div className="grid grid-cols-2 gap-4">
                  {auditFindings.map(f => (
                    <FindingCard key={f.title} {...f} />
                  ))}
                </div>
              </div>

            </div>
          </AnimatedSection>

          {/* Post-audit pull-quote — transition into the brief */}
          <div className="border-t border-border">
            <PullQuote>
              We presented these findings to leadership to align on the risks of the legacy path and the need for a scalable restart.
            </PullQuote>
          </div>

        </div>
      </div>

    </main>
  )
}
