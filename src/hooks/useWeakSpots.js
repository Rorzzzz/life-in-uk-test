'use client'

// useWeakSpots — identifies questions the user struggles with

import { useGame } from '@/context/GameContext'
import { getWeakQuestions } from '@/algorithms/mastery'

export function useWeakSpots() {
  const { state } = useGame()
  const weakQuestions = getWeakQuestions(state.progress)

  // Sort by accuracy ascending (worst first)
  const sorted = [...weakQuestions].sort((a, b) => {
    const pa = state.progress[a.id]
    const pb = state.progress[b.id]
    const accA = pa.totalAnswered > 0 ? pa.totalCorrect / pa.totalAnswered : 0
    const accB = pb.totalAnswered > 0 ? pb.totalCorrect / pb.totalAnswered : 0
    return accA - accB
  })

  return {
    weakQuestions: sorted,
    count: sorted.length,
    hasWeakSpots: sorted.length > 0,
  }
}
