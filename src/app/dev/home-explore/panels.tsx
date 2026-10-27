import type { CSSProperties } from 'react'
import { about, accolades, caseStudies, sideProjects, type TabId } from '@/app/_home/content'
import { AccoladeRow, SampleTag, SideCard } from '@/app/_home/kit/cards'
import { AboutStill } from '@/app/_home/kit/home'
import { TabPanel } from '@/app/_home/kit/Tabs'
import type { Phase } from '@/app/_home/kit/useIntro'
import { ExploreCard, type Direction } from './cards'

/* The live Panels (kit/home.tsx), with the Work tab's cards swapped for a direction's. The
   other three tabs are the live markup, unchanged. */
export function ExplorePanels({ direction, active, phase }: { direction: Direction; active: TabId; phase: Phase }) {
  const settle = phase === 'final' || undefined
  const cell = (i: number) => ({ '--i': i }) as CSSProperties
  return (
    <div className="pn" data-settle={settle}>
      <TabPanel id="work" active={active} idPrefix="a" className={`pn-panel pn-work hx-work-${direction}`}>
        {caseStudies.map((c, i) => (
          <div key={c.id} className="pn-cell" style={cell(i)}>
            <ExploreCard item={c} direction={direction} />
          </div>
        ))}
      </TabPanel>
      <TabPanel id="side" active={active} idPrefix="a" className="pn-panel pn-side">
        {sideProjects.map((s, i) => (
          <div key={s.id} className="pn-cell" style={cell(i)}>
            <SideCard item={s} />
          </div>
        ))}
      </TabPanel>
      <TabPanel id="accolades" active={active} idPrefix="a" className="pn-panel pn-accolades">
        {accolades.map((a, i) => (
          <div key={a.id} className="pn-cell" style={cell(i)}>
            <AccoladeRow item={a} />
          </div>
        ))}
      </TabPanel>
      <TabPanel id="about" active={active} idPrefix="a" className="pn-panel pn-about">
        <figure className="pn-cell pn-about-art" style={cell(0)}>
          <AboutStill />
          <figcaption>{about.credit}</figcaption>
        </figure>
        <div className="pn-cell pn-about-copy" style={cell(1)}>
          <SampleTag label="Sample copy" />
          <h3 className="pn-about-title">{about.greeting}</h3>
          <p>{about.body}</p>
          <dl className="pn-facts">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            <div>
              <dt>Contact</dt>
              <dd>
                <span className="pn-placeholder">{about.contact}</span> <SampleTag label="Placeholder" />
              </dd>
            </div>
          </dl>
        </div>
      </TabPanel>
    </div>
  )
}
