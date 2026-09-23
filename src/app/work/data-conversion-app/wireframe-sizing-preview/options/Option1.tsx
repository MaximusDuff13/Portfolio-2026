// OPTION 1 — the live three equal columns, with a taller shared fixed height.
//
// Frames: EQUAL. One fixed height for all three, and equal column widths from the grid, so every
// frame is the same size, as on the live page. Live uses aspect 8/5 (218px tall at 1280); this uses
// h-[320px]. Rows are a subgrid, so titles, bodies and frames each line up across the columns
// whatever the paragraph lengths.
import { mappingConcepts } from '../content'
import { ConceptText, Frame } from '../shared'

export function Option1() {
  return (
    <ol className="m-0 grid list-none grid-cols-1 gap-x-9 gap-y-9 p-0 md:grid-cols-3 md:gap-y-0">
      {mappingConcepts.map((c) => (
        <li key={c.title} className="m-0 grid p-0 md:row-span-2 md:grid-rows-subgrid">
          <ConceptText concept={c} />
          <Frame concept={c} fit="fill" className="h-[320px]" sizes="(min-width: 768px) 33vw, 100vw" />
        </li>
      ))}
    </ol>
  )
}
