'use client'

// useProgress — localStorage abstraction for reading/writing progress state
// Most reads should go through useGame() — this hook is for non-context consumers

import { useGame } from '@/context/GameContext'
import { getLevelForXP, getLevelProgress, getXPToNextLevel } from '@/data/levels'
import { getOverallMastery, getChapterMastery } from '@/algorithms/mastery'

export function useProgress() {
  const { state } = useGame()

  const level        = getLevelForXP(state.xp)
  const levelPct     = getLevelProgress(state.xp)
  const xpToNext     = getXPToNextLevel(state.xp)
  const overallMastery = getOverallMastery(state.progress)

  function chapterMastery(chapterId) {
    return getChapterMastery(chapterId, state.progress)
  }

  return {
    xp:           state.xp,
    level,
    levelPct,
    xpToNext,
    streak:       state.streak,
    totalAnswered: state.totalAnswered,
    totalCorrect:  state.totalCorrect,
    accuracy:      state.totalAnswered > 0
                    ? Math.round((state.totalCorrect / state.totalAnswered) * 100)
                    : 0,
    overallMastery,
    chapterMastery,
    progress:     state.progress,
    unlockedBadges: state.unlockedBadges,
    examsPassed:  state.examsPassed,
  }
}
