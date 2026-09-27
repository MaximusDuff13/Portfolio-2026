// GROUP 1, OPTION 2 — 2×2 grid within the page wrap. All four frames one size (fit="uniform"),
// reading Enable, Generating / Success, Error. One column below md.
import { LightboxProvider } from '@/components/Lightbox'
import { states } from '../shots'
import { Shot } from '../Shot'

export function G1Option2() {
  return (
    <LightboxProvider>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
        {states.map(({ label, shot }) => (
          <Shot key={label} shot={shot} label={label} fit="uniform" sizes="(min-width: 768px) 50vw, 100vw" />
        ))}
      </div>
    </LightboxProvider>
  )
}
