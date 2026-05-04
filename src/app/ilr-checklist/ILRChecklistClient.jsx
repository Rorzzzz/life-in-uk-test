'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import {
  ClipboardCheck,
  Printer,
  CheckSquare,
  Square,
  Info,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'

// ─── Visa definitions ─────────────────────────────────────────────────────────
const VISA_TYPES = [
  { id: 'skilled-worker', label: 'Skilled Worker / Tier 2', form: 'SET(O)' },
  { id: 'family', label: 'Family visa — spouse/partner of British citizen', form: 'SET(M)' },
  { id: 'long-residence', label: 'Long Residence — 10 years', form: 'SET(LR)' },
  { id: 'global-talent', label: 'Global Talent', form: 'SET(O)' },
  { id: 'ancestry', label: 'UK Ancestry', form: 'SET(O)' },
]

const CHECKLISTS = {
  'skilled-worker': {
    note: 'Skilled Worker applicants do not need a separate B1 English test certificate.',
    items: [
      { id: 'passport', text: 'Valid passport or travel document (not expired)' },
      { id: 'status', text: 'Evidence of current immigration status (eVisa digital status or BRP if issued pre-2025)' },
      { id: 'lituk', text: 'Life in the UK test pass notification letter (with pass reference number)' },
      { id: 'sponsor-letter', text: 'Sponsor\'s letter confirming continued employment, salary, and job title' },
      { id: 'payslips', text: '12 months of payslips from current employer' },
      { id: 'p60', text: 'P60s for each tax year in your qualifying period' },
      { id: 'bank', text: '6 months of bank statements showing salary payments' },
      { id: 'travel', text: 'Full travel history — list of all trips outside the UK with departure and return dates' },
      { id: 'biometric', text: 'Biometric enrolment appointment (£19.20 — book separately at UKVCAS)' },
      { id: 'form', text: 'Completed SET(O) application form (submitted online via GOV.UK)' },
    ],
  },
  'family': {
    note: null,
    items: [
      { id: 'passport', text: 'Valid passport or travel document (not expired)' },
      { id: 'status', text: 'Evidence of current immigration status (eVisa or BRP)' },
      { id: 'lituk', text: 'Life in the UK test pass notification letter (with pass reference number)' },
      { id: 'b1', text: 'B1 English language test certificate (Trinity GESE, IELTS Life Skills, or LANGUAGECERT) or exemption evidence' },
      { id: 'marriage', text: 'Marriage certificate or civil partnership certificate' },
      { id: 'cohabitation', text: 'Evidence of cohabitation — at least 2 different types (utility bills, council tax, bank statements, GP registration, all in both names or at same address)' },
      { id: 'financial', text: 'Financial evidence — proof that sponsor meets income requirement (currently £29,000/year)' },
      { id: 'sponsor-payslips', text: 'Sponsor\'s 6 months of payslips or employment letter' },
      { id: 'bank', text: '6 months of bank statements (joint or individual)' },
      { id: 'travel', text: 'Full travel history with departure and return dates' },
      { id: 'biometric', text: 'Biometric enrolment appointment (£19.20 — book at UKVCAS)' },
      { id: 'form', text: 'Completed SET(M) form (submitted online via GOV.UK)' },
    ],
  },
  'long-residence': {
    note: null,
    items: [
      { id: 'passports', text: 'All passports held during the 10-year period (expired passports required)' },
      { id: 'leave', text: 'Evidence of lawful leave for the entire 10-year period (all visa documents, BRPs, entry clearance vignettes)' },
      { id: 'lituk', text: 'Life in the UK test pass notification letter (with pass reference number)' },
      { id: 'b1', text: 'B1 English language test certificate or exemption evidence' },
      { id: 'continuous', text: 'Evidence of continuous residence spanning all 10 years (utility bills, council tax, bank statements, employment records, P60s, NHS registration)' },
      { id: 'travel', text: 'Full travel history for the entire 10-year period' },
      { id: 'biometric', text: 'Biometric enrolment appointment (£19.20 — book at UKVCAS)' },
      { id: 'form', text: 'Completed SET(LR) form (submitted online via GOV.UK)' },
    ],
  },
  'global-talent': {
    note: null,
    items: [
      { id: 'passport', text: 'Valid passport or travel document (not expired)' },
      { id: 'status', text: 'Evidence of current immigration status (eVisa or BRP)' },
      { id: 'lituk', text: 'Life in the UK test pass notification letter (with pass reference number)' },
      { id: 'b1', text: 'B1 English language test certificate or exemption evidence' },
      { id: 'endorsement', text: 'Evidence of endorsement or exceptional talent relevant to your field' },
      { id: 'work', text: 'Evidence of work and achievements during qualifying period' },
      { id: 'travel', text: 'Full travel history with departure and return dates' },
      { id: 'biometric', text: 'Biometric enrolment appointment (£19.20 — book at UKVCAS)' },
      { id: 'form', text: 'Completed SET(O) form (submitted online via GOV.UK)' },
    ],
  },
  'ancestry': {
    note: null,
    items: [
      { id: 'passport', text: 'Valid passport or travel document (not expired)' },
      { id: 'status', text: 'Evidence of current immigration status (eVisa or BRP)' },
      { id: 'lituk', text: 'Life in the UK test pass notification letter (with pass reference number)' },
      { id: 'b1', text: 'B1 English language test certificate or exemption evidence' },
      { id: 'ancestry', text: 'Evidence of ancestry — birth certificates showing relationship to UK-born grandparent' },
      { id: 'work', text: 'Evidence of working in the UK throughout qualifying period' },
      { id: 'payslips', text: '6 months of payslips or employment letters' },
      { id: 'travel', text: 'Full travel history with departure and return dates' },
      { id: 'biometric', text: 'Biometric enrolment appointment (£19.20 — book at UKVCAS)' },
      { id: 'form', text: 'Completed SET(O) form (submitted online via GOV.UK)' },
    ],
  },
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ILRChecklistClient() {
  const [selectedVisa, setSelectedVisa] = useState(null)
  const [checked, setChecked] = useState({})

  const checklist = selectedVisa ? CHECKLISTS[selectedVisa] : null
  const visaType = VISA_TYPES.find(v => v.id === selectedVisa)

  const { checkedCount, totalCount } = useMemo(() => {
    if (!checklist) return { checkedCount: 0, totalCount: 0 }
    const total = checklist.items.length
    const done = checklist.items.filter(item => checked[item.id]).length
    return { checkedCount: done, totalCount: total }
  }, [checklist, checked])

  function toggleItem(id) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function handleVisaChange(id) {
    setSelectedVisa(id)
    setChecked({})
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          ILR Document Checklist
        </h1>
        <p className="text-ink-muted text-sm leading-relaxed">
          Select your visa type to get a personalised, interactive checklist of everything you
          need for your Indefinite Leave to Remain application.
        </p>
      </div>

      {/* Visa selector */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-6">
        <fieldset>
          <legend className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
            <ClipboardCheck size={16} className="text-brand-400" />
            What is your visa type?
          </legend>
          <div className="grid gap-2">
            {VISA_TYPES.map(vt => (
              <label
                key={vt.id}
                className={clsx(
                  'flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                  'min-h-[44px]',
                  selectedVisa === vt.id
                    ? 'border-brand-500 bg-brand-900'
                    : 'border-border bg-raised hover:border-brand-400'
                )}
              >
                <input
                  type="radio"
                  name="visaType"
                  value={vt.id}
                  checked={selectedVisa === vt.id}
                  onChange={() => handleVisaChange(vt.id)}
                  className="mt-0.5 accent-brand-500 w-4 h-4 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className={clsx(
                    'text-sm font-medium',
                    selectedVisa === vt.id ? 'text-brand-400' : 'text-ink'
                  )}>
                    {vt.label}
                  </span>
                  <p className="text-xs text-ink-muted mt-0.5">Application form: {vt.form}</p>
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Checklist */}
      <AnimatePresence>
        {checklist && (
          <motion.div
            key={selectedVisa}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Progress + print */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {checkedCount} of {totalCount} items checked
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    {checkedCount === totalCount
                      ? 'All items checked — ready to apply!'
                      : `${totalCount - checkedCount} remaining`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border',
                    'bg-raised hover:bg-brand-900 hover:border-brand-500/50 transition-colors',
                    'text-sm text-ink-muted hover:text-brand-400 min-h-[44px]'
                  )}
                >
                  <Printer size={15} />
                  Print
                </button>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-raised rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%`,
                    backgroundColor: checkedCount === totalCount ? '#22d07a' : '#3381ff',
                  }}
                />
              </div>
            </div>

            {/* Note if any */}
            {checklist.note && (
              <div className="flex items-start gap-2.5 p-4 bg-brand-900 border border-brand-500/20 rounded-xl">
                <Info size={15} className="text-brand-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-ink-muted">{checklist.note}</p>
              </div>
            )}

            {/* Checklist items */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {checklist.items.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className={clsx(
                    'w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors',
                    'hover:bg-raised min-h-[44px]',
                    idx < checklist.items.length - 1 && 'border-b border-border',
                    checked[item.id] && 'bg-success/5'
                  )}
                >
                  {checked[item.id]
                    ? <CheckSquare size={18} className="text-success flex-shrink-0 mt-0.5" />
                    : <Square size={18} className="text-ink-muted flex-shrink-0 mt-0.5" />
                  }
                  <span className={clsx(
                    'text-sm leading-relaxed',
                    checked[item.id] ? 'text-ink-muted line-through' : 'text-ink'
                  )}>
                    {item.text}
                  </span>
                </button>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-2.5 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <AlertCircle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  This is a guide only. Always verify the current document requirements on GOV.UK
                  before submitting your application. Requirements may change.
                </p>
                <a
                  href="https://www.gov.uk/indefinite-leave-to-remain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs text-brand-400 hover:text-brand-300 transition-colors"
                >
                  Check requirements on GOV.UK
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Related */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h2 className="text-base font-display font-bold text-ink mb-3">Related tools</h2>
              <div className="space-y-2">
                {[
                  { href: '/ilr-calculator', label: 'ILR eligibility calculator — your date and cost estimate' },
                  { href: '/absence-calculator', label: 'Absence calculator — check the 180-day rule' },
                  { href: '/practice', label: 'Prepare for the Life in the UK test — free' },
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
        )}
      </AnimatePresence>

      {!checklist && (
        <div className="bg-card rounded-2xl border border-border p-6 text-center">
          <ClipboardCheck size={32} className="text-ink-faint mx-auto mb-3" />
          <p className="text-ink-muted text-sm">
            Select your visa type above to see your personalised document checklist.
          </p>
        </div>
      )}
    </div>
  )
}
