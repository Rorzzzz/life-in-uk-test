'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import {
  Star,
  Calendar,
  PoundSterling,
  CheckCircle2,
  Clock,
  Info,
  AlertCircle,
  ArrowRight,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'

// ─── Fee constants ────────────────────────────────────────────────────────────
const FEES = {
  naturalisation: 1709,
  ceremony: 130,
  childRegistration: 1000,
  lifeInUkTest: 50,
  b1Test: 182,
  passportAdult: 102,
  passportChild: 66.50,
}

const ROUTES = [
  {
    id: 'standard',
    label: 'I have ILR (or will get it) — standard route',
    desc: '1 year after ILR date',
    yearsToAdd: 1,
    dateLabel: 'ILR date (or expected ILR date)',
  },
  {
    id: 'spouse',
    label: 'I am married to a British citizen — spouse route',
    desc: '3 years UK residence (no ILR needed first)',
    yearsToAdd: 3,
    dateLabel: 'Date you arrived in the UK',
  },
  {
    id: 'eu-settled',
    label: 'I have EU Settled Status',
    desc: '1 year after Settled Status granted date',
    yearsToAdd: 1,
    dateLabel: 'Date Settled Status was granted',
  },
]

// ─── Stepper ──────────────────────────────────────────────────────────────────
function Stepper({ value, onChange, min = 0, max = 4, label }) {
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
            'bg-raised text-ink transition-opacity active:opacity-70',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
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
            'bg-raised text-ink transition-opacity active:opacity-70',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
            value >= max && 'opacity-30 cursor-not-allowed'
          )}
        >
          <ChevronUp size={18} />
        </button>
      </div>
    </div>
  )
}

// ─── Format helpers ───────────────────────────────────────────────────────────
function formatDate(date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function monthsDiff(from, to) {
  const years = to.getFullYear() - from.getFullYear()
  const months = to.getMonth() - from.getMonth()
  return years * 12 + months
}

function fmt(n) {
  return n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 })
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CitizenshipPlannerClient() {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  const [routeId, setRouteId] = useState('standard')
  const [dateStr, setDateStr] = useState('')
  const [lifeTestPassed, setLifeTestPassed] = useState(false)
  const [b1Passed, setB1Passed] = useState(false)
  const [numChildren, setNumChildren] = useState(0)
  const [includePassport, setIncludePassport] = useState(false)

  const route = ROUTES.find(r => r.id === routeId)

  const result = useMemo(() => {
    if (!dateStr) return null
    const baseDate = new Date(dateStr)
    if (isNaN(baseDate.getTime())) return null

    // Eligibility date
    const eligDate = new Date(baseDate)
    eligDate.setFullYear(eligDate.getFullYear() + route.yearsToAdd)

    const isEligible = eligDate <= today
    const diff = monthsDiff(today, eligDate)
    const diffYears = Math.floor(Math.abs(diff) / 12)
    const remMonths = Math.abs(diff) % 12

    let timeLabel = ''
    if (!isEligible) {
      if (diffYears > 0 && remMonths > 0) timeLabel = `${diffYears} year${diffYears !== 1 ? 's' : ''} and ${remMonths} month${remMonths !== 1 ? 's' : ''}`
      else if (diffYears > 0) timeLabel = `${diffYears} year${diffYears !== 1 ? 's' : ''}`
      else timeLabel = `${remMonths} month${remMonths !== 1 ? 's' : ''}`
    }

    // Cost calculation
    const adultNaturalisation = FEES.naturalisation + FEES.ceremony
    const childrenCost = numChildren * FEES.childRegistration
    const lifeTestCost = lifeTestPassed ? 0 : FEES.lifeInUkTest
    const b1Cost = b1Passed ? 0 : FEES.b1Test

    const totalWithout = adultNaturalisation + childrenCost + lifeTestCost + b1Cost
    const passportCost = FEES.passportAdult + (numChildren * FEES.passportChild)
    const totalWith = totalWithout + passportCost

    return {
      eligDate,
      isEligible,
      timeLabel,
      adultNaturalisation,
      childrenCost,
      lifeTestCost,
      b1Cost,
      totalWithout,
      passportCost,
      totalWith,
      numChildren,
    }
  }, [dateStr, routeId, lifeTestPassed, b1Passed, numChildren, includePassport])

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          UK Citizenship Planner
        </h1>
        <p className="text-ink-muted text-sm leading-relaxed">
          Find out when you can apply for British citizenship and the total cost. Enter your
          route and key dates to get your eligibility date and full fee breakdown.
        </p>
      </div>

      {/* Form */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-6 mb-6">

        {/* Route */}
        <fieldset>
          <legend className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
            <Star size={16} className="text-brand-400" />
            Your route to citizenship
          </legend>
          <div className="grid gap-2">
            {ROUTES.map(r => (
              <label
                key={r.id}
                className={clsx(
                  'flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                  'min-h-[44px]',
                  routeId === r.id
                    ? 'border-brand-500 bg-brand-900'
                    : 'border-border bg-raised hover:border-brand-400'
                )}
              >
                <input
                  type="radio"
                  name="route"
                  value={r.id}
                  checked={routeId === r.id}
                  onChange={() => { setRouteId(r.id); setDateStr('') }}
                  className="mt-0.5 accent-brand-500 w-4 h-4 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className={clsx(
                    'text-sm font-medium',
                    routeId === r.id ? 'text-brand-400' : 'text-ink'
                  )}>
                    {r.label}
                  </span>
                  <p className="text-xs text-ink-muted mt-0.5">{r.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Date input */}
        <div>
          <label
            htmlFor="key-date"
            className="text-sm font-semibold text-ink mb-2 flex items-center gap-2"
          >
            <Calendar size={16} className="text-brand-400" />
            {route.dateLabel}
          </label>
          <input
            id="key-date"
            type="date"
            max={todayStr}
            value={dateStr}
            onChange={e => setDateStr(e.target.value)}
            style={{ colorScheme: 'dark' }}
            className={clsx(
              'w-full h-11 px-3 rounded-xl border border-border bg-raised text-ink text-sm',
              'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'
            )}
          />
        </div>

        {/* Children */}
        <div className="space-y-4">
          <Stepper
            label="Children applying for citizenship (£1,000 per child)"
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
              I have already passed the Life in the UK test
              <span className="block text-xs text-ink-muted mt-0.5">
                Leave unchecked to include £50 in the estimate
              </span>
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={b1Passed}
              onChange={e => setB1Passed(e.target.checked)}
              className="w-5 h-5 rounded accent-brand-500 flex-shrink-0"
            />
            <span className="text-sm text-ink">
              I have already passed a B1 English test
              <span className="block text-xs text-ink-muted mt-0.5">
                Leave unchecked to include ~£182 in the estimate
              </span>
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={includePassport}
              onChange={e => setIncludePassport(e.target.checked)}
              className="w-5 h-5 rounded accent-brand-500 flex-shrink-0"
            />
            <span className="text-sm text-ink">
              Include British passport cost in total
              <span className="block text-xs text-ink-muted mt-0.5">
                £102 adult + £66.50 per child (not required immediately — optional)
              </span>
            </span>
          </label>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Eligibility banner */}
            <div className={clsx(
              'rounded-2xl border p-5',
              result.isEligible
                ? 'bg-success/10 border-success/30'
                : 'bg-brand-900 border-brand-500/30'
            )}>
              <div className="flex items-start gap-3">
                {result.isEligible
                  ? <CheckCircle2 size={24} className="text-success flex-shrink-0 mt-0.5" />
                  : <Clock size={24} className="text-brand-400 flex-shrink-0 mt-0.5" />
                }
                <div>
                  {result.isEligible ? (
                    <>
                      <p className="font-semibold text-success text-base">
                        You may already be eligible to apply for citizenship
                      </p>
                      <p className="text-ink-muted text-sm mt-1">
                        Your eligibility date was{' '}
                        <span className="text-ink font-medium">{formatDate(result.eligDate)}</span>.
                        Verify all requirements at GOV.UK before applying.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-ink text-base">
                        You can apply for citizenship from{' '}
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
                  <div>
                    <span className="text-ink-muted">Adult naturalisation fee</span>
                    <p className="text-xs text-ink-muted mt-0.5">£1,709 application + £130 ceremony (included)</p>
                  </div>
                  <span className="font-mono font-semibold text-ink">{fmt(result.adultNaturalisation)}</span>
                </div>

                {result.numChildren > 0 && (
                  <div className="flex justify-between items-center text-sm py-2 border-b border-border">
                    <span className="text-ink-muted">
                      Child registration — {result.numChildren} child{result.numChildren !== 1 ? 'ren' : ''} × £{FEES.childRegistration.toLocaleString()}
                    </span>
                    <span className="font-mono font-semibold text-ink">{fmt(result.childrenCost)}</span>
                  </div>
                )}

                {result.lifeTestCost > 0 && (
                  <div className="flex justify-between items-center text-sm py-2 border-b border-border">
                    <span className="text-ink-muted">Life in the UK test</span>
                    <span className="font-mono font-semibold text-ink">{fmt(result.lifeTestCost)}</span>
                  </div>
                )}

                {result.b1Cost > 0 && (
                  <div className="flex justify-between items-center text-sm py-2 border-b border-border">
                    <span className="text-ink-muted">B1 English test (estimated)</span>
                    <span className="font-mono font-semibold text-ink">~{fmt(result.b1Cost)}</span>
                  </div>
                )}

                {includePassport && (
                  <div className="flex justify-between items-center text-sm py-2 border-b border-border">
                    <span className="text-ink-muted">
                      British passport — 1 adult{result.numChildren > 0 ? ` + ${result.numChildren} child${result.numChildren !== 1 ? 'ren' : ''}` : ''}
                    </span>
                    <span className="font-mono font-semibold text-ink">{fmt(result.passportCost)}</span>
                  </div>
                )}
              </div>

              {/* Total without passport */}
              <div className="flex justify-between items-center bg-raised rounded-xl px-4 py-3 mb-2">
                <span className="font-semibold text-ink">Total (without passport)</span>
                <span className="font-mono font-bold text-xl text-brand-400">{fmt(result.totalWithout)}</span>
              </div>

              {includePassport && (
                <div className="flex justify-between items-center bg-raised rounded-xl px-4 py-3">
                  <span className="font-semibold text-ink">Total (with passport)</span>
                  <span className="font-mono font-bold text-xl text-success">{fmt(result.totalWith)}</span>
                </div>
              )}

              <p className="text-xs text-ink-muted mt-3 flex items-start gap-1.5">
                <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
                Fees correct as of April 2026. The ceremony fee (£130) is included in the £1,709 total
                — you do not pay it separately. A British passport is not required immediately after citizenship.
              </p>
            </div>

            {/* Notes */}
            <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
              <h2 className="text-base font-display font-bold text-ink">What happens next</h2>
              <div className="flex items-start gap-2.5 p-3 bg-raised rounded-xl border border-border">
                <Info size={14} className="text-brand-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-ink-muted leading-relaxed">
                  Processing time: decisions usually take up to 6 months. After approval, you
                  must attend a citizenship ceremony within 90 days.
                </p>
              </div>
            </div>

            {/* Related links */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h2 className="text-base font-display font-bold text-ink mb-3">Related guides</h2>
              <div className="space-y-2">
                {[
                  { href: '/articles/british-citizenship-requirements-2026', label: 'British citizenship requirements 2026 — full checklist' },
                  { href: '/articles/how-much-does-british-citizenship-cost-2026', label: 'How much does British citizenship cost? Full breakdown' },
                  { href: '/articles/ilr-vs-british-citizenship', label: 'ILR vs British citizenship — what is the difference?' },
                  { href: '/practice', label: 'Start practising for the Life in the UK test — free' },
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

            <div className="flex items-start gap-2 p-3 bg-raised rounded-xl border border-border text-xs text-ink-muted">
              <AlertCircle size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
              Always check GOV.UK before applying for citizenship. Requirements and fees can change.
            </div>
          </motion.div>
        ) : (
          <div className="bg-card rounded-2xl border border-border p-6 text-center">
            <Star size={32} className="text-ink-faint mx-auto mb-3" />
            <p className="text-ink-muted text-sm">
              Select your route and enter your key date above to see your citizenship eligibility date and cost estimate.
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
