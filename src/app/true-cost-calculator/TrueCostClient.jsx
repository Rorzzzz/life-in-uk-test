'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import {
  PoundSterling,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  Copy,
  Check,
  Info,
} from 'lucide-react'

// ─── Fee constants (verified April 2026) ─────────────────────────────────────
const FEES = {
  // Visa fees — in-country renewal
  skilledWorker: 943,
  familyVisa: 1258,
  globalTalent: 766,
  ancestry: 885,
  otherWork: 943,

  // Immigration Health Surcharge
  ihsPerYearAdult: 1035,
  ihsPerYearChild: 776,
  ihsYears: 5,

  // ILR
  ilrPerPerson: 3226,
  biometricPerPerson: 19.20,

  // Tests
  lifeInUkTest: 50,
  b1Test: 182,

  // Citizenship
  naturalisationAdult: 1709,
  ceremonyFee: 130,
  childCitizenshipRegistration: 1000,

  // Passport
  adultPassportOnline: 102,
  childPassportOnline: 66.50,
}

const VISA_ROUTES = [
  { id: 'skilledWorker', label: 'Skilled Worker / Tier 2', feeKey: 'skilledWorker', hideB1: true,  noIHS: false, noVisa: false },
  { id: 'familyVisa',    label: 'Family visa (spouse / partner of British citizen)', feeKey: 'familyVisa', hideB1: false, noIHS: false, noVisa: false },
  { id: 'globalTalent', label: 'Global Talent', feeKey: 'globalTalent', hideB1: false, noIHS: false, noVisa: false },
  { id: 'ancestry',     label: 'UK Ancestry', feeKey: 'ancestry', hideB1: false, noIHS: false, noVisa: false },
  { id: 'otherWork',    label: 'Other work visa', feeKey: 'otherWork', hideB1: true,  noIHS: false, noVisa: false },
  { id: 'euSettled',    label: 'EU / EEA citizen — Settled Status (EUSS)', feeKey: 'skilledWorker', hideB1: false, noIHS: true, noVisa: true },
]

// ─── Helper ───────────────────────────────────────────────────────────────────
function fmt(n) {
  return n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 })
}

function fmtRound(n) {
  return n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
function Stepper({ value, onChange, min = 0, max = 6, label, subLabel }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <span className="text-sm text-ink">{label}</span>
        {subLabel && <p className="text-xs text-ink-muted mt-0.5">{subLabel}</p>}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
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

// ─── Cost row ─────────────────────────────────────────────────────────────────
function CostRow({ label, subLabel, value, highlight, exempt, tag }) {
  return (
    <div className={clsx(
      'flex justify-between items-start text-sm py-2.5 border-b border-border gap-3',
      exempt && 'opacity-50'
    )}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-ink-muted">{label}</span>
          {tag && (
            <span className={clsx(
              'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide',
              tag === 'surprise' && 'bg-danger/20 text-danger',
              tag === 'exempt' && 'bg-success/20 text-success',
            )}>
              {tag === 'surprise' ? 'Often missed' : 'Already paid'}
            </span>
          )}
        </div>
        {subLabel && <p className="text-xs text-ink-muted mt-0.5">{subLabel}</p>}
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {exempt && <Check size={14} className="text-success" />}
        <span className={clsx(
          'font-mono font-semibold',
          highlight ? 'text-brand-400' : 'text-ink',
          exempt && 'text-success'
        )}>
          {exempt ? '£0' : fmt(value)}
        </span>
      </div>
    </div>
  )
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ label }) {
  return (
    <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider pt-3 pb-1">
      {label}
    </p>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function TrueCostClient() {
  const [routeId, setRouteId]             = useState('skilledWorker')
  const [renewals, setRenewals]           = useState(1)
  const [numAdults, setNumAdults]         = useState(1)
  const [numChildren, setNumChildren]     = useState(0)
  const [lifeTestPassed, setLifeTestPassed] = useState(false)
  const [b1Passed, setB1Passed]           = useState(false)
  const [wantsPassport, setWantsPassport] = useState(true)
  const [copied, setCopied]               = useState(false)

  const route = VISA_ROUTES.find(r => r.id === routeId)
  const visaFeePerPerson = FEES[route.feeKey]
  const totalPersons = numAdults + numChildren
  const applicationsCount = renewals + 1 // initial + renewals

  const result = useMemo(() => {
    // Resolve route inside memo using only primitive routeId
    const r = VISA_ROUTES.find(v => v.id === routeId)
    const visaFee = FEES[r.feeKey]
    const appCount = renewals + 1
    const persons = numAdults + numChildren

    // Visa fees — EU/EUSS route had free applications, no renewals
    const totalVisaFees = r.noVisa ? 0 : visaFee * numAdults * appCount

    // IHS — EU/EUSS route was exempt from IHS entirely
    const ihsAdults   = r.noIHS ? 0 : FEES.ihsPerYearAdult * FEES.ihsYears * numAdults
    const ihsChildren = r.noIHS ? 0 : FEES.ihsPerYearChild * FEES.ihsYears * numChildren
    const totalIHS    = ihsAdults + ihsChildren

    // Tests
    const lifeInUkCost = lifeTestPassed ? 0 : numAdults * FEES.lifeInUkTest
    const b1Cost       = (b1Passed || r.hideB1) ? 0 : numAdults * FEES.b1Test

    // ILR
    const ilrCost       = persons * FEES.ilrPerPerson
    const biometricCost = persons * FEES.biometricPerPerson

    // Citizenship
    const naturalisationCost   = numAdults * (FEES.naturalisationAdult + FEES.ceremonyFee)
    const childCitizenshipCost = numChildren * FEES.childCitizenshipRegistration

    // Passport
    const passportCost = wantsPassport
      ? (numAdults * FEES.adultPassportOnline) + (numChildren * FEES.childPassportOnline)
      : 0

    const grandTotal = totalVisaFees + totalIHS + lifeInUkCost + b1Cost + ilrCost + biometricCost + naturalisationCost + childCitizenshipCost + passportCost
    const perPerson  = persons > 0 ? grandTotal / persons : grandTotal
    const totalYears = FEES.ihsYears + 1

    return {
      totalVisaFees,
      totalIHS, ihsAdults, ihsChildren,
      lifeInUkCost, b1Cost,
      ilrCost, biometricCost,
      naturalisationCost, childCitizenshipCost,
      passportCost,
      grandTotal,
      perPerson,
      totalYears,
    }
  }, [routeId, renewals, numAdults, numChildren, lifeTestPassed, b1Passed, wantsPassport])

  function handleCopy() {
    const text = `I calculated that my family will spend ${fmtRound(result.grandTotal)} to become British citizens. The true cost of UK immigration is staggering. Check yours free at passtheuktest.co.uk/true-cost-calculator`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* Form card */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-6 mb-6">

        {/* Visa route */}
        <fieldset>
          <legend className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
            <PoundSterling size={16} className="text-brand-400" />
            Your visa route
          </legend>
          <div className="grid gap-2">
            {VISA_ROUTES.map(r => (
              <label
                key={r.id}
                className={clsx(
                  'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors min-h-[44px]',
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
                  className="w-4 h-4 flex-shrink-0 accent-brand-500"
                />
                <div className="flex-1 min-w-0">
                  <span className={clsx(
                    'text-sm font-medium block',
                    routeId === r.id ? 'text-brand-400' : 'text-ink'
                  )}>
                    {r.label}
                  </span>
                  {r.noIHS && (
                    <span className="text-xs text-success mt-0.5 block">
                      ✓ No IHS — EUSS was exempt. No visa renewal fees.
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Steppers */}
        <div className="space-y-4">
          <Stepper
            label="Visa renewals before ILR"
            subLabel="Most people renew once before reaching ILR"
            value={renewals}
            onChange={setRenewals}
            min={0}
            max={3}
          />
          <Stepper
            label="Number of adults"
            value={numAdults}
            onChange={setNumAdults}
            min={1}
            max={6}
          />
          <Stepper
            label="Children under 18"
            value={numChildren}
            onChange={setNumChildren}
            min={0}
            max={4}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-ink">Costs already covered</p>

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={lifeTestPassed}
              onChange={e => setLifeTestPassed(e.target.checked)}
              className="w-5 h-5 rounded accent-brand-500 flex-shrink-0"
            />
            <span className="text-sm text-ink">
              Life in the UK test already passed
              <span className="block text-xs text-ink-muted mt-0.5">Removes £50 per adult</span>
            </span>
          </label>

          {!route.hideB1 && (
            <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={b1Passed}
                onChange={e => setB1Passed(e.target.checked)}
                className="w-5 h-5 rounded accent-brand-500 flex-shrink-0"
              />
              <span className="text-sm text-ink">
                B1 English test already passed
                <span className="block text-xs text-ink-muted mt-0.5">Removes ~£182 per adult</span>
              </span>
            </label>
          )}

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={wantsPassport}
              onChange={e => setWantsPassport(e.target.checked)}
              className="w-5 h-5 rounded accent-brand-500 flex-shrink-0"
            />
            <span className="text-sm text-ink">
              Include British passport cost
              <span className="block text-xs text-ink-muted mt-0.5">£102 adult · £66.50 child — optional, separate process</span>
            </span>
          </label>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        <motion.div
          key={`${routeId}-${renewals}-${numAdults}-${numChildren}-${lifeTestPassed}-${b1Passed}-${wantsPassport}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Grand total banner */}
          <div className="bg-brand-900 border border-brand-500/30 rounded-2xl p-5 text-center">
            <p className="text-sm text-ink-muted mb-1">
              Estimated total — full journey to British citizenship
            </p>
            <p className="font-mono font-bold text-4xl text-brand-400 mb-1">
              {fmtRound(result.grandTotal)}
            </p>
            <div className="flex items-center justify-center gap-4 mt-2 text-xs text-ink-muted">
              <span>~{fmtRound(result.perPerson)} per person</span>
              <span>·</span>
              <span>Over approximately {result.totalYears} years</span>
            </div>
          </div>

          {/* Itemised breakdown */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h2 className="text-base font-display font-bold text-ink mb-2 flex items-center gap-2">
              <PoundSterling size={18} className="text-brand-400" />
              Full breakdown
            </h2>

            <SectionHeader label="Visa costs" />
            <CostRow
              label={`${route.label} visa — ${numAdults} adult${numAdults !== 1 ? 's' : ''} × ${applicationsCount} application${applicationsCount !== 1 ? 's' : ''}`}
              subLabel={`${fmt(visaFeePerPerson)} per application`}
              value={result.totalVisaFees}
            />

            <SectionHeader label="Immigration Health Surcharge" />
            <CostRow
              label={`IHS — adults (${numAdults} × ${FEES.ihsYears} yrs × £${FEES.ihsPerYearAdult.toLocaleString()} × ${applicationsCount})`}
              value={result.ihsAdults}
              tag="surprise"
            />
            {numChildren > 0 && (
              <CostRow
                label={`IHS — children (${numChildren} × ${FEES.ihsYears} yrs × £${FEES.ihsPerYearChild} × ${applicationsCount})`}
                value={result.ihsChildren}
                tag="surprise"
              />
            )}
            <div className="flex justify-between items-center py-1.5">
              <span className="text-xs font-semibold text-danger">IHS subtotal</span>
              <span className="font-mono font-bold text-sm text-danger">{fmt(result.totalIHS)}</span>
            </div>

            <SectionHeader label="Tests" />
            <CostRow
              label={`Life in the UK test — ${numAdults} adult${numAdults !== 1 ? 's' : ''}`}
              subLabel="£50 per person"
              value={numAdults * FEES.lifeInUkTest}
              exempt={lifeTestPassed}
              tag={lifeTestPassed ? 'exempt' : undefined}
            />
            {!route.hideB1 && (
              <CostRow
                label={`B1 English test — ${numAdults} adult${numAdults !== 1 ? 's' : ''}`}
                subLabel="~£182 per person (midpoint estimate)"
                value={numAdults * FEES.b1Test}
                exempt={b1Passed}
                tag={b1Passed ? 'exempt' : undefined}
              />
            )}

            <SectionHeader label="Indefinite Leave to Remain (ILR)" />
            <CostRow
              label={`ILR application — ${numAdults + numChildren} person${numAdults + numChildren !== 1 ? 's' : ''} × £${FEES.ilrPerPerson.toLocaleString()}`}
              value={result.ilrCost}
            />
            <CostRow
              label="Biometric enrolment"
              subLabel={`£${FEES.biometricPerPerson} per person`}
              value={result.biometricCost}
            />

            <SectionHeader label="British citizenship" />
            <CostRow
              label={`Naturalisation — ${numAdults} adult${numAdults !== 1 ? 's' : ''}`}
              subLabel="£1,709 application + £130 ceremony fee included"
              value={result.naturalisationCost}
            />
            {numChildren > 0 && (
              <CostRow
                label={`Child citizenship registration — ${numChildren} child${numChildren !== 1 ? 'ren' : ''}`}
                subLabel="£1,000 per child"
                value={result.childCitizenshipCost}
              />
            )}

            {wantsPassport && (
              <>
                <SectionHeader label="British passport (optional)" />
                <CostRow
                  label={`Passport — ${numAdults} adult${numAdults !== 1 ? 's' : ''}${numChildren > 0 ? ` + ${numChildren} child${numChildren !== 1 ? 'ren' : ''}` : ''}`}
                  subLabel="£102 adult · £66.50 child — online application"
                  value={result.passportCost}
                />
              </>
            )}

            {/* Grand total row */}
            <div className="flex justify-between items-center bg-raised rounded-xl px-4 py-3 mt-4">
              <span className="font-bold text-ink">Grand total</span>
              <span className="font-mono font-bold text-2xl text-brand-400">{fmtRound(result.grandTotal)}</span>
            </div>
          </div>

          {/* Share section */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h2 className="text-base font-display font-bold text-ink mb-3">Share your result</h2>
            <p className="text-sm text-ink-muted mb-3 leading-relaxed italic">
              &ldquo;I calculated that my family will spend {fmtRound(result.grandTotal)} to become British citizens. The true cost of UK immigration is staggering. Check yours free at passtheuktest.co.uk/true-cost-calculator&rdquo;
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className={clsx(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[44px]',
                'border border-border bg-raised text-ink hover:border-brand-400 hover:text-brand-400',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 active:opacity-70'
              )}
            >
              {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </button>
          </div>

          {/* Related links */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h2 className="text-base font-display font-bold text-ink mb-3">Related guides and tools</h2>
            <div className="space-y-2">
              {[
                { href: '/ilr-calculator',                                          label: 'ILR eligibility calculator — find your qualifying date' },
                { href: '/citizenship-planner',                                     label: 'Citizenship planner — timeline and step-by-step breakdown' },
                { href: '/articles/how-much-does-ilr-cost-2026',                   label: 'How much does ILR cost in 2026?' },
                { href: '/articles/immigration-health-surcharge-ilr',               label: 'Immigration Health Surcharge — the hidden giant cost' },
                { href: '/articles/how-much-does-british-citizenship-cost-2026',    label: 'How much does British citizenship cost in 2026?' },
                { href: '/practice',                                                label: 'Practise for the Life in the UK test — free' },
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

          {/* Disclaimer */}
          <div className="flex items-start gap-2 p-4 bg-raised rounded-xl border border-border">
            <AlertCircle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-ink-muted leading-relaxed">
              This calculator uses verified Home Office fees as of April 2026. Visa fees vary by route and duration — this estimate uses the most common scenario for each route. IHS rates and immigration fees change regularly. Always check GOV.UK for current fees before making financial plans.
            </p>
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2 p-3 bg-raised rounded-xl border border-border">
            <Info size={13} className="text-brand-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-ink-muted leading-relaxed">
              The IHS is not charged at the ILR stage — it is paid with each visa application. Once you have ILR, you stop paying the IHS and your NHS access is on the same basis as a UK citizen.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
