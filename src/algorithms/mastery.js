// Pass the UK Test — Mastery Calculations
// Derive mastery stats for questions, chapters, and overall

import { MASTERY, MASTERY_LABELS } from './sm2'
import { QUESTIONS, getByChapter } from '@/data/questions'

// Get mastery level for a single question
export function getMasteryLevel(questionProgress) {
  if (!questionProgress) return MASTERY.UNSEEN
  return questionProgress.mastery ?? MASTERY.UNSEEN
}

// Get mastery distribution for a set of question IDs
// Returns: { unseen, attempted, familiar, learned, mastered, total }
export function getMasteryDistribution(questionIds, progressMap) {
  const counts = { unseen: 0, attempted: 0, familiar: 0, learned: 0, mastered: 0, total: questionIds.length }
  for (const id of questionIds) {
    const level = getMasteryLevel(progressMap?.[id])
    switch (level) {
      case MASTERY.UNSEEN:    counts.unseen++;    break
      case MASTERY.ATTEMPTED: counts.attempted++; break
      case MASTERY.FAMILIAR:  counts.familiar++;  break
      case MASTERY.LEARNED:   counts.learned++;   break
      case MASTERY.MASTERED:  counts.mastered++;  break
    }
  }
  return counts
}

// Get mastery % for a chapter (0-100)
// Mastery % = weighted average: mastered=100, learned=75, familiar=50, attempted=25, unseen=0
export function getChapterMastery(chapterId, progressMap) {
  const questions = getByChapter(chapterId)
  if (!questions.length) return 0
  const weights = { [MASTERY.UNSEEN]: 0, [MASTERY.ATTEMPTED]: 25, [MASTERY.FAMILIAR]: 50, [MASTERY.LEARNED]: 75, [MASTERY.MASTERED]: 100 }
  const total = questions.reduce((sum, q) => {
    const level = getMasteryLevel(progressMap?.[q.id])
    return sum + weights[level]
  }, 0)
  return Math.round(total / questions.length)
}

// Get overall mastery % across all questions
export function getOverallMastery(progressMap) {
  const ids = QUESTIONS.map(q => q.id)
  const dist = getMasteryDistribution(ids, progressMap)
  const weighted =
    dist.mastered  * 100 +
    dist.learned   * 75  +
    dist.familiar  * 50  +
    dist.attempted * 25
  return Math.round(weighted / dist.total)
}

// Returns questions the user has never seen
export function getUnseenQuestions(progressMap) {
  return QUESTIONS.filter(q => getMasteryLevel(progressMap?.[q.id]) === MASTERY.UNSEEN)
}

// Returns questions the user struggles with: ≥2 attempts AND accuracy < 50%
export function getWeakQuestions(progressMap) {
  return QUESTIONS.filter(q => {
    const prog = progressMap?.[q.id]
    if (!prog || (prog.totalAnswered ?? 0) < 2) return false
    const accuracy = prog.totalCorrect / prog.totalAnswered
    return accuracy < 0.5
  })
}
