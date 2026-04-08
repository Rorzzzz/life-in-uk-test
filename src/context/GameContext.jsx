'use client'

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { sm2Update, defaultQuestionState } from '@/algorithms/sm2'
import { BADGES } from '@/data/badges'

// ─── Default State ───────────────────────────────────────────────────────────
const DEFAULT_STATE = {
  xp:              0,
  level:           1,
  streak:          0,
  lastActiveDate:  null,  // ISO date string 'YYYY-MM-DD'
  questionsToday:  0,
  totalAnswered:   0,
  totalCorrect:    0,
  examsPassed:     0,
  perfectExams:    0,
  speedExams:      0,
  chapterScores:   {},    // { [chapterId]: bestScorePercent }
  progress:        {},    // { [questionId]: SM-2 state }
  unlockedBadges:  [],    // array of badge IDs
  version:         2,
}

// ─── localStorage helpers ─────────────────────────────────────────────────────
const STORAGE_KEY = 'passtheuktest_v1'

function loadState() {
  if (typeof window === 'undefined') return DEFAULT_STATE
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : DEFAULT_STATE
    return checkStreakIntegrity(migrateState(parsed))
  } catch {
    return DEFAULT_STATE
  }
}

function migrateState(state) {
  // Ensure all fields exist (handles old saves)
  return { ...DEFAULT_STATE, ...state, version: 2 }
}

function saveState(state) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

// ─── Streak helpers ───────────────────────────────────────────────────────────
const STREAK_THRESHOLD = 5 // questions per day needed to maintain streak

// Called on every RECORD_ANSWER — handles day rollover and threshold check
function updateStreak(state) {
  const today = new Date().toISOString().split('T')[0]
  if (state.lastActiveDate === today) return state // already updated today

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  // Check if yesterday's threshold was met before we reset questionsToday
  const metThreshold = (state.questionsToday ?? 0) >= STREAK_THRESHOLD
  const wasYesterday = state.lastActiveDate === yesterdayStr

  const streak = (wasYesterday && metThreshold) ? state.streak + 1 : 1
  return { ...state, streak, lastActiveDate: today, questionsToday: 0 }
}

// Called on app load — resets streak to 0 if last active was >1 day ago
function checkStreakIntegrity(state) {
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  const isValid = state.lastActiveDate === today || state.lastActiveDate === yesterdayStr
  if (!isValid && state.streak > 0) {
    return { ...state, streak: 0 }
  }
  return state
}

// ─── Badge checker ────────────────────────────────────────────────────────────
function checkBadges(state) {
  const newBadges = []
  for (const badge of BADGES) {
    if (state.unlockedBadges.includes(badge.id)) continue
    try {
      if (badge.unlockCondition(state)) newBadges.push(badge.id)
    } catch {}
  }
  if (!newBadges.length) return state
  return { ...state, unlockedBadges: [...state.unlockedBadges, ...newBadges], _newBadges: newBadges }
}

// ─── Reducer ──────────────────────────────────────────────────────────────────
function gameReducer(state, action) {
  switch (action.type) {

    case 'RECORD_ANSWER': {
      const { questionId, isCorrect, responseMs, chapterId, countForStreak = true } = action
      const stateWithStreak = updateStreak(state)

      const prevQState = stateWithStreak.progress[questionId] ?? defaultQuestionState()
      const newQState  = sm2Update(prevQState, isCorrect, responseMs)

      const xpGain = isCorrect
        ? (prevQState.totalAnswered === 0 ? 10 : 5)
        : 0

      const next = {
        ...stateWithStreak,
        xp:             stateWithStreak.xp + xpGain,
        totalAnswered:  stateWithStreak.totalAnswered + 1,
        totalCorrect:   stateWithStreak.totalCorrect + (isCorrect ? 1 : 0),
        // Only increment questionsToday for practice (not exam) sessions
        questionsToday: countForStreak
          ? stateWithStreak.questionsToday + 1
          : stateWithStreak.questionsToday,
        progress: {
          ...stateWithStreak.progress,
          [questionId]: newQState,
        },
      }
      return checkBadges(next)
    }

    case 'COMPLETE_CHAPTER': {
      const { chapterId, score, total } = action
      const pct = Math.round((score / total) * 100)
      const prev = state.chapterScores[chapterId] ?? 0
      const next = {
        ...state,
        xp: state.xp + 25,
        chapterScores: {
          ...state.chapterScores,
          [chapterId]: Math.max(prev, pct),
        },
      }
      return checkBadges(next)
    }

    case 'COMPLETE_EXAM': {
      const { score, total, timeRemainingSeconds } = action
      const passed  = score >= 18
      const perfect = score === total
      const fast    = passed && timeRemainingSeconds >= 20 * 60

      // +200 XP for perfect 24/24, +100 for any pass, 0 for fail
      const xpGain = perfect ? 200 : passed ? 100 : 0

      const next = {
        ...state,
        xp:           state.xp + xpGain,
        examsPassed:  state.examsPassed  + (passed  ? 1 : 0),
        perfectExams: state.perfectExams + (perfect ? 1 : 0),
        speedExams:   state.speedExams   + (fast    ? 1 : 0),
      }
      return checkBadges(next)
    }

    case 'ADD_XP': {
      return { ...state, xp: state.xp + action.amount }
    }

    case 'CLEAR_NEW_BADGES': {
      const { _newBadges, ...rest } = state
      return rest
    }

    case 'RESET': {
      return DEFAULT_STATE
    }

    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, DEFAULT_STATE, loadState)

  // Persist to localStorage on every state change
  useEffect(() => {
    saveState(state)
  }, [state])

  const recordAnswer = useCallback((questionId, isCorrect, responseMs, chapterId, countForStreak = true) => {
    dispatch({ type: 'RECORD_ANSWER', questionId, isCorrect, responseMs, chapterId, countForStreak })
  }, [])

  const completeChapter = useCallback((chapterId, score, total) => {
    dispatch({ type: 'COMPLETE_CHAPTER', chapterId, score, total })
  }, [])

  const completeExam = useCallback((score, total, timeRemainingSeconds) => {
    dispatch({ type: 'COMPLETE_EXAM', score, total, timeRemainingSeconds })
  }, [])

  const addXP = useCallback((amount) => {
    dispatch({ type: 'ADD_XP', amount })
  }, [])

  const clearNewBadges = useCallback(() => {
    dispatch({ type: 'CLEAR_NEW_BADGES' })
  }, [])

  const resetProgress = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  return (
    <GameContext.Provider value={{
      state,
      dispatch,
      recordAnswer,
      completeChapter,
      completeExam,
      addXP,
      clearNewBadges,
      resetProgress,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
