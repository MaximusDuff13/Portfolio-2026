// GROUP 1, OPTION 3 — Success large, the other three small underneath.
// Success runs the full wrap at its own aspect ratio (fit="natural"); Enable, Generating and Error
// follow three-up at one shared size (fit="uniform"), one column below md.
import { LightboxProvider } from '@/components/Lightbox'
import { states } from '../shots'
import { Shot } from '../Shot'

export function G1Option3() {
  const hero = states.find((s) => s.label === 'Success')!
  const rest = states.filter((s) => s.label !== 'Success')
  return (
    <LightboxProvider>
      <Shot shot={hero.shot} label={hero.label} sizes="(min-width: 1152px) 1120px, 100vw" />
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {rest.map(({ label, shot }) => (
          <Shot key={label} shot={shot} label={label} fit="uniform" sizes="(min-width: 768px) 33vw, 100vw" />
        ))}
      </div>
    </LightboxProvider>
  )
}
