// One labelled screenshot, the way every option shows it: its label above, then the frame the
// live page uses for its shipped screenshot (rounded-lg, border-border), with the image fitted by
// object-contain — never cropped or stretched — and the live click-to-enlarge trigger over it.
// The option must wrap its shots in a LightboxProvider.
//
// fit="natural": the frame takes the image's own aspect ratio, so it wraps the image exactly.
// fit="uniform": the frame takes the hub screenshots' shared 5248:3804 shape, so shots in a row
//   are all one size; an image of another shape (Success, 2624:1984) sits inside with a little
//   air at the sides rather than being cropped.
import Image from 'next/image'
import { LightboxTrigger } from '@/components/Lightbox'
import type { Shot as ShotData } from './shots'

export function Shot({
  shot,
  label,
  fit = 'natural',
  sizes,
}: {
  shot: ShotData
  label: string
  fit?: 'natural' | 'uniform'
  sizes: string
}) {
  return (
    <figure className="m-0">
      <figcaption className="mb-3 font-grotesk text-body font-medium text-foundation-900">{label}</figcaption>
      <div data-shot={shot.key} className="overflow-hidden rounded-lg border border-border bg-body">
        <div
          className="relative w-full"
          style={{ aspectRatio: fit === 'uniform' ? '5248 / 3804' : `${shot.width} / ${shot.height}` }}
        >
          <Image src={shot.src} alt={shot.alt} fill sizes={sizes} className="object-contain" />
          <LightboxTrigger src={shot.src} alt={shot.alt} />
        </div>
      </div>
    </figure>
  )
}
