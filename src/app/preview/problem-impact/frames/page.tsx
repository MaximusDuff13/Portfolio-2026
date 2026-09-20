'use client'
// TEMPORARY — responsive check for the Problem + Impact pair.
//
// The pair is mounted twice, in a 390px and a 1280px iframe. An iframe establishes its own
// viewport, so Tailwind's sm/md/lg media queries resolve against the frame width; a fixed-width
// <div> would keep the desktop classes at phone width and the check would pass when it should
// fail.
//
// The .preview-still class (globals.css) forces the entrance animation's end state, because
// framer-motion's whileInView does not settle reliably inside an iframe.
//
// Delete alongside /preview/problem-impact.
const WIDTHS = [
  { w: 390, h: 2200, label: '390 · phone' },
  { w: 1280, h: 1700, label: '1280 · desktop' },
]

export default function ProblemImpactFramesPage() {
  return (
    <main className="min-h-screen bg-body p-8">
      <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-8">
        Responsive check · Problem + Impact · 390 and 1280
      </p>

      <div className="flex flex-wrap items-start gap-8">
        {WIDTHS.map(({ w, h, label }) => (
          <div key={w} className="flex flex-col gap-2">
            <p className="text-caption font-grotesk text-foundation-500">{label}</p>
            <iframe
              src="/preview/problem-impact?still=1"
              width={w}
              height={h}
              className="border border-border bg-body"
              title={`Problem + Impact at ${w}`}
            />
          </div>
        ))}
      </div>
    </main>
  )
}
