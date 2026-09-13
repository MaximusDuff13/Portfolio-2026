/*  Placeholder product UI for the layered product-shot option.
    Skeleton fidelity ONLY — foundation-scale grays, bars standing in for text, no colour and no
    branding. Replaced by real screenshots later.

    ONE source, three crops: every layer renders the same <WorkspaceMock/>, and <WorkspaceShot/>
    slides it behind a fixed frame so each layer exposes a different region. That mirrors how this
    will actually work once there's a single real screenshot to reuse across all three layers.

    Content is a generic workspace/dashboard on purpose — the field-mapping table that was here
    before read as step-specific, and the Dictionary/Mapping/Transformation story belongs to its
    own section later on the page.  */

function Bar({ w = 'w-16', h = 'h-2', tone = 'bg-foundation-300' }: { w?: string; h?: string; tone?: string }) {
  return <div className={`${w} ${h} rounded-sm ${tone} shrink-0`} />
}

const programs = ['New York', 'Texas', 'Ohio', 'Florida', 'Arizona']

const summary = ['w-10', 'w-14', 'w-12']
const listRows = [
  ['w-32', 'w-20'],
  ['w-24', 'w-28'],
  ['w-36', 'w-16'],
  ['w-28', 'w-24'],
  ['w-20', 'w-32'],
  ['w-32', 'w-20'],
  ['w-24', 'w-28'],
]

/** The single placeholder "screenshot". Rendered identically in every layer. */
export function WorkspaceMock() {
  return (
    <div className="absolute inset-0 flex flex-col bg-body">
      {/* top bar */}
      <div className="h-10 shrink-0 border-b border-border bg-foundation-100 flex items-center gap-3 px-4">
        <Bar w="w-24" h="h-2.5" tone="bg-foundation-400" />
        <div className="ml-auto flex items-center gap-4">
          <Bar w="w-12" />
          <Bar w="w-10" />
          <div className="w-5 h-5 rounded-full bg-foundation-300" />
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* sidebar */}
        <div className="w-44 shrink-0 border-r border-border bg-foundation-100 p-3 flex flex-col gap-1">
          <p className="text-label font-grotesk uppercase tracking-widest text-foundation-400 mb-2">Programs</p>
          {programs.map((p, i) => (
            <div
              key={p}
              className={`rounded px-2 py-1.5 text-caption font-sans ${
                i === 1 ? 'bg-foundation-200 text-foundation-800' : 'text-foundation-500'
              }`}
            >
              {p}
            </div>
          ))}
        </div>

        {/* main — dashboard: header, summary tiles, activity list */}
        <div className="flex-1 min-w-0 p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Bar w="w-36" h="h-2.5" tone="bg-foundation-400" />
            <div className="ml-auto flex gap-2">
              <div className="h-6 w-16 rounded border border-border bg-foundation-100" />
              <div className="h-6 w-20 rounded bg-foundation-300" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {summary.map((w, i) => (
              <div key={i} className="rounded border border-border p-3 flex flex-col gap-2">
                <Bar w="w-14" h="h-1.5" tone="bg-foundation-200" />
                <Bar w={w} h="h-4" tone="bg-foundation-400" />
              </div>
            ))}
          </div>

          <div className="rounded border border-border divide-y divide-border">
            {listRows.map(([a, b], i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                <div className="w-6 h-6 rounded bg-foundation-200 shrink-0" />
                <div className="flex flex-col gap-1 min-w-0">
                  <Bar w={a} h="h-2" tone="bg-foundation-300" />
                  <Bar w={b} h="h-1.5" tone="bg-foundation-200" />
                </div>
                <div className="ml-auto h-4 w-14 rounded-full bg-foundation-200 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Shows one crop of the shared mock inside whatever frame wraps it.
 * The inner board is wider than the frame, so `shift` slides a different region into view —
 * the equivalent of cropping a single real screenshot differently per layer.
 */
export function WorkspaceShot({ shift = 0 }: { shift?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 150% wide so a shift as deep as -40% still covers the frame edge-to-edge with content.
          Shifts past roughly -31% clear the 176px sidebar entirely, which is the point: a shallower
          shift leaves the sidebar half-cut and the program names render as word fragments. */}
      <div className="absolute top-0 h-full w-[150%]" style={{ left: `${shift}%` }}>
        <WorkspaceMock />
      </div>
    </div>
  )
}
