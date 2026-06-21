'use client'
import { useState } from 'react'
import { SectionHeader } from './SectionHeader'
import { TabBar } from './TabBar'

const eyebrow = 'Cross-Team Collaboration & Governance'
// DRAFT title — the screenshot only has the eyebrow + body. Michael to finalize.
const title = 'Built with the teams who use it'
const intro =
  'Partnered with developers, designers, and stakeholders to build the design system foundation, run enablement walkthroughs, and establish a contribution/change strategy improving adoption, consistency, and long-term governance.'

type TeamKey = 'developers' | 'designers' | 'collaborators'
type Team = { key: TeamKey; label: string; img?: string; caption: string }

// DRAFT captions for Developers/Collaborators; Designers is from the screenshot.
// `img` is unset until the real per-tab screenshots land in /public/images/collab/.
const teams: Team[] = [
  {
    key: 'developers',
    label: 'Developers',
    caption:
      'Partnered with the design system developer to translate tokens and components into the Angular codebase — keeping Figma and production in 1:1 parity.',
  },
  {
    key: 'designers',
    label: 'Designers',
    caption:
      'Live enablement session: I led walkthroughs with designers on how to use the design system components and apply design tokens correctly in Figma to keep work consistent and implementation-ready.',
  },
  {
    key: 'collaborators',
    label: 'Collaborators',
    caption:
      'Worked with stakeholders to define a contribution and change-management strategy — request intake, versioning, and governance for long-term adoption.',
  },
]

function TabImage({ team }: { team: Team }) {
  // Real screenshots are dark Figma/UI captures, so the panel sits on foundation-900
  // (matches the project's "dark screenshots on dark" rule). Placeholder until images land.
  return (
    <div
      className="relative rounded-lg border border-border overflow-hidden bg-foundation-900"
      style={{ aspectRatio: '16 / 10' }}
    >
      {team.img ? (
        <img src={team.img} alt={team.caption} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-caption font-grotesk uppercase tracking-widest text-foundation-500">
            {team.label} · screenshot
          </span>
        </div>
      )}
    </div>
  )
}

export function CrossTeamCollab() {
  const [active, setActive] = useState<TeamKey>('designers')
  const team = teams.find((t) => t.key === active)!
  return (
    <section className="px-section pb-section">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-border pt-section">
          <SectionHeader index="08" eyebrow={eyebrow} title={title} />
          <p className="text-body font-sans text-foundation-600 mt-6 max-w-2xl">{intro}</p>

          <div className="mt-10 mb-4">
            <TabBar tabs={teams} active={active} onChange={setActive} layoutId="collab-tab-underline" />
          </div>

          <div className="mt-8">
            <TabImage team={team} />
            <p className="text-caption font-sans italic text-foundation-500 mt-4">{team.caption}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
