// Impact — right after MVP focus, in the same full-width shape as Problem and MVP focus (Nov 24
// 2026, Michael picked I2 from /dev/impact): label, heading, one-line description, three result
// cards, then the Program Director's two quotes side by side (since Nov 25).
//
// THE NUMBERS (Michael, Nov 24 2026):
//   Time      1 week for mapping & transformation up to the state's review; was close to 6 weeks.
//   People    1 engineer + 1 reviewer per implementation; was 4 to 5 engineers.
//   Coverage  ~890 of 1,200 target columns at high confidence, in ONE implementation. Another came
//             in around 560 because of issues in its source data, so the figure always says
//             "in one implementation".
// "2 programs ran real conversions" is not here: the hero carries it.
//
// THE QUOTES stay verbatim. Under the results quote, one caption (Michael, Nov 25 2026) says what its
// 24 work hours cover; the hero now says the same 24 hours.
//
// NO LEADING RULE. MVP focus closes on its own `mt-section border-t border-border`, so that
// hairline is already the divider between the two sections.
import { AnimatedSection } from '@/components/AnimatedSection'
import { StopwatchDoodle, TeamsDoodle, ProgramsDoodle } from '@/components/Doodles'

// The doodles' ink, the same ginger the hero figures use.
const INK = '#b15900'
const LABEL = 'text-label font-sans text-foundation-500 uppercase tracking-widest'

const stats = [
  { key: 'Time', n: '1 week', line: 'for mapping & transformation, up to the state’s review', was: 'Was close to 6 weeks', art: <StopwatchDoodle ink={INK} />, tint: 'bg-stage-straw' },
  { key: 'People', n: '1 + 1', line: 'one engineer and one reviewer per implementation', was: 'Was 4 to 5 engineers', art: <TeamsDoodle ink={INK} />, tint: 'bg-stage-sage' },
  { key: 'Coverage', n: '~890', line: 'of 1,200 target columns mapped at high confidence, in one implementation', was: 'The rest flagged for a person to check', art: <ProgramsDoodle ink={INK} />, tint: 'bg-stage-ginger' },
]

/* THE QUOTES (Nov 25 2026, Michael: all the quotes in one place, under Impact). Both are Pradeep
   Jain's, verbatim, so they sit side by side with the attribution once: one on the results, one on
   the design (it was the Testimonial section before the closing, now removed). */
const quotes = [
  { about: 'On the results', text: '“We have started using AI-based conversion mapping and were able to produce the first mapping sheet in just 24 hours. This is a significant step forward, considering that the same effort would traditionally take approximately 2 to 3 weeks.”', note: '24 work hours from creating the project to a reviewed mapping sheet: set up the schema, upload the data dictionary in Schema & Wiki, let the AI generate the mapping sheet, then check and update the details.' },
  { about: 'On the design', text: '“Michael’s UX design skills are truly impressive. He brings forward creative ideas and different approaches to the product, constantly reminding us how much creativity goes into great UI/UX design.”' },
]
const quoteRole = 'Pradeep Jain, Program Director'

export function Impact() {
  return (
    <section className="px-6 sm:px-10 lg:px-section pb-section">
      <div className="max-w-6xl mx-auto pt-section">
        <AnimatedSection>
          <h2 className="m-0 font-display accent-italic text-heading-m text-foundation-900">Impact</h2>
          <p className="mt-4 max-w-2xl font-display text-heading-l font-medium leading-[1.15] tracking-[-0.02em] text-foundation-900">
            Ready for the state’s review in <span className="text-accent-warm">a week</span>
          </p>
          <p className="mt-4 max-w-2xl text-body font-sans text-foundation-500">
            The MVP drafts each mapping and its transformation rule. A person checks and confirms each one instead of
            writing it from scratch.
          </p>
        </AnimatedSection>

        {/* The results, one stage card each. A <dl> per card: the label names its figure. */}
        <AnimatedSection>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {stats.map((s) => (
              <dl key={s.key} className={`m-0 flex flex-col rounded-2xl ${s.tint} p-6 sm:p-8`}>
                <div className="flex items-start justify-between gap-4">
                  <dt className={LABEL}>{s.key}</dt>
                  {s.art}
                </div>
                <dd className="m-0 mt-4 font-display font-medium text-accent-warm" style={{ fontSize: 'clamp(40px, 4.4vw, 60px)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {s.n}
                </dd>
                <dd className="m-0 mt-3 text-body-sm font-sans text-foundation-800">{s.line}</dd>
                <dd className="m-0 mt-auto pt-4 text-caption font-sans text-foundation-600">{s.was}</dd>
              </dl>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <figure className="m-0 mt-14">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
              {quotes.map((q) => (
                <div key={q.about}>
                  <p className={`m-0 ${LABEL}`}>{q.about}</p>
                  <blockquote className="m-0 mt-3 font-display accent-italic text-[22px] leading-[1.35] text-foundation-900 sm:text-heading-m sm:leading-[1.35]">
                    {q.text}
                  </blockquote>
                  {'note' in q && q.note && <p className="m-0 mt-3 text-caption font-sans text-foundation-500">{q.note}</p>}
                </div>
              ))}
            </div>
            <figcaption className="mt-8 font-sans text-body-sm font-medium text-foundation-600">— {quoteRole}</figcaption>
          </figure>
        </AnimatedSection>
      </div>
    </section>
  )
}
