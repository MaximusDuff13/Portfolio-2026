'use client'
import { motion } from 'framer-motion'
import { sectionEnter, sectionEnterReduced } from '@/lib/motion'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

export function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const prefersReduced = useReducedMotionSafe()
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={prefersReduced ? sectionEnterReduced : sectionEnter}
      className={className}
    >
      {children}
    </motion.div>
  )
}
