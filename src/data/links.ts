/* NEW — every link on the site, defined once. Components import from here and never
   hard-code an href, so nothing can drift between breakpoints or sections.
   Values in [BRACKETS] are placeholders still to be supplied. */

export const links = {
  email: 'michaeljerome.design@gmail.com',
  mailto: 'mailto:michaeljerome.design@gmail.com',
  linkedin: 'https://www.linkedin.com/in/michael-jerome-b478b7164/',
  resume: '[RESUME URL]',
  /** optional personal link; set to null to hide it */
  personal: { label: '[SPOTIFY / OTHER]', href: '[PERSONAL LINK URL]' } as { label: string; href: string } | null,

  /** the home page, and its tabs (a hash naming a tab opens it) */
  home: '/',
  work: '/#work',
  about: '/#about',

  /** case studies */
  caseStudy: {
    acentraDesignSystem: '/work/acentra-health',
    dataConversionApp: '/work/data-conversion-app',
  },
} as const
