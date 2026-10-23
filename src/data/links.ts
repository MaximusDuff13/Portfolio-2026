/* NEW — every link on the site, defined once. Components import from here and never
   hard-code an href, so nothing can drift between breakpoints or sections.
   Values in [BRACKETS] are placeholders still to be supplied. */

export const links = {
  email: '[YOUR EMAIL]',
  mailto: 'mailto:[YOUR EMAIL]',
  linkedin: '[LINKEDIN URL]',
  resume: '[RESUME URL]',
  /** optional personal link; set to null to hide it */
  personal: { label: '[SPOTIFY / OTHER]', href: '[PERSONAL LINK URL]' } as { label: string; href: string } | null,

  /** in-page anchors on the home page */
  home: '/',
  work: '/#work',
  experience: '/#experience',
  about: '/#about',
  contact: '/#contact',

  /** the /about page and its interest sections */
  aboutPage: '/about',
  aboutTopic: {
    travel: '/about#travel',
    games: '/about#games',
    volunteering: '/about#volunteering',
  },

  /** case studies */
  caseStudy: {
    acentraDesignSystem: '/work/acentra-health',
    dataConversionApp: '/work/data-conversion-app',
  },
} as const

/** Header nav, in order */
export const navLinks = [
  { label: 'Work', href: links.work },
  { label: 'About', href: links.about },
  { label: 'Contact', href: links.contact },
] as const
