// OPTION 5 — one continuous narrative. A single reading column (max-w-lg, centred in the wrap, the
// way the end of an essay sits), What I learned then Next steps in the same column, the same face
// and the same size, with no block or card around either. The only divider is a spacing shift and
// SectionHeader's short accent-warm mark (decorative) between them: 24px between paragraphs, 64px
// around the mark.
//
// TOKENS. Headings font-accent accent-italic text-heading-m foundation-900; prose and list
// font-sans text-body foundation-700; markers foundation-500; the mark accent-warm.
import { learned, learnedHeading, nextHeading, nextSteps } from './content'
import { HEADING, ITEM, LIST, PARA, SECTION, WRAP } from './shared'

export function Option5() {
  return (
    <section data-closing="" className={SECTION}>
      <div className={WRAP}>
        <div className="mx-auto max-w-lg">
          <div data-learned="">
            <h2 className={HEADING}>{learnedHeading}</h2>
            <div className="mt-8 flex flex-col gap-6">
              {learned.map((p) => (
                <p key={p} className={PARA}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div aria-hidden="true" className="my-16 h-px w-8 bg-accent-warm" />
          <div data-next="">
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
