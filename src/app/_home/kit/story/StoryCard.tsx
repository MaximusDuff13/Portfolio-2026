import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { CompanyMark, Value } from '../cards'
import { MotionCard } from './MotionCard'
import { PRESETS, StoryStage, type CardItem } from './presets'
import './story.css'

/* The case-study card on the Work tab: one per row, the project's pale stage above the text,
   one link stretched over the card. On hover or keyboard focus the stage plays the card's own
   motion preset (`story` in content.ts, presets.tsx), the cover always fully in view. Same card
   family and markup hooks as the noise's CaseCard (cd, cd-case, cd-title, cd-link). */

/** the card's state as a reader sees it: a draft is still being written */
const statusLabel = (status: string) => (status === 'Draft' ? 'In progress' : status)

/** the text under the stage: company, question, one line, the facts; the arrow top-right */
export function CardBody({ item }: { item: CardItem }) {
  return (
    <div className="cd-body uf-body">
      <p className="uf-company">
        <CompanyMark name={item.company} logo={item.logo} className="uf-mark" />
        <Value value={item.company} />
      </p>
      <h3 className="cd-title">
        <a href={item.href} className="cd-link uf-link">
          {item.question}
        </a>
      </h3>
      <p className="uf-desc">{item.summary ?? item.description}</p>
      <p className="uf-meta">
        <span>{item.duration}</span> · <Value value={item.role} /> · <span>{statusLabel(item.status)}</span>
      </p>
      <ArrowUpRight className="cd-arrow uf-arrow" aria-hidden="true" />
    </div>
  )
}

export const stageStyle = (item: CardItem) =>
  ({
    '--uf-stage': item.stage ?? 'transparent',
    '--uf-stage-strong': item.stageStrong ?? item.stage ?? 'transparent',
  }) as CSSProperties

export function StoryCard({
  item,
  tint = 'strong',
  still,
  morph,
}: {
  item: CardItem
  tint?: 'soft' | 'strong'
  /** the cover only, never opening */
  still?: boolean
  /** the stage is the page transition's morph target into the case study (the live card) */
  morph?: boolean
}) {
  return (
    <MotionCard
      className="cd cd-case uf-card mo"
      data-uf="e"
      data-preset={item.story?.preset}
      data-tint={tint}
      data-still={still ? '' : undefined}
      reduced={item.story ? PRESETS[item.story.preset].reduced : 'cover'}
      still={still}
      style={stageStyle(item)}
    >
      <div className={`uf-stage${morph ? ` vt-media-${item.id}` : ''}`}>
        {/* the 16:10 box every position is measured in: the whole stage */}
        <div className="uf-comp">
          <StoryStage item={item} story={item.story} />
        </div>
      </div>
      <CardBody item={item} />
    </MotionCard>
  )
}
