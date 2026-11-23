import type { Facts } from '@/components/BriefFacts'
import type { HeroMetric } from '@/components/HeroMetrics'

// The case study's opening content, shared by the page and its hero previews.
// The outcomes under the title, each with one supporting line (`note`). Sources: 2 weeks vs the old
// 6-month estimate (the rebrand, in Results); WCAG 2.2 AA cross-checked with JAWS and WAVE; 39
// components (Michael, Nov 22 2026; Figma's 119 also counts variants) and 307 tokens (Figma library
// analytics, Metrics.png, Oct 2026); 5 teams, on 2 major product modules and 5 to 6 internal tools
// today (Michael, Nov 22 2026; leadership's 2–3 was products, so it isn't set against teams). 19K+
// insertions went on Nov 22 2026: Figma's own strip says 1.2k a week, about 5k a month.
export const heroMetrics: HeroMetric[] = [
  { n: '2 weeks', label: 'to roll out a new brand palette', note: 'Old estimate: 6 months' },
  { n: '100%', label: 'of components pass WCAG 2.2 AA', note: 'Checked with JAWS and WAVE' },
  { n: '39', label: 'components, in Figma and code', note: 'Built on 307 design tokens' },
  { n: '5 teams', label: 'adopted the system', note: '2 product modules, 5+ internal tools' },
]

// The two brands the system served. Logos cropped from public/images/logos/Kepro.png and CNSI.jpg,
// white made transparent; `width` is at the 36px display height. Kepro.png is clipped: the missing edge of
// its last o was rebuilt in kepro.webp by mirroring the letter (Nov 22 2026).
export const brands = [
  { name: 'Kepro', logo: '/images/logos/marks/kepro.webp', width: 129 },
  { name: 'CNSI', logo: '/images/logos/marks/cnsi.webp', width: 149 },
]

// The project facts, with the brief (BriefFacts)
export const facts: Facts = {
  role: 'Lead designer',
  team: '2 people',
  teamNote: 'A designer and a lead developer',
  focus: ['Design tokens', 'Accessibility', 'Design ops'],
  // the pace (Michael, Nov 22 2026); "8 months · 2024" was unconfirmed and went
  time: '2-week sprints',
  timeNote: '2–3 components in each',
}

// Michael's approved brief (Nov 22 2026): says the merger and Carbon; replaced "from the ground up",
// which contradicted 02, and the targets line.
export const description =
  'When Kepro and CNSI merged into Acentra Health, their products looked inconsistent and weren’t accessible. With a lead developer, I audited both and built one design system, AHDS, on IBM’s Carbon, with shared tokens, components and accessibility standards.'
