'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useBadges } from '@/hooks/useBadges'
import { useEffect } from 'react'

export default function BadgeUnlock() {
  const { newBadges, clearNewBadges } = useBadges()

  useEffect(() => {
    if (newBadges.length > 0) {
      const t = setTimeout(clearNewBadges, 3500)
      return () => clearTimeout(t)
    }
  }, [newBadges, clearNewBadges])

  return (
    <>
      {/* Screen reader announcement */}
      {newBadges.length > 0 && (
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Badge unlocked: {newBadges[0]?.name}. {newBadges[0]?.description}
        </p>
      )}
      <AnimatePresence>
        {newBadges.slice(0, 1).map(badge => (
          <motion.div
            key={badge.id}
            aria-hidden="true"
            className="fixed top-20 inset-x-4 z-50 mx-auto max-w-sm"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
          >
            <div className="bg-card border-2 border-brand-500/40 rounded-2xl p-4 flex items-center gap-4 shadow-2xl">
              <span className="text-4xl">{badge.icon}</span>
              <div>
                <p className="text-xs font-medium text-brand-400 uppercase tracking-wide">Badge Unlocked!</p>
                <p className="font-display font-bold text-ink">{badge.name}</p>
                <p className="text-xs text-ink-muted">{badge.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}
