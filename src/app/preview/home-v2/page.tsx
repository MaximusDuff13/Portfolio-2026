// TEMPORARY — /preview/home-v2: the index of seven non-newspaper home page approaches.
// Delete this whole folder once a direction is chosen.
import Link from 'next/link'
import { approaches } from './content'

const PICK = 2

export default function PreviewHomeV2Index() {
  return (
    <main className="min-h-screen bg-body px-6 pb-24 pt-16 text-foundation-900 sm:px-10 lg:px-section">
      <div className="mx-auto max-w-6xl">
        <p className="m-0 font-grotesk text-label uppercase tracking-widest text-foundation-500">Home page approaches</p>
        <h1 className="m-0 mt-4 font-grotesk text-display-xl">Seven ways in</h1>
        <p className="m-0 mt-4 max-w-2xl font-sans text-body text-foundation-600">
          Same copy, same tokens, seven layouts learned from well-regarded portfolios. All motion is
          subtle and switches off with reduced motion. The bar at the bottom of each page switches
          between them. The Classifieds is still at{' '}
          <Link href="/preview/home" className="text-foundation-900 underline underline-offset-4">/preview/home</Link>.
        </p>

        <ol className="m-0 mt-12 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {approaches.map(({ n, name, idea, from }) => (
            <li key={n} className="m-0">
              <Link
                href={`/preview/home-v2/${n}`}
                className={`group flex h-full flex-col rounded-2xl border bg-[#fffdf9] p-7 no-underline transition-colors hover:border-foundation-400 ${
                  n === PICK ? 'border-accent-warm' : 'border-border'
                }`}
              >
                <span className="flex items-center justify-between font-grotesk text-label uppercase tracking-widest text-foundation-500">
                  No. {n}
                  {n === PICK && <span className="rounded-full bg-accent-subtle px-2 py-1 text-accent-warm">Recommended</span>}
                </span>
                <span className="mt-3 block font-grotesk text-heading-m text-foundation-900 group-hover:text-accent-warm">{name}</span>
                <span className="mt-3 block flex-1 font-sans text-body-sm text-foundation-700">{idea}</span>
                <span className="mt-5 block font-sans text-caption text-foundation-500">Learns from: {from}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
