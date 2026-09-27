// GROUP 1, OPTION 1 — equal four-up row. All four frames one size (fit="uniform").
// Four columns from md; from lg the row breaks out of the wrap the way the live concept row does,
// so each shot gets ~420px instead of ~260px. Two-up below md.
import { LightboxProvider } from '@/components/Lightbox'
import { states } from '../shots'
import { Shot } from '../Shot'

export function G1Option1() {
  return (
    <LightboxProvider>
      <div className="lg:ml-[calc(50%-min(900px,50vw-80px))] lg:w-[min(1800px,calc(100vw-160px))]">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {states.map(({ label, shot }) => (
            <Shot key={label} shot={shot} label={label} fit="uniform" sizes="(min-width: 768px) 25vw, 50vw" />
          ))}
        </div>
      </div>
    </LightboxProvider>
  )
}
