// The Project hub feature's content: copy, icons, the cycling states and the finished hub.
// Its own module so the unlinked states preview can import the exact live content; the case study
// page lists it in problemSolutions like the other features.
import { Workflow, ListChecks } from 'lucide-react'
import type { ProblemSolution } from '@/components/ProblemSolutionFeature'
import type { CyclerState } from '@/components/StateCarousel'

/* Project hub. The card, then the finished hub, then one step shown in each of its states. No
   concepts and no captions. Icons: Workflow (the steps a project moves through) and ListChecks
   (each step's state), drawn like the other card icons. */
const projectHubDir = '/images/data-conversion-app/project-hub/'

export const projectHubLead = [
  {
    icon: Workflow,
    label: 'Problem',
    lead: 'A process like this moves through several steps, and each step can be ready to start, running, failed, or finished.',
    body: 'A simple progress bar would have been enough for the MVP, but data conversion would later add stages of its own, and the design needed to handle them without a rebuild.',
  },
  {
    icon: ListChecks,
    label: 'Solution',
    lead: 'Build the hub around states, not just a progress bar.',
    body: 'Each step reports what is happening in plain words, with the next action beside it. Source Wiki generation shows all four states, and the same pattern already carries Mapping & transformation, so new stages can slot in without redesigning the hub.',
  },
]

// The states the cycler steps through, in order. Reordering them is reordering this list.
export const projectHubStates: CyclerState[] = [
  {
    id: 'enable',
    label: 'Enable',
    src: projectHubDir + 'schema-wiki-enable.png',
    width: 3000,
    height: 982,
    alt: 'Schema and Wiki step in its enable state: a prompt to set up the schema for this project, with source and target schema both not configured.',
  },
  {
    id: 'generating',
    label: 'Generating',
    src: projectHubDir + 'schema-wiki-generating.png',
    width: 3000,
    height: 816,
    alt: 'Schema and Wiki step while generating: a progress bar showing 68 of 147 tables documented, with a View details button.',
  },
  {
    id: 'success',
    label: 'Success',
    src: projectHubDir + 'schema-wiki-success.png',
    width: 3000,
    height: 1131,
    alt: 'Schema and Wiki step after success: 147 table Wikis generated, with Continue to mapping and View Wiki buttons, and the source schema, target schema and generation date listed.',
  },
  {
    id: 'error',
    label: 'Error',
    src: projectHubDir + 'schema-wiki-error.png',
    width: 3000,
    height: 843,
    alt: 'Schema and Wiki step after an error: Source Wiki generation failed, with a note that the saved selections are kept, and Try again and View details buttons.',
  },
]

export const projectHubCompleted = {
  src: projectHubDir + 'hub-project-completed.png',
  width: 2624,
  height: 1902,
  alt: 'The project hub after every step is finished, showing a Project completed banner with a download signoff mapping button, and Schema and Wiki and Mapping and transformation both listed as completed.',
}

export const projectHub: ProblemSolution = {
  eyebrow: 'Project hub',
  title: 'How do you show where a project stands?',
  lead: projectHubLead,
  states: projectHubStates,
  image: projectHubCompleted,
}
