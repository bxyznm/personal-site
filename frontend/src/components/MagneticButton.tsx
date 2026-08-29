'use client'

import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import Link from 'next/link'

const MotionLink = motion.create(Link)

interface MagneticButtonProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  external?: boolean
  className?: string
}

export default function MagneticButton({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 })

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * 0.35)
    y.set(relY * 0.35)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const base =
    'inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm transition-colors'
  const styles =
    variant === 'primary'
      ? 'bg-accent text-bg-primary hover:bg-accent-dim'
      : 'border border-line text-fg-primary hover:bg-bg-panel'

  if (external) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${base} ${styles} ${className}`}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <MotionLink
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </MotionLink>
  )
}
