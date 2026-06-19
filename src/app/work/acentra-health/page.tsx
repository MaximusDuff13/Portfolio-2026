import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { BrowserMockup } from '@/components/BrowserMockup'

const auditQuote =
  'Before building the design system, I partnered with a lead developer to audit the ecosystem — reviewing Figma libraries, component structures, and design workflows to understand what was blocking progress.'

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
  {
    title: 'Accessibility Risk',
    description: 'Existing color combinations failed WCAG contrast minimums, creating legal and usability risk across the product suite.',
    src: '/images/audit/Accessibility.png',
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

function Dot() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-foundation-400 flex-shrink-0">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="2" fill="currentColor" />
    </svg>
  )
}

export default function AcentraHealthPage() {
  return (
    <main className="min-h-screen bg-body">

      {/* Dark hero */}
      <section className="bg-foundation-900 px-section pt-20 pb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">

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
        <section className="relative z-10 px-section pt-section pb-10">
          <div className="max-w-5xl mx-auto">
            <BrowserMockup src="/videos/acentra-health.mp4" url="acentrahealth.com/design-system" />
          </div>
        </section>
      </div>

      {/* Case study grid */}
      <div className="px-section pb-section">
        <div className="max-w-7xl mx-auto">

          {/* Meta */}
          <AnimatedSection>
            <h2 className="text-[32px] leading-[1.15] tracking-[-0.02em] font-grotesk text-foundation-900 mb-6 mt-section">
              About this Project
            </h2>
            <section className="grid grid-cols-3 border border-border">
              {meta.map(({ label, items }, i) => (
                <div key={label} className={`bg-body px-10 py-8 ${i > 0 ? 'border-l border-border' : ''}`}>
                  <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest mb-5">{label}</p>
                  <div className="flex flex-col gap-3">
                    {items.map(item => (
                      <span key={item} className="inline-flex items-center gap-2 text-body font-sans text-foundation-800">
                        <Dot />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </AnimatedSection>

          {/* Divider */}
          <div className="border-t border-border mt-section" />

          {/* Audit & Findings */}
          <AnimatedSection>
            <div className="grid grid-cols-12 gap-0">

              {/* Quote column */}
              <div className="col-span-3 pr-10 pt-10 pb-10 border-r border-border flex flex-col gap-4">
                <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">Audit</p>
                <p className="text-body-sm font-sans text-foundation-600 italic">{auditQuote}</p>
              </div>

              {/* Bento grid */}
              <div className="col-span-9 pl-10 pt-10 pb-10 flex flex-col gap-4">
                {/* Hero — Accessibility Risk */}
                <div className="flex flex-col gap-3">
                  <div className="w-full rounded border border-border overflow-hidden bg-foundation-900 h-72">
                    <img
                      src={auditFindings[2].src}
                      alt={auditFindings[2].title}
                      className="w-full h-full object-cover object-center block"
                    />
                  </div>
                  <div>
                    <p className="text-body-sm font-grotesk font-medium text-foundation-900 mb-0.5">{auditFindings[2].title}</p>
                    <p className="text-[13px] leading-snug font-sans text-foundation-600">{auditFindings[2].description}</p>
                  </div>
                </div>

                {/* Two smaller cards */}
                <div className="grid grid-cols-2 gap-4">
                  {auditFindings.slice(0, 2).map(f => (
                    <div key={f.title} className="flex flex-col gap-3">
                      <div className="w-full rounded border border-border overflow-hidden bg-foundation-900">
                        <img src={f.src} alt={f.title} className="w-full h-auto block" />
                      </div>
                      <div>
                        <p className="text-body-sm font-grotesk font-medium text-foundation-900 mb-0.5">{f.title}</p>
                        <p className="text-[13px] leading-snug font-sans text-foundation-600">{f.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </AnimatedSection>

        </div>
      </div>

    </main>
  )
}
