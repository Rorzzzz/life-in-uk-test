'use client'

import { m, AnimatePresence } from 'framer-motion'

export default function XPPopup({ amount, visible, onHide }) {
  return (
    <AnimatePresence>
      {visible && amount > 0 && (
        <m.div
          className="fixed top-1/3 left-1/2 z-50 pointer-events-none"
          initial={{ opacity: 1, y: 0, x: '-50%' }}
          animate={{ opacity: 0, y: -60, x: '-50%' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          onAnimationComplete={onHide}
        >
          <span className="text-2xl font-display font-bold text-xp drop-shadow-lg">
            +{amount} XP
          </span>
        </m.div>
      )}
    </AnimatePresence>
  )
}
