'use client'

// useBadges — badge state and new unlock notifications

import { useGame } from '@/context/GameContext'
import { BADGES, getBadgeById } from '@/data/badges'

export function useBadges() {
  const { state, clearNewBadges } = useGame()

  const unlockedBadges = (state.unlockedBadges ?? []).map(id => getBadgeById(id)).filter(Boolean)
  const lockedBadges   = BADGES.filter(b => !state.unlockedBadges?.includes(b.id))
  const newBadges      = (state._newBadges ?? []).map(id => getBadgeById(id)).filter(Boolean)

  return {
    unlockedBadges,
    lockedBadges,
    newBadges,
    clearNewBadges,
    totalBadges: BADGES.length,
    unlockedCount: unlockedBadges.length,
  }
}
