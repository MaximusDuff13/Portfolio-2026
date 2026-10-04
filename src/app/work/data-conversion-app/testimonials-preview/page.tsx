import type { Metadata } from 'next'
import { OptionShell } from './OptionShell'
import { Option1 } from './Option1'
import { Option2 } from './Option2'
import { Option3 } from './Option3'
import { Option4 } from './Option4'
import { Option5 } from './Option5'

// TEMPORARY PREVIEW — layout options for a Testimonials section after the four problem-and-solution
// features. Unlinked and noindex'd; nothing routes here, and the live page imports nothing from
// this folder, so deleting the folder is the whole clean-up.

export const metadata: Metadata = {
  title: 'Testimonials — layout options',
  robots: { index: false, follow: false },
}

export default function TestimonialsPreviewPage() {
  return (
    <main className="bg-body">
      <OptionShell label="Option 1">
        <Option1 />
      </OptionShell>
      <OptionShell label="Option 2">
        <Option2 />
      </OptionShell>
      <OptionShell label="Option 3">
        <Option3 />
      </OptionShell>
      <OptionShell label="Option 4">
        <Option4 />
      </OptionShell>
      <OptionShell label="Option 5">
        <Option5 />
      </OptionShell>
    </main>
  )
}
