// ALL copy and image paths for the Before and Process sections live here, so wording can be
// edited in one place without touching any layout.
//
// STATUS OF THE COPY
//   · Before section — DRAFT, pending approval. Built once and not varied across layouts.
//   · Process selector descriptions 1 to 3 — DRAFT, UNCONFIRMED. Marked below.
//   · Selector 4's description and the closing quote are confirmed.
//
// RULES BAKED IN HERE
//   · No numerals, durations, dates or metrics anywhere in this section.
//   · The word "Step" is never used — the conversion process elsewhere on the page already has
//     numbered steps, and a second numbering would collide with it. Order is carried by array
//     position only.
//   · No state or client name. The product is "our product" or "the MVP".
//   · The quote is reproduced character for character, including the square brackets.

// A non-breaking space, for use if "Acentra Health" ever appears in this section's copy.
const NBSP = ' '
export const ACENTRA = `Acentra${NBSP}Health`

// ── Before ──────────────────────────────────────────────────────────────────────────────────
// DRAFT — pending approval.
export const before = {
  label: 'Before',
  bigLine: 'No UX, until I joined',
  line: 'The team was AI engineers, and the UI was designed from a technical standpoint.',
}

// ── Process ─────────────────────────────────────────────────────────────────────────────────
export const process = {
  label: 'Process',
  /** Groups selectors 2 to 4. Layouts that do not need a group heading simply ignore it. */
  groupLabel: 'Design',
}

export type Deliverable = {
  /** Selector name. Order in the array IS the order shown; never numbered. */
  name: string
  /** One line, shown only for the active selector in layouts that have selection. */
  description: string
  /** true for the selectors that sit under the "Design" group label. */
  inDesignGroup: boolean
  /**
   * Public path to the deliverable image. Empty string renders a neutral placeholder frame.
   * The intended path for each is kept in the comment beside it — fill these in and the
   * placeholders disappear with no other change.
   */
  src: string
  /** Alt text describing the deliverable. Never contains a state or client name. */
  alt: string
}

export const deliverables: Deliverable[] = [
  {
    name: 'Requirements gathering',
    // DRAFT — unconfirmed
    description: 'Talked with stakeholders to define what the tool needed to do.',
    inDesignGroup: false,
    src: '', // OPEN ITEM — intended path not supplied
    alt: 'Requirements gathering deliverable for the MVP.',
  },
  {
    name: 'Project Hub',
    // DRAFT — unconfirmed
    description: "Where teams set up and track a state's conversion project.",
    inDesignGroup: true,
    src: '', // OPEN ITEM — intended path not supplied
    alt: 'The Project Hub screen, where a conversion project is set up and tracked.',
  },
  {
    name: 'Schema & Wiki creation',
    // DRAFT — unconfirmed
    description: 'Where the target schema and its documentation are created.',
    inDesignGroup: true,
    src: '', // OPEN ITEM — intended path not supplied
    alt: 'The schema and wiki creation screen, where the target schema and its documentation are created.',
  },
  {
    name: 'Mapping & transformation',
    // confirmed
    description: 'Where AI drafts the mappings and rules, and a person confirms them.',
    inDesignGroup: true,
    src: '', // OPEN ITEM — intended path not supplied
    alt: 'The mapping and transformation screen, where drafted mappings and rules are confirmed.',
  },
]

// ── Closing quote ───────────────────────────────────────────────────────────────────────────
// Verbatim, including the square brackets and the speaker's own grammar, wrapped in typographic
// quotation marks written as plain characters. QUOTE_2_OVERRIDE was not supplied, so the
// original stands.
export const closingQuote = {
  role: 'Program Director',
  text: "“Michael's UI design are truly impressive. He brings forward creative ideas for different approaches, consistently reminding us how much creativity [goes] into great design.”",
}
