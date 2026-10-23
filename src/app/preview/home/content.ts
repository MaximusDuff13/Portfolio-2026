// TEMPORARY — /preview/home harness. The one source of copy and media for the home page. Every fact comes from the live site: the root metadata and the two
// case study pages. Nothing here is invented. Note: the Acentra Health figures come from that
// page's Results section, which is still marked as a draft.

export const person = {
  name: 'Michael Jerome',
  role: 'Senior UX Designer',
  focus: 'UX design and design systems',
}

const dcaDir = '/images/data-conversion-app/'

export const media = {
  dsVideo: '/videos/acentra-health.mp4',
  componentVideo: '/videos/Component-Video.mp4',
  mapping: dcaDir + 'mapping-variants/Mapping%20Variant%201%20Screen%201.png',
  journey: dcaDir + 'requirement-gathering/journey-map-horizontal.png',
  hub: dcaDir + 'project-hub/hub-project-completed.png',
  upload: dcaDir + 'schema-mapping/upload-and-prompt.png',
}

export const dca = {
  href: '/work/data-conversion-app',
  kicker: 'Data conversion · AI-assisted MVP',
  headline: 'The AI drafts the maps. People check them.',
  shortHeadline: 'Six weeks of Excel, done in one',
  deck: 'A step that took 4 to 5 people 4 to 6 weeks in Excel now takes one week.',
  body: [
    "Every time a state program moves onto Acentra Health's product, its legacy data has to be mapped, field by field, onto ours. A team of 4 to 5 people did it by hand in Excel, with no standard format.",
    'The Data Conversion App drafts those mappings and their transformation rules with AI. People review and correct them instead of writing each one from scratch, and every match shows how sure the AI is.',
    'Michael was the only designer on a one-month MVP, with one frontend engineer and the AI Center of Excellence team. The design took two weeks.',
  ],
  role: 'Sole product designer',
  when: 'August 2026',
  stats: [
    { figure: '1 week', label: 'down from 4 to 6 weeks' },
    { figure: '600', label: 'of 1,200 columns mapped at high confidence' },
    { figure: '2', label: 'programs ran real conversions' },
  ],
  quote:
    'We have started using AI-based conversion mapping and were able to produce the first mapping sheet in just 24 hours. This is a significant step forward, considering that the same effort would traditionally take approximately 2 to 3 weeks.',
  quoteBy: 'Pradeep Jain, Program Director',
}

export const ahds = {
  href: '/work/acentra-health',
  kicker: 'Design systems · 8 months · 2024',
  headline: 'Two product teams, one design language',
  shortHeadline: 'A brand update in two weeks, not six months',
  deck: 'Without a shared system, two product teams were shipping inconsistent, inaccessible UIs with zero shared vocabulary.',
  body: [
    'Michael partnered with a lead developer to audit the existing ecosystem, identify the risks, and build Acentra Health Design System from the ground up: tokens, components and accessibility standards, shared across the product suite.',
    'When marketing changed the colour scheme, the product team expected months of rework. Instead the whole primary palette moved in two weeks, in Figma and in Angular.',
  ],
  stats: [
    { figure: '19K+', label: 'component insertions in 30 days' },
    { figure: '5', label: 'product teams adopting' },
    { figure: '40+', label: 'components refreshed through tokens' },
    { figure: '2 weeks', label: 'brand update, vs 6 months before' },
  ],
}

export const stories = [dca, ahds]

