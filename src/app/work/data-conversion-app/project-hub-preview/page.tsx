import type { Metadata } from 'next'
import { G1Option1 } from './options/G1Option1'
import { G1Option2 } from './options/G1Option2'
import { G1Option3 } from './options/G1Option3'
import { G1Option4 } from './options/G1Option4'
import { G2Option1 } from './options/G2Option1'
import { G2Option2 } from './options/G2Option2'
import { G2Option3 } from './options/G2Option3'

// TEMPORARY PREVIEW — layout options for the project hub screenshots: Group 1 (one step, every
// state) and Group 2 (built to scale). Unlinked and noindex'd; nothing routes here. The live page
// does not import from this folder, so deleting the folder is the whole clean-up.
//
// Each option sits in the live page's section frame (gutters, max-w-6xl wrap) on the page ground.

export const metadata: Metadata = {
  title: 'Project hub — layout options',
  robots: { index: false, follow: false },
}

const OPTIONS = [
  { id: 'Group 1 – Option 1', node: <G1Option1 /> },
  { id: 'Group 1 – Option 2', node: <G1Option2 /> },
  { id: 'Group 1 – Option 3', node: <G1Option3 /> },
  { id: 'Group 1 – Option 4', node: <G1Option4 /> },
  { id: 'Group 2 – Option 1', node: <G2Option1 /> },
  { id: 'Group 2 – Option 2', node: <G2Option2 /> },
  { id: 'Group 2 – Option 3', node: <G2Option3 /> },
]

export default function ProjectHubPreviewPage() {
  return (
    <main className="pt-section">
      {OPTIONS.map(({ id, node }, i) => (
        <section key={id} data-ph-option={id} className="px-6 pb-section sm:px-10 lg:px-section">
          <div className={`mx-auto max-w-6xl ${i > 0 ? 'border-t border-foundation-300 pt-section' : ''}`}>
            {/* Preview chrome. Dev-only: this caption never ships to the case study page.
                foundation-600, not accent-warm: accent-warm is 4.09:1 on the page ground. */}
            <p className="mb-10 text-label font-grotesk uppercase tracking-widest text-foundation-600">{id}</p>
            {node}
          </div>
        </section>
      ))}
    </main>
  )
}
