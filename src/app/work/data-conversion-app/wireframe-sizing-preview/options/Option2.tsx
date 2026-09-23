// OPTION 2 — three columns, each frame sized to its own wireframe.
//
// Frames: INTENTIONALLY DIFFERENT HEIGHTS, equal widths. Each frame takes its wireframe's aspect
// ratio (960×520 for Detail panel, 960×600 for the other two), so it wraps the image with only its
// padding and no empty band. Detail panel's frame comes out shorter than its neighbours. The
// subgrid lines the three frames up along their TOP edge, so the height difference reads as a
// ragged bottom rather than as frames floating at different heights.
import { mappingConcepts } from '../content'
import { ConceptText, Frame } from '../shared'

export function Option2() {
  return (
    <ol className="m-0 grid list-none grid-cols-1 gap-x-9 gap-y-9 p-0 md:grid-cols-3 md:gap-y-0">
      {mappingConcepts.map((c) => (
        <li key={c.title} className="m-0 grid p-0 md:row-span-2 md:grid-rows-subgrid">
          <ConceptText concept={c} />
          <Frame concept={c} fit="hug" className="self-start" sizes="(min-width: 768px) 33vw, 100vw" />
        </li>
      ))}
    </ol>
  )
}
