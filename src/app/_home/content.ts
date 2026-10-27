/* Home page content. Every word the home page shows, in one file, so the samples can be
   swapped without touching the layout.

   Real: the two case studies (title, duration, sections, status, description, images).
   Everything flagged `sample: true` is invented stand-in content and renders a dashed
   "Sample" tag wherever it shows. Noise-only items (articles, events, notifications, stats,
   stakeholder notes) are the design world's chatter, not claims about Michael, so they carry
   no tag. Nothing here may be presented as a real award, metric or press mention. */

import { links } from '@/data/links'

export const person = {
  name: 'Michael Jerome',
  role: 'Product designer',
  initials: 'MJ',
}

/* A value still to be supplied. The page renders it as a dashed "TODO" tag naming what goes
   there, never a guess. */
export type Todo = { todo: string }
export const todo = (hint: string): Todo => ({ todo: hint })
export const isTodo = (v: unknown): v is Todo => typeof v === 'object' && v !== null && 'todo' in v

/* The hero's text once the intro resolves. Two-tone statement like the loading state: the
   lead in foundation-900, the trail in foundation-500 (large text only). */
export const hero = {
  lead: 'I’m a product designer',
  trail: 'who makes complex products simple to use.',
  /** the part of the trail underlined by hand; must appear in `trail` */
  key: 'complex products simple to use',
  /** a handwritten aside under the name, pointing up at the painting */
  aside: 'that’s me up there, with the dog',
  body: 'I started as a business analyst, so I design with the data in mind. Seven years across analysis and design, five in UX.',
  contact: 'Get in touch',
}

/* The company strip under the hero: one `current`, the rest previous, newest first. `logo`
   is a path under /public; without one the first-letter tile stands in. */
export type Employer = {
  id: string
  name: string | Todo
  logo?: string
  current?: boolean
}

export const employers: Employer[] = [
  { id: 'company-a', name: todo('Company A'), current: true },
  { id: 'company-b', name: todo('Company B') },
  { id: 'company-c', name: todo('Company C') },
  { id: 'company-d', name: todo('Company D') },
]

export const headline = {
  lead: 'Michael Jerome takes complex, chaotic ideas',
  trail: 'and makes them simple.',
}

export const ctas = {
  primary: 'View selected work',
  secondary: 'About me',
}

export type CaseStudy = {
  kind: 'case'
  id: string
  href: string
  name: string
  company: string
  question: string
  description: string
  /** one short line for the unfolding card, always visible */
  summary?: string
  duration: string
  /** my role on the project */
  role: string | Todo
  status: string
  /** company logo under /public; without one the first-letter tile stands in */
  logo?: string
  image: { src: string; alt: string }
  /** the image is a stand-in, labelled on the card */
  mediaPlaceholder?: boolean
  /** the pale colour behind the image area, fading toward the bottom (cards that unfold) */
  stage?: string
  /** the same hue, stronger, for the ?tint=strong comparison */
  stageStrong?: string
  /** supporting screens that unfold around the cover on hover or focus (cards that unfold) */
  layers?: CardLayer[]
  /** variant E: the motion preset that tells this project's story, with its content */
  story?: Story
}

/* One supporting screen. Positions are in % of a 16:10 composition box (the whole stage when
   the card is stacked, centred in the taller stage when it is horizontal): x from its centre,
   y from its top. `rest` is where it waits, tucked behind the cover with one edge peeking out,
   or hidden below the bottom edge; `open` is where it settles once unfolded, turned up to 3deg.
   `width` is % of the box, `z` the stacking order (the cover is 2: z 1 fans out behind it, z 3
   overlaps a corner of it, never more than a third). Without `src` it shows a code-drawn
   placeholder screen, labelled. */
export type CardLayer = {
  src?: string
  alt?: string
  /** the kind of screen; drives the placeholder and says what to drop in */
  kind: 'dashboard' | 'form' | 'list' | 'detail'
  label: string
  rest: { x: number; y: number }
  open: { x: number; y: number; rotate: number }
  width: number
  z: number
}

/* Variant E (story motion): each case study tells its story with its own motion preset, picked
   by `story.preset`, so no two cards on a page move the same way (the preview warns if they do).
   The presets, the motion of each and what it does with reduced motion are in
   src/app/dev/cards/presets.tsx; /dev/cards?v=gallery shows all six.
   - deconstruct: components lift out of the cover to the margins, a redline back to each origin
   - drawer: the cover slides left; a review panel slides in from the right and checks off rows
   - scroll: a tall screenshot scrolls inside the cover's frame
   - wipe: a divider sweeps across the cover, from before to after
   - spread: three stacked phones fan out side by side, the steps of a flow
   - inset: an enlarged crop of one detail slides in, a line back to where it was taken from
   Every image slot (`Slot`) shows a labelled, code-drawn placeholder until it gets `src`. */
export type Story =
  | { preset: 'deconstruct'; parts: Part[] }
  | { preset: 'drawer'; title: string; rows: MappingRow[] }
  | { preset: 'scroll'; tall: Slot & { /** the screenshot's height / width */ ratio: number } }
  | { preset: 'wipe'; before: Slot; after: Slot }
  | { preset: 'spread'; phones: [Slot, Slot, Slot] }
  | { preset: 'inset'; crop: { x: number; y: number; w: number; label: string } }
export type Preset = Story['preset']

/** one image: real when it has `src`, a labelled placeholder until then */
export type Slot = { src?: string; alt?: string; label: string }

/* deconstruct: one component, lifted out of the cover. `origin` is where it sits on the cover's
   screen, in % of the screen; `at` is its top-left once out, in % of the 16:10 stage (x of the
   width, y of the height), `width` in % of the stage width. The redline leaves its left edge
   (`side: 'right'`, it sits right of the cover) or its top edge (`'below'`). Drawn in code from
   the home tokens until `src` (a transparent cut-out) replaces it. */
export type Part = {
  kind: 'button' | 'input' | 'checkbox' | 'swatches' | 'spacing'
  /** the redline's name for it, e.g. "Button / primary" */
  label: string
  origin: { x: number; y: number }
  at: { x: number; y: number }
  width: number
  side: 'right' | 'below'
  /** button or checkbox text, input value */
  text?: string
  /** swatches: the colours, left to right */
  colors?: string[]
  src?: string
  alt?: string
}

/** drawer: one mapping, source field to target field */
export type MappingRow = { source: string; target: string }

/* Placeholder slots, to be swapped for real screens by adding `src` (a WebP in
   public/images/<project>/cards/, 1280x800, 16:10, about 60KB; it shows inside a browser frame).
   Shown at most (stacked, 810 column): cover 531x332, screens 1-2 390x244, screen 3 343x214;
   in the live 648 column: cover 421x263, screens 1-2 309x193, screen 3 272x170. 1280x800
   stays sharp at 2x in every case. Each screen is cropped from its top-left:
   - Acentra 1, dashboard: a product overview built on the system (cards, a chart, nav)
   - Acentra 2, form: a form built from the system's inputs, with validation states
   - Acentra 3, detail: the component library or token page in Figma or Storybook
   - Data Conversion 1, list: the project hub's list of conversion projects
   - Data Conversion 2, detail: a mapping under review, source field to target with its rule
   - Data Conversion 3, form: upload and prompt, starting a new mapping
   Variant E's slots and their sizes are listed per preset in src/app/dev/cards/presets.tsx. */

export const caseStudies: CaseStudy[] = [
  {
    kind: 'case',
    id: 'acentra',
    href: links.caseStudy.acentraDesignSystem,
    name: 'Acentra Health Design System',
    company: 'Acentra Health',
    question: 'Can one design system keep a complex product consistent?',
    description: 'Tokens, components and accessibility standards, built from the ground up and shared across the product suite.',
    duration: '8 months',
    role: todo('Role'),
    status: 'Draft',
    summary: 'Tokens, components and accessibility standards, shared across the product suite.',
    image: { src: '/images/beforeafter/After.png', alt: 'A product screen rebuilt on the Acentra Health Design System' },
    // NEW token, stage only: pale green
    stage: '#e4efe0',
    // NEW token, stage only: the same green, stronger
    stageStrong: '#d2e5c9',
    layers: [
      { kind: 'dashboard', label: 'Placeholder · screen 1', rest: { x: -16, y: 21 }, open: { x: -26, y: 4, rotate: -3 }, width: 50, z: 1 },
      { kind: 'form', label: 'Placeholder · screen 2', rest: { x: 16, y: 25 }, open: { x: 26, y: 8, rotate: 2.5 }, width: 50, z: 1 },
      { kind: 'detail', label: 'Placeholder · screen 3', rest: { x: 28, y: 102 }, open: { x: 28, y: 52, rotate: -1.5 }, width: 44, z: 3 },
    ],
    // the parts this screen is built from, lifted out of it: origins on After.png (shown from its
    // top-left, 1280 of its 1674px wide), the components down the free right-hand side, the
    // button below the cover
    story: {
      preset: 'deconstruct',
      parts: [
        // the breadcrumb's link colour; the foundation scale until the system's palette replaces it
        { kind: 'swatches', label: 'Color / tokens', colors: ['#1c1917', '#57534e', '#a8a29e', '#e7e5e4', '#f5f5f4'], origin: { x: 31.6, y: 9.6 }, at: { x: 76, y: 6 }, width: 21, side: 'right' },
        { kind: 'checkbox', label: 'Checkbox / checked', text: 'Federal Tax Info', origin: { x: 30.8, y: 38 }, at: { x: 76, y: 22 }, width: 21, side: 'right' },
        { kind: 'input', label: 'Input / text', text: 'Philip', origin: { x: 66.6, y: 56.9 }, at: { x: 76, y: 36 }, width: 21, side: 'right' },
        { kind: 'spacing', label: 'Spacing / scale', origin: { x: 79.5, y: 68.9 }, at: { x: 76, y: 56 }, width: 21, side: 'right' },
        { kind: 'button', label: 'Button / primary', text: 'Next', origin: { x: 60.3, y: 92 }, at: { x: 38, y: 84 }, width: 15, side: 'below' },
      ],
    },
  },
  {
    kind: 'case',
    id: 'dca',
    href: links.caseStudy.dataConversionApp,
    name: 'Data Conversion App',
    company: 'Independent',
    question: 'Can people review data mappings instead of writing every one?',
    description: 'An AI drafts the data mappings and their rules; people review and correct them instead of writing each one.',
    duration: '2 weeks',
    role: todo('Role'),
    status: 'Draft',
    summary: 'An AI drafts the data mappings; people review and correct them.',
    image: {
      src: '/images/data-conversion-app/project-hub/hub-project-completed.png',
      alt: 'Data Conversion App project hub showing a completed mapping project',
    },
    mediaPlaceholder: true,
    // NEW token, stage only: pale blue
    stage: '#e2ecf6',
    // NEW token, stage only: the same blue, stronger
    stageStrong: '#cddff1',
    layers: [
      { kind: 'list', label: 'Placeholder · screen 1', rest: { x: -16, y: 25 }, open: { x: -26, y: 8, rotate: -2.5 }, width: 50, z: 1 },
      { kind: 'detail', label: 'Placeholder · screen 2', rest: { x: 16, y: 21 }, open: { x: 26, y: 4, rotate: 3 }, width: 50, z: 1 },
      { kind: 'form', label: 'Placeholder · screen 3', rest: { x: -28, y: 102 }, open: { x: -28, y: 52, rotate: 1.5 }, width: 44, z: 3 },
    ],
    // the AI drafts, a person reviews: three provider fields, mapped, then checked one by one
    story: {
      preset: 'drawer',
      title: 'Review mappings',
      rows: [
        { source: 'PRV_NPI', target: 'npi' },
        { source: 'PRV_LNAME', target: 'lastName' },
        { source: 'ENRL_DT', target: 'enrollmentDate' },
      ],
    },
  },
]

export type ThumbName = 'palette' | 'habit' | 'route' | 'chart' | 'flow' | 'type' | 'ds'

export type SideProject = {
  kind: 'side'
  id: string
  title: string
  description: string
  tags: string[]
  thumb: ThumbName
  sample: true
}

export const sideProjects: SideProject[] = [
  { kind: 'side', id: 'palette', title: 'Pocket Palette', description: 'A small colour tool for picking accessible pairs.', tags: ['Tool', 'Accessibility'], thumb: 'palette', sample: true },
  { kind: 'side', id: 'habit', title: 'Habit Loop', description: 'A calm habit tracker with one screen and one job.', tags: ['Mobile', 'Concept'], thumb: 'habit', sample: true },
  { kind: 'side', id: 'route', title: 'Commute Cards', description: 'Route notes you can read at a glance on the move.', tags: ['Maps', 'Prototype'], thumb: 'route', sample: true },
]

export type Accolade = { kind: 'accolade'; id: string; title: string; issuer: string; year: string; sample: true }

export const accolades: Accolade[] = [
  { kind: 'accolade', id: 'excellence', title: 'Design Excellence Award', issuer: '[Company name]', year: '2025', sample: true },
  { kind: 'accolade', id: 'a11y', title: 'Accessibility Champion', issuer: '[Company name]', year: '2025', sample: true },
  { kind: 'accolade', id: 'hackathon', title: 'Hackathon Finalist', issuer: '[Event name]', year: '2024', sample: true },
  { kind: 'accolade', id: 'speaker', title: 'Speaker, Design Systems Meetup', issuer: '[Meetup name]', year: '2024', sample: true },
]

export const about = {
  sample: true as const,
  greeting: 'Hi, I’m Michael.',
  body: 'I’m a UX designer who likes the messy middle of a project: the tangled requirements, the ten competing opinions, the screen with too much on it. My job is to find the one clear path through.',
  snippet: 'UX designer. Finds the one clear path through.',
  facts: [
    { label: 'Role', value: 'UX and product designer' },
    { label: 'Focus', value: 'Design systems and complex workflows' },
    { label: 'Approach', value: 'Make the complicated simple' },
  ],
  /** placeholder, never a real address */
  contact: links.email,
  credit: 'Illustrated with AI, directed by me.',
}

/* ---- Noise only: the design world talking over itself ---------------------------------- */

export type Article = { kind: 'article'; id: string; source: string; title: string; thumb: ThumbName }
export type Event = { kind: 'event'; id: string; month: string; day: string; title: string; meta: string }
export type Notification = { kind: 'note'; id: string; from: string; title: string; sub: string; time: string }
export type Feedback = { kind: 'feedback'; id: string; quote: string; from: string }
export type Stat = { kind: 'stat'; id: string; value: string; label: string }
export type Tags = { kind: 'tags'; id: string; tags: string[] }
export type AboutSnippet = { kind: 'about'; id: string }

export const articles: Article[] = [
  { kind: 'article', id: 'filters', source: 'Article · 4 min', title: 'Why every dashboard ends up with forty filters', thumb: 'chart' },
  { kind: 'article', id: 'settings', source: 'Article · 6 min', title: 'The simple redesign that added three settings pages', thumb: 'flow' },
  { kind: 'article', id: 'tooltip', source: 'Opinion · 3 min', title: 'Nobody reads the onboarding tooltip. Again.', thumb: 'type' },
  { kind: 'article', id: 'scale', source: 'Talk · 28 min', title: 'Design systems at scale', thumb: 'ds' },
]

export const events: Event[] = [
  { kind: 'event', id: 'workshop', month: 'Oct', day: '23', title: 'UX research workshop', meta: '9:00 AM · 40 seats' },
  { kind: 'event', id: 'meetup', month: 'Oct', day: '29', title: 'Design Systems Meetup', meta: '6:30 PM · Main hall' },
]

export const notifications: Notification[] = [
  { kind: 'note', id: 'filter', from: 'PM', title: 'Can we add one more filter?', sub: 'Just a tiny one.', time: '4:52 PM' },
  { kind: 'note', id: 'comments', from: 'F', title: '14 unread comments', sub: 'on “Final_v7_REAL”', time: 'now' },
  { kind: 'note', id: 'tickets', from: 'J', title: '3 tickets assigned to you', sub: 'Sprint 14 · due Friday', time: '2m' },
  { kind: 'note', id: 'review', from: 'Cal', title: 'Design review moved', sub: 'Now 6:00 PM, same room', time: '5m' },
]

export const feedback: Feedback[] = [
  { kind: 'feedback', id: 'logo', quote: 'Make the logo bigger.', from: 'Stakeholder' },
  { kind: 'feedback', id: 'pop', quote: 'Can it pop more?', from: 'Stakeholder' },
  { kind: 'feedback', id: 'friday', quote: 'Ship by Friday (the real Friday).', from: 'Stakeholder' },
]

export const stats: Stat[] = [
  { kind: 'stat', id: 'tabs', value: '27', label: 'tabs open for one task' },
  { kind: 'stat', id: 'unread', value: '14', label: 'unread comments' },
]

export const tagCluster: Tags = {
  kind: 'tags',
  id: 'tags',
  tags: ['#accessibility', '#design-systems', '#research', '#prototype', '#tokens'],
}

export type NoiseItem =
  | CaseStudy
  | SideProject
  | Accolade
  | Article
  | Event
  | Notification
  | Feedback
  | Stat
  | Tags
  | AboutSnippet

/** What the cleanup does with each item: the work stays, repeats merge, the rest goes. */
export type Verdict = 'keep' | 'merge' | 'remove'

export const verdictOf = (item: NoiseItem): Verdict => {
  if (item.kind === 'case' || item.kind === 'about') return 'keep'
  if (item.kind === 'side' || item.kind === 'accolade') return 'merge'
  return 'remove'
}

/** The full noise deck, in a fixed order. Directions shuffle it with a seed. Work and the
    about snippet come first so they survive the small-screen cap. */
export const noiseDeck: NoiseItem[] = [
  ...caseStudies,
  { kind: 'about', id: 'about' },
  ...sideProjects,
  ...accolades,
  ...feedback,
  ...notifications,
  ...articles,
  ...events,
  ...stats,
  tagCluster,
]

export type TabId = 'work' | 'side' | 'accolades' | 'about'

export const tabs: { id: TabId; label: string; count?: number }[] = [
  { id: 'work', label: 'Work', count: caseStudies.length },
  { id: 'side', label: 'Side projects', count: sideProjects.length },
  { id: 'accolades', label: 'Accolades', count: accolades.length },
  { id: 'about', label: 'About' },
]
