// OPTION 5 — one concept per row, text beside the wireframe (lg and up).
//
// Frames: EQUAL WIDTHS, heights follow each wireframe. At lg each row splits 4/8 on the 12-column
// grid: the paragraph in a narrow column, which is about its natural reading width anyway, and the
// wireframe in the wider one. That gives each wireframe roughly twice the width of the three-column
// options without Option 4's full stack of image-then-image. Below lg the row stacks, text first,
// because at 768 an 8/12 column would be narrower than just giving the frame the whole row.
import { mappingConcepts } from '../content'
import { ConceptText, Frame } from '../shared'

export function Option5() {
  return (
    <ol className="m-0 flex list-none flex-col gap-16 p-0">
      {mappingConcepts.map((c) => (
        <li key={c.title} className="m-0 grid grid-cols-1 gap-x-9 p-0 lg:grid-cols-12">
          <ConceptText concept={c} className="max-w-3xl lg:col-span-4" />
          <Frame
            concept={c}
            fit="hug"
            className="self-start lg:col-span-8"
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
        </li>
      ))}
    </ol>
  )
}
