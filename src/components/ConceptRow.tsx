// ConceptRow — the explored concepts for one feature, as wireframes side by side.
//
// NEW COMPONENT. Replaced the side-by-side screenshot comparison for features where the argument is made with
// sketches rather than screenshots: each concept gets a title, the reasoning, then its wireframe.
// The real product appears once, after the decision, rather than competing with the sketches.
//
// EQUAL FRAMES. Every frame shares one aspect ratio, and the grid gives every column the same
// width, so all frames are the same width AND height at every breakpoint. aspect-[8/5] is the
// taller wireframes' own 960×600 ratio; the 960×520 one sits inside it with a little air above
// and below. A fixed pixel height was the alternative, but at md the columns are about 205px
// wide, where any single height either left a wireframe tiny in a tall empty box or was too
// short at lg.
//
// ALIGNED FRAMES. Titles and paragraphs differ in length, so each column is a flex column and the
// frame takes mt-auto: the three frames always share one top edge, whatever the text above does.
//
// NO CROPPING. The image fills the frame's padded box with object-contain, so it scales to fit
// without being cut or stretched.
//
// CONTRAST, on the page ground: title foundation-900 at 16.9:1, body foundation-600 at 7.38:1.
import Image from 'next/image'

export type Concept = {
  title: string
  body: string
  /* Path under public/, used as-is as the src. */
  image: string
  alt: string
}

export function ConceptRow({ concepts }: { concepts: Concept[] }) {
  return (
    <ol className="m-0 grid list-none grid-cols-1 gap-9 p-0 md:grid-cols-3">
      {concepts.map((concept) => (
        <li key={concept.title} className="m-0 flex flex-col p-0">
          <h4 className="m-0 mb-3 font-grotesk text-heading-m font-medium text-foundation-900">
            {concept.title}
          </h4>
          <p className="m-0 mb-6 font-sans text-body-sm text-foundation-600">{concept.body}</p>
          <div className="mt-auto aspect-[8/5] rounded-lg border border-border bg-body p-4">
            <div className="relative h-full w-full">
              <Image
                src={concept.image}
                alt={concept.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
