'use client'

import { useState } from 'react'
import Link from 'next/link'

function fmt(d) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function addMonths(date, months) {
  const d = new Date(date)
  const target = d.getMonth() + months
  d.setMonth(target)
  return d
}

export default function CitizenshipDateClient() {
  const [ilrDate, setIlrDate] = useState('')
  const [spouse, setSpouse] = useState(false)

  let result = null
  if (ilrDate) {
    const ilr = new Date(ilrDate + 'T00:00:00')
    if (!isNaN(ilr)) {
      // Spouse/civil partner of a British citizen: no 12-month wait after ILR.
      // Everyone else: must hold ILR for 12 months before applying.
      const earliest = spouse ? ilr : addMonths(ilr, 12)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const eligibleNow = earliest <= today
      result = { earliest, eligibleNow }
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="bg-card border border-border rounded-2xl p-5">
        <label htmlFor="ilr-date" className="block text-sm font-semibold text-ink mb-2">
          When did you get Indefinite Leave to Remain (ILR)?
        </label>
        <input
          id="ilr-date"
          type="date"
          value={ilrDate}
          onChange={e => setIlrDate(e.target.value)}
          className="w-full bg-raised border border-border rounded-xl px-4 py-3 text-ink text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 mb-4"
        />

        <label className="flex items-start gap-3 cursor-pointer mb-2">
          <input
            type="checkbox"
            checked={spouse}
            onChange={e => setSpouse(e.target.checked)}
            className="mt-1 w-5 h-5 flex-shrink-0 accent-brand-500"
          />
          <span className="text-sm text-ink-muted leading-relaxed">
            I am married to, or in a civil partnership with, a <strong className="text-ink">British citizen</strong>
          </span>
        </label>
      </div>

      {result && (
        <div className="mt-5 bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-ink-muted mb-1">You can apply for British citizenship from</p>
          <p className="text-2xl font-display font-bold text-ink mb-3">{fmt(result.earliest)}</p>
          {result.eligibleNow ? (
            <div className="bg-success/10 border border-success/30 rounded-xl p-3">
              <p className="text-sm text-success font-semibold">✓ You may already be eligible to apply today.</p>
            </div>
          ) : (
            <div className="bg-brand-500/10 border border-brand-500/30 rounded-xl p-3">
              <p className="text-sm text-ink-muted">
                {spouse
                  ? 'As the spouse of a British citizen there is no 12-month wait after ILR — you can apply as soon as you hold ILR.'
                  : 'Most applicants must hold ILR for 12 months before applying — that is why the date above is 12 months after your ILR grant.'}
              </p>
            </div>
          )}
          <p className="text-xs text-ink-muted mt-3 leading-relaxed">
            You must also meet the residence, absence (no more than 90 days outside the UK in the 12 months before applying), English language and good character requirements.{' '}
            <Link href="/good-character-check" className="text-brand-400 hover:text-brand-300 underline">Check good character</Link>{' · '}
            <Link href="/b1-check" className="text-brand-400 hover:text-brand-300 underline">Check B1 English</Link>
          </p>
        </div>
      )}

      {!result && (
        <p className="text-sm text-ink-muted mt-4 text-center">Enter your ILR date to see your earliest citizenship application date.</p>
      )}
    </div>
  )
}
