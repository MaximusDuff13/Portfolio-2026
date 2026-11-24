'use client'
import { HOT, Stroke, useOnScreen } from './pen'

/* A chapter break (Nov 24 2026, Michael picked S4 from /dev/design-chapter): "Part one" or "Part
   two" and the chapter title centred between two rules, with a pen arrow curling down into what
   follows. The page has two: Part one, Understanding the work (Problem → Process), and Part two,
   Designing the app (the design features). The title is the chapter's h2.

   SPACING. pt-section above, so the break sits 80px under whatever ends before it; the arrow is
   the gap below it, and the section that follows opens without its own hairline. */
export function ChapterBreak({ part, title }: { part: string; title: string }) {
  const [ref, on] = useOnScreen<SVGSVGElement>()
  return (
    <section className="px-6 sm:px-10 lg:px-section pt-section">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6">
          <span aria-hidden="true" className="h-px flex-1 bg-foundation-900/20" />
          <div className="text-center">
            <p className="m-0 font-sans text-label uppercase tracking-widest text-accent-warm">{part}</p>
            <h2 className="m-0 mt-3 font-display accent-italic text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-foundation-900 sm:text-display-xl">
              {title}
            </h2>
          </div>
          <span aria-hidden="true" className="h-px flex-1 bg-foundation-900/20" />
        </div>
        <div className="mt-4 flex justify-center">
          <svg ref={ref} viewBox="0 0 80 110" width={64} height={88} className="cs-markup overflow-visible" aria-hidden="true" data-on={on || undefined}>
            <Stroke d="M 10 6 C 60 10, 72 40, 50 60 C 34 74, 34 92, 44 104" ink={HOT} w={3} />
            <Stroke d="M 32 94 L 44 106 L 54 92" ink={HOT} w={3} delay={500} />
          </svg>
        </div>
      </div>
    </section>
  )
}
