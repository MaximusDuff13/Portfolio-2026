import type { Metadata } from 'next'
import { LayoutPreview } from './LayoutPreview'

// TEMPORARY PREVIEW — full-bleed screenshot layouts for the Mapping & transformation feature.
// Unlinked and noindex'd, like /dev/mapping-layouts and /dev/glance-layouts. Nothing on the site
// routes here; open it by URL. The live /work/data-conversion-app page does not import from this
// folder, so deleting the folder is the whole clean-up.

export const metadata: Metadata = {
  title: 'Mapping & transformation — full-bleed layout options',
  robots: { index: false, follow: false },
}

export default function LayoutPreviewV2Page() {
  // pt-section clears the fixed header (the root layout already pads by its h-14). No width
  // clamp here: every band below spans the full client width on its own, and only the text
  // inside it drops back into the max-w-6xl wrap.
  return (
    <main className="pt-section">
      <LayoutPreview />
    </main>
  )
}
