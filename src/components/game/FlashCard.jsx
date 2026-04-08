'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function FlashCard({ question }) {
  const [flipped, setFlipped] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const toggle = () => setFlipped(f => !f)

  const wrapperProps = {
    className: 'relative w-full cursor-pointer select-none active:scale-[0.99] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl',
    onClick: toggle,
    onKeyDown: e => (e.key === 'Enter' || e.key === ' ') && toggle(),
    role: 'button',
    tabIndex: 0,
    'aria-label': flipped ? 'Card showing answer — press Enter to flip back' : 'Card showing question — press Enter to reveal answer',
  }

  if (prefersReducedMotion) {
    return (
      <div {...wrapperProps}>
        {!flipped ? (
          <div className="bg-card border border-border rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center">
            <p className="text-xs text-brand-400 font-medium mb-3 uppercase tracking-wide">Question</p>
            <p className="text-lg font-semibold text-ink">{question.q}</p>
            <p className="text-xs text-ink-muted mt-4">Tap to reveal answer</p>
          </div>
        ) : (
          <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center">
            <p className="text-xs text-success font-medium mb-3 uppercase tracking-wide">Answer</p>
            <p className="text-xl font-bold text-ink mb-3">{question.options[question.answer]}</p>
            <p className="text-base text-ink-muted leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      {...wrapperProps}
      style={{
        perspective: '1200px',
        WebkitPerspective: '1200px',
      }}
    >
      <motion.div
        className="relative w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
        }}
      >
        {/*
          CSS grid overlap: both cards share the same cell so the container
          grows to fit whichever side is taller — fixes long answers overflowing.
        */}
        <div style={{ display: 'grid' }}>

          {/* Front — question */}
          <div
            className="bg-card border border-border rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center"
            style={{
              gridArea: '1/1',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <p className="text-xs text-brand-400 font-medium mb-3 uppercase tracking-wide">Question</p>
            <p className="text-lg font-semibold text-ink">{question.q}</p>
            <p className="text-xs text-ink-muted mt-4">Tap to reveal answer</p>
          </div>

          {/* Back — answer (pre-rotated 180° so it reads correctly when parent flips) */}
          <div
            className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center"
            style={{
              gridArea: '1/1',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              WebkitTransform: 'rotateY(180deg)',
            }}
          >
            <p className="text-xs text-success font-medium mb-3 uppercase tracking-wide">Answer</p>
            <p className="text-xl font-bold text-ink mb-3">{question.options[question.answer]}</p>
            <p className="text-base text-ink-muted leading-relaxed">{question.explanation}</p>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
