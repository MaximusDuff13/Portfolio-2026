'use client'
// TEMPORARY — responsive check harness for the "The problem" layouts.
//
// Each layout is mounted twice, in a 390px and a 1280px iframe. An iframe is used deliberately:
// it establishes its own viewport, so Tailwind's sm/md/lg media queries resolve against the frame
// width. A plain fixed-width <div> would not — the layout would keep its desktop classes at
// phone width and the check would pass when it should fail.
//
// Delete alongside /preview/problem.
const KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'] as const

const WIDTHS = [
  { w: 390, h: 1400, label: '390 · phone' },
  { w: 1280, h: 1100, label: '1280 · desktop' },
]

export default function ProblemFramesPage() {
  return (
    <main className="min-h-screen bg-body p-8">
      <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-8">
        Responsive check · 390 and 1280
      </p>

      <div className="flex flex-col gap-12">
        {KEYS.map((k) => (
          <div key={k} className="flex flex-wrap items-start gap-8">
            {WIDTHS.map(({ w, h, label }) => (
              <div key={w} className="flex flex-col gap-2">
                <p className="text-caption font-grotesk text-foundation-500">
                  {k.toUpperCase()} — {label}
                </p>
                <iframe
                  src={`/preview/problem?only=${k}`}
                  width={w}
                  height={h}
                  className="border border-border bg-body"
                  title={`${k} at ${w}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}
