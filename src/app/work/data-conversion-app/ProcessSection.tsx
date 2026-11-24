// Process — after Impact, in the full-width shape Problem, MVP focus and Impact use (Nov 24 2026,
// Michael picked P1 from /dev/process): label, heading, one-line description, the timeline card at
// full width, then the four principles as a row underneath, one short line each.
//
// THE PRINCIPLES were cut to one line each. "Agree on what to cut" keeps only the MoSCoW detail:
// the delight/polish point lives in MVP focus, so it is not repeated here.
//
// SPACING. Opens on its own hairline (Impact pads its own bottom by 80px, the space above the rule;
// pt-section is the 80px below it) and pads its own bottom by 80px for the features below.
import { Users, ClipboardCheck, ListChecks, Eye } from 'lucide-react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { ProcessTimeline } from '@/components/ProcessTimeline'

const phases = [
  { label: 'Stakeholder discovery', items: ['Data analysts', 'Project owners', 'AI Center of Excellence'] },
  { label: 'Information architecture', items: ['Touchpoints across the journey', 'How conversion works, end to end', 'Where AI could summarise and simplify'] },
  { label: 'Design', items: ['Claude Design, using our design system', 'Figma for final polish'] },
  { label: 'Dev + testing', items: ['Partnered with the dev team through build and testing'] },
]

const principles = [
  { icon: Users, term: 'Start with the people', body: 'I mapped the journey with the analysts and project owners before any screens.' },
  { icon: ClipboardCheck, term: 'Learn the backend first', body: 'I sat with the AI Center of Excellence to see what their models actually did.' },
  { icon: ListChecks, term: 'Agree on what to cut', body: 'MoSCoW on each screen kept scope calls quick.' },
  { icon: Eye, term: 'Let the evidence argue', body: 'Testing showed the AI missed some business rules. That got the prompt field into scope.' },
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
            <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-x-8 gap-y-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {principles.map(({ icon: Icon, term, body }) => (
                <li key={term}>
                  <Icon aria-hidden="true" size={20} strokeWidth={1.5} className="text-accent-warm" />
                  <p className="m-0 mt-3 font-display text-body font-medium text-foundation-900">{term}</p>
                  <p className="m-0 mt-1 font-sans text-body-sm text-foundation-700">{body}</p>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
