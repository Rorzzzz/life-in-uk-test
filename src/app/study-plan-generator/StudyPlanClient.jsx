'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import {
  CalendarDays,
  BookOpen,
  ClipboardList,
  Target,
  Star,
  AlertCircle,
  ArrowRight,
  Info,
} from 'lucide-react'

// ─── Score levels ─────────────────────────────────────────────────────────────
const SCORE_LEVELS = [
  { value: 'none', label: "I haven't started yet", score: 0 },
  { value: 'low', label: 'Around 50% in practice (12/24)', score: 12 },
  { value: 'mid', label: 'Around 60–70% (14–17/24)', score: 15 },
  { value: 'good', label: 'Around 75–80% (18–19/24)', score: 18 },
  { value: 'high', label: '90%+ (21+/24)', score: 21 },
]

const HOURS_OPTIONS = [
  { value: 1, label: '1 hour/week' },
  { value: 2, label: '2 hours/week' },
  { value: 3, label: '3 hours/week' },
  { value: 5, label: '5 hours/week' },
  { value: 7, label: '7+ hours/week' },
]

// ─── Plan generator ───────────────────────────────────────────────────────────
function generatePlan(weeksUntilTest, scoreLevel, hoursPerWeek) {
  const score = SCORE_LEVELS.find(s => s.value === scoreLevel)?.score ?? 0
  const isLowScore = score < 13

  const isHighScore = score >= 19

  const questionsPerDay = hoursPerWeek >= 7
    ? (isHighScore ? 30 : isLowScore ? 40 : 35)
    : hoursPerWeek >= 5
    ? (isHighScore ? 25 : isLowScore ? 30 : 28)
    : hoursPerWeek >= 3
    ? (isHighScore ? 20 : isLowScore ? 25 : 22)
    : hoursPerWeek >= 2
    ? (isHighScore ? 15 : isLowScore ? 20 : 17)
    : (isHighScore ? 10 : isLowScore ? 15 : 12)

  if (weeksUntilTest < 1) {
    return {
      type: 'emergency',
      phases: [{
        title: 'Less than 1 week — focus intensively',
        colour: '#ff4d6d',
        days: [
          `Practise as many questions as possible every day — aim for ${questionsPerDay}+ per day`,
          'Focus on the Key Dates Cheat Sheet — these appear in ~30% of questions',
          'Take at least 2 full mock exams before your test day',
          'Review only your wrong answers — do not spend time on what you already know',
          'Do not cram the night before — sleep improves recall',
        ],
      }],
    }
  }

  if (weeksUntilTest <= 2) {
    return {
      type: 'short',
      phases: [
        {
          title: 'Week 1 — Full handbook + daily practice',
          colour: '#3381ff',
          days: [
            'Read the entire handbook start to finish (3rd edition)',
            `Do ${questionsPerDay} practice questions per day — focus on Chapter 3 (history)`,
            'Identify your weakest topics using the practice results',
            'Use the Key Dates Cheat Sheet for rapid fact memorisation',
          ],
        },
        {
          title: 'Final days — Mock exams only',
          colour: '#22d07a',
          days: [
            'Take 2 full mock exams',
            'Review wrong answers only — no new content',
            'Score 21+ before booking your test',
            'Get a good night\'s sleep. Do not revise the night before your test.',
          ],
        },
      ],
    }
  }

  if (weeksUntilTest <= 4) {
    const extraChapter3 = isLowScore
      ? 'Spend extra time on Chapter 3 — aim for 3 full read-throughs'
      : 'Read Chapter 3 twice — it generates ~50% of test questions'

    return {
      type: 'standard',
      phases: [
        {
          title: 'Week 1 — Chapters 1, 2, 3',
          colour: '#3381ff',
          days: [
            'Read Chapters 1 and 2 fully',
            extraChapter3,
            `${questionsPerDay} practice questions per day, starting with Chapters 1–3`,
            isLowScore ? 'Take notes on key dates and named individuals as you read' : 'Focus on dates and statistics — these are where most marks are lost',
          ],
        },
        {
          title: 'Week 2 — Chapters 4, 5 + Chapter 3 revision',
          colour: '#a855f7',
          days: [
            'Read Chapters 4 and 5',
            `${questionsPerDay} practice questions per day`,
            'Revisit Chapter 3 weak spots identified in Week 1',
            'Use the cheat sheet to drill key dates',
          ],
        },
        {
          title: 'Week 3 — Mixed practice + first mock exam',
          colour: '#f59e0b',
          days: [
            'Mixed practice across all chapters every day',
            `Increase to ${Math.min(questionsPerDay + 5, 40)} questions per day`,
            'Take your first full mock exam',
            'Target only weak spots — not areas you already know well',
          ],
        },
        {
          title: 'Week 4 — Mock exams + consolidation',
          colour: '#22d07a',
          days: [
            'Take a mock exam every other day',
            'Review wrong answers immediately after each mock',
            'Stop all new content 2 days before your test',
            'Get a good night\'s sleep. Do not revise the night before your test.',
          ],
        },
      ],
    }
  }

  if (weeksUntilTest <= 8) {
    return {
      type: 'comfortable',
      phases: [
        {
          title: `Weeks 1–2 — Read full handbook`,
          colour: '#3381ff',
          days: [
            isLowScore ? 'Read each chapter slowly — take notes on every date and named person' : 'Read the full handbook. Flag anything you find difficult.',
            `Start ${questionsPerDay} practice questions per day from Week 1`,
            'Focus your reading time on Chapter 3 — it generates the most questions',
            isLowScore ? 'Use the cheat sheet alongside your reading' : 'Begin drilling key dates with the cheat sheet',
          ],
        },
        {
          title: `Weeks 3–4 — Chapter practice + first mock exam`,
          colour: '#a855f7',
          days: [
            'Practice by chapter — go deeper on your weakest chapters',
            `Increase to ${Math.min(questionsPerDay + 5, 40)} questions per day`,
            'Take your first mock exam at the end of Week 4',
            'Review wrong answers — build your weak spots list',
          ],
        },
        {
          title: `Weeks 5–6 — Weak spot targeting`,
          colour: '#f59e0b',
          days: [
            'Drill only your weak areas — use the Weak Spots tool to identify them',
            `${Math.min(questionsPerDay + 8, 45)} questions per day`,
            isHighScore ? 'Focus on the specific facts you still miss — dates, names, statistics' : 'Spend extra time on Chapter 3 — it generates ~50% of all questions',
            'Take a mock exam at the end of this phase',
          ],
        },
        {
          title: `Weeks 7–8 — Mock exams + review`,
          colour: '#22d07a',
          days: [
            'Take a mock exam every other day',
            'Review wrong answers only — no new content',
            'Target 21+ out of 24 before booking your test',
            'Get a good night\'s sleep. Do not revise the night before your test.',
          ],
        },
      ],
    }
  }

  // 9+ weeks
  return {
    type: 'extended',
    phases: [
      {
        title: 'Phase 1: Weeks 1–3 — Read the handbook',
        colour: '#3381ff',
        days: [
          'Read the official handbook at a comfortable pace — once through, fully',
          `${questionsPerDay} practice questions per day from day one`,
          'Take notes on key dates, named people, and statistics as you read',
          'Focus the most time on Chapter 3 — British history',
          isLowScore ? 'Do not rush. Solid foundations now will save time later.' : 'You have time — use it to build genuinely secure knowledge, not shallow familiarity.',
        ],
      },
      {
        title: 'Phase 2: Weeks 4–6 — Chapter practice',
        colour: '#a855f7',
        days: [
          'Practice by chapter — go deep on weak areas',
          `Build up to ${Math.min(questionsPerDay + 5, 35)} questions per day`,
          'Read Chapter 3 again — a second read-through at this stage significantly improves scores',
          'Take your first mock exam at the end of Phase 2',
        ],
      },
      {
        title: 'Phase 3: Weeks 7–9 — Weak spot targeting',
        colour: '#f59e0b',
        days: [
          'Use the Weak Spots tool — drill only questions you miss, not ones you already know',
          `${Math.min(questionsPerDay + 8, 40)} questions per day`,
          'Take a mock exam at the end of Phase 3',
          isHighScore ? 'Target the specific tricky facts — obscure historical figures, precise years' : 'Keep Chapter 3 fresh with regular practice',
        ],
      },
      {
        title: 'Phase 4: Final weeks — Mock exams and consolidation',
        colour: '#22d07a',
        days: [
          'Take mock exams regularly — every 2 days',
          'Review wrong answers immediately after every mock',
          'Do not start new content in the final 2 weeks — only review and consolidate',
          'Score 21+ consistently before booking your test',
          'Get a good night\'s sleep. Do not revise the night before your test.',
        ],
      },
    ],
  }
}

// ─── Phase card ───────────────────────────────────────────────────────────────
function PhaseCard({ phase, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.25 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
    >
      <div
        className="px-4 py-3 border-b border-border"
        style={{ borderLeftColor: phase.colour, borderLeftWidth: 3 }}
      >
        <h3 className="font-display font-bold text-ink text-sm">{phase.title}</h3>
      </div>
      <ul className="divide-y divide-border">
        {phase.days.map((day, i) => (
          <li key={i} className="flex items-start gap-3 px-4 py-3">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
              style={{ backgroundColor: phase.colour }}
            />
            <span className="text-sm text-ink-muted leading-relaxed">{day}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function StudyPlanClient() {
  const todayStr = new Date().toISOString().split('T')[0]
  const [testDate, setTestDate] = useState('')
  const [scoreLevel, setScoreLevel] = useState('')
  const [hoursPerWeek, setHoursPerWeek] = useState(null)

  const result = useMemo(() => {
    if (!testDate || !scoreLevel || !hoursPerWeek) return null
    const test = new Date(testDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (test <= today) return null
    const msPerWeek = 7 * 24 * 60 * 60 * 1000
    const weeksUntilTest = (test - today) / msPerWeek
    return {
      weeksUntilTest,
      plan: generatePlan(weeksUntilTest, scoreLevel, hoursPerWeek),
    }
  }, [testDate, scoreLevel, hoursPerWeek])

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          Study Plan Generator
        </h1>
        <p className="text-ink-muted text-sm leading-relaxed">
          Enter your test date and current practice score to get a personalised week-by-week
          study plan for the Life in the UK test.
        </p>
      </div>

      {/* Form */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-6 mb-6">

        {/* Test date */}
        <div>
          <label
            htmlFor="test-date"
            className="text-sm font-semibold text-ink mb-2 flex items-center gap-2"
          >
            <CalendarDays size={16} className="text-brand-400" />
            Your test date
          </label>
          <input
            id="test-date"
            type="date"
            min={todayStr}
            value={testDate}
            onChange={e => setTestDate(e.target.value)}
            style={{ colorScheme: 'dark' }}
            className={clsx(
              'w-full h-11 px-3 rounded-xl border border-border bg-raised text-ink text-sm',
              'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'
            )}
          />
        </div>

        {/* Current score */}
        <fieldset>
          <legend className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
            <Target size={16} className="text-brand-400" />
            Current practice score
          </legend>
          <div className="grid gap-2">
            {SCORE_LEVELS.map(level => (
              <label
                key={level.value}
                className={clsx(
                  'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                  'min-h-[44px]',
                  scoreLevel === level.value
                    ? 'border-brand-500 bg-brand-900'
                    : 'border-border bg-raised hover:border-brand-400'
                )}
              >
                <input
                  type="radio"
                  name="scoreLevel"
                  value={level.value}
                  checked={scoreLevel === level.value}
                  onChange={() => setScoreLevel(level.value)}
                  className="accent-brand-500 w-4 h-4 flex-shrink-0"
                />
                <span className={clsx(
                  'text-sm font-medium',
                  scoreLevel === level.value ? 'text-brand-400' : 'text-ink'
                )}>
                  {level.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Hours per week */}
        <fieldset>
          <legend className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
            <BookOpen size={16} className="text-brand-400" />
            Hours available per week
          </legend>
          <div className="flex flex-wrap gap-2">
            {HOURS_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setHoursPerWeek(opt.value)}
                className={clsx(
                  'px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors min-h-[44px]',
                  hoursPerWeek === opt.value
                    ? 'border-brand-500 bg-brand-900 text-brand-400'
                    : 'border-border bg-raised text-ink hover:border-brand-400'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result ? (
          <motion.div
            key="plan"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Summary */}
            <div className="bg-brand-900 border border-brand-500/30 rounded-2xl p-4">
              <p className="text-sm text-brand-400 font-semibold mb-1">
                {result.weeksUntilTest < 1
                  ? 'Less than 1 week until your test'
                  : `${Math.floor(result.weeksUntilTest)} weeks until your test`}
              </p>
              <p className="text-xs text-ink-muted">
                Your personalised plan is below. Adjust it as needed — the goal is 21+ out of 24
                in practice before you sit.
              </p>
            </div>

            {/* Phase cards */}
            {result.plan.phases.map((phase, i) => (
              <PhaseCard key={i} phase={phase} index={i} />
            ))}

            {/* Quick links */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h2 className="text-base font-display font-bold text-ink mb-3">Tools for your plan</h2>
              <div className="space-y-2">
                {[
                  { href: '/practice', label: 'Practice questions', icon: Target },
                  { href: '/exam', label: 'Mock exam — full 24 questions timed', icon: ClipboardList },
                  { href: '/cheat-sheet', label: 'Key dates cheat sheet', icon: Star },
                  { href: '/weak-spots', label: 'Weak spots — drill what you miss', icon: AlertCircle },
                ].map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      'flex items-center justify-between gap-3 p-3 rounded-xl border border-border',
                      'bg-raised hover:border-brand-400 transition-colors group min-h-[44px]'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={15} className="text-brand-400 flex-shrink-0" />
                      <span className="text-sm text-ink group-hover:text-brand-400 transition-colors">
                        {label}
                      </span>
                    </div>
                    <ArrowRight size={16} className="text-ink-muted flex-shrink-0 group-hover:text-brand-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-raised rounded-xl border border-border text-xs text-ink-muted">
              <Info size={13} className="text-brand-400 flex-shrink-0 mt-0.5" />
              This plan is a guide. Adjust daily question targets to match your schedule. The
              most important signal is your mock test score — book when you are consistently
              scoring 21+ out of 24.
            </div>
          </motion.div>
        ) : (
          <div className="bg-card rounded-2xl border border-border p-6 text-center">
            <CalendarDays size={32} className="text-ink-faint mx-auto mb-3" />
            <p className="text-ink-muted text-sm">
              Enter your test date, current score, and weekly hours above to get your personalised study plan.
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
