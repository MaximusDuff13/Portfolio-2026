import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/* TEMPORARY — /explore index: the five directions side by side, with what to look for. The
   full rationale and token lists are in DIRECTIONS.md at the project root. */

const directions = [
  {
    id: 'a',
    name: 'House Style',
    line: 'The baseline. Only the existing tokens: warm off-white, stone, accent.warm, Space Grotesk and Inter.',
    cleanup: 'A rotating status in UX vocabulary slides up line by line while each phrase’s share of the cards slides off the nearest edge. The count resolves.',
    loop: 'Plays after the cleanup.',
    swatches: ['#fdfbf7', '#1c1917', '#78716c', '#c2600a'],
  },
  {
    id: 'b',
    name: 'Canvas',
    line: 'Product-native. The page as a design file: dotted canvas, frames with layer names, a status bar.',
    cleanup: 'A marquee selection drags across the canvas, tags every layer Keep, Merge or Remove, deletes, stacks the repeats, then auto-layouts the work.',
    loop: 'Plays from the start: it is the one live prototype on the canvas.',
    swatches: ['#efefec', '#ffffff', '#18181b', '#0b6bde'],
  },
  {
    id: 'c',
    name: 'Affinity Wall',
    line: 'Tactile and playful. A research synthesis wall: sticky notes, index cards, a polaroid, marker.',
    cleanup: 'Affinity mapping. Notes cluster, the clusters get marker headings, the work is dot-voted, the rest comes off the wall. A marker checklist ticks through.',
    loop: 'Plays after the cleanup.',
    swatches: ['#cddcec', '#fffdf8', '#ffe27a', '#c8262f'],
  },
  {
    id: 'd',
    name: 'Grid System',
    line: 'Technical. A visible twelve-column grid with a numbered ruler; everything off the grid carries a redline.',
    cleanup: 'A heuristic review (H4, H6, H8, H1) ticks through while cards snap to columns, sort into lists, lose what isn’t essential and drop into place.',
    loop: 'Plays after the cleanup.',
    swatches: ['#f7f7f4', '#0f0f0f', '#6e6e68', '#2443d6'],
  },
  {
    id: 'e',
    name: 'Contact Sheet',
    line: 'Dark and cinematic. A roll of film: the loop is frame 01, the title card is frame 02, the noise is the rest of the roll.',
    cleanup: 'A chinagraph pencil crosses out frames, rings the selects, hatches the rest and prints the selects where the tabs will be. The slate counts down.',
    loop: 'Plays from the start: the projector is running.',
    swatches: ['#0b0b0a', '#151413', '#f1ede4', '#f2c230'],
  },
]

export default function ExploreIndex() {
  return (
    <div className="explore-root min-h-screen bg-body text-foundation-900 [--x-bg:#fdfbf7]">
      <main className="px-6 sm:px-10 lg:px-section py-16 max-w-[1280px]">
        <h1 className="font-grotesk text-heading-xl sm:text-display-xl text-foundation-900 max-w-[18ch]">
          Five directions for the home page header and tabs
        </h1>
        <p className="mt-6 text-body text-foundation-700 max-w-[62ch]">
          Each one plays the same sequence (noise, a cleanup, the resolved page with tabs) in its own design language. Open
          one, let it play, then use Replay intro. The switcher in the bottom-left jumps between them and toggles light and
          dark. Turn on reduced motion in your OS to see the cross-fade version.
        </p>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
          {directions.map((d) => (
            <li key={d.id}>
              <Link
                href={`/explore/${d.id}`}
                className="group relative flex h-full flex-col rounded-2xl border border-border bg-body p-6 no-underline text-foundation-900 transition-shadow hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-body"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-foundation-900 font-grotesk text-sm font-semibold text-body">
                    {d.id.toUpperCase()}
                  </span>
                  <span className="font-grotesk text-heading-m">{d.name}</span>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-foundation-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="mt-5 flex gap-1.5" aria-hidden="true">
                  {d.swatches.map((s) => (
                    <span key={s} className="h-6 flex-1 rounded-md border border-border" style={{ background: s }} />
                  ))}
                </span>
                <span className="mt-5 text-body-sm text-foundation-700">{d.line}</span>
                <span className="mt-4 text-body-sm text-foundation-700">
                  <span className="font-medium text-foundation-900">Cleanup. </span>
                  {d.cleanup}
                </span>
                <span className="mt-4 text-body-sm text-foundation-700">
                  <span className="font-medium text-foundation-900">Loop. </span>
                  {d.loop}
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-caption text-foundation-600 max-w-[62ch]">
          Only the two case studies are real. Everything marked Sample is stand-in content, kept in
          src/app/explore/_data/content.ts. Nothing here is linked from the live site.
        </p>
      </main>
    </div>
  )
}
