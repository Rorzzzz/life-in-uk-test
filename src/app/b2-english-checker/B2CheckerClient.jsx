'use client'

import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

// Rules verified 2026-11-05 against HC 1691 (explanatory memorandum paras 5.59–5.62,
// 6.3; rule text APP KOLL2–7, APP EL1), the GOV.UK SELT guidance (updated 2 Nov 2026)
// and the approved SELT list, and gov.uk/english-language/exemptions. Family-route ILR
// (Appendix FM E-ILRP.1.6 / E-ILRPT.1.5) uses Appendix KoLL, which HC 1691 raises to B2.
const B2_DATE = new Date('2027-03-26T00:00:00')

const ROUTES = [
  { value: 'partner', label: 'Spouse or partner (family route)', b2: true },
  { value: 'parent', label: 'Parent (family route)', b2: true },
  { value: 'skilled-worker', label: 'Skilled Worker (incl. Health and Care)', b2: true },
  { value: 'dependant', label: 'Dependant partner or child of a main applicant', b2: true },
  { value: 'global-talent', label: 'Global Talent', b2: true },
  { value: 'scale-up', label: 'Scale-up', b2: true },
  { value: 'innovator-founder', label: 'Innovator Founder', b2: true },
  { value: 'uk-ancestry', label: 'UK Ancestry', b2: true },
  { value: 'minister-of-religion', label: 'Minister of Religion (T2)', b2: true },
  { value: 'overseas-business', label: 'Representative of an Overseas Business', b2: true },
  { value: 'sportsperson', label: 'International Sportsperson', b2: true },
  { value: 'long-residence', label: 'Long Residence (10 years)', b2: true },
  { value: 'private-life', label: 'Private Life', b2: true },
  { value: 'settlement-family-life', label: 'Settlement Family Life', b2: true },
  { value: 'bereaved-partner', label: 'Bereaved Partner', b2: true },
  { value: 'child-relative', label: 'Child Relative (Sponsors with Protection)', b2: true },
  { value: 'other', label: 'Other / not sure', b2: null },
]

const EXEMPT_NATIONALITIES = [
  'Antigua and Barbuda', 'Australia', 'The Bahamas', 'Barbados', 'Belize', 'A British overseas territory',
  'Canada', 'Dominica', 'Grenada', 'Guyana', 'Jamaica', 'Malta', 'New Zealand', 'St Kitts and Nevis',
  'St Lucia', 'St Vincent and the Grenadines', 'Trinidad and Tobago', 'USA',
]

const B1_TESTS = [
  'IELTS Life Skills B1 (speaking and listening)',
  'PTE Home B1 (speaking and listening)',
  'Trinity GESE Grade 5 (speaking and listening)',
  'LanguageCert International ESOL SELT B1 (speaking and listening)',
]
const B2_TESTS = [
  'IELTS for UKVI: 5.5 in all four skills',
  'PTE Academic UKVI: 59 in all four skills',
  'LanguageCert Academic or General SELT: 60 in all four skills',
  'LanguageCert International ESOL SELT B2: 33/50 in all four skills',
  'Trinity ISE II: pass in all four skills',
]

function fmt(d) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function daysUntilB2() {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  return Math.ceil((B2_DATE - today) / 86400000)
}

function decide({ route, date, age65, under18, condition, nationality, degree }) {
  const r = ROUTES.find(x => x.value === route)
  if (!r || !date) return null
  const applyDate = new Date(date + 'T00:00:00')
  if (isNaN(applyDate)) return null
  const afterB2 = applyDate >= B2_DATE

  if (age65) return { kind: 'exempt', reason: 'You are aged 65 or over, so you do not need to meet the English language requirement.' }
  if (under18) return { kind: 'exempt', reason: 'Applicants under 18 on the date of application do not need to meet the English language requirement.' }
  if (condition) return { kind: 'exempt', reason: 'A long-term physical or mental condition can exempt you. You need an exemption form completed by a doctor.' }
  if (nationality) return { kind: 'exempt', reason: `Nationals of ${nationality === 'A British overseas territory' ? 'a British overseas territory' : nationality} are exempt. Your passport is usually the evidence.` }
  if (degree) return { kind: 'degree', afterB2 }
  if (r.b2 === null) return { kind: 'unsure', afterB2 }
  return afterB2 ? { kind: 'b2', route: r.label } : { kind: 'b1-now', route: r.label, b2Route: true }
}

function TestList({ tests }) {
  return (
    <ul className="text-sm text-ink-muted space-y-1 mt-2">
      {tests.map(t => <li key={t} className="flex gap-2"><span className="text-brand-400">•</span><span>{t}</span></li>)}
    </ul>
  )
}

function Result({ res }) {
  const days = daysUntilB2()
  const deadline = days > 0 && (
    <div className="bg-xp/10 border border-xp/30 rounded-xl p-3 mt-3">
      <p className="text-sm text-ink">
        ⏳ <strong>{days} days</strong> until 26 March 2027. Applications made before then still need only B1.
      </p>
    </div>
  )
  const box = (tone, title, children) => (
    <div className="mt-5 bg-card border border-border rounded-2xl p-5" aria-live="polite">
      <p className={clsx('text-xl font-display font-bold mb-2', tone)}>{title}</p>
      {children}
      <p className="text-xs text-ink-muted mt-4 leading-relaxed">
        General information based on GOV.UK and Statement of Changes HC 1691, not legal advice. Check GOV.UK before you apply or book a test.
      </p>
    </div>
  )

  if (res.kind === 'exempt') return box('text-success', '✅ You are probably exempt',
    <p className="text-sm text-ink-muted leading-relaxed">{res.reason} You still need to pass the <Link href="/mock-test" className="text-brand-400 underline">Life in the UK test</Link> for ILR unless you are also exempt from that.</p>)

  if (res.kind === 'degree') return box('text-success', '✅ Your degree may meet the requirement',
    <p className="text-sm text-ink-muted leading-relaxed">A degree taught or researched in English can meet the English requirement instead of a test. You need it confirmed by Ecctis (the Home Office&apos;s qualification assessment provider). Check GOV.UK that your degree is accepted at the level you need{res.afterB2 ? ' (B2 for many routes from 26 March 2027)' : ''}.</p>)

  if (res.kind === 'unsure') return box('text-brand-400', 'ℹ️ It depends on your route',
    <p className="text-sm text-ink-muted leading-relaxed">From 26 March 2027 the B2 rule applies to ILR on almost every route that has an English requirement, including the family route, Skilled Worker, Global Talent and UK Ancestry. {res.afterB2 ? 'If your route is one of them, you will need B2.' : 'If you apply before 26 March 2027, B1 is still enough on every route.'} Read the <Link href="/articles/b2-english-requirement-2027" className="text-brand-400 underline">full list of affected routes</Link>.</p>)

  if (res.kind === 'b2') return box('text-danger', '⚠️ You need B2 English',
    <>
      <p className="text-sm text-ink-muted leading-relaxed">You plan to apply for ILR on the <strong className="text-ink">{res.route}</strong> route on or after 26 March 2027. The rule is B2 in speaking and listening, but every B2 test on the Home Office list today is a four-skill test.</p>
      {deadline}
      <p className="text-sm text-ink-muted leading-relaxed mt-3">Your test must be passed in the <strong className="text-ink">2 years before you apply</strong>. An older B1 test, or a visa granted on B1 English, will not count.</p>
      <p className="text-sm font-semibold text-ink mt-3">B2 tests that count:</p>
      <TestList tests={B2_TESTS} />
      <p className="text-sm text-ink-muted leading-relaxed mt-3"><strong className="text-ink">Can&apos;t reach B2?</strong> The new rules accept evidence of at least 75 guided learning hours (not self-study) in the 12 months before you apply, plus a teacher&apos;s view that you are unlikely to reach B2 with more study.</p>
      <div className="flex flex-wrap gap-2 mt-4">
        <Link href="/b2-practice" className="px-4 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-semibold">Start free B2 practice →</Link>
        <Link href="/articles/b2-english-test" className="px-4 py-2.5 bg-raised border border-border rounded-xl text-sm text-ink">Compare B2 tests</Link>
      </div>
    </>)

  return box('text-success', '✅ You need B1 English (for now)',
    <>
      <p className="text-sm text-ink-muted leading-relaxed">You plan to apply for ILR on the <strong className="text-ink">{res.route}</strong> route before 26 March 2027, so B1 speaking and listening is enough. If your application slips to 26 March 2027 or later, you will need B2.</p>
      {deadline}
      <p className="text-sm font-semibold text-ink mt-3">B1 tests that count:</p>
      <TestList tests={B1_TESTS} />
      <div className="flex flex-wrap gap-2 mt-4">
        <Link href="/b1-practice" className="px-4 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-semibold">Free B1 practice →</Link>
        <Link href="/mock-test" className="px-4 py-2.5 bg-raised border border-border rounded-xl text-sm text-ink">Life in the UK mock tests</Link>
      </div>
    </>)
}

export default function B2CheckerClient() {
  const [form, setForm] = useState({ route: '', date: '', age65: false, under18: false, condition: false, nationality: '', degree: false })
  const [submitted, setSubmitted] = useState(false)
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setSubmitted(false) }
  const res = submitted ? decide(form) : null
  const ready = form.route && form.date

  const field = 'w-full bg-raised border border-border rounded-xl px-4 py-3 text-ink text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'

  return (
    <div className="max-w-2xl mx-auto px-4 py-2">
      <form className="bg-card border border-border rounded-2xl p-5 space-y-5" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
        <div>
          <label htmlFor="route" className="block text-sm font-semibold text-ink mb-2">1. What visa route are you settling on?</label>
          <select id="route" value={form.route} onChange={e => set('route', e.target.value)} className={field}>
            <option value="">Choose your route</option>
            {ROUTES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="apply-date" className="block text-sm font-semibold text-ink mb-2">2. When will you apply for ILR?</label>
          <input id="apply-date" type="date" value={form.date} onChange={e => set('date', e.target.value)} className={field} />
          <p className="text-xs text-ink-muted mt-1">An estimate is fine. It is the date you apply that counts, not the decision date.</p>
        </div>
        <fieldset>
          <legend className="block text-sm font-semibold text-ink mb-2">3. Do any of these apply to you?</legend>
          <div className="space-y-2">
            {[['age65', 'I am 65 or over'], ['under18', 'The applicant is under 18'], ['condition', 'I have a long-term physical or mental condition'], ['degree', 'I have a degree taught or researched in English']].map(([k, l]) => (
              <label key={k} className="flex items-start gap-3 cursor-pointer min-h-[44px]">
                <input type="checkbox" checked={form[k]} onChange={e => set(k, e.target.checked)} className="mt-1 w-5 h-5 flex-shrink-0 accent-brand-500" />
                <span className="text-sm text-ink-muted leading-relaxed">{l}</span>
              </label>
            ))}
            <label htmlFor="nationality" className="block text-sm text-ink-muted mt-2 mb-1">My nationality is on the exempt list:</label>
            <select id="nationality" value={form.nationality} onChange={e => set('nationality', e.target.value)} className={field}>
              <option value="">No / none of these</option>
              {EXEMPT_NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </fieldset>
        <button type="submit" disabled={!ready} className={clsx('w-full py-4 rounded-2xl font-bold text-base transition-colors min-h-[44px]', ready ? 'bg-brand-500 hover:bg-brand-600 text-white' : 'bg-raised text-ink-muted cursor-not-allowed')}>
          Check my requirement
        </button>
      </form>

      {res && <Result res={res} />}
      {!res && <p className="text-sm text-ink-muted mt-4 text-center">Choose your route and ILR date to see whether you need B1 or B2.</p>}
    </div>
  )
}
