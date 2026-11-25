import type { Facts } from '@/components/BriefFacts'
import type { HeroMetric } from '@/components/HeroMetrics'

// The case study's opening content, in the Acentra Health hero's shape (Nov 23 2026): the outcomes
// under the title, each with one supporting line, then the brief and its four facts.
// Two figures, Michael's primary results (Nov 23 2026): the first mapping sheet and real use.
// Sources (Michael, Nov 25 2026, replacing the earlier 30 mins): "First mapping sheet in 24 work
// hours, down from 3–6 weeks", split across the figure's three slots so the layout is unchanged. It
// now agrees with the Program Director's quote in Impact; the caption under that quote says what the
// 24 work hours cover. 2 programs is Impact's Real use.
export const heroMetrics: HeroMetric[] = [
  { n: '24 hrs', label: 'of work to the first mapping sheet', note: 'Down from 3–6 weeks' },
  { n: '2', label: 'programs ran real conversions on the MVP', note: 'Before any visual polish' },
]

// The project facts, with the brief (BriefFacts). Nov 23 2026: the tiles follow Michael's brief:
// '0 to 1' leads Focus, the team names the people, and the timeline leads with the MVP.
export const facts: Facts = {
  role: 'Sole product designer',
  team: 'Designer + engineer',
  teamNote: 'With the AI Center of Excellence and Program Implementation',
  focus: ['0 to 1 product', 'Journey mapping', 'AI review flows'],
  time: '1-month MVP',
  timeNote: '2 weeks of design, August 2026',
}

// The brief: Michael's points (Nov 23 2026), set in short plain sentences: a 0 to 1 product; a new
// program took 12 to 24 months to implement; inside that, 4 to 5 data engineers spent close to 6
// weeks matching our data structure to the outgoing system's and moving the data across; the app
// was built to cut that effort, in time and in people.
export const description =
  'A 0 to 1 product. Bringing a new state program onto Acentra Health took 12 to 24 months. Within that, 4 to 5 data engineers spent close to 6 weeks matching our data structure to the outgoing system’s, then moving the data across. The Data Conversion App was built to cut that effort, in both time and people.'
