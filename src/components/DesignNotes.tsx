'use client'
/* 03's design notes (Nov 22 2026, Michael's idea): the long "How I did it" became two-line notes
   behind one switch, off at first, so the section reads as images and one-liners. Each note folds
   open as a card inside the stage it explains. The words come from the old method text. */
import { createContext, useContext, useState, type ReactNode } from 'react'
import { Pencil } from 'lucide-react'

export type NoteKey = 'green' | 'scale' | 'tokens' | 'type' | 'corners'

const NOTES: Record<NoteKey, string> = {
  green: 'I kept the brand hue and moved only lightness and chroma until it passed on both themes, then placed it at Carbon’s step 60.',
  scale: 'Any two steps 40 apart reach 3:1, and any two 50 apart reach 4.5:1. Teams subtract the grades instead of running a contrast check.',
  tokens: 'Four tokens point at Green 60, and nobody picks the green itself. Every team makes the same choice without asking.',
  type: 'I suggested Roboto over IBM Plex: very legible, and free to use. Teams switch the mode in Figma or in code instead of resizing text.',
  corners: 'Components went from 0 to 2px, which still looks like Carbon. Layouts choose from a scale on the 8px grid, so products can look different.',
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
      <Pencil size={16} strokeWidth={2} aria-hidden="true" />
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
          <Pencil size={16} strokeWidth={2} className="mt-1 flex-none text-accent-warm" aria-hidden="true" />
          <p className="m-0 font-sans text-body-sm text-foundation-900">{NOTES[k]}</p>
        </div>
      </div>
    </div>
  )
}
