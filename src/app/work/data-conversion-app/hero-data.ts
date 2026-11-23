import type { Facts } from '@/components/BriefFacts'
import type { HeroMetric } from '@/components/HeroMetrics'

// The case study's opening content, in the Acentra Health hero's shape (Nov 23 2026): the outcomes
// under the title, each with one supporting line, then the brief and its four facts.
// Two figures, Michael's primary results (Nov 23 2026): the first mapping sheet and real use.
// Sources: 30 mins from project setup to the first mapping sheet (Michael, Nov 23 2026; the Program
// Director's 24 hours in Impact was the first run); 2 to 3 weeks before, from that quote; 2 programs
// is Impact's Real use.
export const heroMetrics: HeroMetric[] = [
  { n: '30 mins', label: 'to set up a project and get its first mapping sheet', note: 'Was 2 to 3 weeks by hand in Excel' },
  { n: '2', label: 'programs ran real conversions on the MVP', note: 'Before any visual polish' },
]

// The project facts, with the brief (BriefFacts). From the old hero sidebar.
export const facts: Facts = {
  role: 'Sole product designer',
  team: 'Me + 1 engineer',
  teamNote: 'With the AI Center of Excellence and Program Implementation',
  focus: ['Journey mapping', 'Information architecture', 'AI review flows'],
  time: '2 weeks of design',
  timeNote: 'Inside a 1-month MVP, August 2026',
}

// DRAFT brief, built from Michael's own hero and Problem copy; his rewrite replaces it.
export const description =
  'Every new state program meant mapping its old data onto ours by hand: 4 to 5 people, 4 to 6 weeks in Excel. As the sole designer, with one frontend engineer and the AI Center of Excellence, I designed an MVP where the AI drafts the mappings and people review and correct them.'
