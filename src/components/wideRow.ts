// wideRow — the breakout that lets a row of images run wider than the page's 1152px content wrap.
//
// Apply it to a block inside the max-w-6xl wrap. From lg up the block becomes
// min(1800px, viewport − 160px) wide, centred on the wrap. The 160px is the lg gutters (80px a
// side), so the row lines up with where the gutters would be and never reaches the viewport edge:
// no horizontal scroll, even with a classic scrollbar. Below lg it is the wrap's own width.
//
// One definition, so every wide row (the ConceptRow, the states previews) stays the same width.
export const wideRow = 'lg:ml-[calc(50%-min(900px,50vw-80px))] lg:w-[min(1800px,calc(100vw-160px))]'
