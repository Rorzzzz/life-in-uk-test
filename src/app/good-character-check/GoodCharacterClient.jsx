'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  ChevronRight,
  RotateCcw,
  ArrowRight,
  Info,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react'

// ─── Questions ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 'q1',
    question: 'Have you ever been convicted of a criminal offence — in the UK or any other country?',
    options: [
      { value: 'none', label: 'No' },
      { value: 'minor', label: 'Yes — a minor offence (caution, fixed penalty, minor conviction)' },
      { value: 'serious', label: 'Yes — a more serious offence' },
    ],
  },
  {
    id: 'q2',
    question: 'Have you ever overstayed a visa or breached immigration conditions in the UK or any other country?',
    options: [
      { value: 'none', label: 'No' },
      { value: 'minor', label: 'Yes — briefly or accidentally (less than 28 days)' },
      { value: 'serious', label: 'Yes — significantly (28 days or more)' },
    ],
  },
  {
    id: 'q3',
    question: 'Have you ever been deported, removed, or refused entry to the UK or any other country?',
    options: [
      { value: 'none', label: 'No' },
      { value: 'serious', label: 'Yes' },
    ],
  },
  {
    id: 'q4',
    question: 'Have you ever provided false or misleading information on any immigration application?',
    options: [
      { value: 'none', label: 'No' },
      { value: 'serious', label: 'Yes' },
    ],
  },
  {
    id: 'q5',
    question: 'Do you have any outstanding civil penalties from UKVI (for example, for illegal working)?',
    options: [
      { value: 'none', label: 'No' },
      { value: 'serious', label: 'Yes' },
    ],
  },
  {
    id: 'q6',
    question: 'Are your tax and National Insurance affairs up to date?',
    options: [
      { value: 'none', label: 'Yes, fully up to date' },
      { value: 'minor', label: 'I have minor issues I am aware of' },
      { value: 'serious', label: 'I have significant issues or I am unsure' },
    ],
  },
]

// ─── Result logic ──────────────────────────────────────────────────────────────
function getResult(answers) {
  const values = Object.values(answers)
  if (values.some(v => v === 'serious')) return 'red'
  if (values.some(v => v === 'minor')) return 'amber'
  return 'green'
}

// ─── Disclaimer ───────────────────────────────────────────────────────────────
function Disclaimer() {
  return (
    <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-ink-muted leading-relaxed">
      <Info size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
      <span>
        This tool is a guide only. It cannot provide legal advice. Always seek professional advice if you have any concerns about your immigration history.
      </span>
    </div>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step, total }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'h-1.5 flex-1 rounded-full transition-colors',
            i < step ? 'bg-brand-500' : 'bg-raised'
          )}
        />
      ))}
      <span className="text-xs text-ink-muted font-mono ml-1">{step}/{total}</span>
    </div>
  )
}

// ─── Question step ────────────────────────────────────────────────────────────
function QuestionStep({ q, stepNum, total, onAnswer }) {
  return (
    <motion.div
      key={q.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.22 }}
      className="space-y-4"
    >
      <ProgressBar step={stepNum} total={total} />
      <h2 className="text-lg font-display font-bold text-ink">{q.question}</h2>
      <div className="space-y-2">
        {q.options.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onAnswer(q.id, opt.value)}
            className={clsx(
              'w-full text-left px-4 py-3.5 rounded-xl border border-border bg-raised',
              'hover:border-brand-400 hover:bg-brand-900 transition-colors',
              'text-sm text-ink font-medium min-h-[44px]',
              'flex items-center justify-between gap-3'
            )}
          >
            <span>{opt.label}</span>
            <ChevronRight size={16} className="text-ink-muted flex-shrink-0" />
          </button>
        ))}
      </div>
      <Disclaimer />
    </motion.div>
  )
}

// ─── Result card ──────────────────────────────────────────────────────────────
function ResultCard({ level, onRestart }) {
  const config = {
    green: {
      icon: ShieldCheck,
      iconClass: 'text-success',
      bgClass: 'bg-success/10 border-success/30',
      heading: 'No immediate concerns identified',
      body: 'No immediate concerns identified from your answers. The good character requirement covers a wide range of factors. Always declare everything honestly on your application — concealing information is taken seriously by UKVI.',
      badge: 'LOW CONCERN',
      badgeClass: 'bg-success/10 text-success',
    },
    amber: {
      icon: ShieldAlert,
      iconClass: 'text-amber-400',
      bgClass: 'bg-amber-500/10 border-amber-500/30',
      heading: 'Some factors to consider',
      body: 'Some factors in your history may need careful consideration. Minor issues do not automatically disqualify you, but how they are presented matters. We recommend reading the official GOV.UK guidance and considering professional immigration advice before applying.',
      badge: 'REVIEW RECOMMENDED',
      badgeClass: 'bg-amber-500/10 text-amber-400',
    },
    red: {
      icon: ShieldX,
      iconClass: 'text-danger',
      bgClass: 'bg-danger/10 border-danger/30',
      heading: 'Significant factors identified',
      body: 'One or more significant factors have been identified. These do not automatically result in refusal, but they are seriously considered by UKVI. We strongly recommend professional immigration advice from an OISC-registered adviser before submitting your application.',
      badge: 'SEEK ADVICE',
      badgeClass: 'bg-danger/10 text-danger',
    },
  }

  const c = config[level]
  const Icon = c.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Result banner */}
      <div className={clsx('rounded-2xl border p-5', c.bgClass)}>
        <div className="flex items-start gap-3">
          <Icon size={28} className={clsx(c.iconClass, 'flex-shrink-0 mt-0.5')} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <p className="font-display font-bold text-xl text-ink">{c.heading}</p>
              <span className={clsx('text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider', c.badgeClass)}>
                {c.badge}
              </span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">{c.body}</p>
          </div>
        </div>
      </div>

      {/* OISC link for amber/red */}
      {(level === 'amber' || level === 'red') && (
        <a
          href="https://www.gov.uk/find-an-immigration-adviser"
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            'flex items-center justify-between gap-3 p-3 rounded-xl border',
            'bg-raised border-border hover:border-brand-400 transition-colors group min-h-[44px]'
          )}
        >
          <span className="text-sm text-ink group-hover:text-brand-400 transition-colors">
            Find an OISC-registered immigration adviser — GOV.UK
          </span>
          <ExternalLink size={15} className="text-ink-muted flex-shrink-0 group-hover:text-brand-400 transition-colors" />
        </a>
      )}

      {/* Related links */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h2 className="text-base font-display font-bold text-ink mb-3">Useful guides</h2>
        <div className="space-y-2">
          {[
            { href: '/articles/good-character-requirement-ilr-citizenship', label: 'Good character requirement — full guide' },
            { href: '/articles/british-citizenship-requirements-2026', label: 'British citizenship requirements 2026' },
            { href: '/practice', label: 'Practice the Life in the UK test — free' },
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

      <Disclaimer />

      <button
        type="button"
        onClick={onRestart}
        className={clsx(
          'flex items-center gap-2 justify-center w-full py-3 rounded-xl border border-border',
          'text-sm text-ink-muted hover:text-ink hover:bg-raised transition-colors min-h-[44px]'
        )}
      >
        <RotateCcw size={15} />
        Start again
      </button>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function GoodCharacterClient() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const TOTAL = QUESTIONS.length

  function handleAnswer(qId, value) {
    const newAnswers = { ...answers, [qId]: value }
    setAnswers(newAnswers)

    const nextStep = step + 1
    if (nextStep >= TOTAL) {
      setResult(getResult(newAnswers))
    } else {
      setStep(nextStep)
    }
  }

  function restart() {
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle size={18} className="text-amber-400" />
          <span className="text-xs text-ink-muted font-medium uppercase tracking-wider">Immigration Tool</span>
        </div>
        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          Good Character Checker
        </h1>
        <p className="text-ink-muted text-sm leading-relaxed">
          Answer 6 questions to get a clear, colour-coded assessment of whether your history
          might affect the good character requirement for ILR or British citizenship. Takes about
          60 seconds.
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5">
        <AnimatePresence mode="wait">
          {result ? (
            <ResultCard key="result" level={result} onRestart={restart} />
          ) : (
            <QuestionStep
              key={`q-${step}`}
              q={QUESTIONS[step]}
              stepNum={step + 1}
              total={TOTAL}
              onAnswer={handleAnswer}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
