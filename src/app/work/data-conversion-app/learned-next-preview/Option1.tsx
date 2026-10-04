// OPTION 1 — two columns. What I learned as flowing paragraphs on the left (7 of 12 columns, the
// prose capped at max-w-lg), Next steps as a numbered list on the right (4 of 12, after a
// one-column gutter). Below md they stack, What I learned first.
//
// TOKENS. Headings font-accent accent-italic text-heading-m foundation-900; prose and list
// font-sans text-body foundation-700; list markers foundation-500.
import { learned, learnedHeading, nextHeading, nextSteps } from './content'
import { HEADING, ITEM, LIST, PARA, PROSE, SECTION, WRAP } from './shared'

export function Option1() {
  return (
    <section data-closing="" className={SECTION}>
      <div className={WRAP}>
        <div className="grid grid-cols-1 gap-y-section md:grid-cols-12">
          <div data-learned="" className="md:col-span-7">
            <h2 className={HEADING}>{learnedHeading}</h2>
            <div className={`mt-8 ${PROSE}`}>
              {learned.map((p) => (
                <p key={p} className={PARA}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div data-next="" className="md:col-span-4 md:col-start-9">
            <h2 className={HEADING}>{nextHeading}</h2>
            <ol className={`mt-8 ${LIST}`}>
              {nextSteps.map((s) => (
                <li key={s} className={ITEM}>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
