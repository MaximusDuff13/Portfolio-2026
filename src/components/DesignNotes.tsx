'use client'
/* 03's design notes (Nov 22 2026, Michael's idea): the long "How I did it" became two-line notes
   behind one switch, off at first, so the section reads as images and one-liners. Each note folds
   open as a card inside the stage it explains. The words come from the old method text. */
import { createContext, useContext, useState, type ReactNode } from 'react'

export type NoteKey = 'green' | 'scale' | 'tokens' | 'type' | 'corners'

const NOTES: Record<NoteKey, string> = {
  green: 'The brand green had to pass contrast without losing the brand’s look. Changing only lightness and saturation got it there: text on white, buttons and icons on dark, at step 60 on Carbon’s scale.',
  scale: 'Every team needed accessible colour pairs without checking each one. The numbers work across all of Carbon’s colours: Green 60 on Gray 10 is 50 apart, so it reaches 4.5:1 for text, and 40 apart reaches 3:1. Teams just subtract.',
  tokens: 'Many teams, one green, and no room for each picking its own shade. Four tokens point at Green 60, so teams pick a role instead. Every team makes the same choice without asking, and changing the green later is one edit.',
  type: 'Carbon’s type is built for dense enterprise tools, but our healthcare customers needed easier reading while internal staff wanted more on screen. I built two modes on one set of tokens: Standard at 16px, Compact at 14px. Teams switch modes instead of resizing text.',
  corners: 'Carbon’s 0px border radius felt too stark for healthcare, but the system still had to read as Carbon. Components moved to a 2px border radius; tiles, tables and containers choose from 0 to 16px.',
}

const Ctx = createContext<{ on: boolean; setOn: (v: boolean) => void }>({ on: false, setOn: () => {} })

export function DesignNotesProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false)
  return <Ctx.Provider value={{ on, setOn }}>{children}</Ctx.Provider>
}

export function DesignNotesSwitch() {
  const { on, setOn } = useContext(Ctx)
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className="inline-flex min-h-[44px] cursor-pointer items-center gap-3 rounded-full border border-solid border-foundation-300 bg-transparent py-1 pl-4 pr-3 font-sans text-body-sm font-medium text-foundation-900 hover:border-foundation-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-warm"
    >
      Design notes
      <span aria-hidden="true" className={`relative h-6 w-10 flex-none rounded-full transition-colors motion-reduce:transition-none ${on ? 'bg-accent-warm' : 'bg-foundation-300'}`}>
        <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform motion-reduce:transition-none ${on ? 'translate-x-4' : ''}`} />
      </span>
    </button>
  )
}

/* folds open at the foot of a stage; `card` tints it where there is no stage behind it */
export function DesignNote({ k, className = '', card = 'bg-body' }: { k: NoteKey; className?: string; card?: string }) {
  const { on } = useContext(Ctx)
  return (
    <div aria-hidden={!on} className={`grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} ${className}`}>
      <div className="overflow-hidden">
        <div className={`mt-4 flex gap-3 rounded-lg p-4 ${card}`}>
          <p className="m-0 font-sans text-body-sm text-foundation-900">{NOTES[k]}</p>
        </div>
      </div>
    </div>
  )
}
