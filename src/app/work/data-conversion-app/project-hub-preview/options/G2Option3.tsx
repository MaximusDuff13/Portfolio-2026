// GROUP 2, OPTION 3 — vertical narrative: one step per row, the labelled shot on the left (8 of 12
// columns) and, beside it, one line on what changed. Stacks below md, the line under the shot.
//
// The three lines are the brief's own, in its order: "Schema & Wiki completes", "Mapping &
// Transformation becomes active", "project completes" (capitalised here as a sentence start).
//
// Line: text-body foundation-600, 7.38:1 on the page ground.
import { LightboxProvider } from '@/components/Lightbox'
import { sequence } from '../shots'
import { Shot } from '../Shot'

const changed = ['Schema & Wiki completes', 'Mapping & Transformation becomes active', 'Project completes']

export function G2Option3() {
  return (
    <LightboxProvider>
      <ol className="m-0 flex list-none flex-col gap-16 p-0">
        {sequence.map(({ label, shot }, i) => (
          <li key={label} className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-8">
              <Shot shot={shot} label={label} sizes="(min-width: 768px) 66vw, 100vw" />
            </div>
            <p className="m-0 font-sans text-body text-foundation-600 md:col-span-4">{changed[i]}</p>
          </li>
        ))}
      </ol>
    </LightboxProvider>
  )
}
