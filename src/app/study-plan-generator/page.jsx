import Link from 'next/link'
import StudyPlanClient from './StudyPlanClient'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'How Long to Study for Life in the UK Test? Free Plan 2026',
    description: 'Get a free personalised Life in the UK test study plan based on your test date. Week-by-week schedule, daily question targets and chapter priorities.',
    alternates: { canonical: 'https://passtheuktest.co.uk/study-plan-generator' },
    openGraph: {
      title: 'How Long to Study for Life in the UK Test? Free Plan 2026',
      description: 'Get a free personalised Life in the UK test study plan based on your test date. Week-by-week schedule, daily question targets and chapter priorities.',
      url: 'https://passtheuktest.co.uk/study-plan-generator',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long should I study for the Life in the UK test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most people need 3–6 weeks of consistent daily study to pass the Life in the UK test. If you are starting from zero knowledge of British history and culture, allow 6 weeks. If you have already read the handbook once, 3 weeks of active practice may be enough. Your current practice score is the best guide — aim to consistently score 21 or more out of 24 before booking.',
      },
    },
    {
      '@type': 'Question',
      name: 'What order should I study the Life in the UK test chapters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Study the chapters in order. Chapter 3 (A Long and Illustrious History) is the longest and generates the most test questions — spend at least half your total study time here. Chapter 4 (A Modern, Thriving Society) covers arts, sport, and culture and is consistently under-revised. Do not skip it. The shorter chapters (1, 2, and 5) can be covered in a single session each.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many practice questions should I do per day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aim for 20–40 questions per day during your revision period. Focus on questions you get wrong — revisit them the next day. Use chapter-by-chapter practice first to build knowledge area by area, then switch to full 24-question timed mock exams in the final 1–2 weeks before your test.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I book the Life in the UK test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Book your test when you are consistently scoring 21 or more out of 24 in timed practice — not just the 18/24 pass mark. A 3-question buffer protects you against a harder-than-usual sitting. Do not book based on a calendar date alone — book based on your practice scores.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best way to memorise key dates for the Life in the UK test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use active recall rather than passive reading. After reading a section, close the book and try to write down the dates and facts from memory. Use our free cheat sheet of key dates and facts to drill the most commonly tested numbers, years, and names. Spaced repetition — revisiting the same facts over several days — is far more effective than reading once.',
      },
    },
  ],
}

function StudyPlanIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        Free Life in the UK Test Study Plan — Personalised by Test Date
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

      <h3 className="text-sm font-bold text-ink mb-1">How long should I study for the Life in the UK test?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Most people need 3–6 weeks of consistent daily study. If you are starting from zero knowledge of British history and culture, allow 6 weeks. If you have already read the handbook once, 3 weeks of active practice may be enough. Your current practice score is the best guide — aim to consistently score 21 or more out of 24 before booking your test.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What order should I study the chapters?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Study the chapters in order. Chapter 3 (A Long and Illustrious History) is the longest and generates the most test questions — spend at least half your total study time here. Chapter 4 (A Modern, Thriving Society) covers arts, sport, and culture and is consistently under-revised. The shorter chapters (1, 2, and 5) can be covered in a single session each.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">How many practice questions should I do per day?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Aim for 20–40 questions per day during your revision period. Focus on questions you get wrong — revisit them the next day. Use chapter-by-chapter practice first to build knowledge area by area, then switch to full 24-question timed mock exams in the final 1–2 weeks before your test.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">When should I book my test?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Book when you are consistently scoring 21 or more out of 24 in timed practice — not just the 18/24 pass mark. A 3-question buffer protects you against a harder-than-usual sitting. Do not book based on a calendar date — book based on your practice scores. If you are not hitting 21+, extend your preparation.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What is the best way to memorise key dates?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Use active recall rather than passive reading. After reading a section, close the book and try to write down the dates and facts from memory. Use our free{' '}
        <Link href="/cheat-sheet" className="text-brand underline">cheat sheet</Link>{' '}
        to drill the most commonly tested numbers, years, and names. Spaced repetition — revisiting the same facts over several days — is far more effective than reading once.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Should I buy the official handbook?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. The official handbook (Life in the United Kingdom: A Guide for New Residents, 3rd edition) is the only source for test questions. All questions come directly from its text. It costs approximately £12–£15 from bookshops and online retailers. Do not rely on a PDF copy — use the current 3rd edition.
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <StudyPlanIntro />
      <StudyPlanClient />
      <StudyPlanContent />
    </>
  )
}
