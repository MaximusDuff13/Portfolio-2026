// OPTION 2 — stacked, full width. What I learned first, its prose held to max-w-lg rather than
// running edge to edge; Next steps below it in a card, the page's existing light card (FigureCard's
// shape: foundation-100, border-border, rounded-lg, p-8 / md:p-12), at max-w-3xl.
//
// TOKENS. Headings font-accent accent-italic text-heading-m foundation-900; prose font-sans
// text-body foundation-700. Inside the card: list text foundation-700 (9.9:1 on foundation-100)
// and markers foundation-600 (7.0:1): foundation-500 measures under 4.5:1 on that ground, and the
// numbers are text.
import { learned, learnedHeading, nextHeading, nextSteps } from './content'
import { HEADING, ITEM, PARA, PROSE, SECTION, WRAP } from './shared'

export function Option2() {
  return (
    <section data-closing="" className={SECTION}>
      <div className={WRAP}>
        <div data-learned="">
          <h2 className={HEADING}>{learnedHeading}</h2>
          <div className={`mt-8 ${PROSE}`}>
            {learned.map((p) => (
              <p key={p} className={PARA}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <div data-next="" className="mt-section max-w-3xl rounded-lg border border-border bg-foundation-100 p-8 md:p-12">
          <h2 className={HEADING}>{nextHeading}</h2>
          <ol className="m-0 mt-8 flex list-decimal flex-col gap-4 pl-5 marker:text-foundation-600">
            {nextSteps.map((s) => (
              <li key={s} className={ITEM}>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
