import type { Metadata } from 'next'
import { Option1 } from './options/Option1'
import { Option2 } from './options/Option2'
import { Option3 } from './options/Option3'
import { Option4 } from './options/Option4'
import { Option5 } from './options/Option5'

// TEMPORARY PREVIEW — sizing options for the three wireframes in the Mapping & transformation
// feature's ConceptRow. Unlinked and noindex'd; nothing routes here. The live page does not
// import from this folder, so deleting the folder is the whole clean-up.
//
// Each option sits in the same frame the live Features section uses — the section gutters and a
// max-w-6xl wrap — so its sizes are the sizes it would have on the real page.

export const metadata: Metadata = {
  title: 'Mapping wireframes — sizing options',
  robots: { index: false, follow: false },
}

const OPTIONS = [
  { id: 'Option 1', node: <Option1 /> },
  { id: 'Option 2', node: <Option2 /> },
  { id: 'Option 3', node: <Option3 /> },
  { id: 'Option 4', node: <Option4 /> },
  { id: 'Option 5', node: <Option5 /> },
]

export default function WireframeSizingPreviewPage() {
  return (
    <main className="pt-section">
      {OPTIONS.map(({ id, node }, i) => (
        <section
          key={id}
          id={`option-${i + 1}`}
          className="px-6 pb-section sm:px-10 lg:px-section"
        >
          <div className={`mx-auto max-w-6xl ${i > 0 ? 'border-t border-foundation-300 pt-section' : ''}`}>
            {/* Preview chrome. Dev-only: this caption never ships to the case study page. */}
            <p className="mb-10 text-label font-grotesk uppercase tracking-widest text-foundation-500">
              {id}
            </p>
            {node}
          </div>
        </section>
      ))}
    </main>
  )
}
