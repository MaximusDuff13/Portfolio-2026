// OPTION A3 — focus carousel. Now the live StateCarousel; the preview renders the same component.
import { StateCarousel } from '@/components/StateCarousel'
import { states } from './states'

export function OptionA3() {
  return (
    <div data-anim-option="A3">
      <StateCarousel states={states} />
    </div>
  )
}
