import type { Metadata } from 'next'
import { MappingLayouts } from './MappingLayouts'

// TEMPORARY PREVIEW — see MappingLayouts.tsx. Unlinked and noindex'd, the same way
// /dev/glance-layouts is. Nothing on the site routes here; open it by URL.

export const metadata: Metadata = {
  title: 'Mapping & transformation — layout options',
  robots: { index: false, follow: false },
}

export default function MappingLayoutsPage() {
  // overflow-x-clip: the bands are w-screen, which is viewport width INCLUDING the scrollbar
  // gutter. Without this, those few pixels would register as a horizontal scroll on the page.
  return (
    <main className="overflow-x-clip pt-32">
      <MappingLayouts />
    </main>
  )
}
