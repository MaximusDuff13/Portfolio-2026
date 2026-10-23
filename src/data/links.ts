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

  /** the home page, and its tabs (a hash naming a tab opens it) */
  home: '/',
  work: '/#work',
  about: '/#about',

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

/** Header nav, in order. Contact returns once there is a real email to link to. */
export const navLinks = [
  { label: 'Work', href: links.work },
  { label: 'About', href: links.about },
] as const
