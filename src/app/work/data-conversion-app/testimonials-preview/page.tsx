import type { Metadata } from 'next'
import { OptionShell } from './OptionShell'
import { Option4a } from './Option4a'

// TEMPORARY PREVIEW — layout options for a Testimonials section after the four problem-and-solution
// features. Unlinked and noindex'd; nothing routes here, and the live page imports nothing from
// this folder, so deleting the folder is the whole clean-up.
//
// Shows the asymmetric-split variations (4a–4e), built from Option 4. Options 1–5 are no longer
// rendered; their files stay in the folder, and each is in its own commit on this branch.

export const metadata: Metadata = {
  title: 'Testimonials — layout options',
  robots: { index: false, follow: false },
}

export default function TestimonialsPreviewPage() {
  return (
    <main className="bg-body">
      <OptionShell label="Option 4a">
        <Option4a />
      </OptionShell>
    </main>
  )
}
