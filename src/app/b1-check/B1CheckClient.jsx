'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react'
import { B1_QUESTIONS } from '@/data/b1Questions'

const TOTAL = B1_QUESTIONS.length

// ─── Section colour map ────────────────────────────────────────────────────────
const SECTION_COLOURS = {
  Vocabulary: 'bg-brand-900 text-brand-400 border-brand-500/30',
  Grammar:    'bg-amber-400/10 text-amber-400 border-amber-400/30',
  Reading:    'bg-success/10 text-success border-success/30',
}

// ─── Score band helper ─────────────────────────────────────────────────────────
function getBand(score) {
  if (score >= 13) return {
    label:   'Strong B1 level',
    sub:     'You are likely ready to book an official test.',
    colour:  'text-success',
    bg:      'bg-success/10 border-success/30',
    icon:    'strong',
  }
  if (score >= 10) return {
    label:   'Almost there',
    sub:     'A little more practice before booking is recommended.',
    colour:  'text-amber-400',
    bg:      'bg-amber-400/10 border-amber-400/30',
    icon:    'almost',
  }
  return {
    label:   'Keep practising',
    sub:     'More preparation will help before you book.',
    colour:  'text-danger',
    bg:      'bg-danger/10 border-danger/30',
    icon:    'keep',
  }
}

// ─── Progress bar (inline, no import needed) ───────────────────────────────────
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

// ─── Intro screen ──────────────────────────────────────────────────────────────
function IntroScreen({ onStart }) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-900 border border-brand-500/30 flex items-center justify-center mx-auto mb-4">
          <BookOpen size={32} className="text-brand-400" />
        </div>
        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          B1 English Level Check
        </h1>
        <p className="text-ink-muted text-sm leading-relaxed max-w-sm mx-auto">
          15 questions covering vocabulary, grammar and reading comprehension —
          the same skills tested in an official B1 SELT (Secure English Language Test).
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5 mb-5 space-y-3">
        <div className="flex items-start gap-3 text-sm">
          <span className="w-6 h-6 rounded-full bg-brand-900 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 font-mono font-bold mt-0.5">5</span>
          <p className="text-ink-muted">Vocabulary questions — words you need to understand for immigration</p>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <span className="w-6 h-6 rounded-full bg-amber-400/10 text-amber-400 text-xs flex items-center justify-center flex-shrink-0 font-mono font-bold mt-0.5">5</span>
          <p className="text-ink-muted">Grammar questions — tenses, modal verbs, determiners</p>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <span className="w-6 h-6 rounded-full bg-success/10 text-success text-xs flex items-center justify-center flex-shrink-0 font-mono font-bold mt-0.5">5</span>
          <p className="text-ink-muted">Reading questions — short passages about the UK test and visa process</p>
        </div>
      </div>

      <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4 mb-5 flex items-start gap-3">
        <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-ink-muted leading-relaxed">
          <span className="font-semibold text-amber-400">Practice tool only.</span>{' '}
          This quiz is not an official B1 test and cannot be used for visa applications.
          You must book a test with an approved UKVI provider.
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 active:opacity-70 text-white font-semibold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        Start the quiz
      </button>
    </motion.div>
  )
}

// ─── Question screen ───────────────────────────────────────────────────────────
function QuestionScreen({ question, questionIndex, onAnswer, selectedAnswer, revealed, onNext }) {
  const isReading     = question.section === 'Reading'
  const sectionColour = SECTION_COLOURS[question.section] ?? 'bg-raised text-ink-muted border-border'

  return (
    <motion.div
      key={`q-${question.id}`}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.22 }}
    >
      {/* Section badge + progress */}
      <div className="flex items-center justify-between mb-3">
        <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full border', sectionColour)}>
          {question.section}
        </span>
        <span className="text-xs font-mono text-ink-muted">
          {questionIndex + 1} / {TOTAL}
        </span>
      </div>

      <QuizProgressBar current={questionIndex + 1} total={TOTAL} />

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
            if (isCorrect)             optionStyle = 'border-success bg-success/10 text-success'
            else if (isSelected)       optionStyle = 'border-danger  bg-danger/10  text-danger'
            else                       optionStyle = 'border-border  bg-raised     text-ink-muted opacity-50'
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
                  revealed && isCorrect  ? 'bg-success  border-success  text-[#0d0f1a]' : '',
                  revealed && isSelected && !isCorrect ? 'bg-danger border-danger text-white' : '',
                  (!revealed || (!isCorrect && !isSelected)) ? 'bg-raised border-border' : '',
                )}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm leading-snug">{opt}</span>
                {revealed && isCorrect  && <CheckCircle2 size={16} className="text-success ml-auto flex-shrink-0" />}
                {revealed && isSelected && !isCorrect && <XCircle size={16} className="text-danger ml-auto flex-shrink-0" />}
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
                ? 'bg-success/10 border-success/30 text-success'
                : 'bg-danger/10  border-danger/30  text-danger'
            )}>
              <p className="font-semibold mb-1">
                {selectedAnswer === question.answer ? 'Correct!' : 'Not quite.'}
              </p>
              <p className="text-ink-muted">{question.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next button — only shown after answering */}
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
            {questionIndex + 1 < TOTAL ? (
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
function ResultsScreen({ score, onRetry }) {
  const band = getBand(score)

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
          {score}<span className="text-2xl text-ink-muted">/{TOTAL}</span>
        </p>
        <p className={clsx('text-lg font-semibold mt-2', band.colour)}>{band.label}</p>
        <p className="text-ink-muted text-sm mt-1">{band.sub}</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4 mb-5 flex items-start gap-3">
        <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-ink-muted leading-relaxed">
          <span className="font-semibold text-amber-400">Important disclaimer:</span>{' '}
          This quiz is a practice tool only. It is not an official B1 test and cannot be
          used for visa applications. You must book a test with an approved UKVI provider.
        </p>
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
              className={clsx(
                'flex items-center justify-between gap-3 p-3 rounded-xl border border-border',
                'bg-raised hover:border-brand-400 transition-colors group min-h-[44px]'
              )}
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

      {/* Related links */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-5">
        <h2 className="text-sm font-semibold text-ink mb-3">Related guides</h2>
        <div className="space-y-2">
          {[
            { href: '/articles/do-i-need-a-b1-english-test-for-ilr', label: 'Do I need a B1 English test for ILR?' },
            { href: '/practice',                                       label: 'Practice the Life in the UK test' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center justify-between gap-3 p-3 rounded-xl border border-border',
                'bg-raised hover:border-brand-400 transition-colors group min-h-[44px]'
              )}
            >
              <span className="text-sm text-ink group-hover:text-brand-400 transition-colors">
                {item.label}
              </span>
              <ArrowRight size={16} className="text-ink-muted flex-shrink-0 group-hover:text-brand-400 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Retry */}
      <button
        type="button"
        onClick={onRetry}
        className="w-full py-4 rounded-2xl border border-border bg-raised hover:border-brand-400 active:opacity-70 text-ink font-semibold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 flex items-center justify-center gap-2"
      >
        <RotateCcw size={18} />
        Try again
      </button>
    </motion.div>
  )
}

// ─── Root component ────────────────────────────────────────────────────────────
export default function B1CheckClient() {
  // screen: 'intro' | 'quiz' | 'results'
  const [screen,          setScreen]          = useState('intro')
  const [questionIndex,   setQuestionIndex]   = useState(0)
  const [selectedAnswer,  setSelectedAnswer]  = useState(null)
  const [revealed,        setRevealed]        = useState(false)
  const [score,           setScore]           = useState(0)

  const question = B1_QUESTIONS[questionIndex]

  function handleStart() {
    setScreen('quiz')
    setQuestionIndex(0)
    setSelectedAnswer(null)
    setRevealed(false)
    setScore(0)
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
    if (next >= TOTAL) {
      setScreen('results')
    } else {
      setQuestionIndex(next)
      setSelectedAnswer(null)
      setRevealed(false)
    }
  }

  function handleRetry() {
    setScreen('intro')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <IntroScreen key="intro" onStart={handleStart} />
        )}

        {screen === 'quiz' && question && (
          <QuestionScreen
            key={`question-${questionIndex}`}
            question={question}
            questionIndex={questionIndex}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswer}
            revealed={revealed}
            onNext={handleNext}
          />
        )}

        {screen === 'results' && (
          <ResultsScreen key="results" score={score} onRetry={handleRetry} />
        )}
      </AnimatePresence>
    </div>
  )
}
