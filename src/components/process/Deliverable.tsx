// Shared rendering for one deliverable image, used by every Process layout.
//
// This is infrastructure, not a layout idea: it exists so that filling in an image path in
// processData.ts swaps every layout at once, and so the placeholder state is identical
// everywhere rather than reinvented six times.
//
// PLACEHOLDER STATE: a neutral 16:10 frame — foundation-100 fill, 1px border, and no text
// inside it. No label, no icon, no "image coming" caption: an empty frame reads as a slot
// waiting for artwork, while a captioned box reads as a designed element.
//
// The frame keeps the same aspect ratio whether it holds an image or not, so swapping a real
// screenshot in does not reflow the layout around it.
import type { Deliverable } from './processData'

export function DeliverableFrame({
  item,
  className = '',
}: {
  item: Deliverable
  className?: string
}) {
  const base = 'w-full aspect-[16/10] rounded-lg border border-border overflow-hidden'

  if (!item.src) {
    // Decorative while empty — there is nothing here for a screen reader to describe yet.
    return <div className={`${base} bg-foundation-100 ${className}`} aria-hidden="true" />
  }

  return (
    <div className={`${base} bg-foundation-100 ${className}`}>
      <img src={item.src} alt={item.alt} className="w-full h-full object-cover object-top block" />
    </div>
  )
}
