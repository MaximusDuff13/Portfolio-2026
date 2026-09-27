// GROUP 2, OPTION 1 — equal three-up row with a chevron between each step.
// All three hub shots share one aspect ratio, so fit="natural" gives three equal frames. From lg
// the row takes the concept row's wide breakout. Below md the steps stack and the chevrons turn
// to point down. Chevrons: lucide, 24px, 1.5 stroke (the page's icon weight), foundation-500
// (4.61:1 on the page ground), aria-hidden — the order of the steps already carries the sequence.
import { Fragment } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { LightboxProvider } from '@/components/Lightbox'
import { sequence } from '../shots'
import { Shot } from '../Shot'

export function G2Option1() {
  return (
    <LightboxProvider>
      <div className="lg:ml-[calc(50%-min(900px,50vw-80px))] lg:w-[min(1800px,calc(100vw-160px))]">
        <ol className="m-0 grid list-none grid-cols-1 items-center gap-4 p-0 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-3">
          {sequence.map(({ label, shot }, i) => (
            <Fragment key={label}>
              {i > 0 && (
                <li aria-hidden="true" className="flex justify-center text-foundation-500 md:pt-8">
                  <ChevronRight size={24} strokeWidth={1.5} className="hidden md:block" />
                  <ChevronDown size={24} strokeWidth={1.5} className="md:hidden" />
                </li>
              )}
              <li className="min-w-0">
                <Shot shot={shot} label={label} sizes="(min-width: 768px) 33vw, 100vw" />
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </LightboxProvider>
  )
}
