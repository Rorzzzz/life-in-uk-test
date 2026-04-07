import Link from 'next/link'

export const metadata = {
  title: 'How to Pass the Life in the UK Test — Study Strategy Guide 2026',
  description: 'Step-by-step guide to passing the Life in the UK test first time. Study plan, common mistakes, test day tips, and how to use practice questions effectively.',
  alternates: { canonical: 'https://passtheuktest.co.uk/how-to-pass' },
}

export default function HowToPassPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Pass the Life in the UK Test',
    description: 'A step-by-step guide to passing the Life in the UK citizenship test first time.',
    step: [
      { '@type': 'HowToStep', name: 'Get the official handbook',    text: 'Buy or borrow "Life in the United Kingdom: A Guide for New Residents" (3rd edition). Read every chapter — all five.' },
      { '@type': 'HowToStep', name: 'Take a baseline practice test', text: 'Do a mock test before you start studying to identify your weak areas.' },
      { '@type': 'HowToStep', name: 'Study chapter by chapter',     text: 'Focus on one chapter at a time. History (Chapter 3) is the longest and hardest — spend the most time here.' },
      { '@type': 'HowToStep', name: 'Practise daily',               text: 'Do at least 20-30 practice questions every day. Use Pass the UK Test\'s adaptive learning to focus on your weak spots.' },
      { '@type': 'HowToStep', name: 'Take mock exams',              text: 'When scoring 90%+ on practice questions, start taking full mock exams (24 questions, 45 minutes).' },
      { '@type': 'HowToStep', name: 'Book when ready',              text: 'Book your test at lifeintheuktestsupport.co.uk when consistently passing mock exams.' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">How to Pass the Life in the UK Test</h1>
        <p className="text-ink-muted text-base mb-8">The complete study strategy — from first read to booking your test.</p>

        <div className="space-y-6">

          {/* Step 1 */}
          <div className="bg-card rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-7 h-7 bg-brand-500/20 text-brand-400 rounded-lg flex items-center justify-center font-bold font-mono text-sm flex-shrink-0">1</span>
              <h2 className="font-display font-bold text-ink">Get the official handbook</h2>
            </div>
            <p className="text-base text-ink-muted leading-relaxed">
              The test is based entirely on <strong className="text-ink">&ldquo;Life in the United Kingdom: A Guide for New Residents&rdquo; (3rd edition)</strong>. Buy it from Amazon or any bookshop — it costs around £12. Read <em>every</em> chapter. Many people skip the arts, sport, or religion sections and then fail because of questions from those chapters.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-card rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-7 h-7 bg-brand-500/20 text-brand-400 rounded-lg flex items-center justify-center font-bold font-mono text-sm flex-shrink-0">2</span>
              <h2 className="font-display font-bold text-ink">Take a baseline test</h2>
            </div>
            <p className="text-base text-ink-muted leading-relaxed">
              Before you start studying, take a <Link href="/exam" className="text-brand-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">mock exam</Link> cold. This shows you exactly which chapters and topics you need to focus on. Most people score 40–60% without studying — your goal is 90%+ in practice before booking the real thing.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-card rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-7 h-7 bg-brand-500/20 text-brand-400 rounded-lg flex items-center justify-center font-bold font-mono text-sm flex-shrink-0">3</span>
              <h2 className="font-display font-bold text-ink">Focus on Chapter 3 (History)</h2>
            </div>
            <p className="text-base text-ink-muted leading-relaxed">
              Chapter 3 (A Long and Illustrious History) has the most questions and is the hardest. It covers over 1,000 years of British history with specific dates, names, and events. Spend at least <strong className="text-ink">half your study time</strong> on this chapter. Use our <Link href="/cheat-sheet" className="text-brand-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">Key Dates Cheat Sheet</Link> to memorise the most important years.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-card rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-7 h-7 bg-brand-500/20 text-brand-400 rounded-lg flex items-center justify-center font-bold font-mono text-sm flex-shrink-0">4</span>
              <h2 className="font-display font-bold text-ink">Practise questions every day</h2>
            </div>
            <p className="text-base text-ink-muted leading-relaxed">
              Do at least 20–30 practice questions daily. Passive reading of the handbook is not enough — you need to test yourself. Use <Link href="/practice" className="text-brand-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">Pass the UK Test&apos;s adaptive practice</Link>, which learns which questions you find hard and gives you more of those. Use <Link href="/weak-spots" className="text-brand-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">Weak Spots</Link> to drill your problem areas.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-card rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-7 h-7 bg-brand-500/20 text-brand-400 rounded-lg flex items-center justify-center font-bold font-mono text-sm flex-shrink-0">5</span>
              <h2 className="font-display font-bold text-ink">Common mistakes to avoid</h2>
            </div>
            <ul className="text-base text-ink-muted space-y-2">
              {[
                'Confusing "Great Britain" (no NI) with "United Kingdom" (includes NI)',
                'Getting women\'s suffrage dates wrong: 1918 (30+ with property) vs 1928 (all women 21+)',
                'Forgetting the Magna Carta was 1215, not 1066 (Battle of Hastings)',
                'Missing arts/sport/culture questions because they skipped those chapters',
                'Not knowing which Parliament chamber is elected (Commons) vs unelected (Lords)',
                'Confusing patron saints: St George (England) vs St Andrew (Scotland)',
              ].map(mistake => (
                <li key={mistake} className="flex items-start gap-2">
                  <span className="text-danger flex-shrink-0">✗</span>
                  {mistake}
                </li>
              ))}
            </ul>
          </div>

          {/* Step 6 */}
          <div className="bg-card rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-7 h-7 bg-brand-500/20 text-brand-400 rounded-lg flex items-center justify-center font-bold font-mono text-sm flex-shrink-0">6</span>
              <h2 className="font-display font-bold text-ink">Test day tips</h2>
            </div>
            <ul className="text-base text-ink-muted space-y-2">
              {[
                'Bring your passport or BRP — no driving licence',
                'Arrive 15 minutes early',
                'You cannot bring notes or a phone into the exam room',
                'Take your time — 45 minutes for 24 questions is generous',
                'If unsure, eliminate obviously wrong answers first',
                'The result is displayed on screen immediately',
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
          <Link href="/exam" className="py-3 bg-card text-ink rounded-xl font-semibold text-center hover:bg-raised active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Take Mock Exam
          </Link>
        </div>

        <div className="mt-6 bg-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Practice Tests</p>
          <div className="flex flex-wrap gap-2">
            {[4, 9, 16, 25].map(n => (
              <Link key={n} href={`/mock-test/${n}`} className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Mock Test {n}</Link>
            ))}
            <Link href="/mock-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">All 45 tests →</Link>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
            {[
              { slug: 'british-history',       title: 'British History',       colour: '#a855f7' },
              { slug: 'immigration-citizenship', title: 'Immigration & Citizenship', colour: '#ff4d6d' },
            ].map(t => (
              <Link key={t.slug} href={`/topic/${t.slug}`} className="px-3 py-1.5 text-sm rounded-lg border transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" style={{ borderColor: `${t.colour}44`, color: t.colour, backgroundColor: `${t.colour}11` }}>{t.title}</Link>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-center flex-wrap">
          <Link href="/faq" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">FAQ</Link>
          <Link href="/cheat-sheet" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Cheat Sheet</Link>
          <Link href="/test-centres" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Test Centres</Link>
        </div>
      </div>
    </>
  )
}
