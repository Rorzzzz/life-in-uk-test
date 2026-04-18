'use client'

import { useState } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'

// Shared content blocks — used by both the real faces and the invisible spacer
function FrontContent({ question }) {
  return (
    <>
      <p className="text-xs text-brand-400 font-medium mb-3 uppercase tracking-wide">Question</p>
      <p className="text-lg font-semibold text-ink">{question.q}</p>
      <p className="text-xs text-ink-muted mt-4">Tap to reveal answer</p>
    </>
  )
}

function BackContent({ question }) {
  return (
    <>
      <p className="text-xs text-success font-medium mb-3 uppercase tracking-wide">Answer</p>
      <p className="text-xl font-bold text-ink mb-3">{question.options[question.answer]}</p>
      <p className="text-base text-ink-muted leading-relaxed">{question.explanation}</p>
    </>
  )
}

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
    'aria-label': flipped
      ? 'Card showing answer — press Enter to flip back'
      : 'Card showing question — press Enter to reveal answer',
  }

  if (prefersReducedMotion) {
    return (
      <div {...wrapperProps}>
        {!flipped ? (
          <div className="bg-card border border-border rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center">
            <FrontContent question={question} />
          </div>
        ) : (
          <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center">
            <BackContent question={question} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div {...wrapperProps}>
      <AnimatePresence initial={false}>
        <m.div
          key={flipped ? 'back' : 'front'}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{ willChange: 'opacity, transform' }}
          className={flipped
            ? 'bg-brand-500/10 border border-brand-500/30 rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center'
            : 'bg-card border border-border rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center'
          }
        >
          {flipped ? <BackContent question={question} /> : <FrontContent question={question} />}
        </m.div>
      </AnimatePresence>
    </div>
  )
}
