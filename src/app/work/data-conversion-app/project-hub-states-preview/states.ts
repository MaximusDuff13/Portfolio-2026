// The four Schema & Wiki states, straight from the live content (src, alt, label, order), plus each
// image's natural size. Sizes are constants so every stage and grid cell has its shape in CSS
// before any image loads.
import { projectHubStates, projectHubCompleted } from '../projectHub'

const HEIGHTS: Record<string, number> = { enable: 982, generating: 816, success: 1131, error: 843 }

export const IMAGE_WIDTH = 3000
export const TALLEST = Math.max(...Object.values(HEIGHTS))

export const states = projectHubStates.map((s) => ({ ...s, height: HEIGHTS[s.id] }))
export type SizedState = (typeof states)[number]

export const hub = projectHubCompleted
