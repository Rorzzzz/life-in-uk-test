// Pass the UK Test — Due Today Queue
// Returns questions that are due for spaced repetition review today

import { QUESTIONS } from '@/data/questions'
import { isDueToday, MASTERY } from './sm2'

// Returns questions due for review today (SM-2 queue)
// Prioritises: overdue → due today → new questions
export function getDueToday(progressMap, maxCount = 20) {
  const today = new Date().toISOString().split('T')[0]

  const overdue = []
  const dueToday = []
  const newQuestions = []

  for (const q of QUESTIONS) {
    const prog = progressMap?.[q.id]
    if (!prog || prog.mastery === MASTERY.UNSEEN) {
      newQuestions.push(q)
      continue
    }
    if (!prog.dueDate) {
      dueToday.push(q)
      continue
    }
    if (prog.dueDate < today) {
      overdue.push(q)
    } else if (prog.dueDate === today) {
      dueToday.push(q)
    }
  }

  // Sort overdue by how overdue they are (most overdue first)
  overdue.sort((a, b) => {
    const da = progressMap[a.id]?.dueDate ?? ''
    const db = progressMap[b.id]?.dueDate ?? ''
    return da.localeCompare(db)
  })

  const queue = [...overdue, ...dueToday, ...newQuestions]
  return queue.slice(0, maxCount)
}

// Count of questions due today (for UI badge)
export function getDueTodayCount(progressMap) {
  const today = new Date().toISOString().split('T')[0]
  let count = 0
  for (const q of QUESTIONS) {
    const prog = progressMap?.[q.id]
    if (!prog || !prog.dueDate || prog.dueDate <= today) count++
  }
  return count
}
