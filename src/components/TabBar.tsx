'use client'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'
import { duration, enterT, reducedT } from '@/lib/motion'

/* Shared tab bar: small-caps nav tabs with a Framer Motion accent underline that
   slides between the active tab. Used by Built on Carbon (04), Cross-Team
   Collaboration (08) and the home page company selector. Each instance needs a
   unique `layoutId` so the underlines animate independently. Under reduced motion
   the underline cross-fades in place instead of sliding. */
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
  const prefersReduced = useReducedMotionSafe()
  return (
    <div className="flex items-center gap-8 border-b border-border">
      {tabs.map((t) => {
        const on = t.key === active
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            aria-current={on ? 'true' : undefined}
            className={`relative shrink-0 pb-3 -mb-px text-nav-tab font-sans transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-body ${
              on ? 'text-foundation-900' : 'text-foundation-500 hover:text-foundation-700'
            }`}
          >
            {t.label}
            {on &&
              (prefersReduced ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={reducedT(duration.base)}
                  className="absolute left-0 right-0 -bottom-px h-0.5 bg-accent-warm"
                />
              ) : (
                <motion.span
                  layoutId={layoutId}
                  transition={enterT(duration.base)}
                  className="absolute left-0 right-0 -bottom-px h-0.5 bg-accent-warm"
                />
              ))}
          </button>
        )
      })}
    </div>
  )
}
