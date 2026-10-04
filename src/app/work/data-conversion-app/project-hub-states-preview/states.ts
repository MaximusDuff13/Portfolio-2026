// The four Schema & Wiki states, straight from the live content (src, alt, label, order, natural
// size). Sizes are constants so every stage and grid cell has its shape in CSS before any image
// loads.
import type { CyclerState } from '@/components/StateCarousel'
import { projectHubStates, projectHubCompleted } from '../projectHub'

export const states = projectHubStates
export type SizedState = CyclerState

export const IMAGE_WIDTH = states[0].width
export const TALLEST = Math.max(...states.map((s) => s.height))

export const hub = projectHubCompleted
