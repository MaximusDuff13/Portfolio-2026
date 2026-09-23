// VariantComparison — one feature explored as several variants side by side, then the call.
//
// NEW COMPONENT. The shape is intro → columns → recommendation, which is the argument a design
// exploration actually makes: here is the problem, here is what we tried, here is what shipped
// and why. The recommendation sits below the columns rather than inside the shipped one, because
// it is a judgement about all three.
//
// COLUMNS ARE items-start, not stretched. A variant with two screenshots is genuinely taller
// than one with a single screenshot, and stretching the short columns to match would invent
// empty space under their images rather than tell the reader anything.
//
// ACCENT. accent-warm appears exactly twice: the "Shipped" tag and the recommendation's left
// border. No body text is ever accent-coloured.
//
// CONTRAST, measured against the ground each element actually sits on:
//   · the variant name at foundation-900 on the page ground — 15.5:1;
//   · the intro, variant bodies and the recommendation at foundation-600 — 8.0:1 on the page
//     ground, 6.99:1 on the callout's foundation-100;
//   · the placeholder caption at foundation-600 on the frame's foundation-100 — 6.99:1.
//     foundation-500 is NOT used for text on a foundation-100 ground anywhere here: it measures
//     4.40:1, under AA's 4.5:1. Same trade FigureCard and PrincipleGrid already make.
//
// IMAGES are decorative in the list sense — the order of a variant's screens carries no meaning
// a reader needs — so each variant's images are an unstyled <ul>. They stay real <img> elements
// with their own alt text, which is where the description lives.
import Image from 'next/image'

export type VariantImage = {
  file: string
  alt: string
  /* Set when the file exists under public/. Absent means the frame renders as a placeholder
     captioned with the filename, so the missing asset is easy to find and swap in later. */
  src?: string
}

export type Variant = {
  name: string
  body: string
  shipped?: boolean
  images: VariantImage[]
}

const FRAME =
  'relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-foundation-100'

export function VariantComparison({
  intro,
  variants,
  recommendation,
}: {
  intro: string
  variants: Variant[]
  recommendation: string
}) {
  return (
    <div>
      <p className="max-w-3xl font-sans text-body text-foundation-600">{intro}</p>

      <ol className="m-0 mt-10 grid list-none grid-cols-1 items-start gap-8 p-0 md:grid-cols-3">
        {variants.map((variant) => (
          <li key={variant.name} className="m-0 p-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h4 className="m-0 font-grotesk text-body font-medium text-foundation-900">
                {variant.name}
              </h4>
              {variant.shipped && (
                <span className="rounded-full border border-accent-warm px-2 py-0.5 text-label font-grotesk uppercase tracking-widest text-accent-warm">
                  Shipped
                </span>
              )}
            </div>

            <p className="mt-2 font-sans text-body-sm text-foundation-600">{variant.body}</p>

            <ul className="m-0 mt-6 flex list-none flex-col gap-4 p-0">
              {variant.images.map((image) => (
                <li key={image.file} className="m-0 p-0">
                  {image.src ? (
                    <div className={FRAME}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    /* The asset is not in the repo yet. The frame is identical, so the layout
                       it will sit in is already the layout being measured, and the caption is
                       the filename so the swap is a search away. */
                    <div className={`${FRAME} flex items-center justify-center p-4`}>
                      <span className="text-center font-sans text-body-sm text-foundation-600">
                        {image.file}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-12 border-l-2 border-accent-warm bg-foundation-100 p-5">
        <p className="m-0 font-sans text-body text-foundation-600">{recommendation}</p>
      </div>
    </div>
  )
}
