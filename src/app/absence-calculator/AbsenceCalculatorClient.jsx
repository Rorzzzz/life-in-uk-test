'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import {
  Plane,
  Plus,
  Trash2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Info,
  ArrowRight,
} from 'lucide-react'

// ─── Format date helper ───────────────────────────────────────────────────────
function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function daysBetween(start, end) {
  const s = new Date(start)
  const e = new Date(end)
  if (isNaN(s) || isNaN(e) || e < s) return 0
  return Math.floor((e - s) / 86400000) + 1
}

let nextId = 1
function makeTrip() {
  return { id: nextId++, departure: '', return: '' }
}

const ROUTES = [
  {
    id: 'ilr',
    label: 'ILR (Skilled Worker, Family, Ancestry, other work routes)',
    maxPerWindow: 180,
    windowYears: 1,
    totalYears: 5,
    rule: '180 days in any rolling 12-month period',
    lapseRule: 'ILR lapses after 2 continuous years outside the UK',
  },
  {
    id: 'settled',
    label: 'EU / EEA Settled Status (EUSS) — citizenship route',
    maxPerWindow: 450,
    windowYears: 5,
    totalYears: 5,
    rule: '450 days total in the 5-year period, and max 90 days in the final 12 months',
    lapseRule: 'Settled Status lapses after 5 continuous years outside the UK',
  },
]

// ─── Main component ───────────────────────────────────────────────────────────
export default function AbsenceCalculatorClient() {
  const todayStr = new Date().toISOString().split('T')[0]

  const [routeId, setRouteId] = useState('ilr')
  const [qualifyingStart, setQualifyingStart] = useState('')
  const [trips, setTrips] = useState([makeTrip()])

  function addTrip() {
    setTrips(prev => [...prev, makeTrip()])
  }

  function removeTrip(id) {
    setTrips(prev => prev.filter(t => t.id !== id))
  }

  function updateTrip(id, field, value) {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t))
  }

  // ─── Calculation ─────────────────────────────────────────────────────────────
  const result = useMemo(() => {
    if (!qualifyingStart) return null
    const periodStart = new Date(qualifyingStart)
    if (isNaN(periodStart.getTime())) return null

    const route = ROUTES.find(r => r.id === routeId)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Build set of all dates outside UK
    const datesOutside = new Set()
    trips.forEach(trip => {
      if (!trip.departure || !trip.return) return
      const dep = new Date(trip.departure)
      const ret = new Date(trip.return)
      if (isNaN(dep) || isNaN(ret) || ret < dep) return
      let d = new Date(dep)
      while (d <= ret) {
        const str = d.toISOString().split('T')[0]
        datesOutside.add(str)
        d = new Date(d.getTime() + 86400000)
      }
    })

    // Total days outside UK since qualifying start
    let totalDays = 0
    datesOutside.forEach(dateStr => {
      const d = new Date(dateStr)
      if (d >= periodStart && d <= today) totalDays++
    })

    if (routeId === 'ilr') {
      // ILR — slide 12-month rolling window, max 180 days
      let maxDays = 0
      let worstStart = null
      let worstEnd = null

      let checkDate = new Date(periodStart)
      while (checkDate <= today) {
        const windowEnd = new Date(checkDate)
        windowEnd.setFullYear(windowEnd.getFullYear() + 1)
        windowEnd.setDate(windowEnd.getDate() - 1)

        let count = 0
        datesOutside.forEach(dateStr => {
          const d = new Date(dateStr)
          if (d >= checkDate && d <= windowEnd) count++
        })

        if (count > maxDays) {
          maxDays = count
          worstStart = new Date(checkDate)
          worstEnd = new Date(windowEnd)
        }
        checkDate = new Date(checkDate.getTime() + 86400000)
      }

      return {
        routeId: 'ilr',
        totalDays,
        maxDays,
        worstStart,
        worstEnd,
        isPassing: maxDays <= 180,
        hasData: datesOutside.size > 0,
        threshold: 180,
        rule: route.rule,
        lapseRule: route.lapseRule,
      }
    } else {
      // Settled Status — max 450 days total in 5 years, max 90 days in final 12 months
      const fiveYearsAgo = new Date(today)
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5)
      const oneYearAgo = new Date(today)
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

      let daysLast5Years = 0
      let daysLast12Months = 0
      datesOutside.forEach(dateStr => {
        const d = new Date(dateStr)
        if (d >= periodStart && d <= today) {
          if (d >= fiveYearsAgo) daysLast5Years++
          if (d >= oneYearAgo) daysLast12Months++
        }
      })

      const passing5yr = daysLast5Years <= 450
      const passing12m = daysLast12Months <= 90

      return {
        routeId: 'settled',
        totalDays,
        daysLast5Years,
        daysLast12Months,
        isPassing: passing5yr && passing12m,
        passing5yr,
        passing12m,
        hasData: datesOutside.size > 0,
        rule: route.rule,
        lapseRule: route.lapseRule,
      }
    }
  }, [routeId, qualifyingStart, trips])

  const hasValidTrip = trips.some(t => t.departure && t.return)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          UK Absence Calculator
        </h1>
        <p className="text-ink-muted text-sm leading-relaxed">
          Check if your trips outside the UK breach the 180-day rule in any 12-month period of
          your ILR qualifying period. Days are counted from departure to return inclusive.
        </p>
      </div>

      {/* Form card */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-6 mb-6">

        {/* Route selector */}
        <fieldset>
          <legend className="text-sm font-semibold text-ink mb-3">
            What are you applying for?
          </legend>
          <div className="grid gap-2">
            {ROUTES.map(r => (
              <label
                key={r.id}
                className={clsx(
                  'flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors min-h-[44px]',
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
                  onChange={() => setRouteId(r.id)}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 accent-brand-500"
                />
                <div className="flex-1 min-w-0">
                  <span className={clsx(
                    'text-sm font-medium block',
                    routeId === r.id ? 'text-brand-400' : 'text-ink'
                  )}>
                    {r.label}
                  </span>
                  <span className="text-xs text-ink-muted mt-0.5 block">{r.rule}</span>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Qualifying period start */}
        <div>
          <label
            htmlFor="qualifying-start"
            className="text-sm font-semibold text-ink mb-2 flex items-center gap-2"
          >
            <Calendar size={16} className="text-brand-400" />
            Qualifying period start date
          </label>
          <p className="text-xs text-ink-muted mb-2">
            Your UK entry date or the date your qualifying visa was granted
          </p>
          <input
            id="qualifying-start"
            type="date"
            max={todayStr}
            value={qualifyingStart}
            onChange={e => setQualifyingStart(e.target.value)}
            style={{ colorScheme: 'dark' }}
            className={clsx(
              'w-full h-11 px-3 rounded-xl border border-border bg-raised text-ink text-sm',
              'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
              'transition-colors'
            )}
          />
        </div>

        {/* Trips */}
        <div>
          <p className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
            <Plane size={16} className="text-brand-400" />
            Trips outside the UK
          </p>

          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {trips.map((trip, idx) => {
                const duration = trip.departure && trip.return
                  ? daysBetween(trip.departure, trip.return)
                  : null
                return (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="bg-raised rounded-xl border border-border p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
                        Trip {idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        {duration !== null && duration > 0 && (
                          <span className={clsx(
                            'text-xs font-mono font-semibold px-2 py-0.5 rounded-lg',
                            duration > 180 ? 'bg-danger/20 text-danger' : 'bg-success/10 text-success'
                          )}>
                            {duration} day{duration !== 1 ? 's' : ''}
                          </span>
                        )}
                        {trips.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTrip(trip.id)}
                            aria-label="Remove trip"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-muted hover:text-danger hover:bg-danger/10 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-ink-muted mb-1 block">Departure</label>
                        <input
                          type="date"
                          max={todayStr}
                          value={trip.departure}
                          onChange={e => updateTrip(trip.id, 'departure', e.target.value)}
                          style={{ colorScheme: 'dark' }}
                          className={clsx(
                            'w-full h-10 px-2 rounded-lg border border-border bg-raised text-ink text-sm',
                            'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'
                          )}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-ink-muted mb-1 block">Return</label>
                        <input
                          type="date"
                          min={trip.departure || undefined}
                          max={todayStr}
                          value={trip.return}
                          onChange={e => updateTrip(trip.id, 'return', e.target.value)}
                          style={{ colorScheme: 'dark' }}
                          className={clsx(
                            'w-full h-10 px-2 rounded-lg border border-border bg-raised text-ink text-sm',
                            'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'
                          )}
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={addTrip}
            className={clsx(
              'mt-3 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-border',
              'text-sm text-brand-400 hover:bg-brand-500/10 hover:border-brand-500/50 transition-colors',
              'w-full justify-center min-h-[44px]'
            )}
          >
            <Plus size={16} />
            Add another trip
          </button>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && hasValidTrip ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Status banner */}
            <div className={clsx(
              'rounded-2xl border p-5',
              result.isPassing
                ? 'bg-success/10 border-success/30'
                : 'bg-danger/10 border-danger/30'
            )}>
              <div className="flex items-start gap-3">
                {result.isPassing
                  ? <CheckCircle2 size={24} className="text-success flex-shrink-0 mt-0.5" />
                  : <AlertCircle size={24} className="text-danger flex-shrink-0 mt-0.5" />
                }
                <div>
                  {result.routeId === 'ilr' ? (
                    result.isPassing ? (
                      <>
                        <p className="font-semibold text-success text-base">
                          No 12-month window exceeds 180 days
                        </p>
                        <p className="text-ink-muted text-sm mt-1">
                          Your highest absence in any 12-month window is{' '}
                          <span className="text-ink font-semibold font-mono">{result.maxDays} days</span>.
                          You are within the 180-day ILR limit.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-danger text-base">
                          180-day rule may be breached
                        </p>
                        <p className="text-ink-muted text-sm mt-1">
                          Your highest absence in a single 12-month window is{' '}
                          <span className="text-danger font-semibold font-mono">{result.maxDays} days</span>
                          {result.worstStart && result.worstEnd && (
                            <>, in the window{' '}
                              <span className="text-ink font-medium">
                                {formatDate(result.worstStart)} — {formatDate(result.worstEnd)}
                              </span>
                            </>
                          )}.
                          {' '}This exceeds the 180-day limit.
                        </p>
                      </>
                    )
                  ) : (
                    result.isPassing ? (
                      <>
                        <p className="font-semibold text-success text-base">
                          Within Settled Status absence limits
                        </p>
                        <p className="text-ink-muted text-sm mt-1">
                          5-year total: <span className="text-ink font-semibold font-mono">{result.daysLast5Years} days</span> (limit: 450) —{' '}
                          Last 12 months: <span className="text-ink font-semibold font-mono">{result.daysLast12Months} days</span> (limit: 90).
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-danger text-base">
                          Settled Status absence limit may be breached
                        </p>
                        {!result.passing5yr && (
                          <p className="text-ink-muted text-sm mt-1">
                            5-year total: <span className="text-danger font-semibold font-mono">{result.daysLast5Years} days</span> — exceeds the 450-day limit.
                          </p>
                        )}
                        {!result.passing12m && (
                          <p className="text-ink-muted text-sm mt-1">
                            Last 12 months: <span className="text-danger font-semibold font-mono">{result.daysLast12Months} days</span> — exceeds the 90-day limit for the citizenship application year.
                          </p>
                        )}
                      </>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h2 className="text-base font-display font-bold text-ink mb-4">Absence summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-ink-muted">Total days outside UK (since qualifying start)</span>
                  <span className="font-mono font-semibold text-ink">{result.totalDays} days</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-ink-muted">Highest days in any 12-month window</span>
                  <span className={clsx(
                    'font-mono font-semibold',
                    result.maxDays > 180 ? 'text-danger' : 'text-success'
                  )}>
                    {result.maxDays} / 180 days
                  </span>
                </div>
                {result.worstStart && result.worstEnd && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-ink-muted">Worst 12-month window</span>
                    <span className="text-sm text-ink font-medium text-right">
                      {formatDate(result.worstStart)}<br />
                      <span className="text-ink-muted text-xs">to {formatDate(result.worstEnd)}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-2.5 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <Info size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-ink-muted leading-relaxed">
                Always verify with GOV.UK before submitting your ILR application. Absences from
                different visa types may have different rules. This calculator is a guide only.
              </p>
            </div>

            {/* Related links */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h2 className="text-base font-display font-bold text-ink mb-4">Related tools and guides</h2>
              <div className="space-y-2">
                {[
                  { href: '/ilr-calculator', label: 'ILR eligibility calculator — your exact date and cost estimate' },
                  { href: '/ilr-checklist', label: 'ILR document checklist — personalised by visa type' },
                  { href: '/articles/ilr-eligibility-calculator', label: 'When can you apply for ILR? Full guide' },
                  { href: '/practice', label: 'Start practising for the Life in the UK test' },
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
            <Plane size={32} className="text-ink-faint mx-auto mb-3" />
            <p className="text-ink-muted text-sm">
              Enter your qualifying period start date and at least one trip to see your absence summary.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
