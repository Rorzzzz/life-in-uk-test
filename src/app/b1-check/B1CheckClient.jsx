'use client'

import { useState, useRef, useEffect } from 'react'
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
  BookOpen,
  FileText,
  GraduationCap,
  HelpCircle,
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

const SECTION_COLOURS = {
  Vocabulary: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Grammar:    'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Reading:    'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
}

function getBand(score, total) {
  const pct = score / total
  if (pct >= 0.87) return {
    label: 'Strong B1 level', sub: 'You are likely ready to book an official test.',
    colour: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30',
  }
  if (pct >= 0.67) return {
    label: 'Almost there', sub: 'A little more practice before booking is recommended.',
    colour: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30',
  }
  return {
    label: 'Keep practising', sub: 'More preparation will help before you book.',
    colour: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30',
  }
}

// ─── Progress bar ──────────────────────────────────────────────────────────────
function QuizProgressBar({ current, total }) {
  return (
    <div
      role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}
      aria-label={`Question ${current} of ${total}`}
      className="w-full bg-border rounded-full overflow-hidden" style={{ height: 6 }}
    >
      <div
        className="h-full rounded-full bg-brand-500 transition-all duration-500 ease-out"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  )
}

// ─── Select screen (clean landing, with SEO content below) ────────────────────
function SelectScreen({ onSelect }) {
  return (
    <div>
      {/* Quiz selector */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-display font-bold text-ink mb-2">
            B1 English Level Check
          </h2>
          <p className="text-ink-muted text-sm leading-relaxed max-w-sm mx-auto">
            Four free quizzes — 15 questions each. Choose one to start.
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
                <div className={clsx(
                  'w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 font-display font-bold text-xl',
                  quiz.numStyle
                )}>
                  {quiz.number}
                </div>
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
                <ArrowRight size={18} className="text-ink-muted group-hover:text-brand-400 transition-colors flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3 mb-8">
          <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-ink-muted leading-relaxed">
            <span className="font-semibold text-amber-400">Practice tool only.</span>{' '}
            These quizzes are not official B1 tests and cannot be used for visa applications.
          </p>
        </div>
      </div>

      {/* SEO content — only shown on select screen */}
      <div className="max-w-2xl mx-auto px-4 pb-10 border-t border-border pt-8">

        <h2 className="text-lg font-display font-bold text-ink mb-3">
          Why do you need a B1 English test for ILR?
        </h2>
        <p className="text-base text-ink leading-relaxed mb-3">
          Most ILR applicants must prove they can speak and listen in English at B1 level on the Common
          European Framework of Reference (CEFR). This is a legal requirement — you cannot submit your ILR
          application without meeting it unless you are exempt.
        </p>
        <p className="text-base text-ink leading-relaxed mb-4">
          Accepted tests include Trinity GESE Grade 5, IELTS Life Skills B1, and LANGUAGECERT B1. Skilled
          Worker visa holders are generally exempt because they proved English at visa stage. Certain
          nationalities are also exempt — including Australia, Canada, USA and New Zealand.
        </p>

        <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
          What does B1 English level mean?
        </h2>
        <p className="text-base text-ink leading-relaxed mb-3">
          B1 is the intermediate level on the CEFR scale. At B1 you can understand the main points of clear
          speech on familiar topics, manage most everyday situations in English, and describe your own
          experiences and plans. For UKVI, the focus is on <strong>speaking and listening only</strong> —
          not writing.
        </p>

        <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
          Practising for Trinity GESE, IELTS Life Skills or LANGUAGECERT B1
        </h2>
        <ul className="text-sm text-ink-muted leading-relaxed space-y-2 mb-4 list-disc list-inside">
          <li><strong className="text-ink">Trinity GESE Grade 5</strong> — a spoken conversation with an examiner, taken in person at a Trinity centre.</li>
          <li><strong className="text-ink">IELTS Life Skills B1</strong> — speaking and listening, taken in person at British Council or IDP centres.</li>
          <li><strong className="text-ink">LANGUAGECERT B1</strong> — can be taken online from home via a proctored video exam.</li>
        </ul>

        <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
          Frequently asked questions
        </h2>

        <h3 className="text-sm font-bold text-ink mb-1">Has the B1 English requirement changed in 2026?</h3>
        <p className="text-sm text-ink-muted leading-relaxed mb-4">
          Yes — but only for new Skilled Worker visas (now B2 from 8 Jan 2026). ILR applications still
          require B1 until 26 March 2027. British citizenship remains B1 and is not currently changing.
          Use our{' '}
          <Link href="/ilr-risk-check" className="text-brand underline">ILR risk checker</Link>{' '}
          to confirm your specific deadline.
        </p>

        <h3 className="text-sm font-bold text-ink mb-1">Can I be exempt from the B1 English requirement?</h3>
        <p className="text-sm text-ink-muted leading-relaxed mb-4">
          Possibly. Exemptions apply if you hold a Skilled Worker / Tier 2 visa, are a national of an
          exempt country, are aged 65+, or have a qualifying long-term condition. Check our{' '}
          <Link href="/test-exempt" className="text-brand underline">exemption checker</Link>{' '}
          for a quick answer.
        </p>

        <h3 className="text-sm font-bold text-ink mb-1">Is the B1 test the same as the Life in the UK test?</h3>
        <p className="text-sm text-ink-muted leading-relaxed mb-4">
          No — they are two completely separate requirements. The B1 English test proves speaking and
          listening ability. The Life in the UK test is a multiple-choice knowledge test on British history
          and society. Most adult applicants must pass both.{' '}
          <Link href="/articles/is-the-life-in-the-uk-test-an-english-test" className="text-brand underline">
            Read more about the difference
          </Link>.
        </p>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm font-bold text-ink mb-3">Related guides and tools</p>
          <ul className="text-sm text-ink-muted space-y-1.5">
            <li><Link href="/articles/do-i-need-a-b1-english-test-for-ilr" className="text-brand underline">Do I need a B1 English test for ILR? — full guide</Link></li>
            <li><Link href="/articles/b1-english-test-practice" className="text-brand underline">B1 English test practice: 60 free questions for ILR 2026</Link></li>
            <li><Link href="/articles/british-citizenship-requirements-2026" className="text-brand underline">British citizenship requirements 2026</Link></li>
            <li><Link href="/test-exempt" className="text-brand underline">Life in the UK test exemption checker</Link></li>
            <li><Link href="/practice" className="text-brand underline">Life in the UK test — free practice questions</Link></li>
          </ul>
          <p className="text-xs text-ink-muted mt-6">Last reviewed: September 2026 — based on GOV.UK guidance.</p>
        </div>
      </div>
    </div>
  )
}

// ─── Quiz screen (clean, no surrounding content) ───────────────────────────────
function QuestionScreen({ question, questionIndex, total, quizNumber, onAnswer, selectedAnswer, revealed, onNext, firstBtnRef }) {
  const meta          = QUIZ_META.find(m => m.number === quizNumber)
  const sectionColour = SECTION_COLOURS[question.section] ?? 'bg-raised text-ink-muted border-border'

  return (
    <motion.div
      key={`q-${question.id}`}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.22 }}
      className="max-w-lg mx-auto px-4 pt-4 pb-10"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full border', sectionColour)}>
          {question.section}
        </span>
        <span className="text-xs text-ink-muted">
          <span className="font-semibold text-ink">{meta?.label}</span>
          {' · '}
          <span className="font-mono">{questionIndex + 1}/{total}</span>
        </span>
      </div>

      <div className="mb-4">
        <QuizProgressBar current={questionIndex + 1} total={total} />
      </div>

      {/* Reading passage */}
      {question.section === 'Reading' && question.passage && (
        <div className="mb-4 p-4 bg-raised rounded-xl border border-border">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">Read this passage</p>
          <p className="text-sm text-ink leading-relaxed">{question.passage}</p>
        </div>
      )}

      {/* Question */}
      <p className="text-base font-semibold text-ink leading-snug mb-4">{question.q}</p>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {question.options.map((opt, i) => {
          const isCorrect  = i === question.answer
          const isSelected = i === selectedAnswer
          let optionStyle = 'border-border bg-raised text-ink hover:border-brand-400'
          if (revealed) {
            if (isCorrect)                optionStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
            else if (isSelected)          optionStyle = 'border-red-500    bg-red-500/10    text-red-400'
            else                          optionStyle = 'border-border     bg-raised        text-ink-muted opacity-50'
          } else if (isSelected) {
            optionStyle = 'border-brand-500 bg-brand-900 text-brand-400'
          }

          return (
            <button
              key={i}
              ref={i === 0 ? firstBtnRef : null}
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
                  (!revealed || (!isCorrect && !isSelected)) ? 'bg-raised border-border text-ink-muted' : '',
                )}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm leading-snug">{opt}</span>
                {revealed && isCorrect   && <CheckCircle2 size={16} className="text-emerald-400 ml-auto flex-shrink-0" />}
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

      {/* Next / results button */}
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
  const band         = getBand(score, total)
  const otherQuizzes = QUIZ_META.filter(m => m.number !== quizNumber)

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-lg mx-auto px-4 pt-6 pb-12"
    >
      {/* Score */}
      <div className={clsx('rounded-2xl border p-6 text-center mb-5', band.bg)}>
        <p className="text-5xl font-display font-bold text-ink mb-1">
          {score}<span className="text-2xl text-ink-muted">/{total}</span>
        </p>
        <p className={clsx('text-lg font-semibold mt-2', band.colour)}>{band.label}</p>
        <p className="text-ink-muted text-sm mt-1">{band.sub}</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-5 flex items-start gap-3">
        <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-ink-muted leading-relaxed">
          <span className="font-semibold text-amber-400">Practice tool only.</span>{' '}
          This quiz cannot be used for visa applications — book with an approved UKVI provider.
        </p>
      </div>

      {/* Try other quizzes */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-5">
        <h2 className="text-sm font-semibold text-ink mb-3">Try the other quizzes</h2>
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
                <p className="text-sm font-medium text-ink group-hover:text-brand-400 transition-colors">{quiz.label}</p>
                <p className="text-xs text-ink-muted truncate">{quiz.focus}</p>
              </div>
              <ArrowRight size={14} className="text-ink-muted group-hover:text-brand-400 flex-shrink-0 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Keep exploring — site retention links */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-5">
        <h2 className="text-sm font-semibold text-ink mb-3">Also worth doing next</h2>
        <div className="space-y-2">
          {[
            { href: '/practice', icon: BookOpen, label: 'Practice the Life in the UK test', sub: 'Free adaptive questions, chapter by chapter' },
            { href: '/exam', icon: GraduationCap, label: 'Take a full mock exam', sub: '24 questions, 45-minute timer — just like the real thing' },
            { href: '/cheat-sheet', icon: FileText, label: 'Download the cheat sheet', sub: 'Key dates, names and facts on one printable page' },
            { href: '/faq', icon: HelpCircle, label: 'Life in the UK test FAQ', sub: 'Common questions about the test and citizenship process' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-xl border border-border bg-raised hover:border-brand-400 transition-colors group min-h-[44px]"
            >
              <item.icon size={16} className="text-ink-muted group-hover:text-brand-400 transition-colors flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink group-hover:text-brand-400 transition-colors">{item.label}</p>
                <p className="text-xs text-ink-muted">{item.sub}</p>
              </div>
              <ArrowRight size={14} className="text-ink-muted group-hover:text-brand-400 flex-shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Approved providers */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-5">
        <h2 className="text-sm font-semibold text-ink mb-3">Book an official B1 test</h2>
        <div className="space-y-2">
          {[
            { name: 'Trinity College London', note: 'In-person', href: 'https://www.trinitycollege.com/qualifications/GESE/SELT' },
            { name: 'LANGUAGECERT',           note: 'Available online from home', href: 'https://www.languagecert.org/en/selt' },
            { name: 'IELTS Life Skills',      note: 'In-person', href: 'https://www.ielts.org/about-ielts/ielts-for-uk-visas-and-immigration' },
          ].map(provider => (
            <a
              key={provider.name}
              href={provider.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border bg-raised hover:border-brand-400 transition-colors group min-h-[44px]"
            >
              <div>
                <p className="text-sm font-medium text-ink group-hover:text-brand-400 transition-colors">{provider.name}</p>
                <p className="text-xs text-ink-muted">{provider.note}</p>
              </div>
              <ExternalLink size={14} className="text-ink-muted flex-shrink-0 group-hover:text-brand-400 transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Retry / back */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={onRetry}
          className="w-full py-4 rounded-2xl border border-border bg-raised hover:border-brand-400 active:opacity-70 text-ink font-semibold text-base transition-colors flex items-center justify-center gap-2"
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
export default function B1CheckClient({ header, footer }) {
  const [screen,         setScreen]         = useState('select')
  const [quizNumber,     setQuizNumber]     = useState(null)
  const [questionIndex,  setQuestionIndex]  = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [revealed,       setRevealed]       = useState(false)
  const [score,          setScore]          = useState(0)

  const topRef      = useRef(null)   // scroll target — top of quiz panel
  const firstBtnRef = useRef(null)   // auto-focus — first answer button

  const questions = quizNumber ? B1_PRACTICE_TESTS[quizNumber] : []
  const total     = questions.length
  const question  = questions[questionIndex]

  // Scroll to top + focus first button whenever screen or question changes
  useEffect(() => {
    if (screen === 'quiz' || screen === 'results') {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [screen, questionIndex])

  useEffect(() => {
    if (screen === 'quiz' && !revealed) {
      // Small delay so Framer Motion animation completes before focusing
      const t = setTimeout(() => firstBtnRef.current?.focus(), 300)
      return () => clearTimeout(t)
    }
  }, [screen, questionIndex, revealed])

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
    if (optionIndex === question.answer) setScore(s => s + 1)
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

  function handleChooseQuiz(num) {
    if (num === null) {
      setScreen('select')
      setQuizNumber(null)
    } else {
      startQuiz(num)
    }
  }

  return (
    <div>
      {/* Header + footer only shown on the select screen */}
      {screen === 'select' && header}

      {/* Scroll anchor — sits just above the quiz */}
      <div ref={topRef} style={{ scrollMarginTop: '64px' }} />

      <AnimatePresence mode="wait">
        {screen === 'select' && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SelectScreen onSelect={startQuiz} />
          </motion.div>
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
            firstBtnRef={firstBtnRef}
          />
        )}

        {screen === 'results' && (
          <ResultsScreen
            key="results"
            score={score}
            total={total}
            quizNumber={quizNumber}
            onRetry={() => startQuiz(quizNumber)}
            onChooseQuiz={handleChooseQuiz}
          />
        )}
      </AnimatePresence>

      {/* Footer (RelatedTools) only shown on the select screen */}
      {screen === 'select' && footer}
    </div>
  )
}
