'use client'

import { useBadges } from '@/hooks/useBadges'
import { useEffect } from 'react'

export default function BadgeUnlock() {
  const { newBadges, clearNewBadges } = useBadges()
  const count = newBadges.length

  useEffect(() => {
    if (count > 0) {
      const t = setTimeout(clearNewBadges, 3000)
      return () => clearTimeout(t)
    }
  }, [count, clearNewBadges])

  if (!newBadges.length) return null

  const badge = newBadges[0]

  return (
    <>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Badge unlocked: {badge.name}. {badge.description}
      </p>
      <div
        aria-hidden="true"
        // Phones: compact card over the bottom nav (never an ad there), so it can't
        // cover the in-quiz phone ad or the top anchor. Taps pass through.
        className="fixed top-20 inset-x-4 z-50 mx-auto max-w-sm animate-slide-up pointer-events-none max-md:top-auto max-md:bottom-[calc(env(safe-area-inset-bottom)+4px)]"
      >
        <div className="bg-card border-2 border-brand-500/40 rounded-2xl p-4 max-md:p-2 max-md:px-3 flex items-center gap-4 max-md:gap-3 shadow-2xl">
          <span className="text-4xl max-md:text-2xl">{badge.icon}</span>
          <div>
            <p className="text-xs font-medium text-brand-400 uppercase tracking-wide">Badge Unlocked!</p>
            <p className="font-display font-bold text-ink max-md:text-sm">{badge.name}</p>
            <p className="text-xs text-ink-muted max-md:hidden">{badge.description}</p>
          </div>
        </div>
      </div>
    </>
  )
}
