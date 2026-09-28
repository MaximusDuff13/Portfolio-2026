import type { Metadata } from 'next'
import { OptionShell } from './OptionShell'
import { OptionA1 } from './OptionA1'

// TEMPORARY PREVIEW — ways to show the Schema & Wiki states under the hub screenshot. Unlinked and
// noindex'd; nothing routes here, and the live page imports nothing from this folder, so deleting
// the folder is the whole clean-up.

export const metadata: Metadata = {
  title: 'Project hub — states options',
  robots: { index: false, follow: false },
}

export default function ProjectHubStatesPreviewPage() {
  return (
    <main className="bg-foundation-800">
      <OptionShell label="Option A1">
        <OptionA1 />
      </OptionShell>
    </main>
  )
}
