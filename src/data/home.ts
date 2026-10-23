/* Home page and /about copy, one source. Anything in [BRACKETS] is a placeholder still to
   be supplied; everything else comes from the live case study pages. The Acentra Health
   figures come from that page's Results section, which is still a draft. Links live in
   ./links.ts. */

import type { CoverSheetData } from '@/components/CoverSheet'
import { links } from './links'

export const person = {
  name: 'Michael Jerome',
  role: 'Senior UX Designer',
  company: 'Acentra Health',
  city: '[CITY]',
  status: 'Open to full-time',
  updated: '[MONTH YEAR]',
  portrait: null as { src: string; alt: string } | null, // [PORTRAIT]
}

// Form: [what I focus on] + [two-word quality] + [what I make]
export const positioning = {
  lead: '[POSITIONING LINE FIRST HALF]',
  trail: '[SECOND HALF]',
}

export const intro = '[2-SENTENCE INTRO: years, kind of companies, scale]'

export type CaseStudy = {
  href: string
  /** outcome-first or verb-first */
  title: string
  descriptor: string
  /** type / honesty tags, e.g. 'Design system', '2-week sprint', 'Draft' */
  tags: string[]
  image: { src: string; alt: string }
  sheet: CoverSheetData
}

export type Company = {
  /** anchor id and TabBar key */
  id: string
  name: string
  role: string
  city: string
  years: string
  current?: boolean
  /** one verb-first line on what I did */
  line: string
  /** contents wall tile; only companies with a case study get one */
  tile?: {
    title: string
    /** back plate tone, from existing tokens */
    plate: 'warm' | 'cool' | 'neutral'
    /** 2-3 screens, back to front */
    screens: { src: string; alt: string }[]
    /** muted loop, played on hover/focus on desktop only */
    video?: string
  }
  caseStudies: CaseStudy[]
}

const ahds: CaseStudy = {
  href: links.caseStudy.acentraDesignSystem,
  title: 'A brand update in two weeks, not six months',
  descriptor: 'Tokens, components and accessibility standards, built from the ground up and shared across the product suite.',
  tags: ['Design system', '8 months', 'Draft'],
  image: { src: '/images/beforeafter/After.png', alt: 'A product screen rebuilt on the Acentra Health Design System' },
  sheet: {
    company: 'Acentra Health',
    role: '[ROLE ON PROJECT]',
    dates: '2024 · 8 months',
    scope: 'Tokens, components, accessibility',
    outcome: '5 product teams adopting',
    status: 'Draft',
    readTime: '[X] min · 9 sections',
    audience: '[B2B / B2C]',
  },
}

const dca: CaseStudy = {
  href: links.caseStudy.dataConversionApp,
  title: 'Four to six weeks of mapping, now one',
  descriptor: 'An AI drafts the data mappings and their rules; people review and correct them instead of writing each one.',
  tags: ['2-week sprint', 'Draft'],
  image: {
    src: '/images/data-conversion-app/project-hub/hub-project-completed.png',
    alt: 'Data Conversion App project hub showing a completed mapping project',
  },
  sheet: {
    company: 'Independent',
    role: 'Sole product designer',
    dates: 'Aug 2026 · 2 weeks',
    scope: 'AI-assisted data mapping MVP',
    outcome: '1 week, down from 4 to 6',
    status: 'Draft',
    readTime: '[X] min · 5 sections',
    audience: '[B2B / B2C]',
  },
}

// Newest first.
export const companies: Company[] = [
  {
    id: 'acentra-health',
    name: 'Acentra Health',
    role: 'Senior UX Designer',
    city: '[CITY]',
    years: '[YEARS]',
    current: true,
    line: '[VERB-FIRST LINE ON WHAT YOU DID AT ACENTRA HEALTH]',
    tile: {
      title: 'Acentra Health Design System',
      plate: 'warm',
      screens: [
        { src: '/images/audit/Text%20Styles.png', alt: 'Text style audit' },
        { src: '/images/audit/Color%20Audit.png', alt: 'Colour audit' },
        { src: '/images/beforeafter/After.png', alt: 'A product screen rebuilt on the design system' },
      ],
      video: '/videos/acentra-health.mp4',
    },
    caseStudies: [ahds],
  },
  {
    id: 'independent',
    name: 'Independent',
    role: '[ROLE]',
    city: '[CITY]',
    years: '2026',
    line: '[VERB-FIRST LINE ON THE INDEPENDENT WORK]',
    tile: {
      title: 'Data Conversion App',
      plate: 'cool',
      screens: [
        { src: '/images/data-conversion-app/schema-mapping/upload-and-prompt.png', alt: 'Upload and prompt screen' },
        { src: '/images/data-conversion-app/project-hub/hub-project-completed.png', alt: 'Project hub with a completed project' },
      ],
    },
    caseStudies: [dca],
  },
  {
    id: 'company-b',
    name: '[COMPANY B]',
    role: '[ROLE]',
    city: '[CITY]',
    years: '[YEARS]',
    line: '[VERB-FIRST LINE]',
    caseStudies: [],
  },
  {
    id: 'company-c',
    name: '[COMPANY C]',
    role: '[ROLE]',
    city: '[CITY]',
    years: '[YEARS]',
    line: '[VERB-FIRST LINE]',
    caseStudies: [],
  },
]

export type InterestId = keyof typeof links.aboutTopic

export const interests: { id: InterestId; label: string; caption: string; about: string[] }[] = [
  {
    id: 'travel',
    label: 'Travel',
    caption: '[CAPTION: one line with a design angle]',
    about: ['[SHORT FIRST-PERSON COPY ABOUT TRAVEL]'],
  },
  {
    id: 'games',
    label: 'Games',
    caption: '[CAPTION: one line with a design angle]',
    about: ['[SHORT FIRST-PERSON COPY ABOUT GAMES]'],
  },
  {
    id: 'volunteering',
    label: 'Volunteering',
    caption: '[CAPTION: one line with a design angle]',
    about: ['[SHORT FIRST-PERSON COPY ABOUT VOLUNTEERING]'],
  },
]

export const about = {
  title: '[ABOUT HEADLINE]',
  story: '[2-3 SENTENCES]',
  quote: '[PULL QUOTE]',
  principles: [
    { principle: '[PRINCIPLE]', sentence: '[ONE SENTENCE]' },
    { principle: '[PRINCIPLE]', sentence: '[ONE SENTENCE]' },
    { principle: '[PRINCIPLE]', sentence: '[ONE SENTENCE]' },
    { principle: '[PRINCIPLE]', sentence: '[ONE SENTENCE]' },
  ],
}

export const contact = {
  line: '[ONE WARM LINE]',
}
