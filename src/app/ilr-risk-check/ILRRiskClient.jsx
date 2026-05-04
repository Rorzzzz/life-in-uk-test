'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Info,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  ExternalLink,
} from 'lucide-react'

// ─── Questions ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 'absences',
    label: 'Absence rule',
    question: 'Have you stayed within the 180-day absence limit in every 12-month period of your qualifying period?',
    note: '180 days outside the UK in any single 12-month rolling period is the maximum allowed.',
    options: [
      { value: 'green', label: 'Yes' },
      { value: 'red',   label: 'No' },
      { value: 'amber', label: 'Not sure' },
    ],
  },
  {
    id: 'lituk',
    label: 'Life in the UK test',
    question: 'Have you passed the Life in the UK test?',
    note: 'You must pass before submitting your ILR application.',
    options: [
      { value: 'green', label: 'Yes' },
      { value: 'red',   label: 'No' },
    ],
  },
  {
    id: 'english',
    label: 'English language',
    question: 'Do you meet the English language requirement?',
    note: 'Most applicants need a B1 English certificate unless exempt.',
    options: [
      { value: 'green', label: 'Yes — I have a certificate or I am exempt' },
      { value: 'red',   label: 'No — I have not met the requirement yet' },
    ],
  },
  {
    id: 'residence',
    label: 'Continuous lawful residence',
    question: 'Have you maintained continuous lawful residence throughout your qualifying period — with no gaps in permission to stay?',
    note: 'Any period of unlawful residence can reset your qualifying period.',
    options: [
      { value: 'green', label: 'Yes' },
      { value: 'red',   label: 'No — there have been gaps' },
      { value: 'amber', label: 'Not sure' },
    ],
  },
  {
    id: 'sponsor',
    label: 'Sponsorship (Skilled Worker)',
    question: 'For Skilled Worker applicants: Have you remained with your sponsoring employer or changed employer with a new Certificate of Sponsorship throughout?',
    note: null,
    options: [
      { value: 'green', label: 'Yes' },
      { value: 'amber', label: 'I changed employer without a new CoS' },
      { value: 'green', label: 'Not applicable — I am not a Skilled Worker applicant' },
    ],
  },
  {
    id: 'travelHistory',
    label: 'Travel history records',
    question: 'Do you have your full travel history — every trip outside the UK with departure and return dates?',
    note: 'UKVI checks your travel history carefully. Gaps or errors can cause delays or refusal.',
    options: [
      { value: 'green', label: 'Yes — complete records' },
      { value: 'amber', label: 'Mostly, with some gaps' },
      { value: 'red',   label: 'No — I do not have a full record' },
    ],
  },
  {
    id: 'documents',
    label: 'Financial documents',
    question: 'Do you have all financial evidence ready — payslips, P60s, bank statements, employer letter?',
    note: null,
    options: [
      { value: 'green', label: 'Yes — all in order' },
      { value: 'amber', label: 'Partially — some gaps to fill' },
      { value: 'red',   label: 'No — not yet gathered' },
    ],
  },
  {
    id: 'character',
    label: 'Good character',
    question: 'Is your good character history clean — no criminal convictions, immigration violations, or outstanding civil penalties?',
    note: null,
    options: [
      { value: 'green', label: 'Yes — clean history' },
      { value: 'amber', label: 'Minor issues' },
      { value: 'red',   label: 'Significant issues' },
    ],
  },
  {
    id: 'biometric',
    label: 'Biometric appointment',
    question: 'Have you completed a biometric enrolment appointment booking (or are you ready to book)?',
    note: null,
    options: [
      { value: 'green', label: 'Yes — booked or completed' },
      { value: 'amber', label: 'Not yet — will book soon' },
      { value: 'red',   label: 'No — not started' },
    ],
  },
]

// ─── Risk level ───────────────────────────────────────────────────────────────
function getRiskLevel(answers) {
  const vals = Object.values(answers)
  if (vals.some(v => v === 'red')) return 'red'
  if (vals.some(v => v === 'amber')) return 'amber'
  return 'green'
}

// ─── Colour helpers ───────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  green: {
    icon: CheckCircle2,
    iconClass: 'text-success',
    rowClass: 'bg-success/5 border-success/20',
    badgeClass: 'bg-success/10 text-success',
    badge: 'OK',
  },
  amber: {
    icon: AlertCircle,
    iconClass: 'text-amber-400',
    rowClass: 'bg-amber-500/5 border-amber-500/20',
    badgeClass: 'bg-amber-500/10 text-amber-400',
    badge: 'REVIEW',
  },
  red: {
    icon: XCircle,
    iconClass: 'text-danger',
    rowClass: 'bg-danger/5 border-danger/20',
    badgeClass: 'bg-danger/10 text-danger',
    badge: 'ISSUE',
  },
}

const RISK_CONFIG = {
  green: {
    icon: ShieldCheck,
    iconClass: 'text-success',
    bannerClass: 'bg-success/10 border-success/30',
    heading: 'LOW RISK',
    body: 'Your application looks well-prepared. Double-check all documents before submitting.',
  },
  amber: {
    icon: ShieldAlert,
    iconClass: 'text-amber-400',
    bannerClass: 'bg-amber-500/10 border-amber-500/30',
    heading: 'MEDIUM RISK',
    body: 'A few areas need attention before you apply. Address the amber items to strengthen your application.',
  },
  red: {
    icon: ShieldX,
    iconClass: 'text-danger',
    bannerClass: 'bg-danger/10 border-danger/30',
    heading: 'HIGH RISK',
    body: 'One or more significant issues identified. Address these before applying or seek professional advice.',
  },
}

// ─── Related tool suggestions based on flagged issues ────────────────────────
function getRelatedTools(answers) {
  const tools = []
  if (answers.absences && answers.absences !== 'green') {
    tools.push({ href: '/absence-calculator', label: 'Check your absences — free absence calculator' })
  }
  if (answers.documents && answers.documents !== 'green') {
    tools.push({ href: '/ilr-checklist', label: 'ILR document checklist — personalised by visa type' })
  }
  if (answers.character && answers.character !== 'green') {
    tools.push({ href: '/good-character-check', label: 'Good character checker — full 6-question assessment' })
  }
  if (tools.length === 0) {
    tools.push({ href: '/ilr-checklist', label: 'ILR document checklist — make sure everything is ready' })
  }
  return tools
}

// ─── Disclaimer ───────────────────────────────────────────────────────────────
function Disclaimer() {
  return (
    <div className="flex items-start gap-2 p-3 bg-raised rounded-xl border border-border text-xs text-ink-muted leading-relaxed">
      <Info size={13} className="text-brand-400 flex-shrink-0 mt-0.5" />
      <span>
        This assessment is a guide only. Always verify your eligibility on GOV.UK before submitting your application.
      </span>
    </div>
  )
}

// ─── Single question row ──────────────────────────────────────────────────────
function QuestionRow({ q, answer, onChange, idx }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border p-4 space-y-3 transition-colors',
        answer ? STATUS_CONFIG[answer].rowClass : 'border-border bg-card'
      )}
    >
      {/* Question header */}
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-raised border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-[11px] font-mono font-bold text-ink-muted">{idx + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-ink leading-snug">{q.label}</p>
          <p className="text-sm text-ink-muted mt-0.5 leading-snug">{q.question}</p>
          {q.note && (
            <p className="text-xs text-ink-muted/70 mt-1 italic leading-snug">{q.note}</p>
          )}
        </div>
        {answer && (
          <span className={clsx(
            'text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider flex-shrink-0',
            STATUS_CONFIG[answer].badgeClass
          )}>
            {STATUS_CONFIG[answer].badge}
          </span>
        )}
      </div>

      {/* Options */}
      <div className="grid gap-1.5 pl-9">
        {q.options.map((opt, i) => {
          // De-duplicate options with the same label (N/A case)
          const uniqueKey = `${opt.label}-${i}`
          const isSelected = answer === opt.value && q.options.findIndex(o => o.value === answer) === i

          return (
            <button
              key={uniqueKey}
              type="button"
              onClick={() => onChange(q.id, opt.value)}
              className={clsx(
                'w-full text-left px-3 py-2.5 rounded-xl border transition-colors',
                'text-sm font-medium min-h-[44px] flex items-center gap-2',
                answer !== undefined && q.options.find(o => o.value === answer && o.label === opt.label)
                  ? opt.value === 'green'
                    ? 'border-success/40 bg-success/10 text-success'
                    : opt.value === 'amber'
                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                    : 'border-danger/40 bg-danger/10 text-danger'
                  : 'border-border bg-raised text-ink hover:border-brand-400 hover:bg-brand-900'
              )}
            >
              {answer !== undefined && q.options.find(o => o.value === answer && o.label === opt.label) ? (
                opt.value === 'green'
                  ? <CheckCircle2 size={14} className="flex-shrink-0" />
                  : opt.value === 'amber'
                  ? <AlertCircle size={14} className="flex-shrink-0" />
                  : <XCircle size={14} className="flex-shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-border flex-shrink-0" />
              )}
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Results panel ────────────────────────────────────────────────────────────
function ResultsPanel({ answers, onRestart }) {
  const risk = getRiskLevel(answers)
  const rc = RISK_CONFIG[risk]
  const RiskIcon = rc.icon
  const relatedTools = getRelatedTools(answers)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Overall risk */}
      <div className={clsx('rounded-2xl border p-5', rc.bannerClass)}>
        <div className="flex items-start gap-3">
          <RiskIcon size={28} className={clsx(rc.iconClass, 'flex-shrink-0 mt-0.5')} />
          <div>
            <p className="font-display font-bold text-xl text-ink mb-1">{rc.heading}</p>
            <p className="text-sm text-ink-muted leading-relaxed">{rc.body}</p>
          </div>
        </div>
      </div>

      {/* Result breakdown */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <p className="text-sm font-semibold text-ink">Your results breakdown</p>
        </div>
        {QUESTIONS.map(q => {
          const val = answers[q.id]
          if (!val) return null
          const sc = STATUS_CONFIG[val]
          const StatusIcon = sc.icon
          const chosenLabel = q.options.find(o => o.value === val)?.label ?? val
          return (
            <div
              key={q.id}
              className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0"
            >
              <StatusIcon size={16} className={clsx(sc.iconClass, 'flex-shrink-0')} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-ink">{q.label}</p>
                <p className="text-xs text-ink-muted leading-snug">{chosenLabel}</p>
              </div>
              <span className={clsx(
                'text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider flex-shrink-0',
                sc.badgeClass
              )}>
                {sc.badge}
              </span>
            </div>
          )
        })}
      </div>

      {/* Related tools */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h2 className="text-base font-display font-bold text-ink mb-3">Next steps</h2>
        <div className="space-y-2">
          {relatedTools.map(t => (
            <Link
              key={t.href}
              href={t.href}
              className={clsx(
                'flex items-center justify-between gap-3 p-3 rounded-xl border border-border',
                'bg-raised hover:border-brand-400 transition-colors group min-h-[44px]'
              )}
            >
              <span className="text-sm text-ink group-hover:text-brand-400 transition-colors">
                {t.label}
              </span>
              <ArrowRight size={16} className="text-ink-muted flex-shrink-0 group-hover:text-brand-400 transition-colors" />
            </Link>
          ))}
          <Link
            href="/articles/ilr-refusal-reasons-2026"
            className={clsx(
              'flex items-center justify-between gap-3 p-3 rounded-xl border border-border',
              'bg-raised hover:border-brand-400 transition-colors group min-h-[44px]'
            )}
          >
            <span className="text-sm text-ink group-hover:text-brand-400 transition-colors">
              ILR refusal reasons 2026 — full guide
            </span>
            <ArrowRight size={16} className="text-ink-muted flex-shrink-0 group-hover:text-brand-400 transition-colors" />
          </Link>
          <Link
            href="/practice"
            className={clsx(
              'flex items-center justify-between gap-3 p-3 rounded-xl border border-border',
              'bg-raised hover:border-brand-400 transition-colors group min-h-[44px]'
            )}
          >
            <span className="text-sm text-ink group-hover:text-brand-400 transition-colors">
              Practice the Life in the UK test — free
            </span>
            <ArrowRight size={16} className="text-ink-muted flex-shrink-0 group-hover:text-brand-400 transition-colors" />
          </Link>
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
export default function ILRRiskClient() {
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const answered = QUESTIONS.filter(q => answers[q.id] !== undefined).length
  const allAnswered = answered === QUESTIONS.length

  function handleChange(qId, value) {
    setAnswers(prev => ({ ...prev, [qId]: value }))
    setShowResults(false)
  }

  function handleShowResults() {
    setShowResults(true)
    // Scroll results into view after a tick
    setTimeout(() => {
      document.getElementById('ilr-risk-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  function restart() {
    setAnswers({})
    setShowResults(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert size={18} className="text-brand-400" />
          <span className="text-xs text-ink-muted font-medium uppercase tracking-wider">Immigration Tool</span>
        </div>
        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          ILR Refusal Risk Checker
        </h1>
        <p className="text-ink-muted text-sm leading-relaxed">
          Answer all 9 questions about your ILR situation. Results update as you answer — see
          which areas need attention before you apply.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="bg-card rounded-2xl border border-border p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-ink">{answered} of {QUESTIONS.length} answered</p>
          {allAnswered && (
            <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-lg font-medium">
              All answered
            </span>
          )}
        </div>
        <div className="h-2 bg-raised rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(answered / QUESTIONS.length) * 100}%`,
              backgroundColor: allAnswered ? '#22d07a' : '#3381ff',
            }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {QUESTIONS.map((q, idx) => (
          <QuestionRow
            key={q.id}
            q={q}
            answer={answers[q.id]}
            onChange={handleChange}
            idx={idx}
          />
        ))}
      </div>

      {/* Show results CTA */}
      {allAnswered && !showResults && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-4"
        >
          <button
            type="button"
            onClick={handleShowResults}
            className={clsx(
              'w-full py-4 rounded-2xl font-display font-bold text-base text-white',
              'bg-brand-500 hover:bg-brand-400 active:scale-[0.98] transition-all min-h-[44px]'
            )}
          >
            See my risk assessment →
          </button>
        </motion.div>
      )}

      {/* Results */}
      {showResults && (
        <div id="ilr-risk-results" className="mt-6">
          <ResultsPanel answers={answers} onRestart={restart} />
        </div>
      )}

      <div className="mt-4">
        <Disclaimer />
      </div>
    </div>
  )
}
