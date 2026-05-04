'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import {
  ShieldCheck,
  ShieldX,
  ChevronRight,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  Info,
} from 'lucide-react'

// ─── Exempt nationalities ─────────────────────────────────────────────────────
const EXEMPT_NATIONALITIES = [
  'Antigua and Barbuda', 'Australia', 'The Bahamas', 'Barbados', 'Belize',
  'British overseas territories', 'Canada', 'Dominica', 'Grenada', 'Guyana',
  'Jamaica', 'Ireland', 'Malta', 'New Zealand', 'St Kitts and Nevis',
  'St Lucia', 'St Vincent and the Grenadines', 'Trinidad and Tobago', 'USA',
]

const ALL_NATIONALITIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'The Bahamas',
  'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin',
  'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei',
  'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada',
  'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
  'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'DR Congo', 'Ecuador',
  'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia',
  'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana',
  'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti',
  'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
  'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
  'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
  'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
  'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia',
  'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal',
  'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea',
  'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama',
  'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar', 'Romania', 'Russia', 'Rwanda', 'St Kitts and Nevis', 'St Lucia',
  'St Vincent and the Grenadines', 'San Marino', 'Saudi Arabia', 'Senegal',
  'Serbia', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Somalia',
  'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan',
  'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
  'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
  'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'USA', 'Uruguay',
  'Uzbekistan', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
  'British overseas territories', 'Other',
]

// ─── Result component ─────────────────────────────────────────────────────────
function ResultCard({ exempt, exemptionType, note, onRestart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className={clsx(
        'rounded-2xl border p-5',
        exempt ? 'bg-success/10 border-success/30' : 'bg-brand-900 border-brand-500/30'
      )}>
        <div className="flex items-start gap-3">
          {exempt
            ? <ShieldCheck size={28} className="text-success flex-shrink-0 mt-0.5" />
            : <ShieldX size={28} className="text-brand-400 flex-shrink-0 mt-0.5" />
          }
          <div>
            <p className={clsx(
              'font-display font-bold text-xl mb-1',
              exempt ? 'text-success' : 'text-ink'
            )}>
              {exempt ? 'You appear to be exempt' : 'You need to take the test'}
            </p>
            <p className="text-ink-muted text-sm leading-relaxed">{exemptionType}</p>
            {note && (
              <div className="mt-3 flex items-start gap-2 p-3 bg-raised rounded-xl border border-border">
                <Info size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-ink-muted leading-relaxed">{note}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {!exempt && (
        <div className="bg-card rounded-2xl border border-border p-5">
          <h2 className="text-base font-display font-bold text-ink mb-3">Start practising — free</h2>
          <div className="space-y-2">
            {[
              { href: '/practice', label: 'Practice questions — adaptive, no login' },
              { href: '/exam', label: 'Free mock exam — 24 questions, timed' },
              { href: '/articles/how-to-pass-the-life-in-the-uk-test-first-time', label: 'How to pass first time — study guide' },
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
      )}

      {exempt && (
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="space-y-2">
            <Link
              href="/articles/life-in-the-uk-test-exemptions"
              className={clsx(
                'flex items-center justify-between gap-3 p-3 rounded-xl border border-border',
                'bg-raised hover:border-brand-400 transition-colors group min-h-[44px]'
              )}
            >
              <span className="text-sm text-ink group-hover:text-brand-400 transition-colors">
                Full exemptions guide — all categories explained
              </span>
              <ArrowRight size={16} className="text-ink-muted flex-shrink-0 group-hover:text-brand-400 transition-colors" />
            </Link>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 p-3 bg-raised rounded-xl border border-border text-xs text-ink-muted">
        <Info size={13} className="text-brand-400 flex-shrink-0 mt-0.5" />
        This is a guide only. Always verify your exemption status on GOV.UK before submitting an immigration application.
      </div>

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

// ─── Question step component ──────────────────────────────────────────────────
function QuestionStep({ question, options, onAnswer, step, total }) {
  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.22 }}
    >
      {/* Progress */}
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

      <h2 className="text-lg font-display font-bold text-ink mb-5">{question}</h2>

      <div className="space-y-2">
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onAnswer(opt.value)}
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
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ExemptWizardClient() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [natSearch, setNatSearch] = useState('')

  const TOTAL_STEPS = 5

  function resolve(exempt, exemptionType, note = null) {
    setResult({ exempt, exemptionType, note })
  }

  function handleQ1(value) {
    setAnswers(a => ({ ...a, age: value }))
    if (value === 'under18') {
      resolve(true, 'You are under 18. Under-18s are automatically exempt from the Life in the UK test. You do not need to take the test or prove your English language ability.')
    } else if (value === 'over65') {
      resolve(true, 'You are aged 65 or over. People aged 65+ are automatically exempt from the Life in the UK test and the English language requirement. No additional evidence is required — your date of birth on the application is sufficient.')
    } else {
      setStep(2)
    }
  }

  function handleQ2(value) {
    setAnswers(a => ({ ...a, nationality: value }))
    if (value === 'ireland') {
      resolve(
        true,
        'Irish citizens are exempt from the Life in the UK test for both ILR/settlement and citizenship applications. Ireland has a special arrangement due to the Common Travel Area.',
        'Different rules apply depending on whether you are applying for ILR or citizenship. Always verify your specific situation at GOV.UK.'
      )
    } else if (EXEMPT_NATIONALITIES.includes(value) && value !== 'Ireland') {
      resolve(
        true,
        `Nationals of ${value} are exempt from the Life in the UK test. This nationality exemption applies under the Common Travel Area or bilateral arrangements with the UK.`,
        'Verify this exemption applies to your specific application type (ILR or citizenship) at GOV.UK before submitting.'
      )
    } else {
      setStep(3)
    }
  }

  function handleQ3(value) {
    setAnswers(a => ({ ...a, visa: value }))
    if (value === 'refugee') {
      resolve(
        true,
        'People on Refugee Leave, Humanitarian Protection, or Discretionary Leave are exempt from the Life in the UK test. Your protection status grants this exemption.',
        'Ensure you check GOV.UK for the specific evidence needed when submitting your application.'
      )
    } else if (value === 'domestic-violence') {
      resolve(
        true,
        'Victims of domestic violence who are partners of British citizens may be exempt from the Life in the UK test. This exemption applies on compassionate grounds.',
        'You will need to provide supporting evidence of the domestic violence and your circumstances. Verify this exemption at GOV.UK.'
      )
    } else {
      setStep(4)
    }
  }

  function handleQ4(value) {
    setAnswers(a => ({ ...a, medical: value }))
    if (value === 'yes') {
      resolve(
        true,
        'You may be exempt from the Life in the UK test on medical grounds. A long-term physical or mental condition that prevents you from taking the test qualifies for exemption.',
        'You will need a letter from a GP or specialist confirming your condition, how long it is expected to last (12+ months), and how it prevents you from taking the test. This evidence must be submitted with your application.'
      )
    } else {
      setStep(5)
    }
  }

  function handleQ5(value) {
    if (value === 'yes') {
      resolve(
        false,
        'You need to take the Life in the UK test. A degree taught in English may exempt you from the separate B1 English test requirement — but it does NOT exempt you from the Life in the UK test itself.',
        'Check GOV.UK for the exact evidence needed to claim the degree-based English exemption for B1. The Life in the UK test is a separate requirement that you must pass.'
      )
    } else {
      resolve(
        false,
        'Based on your answers, you are not exempt from the Life in the UK test. You need to pass it before applying for ILR or British citizenship. Start practising free below — no login needed.'
      )
    }
  }

  function restart() {
    setStep(1)
    setAnswers({})
    setResult(null)
    setNatSearch('')
  }

  const filteredNats = natSearch.length > 1
    ? ALL_NATIONALITIES.filter(n => n.toLowerCase().includes(natSearch.toLowerCase()))
    : ALL_NATIONALITIES

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          Am I Exempt from the Life in the UK Test?
        </h1>
        <p className="text-ink-muted text-sm leading-relaxed">
          Answer a few questions to find out if you need to take the test — or if you qualify for
          an exemption. Takes about 60 seconds.
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5">
        <AnimatePresence mode="wait">
          {result ? (
            <ResultCard key="result" {...result} onRestart={restart} />
          ) : step === 1 ? (
            <QuestionStep
              key="q1"
              step={1}
              total={TOTAL_STEPS}
              question="How old are you?"
              options={[
                { value: 'under18', label: 'Under 18' },
                { value: '18-64', label: '18 to 64' },
                { value: 'over65', label: '65 or over' },
              ]}
              onAnswer={handleQ1}
            />
          ) : step === 2 ? (
            <motion.div
              key="q2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
            >
              {/* Progress */}
              <div className="flex items-center gap-2 mb-5">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div
                    key={i}
                    className={clsx(
                      'h-1.5 flex-1 rounded-full transition-colors',
                      i < 2 ? 'bg-brand-500' : 'bg-raised'
                    )}
                  />
                ))}
                <span className="text-xs text-ink-muted font-mono ml-1">2/{TOTAL_STEPS}</span>
              </div>

              <h2 className="text-lg font-display font-bold text-ink mb-2">What is your nationality?</h2>
              <p className="text-xs text-ink-muted mb-3">Some nationalities are exempt from the test.</p>

              <input
                type="text"
                placeholder="Type to search..."
                value={natSearch}
                onChange={e => setNatSearch(e.target.value)}
                className={clsx(
                  'w-full h-11 px-3 rounded-xl border border-border bg-raised text-ink text-sm mb-3',
                  'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'
                )}
              />

              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {filteredNats.slice(0, 30).map(nat => (
                  <button
                    key={nat}
                    type="button"
                    onClick={() => handleQ2(nat)}
                    className={clsx(
                      'w-full text-left px-4 py-2.5 rounded-xl border border-border bg-raised',
                      'hover:border-brand-400 hover:bg-brand-900 transition-colors',
                      'text-sm text-ink font-medium min-h-[44px]',
                      'flex items-center justify-between gap-3',
                      EXEMPT_NATIONALITIES.includes(nat) && 'border-success/30'
                    )}
                  >
                    <span>{nat}</span>
                    {EXEMPT_NATIONALITIES.includes(nat) && (
                      <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-lg flex-shrink-0">
                        Exempt
                      </span>
                    )}
                  </button>
                ))}
                {filteredNats.length > 30 && (
                  <p className="text-xs text-ink-muted text-center py-2">
                    Type more to narrow results ({filteredNats.length} shown)
                  </p>
                )}
              </div>
            </motion.div>
          ) : step === 3 ? (
            <QuestionStep
              key="q3"
              step={3}
              total={TOTAL_STEPS}
              question="What visa are you currently on?"
              options={[
                { value: 'skilled-worker', label: 'Skilled Worker / Tier 2' },
                { value: 'family', label: 'Family visa (spouse / partner)' },
                { value: 'refugee', label: 'Refugee / Humanitarian Protection / Discretionary Leave' },
                { value: 'domestic-violence', label: 'Victim of domestic violence (partner of British citizen)' },
                { value: 'other', label: 'Other / Not sure' },
              ]}
              onAnswer={handleQ3}
            />
          ) : step === 4 ? (
            <QuestionStep
              key="q4"
              step={4}
              total={TOTAL_STEPS}
              question="Do you have a long-term physical or mental condition that prevents you from taking the test?"
              options={[
                { value: 'yes', label: 'Yes — long-term condition (expected to last 12+ months)' },
                { value: 'no', label: 'No' },
              ]}
              onAnswer={handleQ4}
            />
          ) : step === 5 ? (
            <QuestionStep
              key="q5"
              step={5}
              total={TOTAL_STEPS}
              question="Was your degree taught and assessed entirely in English?"
              options={[
                { value: 'yes', label: 'Yes — my degree was entirely in English' },
                { value: 'no', label: 'No / I do not have a degree' },
              ]}
              onAnswer={handleQ5}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
