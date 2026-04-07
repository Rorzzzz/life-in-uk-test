// Pass the UK Test — Readiness Score Algorithm
// Readiness 0–100%: mastery distribution (50%) + coverage (30%) + streak (20%)

import { MASTERY } from './sm2'
import { QUESTIONS } from '@/data/questions'

// Calculate overall readiness score (0–100)
export function calcReadiness(progressMap, streak) {
  const total = QUESTIONS.length

  // 1. Mastery score (50% weight)
  // Weights: mastered=1.0, learned=0.75, familiar=0.5, attempted=0.1, unseen=0
  let masteryPoints = 0
  for (const q of QUESTIONS) {
    const prog = progressMap?.[q.id]
    const mastery = prog?.mastery ?? MASTERY.UNSEEN
    switch (mastery) {
      case MASTERY.MASTERED:  masteryPoints += 1.0;  break
      case MASTERY.LEARNED:   masteryPoints += 0.75; break
      case MASTERY.FAMILIAR:  masteryPoints += 0.5;  break
      case MASTERY.ATTEMPTED: masteryPoints += 0.1;  break
    }
  }
  const masteryScore = (masteryPoints / total) * 100

  // 2. Coverage score (30% weight) — capped at 200 questions (full coverage benchmark)
  const attempted = QUESTIONS.filter(q => (progressMap?.[q.id]?.totalAnswered ?? 0) > 0).length
  const coverageScore = Math.min(attempted / 200, 1) * 100

  // 3. Streak score (20% weight) — capped at 7 days = 100%
  const streakScore = Math.min((streak ?? 0) / 7, 1) * 100

  const readiness = (masteryScore * 0.5) + (coverageScore * 0.3) + (streakScore * 0.2)
  return Math.round(Math.min(readiness, 100))
}

// Readiness tier labels
export function getReadinessTier(score) {
  if (score >= 80) return { label: 'Ready to book!',       colour: '#22d07a', emoji: '🎓' }
  if (score >= 60) return { label: 'Almost ready',         colour: '#3381ff', emoji: '📚' }
  if (score >= 50) return { label: 'Making good progress', colour: '#f59e0b', emoji: '⚡' }
  if (score >= 25) return { label: 'Keep practising',      colour: '#a855f7', emoji: '💪' }
  return                  { label: 'Just getting started', colour: '#ff4d6d', emoji: '🌱' }
}
