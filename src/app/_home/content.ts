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
  role: 'UX designer',
  initials: 'MJ',
}

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
  duration: string
  scope: string
  status: string
  image: { src: string; alt: string }
  /** the image is a stand-in, labelled on the card */
  mediaPlaceholder?: boolean
}

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
    scope: '9 sections',
    status: 'Draft',
    image: { src: '/images/beforeafter/After.png', alt: 'A product screen rebuilt on the Acentra Health Design System' },
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
    scope: '5 sections',
    status: 'Draft',
    image: {
      src: '/images/data-conversion-app/project-hub/hub-project-completed.png',
      alt: 'Data Conversion App project hub showing a completed mapping project',
    },
    mediaPlaceholder: true,
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
