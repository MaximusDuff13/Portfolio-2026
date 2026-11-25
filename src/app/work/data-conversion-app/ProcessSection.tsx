// Process — after Impact, in the full-width shape Problem, MVP focus and Impact use (Nov 24 2026,
// Michael picked P1 from /dev/process): label, heading, one-line description, the timeline card at
// full width, then Where AI helped. (Nov 25 2026: Michael removed the principles row under the
// timeline, after the audit flagged "learn the backend" said three times.)
//
// SPACING. Opens on its own hairline (Impact pads its own bottom by 80px, the space above the rule;
// pt-section is the 80px below it) and pads its own bottom by 80px for the features below.
import { Sparkles } from 'lucide-react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { ProcessTimeline } from '@/components/ProcessTimeline'

const phases = [
  { label: 'Stakeholder discovery', items: ['Data engineers', 'Project owners', 'AI CoE'] },
  { label: 'Information architecture', items: ['Touchpoints across the journey', 'How conversion works, end to end', 'Where AI could summarise and simplify'] },
  { label: 'Design', items: ['Concepts in Claude Design', 'Final UI in Figma, with our design system'] },
  { label: 'Dev + testing', items: ['Partnered with the dev team through build and testing'] },
]

/* WHERE AI HELPED (Nov 25 2026, Michael picked A2 from /dev/ai-layouts): one sky card per stage, the
   tools by name, what AI did, what Michael did. Every fact is Michael's own. Sky is the colour of
   AI-in-my-process on this page: the 'where AI helped' sticky notes in the design steps match it. */
// Nov 25: the contrast with 01 Requirements (the approved screen was AI-built with no flow behind it).
const aiJudgment = 'The first approved screen was built by AI, with no user flow behind it. I flipped that: people and flows first, then AI for fast drafts. Every call and sign-off stayed with people.'

// Michael's facts (Nov 25), trimmed Nov 25 night after the audit: one short line each for AI and Me.
const aiStrip = [
  { phase: 'Discovery', figure: '4 sessions · 3 hrs of recordings → key points', tools: ['ChatGPT Enterprise'], ai: 'Summarised each recording into key points.', me: 'Ran the sessions, then asked sharper follow-ups.' },
  { phase: 'Flows', figure: '~1.5 days → ~1 hr to final flows', tools: ['Figma AI', 'ChatGPT'], ai: 'Drafted flows and polished the approved visual.', me: 'Built the journey maps and got the flows approved.' },
  { phase: 'Design', figure: '3 concepts in 1 day for the mapping screen', tools: ['Claude Design'], ai: 'Turned my flow into three layouts.', me: 'Picked one and built it in Figma with our design system.' },
  { phase: 'Copy & content', figure: '~1,200 columns of realistic sample data', tools: ['ChatGPT Enterprise', 'Custom GPT', 'Figma AI'], ai: 'Drafted copy, illustrations and sample data.', me: 'Set up the custom GPT, edited the copy, got sign-off.' },
]

export function ProcessSection() {
  return (
    <section className="px-6 sm:px-10 lg:px-section pb-section">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-border pt-section">
          <AnimatedSection>
            <h2 className="m-0 font-display accent-italic text-heading-m text-foundation-900">Process</h2>
            <p className="mt-4 max-w-2xl font-display text-heading-l font-medium leading-[1.15] tracking-[-0.02em] text-foundation-900">
              People first, then screens
            </p>
            <p className="mt-4 max-w-2xl text-body font-sans text-foundation-500">
              From sitting with the people who do the work, to building and testing with the dev team.
            </p>
            <div className="mt-10">
              <ProcessTimeline title="Process overview" phases={phases} />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div id="ai" data-toc-section className="mt-16">
              <p className="m-0 flex items-center gap-2 font-display text-heading-m font-medium text-foundation-900">
                <Sparkles aria-hidden="true" size={20} strokeWidth={1.75} />Where AI helped
              </p>
              <p className="m-0 mt-2 max-w-2xl font-sans text-body text-foundation-500">{aiJudgment}</p>
              <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
                {aiStrip.map((c) => (
                  <li key={c.phase} className="rounded-2xl bg-stage-sky p-5">
                    <p className="m-0 font-sans text-label uppercase tracking-widest text-foundation-600">{c.phase}</p>
                    <p className="m-0 mt-2 font-display text-[20px] font-medium leading-[1.2] text-foundation-900">{c.figure}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.tools.map((t) => (
                        <span key={t} className="rounded-full bg-white px-2.5 py-0.5 font-sans text-[13px] text-foundation-900 ring-1 ring-foundation-900/10">{t}</span>
                      ))}
                    </div>
                    <p className="m-0 mt-4 font-sans text-body-sm text-foundation-700"><span className="font-medium text-foundation-900">AI: </span>{c.ai}</p>
                    <p className="m-0 mt-2 font-sans text-body-sm text-foundation-700"><span className="font-medium text-foundation-900">Me: </span>{c.me}</p>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
