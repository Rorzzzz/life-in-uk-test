'use client'

// useReadiness — calculates the readiness score for the UI

import { useGame } from '@/context/GameContext'
import { calcReadiness, getReadinessTier } from '@/algorithms/readiness'

export function useReadiness() {
  const { state } = useGame()
  const score = calcReadiness(state.progress, state.streak)
  const tier  = getReadinessTier(score)

  return { score, tier }
}
