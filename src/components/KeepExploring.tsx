import { AnimatedSection } from '@/components/AnimatedSection'

export type MoreWorkItem = {
  title: string
  category: string
  desc: string
  href: string
  /** cover image; when set it unfolds below the text on hover */
  img?: string
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className={className}>
      <path d="M5 11h11M12 6l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* The closing case-study index shared by every case study. Small labels and the arrow are
   foundation-500 (4.6:1 on the cream ground); foundation-400/300 measured 2.44:1 and 1.44:1.
   Cards stretch to equal height. */
export function KeepExploring({ items }: { items: MoreWorkItem[] }) {
  return (
    <section className="px-6 sm:px-10 lg:px-section pb-section">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="border-t border-border pt-section">
            <div className="mb-10">
              <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest mb-3">More Case Studies</p>
              <div className="w-8 h-px bg-accent-warm mb-6" />
              <h2 className="text-heading-l font-grotesk text-foundation-900">Keep exploring</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
              {items.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="group rounded-lg border border-border p-6 sm:p-8 flex flex-col transition-colors hover:border-foundation-900"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-label font-grotesk uppercase tracking-widest text-foundation-500">{p.category}</span>
                    <ArrowRight className="shrink-0 text-foundation-500 group-hover:text-accent-warm group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-heading-m font-grotesk text-foundation-900 group-hover:text-accent-warm transition-colors">{p.title}</p>
                  <p className="text-body-sm font-sans text-foundation-600 mt-3">{p.desc}</p>
                  {p.img && (
                    /* cover unfolds below the text on hover (grid-rows trick = smooth height animation) */
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                      <div className="overflow-hidden">
                        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
                          <img src={p.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
