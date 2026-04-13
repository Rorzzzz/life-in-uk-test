import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'Life in the UK Test Pass Rate 2026 — Statistics & Facts',
  description: 'Around 67% of candidates pass the Life in the UK test first time. Full pass rate statistics, why people fail, and how to make sure you are in the majority.',
  alternates: { canonical: 'https://passtheuktest.co.uk/pass-rate' },
}

export default function PassRatePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Pass Rate', path: '/pass-rate' }]} />
      <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">Life in the UK Test Pass Rate</h1>
      <p className="text-ink-muted text-base mb-8">Around 67% of candidates pass on their first attempt. Here is what the statistics mean and how to make sure you are in the majority.</p>

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
          <h2 className="font-semibold text-ink mb-2">What is the Life in the UK test pass rate?</h2>
          <p className="text-base text-ink-muted leading-relaxed">
            Approximately 67% of candidates pass the Life in the UK test on their first attempt. This means around 1 in 3 people fail and need to retake it. The UK Home Office does not publish official pass rate statistics, but figures from test preparation organisations and industry sources consistently suggest a first-attempt pass rate of 65–70%.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-semibold text-ink mb-2">What the historical data actually shows</h2>
          <p className="text-base text-ink-muted leading-relaxed mb-3">
            The most reliable published figure comes from the period 2005–2009, when the current test format was introduced. According to data cited in academic research and the Wikipedia article on the Life in the UK test, <strong className="text-ink">906,464 tests were taken between 2005 and 2009, with a pass rate of 70.9%</strong>.
          </p>
          <p className="text-base text-ink-muted leading-relaxed mb-3">
            The Home Office does not routinely publish pass rate statistics. Figures obtained through Freedom of Information requests and referenced in parliamentary questions suggest the pass rate has remained broadly stable in the 65–72% range since the test was introduced, with some variation year on year.
          </p>
          <div className="bg-raised rounded-xl p-4 border-l-4 border-brand-500">
            <p className="text-sm font-semibold text-ink mb-1">Key sourced figure</p>
            <p className="text-sm text-ink-muted">70.9% pass rate across 906,464 tests taken between 2005 and 2009 — the only large-scale published dataset for this test.</p>
            <a
              href="https://en.wikipedia.org/wiki/Life_in_the_United_Kingdom_test"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-400 hover:underline mt-1 inline-block"
            >
              Source: Wikipedia — Life in the United Kingdom test →
            </a>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-semibold text-ink mb-2">How does the pass rate compare to the pass mark?</h2>
          <p className="text-base text-ink-muted leading-relaxed mb-3">
            The pass mark is 75% — you need to answer 18 out of 24 questions correctly. Despite this not being an especially high threshold, a third of candidates still fail. This tells you something important: the test is not hard because the questions are tricky — it is hard because the content requires specific factual recall of dates, names, and numbers that general knowledge does not cover.
          </p>
          <p className="text-base text-ink-muted leading-relaxed">
            Candidates who study the official handbook thoroughly and practice with timed mock tests consistently pass at a much higher rate than those who rely on general knowledge or read the handbook only once.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-semibold text-ink mb-2">Why do people fail?</h2>
          <p className="text-base text-ink-muted leading-relaxed mb-3">The most common reasons candidates fail, in order of frequency:</p>
          <ul className="text-base text-ink-muted space-y-2">
            {[
              'Specific dates — the test asks for exact years, not approximate periods',
              'Named individuals — scientists, architects, and artists mentioned in the handbook',
              'Not reading the full handbook — especially arts, sport, and religion sections',
              'Confusing Great Britain with the United Kingdom',
              'Insufficient practice — reading without doing practice questions',
              'Underestimating Chapter 3 (History) — the longest and most question-heavy chapter',
              'Missing questions about Parliament structure — House of Lords vs Commons',
            ].map(reason => (
              <li key={reason} className="flex items-start gap-2">
                <span className="text-danger flex-shrink-0 mt-0.5">✗</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-semibold text-ink mb-2">What happens after failing?</h2>
          <p className="text-base text-ink-muted leading-relaxed">
            If you fail, you can retake the test as many times as needed. There is no limit on attempts and no mandatory waiting period between sittings. Each retake costs £50. Failed attempts are not reported to the Home Office — your visa status is not affected by failing the test. See our full guide on <Link href="/articles/what-happens-if-you-fail-the-life-in-the-uk-test" className="text-brand-400 hover:underline">what happens if you fail</Link>.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-semibold text-ink mb-2">How to be in the 67% who pass first time</h2>
          <ul className="text-base text-ink-muted space-y-2 mb-4">
            {[
              'Read every chapter of the official handbook — not just Chapter 3',
              'Do 200+ practice questions before your test date',
              'Score 90%+ on multiple mock exams before booking — not just 75%',
              'Focus extra time on Chapter 3 (History) — it generates the most questions',
              'Memorise key dates using the cheat sheet — these are the most common fail points',
              'Practice under timed conditions so the 45-minute limit feels comfortable',
              'Never leave a question blank — guess if unsure, there is no penalty',
            ].map(tip => (
              <li key={tip} className="flex items-start gap-2">
                <span className="text-success flex-shrink-0 mt-0.5">✓</span>
                {tip}
              </li>
            ))}
          </ul>
          <p className="text-base text-ink-muted leading-relaxed">
            For a complete preparation strategy, read our guide on <Link href="/articles/how-to-pass-the-life-in-the-uk-test-first-time" className="text-brand-400 hover:underline">how to pass the Life in the UK test first time</Link>.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-semibold text-ink mb-2">How long do most people study before passing?</h2>
          <p className="text-base text-ink-muted leading-relaxed">
            Candidates who pass first time typically study for 2–4 weeks with consistent daily practice. Those who fail often studied for a similar amount of time but used passive methods — reading without testing themselves. The method matters more than the duration. See our guide on <Link href="/articles/how-long-does-it-take-to-study-for-the-life-in-the-uk-test" className="text-brand-400 hover:underline">how long to study for the Life in the UK test</Link>.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-semibold text-ink mb-2">Does the pass rate vary by nationality or background?</h2>
          <p className="text-base text-ink-muted leading-relaxed">
            The Home Office does not publish pass rate breakdowns by nationality, country of origin, or language background. Anecdotally, candidates with stronger prior knowledge of British history — through education or long-term residency — tend to need less preparation time. However, the test is entirely based on the official handbook, which means anyone who studies the right material thoroughly can pass regardless of background.
          </p>
        </div>

      </div>

      <div className="mt-8 bg-raised rounded-2xl p-4 border border-border">
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Sources & references</p>
        <ul className="space-y-2 text-sm text-ink-muted">
          <li>
            <a href="https://en.wikipedia.org/wiki/Life_in_the_United_Kingdom_test" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">Wikipedia — Life in the United Kingdom test</a>
            <span className="text-ink-muted"> — 906,464 tests taken 2005–2009, 70.9% pass rate</span>
          </li>
          <li>
            <a href="https://www.gov.uk/life-in-the-uk-test" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">GOV.UK — Life in the UK test</a>
            <span className="text-ink-muted"> — Official test information, pass mark, booking</span>
          </li>
          <li>
            <a href="https://www.gov.uk/government/publications/life-in-the-united-kingdom-a-guide-for-new-residents" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">Home Office — Life in the United Kingdom: A Guide for New Residents</a>
            <span className="text-ink-muted"> — Official handbook, 3rd edition</span>
          </li>
        </ul>
        <p className="text-xs text-ink-muted mt-3">Last reviewed: April 2026. Pass rate statistics are not officially published by the Home Office. The 70.9% figure reflects 2005–2009 data; current estimates are based on industry sources.</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Link href="/practice" className="py-3 bg-brand-500 text-white rounded-xl font-semibold text-center hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
          Start Practising
        </Link>
        <Link href="/exam" className="py-3 bg-card text-ink border border-border rounded-xl font-semibold text-center hover:bg-raised active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
          Take a Mock Test
        </Link>
      </div>

      <div className="mt-4 flex gap-2 justify-center flex-wrap">
        <Link href="/articles/how-to-pass-the-life-in-the-uk-test-first-time" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">How to Pass</Link>
        <Link href="/cheat-sheet" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Cheat Sheet</Link>
        <Link href="/hardest-questions" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Hardest Questions</Link>
        <Link href="/faq" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">FAQ</Link>
      </div>
    </div>
    </>
  )
}
