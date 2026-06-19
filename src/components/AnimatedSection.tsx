'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeIn, fadeUp } from '@/lib/motion'

export function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={prefersReduced ? fadeIn : fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}
