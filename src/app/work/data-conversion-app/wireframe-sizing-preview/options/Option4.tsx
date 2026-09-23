// OPTION 4 — one concept at a time, stacked, each wireframe at the full content width.
//
// Frames: EQUAL WIDTHS, heights follow each wireframe. Every frame spans the whole wrap, which is
// the largest any wireframe can be without leaving the page's content column. Each hugs its own
// aspect ratio, so Detail panel's frame is a little shorter than the other two — forcing one
// height would put an empty band above and below Detail panel for no gain. Paragraphs stay at a
// reading width (max-w-3xl) while the frames span the row.
import { mappingConcepts } from '../content'
import { ConceptText, Frame } from '../shared'

export function Option4() {
  return (
    <ol className="m-0 flex list-none flex-col gap-16 p-0">
      {mappingConcepts.map((c) => (
        <li key={c.title} className="m-0 p-0">
          <ConceptText concept={c} className="max-w-3xl" />
          <Frame concept={c} fit="hug" sizes="(min-width: 1152px) 1120px, 100vw" />
        </li>
      ))}
    </ol>
  )
}
