// OPTION 3 — the reflection as the centrepiece. What I learned in larger type, text-heading-m
// (24px), in a constrained column centred on the page (max-w-2xl, 672px), the text itself left-
// aligned: four centred paragraphs would be hard to read. The opening sentence is in the accent
// italic, as the page's statements are; the other three in the body face at font-normal. Next
// steps is a small, quiet list underneath, body-sm, after a hairline: deliberately unequal weight,
// so the page ends on the personal note's scale, not the roadmap's.
//
// LINE HEIGHT. heading-m carries 1.20, a heading's leading; for four paragraphs of prose that is
// too tight, so they take Tailwind's built-in leading-normal (1.5). Not a new token.
//
// TOKENS. Labels text-label grotesk uppercase foundation-500; reflection text-heading-m, first
// paragraph font-accent accent-italic foundation-900, the rest font-sans font-normal
// foundation-800 (14.7:1); list font-sans text-body-sm foundation-600 (7.4:1), markers
// foundation-500.
import { learned, learnedHeading, nextHeading, nextSteps } from './content'
import { LABEL, SECTION, WRAP } from './shared'

export function Option3() {
  const [opening, ...rest] = learned
  return (
    <section data-closing="" className={SECTION}>
      <div className={WRAP}>
        <div className="mx-auto max-w-2xl">
          <div data-learned="">
            <h2 className={LABEL}>{learnedHeading}</h2>
            <div className="mt-10 flex flex-col gap-8">
              <p className="m-0 font-accent accent-italic text-heading-m leading-normal text-foundation-900">{opening}</p>
              {rest.map((p) => (
                <p key={p} className="m-0 font-sans text-heading-m font-normal leading-normal tracking-normal text-foundation-800">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div data-next="" className="mt-section border-t border-border pt-8">
            <h2 className={LABEL}>{nextHeading}</h2>
            <ol className="m-0 mt-6 flex list-decimal flex-col gap-3 pl-5 marker:text-foundation-500">
              {nextSteps.map((s) => (
                <li key={s} className="pl-1 font-sans text-body-sm text-foundation-600">
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
