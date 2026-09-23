// OPTION 3 — Detail panel on its own row at full width; Inline table and Review queue two-up below.
//
// Frames: INTENTIONALLY DIFFERENT. Detail panel is the shipped concept, so it gets the full
// content width and is the largest of the three. The two explored-and-dropped concepts share a
// row as an equal pair: same column width, and both wireframes are 960×600, so hugging their
// aspect ratio gives them identical frames. Every frame hugs its wireframe, so none has an empty
// band.
//
// Detail panel's paragraph stays at a reading width (max-w-3xl) even though its frame spans the
// row, so the line length doesn't balloon at 1920.
import { mappingConcepts } from '../content'
import { ConceptText, Frame } from '../shared'

export function Option3() {
  const [shipped, ...rest] = mappingConcepts
  return (
    <div className="flex flex-col gap-12">
      <div>
        <ConceptText concept={shipped} className="max-w-3xl" />
        <Frame concept={shipped} fit="hug" sizes="(min-width: 1152px) 1120px, 100vw" />
      </div>
      <ol className="m-0 grid list-none grid-cols-1 gap-x-9 gap-y-9 p-0 md:grid-cols-2 md:gap-y-0">
        {rest.map((c) => (
          <li key={c.title} className="m-0 grid p-0 md:row-span-2 md:grid-rows-subgrid">
            <ConceptText concept={c} />
            <Frame concept={c} fit="hug" className="self-start" sizes="(min-width: 768px) 50vw, 100vw" />
          </li>
        ))}
      </ol>
    </div>
  )
}
