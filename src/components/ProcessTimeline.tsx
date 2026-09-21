// ProcessTimeline — the four phases of the design work, drawn as one continuous track.
//
// NEW COMPONENT. Sequence is carried by a drawn line and by list order, not by step numbers:
// the conversion process elsewhere on this page already has numbered steps, and a second set
// of numerals would read as the same sequence twice.
//
// THE CONTINUOUS LINE. Each column draws its own 1px rule edge to edge inside a 10px-tall
// track, and the grid runs at gap-x-0, so adjacent rules meet exactly and the four columns
// read as one line. A dot marks the start of each phase; only the last column closes with an
// arrowhead, built from CSS borders rather than an icon or an image.
//
// BELOW lg the track would have nothing to connect, so the figure becomes a vertical list
// with the line running down the left edge and the dots straddling it. No arrowhead there:
// the line ends at the last item's baseline, where a horizontal arrow would point nowhere.
//
// NO accent-warm anywhere in this figure. The accent belongs to the sections that carry the
// numbers; a process diagram is structure, not emphasis.
//
// CONTRAST. Every text colour here is measured against FigureCard’s foundation-100 ground:
// the phase labels at foundation-900 (16.03:1) and the bullets at foundation-600 (6.99:1).
// foundation-500 is deliberately not used for text on this ground — it measures 4.40:1,
// under AA’s 4.5:1.
import { FigureCard } from './FigureCard'

export type ProcessPhase = {
  label: string
  items: string[]
}

export function ProcessTimeline({
  title,
  phases,
}: {
  title: string
  phases: ProcessPhase[]
}) {
  return (
    <FigureCard title={title}>
      {/* THREE SHARED ROWS. At lg each item dissolves into the parent grid, which runs
          column-first over rows of label / track / bullets. Every column therefore draws its
          track from the same row, so the dots stay on one line however many lines a phase
          label wraps to — "Information architecture" takes two lines in a narrow column, and
          without this the four dots drift apart by a line's height. */}
      <ol className="m-0 list-none p-0 lg:grid lg:grid-cols-4 lg:grid-flow-col lg:grid-rows-[auto_auto_1fr] lg:gap-x-0">
        {phases.map((phase, i) => {
          const last = i === phases.length - 1
          return (
            <li
              key={phase.label}
              className={`relative border-l border-foundation-300 pl-6 lg:contents ${
                last ? 'pb-0' : 'pb-8'
              }`}
            >
              {/* The stacked marker: straddles the left rule, and is replaced by the track
                  marker from lg up. */}
              <span
                aria-hidden="true"
                className="absolute left-[-5px] top-1.5 block h-[10px] w-[10px] rounded-full border border-foundation-700 bg-foundation-100 lg:hidden"
              />

              <h3 className="mb-4 font-grotesk text-body font-medium text-foundation-900">
                {phase.label}
              </h3>

              {/* The track. Decorative: the order is already carried by the <ol>. */}
              <div aria-hidden="true" className="relative hidden h-[10px] lg:block">
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-foundation-300" />
                <span className="absolute left-0 top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full border border-foundation-700 bg-foundation-100" />
                {last && (
                  <span className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[3px] border-l-[6px] border-y-transparent border-l-foundation-400" />
                )}
              </div>

              {/* pr-6 keeps a bullet clear of the next column's dot. mt-4 only from lg, where
                  the track sits between the label and the list; stacked, the label's own mb-4
                  is the whole gap. */}
              <ul className="m-0 mt-0 list-disc space-y-1 pl-5 font-sans text-body-sm text-foundation-600 marker:text-foundation-400 lg:mt-4">
                {phase.items.map((item) => (
                  <li key={item} className="pr-6">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ol>
    </FigureCard>
  )
}
