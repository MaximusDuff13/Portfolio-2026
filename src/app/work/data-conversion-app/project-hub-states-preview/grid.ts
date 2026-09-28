// The 2x2 states grid shared by Options A2 and B. Reading order is lifecycle order: row 1 Enable,
// Generating; row 2 Success, Error. One column below md, two from md up; gap-9 is the page's other
// image grid (ConceptRow).
//
// ROW ALIGNMENT. Every frame in a row takes the aspect ratio of the taller image in that row (row 1
// 3000/982, row 2 3000/1131), so both frames in a row are the same size and both cards start at
// the same height. The image sits top-aligned inside at its own ratio: nothing is cropped or
// stretched, and a shorter card leaves band background at the bottom of its frame.
import { states, IMAGE_WIDTH } from './states'

export const gridClass = 'grid grid-cols-1 gap-9 md:grid-cols-2'

export function frameRatio(index: number) {
  const row = states.slice(index - (index % 2), index - (index % 2) + 2)
  return `${IMAGE_WIDTH} / ${Math.max(...row.map((s) => s.height))}`
}
