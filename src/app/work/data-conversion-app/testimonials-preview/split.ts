// Shared classes for Options 4a–4e, the asymmetric-split variations. One definition, so the five
// differ only in structure, never in type or colour.
//
// GROUND. bg-body: the page's own section ground (Problem, MVP focus, Impact, Process, Keep
// exploring and the light feature bands all show it). foundation-100 is card-only on the live
// page, so it is not used. On the page ground the section would run straight on from Mapping &
// transformation's light band, so each option opens with a border-border hairline across the
// content width.
//
// CONTRAST on body (#fdfbf7): foundation-900 16.9:1, foundation-700 10.4:1, foundation-600 7.4:1,
// foundation-500 4.61:1.
export const SECTION = 'bg-body px-6 sm:px-10 lg:px-section'
export const WRAP = 'mx-auto max-w-6xl border-t border-border py-section'

/* The section name, in the eyebrow token. */
export const EYEBROW = 'font-grotesk text-label uppercase tracking-widest text-foundation-500'

/* Quote 1, the primary: the accent italic (Fraunces, WONK off), as Impact's quote uses it. */
export const LARGE = 'm-0 font-accent accent-italic text-heading-m text-foundation-900'

/* Quote 2, the secondary: running text, one size down. */
export const SMALL = 'm-0 font-sans text-body-sm text-foundation-700'

/* The single attribution, a name and title rather than a category, so sentence case in the body
   font rather than the uppercase label token. */
export const ATTRIBUTION = 'font-sans text-body-sm font-medium text-foundation-600'
