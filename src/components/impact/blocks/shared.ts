// Shared copy for the Impact closing-block treatments.
//
// One source of truth so a treatment cannot drift from the approved wording. Nothing here is
// styling — each treatment decides its own structure.
//
// The quote is reproduced character for character, including the square brackets and the
// speaker's own grammar, and carries typographic quotation marks as plain characters.

// Non-breaking space, so the company name never splits across a line break.
const NBSP = ' '
export const ACENTRA = `Acentra${NBSP}Health`

export const orgLabel = `For ${ACENTRA}`

export const orgLine = `Mapping and transformation is the longest step in converting a state's data. Shortening it gets ${ACENTRA} to the state's review sooner and speeds up the overall implementation.`

export const quoteText =
  '“We have started using the AI based conversion mapping for [an implementation] and were able to produce the first mapping in just 24 hours from 2 to 3 weeks.”'

export const quoteRole = 'Product Owner'
