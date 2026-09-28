import Link from 'next/link'
import B2GrammarClient from './B2GrammarClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'B2 Grammar Practice Free — 200 IELTS Grammar Questions for UK Visa 2026',
  description: 'Free B2 grammar practice for IELTS and UK settlement. 200 questions — conditionals, passive voice, reported speech, modal verbs and linking words. Instant explanations. No sign-up.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/grammar' },
  openGraph: {
    title: 'B2 Grammar Practice Free — 200 IELTS Grammar Questions',
    description: 'Free B2 grammar practice for IELTS and UK immigration. 200 questions across 5 grammar areas. Instant explanations, no sign-up.',
    url: 'https://passtheuktest.co.uk/b2-practice/grammar',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  keywords: ['b2 grammar practice', 'ielts grammar practice', 'b2 english grammar', 'conditional sentences b2', 'passive voice practice ielts', 'reported speech practice', 'b2 grammar exercises free', 'ielts grammar questions'],
}

const FAQS = [
  {
    q: 'What grammar topics are tested at B2 level?',
    a: 'The core B2 grammar areas in IELTS General Training are: all three conditional types, passive voice constructions, reported speech, modal verbs (could, should, must, might) and linking words (however, although, despite). These five areas account for the majority of grammar marks at Band 5.5.',
  },
  {
    q: 'How hard is B2 grammar?',
    a: 'B2 grammar is upper-intermediate level. You need to use conditionals, passive constructions and modal verbs accurately. It is more demanding than B1 but does not require C1 academic structures. The main challenge is using complex forms correctly under time pressure.',
  },
  {
    q: 'Do I need perfect grammar to reach B2?',
    a: 'No. Band 5.5 allows occasional minor errors. The key is accurate use of complex structures — conditionals, passive voice and reported speech — without consistent basic mistakes that obscure meaning. One or two errors per sentence is acceptable at this level.',
  },
  {
    q: 'What is the difference between B1 and B2 grammar?',
    a: 'B1 requires basic accuracy with simple structures. B2 adds third conditionals, complex passive constructions, indirect reported speech and a wider range of modal verbs. Errors at B2 should not obscure meaning — at B1, simpler errors are acceptable.',
  },
  {
    q: 'Which grammar mistakes are most likely to fail the B2 test?',
    a: 'Consistent errors with conditionals, wrong tense in reported speech, incorrect passive constructions, and confused modals (e.g. "could" vs "was able to") are the most common mistakes that bring a score below Band 5.5. Practising these five areas repeatedly fixes most of them.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'B2 English Grammar Practice',
  description: 'Free B2 grammar practice questions aligned to IELTS General Training format. 200 questions covering conditionals, passive voice, reported speech, modal verbs and linking words.',
  provider: { '@type': 'Organization', name: 'PassTheUKTest', url: 'https://passtheuktest.co.uk' },
  isAccessibleForFree: true,
  educationalLevel: 'B2 CEFR',
  about: { '@type': 'Thing', name: 'B2 English Grammar for UK Immigration' },
  hasCourseInstance: [
    { '@type': 'CourseInstance', name: 'Conditionals Practice', url: 'https://passtheuktest.co.uk/b2-practice/grammar' },
    { '@type': 'CourseInstance', name: 'Passive Voice Practice', url: 'https://passtheuktest.co.uk/b2-practice/grammar' },
    { '@type': 'CourseInstance', name: 'Reported Speech Practice', url: 'https://passtheuktest.co.uk/b2-practice/grammar' },
    { '@type': 'CourseInstance', name: 'Modal Verbs Practice', url: 'https://passtheuktest.co.uk/b2-practice/grammar' },
    { '@type': 'CourseInstance', name: 'Linking Words Practice', url: 'https://passtheuktest.co.uk/b2-practice/grammar' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function B2GrammarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'Grammar', path: '/b2-practice/grammar' },
      ]} />

      <B2GrammarClient />

      <div className="max-w-2xl mx-auto px-4 pb-8 space-y-4 mt-2">

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-display font-bold text-ink mb-2">B2 Grammar — what you need to know</h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-2">
            B2 grammar practice is built around the five structures that appear most in IELTS General Training Band 5.5 questions: conditionals (all three types), passive voice, reported speech, modal verbs and linking words. These five areas cover the vast majority of grammar marks at this level — targeted practice in each one is the fastest route to a consistent score.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            You do not need perfect grammar to reach B2. IELTS Band 5.5 allows occasional minor errors in complex structures, as long as meaning is clear. The pass mark for UK settlement is reaching this threshold across all four skills — grammar accuracy in writing and speaking is assessed alongside reading and listening comprehension.
          </p>
        </div>

        <div>
          <h2 className="font-display font-bold text-ink mb-4">B2 grammar — frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-card rounded-xl p-4">
                <p className="font-semibold text-ink text-sm mb-1">{q}</p>
                <p className="text-sm text-ink-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Also practise</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/b2-practice/vocabulary" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Vocabulary</Link>
            <Link href="/b2-practice/writing" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Writing</Link>
            <Link href="/b2-practice/reading" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Reading</Link>
            <Link href="/b2-practice/mock-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Mock Tests →</Link>
          </div>
        </div>

      </div>
    </>
  )
}
