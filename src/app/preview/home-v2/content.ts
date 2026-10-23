// TEMPORARY — /preview/home-v2 harness: seven non-newspaper home page approaches. The one
// source of copy and media for all seven, so they differ only in design. Every fact comes from
// the live site (root metadata and the two case study pages). Note: the Acentra Health figures
// come from that page's Results section, which is still marked as a draft.

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
  schema: dcaDir + 'project-hub/schema-wiki-success.png',
  after: '/images/beforeafter/After.png',
  audit: '/images/audit/Color%20Audit.png',
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

// The seven approaches, for the index page and each page's switcher. `from` names the
// portfolios or patterns each one learns from.
export const approaches = [
  {
    n: 1,
    name: 'The Index',
    idea: 'One quiet column and a list of work. Hover a row and a preview floats beside your cursor.',
    from: 'Design-engineer sites: rauno.me, paco.me, emilkowal.ski',
  },
  {
    n: 2,
    name: 'Statement',
    idea: 'One big sentence about what you do, revealed line by line, then the two case studies large, with gentle parallax.',
    from: 'Editorial product sites; Eszter Bial’s “every animation earns its place”',
  },
  {
    n: 3,
    name: 'Split',
    idea: 'Name, intro and navigation pinned on the left. The work scrolls on the right and the navigation follows along.',
    from: 'Brittany Chiang; Adham Dannaway’s split screen',
  },
  {
    n: 4,
    name: 'Bento',
    idea: 'A grid of tiles: work, numbers, quote, contact. Tiles rise in, figures count up, a soft light follows the cursor.',
    from: 'Bento grids from Apple and read.cv-style profiles',
  },
  {
    n: 5,
    name: 'Gallery',
    idea: 'Scrolling down moves a strip of work sideways. Pictures start in greyscale and come into colour as they arrive.',
    from: 'Michaella Twersky’s black-and-white-to-colour hover; horizontal gallery sites',
  },
  {
    n: 6,
    name: 'Canvas',
    idea: 'The home page is a design file: work as frames on a dotted canvas, and a cursor called Michael at work on it.',
    from: 'The Figma canvas, as a signature idea people can describe in one sentence',
  },
  {
    n: 7,
    name: 'Specimen',
    idea: 'A design system specimen sheet. Tokens, type scale and components introduce you, and the case studies are the components.',
    from: 'Design system documentation sites; Carbon and Polaris',
  },
]
