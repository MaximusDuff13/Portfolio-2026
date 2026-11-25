'use client'
import { useId } from 'react'
import { HOT, INK, Stroke, Wobble, useOnScreen } from './pen'

/* Problem: the old process as a hand-drawn flow across two lanes, the state and our team
   (Nov 24 2026; Michael chose this over a single line, a numbered list and a loop). Same pen as
   Doodles.tsx: round caps, a touch of wobble from a displacement filter, each line draws itself in
   (cs-ring from case-study.css) once on screen. Dark ink for the plain steps, ginger ink only where
   the cost is: the hand mapping in Excel, the rules, and the fix-and-review loop.

   Pure SVG, so it keeps its shape and scales with its card. Below md the SVG is hidden and PhoneFlow
   (bottom of the file) stacks the same steps instead, with no sideways scroll. */

type Node = { x: number; y: number; lines: string[]; hot?: boolean }
const W = 172
const H = 100
function SvgBox({ n, delay }: { n: Node; delay: number }) {
  const { x, y } = n
  const d = `M ${x + 4} ${y + 2} C ${x + 50} ${y - 1}, ${x + 100} ${y + 3}, ${x + W} ${y + 1} C ${x + W + 2} ${y + 30}, ${x + W - 1} ${y + 60}, ${x + W} ${y + H} C ${x + 100} ${y + H + 2}, ${x + 40} ${y + H - 1}, ${x + 1} ${y + H} C ${x - 1} ${y + 60}, ${x + 2} ${y + 30}, ${x + 1} ${y + 4} L ${x + 12} ${y + 1}`
  const cy = y + H / 2 - ((n.lines.length - 1) * 27) / 2 + 8
  return (
    <g>
      <Stroke d={d} ink={n.hot ? HOT : INK} w={n.hot ? 2.8 : 2.2} delay={delay} />
      <text className="font-hand fill-foundation-900" fontSize={25} textAnchor="middle">
        {n.lines.map((l, i) => (
          <tspan key={i} x={x + W / 2} y={cy + i * 27}>{l}</tspan>
        ))}
      </text>
    </g>
  )
}
const arrowHead = (x: number, y: number, ang: number) => {
  const a = (ang * Math.PI) / 180
  const p = (da: number) => `${x - 10 * Math.cos(a + da)} ${y - 10 * Math.sin(a + da)}`
  return `M ${p(0.5)} L ${x} ${y} L ${p(-0.5)}`
}

export function ProblemFlow({ costNote = "close to 6 weeks · 4 to 5 data engineers" }: { costNote?: string | null }) {
  const [ref, on] = useOnScreen<SVGSVGElement>()
  const id = useId().replace(/:/g, '')
  const xs = [4, 124, 340, 520, 700, 880]
  const col = (i: number) => xs[i]
  const TOP = 34
  const BOT = 230
  const nodes: Node[] = [
    { x: col(0), y: TOP, lines: ['Sends its data', 'dictionaries'] },
    { x: col(1), y: BOT, lines: ['Maps every field', 'by hand in Excel'], hot: true },
    { x: col(2), y: BOT, lines: ['Writes the', 'transformation', 'rules'], hot: true },
    { x: col(3), y: TOP, lines: ['Reviews the', 'mapping'] },
    { x: col(4), y: BOT, lines: ['Fixes what’s', 'flagged'], hot: true },
    { x: col(5), y: TOP, lines: ['Approves'] },
  ]
  const r = (n: Node) => n.x + W
  const mid = (nodes[1].x + r(nodes[4])) / 2
  return (
    <>
    <PhoneFlow />
    <div className="hidden md:block">
      <svg ref={ref} viewBox={`0 -8 1060 ${costNote ? 428 : 346}`} className="cs-markup block w-full overflow-visible" role="img" aria-label="The old process across two lanes, the state and our team: the state sends data dictionaries, we map every field by hand in Excel and write transformation rules, the state reviews, we fix what's flagged and send it back for review, and the state approves. Close to 6 weeks, 4 to 5 data engineers." data-on={on || undefined}>
        <defs><Wobble id={`w${id}`} /></defs>
        {/* lane labels and the line between lanes */}
        <text x={4} y={TOP - 14} className="font-sans fill-foundation-500" fontSize={15} fontWeight={500} letterSpacing="0.08em">THE STATE</text>
        <text x={4} y={BOT - 14} className="font-sans fill-foundation-500" fontSize={15} fontWeight={500} letterSpacing="0.08em">OUR TEAM</text>
        <g filter={`url(#w${id})`}>
          <Stroke d="M 0 176 C 300 172, 700 180, 1056 175" w={1.4} dash />
          {nodes.map((n, i) => <SvgBox key={i} n={n} delay={i * 160} />)}
          {/* 1 → 2 down */}
          <Stroke d={`M ${r(nodes[0]) - 30} ${TOP + H + 6} C ${r(nodes[0]) - 10} ${170}, ${nodes[1].x - 20} ${200}, ${nodes[1].x + 30} ${BOT - 6}`} delay={300} />
          <Stroke d={arrowHead(nodes[1].x + 30, BOT - 6, 70)} delay={500} />
          {/* 2 → 3 across */}
          <Stroke d={`M ${r(nodes[1]) + 2} ${BOT + 44} C ${r(nodes[1]) + 6} ${BOT + 40}, ${nodes[2].x - 8} ${BOT + 46}, ${nodes[2].x - 3} ${BOT + 44}`} ink={HOT} delay={450} />
          <Stroke d={arrowHead(nodes[2].x - 3, BOT + 44, 0)} ink={HOT} delay={600} />
          {/* 3 → 4 up */}
          <Stroke d={`M ${r(nodes[2]) - 30} ${BOT - 6} C ${r(nodes[2]) - 10} ${200}, ${nodes[3].x - 20} ${170}, ${nodes[3].x + 30} ${TOP + H + 6}`} delay={600} />
          <Stroke d={arrowHead(nodes[3].x + 30, TOP + H + 6, -70)} delay={800} />
          {/* 4 → 5 down */}
          <Stroke d={`M ${nodes[3].x + 80} ${TOP + H + 6} C ${nodes[3].x + 100} ${170}, ${nodes[4].x} ${190}, ${nodes[4].x + 40} ${BOT - 6}`} delay={750} />
          <Stroke d={arrowHead(nodes[4].x + 40, BOT - 6, 70)} delay={950} />
          {/* 5 → 4: the loop back */}
          <Stroke d={`M ${nodes[4].x + 100} ${BOT - 6} C ${nodes[4].x + 110} ${150}, ${nodes[3].x + 170} ${150}, ${nodes[3].x + 135} ${TOP + H + 6}`} ink={HOT} w={2.8} delay={1000} />
          <Stroke d={arrowHead(nodes[3].x + 135, TOP + H + 6, -110)} ink={HOT} w={2.8} delay={1200} />
          {/* 5 → 6 up */}
          <Stroke d={`M ${r(nodes[4]) - 10} ${BOT - 6} C ${r(nodes[4]) + 10} ${190}, ${nodes[5].x} ${170}, ${nodes[5].x + 40} ${TOP + H + 6}`} delay={1150} />
          <Stroke d={arrowHead(nodes[5].x + 40, TOP + H + 6, -70)} delay={1350} />
          {/* bracket under our team's work, only when it has a label to hold */}
          {costNote && <Stroke d={`M ${nodes[1].x} 344 C ${nodes[1].x} 358, ${nodes[1].x + 10} 358, ${mid - 40} 358 C ${mid - 10} 358, ${mid - 6} 358, ${mid} 370 C ${mid + 6} 358, ${mid + 10} 358, ${mid + 40} 358 C ${r(nodes[4]) - 4} 358, ${r(nodes[4])} 358, ${r(nodes[4])} 344`} ink={HOT} delay={1400} />}
        </g>
        <text x={(r(nodes[3]) + nodes[5].x) / 2} y={TOP + H / 2 + 6} className="font-hand fill-accent-warm" fontSize={23} textAnchor="middle">until it’s clean</text>
        {costNote && <text x={mid} y={404} className="font-hand fill-accent-warm" fontSize={27} textAnchor="middle">{costNote}</text>}
      </svg>
    </div>
    </>
  )
}

/* Below md (Nov 25 2026, after the audit: the wide drawing scrolled sideways on phones). The same six
   steps stacked top to bottom, zigzagging between the two lanes: the state's steps on the left, our
   team's on the right, ginger where the cost is. Plain HTML, so it reads at phone size; the SVG
   above carries the same story from md up. */
const phoneSteps: { lane: 'state' | 'team'; text: string; hot?: boolean; loop?: boolean }[] = [
  { lane: 'state', text: 'Sends its data dictionaries' },
  { lane: 'team', text: 'Maps every field by hand in Excel', hot: true },
  { lane: 'team', text: 'Writes the transformation rules', hot: true },
  { lane: 'state', text: 'Reviews the mapping' },
  { lane: 'team', text: 'Fixes what’s flagged', hot: true, loop: true },
  { lane: 'state', text: 'Approves' },
]

function PhoneFlow() {
  return (
    <ol className="m-0 flex list-none flex-col p-0 md:hidden">
      {phoneSteps.map((s, i) => (
        <li key={i} className={`flex flex-col ${s.lane === 'team' ? 'items-end' : 'items-start'}`}>
          {i > 0 && (
            <span aria-hidden="true" className="my-1 self-center font-hand text-[22px] leading-none text-foundation-500">↓</span>
          )}
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-foundation-500">
            {s.lane === 'state' ? 'The state' : 'Our team'}
          </span>
          <span
            className={`mt-1 w-[78%] rounded-[6px] border-2 px-3 py-2 text-center font-hand text-[21px] leading-tight text-foundation-900 ${
              s.hot ? 'border-accent-warm' : 'border-foundation-700'
            }`}
          >
            {s.text}
          </span>
          {s.loop && (
            <span className="mt-1 font-hand text-[19px] text-accent-warm">↺ back to review, until it’s clean</span>
          )}
        </li>
      ))}
    </ol>
  )
}

