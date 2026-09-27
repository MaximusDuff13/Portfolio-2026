// The six project hub screenshots. Folder and file names keep their spaces and ampersands on
// disk; each path segment is encoded with encodeURIComponent, the same pre-encoded form the live
// page uses for its screenshots, so the src is exactly the URL the browser requests.
const dir = '/images/data-conversion-app/' + encodeURIComponent('Project hub') + '/'

export type Shot = { key: string; src: string; width: number; height: number; alt: string }

const shot = (key: string, file: string, width: number, height: number, alt: string): Shot => ({
  key,
  src: dir + encodeURIComponent(file),
  width,
  height,
  alt,
})

// Alt text is built only from the given state and step names.
export const enable = shot('enable', 'Schema & Wiki - InProgress.png', 1312, 951, 'Schema & Wiki step, Enable state')
export const generating = shot('generating', 'Schema & Wiki - Generating Wiki.png', 2624, 1902, 'Schema & Wiki step, Generating state')
export const success = shot('success', 'Schema & Wiki - Success State.png', 2624, 1984, 'Schema & Wiki step, Success state')
export const error = shot('error', 'Schema & Wiki - Error State.png', 512, 372, 'Schema & Wiki step, Error state')
export const mappingActive = shot('mapping-active', 'Mapping Screen - In Progress.png', 5248, 3804, 'Project hub, Mapping & Transformation active')
export const completed = shot('completed', 'After Mapping Completed.png', 5248, 3804, 'Project hub, Project completed')

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
