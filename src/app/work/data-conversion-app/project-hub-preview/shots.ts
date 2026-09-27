// The six project hub screenshots, in kebab-case. The originals ("Project hub/Schema & Wiki -
// Error State.png" etc.) were renamed: an ampersand in a public file name 404s under `next start`
// (as a static file and through the image optimizer), though `next dev` serves it. Spaces alone
// worked, but the whole set was renamed for consistency.
const dir = '/images/data-conversion-app/project-hub/'

export type Shot = { key: string; src: string; width: number; height: number; alt: string }

const shot = (key: string, file: string, width: number, height: number, alt: string): Shot => ({
  key,
  src: dir + file,
  width,
  height,
  alt,
})

// Alt text is built only from the given state and step names.
export const enable = shot('enable', 'schema-wiki-in-progress.png', 1312, 951, 'Schema & Wiki step, Enable state')
export const generating = shot('generating', 'schema-wiki-generating-wiki.png', 2624, 1902, 'Schema & Wiki step, Generating state')
export const success = shot('success', 'schema-wiki-success-state.png', 2624, 1984, 'Schema & Wiki step, Success state')
export const error = shot('error', 'schema-wiki-error-state.png', 512, 372, 'Schema & Wiki step, Error state')
export const mappingActive = shot('mapping-active', 'mapping-screen-in-progress.png', 5248, 3804, 'Project hub, Mapping & Transformation active')
export const completed = shot('completed', 'after-mapping-completed.png', 5248, 3804, 'Project hub, Project completed')

/* Group 1: one step, every state. */
export const states = [
  { label: 'Enable', shot: enable },
  { label: 'Generating', shot: generating },
  { label: 'Success', shot: success },
  { label: 'Error', shot: error },
]

/* Group 2: built to scale. The first step reuses the Enable screenshot: it is the hub with
   Schema & Wiki as the active card and Mapping & transformation under Next steps. */
export const sequence = [
  { label: 'Schema & Wiki active', shot: { ...enable, alt: 'Project hub, Schema & Wiki active' } },
  { label: 'Mapping & Transformation active', shot: mappingActive },
  { label: 'Project completed', shot: completed },
]
