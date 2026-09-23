// Copied mechanically from page.tsx's mappingConcepts (not retyped), so the preview's copy is
// the live copy. If the live text changes, re-copy it; the review script compares the two.
export const mappingDir = '/images/data-conversion-app/mapping-variants/'

export type Concept = { title: string; body: string; image: string; alt: string }

export const mappingConcepts: Concept[] = [
  {
    title: 'Detail panel',
    body: "We kept the table lean, showing only what's needed to select a field, and let everything else live in a panel that opens beside it. Mapping, transformation, source details, and AI confidence all sit in one place without pulling the user off the table. It meant we could keep the comparison view intact while still surfacing the full picture for whichever field someone was working on. This is the concept we shipped for the MVP.",
    image: mappingDir + 'wireframe-1-detail-panel-labeled.svg',
    alt: 'Detail panel wireframe',
  },
  {
    title: 'Inline table',
    body: 'We tried putting every field directly in one wide table, with dropdowns and links built right into each row. It meant nothing was hidden, but clicking into a description or a transformation setting sent people to a separate screen every time. For a table this dense, all those redirects added friction rather than removing it, so we moved away from this approach.',
    image: mappingDir + 'wireframe-2-inline-table-labeled.svg',
    alt: 'Inline table wireframe',
  },
  {
    title: 'Review queue',
    body: "We considered letting people build a queue of fields to review, then hand them off to one dedicated screen with everything about that queue in one place. It read well as a concept, since it separated selecting from reviewing. But when we tested it with users, moving them away from the table, where they could compare fields side by side, didn't land the way we hoped.",
    image: mappingDir + 'wireframe-3-review-queue-labeled.svg',
    alt: 'Review queue wireframe',
  },
]

// Each wireframe's own viewBox, for the options that size a frame to its image.
export const natural: Record<string, { w: number; h: number }> = {
  'Detail panel': { w: 960, h: 520 },
  'Inline table': { w: 960, h: 600 },
  'Review queue': { w: 960, h: 600 },
}
