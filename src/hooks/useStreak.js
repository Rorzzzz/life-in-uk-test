'use client'

// useStreak — streak state and helpers

import { useGame } from '@/context/GameContext'

export function useStreak() {
  const { state } = useGame()

  const today = new Date().toISOString().split('T')[0]
  const isActiveToday = state.lastActiveDate === today
  const questionsToday = state.questionsToday ?? 0
  const streakThreshold = 5 // questions needed to maintain streak

  return {
    streak:        state.streak ?? 0,
    isActiveToday,
    questionsToday,
    streakThreshold,
    progressToday: Math.min(questionsToday / streakThreshold, 1), // 0–1
    streakSafe:    questionsToday >= streakThreshold,
  }
}
