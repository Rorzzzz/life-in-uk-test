'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react'
import { B1_PRACTICE_TESTS } from '@/data/b1Questions'

// ─── Quiz metadata ─────────────────────────────────────────────────────────────
const QUIZ_META = [
  {
    number: 1,
    label: 'Quiz 1',
    focus: 'Core vocabulary · Present perfect · Modals',
    badge: 'Start here',
    badgeStyle: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    numStyle: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  },
  {
    number: 2,
    label: 'Quiz 2',
    focus: 'Immigration vocab · Passive voice · Conditionals',
    badge: 'Citizenship focus',
    badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    numStyle: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  },
  {
    number: 3,
    label: 'Quiz 3',
    focus: 'Naturalisation terms · 2026 rule changes',
    badge: '2026 updates',
    badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    numStyle: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  },
  {
    number: 4,
    label: 'Quiz 4',
    focus: 'Advanced grammar · Third conditional · Indirect questions',
    badge: 'Advanced',
    badgeStyle: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    numStyle: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  },
]

// ─── Section colour map ────────────────────────────────────────────────────────
const SECTION_COLOURS = {
  Vocabulary: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Grammar:    'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Reading:    'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
}

// ─── Score band ────────────────────────────────────────────────────────────────
function getBand(score, total) {
  const pct = score / total
  if (pct >= 0.87) return {
    label: 'Strong B1 level',
    sub:   'You are likely ready to book an official test.',
    colour: 'text-emerald-400',
    bg:    'bg-emerald-500/10 border-emerald-500/30',
  }
  if (pct >= 0.67) return {
    label: 'Almost there',
    sub:   'A little more practice before booking is recommended.',
    colour: 'text-amber-400',
    bg:    'bg-amber-500/10 border-amber-500/30',
  }
  return {
    label: 'Keep practising',
    sub:   'More preparation will help before you book.',
    colour: 'text-red-400',
    bg:    'bg-red-500/10 border-red-500/30',
  }
}

// ─── Progress bar ──────────────────────────────────────────────────────────────
function QuizProgressBar({ current, total }) {
  const pct = ((current / total) * 100).toFixed(1)
  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Question ${current} of ${total}`}
      className="w-full bg-border rounded-full overflow-hidden"
      style={{ height: 6 }}
    >
      <div
        className="h-full rounded-full bg-brand-500 transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// ─── Select screen ─────────────────────────────────────────────────────────────
function SelectScreen({ onSelect }) {
  return (
    <motion.div
      key="select"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-bold text-ink mb-2">
          B1 English Level Check
        </h2>
        <p className="text-ink-muted text-sm leading-relaxed max-w-sm mx-auto">
          Four free quizzes — 15 questions each. Choose one to start. Each covers different
          vocabulary, grammar and reading skills tested in official B1 SELTs.
        </p>
      </div>

      <div className="space-y-3 mb-5">
        {QUIZ_META.map(quiz => (
          <button
            key={quiz.number}
            type="button"
            onClick={() => onSelect(quiz.number)}
            className="w-full text-left bg-card border border-border hover:border-brand-400 active:opacity-70 rounded-2xl p-4 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <div className="flex items-center gap-4">
              {/* Number circle */}
              <div className={clsx(
                'w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 font-display font-bold text-xl',
                quiz.numStyle
              )}>
                {quiz.number}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-base font-semibold text-ink group-hover:text-brand-400 transition-colors">
                    {quiz.label}
                  </span>
                  <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full border', quiz.badgeStyle)}>
                    {quiz.badge}
                  </span>
                </div>
                <p className="text-sm text-ink-muted">{quiz.focus}</p>
              </div>

              {/* Arrow */}
              <ArrowRight size={18} className="text-ink-muted group-hover:text-brand-400 transition-colors flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>

      <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-ink-muted leading-relaxed">
          <span className="font-semibold text-amber-400">Practice tool only.</span>{' '}
          These quizzes cannot be used for visa applications.
          You must book with an approved UKVI provider.
        </p>
      </div>
    </motion.div>
  )
}

// ─── Question screen ───────────────────────────────────────────────────────────
function QuestionScreen({ question, questionIndex, total, quizNumber, onAnswer, selectedAnswer, revealed, onNext }) {
  const isReading     = question.section === 'Reading'
  const sectionColour = SECTION_COLOURS[question.section] ?? 'bg-raised text-ink-muted border-border'
  const meta          = QUIZ_META.find(m => m.number === quizNumber)

  return (
    <motion.div
      key={`q-${question.id}`}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.22 }}
    >
      {/* Section badge + progress */}
      <div className="flex items-center justify-between mb-1">
        <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full border', sectionColour)}>
          {question.section}
        </span>
        <span className="text-xs text-ink-muted">
          <span className="font-semibold text-ink">{meta?.label}</span>
          {' · '}
          <span className="font-mono">{questionIndex + 1}/{total}</span>
        </span>
      </div>

      <div className="mb-3">
        <QuizProgressBar current={questionIndex + 1} total={total} />
      </div>

      {/* Reading passage */}
      {isReading && question.passage && (
        <div className="mt-4 p-4 bg-raised rounded-xl border border-border">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">Read this passage</p>
          <p className="text-sm text-ink leading-relaxed">{question.passage}</p>
        </div>
      )}

      {/* Question text */}
      <div className="mt-4 mb-4">
        <p className="text-base font-semibold text-ink leading-snug">{question.q}</p>
      </div>

      {/* Answer options */}
      <div className="space-y-2 mb-4">
        {question.options.map((opt, i) => {
          const isCorrect  = i === question.answer
          const isSelected = i === selectedAnswer

          let optionStyle = 'border-border bg-raised text-ink hover:border-brand-400'
          if (revealed) {
            if (isCorrect)             optionStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
            else if (isSelected)       optionStyle = 'border-red-500    bg-red-500/10    text-red-400'
            else                       optionStyle = 'border-border     bg-raised        text-ink-muted opacity-50'
          } else if (isSelected) {
            optionStyle = 'border-brand-500 bg-brand-900 text-brand-400'
          }

          return (
            <button
              key={i}
              type="button"
              disabled={revealed}
              onClick={() => onAnswer(i)}
              className={clsx(
                'w-full text-left px-4 py-3 rounded-xl border transition-colors min-h-[44px]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                optionStyle,
                !revealed && 'active:opacity-70 cursor-pointer',
                revealed && 'cursor-default'
              )}
            >
              <div className="flex items-center gap-3">
                <span className={clsx(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 border',
                  revealed && isCorrect ? 'bg-emerald-500 border-emerald-500 text-white' : '',
                  revealed && isSelected && !isCorrect ? 'bg-red-500 border-red-500 text-white' : '',
                  (!revealed || (!isCorrect && !isSelected)) ? 'bg-raised border-border' : '',
                )}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm leading-snug">{opt}</span>
                {revealed && isCorrect  && <CheckCircle2 size={16} className="text-emerald-400 ml-auto flex-shrink-0" />}
                {revealed && isSelected && !isCorrect && <XCircle size={16} className="text-red-400 ml-auto flex-shrink-0" />}
              </div>
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            key="explanation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-4"
          >
            <div className={clsx(
              'p-4 rounded-xl border text-sm leading-relaxed',
              selectedAnswer === question.answer
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-red-500/10    border-red-500/30    text-red-400'
            )}>
              <p className="font-semibold mb-1">
                {selectedAnswer === question.answer ? 'Correct!' : 'Not quite.'}
              </p>
              <p className="text-ink-muted">{question.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next button */}
      <AnimatePresence>
        {revealed && (
          <motion.button
            key="next-btn"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            type="button"
            onClick={onNext}
            className="w-full py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 active:opacity-70 text-white font-semibold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 flex items-center justify-center gap-2"
          >
            {questionIndex + 1 < total ? (
              <>Next question <ArrowRight size={18} /></>
            ) : (
              <>See my results <ArrowRight size={18} /></>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Results screen ────────────────────────────────────────────────────────────
function ResultsScreen({ score, total, quizNumber, onRetry, onChooseQuiz }) {
  const band        = getBand(score, total)
  const otherQuizzes = QUIZ_META.filter(m => m.number !== quizNumber)

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Score banner */}
      <div className={clsx('rounded-2xl border p-6 text-center mb-5', band.bg)}>
        <p className="text-5xl font-display font-bold text-ink mb-1">
          {score}<span className="text-2xl text-ink-muted">/{total}</span>
        </p>
        <p className={clsx('text-lg font-semibold mt-2', band.colour)}>{band.label}</p>
        <p className="text-ink-muted text-sm mt-1">{band.sub}</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4 mb-5 flex items-start gap-3">
        <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-ink-muted leading-relaxed">
          <span className="font-semibold text-amber-400">Practice tool only.</span>{' '}
          This quiz cannot be used for visa applications. You must book with an approved UKVI provider.
        </p>
      </div>

      {/* Try other quizzes */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-5">
        <h2 className="text-sm font-semibold text-ink mb-3">Check out the other quizzes</h2>
        <div className="space-y-2">
          {otherQuizzes.map(quiz => (
            <button
              key={quiz.number}
              type="button"
              onClick={() => onChooseQuiz(quiz.number)}
              className="w-full text-left flex items-center gap-3 p-3 rounded-xl border border-border bg-raised hover:border-brand-400 transition-colors group min-h-[44px]"
            >
              <div className={clsx(
                'w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 text-sm font-bold font-mono',
                quiz.numStyle
              )}>
                {quiz.number}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink group-hover:text-brand-400 transition-colors">
                  {quiz.label}
                </p>
                <p className="text-xs text-ink-muted truncate">{quiz.focus}</p>
              </div>
              <ArrowRight size={14} className="text-ink-muted group-hover:text-brand-400 transition-colors flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Approved providers */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-5">
        <h2 className="text-sm font-semibold text-ink mb-3">Approved UKVI test providers</h2>
        <div className="space-y-2">
          {[
            { name: 'Trinity College London',  note: 'In-person',                  href: 'https://www.trinitycollege.com/qualifications/GESE/SELT' },
            { name: 'LANGUAGECERT',            note: 'Available online from home', href: 'https://www.languagecert.org/en/selt' },
            { name: 'IELTS Life Skills',       note: 'In-person',                  href: 'https://www.ielts.org/about-ielts/ielts-for-uk-visas-and-immigration' },
          ].map(provider => (
            <a
              key={provider.name}
              href={provider.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border bg-raised hover:border-brand-400 transition-colors group min-h-[44px]"
            >
              <div>
                <p className="text-sm font-medium text-ink group-hover:text-brand-400 transition-colors">
                  {provider.name}
                </p>
                <p className="text-xs text-ink-muted">{provider.note}</p>
              </div>
              <ExternalLink size={14} className="text-ink-muted flex-shrink-0 group-hover:text-brand-400 transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Retry / change quiz */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={onRetry}
          className="w-full py-4 rounded-2xl border border-border bg-raised hover:border-brand-400 active:opacity-70 text-ink font-semibold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          Retry Quiz {quizNumber}
        </button>
        <button
          type="button"
          onClick={() => onChooseQuiz(null)}
          className="w-full py-3 rounded-2xl text-ink-muted hover:text-ink text-sm transition-colors"
        >
          ← Back to quiz selection
        </button>
      </div>
    </motion.div>
  )
}

// ─── Root component ────────────────────────────────────────────────────────────
export default function B1CheckClient() {
  const [screen,         setScreen]         = useState('select')
  const [quizNumber,     setQuizNumber]     = useState(null)
  const [questionIndex,  setQuestionIndex]  = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [revealed,       setRevealed]       = useState(false)
  const [score,          setScore]          = useState(0)

  const questions = quizNumber ? B1_PRACTICE_TESTS[quizNumber] : []
  const total     = questions.length
  const question  = questions[questionIndex]

  function startQuiz(num) {
    setQuizNumber(num)
    setQuestionIndex(0)
    setSelectedAnswer(null)
    setRevealed(false)
    setScore(0)
    setScreen('quiz')
  }

  function handleAnswer(optionIndex) {
    if (revealed) return
    setSelectedAnswer(optionIndex)
    setRevealed(true)
    if (optionIndex === question.answer) {
      setScore(s => s + 1)
    }
  }

  function handleNext() {
    const next = questionIndex + 1
    if (next >= total) {
      setScreen('results')
    } else {
      setQuestionIndex(next)
      setSelectedAnswer(null)
      setRevealed(false)
    }
  }

  function handleRetry() {
    startQuiz(quizNumber)
  }

  function handleChooseQuiz(num) {
    if (num === null) {
      // Back to selection screen
      setScreen('select')
      setQuizNumber(null)
    } else {
      startQuiz(num)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <AnimatePresence mode="wait">
        {screen === 'select' && (
          <SelectScreen key="select" onSelect={startQuiz} />
        )}

        {screen === 'quiz' && question && (
          <QuestionScreen
            key={`question-${quizNumber}-${questionIndex}`}
            question={question}
            questionIndex={questionIndex}
            total={total}
            quizNumber={quizNumber}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswer}
            revealed={revealed}
            onNext={handleNext}
          />
        )}

        {screen === 'results' && (
          <ResultsScreen
            key="results"
            score={score}
            total={total}
            quizNumber={quizNumber}
            onRetry={handleRetry}
            onChooseQuiz={handleChooseQuiz}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
