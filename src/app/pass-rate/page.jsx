import Link from 'next/link'

export const metadata = {
  title: 'Life in the UK Test Pass Rate — Statistics & Facts',
  description: 'Life in the UK test pass rate statistics. How many people pass first time, common reasons for failure, and how to improve your chances.',
  alternates: { canonical: 'https://passtheuktest.co.uk/pass-rate' },
}

export default function PassRatePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">Life in the UK Test Pass Rates</h1>
      <p className="text-ink-muted text-base mb-8">Statistics and what they mean for your preparation.</p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {[
          { value: '~67%',     label: 'First-attempt pass rate', colour: '#22d07a' },
          { value: '~33%',     label: 'Fail on first attempt',   colour: '#ff4d6d' },
          { value: '£50',      label: 'Cost per attempt',        colour: '#f59e0b' },
          { value: '75%',      label: 'Pass mark required',      colour: '#3381ff' },
        ].map(({ value, label, colour }) => (
          <div key={label} className="bg-card rounded-2xl p-4 text-center">
            <p className="font-display font-bold text-2xl mb-1" style={{ color: colour }}>{value}</p>
            <p className="text-xs text-ink-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-semibold text-ink mb-2">What is the pass rate?</h2>
          <p className="text-base text-ink-muted leading-relaxed">
            Approximately 67% of candidates pass the Life in the UK test on their first attempt. This means around 1 in 3 people fail. The UK Home Office does not publish official pass rate statistics, but figures from test preparation organisations consistently suggest a first-attempt pass rate of around 65–70%.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-semibold text-ink mb-2">Why do people fail?</h2>
          <ul className="text-base text-ink-muted space-y-2">
            {[
              'Not reading the whole handbook (especially arts, sport, and religion chapters)',
              'Confusing specific dates — the most commonly missed question type',
              'Insufficient practice — reading the book without doing practice questions',
              'Mistaking "Great Britain" for "United Kingdom" and vice versa',
              'Not knowing inventors and their discoveries',
              'Missing questions about the House of Lords vs Commons',
            ].map(reason => (
              <li key={reason} className="flex items-start gap-2">
                <span className="text-danger flex-shrink-0">✗</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-semibold text-ink mb-2">How to increase your chances</h2>
          <ul className="text-base text-ink-muted space-y-2">
            {[
              'Read every chapter of the official handbook at least twice',
              'Do 200+ practice questions before your test date',
              'Score 90%+ on multiple mock exams before booking',
              'Focus extra time on Chapter 3 (History) — it has the most questions',
              'Memorise key dates using our cheat sheet',
              'Practice under timed conditions to simulate the real test',
            ].map(tip => (
              <li key={tip} className="flex items-start gap-2">
                <span className="text-success flex-shrink-0">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Link href="/practice" className="py-3 bg-brand-500 text-white rounded-xl font-semibold text-center hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
          Start Practising
        </Link>
        <Link href="/how-to-pass" className="py-3 bg-card text-ink rounded-xl font-semibold text-center hover:bg-raised active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
          Study Guide
        </Link>
      </div>
    </div>
  )
}
