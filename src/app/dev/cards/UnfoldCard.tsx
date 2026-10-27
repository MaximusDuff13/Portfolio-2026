import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { CardLayer } from '@/app/_home/content'
import { CompanyMark, Value } from '@/app/_home/kit/cards'
import { Frame, Placeholder } from './frame'
import { MotionCard } from './MotionCard'
import { PRESETS, StoryStage, type CardItem } from './presets'

/* The case-study card, unfolding. Same card family and markup hooks as the live CaseCard
   (cd, cd-case, cd-title, cd-link), one link stretched over the card, the stage above the text,
   one card per row. On hover or keyboard focus something happens around the cover: c deals
   whole supporting screens from behind it; e plays the card's own motion preset (`story`,
   presets.tsx), the cover always fully in view. Every position comes from the card data. */

export type Variant = 'c' | 'e'
export type Tint = 'soft' | 'strong'

/** the card's state as a reader sees it: a draft is still being written */
const statusLabel = (status: string) => (status === 'Draft' ? 'In progress' : status)

/** where a layer waits and where it settles: c deals the screens out from behind the cover */
function placement(l: CardLayer, i: number) {
  const rest = { x: l.open.x * 0.32, y: 9 + i * 2, rotate: l.open.rotate * 1.2 }
  const open = {
    x: l.open.x * 1.08,
    y: 12 + Math.max(0, l.open.y - 30) * 0.5,
    rotate: l.open.rotate,
  }
  return {
    '--rx': rest.x,
    '--ry': rest.y,
    '--rr': rest.rotate,
    '--ox': open.x,
    '--oy': open.y,
    '--or': open.rotate,
    '--w': `${l.width}%`,
    // c keeps every screen behind the cover: they peek out at rest and spread from behind it
    '--z': 1,
    '--i': i,
  } as CSSProperties
}

function Body({ item }: { item: CardItem }) {
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

export function UnfoldCard({
  item,
  variant,
  tint = 'strong',
  still,
}: {
  item: CardItem
  variant: Variant
  tint?: Tint
  still?: boolean
}) {
  const style = {
    '--uf-stage': item.stage ?? 'transparent',
    '--uf-stage-strong': item.stageStrong ?? item.stage ?? 'transparent',
  } as CSSProperties

  if (variant === 'e')
    return (
      <MotionCard
        className="cd cd-case uf-card mo"
        data-uf="e"
        data-preset={item.story?.preset}
        data-tint={tint}
        data-still={still ? '' : undefined}
        reduced={item.story ? PRESETS[item.story.preset].reduced : 'cover'}
        still={still}
        style={style}
      >
        <div className="uf-stage">
          <div className="uf-comp">
            <StoryStage item={item} story={item.story} />
          </div>
        </div>
        <Body item={item} />
      </MotionCard>
    )

  return (
    <article className="cd cd-case uf-card" data-uf="c" data-tint={tint} data-still={still || undefined} style={style}>
      <div className="uf-stage">
        {/* the 16:10 box every position is measured in: the whole stage */}
        <div className="uf-comp">
          {item.layers?.map((l, i) => (
            <div key={i} className="uf-layer" style={placement(l, i)}>
              <Frame label={l.src ? undefined : l.label}>
                {l.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={l.src} alt={l.alt ?? ''} loading="lazy" decoding="async" />
                ) : (
                  <Placeholder kind={l.kind} />
                )}
              </Frame>
            </div>
          ))}
          <div className="uf-cover">
            <Frame label={item.mediaPlaceholder ? 'Placeholder media' : undefined}>
              {item.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image.src} alt={item.image.alt} loading="lazy" decoding="async" />
              )}
            </Frame>
          </div>
        </div>
      </div>
      <Body item={item} />
    </article>
  )
}
