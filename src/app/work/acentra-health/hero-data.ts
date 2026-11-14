// The case study's opening content, shared by the page and its hero previews.
// The outcomes under the title; `was` is what each one replaced, shown struck through. Sources:
// 2 weeks vs 6 months (Small Wins); WCAG 2.2 AA cross-checked with JAWS and WAVE, the old green at
// 4.37:1 (the audit); 119 components and 307 tokens (Figma library analytics,
// public/images/acentra-hero/Metrics.png, Oct 2026); 19K+ insertions by 5 project teams (Results).
export const heroMetrics: { n: string; label: string; was?: string }[] = [
  { n: '2 weeks', was: '6 months', label: 'to roll a new brand palette across the system' },
  { n: '100%', was: '4.37:1, fails AA', label: 'of components pass WCAG 2.2 AA, checked with JAWS and WAVE' },
  { n: '119', label: 'components, built on 307 design tokens' },
  { n: '19K+', label: 'insertions in 30 days, by 5 project teams' },
]

// The two brands the system served. Logos cropped from public/images/logos/Kepro.png and CNSI.jpg,
// white made transparent; `width` is at the 36px display height.
export const brands = [
  { name: 'Kepro', logo: '/images/logos/marks/kepro.webp', width: 127 },
  { name: 'CNSI', logo: '/images/logos/marks/cnsi.webp', width: 149 },
]

// The project facts, under the brief
export const facts = [
  { k: 'Role', v: 'Lead designer' },
  { k: 'Team', v: 'Me and a lead developer' },
  { k: 'Focus', v: 'Tokens · Accessibility · Design ops' },
  { k: 'Timeline', v: '8 months · 2024' },
]

export const description =
  "Without a shared system, two product teams were shipping inconsistent, inaccessible UIs with zero shared vocabulary. I partnered with a lead developer to audit the existing ecosystem, identify the risks, and build Acentra Health Design System from the ground up — a scalable system that unified tokens, components, and accessibility standards across Acentra Health's product suite."

// The targets leadership set, and what the system reached: all that was left of the old 02 Goals
// table once the hero carried the results (Nov 7 2026). AA stays out until Michael confirms its
// timeline (the table said 60% in month one, the hero says 100%). 50% is the developers' estimate.
export const targets =
  "Leadership asked for 2–3 products on the system and a 30% faster design-to-dev handoff. We reached 5 project teams, and the developers estimate handoff got 50% faster."
