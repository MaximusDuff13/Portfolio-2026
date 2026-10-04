// OPTION 4 — reversed: Next steps first, What I learned second, so the case study ends on the
// personal reflection rather than the roadmap.
//
// LAYOUT. The page's margin rail, as Problem, MVP focus, Impact and Process use it: a 12-column
// grid, the section name in 3 columns as a margin label (ProblemSection's accent italic), the
// content in the other 9. Two rows, a hairline between them. Below md the label stacks above its
// content.
//
// TOKENS. Margin labels font-accent accent-italic text-heading-m foundation-900; list and prose
// font-sans text-body foundation-700, held to max-w-lg; list markers foundation-500.
import { learned, learnedHeading, nextHeading, nextSteps } from './content'
import { HEADING, ITEM, LIST, PARA, PROSE, SECTION, WRAP } from './shared'

const ROW = 'grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-12'

export function Option4() {
  return (
    <section data-closing="" className={SECTION}>
      <div className={WRAP}>
        <div data-next="" className={ROW}>
          <h2 className={`${HEADING} md:col-span-3`}>{nextHeading}</h2>
          <ol className={`${LIST} max-w-lg md:col-span-9`}>
            {nextSteps.map((s) => (
              <li key={s} className={ITEM}>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <div data-learned="" className={`${ROW} mt-section border-t border-border pt-section`}>
          <h2 className={`${HEADING} md:col-span-3`}>{learnedHeading}</h2>
          <div className={`${PROSE} md:col-span-9`}>
            {learned.map((p) => (
              <p key={p} className={PARA}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
