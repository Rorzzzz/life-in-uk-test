// Pass the UK Test — Adaptive Session Builder
// Builds a practice session from a mix of: due reviews, weak spots, and new questions

import { QUESTIONS, getByChapter } from '@/data/questions'
import { isDueToday, MASTERY } from './sm2'

const SESSION_SIZE = 10

// Build an adaptive session for general practice
// Mix: 40% due reviews, 40% weak/familiar, 20% new
export function buildAdaptiveSession(progressMap, options = {}) {
  const { chapterId = null, size = SESSION_SIZE } = options

  let pool = chapterId ? getByChapter(chapterId) : QUESTIONS

  const due     = []
  const weak    = []
  const newQs   = []
  const others  = []

  for (const q of pool) {
    const prog = progressMap?.[q.id]
    if (!prog || prog.mastery === MASTERY.UNSEEN) {
      newQs.push(q)
      continue
    }
    if (isDueToday(prog)) {
      due.push(q)
      continue
    }
    const accuracy = prog.totalAnswered > 0 ? prog.totalCorrect / prog.totalAnswered : 1
    if (prog.totalAnswered >= 2 && accuracy < 0.5) {
      weak.push(q)
    } else {
      others.push(q)
    }
  }

  // Shuffle each bucket
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

  const dueSlice   = shuffle(due).slice(0,   Math.ceil(size * 0.4))
  const weakSlice  = shuffle(weak).slice(0,  Math.ceil(size * 0.4))
  const newSlice   = shuffle(newQs).slice(0, Math.ceil(size * 0.2))

  let session = [...dueSlice, ...weakSlice, ...newSlice]

  // Top up from others AND unused new questions if session is short
  if (session.length < size) {
    const used = new Set(session.map(q => q.id))
    const topUpPool = shuffle([...others, ...newQs].filter(q => !used.has(q.id)))
    session = [...session, ...topUpPool.slice(0, size - session.length)]
  }

  // Final shuffle so bucket order isn't obvious to user
  return shuffle(session).slice(0, size)
}

// Build a weak-spots session (≥2 attempts AND accuracy < 50%)
export function buildWeakSession(progressMap, size = SESSION_SIZE) {
  const weak = QUESTIONS.filter(q => {
    const prog = progressMap?.[q.id]
    if (!prog || (prog.totalAnswered ?? 0) < 2) return false
    return (prog.totalCorrect / prog.totalAnswered) < 0.5
  })
  return [...weak].sort(() => Math.random() - 0.5).slice(0, size)
}

// Build a chapter-specific session
export function buildChapterSession(chapterId, progressMap, size = SESSION_SIZE) {
  return buildAdaptiveSession(progressMap, { chapterId, size })
}
