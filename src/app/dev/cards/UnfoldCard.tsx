import type { CSSProperties } from 'react'
import type { CardLayer } from '@/app/_home/content'
import { Frame, Placeholder } from '@/app/_home/kit/story/frame'
import type { CardItem } from '@/app/_home/kit/story/presets'
import { CardBody, StoryCard, stageStyle } from '@/app/_home/kit/story/StoryCard'

/* The preview's two card variants. e is the live card (StoryCard, the card's own motion
   preset). c, kept to compare, deals whole supporting screens out from behind the cover on
   hover or focus; its positions come from `layers` in content.ts. */

export type Variant = 'c' | 'e'
export type Tint = 'soft' | 'strong'

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
  if (variant === 'e') return <StoryCard item={item} tint={tint} still={still} />

  return (
    <article className="cd cd-case uf-card" data-uf="c" data-tint={tint} data-still={still || undefined} style={stageStyle(item)}>
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
      <CardBody item={item} />
    </article>
  )
}
