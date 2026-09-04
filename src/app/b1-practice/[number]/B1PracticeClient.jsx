'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import clsx from 'clsx'
import { Volume2, VolumeX, ChevronRight, RotateCcw, Trophy } from 'lucide-react'
import { useAudioNarration } from '@/hooks/useAudioNarration'

// ─── Constants ────────────────────────────────────────────────────────────────

const SECTION_COLOURS = {
  Vocabulary: {
    bg: 'bg-brand-900/40',
    text: 'text-brand-400',
    border: 'border-brand-500/30',
    dot: 'bg-brand-400',
  },
  Grammar: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
  },
  Reading: {
    bg: 'bg-success/10',
    text: 'text-success',
    border: 'border-success/30',
    dot: 'bg-success',
  },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PassageAudioButton({ text }) {
  const { toggle, isSpeaking, isSupported } = useAudioNarration()
  if (!isSupported) return null
  return (
    <button
      type="button"
      onClick={() => toggle(text)}
      className={clsx(
        'inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all',
        isSpeaking
          ? 'bg-success/20 text-success border border-success/30'
          : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:bg-white/10'
      )}
      aria-label={isSpeaking ? 'Stop reading passage aloud' : 'Read passage aloud'}
    >
      {isSpeaking ? <VolumeX size={13} /> : <Volume2 size={13} />}
      {isSpeaking ? 'Stop' : 'Listen'}
    </button>
  )
}

function QuizProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="w-full h-1.5 bg-white/8 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-brand-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  )
}

function getBand(score, total) {
  const pct = score / total
  if (pct >= 0.87) return { label: 'Strong B1', colour: 'text-success', emoji: '🏆' }
  if (pct >= 0.67) return { label: 'Solid B1', colour: 'text-amber-400', emoji: '💪' }
  return { label: 'Keep practising', colour: 'text-danger', emoji: '📚' }
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function IntroScreen({ testNumber, totalTests, questionCount, onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="flex flex-col items-center text-center px-4 py-8"
    >
      <div className="w-20 h-20 rounded-2xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center text-4xl mb-6">
        🇬🇧
      </div>

      <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
        Test {testNumber} of {totalTests}
      </div>
      <h1 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-clash)' }}>
        B1 English Practice Test {testNumber}
      </h1>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
        {questionCount} questions covering vocabulary, grammar and reading comprehension.
        Reading passages include a listen button.
      </p>

      <div className="grid grid-cols-3 gap-3 w-full max-w-xs mb-8">
        {[
          { val: questionCount, label: 'Questions' },
          { val: '~5 min', label: 'Estimated time' },
          { val: '75%', label: 'Pass mark' },
        ].map(s => (
          <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-mono)' }}>{s.val}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="w-full max-w-xs bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-2xl transition-all active:scale-95"
      >
        Start Test {testNumber}
      </button>

      <Link href="/b1-practice" className="mt-4 text-sm text-slate-500 hover:text-slate-300 transition-colors">
        ← All practice tests
      </Link>
    </motion.div>
  )
}

function QuestionScreen({ question, questionIndex, total, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const colours = SECTION_COLOURS[question.section] || SECTION_COLOURS.Vocabulary

  function handleSelect(idx) {
    if (confirmed) return
    setSelected(idx)
  }

  function handleConfirm() {
    if (selected === null || confirmed) return
    setConfirmed(true)
  }

  function handleNext() {
    onAnswer(selected === question.answer)
    setSelected(null)
    setConfirmed(false)
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25 }}
    >
      {/* Progress */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>{questionIndex + 1} / {total}</span>
          <span className={clsx('font-semibold', colours.text)}>{question.section}</span>
        </div>
        <QuizProgressBar current={questionIndex + 1} total={total} />
      </div>

      {/* Reading passage */}
      {question.passage && (
        <div className={clsx('mx-4 mb-4 rounded-xl p-4 border', colours.bg, colours.border)}>
          <div className="flex items-center justify-between mb-2.5">
            <span className={clsx('text-xs font-semibold uppercase tracking-wider', colours.text)}>
              Read this passage
            </span>
            <PassageAudioButton text={question.passage} />
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{question.passage}</p>
        </div>
      )}

      {/* Question */}
      <div className="px-4 mb-5">
        <p className="text-white font-semibold text-base leading-relaxed">{question.q}</p>
      </div>

      {/* Options */}
      <div className="px-4 space-y-3 mb-5">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.answer
          const isSelected = i === selected
          let optClass = 'bg-[#1a1e33] border-white/10 text-slate-300'
          if (confirmed) {
            if (isCorrect) optClass = 'bg-success/15 border-success/50 text-white'
            else if (isSelected && !isCorrect) optClass = 'bg-danger/15 border-danger/50 text-white'
          } else if (isSelected) {
            optClass = 'bg-brand-500/15 border-brand-500/50 text-white'
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={confirmed}
              className={clsx(
                'w-full text-left p-4 rounded-xl border transition-all text-sm leading-relaxed',
                optClass,
                !confirmed && !isSelected && 'hover:bg-white/5 hover:border-white/20',
                !confirmed && 'active:scale-[0.99]'
              )}
            >
              <span className="font-mono text-xs mr-2 opacity-50">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          )
        })}
      </div>

      {/* Explanation (shown after confirm) */}
      <AnimatePresence>
        {confirmed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mx-4 mb-5 bg-[#131629] border border-white/8 rounded-xl p-4"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Explanation</p>
            <p className="text-sm text-slate-300 leading-relaxed">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action button */}
      <div className="px-4 pb-6">
        {!confirmed ? (
          <button
            onClick={handleConfirm}
            disabled={selected === null}
            className={clsx(
              'w-full py-4 rounded-2xl font-bold text-sm transition-all',
              selected !== null
                ? 'bg-brand-500 hover:bg-brand-600 text-white active:scale-95'
                : 'bg-white/5 text-slate-600 cursor-not-allowed'
            )}
          >
            Confirm answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl font-bold text-sm bg-brand-500 hover:bg-brand-600 text-white transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {questionIndex + 1 < total ? (
              <>Next question <ChevronRight size={16} /></>
            ) : (
              <>See results <Trophy size={16} /></>
            )}
          </button>
        )}
      </div>
    </motion.div>
  )
}

function ResultsScreen({ score, total, testNumber, totalTests, onRetry }) {
  const band = getBand(score, total)
  const pct = Math.round((score / total) * 100)
  const nextTest = testNumber < totalTests ? testNumber + 1 : 1
  const nextLabel = testNumber < totalTests ? `Try Test ${nextTest}` : 'Back to Test 1'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center px-4 py-8"
    >
      <div className="text-5xl mb-4">{band.emoji}</div>
      <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-clash)' }}>
        {band.label}
      </h2>
      <p className={clsx('text-sm font-semibold mb-6', band.colour)}>
        {score} / {total} correct ({pct}%)
      </p>

      {/* Score ring */}
      <div className="relative w-32 h-32 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1e33" strokeWidth="3" />
          <circle
            cx="18" cy="18" r="15.9" fill="none"
            stroke={pct >= 75 ? '#22d07a' : pct >= 50 ? '#f59e0b' : '#ff4d6d'}
            strokeWidth="3"
            strokeDasharray={`${pct} ${100 - pct}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-mono)' }}>{pct}%</span>
          <span className="text-xs text-slate-500">score</span>
        </div>
      </div>

      {/* Feedback */}
      <div className="w-full max-w-xs bg-[#131629] border border-white/8 rounded-2xl p-5 mb-6 text-left">
        {pct >= 75 ? (
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">You&apos;re at B1 level.</strong> You&apos;re ready to book an approved test like IELTS Life Skills or SELT.
            Remember to book at an approved test centre.
          </p>
        ) : pct >= 50 ? (
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">Nearly there.</strong> Review the questions you got wrong and try another test.
            Focus on the section where you dropped most points.
          </p>
        ) : (
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">Keep practising.</strong> Try all four tests and read the explanations carefully.
            Each test covers different grammar structures.
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="w-full max-w-xs space-y-3">
        <Link
          href={`/b1-practice/${nextTest}`}
          className="block w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-2xl transition-all text-center active:scale-95"
        >
          {nextLabel} →
        </Link>
        <button
          onClick={onRetry}
          className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 font-semibold py-3 rounded-2xl transition-all text-sm"
        >
          <RotateCcw size={14} />
          Retry Test {testNumber}
        </button>
        <Link
          href="/b1-check"
          className="block w-full text-center text-sm text-slate-500 hover:text-slate-300 transition-colors py-2"
        >
          Take the full B1 level check
        </Link>
      </div>

      {/* Internal links */}
      <div className="mt-8 pt-6 border-t border-white/8 w-full max-w-xs text-center space-y-2">
        <p className="text-xs text-slate-600 mb-3">Also useful</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { href: '/cheat-sheet', label: 'Life in the UK cheat sheet' },
            { href: '/faq', label: 'Test FAQ' },
            { href: '/b1-practice', label: 'All practice tests' },
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-brand-400 hover:text-brand-300 underline underline-offset-2 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function B1PracticeClient({ questions, testNumber, totalTests }) {
  const [screen, setScreen] = useState('intro')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)

  const handleAnswer = useCallback((correct) => {
    if (correct) setScore(s => s + 1)
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(i => i + 1)
    } else {
      setScreen('results')
    }
  }, [questionIndex, questions.length])

  const handleRetry = useCallback(() => {
    setScreen('intro')
    setQuestionIndex(0)
    setScore(0)
  }, [])

  const handleStart = useCallback(() => {
    setQuestionIndex(0)
    setScore(0)
    setScreen('quiz')
  }, [])

  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      {/* Thin top bar showing test number */}
      <div className="bg-[#131629] border-b border-white/5 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/b1-practice" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← All tests
          </Link>
          <span className="text-xs font-semibold text-slate-400">
            B1 Practice · Test {testNumber}
          </span>
          <span className="text-xs text-slate-600">
            {questions.length} questions
          </span>
        </div>
      </div>

      <div className="max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {screen === 'intro' && (
            <IntroScreen
              key="intro"
              testNumber={testNumber}
              totalTests={totalTests}
              questionCount={questions.length}
              onStart={handleStart}
            />
          )}
          {screen === 'quiz' && (
            <QuestionScreen
              key={`q-${questionIndex}`}
              question={questions[questionIndex]}
              questionIndex={questionIndex}
              total={questions.length}
              onAnswer={handleAnswer}
            />
          )}
          {screen === 'results' && (
            <ResultsScreen
              key="results"
              score={score}
              total={questions.length}
              testNumber={testNumber}
              totalTests={totalTests}
              onRetry={handleRetry}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
