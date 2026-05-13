import Link from 'next/link'
import StudyPlanClient from './StudyPlanClient'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'Free Life in the UK Test Study Plan — Personalised 2026',
    description: 'Free personalised study plan for the Life in the UK test. Enter your test date and score — get a day-by-day schedule built around the time you have left.',
    alternates: { canonical: 'https://passtheuktest.co.uk/study-plan-generator' },
    openGraph: {
      title: 'Free Life in the UK Test Study Plan — Personalised 2026',
      description: 'Free personalised study plan for the Life in the UK test. Enter your test date and score — get a day-by-day schedule built around the time you have left.',
      url: 'https://passtheuktest.co.uk/study-plan-generator',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

function StudyPlanIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        Life in the UK Test Study Plan Generator — Free Personalised Plan
      </h1>
      <p className="text-base text-ink leading-relaxed mb-3">
        Get a free personalised study plan for the Life in the UK test based on your test date and current practice score. Enter your details and we will generate a week-by-week revision schedule showing exactly what to study, when to take mock exams, and how many practice questions to do each day.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-2 list-disc list-inside">
        <li>Enter your test date and current practice score</li>
        <li>Get a week-by-week revision plan tailored to your timeline</li>
        <li>Adapts to the number of hours you have available each day</li>
        <li>Links directly to free practice tools and mock exams</li>
      </ul>
      <div className="mt-4">
        <ShareButton
          url="https://passtheuktest.co.uk/study-plan-generator"
          title="Free Life in the UK Test Study Plan — Personalised 2026"
          text="Free personalised Life in the UK test study plan — pass first time 🇬🇧"
        />
      </div>
    </div>
  )
}

function StudyPlanContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        How long should you study for the Life in the UK test?
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        Most people need 3–6 weeks of consistent daily study to be ready for the Life in the UK test. The pass rate is approximately 67% — which means one in three candidates fails on their first attempt. Passive reading alone is not enough to pass reliably.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        20 minutes of active practice every day is more effective than a 3-hour session once a week. The brain retains information better through regular, spaced repetition than through cramming. This study plan uses that principle — it breaks your revision into short, daily sessions with rest built in.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        What to study (and what not to study)
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        All test questions come from the official Life in the UK handbook (3rd edition). Nothing from outside the handbook appears in the test. Do not rely on third-party summaries or outdated study guides — use the official book.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>Do not rely on the Check Your Understanding boxes — test questions come from the main body text</li>
        <li>Chapter 3 (A Long and Illustrious History) generates the most test questions — spend at least half your time here</li>
        <li>Chapter 4 (A Modern, Thriving Society) covers arts, sport, and culture — consistently underrevised, do not skip it</li>
        <li>Dates, names, and numbers are tested directly — memorise the key ones</li>
      </ul>
      <p className="text-base text-ink leading-relaxed mb-3">
        Our <Link href="/cheat-sheet" className="text-brand underline">cheat sheet</Link> lists all the key dates, names, and facts worth memorising before your test.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        When are you ready to book?
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        Book your test when you are consistently scoring 21 or more out of 24 in timed practice — not just the 18/24 pass mark. A 3-question buffer protects you against a harder-than-usual test day. The questions in the real test can vary in difficulty from sitting to sitting.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        Take at least 2 full 24-question timed mock exams before booking. Do not book based on a calendar date — book based on your practice scores. If you are not consistently hitting 21+, extend your preparation rather than booking early.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Frequently Asked Questions
      </h2>

      <h3 className="text-sm font-bold text-ink mb-1">How many weeks do I need to study for the Life in the UK test?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Most people need 3–6 weeks. If you are starting from zero knowledge of British history and culture, allow 6 weeks. If you have already read the handbook once, 3 weeks of active practice may be enough. Your current practice score is the best guide.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What is the best way to study for the Life in the UK test?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Read the official handbook, then immediately practise questions on what you have read. Do not read the whole book before starting questions. Short daily sessions with spaced repetition are more effective than long irregular study sessions.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">How many practice questions should I do per day?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Aim for 20–40 questions per day during your revision period. Focus on questions you get wrong — revisit them the next day. Use chapter-by-chapter practice first, then full 24-question mock exams in the final week before your test.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">When should I start doing mock exams?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Start full 24-question timed mock exams in the final 1–2 weeks before your test. Earlier in your revision, focus on chapter-by-chapter practice to build knowledge area by area. Mock exams confirm readiness — they are not the primary learning tool.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What is Chapter 3 about and why is it the hardest?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Chapter 3 — A Long and Illustrious History — covers British history from prehistoric times to the present. It is the longest chapter and generates the most test questions. It includes specific dates, monarchs, wars, and events that must be remembered accurately. Most people who fail the test do so because of gaps in Chapter 3 knowledge.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Should I buy the official handbook?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. The official handbook (Life in the United Kingdom: A Guide for New Residents, 3rd edition) is the only source for test questions. All questions come directly from its text. It costs approximately £12–£15 and is available from bookshops and online retailers. Do not rely on a PDF copy — use the current 3rd edition.
      </p>

      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-sm font-bold text-ink mb-2">Related guides and tools</p>
        <ul className="text-sm text-ink-muted space-y-1">
          <li><Link href="/articles/life-in-the-uk-test-revision-plan" className="text-brand underline">Life in the UK test revision plan — full guide</Link></li>
          <li><Link href="/articles/best-way-to-study-for-life-in-the-uk-test" className="text-brand underline">Best way to study for the Life in the UK test</Link></li>
          <li><Link href="/articles/how-long-does-it-take-to-study-for-the-life-in-the-uk-test" className="text-brand underline">How long does it take to study for the Life in the UK test?</Link></li>
          <li><Link href="/practice" className="text-brand underline">Chapter-by-chapter practice questions</Link></li>
          <li><Link href="/exam" className="text-brand underline">Full timed mock exam — 24 questions</Link></li>
          <li><Link href="/cheat-sheet" className="text-brand underline">Key dates and facts cheat sheet</Link></li>
        </ul>
      </div>

      <p className="text-xs text-ink-muted mt-8 leading-relaxed">
        Last reviewed: April 2026 — based on GOV.UK guidance. Always check GOV.UK for the latest rules.
      </p>
    </div>
  )
}

export default function StudyPlanGeneratorPage() {
  return (
    <>
      <StudyPlanIntro />
      <StudyPlanClient />
      <StudyPlanContent />
    </>
  )
}
