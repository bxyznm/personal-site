'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'motion/react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import type { ExperienceEntry } from '@/lib/experience'

interface ExperienceCarouselProps {
  entries: ExperienceEntry[]
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
}

const swipeThreshold = 10000

function swipePower(offset: number, velocity: number) {
  return Math.abs(offset) * velocity
}

export default function ExperienceCarousel({ entries }: ExperienceCarouselProps) {
  const [[index, direction], setIndex] = useState([0, 0])
  const reduce = useReducedMotion()

  const active = entries[index]
  const total = entries.length

  function paginate(newDirection: number) {
    setIndex(([prev]) => {
      const next = (prev + newDirection + total) % total
      return [next, newDirection]
    })
  }

  function goTo(target: number) {
    if (target === index) return
    setIndex([target, target > index ? 1 : -1])
  }

  function handleDragEnd(_e: unknown, info: PanInfo) {
    const power = swipePower(info.offset.x, info.velocity.x)
    if (power < -swipeThreshold) {
      paginate(1)
    } else if (power > swipeThreshold) {
      paginate(-1)
    }
  }

  return (
    <div className="bg-bg-panel border border-line rounded-2xl overflow-hidden">
      <div className="relative min-h-[248px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={reduce ? undefined : variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            drag={total > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            className="p-6 cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`text-xs px-2.5 py-1 rounded-full ${
                  active.current
                    ? 'bg-accent/15 text-accent'
                    : 'bg-bg-secondary text-fg-secondary'
                }`}
              >
                {active.current ? 'Current role' : 'Past role'}
              </span>
              <span className="text-xs font-mono text-fg-secondary ml-auto">{active.period}</span>
            </div>

            <h3 className="font-display font-bold text-lg text-fg-primary mb-1 tracking-tightest">
              {active.title}
            </h3>
            <p className="text-sm text-fg-secondary mb-3">{active.company}</p>
            <p className="text-sm text-fg-secondary leading-relaxed line-clamp-3">
              {active.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {total > 1 && (
        <div className="flex items-center justify-between px-4 pb-4">
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous role"
            className="w-11 h-11 flex items-center justify-center rounded-full text-fg-secondary hover:text-fg-primary hover:bg-bg-secondary transition-colors"
          >
            <CaretLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {entries.map((entry, i) => (
              <button
                key={entry.company + entry.period}
                onClick={() => goTo(i)}
                aria-label={`Go to ${entry.company}`}
                aria-current={i === index}
                className="p-1.5"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === index ? 'w-5 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-line-bright'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next role"
            className="w-11 h-11 flex items-center justify-center rounded-full text-fg-secondary hover:text-fg-primary hover:bg-bg-secondary transition-colors"
          >
            <CaretRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
