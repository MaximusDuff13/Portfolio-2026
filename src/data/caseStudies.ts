/* Case studies as one typed list: the listing is by CASE STUDY, with company and role as
   fields on the cover sheet. Used by the /lab/case-study-layouts prototypes until a layout
   is chosen; the live home page still reads ./home.ts.

   Entries marked `placeholder` are stand-ins for testing how each layout holds 3-6 case
   studies. They borrow no real screens (that would misrepresent the work); their art is
   typographic and labelled. Copy in [BRACKETS] is still to be supplied. */

import type { CoverSheetData } from '@/components/CoverSheet'
import { links } from './links'

export type CaseStudyEntry = {
  id: string
  href: string
  /** outcome-first headline */
  title: string
  /** the phrase in the title to highlight in a lead story; must appear in `title` */
  hook?: string
  /** 1-2 sentences, outcome included */
  summary: string
  sheet: CoverSheetData
  /** cover colour, from existing tokens: accent.subtle, foundation-200, foundation-900 */
  tint: 'subtle' | 'stone' | 'ink'
  /** 1-3 screens, the first is the hero. Empty for placeholders. */
  media: { src: string; alt: string }[]
  /** the media are stand-ins (labelled on the cover) */
  mediaPlaceholder?: boolean
  /** a real pull quote from the case study, in full */
  quote?: string
  /** a whole placeholder entry (labelled everywhere it shows) */
  placeholder?: boolean
}

export const caseStudies: CaseStudyEntry[] = [
  {
    id: 'acentra-design-system',
    href: links.caseStudy.acentraDesignSystem,
    title: 'A brand update in two weeks, not six months',
    hook: 'two weeks',
    summary:
      'Tokens, components and accessibility standards, built from the ground up and shared across the product suite. Five product teams are adopting it.',
    sheet: {
      company: 'Acentra Health',
      role: '[ROLE ON PROJECT]',
      dates: '2024 · 8 months',
      scope: 'Tokens, components, accessibility',
      outcome: '5 product teams adopting',
      status: 'Draft',
      readTime: '[X] min · 9 sections',
    },
    tint: 'subtle',
    media: [
      { src: '/images/beforeafter/After.png', alt: 'A provider enrolment screen rebuilt on the Acentra Health Design System, annotated with its tokens' },
      { src: '/images/audit/Color%20Audit.png', alt: 'The colour audit of button states in Figma' },
      { src: '/images/Carbon/Anchor.png', alt: 'Contrast checks for the Carbon and Acentra palette' },
    ],
    // From the case study's Impact section, in full
    quote: 'One release in, the system was already being used thousands of times a week — adoption, not just availability.',
  },
  {
    id: 'data-conversion-app',
    href: links.caseStudy.dataConversionApp,
    title: 'Four to six weeks of mapping, now one',
    hook: 'now one',
    summary:
      'An AI drafts the data mappings and their rules; people review and correct them instead of writing each one. Mapping drops from four to six weeks to one.',
    sheet: {
      company: 'Independent',
      role: 'Sole product designer',
      dates: 'Aug 2026 · 2 weeks',
      scope: 'AI-assisted data mapping MVP',
      outcome: '1 week, down from 4 to 6',
      status: 'Draft',
      readTime: '[X] min · 5 sections',
    },
    tint: 'ink',
    media: [
      { src: '/images/data-conversion-app/project-hub/hub-project-completed.png', alt: 'Project hub showing a completed mapping project' },
      { src: '/images/data-conversion-app/schema-mapping/upload-and-prompt.png', alt: 'Schema and wiki setup: upload a data dictionary and add guidance' },
      { src: '/images/data-conversion-app/project-hub/Mapping%20Screen%20-%20In%20Progress.png', alt: 'The mapping screen while mappings are in progress' },
    ],
    mediaPlaceholder: true,
  },
  ...[3, 4, 5, 6].map(
    (n): CaseStudyEntry => ({
      id: `placeholder-${n}`,
      href: `/lab/case-study-layouts#placeholder-${n}`,
      title:
        n % 2
          ? '[Placeholder] An outcome-first headline that runs long on purpose to test wrapping'
          : '[Placeholder] A shorter outcome headline',
      summary: '[Placeholder] One or two sentences on what shipped and the measurable outcome, long enough to wrap at phone width.',
      sheet: {
        company: `[Company ${String.fromCharCode(64 + n - 2)}]`,
        role: '[Role]',
        dates: '[Year · duration]',
        scope: '[Scope]',
        outcome: '[Outcome]',
        status: n % 2 ? 'Shipped' : 'Draft',
        readTime: '[X] min',
      },
      tint: (['stone', 'subtle', 'ink', 'stone'] as const)[n - 3],
      media: [],
      placeholder: true,
    }),
  ),
]
