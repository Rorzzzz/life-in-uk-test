'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import {
  Calendar,
  Users,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Clock,
  PoundSterling,
  Info,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'

// ─── Visa route definitions ───────────────────────────────────────────────────
const VISA_TYPES = [
  {
    id: 'skilled-worker',
    label: 'Skilled Worker / Tier 2',
    years: 5,
    b1Exempt: true,
    note: 'English requirement already met at visa stage',
  },
  {
    id: 'family',
    label: 'Family visa (spouse / partner of British citizen)',
    years: 5,
    b1Exempt: false,
    note: null,
  },
  {
    id: 'ancestry',
    label: 'UK Ancestry',
    years: 5,
    b1Exempt: false,
    note: null,
  },
  {
    id: 'global-talent',
    label: 'Global Talent',
    years: 3,
    b1Exempt: false,
    note: 'Eligible after 3 years (not 5)',
  },
  {
    id: 'long-residence',
    label: 'Long Residence',
    years: 10,
    b1Exempt: false,
    note: '10 years continuous lawful residence required',
  },
  {
    id: 'other',
    label: 'Other / Not sure',
    years: 5,
    b1Exempt: false,
    note: 'Most routes require 5 years — check GOV.UK for your specific visa',
  },
]

// ─── Fee constants (April 2026) ───────────────────────────────────────────────
const FEES = {
  ilrAdult:     3226,
  ilrChild:     3226,
  biometric:    19.20,
  lifeInUkTest: 50,
  b1Test:       182, // midpoint of £150–£215 range
}

// ─── Stepper component ────────────────────────────────────────────────────────
function Stepper({ value, onChange, min = 0, max = 6, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-ink-muted flex-1">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={clsx(
            'w-11 h-11 rounded-xl flex items-center justify-center border border-border',
            'bg-raised text-ink transition-opacity',
            'active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
            value <= min && 'opacity-30 cursor-not-allowed'
          )}
        >
          <ChevronDown size={18} />
        </button>
        <span className="w-8 text-center font-mono font-semibold text-ink text-lg">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className={clsx(
            'w-11 h-11 rounded-xl flex items-center justify-center border border-border',
            'bg-raised text-ink transition-opacity',
            'active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
            value >= max && 'opacity-30 cursor-not-allowed'
          )}
        >
          <ChevronUp size={18} />
        </button>
      </div>
    </div>
  )
}

// ─── Format date helper ───────────────────────────────────────────────────────
function formatDate(date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function monthsDiff(from, to) {
  const years  = to.getFullYear() - from.getFullYear()
  const months = to.getMonth()    - from.getMonth()
  return years * 12 + months
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ILRCalculatorClient() {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  const [visaTypeId,      setVisaTypeId]      = useState('skilled-worker')
  const [entryDateStr,    setEntryDateStr]    = useState('')
  const [numAdults,       setNumAdults]       = useState(1)
  const [numChildren,     setNumChildren]     = useState(0)
  const [lifeTestPassed,  setLifeTestPassed]  = useState(false)
  const [b1Passed,        setB1Passed]        = useState(false)

  const visaType = VISA_TYPES.find(v => v.id === visaTypeId)

  // ─── Calculation ───────────────────────────────────────────────────────────
  const result = useMemo(() => {
    if (!entryDateStr) return null

    const entryDate = new Date(entryDateStr)
    if (isNaN(entryDate.getTime())) return null

    // Resolve visa type inside memo using only the primitive id
    const vt = VISA_TYPES.find(v => v.id === visaTypeId)

    // Eligibility date
    const eligDate = new Date(entryDate)
    eligDate.setFullYear(eligDate.getFullYear() + vt.years)

    const isEligible = eligDate <= today
    const diffMonths = monthsDiff(today, eligDate)
    const diffYears  = Math.floor(Math.abs(diffMonths) / 12)
    const remMonths  = Math.abs(diffMonths) % 12

    let timeLabel = ''
    if (!isEligible) {
      if (diffYears > 0 && remMonths > 0) timeLabel = `${diffYears} year${diffYears > 1 ? 's' : ''} and ${remMonths} month${remMonths > 1 ? 's' : ''}`
      else if (diffYears > 0)             timeLabel = `${diffYears} year${diffYears > 1 ? 's' : ''}`
      else                                timeLabel = `${remMonths} month${remMonths > 1 ? 's' : ''}`
    }

    // Cost breakdown
    const ilrAdults   = numAdults   * FEES.ilrAdult
    const ilrChildren = numChildren * FEES.ilrChild
    const biometrics  = (numAdults + numChildren) * FEES.biometric

    const lifeTestCost = (!lifeTestPassed) ? numAdults * FEES.lifeInUkTest : 0
    const b1TestCost   = (!vt.b1Exempt && !b1Passed) ? numAdults * FEES.b1Test : 0

    const total = ilrAdults + ilrChildren + biometrics + lifeTestCost + b1TestCost

    return {
      eligDate,
      isEligible,
      timeLabel,
      ilrAdults,
      ilrChildren,
      biometrics,
      lifeTestCost,
      b1TestCost,
      total,
      b1Exempt: vt.b1Exempt,
    }
  }, [entryDateStr, visaTypeId, numAdults, numChildren, lifeTestPassed, b1Passed])

  const fmt = (n) =>
    n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 })

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          ILR Eligibility &amp; Cost Calculator
        </h1>
        <p className="text-ink-muted text-sm leading-relaxed">
          Enter your details to find out when you can apply for Indefinite Leave to Remain and
          get an estimated breakdown of the total cost.
        </p>
      </div>

      {/* Form card */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-6 mb-6">

        {/* Visa type */}
        <fieldset>
          <legend className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
            <Users size={16} className="text-brand-400" />
            What is your visa type?
          </legend>
          <div className="grid gap-2">
            {VISA_TYPES.map(vt => (
              <label
                key={vt.id}
                className={clsx(
                  'flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                  'min-h-[44px]',
                  visaTypeId === vt.id
                    ? 'border-brand-500 bg-brand-900'
                    : 'border-border bg-raised hover:border-brand-400'
                )}
              >
                <input
                  type="radio"
                  name="visaType"
                  value={vt.id}
                  checked={visaTypeId === vt.id}
                  onChange={() => setVisaTypeId(vt.id)}
                  className="mt-0.5 accent-brand-500 w-4 h-4 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className={clsx(
                    'text-sm font-medium',
                    visaTypeId === vt.id ? 'text-brand-400' : 'text-ink'
                  )}>
                    {vt.label}
                  </span>
                  {vt.note && (
                    <p className="text-xs text-ink-muted mt-0.5">{vt.note}</p>
                  )}
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Entry date */}
        <div>
          <label
            htmlFor="entry-date"
            className="text-sm font-semibold text-ink mb-2 flex items-center gap-2"
          >
            <Calendar size={16} className="text-brand-400" />
            Date you entered the UK (or visa start date)
          </label>
          <input
            id="entry-date"
            type="date"
            max={todayStr}
            value={entryDateStr}
            onChange={e => setEntryDateStr(e.target.value)}
            className={clsx(
              'w-full h-11 px-3 rounded-xl border border-border bg-raised text-ink text-sm',
              'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
              'transition-colors'
            )}
          />
        </div>

        {/* Adults / children */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-ink flex items-center gap-2">
            <Users size={16} className="text-brand-400" />
            Number of applicants
          </p>
          <Stepper
            label="Adults (aged 18+)"
            value={numAdults}
            onChange={setNumAdults}
            min={1}
            max={6}
          />
          <Stepper
            label="Children (under 18)"
            value={numChildren}
            onChange={setNumChildren}
            min={0}
            max={4}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-ink">Tests already completed</p>

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={lifeTestPassed}
              onChange={e => setLifeTestPassed(e.target.checked)}
              className="w-5 h-5 rounded accent-brand-500 flex-shrink-0"
            />
            <span className="text-sm text-ink">
              Adults have already passed the Life in the UK test
              <span className="block text-xs text-ink-muted mt-0.5">
                Leave unchecked to include £50 per adult in the estimate
              </span>
            </span>
          </label>

          {/* B1 checkbox — hidden for Skilled Worker (already exempt) */}
          <AnimatePresence>
            {!visaType.b1Exempt && (
              <motion.label
                key="b1-checkbox"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 cursor-pointer overflow-hidden min-h-[44px]"
              >
                <input
                  type="checkbox"
                  checked={b1Passed}
                  onChange={e => setB1Passed(e.target.checked)}
                  className="w-5 h-5 rounded accent-brand-500 flex-shrink-0"
                />
                <span className="text-sm text-ink">
                  Adults have already passed a B1 English test
                  <span className="block text-xs text-ink-muted mt-0.5">
                    Leave unchecked to include ~£182 per adult (typical test fee)
                  </span>
                </span>
              </motion.label>
            )}
          </AnimatePresence>

          {visaType.b1Exempt && (
            <div className="flex items-start gap-2 p-3 bg-raised rounded-xl border border-border text-xs text-ink-muted">
              <Info size={14} className="text-brand-400 flex-shrink-0 mt-0.5" />
              Skilled Worker applicants proved English at the visa stage — no separate B1 test needed for ILR.
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Eligibility date banner */}
            <div className={clsx(
              'rounded-2xl border p-5',
              result.isEligible
                ? 'bg-success/10 border-success/30'
                : 'bg-brand-900 border-brand-500/30'
            )}>
              <div className="flex items-start gap-3">
                {result.isEligible
                  ? <CheckCircle2 size={24} className="text-success flex-shrink-0 mt-0.5" />
                  : <Clock        size={24} className="text-brand-400 flex-shrink-0 mt-0.5" />
                }
                <div>
                  {result.isEligible ? (
                    <>
                      <p className="font-semibold text-success text-base">
                        You may already be eligible to apply for ILR
                      </p>
                      <p className="text-ink-muted text-sm mt-1">
                        Your qualifying period ended on{' '}
                        <span className="text-ink font-medium">{formatDate(result.eligDate)}</span>.
                        Check GOV.UK to confirm your specific eligibility before applying.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-ink text-base">
                        You can apply for ILR from{' '}
                        <span className="text-brand-400">{formatDate(result.eligDate)}</span>
                      </p>
                      <p className="text-ink-muted text-sm mt-1">
                        That is{' '}
                        <span className="text-ink font-medium">{result.timeLabel}</span>{' '}
                        from today.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Cost breakdown */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h2 className="text-base font-display font-bold text-ink mb-4 flex items-center gap-2">
                <PoundSterling size={18} className="text-brand-400" />
                Estimated cost breakdown
              </h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm py-2 border-b border-border">
                  <span className="text-ink-muted">
                    ILR application fee — {numAdults} adult{numAdults > 1 ? 's' : ''} × £{FEES.ilrAdult.toLocaleString()}
                  </span>
                  <span className="font-mono font-semibold text-ink">{fmt(result.ilrAdults)}</span>
                </div>

                {numChildren > 0 && (
                  <div className="flex justify-between items-center text-sm py-2 border-b border-border">
                    <span className="text-ink-muted">
                      ILR application fee — {numChildren} child{numChildren > 1 ? 'ren' : ''} × £{FEES.ilrChild.toLocaleString()}
                    </span>
                    <span className="font-mono font-semibold text-ink">{fmt(result.ilrChildren)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm py-2 border-b border-border">
                  <span className="text-ink-muted">
                    Biometric enrolment — {numAdults + numChildren} person{(numAdults + numChildren) > 1 ? 's' : ''} × £{FEES.biometric}
                  </span>
                  <span className="font-mono font-semibold text-ink">{fmt(result.biometrics)}</span>
                </div>

                {result.lifeTestCost > 0 && (
                  <div className="flex justify-between items-center text-sm py-2 border-b border-border">
                    <span className="text-ink-muted">
                      Life in the UK test — {numAdults} adult{numAdults > 1 ? 's' : ''} × £{FEES.lifeInUkTest}
                    </span>
                    <span className="font-mono font-semibold text-ink">{fmt(result.lifeTestCost)}</span>
                  </div>
                )}

                {result.b1TestCost > 0 && (
                  <div className="flex justify-between items-center text-sm py-2 border-b border-border">
                    <span className="text-ink-muted">
                      B1 English test (estimated) — {numAdults} adult{numAdults > 1 ? 's' : ''} × ~£{FEES.b1Test}
                    </span>
                    <span className="font-mono font-semibold text-ink">{fmt(result.b1TestCost)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center bg-raised rounded-xl px-4 py-3">
                <span className="font-semibold text-ink">Total estimated cost</span>
                <span className="font-mono font-bold text-xl text-brand-400">{fmt(result.total)}</span>
              </div>

              <p className="text-xs text-ink-muted mt-3 flex items-start gap-1.5">
                <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
                Estimates based on fees correct as of April 2026. Always check GOV.UK before applying.
                B1 test cost is an estimate (typical range £150–£215).
              </p>
            </div>

            {/* What to do next */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h2 className="text-base font-display font-bold text-ink mb-4">What to do next</h2>
              <div className="space-y-2">
                {[
                  { href: '/articles/what-to-do-after-passing-life-in-the-uk-test', label: 'What happens after passing the Life in the UK test' },
                  { href: '/articles/ilr-vs-british-citizenship',                   label: 'ILR vs British citizenship — which do you need?' },
                  { href: '/articles/how-much-does-ilr-cost-2026',                  label: 'How much does ILR cost?' },
                  { href: '/practice',                                               label: 'Start practising for the Life in the UK test' },
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
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-card rounded-2xl border border-border p-6 text-center"
          >
            <Calendar size={32} className="text-ink-faint mx-auto mb-3" />
            <p className="text-ink-muted text-sm">
              Enter your UK entry date above to see your ILR eligibility date and cost estimate.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
