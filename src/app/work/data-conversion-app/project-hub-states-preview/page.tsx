import type { Metadata } from 'next'
import { OptionShell } from './OptionShell'
import { OptionA1 } from './OptionA1'
import { OptionA2 } from './OptionA2'
import { OptionA3 } from './OptionA3'
import { OptionB } from './OptionB'

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
      <OptionShell label="Option A2">
        <OptionA2 />
      </OptionShell>
      <OptionShell label="Option A3">
        <OptionA3 />
      </OptionShell>
      <OptionShell label="Option B">
        <OptionB />
      </OptionShell>
    </main>
  )
}
