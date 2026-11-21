import { AnimatedSection } from '@/components/AnimatedSection'

export type MoreWorkItem = {
  title: string
  category: string
  desc: string
  href: string
  /** cover screenshot of that case study (the home page card's image) */
  img?: string
  /** its stage tint as a Tailwind class, as on the home page card (e.g. bg-stage-sky) */
  stage?: string
  /** a short facts line, e.g. "Product design · 2 weeks" */
  meta?: string
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className={className}>
      <path d="M5 11h11M12 6l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* The closing link to the next case study, shared by every case study. Layout B, "Next-project
   banner", picked Nov 22 2026 (over the heading-and-card-below it replaced, a side-by-side row and
   a big-type link): one wide card per project on its home-card stage tint, the title and "Read the
   case study" on the left, its cover screenshot rising from the right edge and lifting on hover.
   On phones the screenshot sits under the text and bleeds off the card's bottom edge. Labels are
   foundation-700 on the tint. */
export function KeepExploring({ items }: { items: MoreWorkItem[] }) {
  return (
    <section id="more" className="px-6 sm:px-10 lg:px-section pb-section">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="flex flex-col gap-4 border-t border-border pt-section">
            {items.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className={`group relative block overflow-hidden rounded-2xl p-6 pb-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-warm sm:p-10 sm:pb-0 md:min-h-[380px] md:pb-10 ${p.stage ?? 'bg-stage-mist'}`}
              >
                <div className="relative z-10 md:max-w-[40%]">
                  <p className="m-0 text-label font-sans uppercase tracking-widest text-foundation-700">Next case study</p>
                  <p className="m-0 mt-4 font-display text-heading-xl text-foundation-900 transition-colors group-hover:text-accent-warm">{p.title}</p>
                  <p className="m-0 mt-3 font-sans text-body text-foundation-700">{p.desc}</p>
                  {p.meta && <p className="m-0 mt-3 font-sans text-caption text-foundation-700">{p.meta}</p>}
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-body-sm font-medium text-foundation-900">
                    Read the case study
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                  </span>
                </div>
                {p.img && (
                  <div className="pointer-events-none relative mt-8 -mb-10 transition-transform duration-500 ease-out group-hover:-translate-y-2 motion-reduce:transition-none md:absolute md:right-[-5%] md:top-12 md:mb-0 md:mt-0 md:w-[55%] md:-rotate-2 md:group-hover:-rotate-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt="" className="block w-full rounded-lg border border-border shadow-[0_2px_4px_rgba(52,44,20,0.08),0_24px_48px_-16px_rgba(52,44,20,0.35)]" />
                  </div>
                )}
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
