// Shared classes for the closing-section options, so they differ in structure, not in type.
//
// READING WIDTH. max-w-lg (512px) for running prose, the width ProblemSection settled on: Inter at
// 16px averages ~7.4px a character on this page, so 512px lands at ~69 characters a line, inside
// the 60–70 target. max-w-prose is not used (65ch runs to ~89 characters here, see ProblemSection).
//
// PARAGRAPH SPACING. gap-6 (24px) between paragraphs, as in the Problem/Solution card.
//
// CONTRAST on body (#fdfbf7): foundation-900 16.9:1, foundation-700 10.4:1, foundation-600 7.4:1,
// foundation-500 4.61:1.

/* Every option sits on the page ground with the content wrap and gutters, opening with a
   hairline as Testimonials and Keep exploring do. */
export const SECTION = 'px-6 sm:px-10 lg:px-section'
export const WRAP = 'mx-auto max-w-6xl border-t border-border py-section'

/* A section heading in the page's margin-label voice (ProblemSection's "Problem"). */
export const HEADING = 'm-0 font-accent accent-italic text-heading-m text-foundation-900'

/* The eyebrow voice (Process, Keep exploring), for options that want the quieter label. */
export const LABEL = 'm-0 font-grotesk text-label uppercase tracking-widest text-foundation-500'

export const PROSE = 'max-w-lg flex flex-col gap-6'
export const PARA = 'm-0 font-sans text-body text-foundation-700'

/* Next steps: a plain numbered list in the body face, the marker in a quieter tone. */
export const LIST = 'm-0 flex list-decimal flex-col gap-4 pl-5 marker:text-foundation-500'
export const ITEM = 'pl-1 font-sans text-body text-foundation-700'
