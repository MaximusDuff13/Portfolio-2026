// ConceptRow — the explored concepts for one feature, as wireframes side by side.
//
// NEW COMPONENT. Replaced the side-by-side screenshot comparison for features where the argument is made with
// sketches rather than screenshots: each concept gets a title, the reasoning, then its wireframe.
// The real product appears once, after the decision, rather than competing with the sketches.
//
// EQUAL FRAMES. Every column is the same width (the grid), and every frame's image box takes the
// same shape: Inline table's own 960×522, the tallest of the three wireframes. So the three frames
// are identical at every width, Inline table fills its box exactly, and the wider Detail panel
// (960×430) and Review queue (960×498) sit inside with a little air above and below. A shape
// rather than a fixed height, because the row's width is fluid (the page breaks it out to up to
// 1800px): a fixed height fits only one viewport width and leaves the frames half-empty at others.
//
// PADDING p-2. The SVGs are cropped tight top and bottom (they keep ~30px of their own margin at
// the sides), so p-4 only added back empty space. At p-0 the tallest wireframe's top and bottom
// edges sat a few pixels from the frame's border; p-2 keeps a little even air all round.
//
// ALIGNED FRAMES. Titles and paragraphs differ in length, so each column is a flex column and the
// frame takes mt-auto: the three frames always share one top edge, whatever the text above does.
//
// NO CROPPING. The image fills the frame's padded box with object-contain, so it scales to fit
// without being cut or stretched.
//
// ENLARGE. Each wireframe has a LightboxTrigger laid over it (absolute inset-0 inside the
// already-relative image box), so it opens full-size without changing any sizing here. The page
// supplies the LightboxProvider.
//
// CONTRAST, on the page ground: title foundation-900 at 16.9:1, body foundation-600 at 7.38:1.
import Image from 'next/image'
import { LightboxTrigger } from './Lightbox'

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
          <div className="mt-auto rounded-lg border border-border bg-body p-2">
            <div className="relative aspect-[960/522] w-full">
              <Image
                src={concept.image}
                alt={concept.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-contain"
              />
              <LightboxTrigger src={concept.image} alt={concept.alt} />
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
