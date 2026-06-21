'use client'
import { motion } from 'framer-motion'

/* Shared tab bar: small-caps nav tabs with a Framer Motion accent underline that
   slides between the active tab. Used by Built on Carbon (04) and Cross-Team
   Collaboration (08). Each instance needs a unique `layoutId` so the underlines
   animate independently. */
export function TabBar<T extends string>({
  tabs,
  active,
  onChange,
  layoutId,
}: {
  tabs: { key: T; label: string }[]
  active: T
  onChange: (k: T) => void
  layoutId: string
}) {
  return (
    <div className="flex items-center gap-8 border-b border-border">
      {tabs.map((t) => {
        const on = t.key === active
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`relative pb-3 -mb-px text-nav-tab font-grotesk transition-colors ${
              on ? 'text-foundation-900' : 'text-foundation-400 hover:text-foundation-600'
            }`}
          >
            {t.label}
            {on && <motion.span layoutId={layoutId} className="absolute left-0 right-0 -bottom-px h-0.5 bg-accent-warm" />}
          </button>
        )
      })}
    </div>
  )
}
