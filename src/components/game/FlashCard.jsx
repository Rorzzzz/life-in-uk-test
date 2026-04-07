'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function FlashCard({ question }) {
  const [flipped, setFlipped] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const toggle = () => setFlipped(f => !f)

  // Reduced motion: simple crossfade instead of 3D rotation
  if (prefersReducedMotion) {
    return (
      <div
        className="relative w-full cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl"
        onClick={toggle}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggle()}
        role="button"
        tabIndex={0}
        aria-label={flipped ? 'Card showing answer — press Enter to flip back' : 'Card showing question — press Enter to reveal answer'}
      >
        {!flipped ? (
          <div className="bg-card border border-border rounded-2xl p-8 min-h-[200px] flex flex-col items-center justify-center text-center">
            <p className="text-xs text-brand-400 font-medium mb-3 uppercase tracking-wide">Question</p>
            <p className="text-lg font-semibold text-ink">{question.q}</p>
            <p className="text-xs text-ink-muted mt-4">Tap to reveal answer</p>
          </div>
        ) : (
          <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-8 min-h-[200px] flex flex-col items-center justify-center text-center">
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
      className="relative w-full cursor-pointer select-none active:scale-[0.99] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl"
      style={{ perspective: 1000 }}
      onClick={toggle}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggle()}
      role="button"
      tabIndex={0}
      aria-label={flipped ? 'Card showing answer — press Enter to flip back' : 'Card showing question — press Enter to reveal answer'}
    >
      <motion.div
        className="relative w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front — question */}
        <div
          className="bg-card border border-border rounded-2xl p-8 min-h-[200px] flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className="text-xs text-brand-400 font-medium mb-3 uppercase tracking-wide">Question</p>
          <p className="text-lg font-semibold text-ink">{question.q}</p>
          <p className="text-xs text-ink-muted mt-4">Tap to reveal answer</p>
        </div>

        {/* Back — answer */}
        <div
          className="absolute inset-0 bg-brand-500/10 border border-brand-500/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-xs text-success font-medium mb-3 uppercase tracking-wide">Answer</p>
          <p className="text-xl font-bold text-ink mb-3">{question.options[question.answer]}</p>
          <p className="text-base text-ink-muted leading-relaxed">{question.explanation}</p>
        </div>
      </motion.div>
    </div>
  )
}
