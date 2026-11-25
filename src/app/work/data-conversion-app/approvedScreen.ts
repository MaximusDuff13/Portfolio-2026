/* The five issues on the AI CoE's approved screen (Michael's points, Nov 24 2026). Shown as the
   "before" in 01 · Requirements gathering, and referred back to by number from the sections that
   fix them (FixesTag). A plain module, not 'use client', so server components can import the data.
   pin: % of the screenshot (x, y). */
export type Issue = { title: string; detail: string; pin: [number, number] }

export const issues: Issue[] = [
  { title: 'One process, seven menus', detail: 'Mapping a field by hand meant going to another page.', pin: [15.5, 12] },
  { title: 'Metric cards with no action', detail: 'The top row showed counts and details nobody needed. Alerts were just numbers, with no way to open or fix them.', pin: [45.1, 15.5] },
  { title: 'A button nobody understood', detail: 'No one knew what “Run Mapping” did once the mapping was created.', pin: [89.7, 10.3] },
  { title: '“Accept” was the only action', detail: 'You couldn’t change the AI’s pick, even on a high-confidence row.', pin: [80.3, 38.5] },
  // pin at the top edge of the AI panel, so it reads as the panel's label (was at its foot, by the help button)
  { title: 'A side panel that cost space', detail: 'The AI assistant took up about a fifth of the screen and gave nothing useful at this step.', pin: [90.9, 27.6] },
]

/* The same five, grouped under usability heuristics for the "before" card (Nov 24 2026). Numbers
   keep matching the pins, so the groups list them out of order on purpose. */
export const issueGroups: { heading: string; heuristics: string[]; issues: number[] }[] = [
  { heading: 'Wasted screen space', heuristics: ['Aesthetic and minimalist design'], issues: [2, 5] },
  { heading: 'A broken flow', heuristics: ['Flexibility and efficiency of use'], issues: [1] },
  { heading: 'Unclear or missing actions', heuristics: ['Visibility of system status', 'User control and freedom'], issues: [3, 4] },
]

/** The Requirements section's anchor, which every FixesTag links back to. */
export const requirementsId = 'requirements'
