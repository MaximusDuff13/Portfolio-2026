import type { Metadata } from 'next'
import { OptionShell } from './OptionShell'
import { Option1 } from './Option1'

// TEMPORARY PREVIEW — layout options for the closing "What I learned" and "Next steps" section,
// after Testimonials. Unlinked and noindex'd; nothing routes here, and the live page imports
// nothing from this folder, so deleting the folder is the whole clean-up.

export const metadata: Metadata = {
  title: 'What I learned / Next steps — layout options',
  robots: { index: false, follow: false },
}

export default function LearnedNextPreviewPage() {
  return (
    <main className="bg-body">
      <OptionShell label="Option 1">
        <Option1 />
      </OptionShell>
    </main>
  )
}
