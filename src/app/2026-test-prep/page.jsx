import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { QUESTION_COUNT } from '@/data/questions'
import { MOCK_TEST_COUNT } from '@/data/mockTests'

export const metadata = {
  title: 'How to Prepare for the Life in the UK Test 2026 — Free Complete Guide',
  description: 'The complete preparation guide for the Life in the UK test 2026. What to study, how long to prepare, expert tips and everything you need to pass first time. Free.',
  openGraph: {
    title: 'How to Prepare for the Life in the UK Test 2026 — Free Complete Guide',
    description: 'Complete preparation guide for the Life in the UK test 2026. What to study, how long to prepare, and tips to pass first time.',
    url: 'https://passtheuktest.co.uk/2026-test-prep',
    type: 'website',
  },
  alternates: { canonical: 'https://passtheuktest.co.uk/2026-test-prep' },
}

const TIPS = [
  {
    title: 'Focus on history — it\'s 40% of questions',
    body: 'Chapter 3 (A Long and Illustrious History) contains the most questions. Dates, monarchs, and events come up frequently. Use the study guide to build a mental timeline.',
  },
  {
    title: 'Memorise the key dates list',
    body: 'There are roughly 30 specific dates you need to know — from the Norman Conquest (1066) to the NHS (1948). Print the cheat sheet and review it daily.',
  },
  {
    title: 'Use spaced repetition',
    body: 'Pass the UK Test\'s Daily 5 uses the SM-2 algorithm to show you questions exactly when you\'re about to forget them. 10 minutes a day is more effective than 2 hours the night before.',
  },
  {
    title: 'Take mock tests under exam conditions',
    body: 'Sit in silence, set a 45-minute timer, and don\'t use notes. The real test is in a test centre — simulate that environment to build confidence and accuracy.',
  },
  {
    title: 'Don\'t ignore the values chapter',
    body: 'Chapter 1 (Values and Principles) seems obvious but contains specific facts about the Magna Carta, the Bill of Rights, and the roles of Parliament that are easy to confuse.',
  },
  {
    title: 'Book early — test centres fill up fast',
    body: 'UKVI test centres can have a 3–6 week wait. Book your test before you start studying, so you have a fixed deadline to work towards.',
  },
]

const TIMELINE = [
  { week: 'Week 1–2', task: 'Read the official handbook once. Don\'t memorise — just get familiar.' },
  { week: 'Week 3–4', task: 'Complete all 10 chapter practice sessions on Pass the UK Test. Focus on weak spots.' },
  { week: 'Week 5–6', task: 'Do 2 mock tests per day. Aim for 20+ before moving on.' },
  { week: 'Week 7',   task: 'Review your weak spots page. Drill any chapter below 80% mastery.' },
  { week: 'Week 8',   task: 'Final review with cheat sheet. Take 2 full timed tests. Rest the day before.' },
]

export default function TestPrep2026Page() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: '2026 Test Prep', path: '/2026-test-prep' }]} />
      <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Hero */}
      <div className="mb-8">
        <div className="inline-block bg-brand-500/10 text-brand-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          2026 Edition
        </div>
        <h1 className="text-3xl font-display font-bold text-ink mb-3 leading-tight">
          How to Pass the Life in the UK Test in 2026
        </h1>
        <p className="text-ink-muted leading-relaxed">
          The test hasn&apos;t changed — but the competition for British citizenship has never been higher. This guide gives you everything you need: the questions, the strategy, and the tools to pass first time.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Practice questions', value: QUESTION_COUNT, colour: 'text-brand-400' },
          { label: 'Mock tests', value: MOCK_TEST_COUNT, colour: 'text-success' },
          { label: 'Pass mark', value: '75%', colour: 'text-xp' },
        ].map(({ label, value, colour }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-4 text-center">
            <p className={`text-2xl font-bold font-mono ${colour}`}>{value}</p>
            <p className="text-xs text-ink-muted mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* About the test */}
      <section className="mb-8">
        <h2 className="text-lg font-display font-bold text-ink mb-3">About the 2026 Test</h2>
        <div className="bg-card border border-border rounded-2xl p-5 space-y-3 text-base text-ink-muted">
          {[
            ['Questions', '24 multiple choice questions'],
            ['Time limit', '45 minutes'],
            ['Pass mark', '18 out of 24 (75%)'],
            ['Cost', '£50 per attempt'],
            ['Format', 'Computer-based at an approved test centre'],
            ['Book at', 'gov.uk/life-in-the-uk-test'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="font-medium text-ink">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8-week plan */}
      <section className="mb-8">
        <h2 className="text-lg font-display font-bold text-ink mb-3">8-Week Study Plan</h2>
        <div className="space-y-3">
          {TIMELINE.map(({ week, task }) => (
            <div key={week} className="flex gap-4 items-start">
              <span className="text-xs font-mono font-semibold text-brand-400 bg-brand-500/10 px-2 py-1 rounded-lg whitespace-nowrap mt-0.5">
                {week}
              </span>
              <p className="text-base text-ink-muted leading-relaxed">{task}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="mb-8">
        <h2 className="text-lg font-display font-bold text-ink mb-3">Top Tips for 2026</h2>
        <div className="space-y-3">
          {TIPS.map(({ title, body }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-ink text-base mb-2">{title}</h3>
              <p className="text-base text-ink-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA grid */}
      <section className="mb-8">
        <h2 className="text-lg font-display font-bold text-ink mb-3">Start Practising Now</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/practice" className="bg-brand-500 text-white rounded-2xl p-5 font-semibold text-center hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
            Practice Questions
          </Link>
          <Link href="/mock-test/1" className="bg-card border border-border rounded-2xl p-5 font-semibold text-ink text-center hover:bg-raised active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Take Mock Test
          </Link>
          <Link href="/study" className="bg-card border border-border rounded-2xl p-5 font-semibold text-ink text-center hover:bg-raised active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Study Guides
          </Link>
          <Link href="/daily" className="bg-card border border-border rounded-2xl p-5 font-semibold text-ink text-center hover:bg-raised active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Daily 5 Review
          </Link>
        </div>
      </section>

      {/* Footer links */}
      <div className="flex flex-wrap gap-2 border-t border-border pt-6">
        {[
          { href: '/cheat-sheet', label: 'Cheat Sheet' },
          { href: '/faq',         label: 'FAQ' },
          { href: '/exam-format', label: 'Exam Format' },
          { href: '/test-centres', label: 'Test Centres' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="px-4 py-3 bg-raised rounded-xl text-sm text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
    </>
  )
}
