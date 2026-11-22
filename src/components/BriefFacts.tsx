/* The brief and its four facts as colour tiles (option C, picked Nov 22 2026 over a ruled row and a
   single sage card): one stage tint each, with a small picture where it helps. Two by two on phones. */
import { CalendarDays, PenTool } from 'lucide-react'

export type Facts = { role: string; team: string; teamNote: string; focus: string[]; time: string; timeNote: string }

const LABEL = 'text-label font-sans uppercase tracking-widest text-foundation-600'
const TILE = 'flex min-h-[12.5rem] flex-col rounded-2xl p-4 sm:p-5'
const VALUE = 'm-0 mt-auto pt-5 font-display text-[20px] leading-tight text-foundation-900 sm:text-heading-m'
const NOTE = 'm-0 mt-1 text-body-sm font-sans text-foundation-700'
const DISC = 'flex h-12 w-12 items-center justify-center rounded-full'

export function BriefFacts({ description, facts: f }: { description: string; facts: Facts }) {
  return (
    <div className="mt-10">
      <div className="max-w-4xl">
        <p className={`m-0 ${LABEL}`}>The brief</p>
        <p className="mt-4 mb-0 text-[20px] leading-[1.6] font-sans text-foundation-800">{description}</p>
      </div>
      <dl className="mt-10 mb-0 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className={`${TILE} bg-stage-sage`}>
          <dt className={LABEL}>Role</dt>
          <dd className="m-0 mt-5" aria-hidden="true">
            <span className={`${DISC} bg-stage-sage-strong text-foundation-900`}><PenTool size={22} strokeWidth={1.75} /></span>
          </dd>
          <dd className={VALUE}>{f.role}</dd>
        </div>
        <div className={`${TILE} bg-stage-straw`}>
          <dt className={LABEL}>Team</dt>
          <dd className="m-0 mt-5 flex" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/acentra-team/michael.webp" alt="" width={48} height={48} className="h-12 w-12 rounded-full border-2 border-solid border-stage-straw" />
            {/* the lead developer, cropped from their public GitHub picture (github.com/armper) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/acentra-team/lead-developer.webp" alt="" width={48} height={48} className="-ml-1.5 h-12 w-12 rounded-full border-2 border-solid border-stage-straw" />
          </dd>
          <dd className={VALUE}>{f.team}</dd>
          <dd className={NOTE}>{f.teamNote}</dd>
        </div>
        <div className={`${TILE} bg-stage-ginger`}>
          <dt className={LABEL}>Focus</dt>
          <dd className="m-0 mt-auto pt-5">
            <ul className="m-0 list-none p-0">
              {f.focus.map((x, i) => (
                <li key={x} className={`py-2 font-display text-[17px] leading-tight text-foundation-900 last:pb-0 sm:text-[20px] ${i ? 'border-0 border-t border-solid border-foundation-900/10' : ''}`}>{x}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div className={`${TILE} bg-stage-sky`}>
          <dt className={LABEL}>Timeline</dt>
          <dd className="m-0 mt-5" aria-hidden="true">
            <span className={`${DISC} bg-stage-sky-strong text-foundation-900`}><CalendarDays size={22} strokeWidth={1.75} /></span>
          </dd>
          <dd className={VALUE}>{f.time}</dd>
          <dd className={NOTE}>{f.timeNote}</dd>
        </div>
      </dl>
    </div>
  )
}
