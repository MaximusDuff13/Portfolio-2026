interface FindingCardProps {
  title: string
  description: string
  src: string
  /** image alt text; defaults to the title */
  alt?: string
  /** 'hero' = fixed tall crop for emphasis; 'default' = natural image height */
  variant?: 'hero' | 'default'
}

export function FindingCard({ title, description, src, alt, variant = 'default' }: FindingCardProps) {
  const isHero = variant === 'hero'
  return (
    <div className="flex flex-col gap-3">
      <div className={`w-full rounded border border-border overflow-hidden bg-foundation-900 ${isHero ? 'h-72' : ''}`}>
        <img
          src={src}
          alt={alt ?? title}
          className={isHero ? 'w-full h-full object-cover object-center block' : 'w-full h-auto block'}
        />
      </div>
      <div>
        <p className="text-body-sm font-grotesk font-medium text-foundation-900 mb-0.5">{title}</p>
        <p className="text-caption font-sans text-foundation-600">{description}</p>
      </div>
    </div>
  )
}
