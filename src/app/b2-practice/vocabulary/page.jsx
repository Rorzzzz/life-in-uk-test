import Link from 'next/link'
import B2VocabClient from './B2VocabClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'B2 Vocabulary Practice Free — 240 IELTS Vocabulary Questions for UK Visa 2026',
  description: 'Free B2 vocabulary practice for IELTS and UK settlement. 240 questions — words in context, collocations, phrasal verbs and academic vocabulary. Instant explanations. No sign-up.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/vocabulary' },
  openGraph: {
    title: 'B2 Vocabulary Practice Free — 240 IELTS Vocabulary Questions',
    description: 'Free B2 vocabulary practice for IELTS and UK immigration. 240 questions across 4 categories. Instant explanations, no sign-up.',
    url: 'https://passtheuktest.co.uk/b2-practice/vocabulary',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  keywords: ['b2 vocabulary practice', 'ielts vocabulary practice', 'b2 english vocabulary', 'b2 words in context', 'b2 collocations practice', 'phrasal verbs b2', 'ielts general training vocabulary', 'b2 academic vocabulary free'],
}

const FAQS = [
  {
    q: 'What vocabulary do I need for B2 English?',
    a: 'B2 vocabulary covers academic and formal words used in context, collocations (e.g. "make a decision", "raise awareness"), phrasal verbs (e.g. "put off", "carry out") and topic-specific vocabulary across workplace, environment and society topics. CEFR B2 corresponds to around 4,000–6,000 active word families.',
  },
  {
    q: 'Are collocations important for B2 IELTS?',
    a: 'Yes. IELTS tests collocation awareness directly — choosing the right verb-noun or adjective-noun combination (e.g. "raise awareness" not "rise awareness"). This is one of the areas that separates B2 from B1 candidates and is directly assessed under Lexical Resource in IELTS writing and speaking.',
  },
  {
    q: 'What phrasal verbs appear at B2 level?',
    a: 'Common B2 phrasal verbs include: put off (postpone), carry out (perform), bring up (mention), take on (accept responsibility), look into (investigate), set up (establish), and give up (stop). IELTS tests these in reading comprehension and writing contexts at Band 5.5.',
  },
  {
    q: 'How is vocabulary scored in IELTS?',
    a: 'IELTS examiners assess Lexical Resource: range of vocabulary, precision of word choice, and correct use of collocations and phrasal verbs. Band 5.5 requires accurate use of common vocabulary with some paraphrase, basic collocation awareness, and a mix of simple and complex vocabulary.',
  },
  {
    q: 'How many vocabulary questions should I practise before the real B2 test?',
    a: 'Aim to work through at least 120 practice questions across all categories — words in context, collocations and phrasal verbs — before your exam. Scoring consistently above 80% in these categories puts you well above the Band 5.5 Lexical Resource threshold.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'B2 English Vocabulary Practice',
  description: 'Free B2 vocabulary practice questions aligned to IELTS General Training format. 240 questions covering words in context, collocations, phrasal verbs and academic vocabulary.',
  provider: { '@type': 'Organization', name: 'PassTheUKTest', url: 'https://passtheuktest.co.uk' },
  isAccessibleForFree: true,
  educationalLevel: 'B2 CEFR',
  about: { '@type': 'Thing', name: 'B2 English Vocabulary for UK Immigration' },
  hasCourseInstance: [
    { '@type': 'CourseInstance', name: 'Words in Context Practice', url: 'https://passtheuktest.co.uk/b2-practice/vocabulary' },
    { '@type': 'CourseInstance', name: 'Collocations Practice', url: 'https://passtheuktest.co.uk/b2-practice/vocabulary' },
    { '@type': 'CourseInstance', name: 'Phrasal Verbs Practice', url: 'https://passtheuktest.co.uk/b2-practice/vocabulary' },
    { '@type': 'CourseInstance', name: 'Academic Vocabulary Practice', url: 'https://passtheuktest.co.uk/b2-practice/vocabulary' },
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

export default function B2VocabPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'Vocabulary', path: '/b2-practice/vocabulary' },
      ]} />

      <B2VocabClient />

      <div className="max-w-2xl mx-auto px-4 pb-8 space-y-4 mt-2">

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-display font-bold text-ink mb-2">B2 Vocabulary — what you need to know</h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-2">
            B2 vocabulary practice focuses on the four areas that IELTS General Training tests under Lexical Resource: words in context (choosing the precise word that fits the meaning), collocations (common word pairings like &ldquo;make a decision&rdquo; or &ldquo;raise awareness&rdquo;), phrasal verbs (two-word verbs like &ldquo;carry out&rdquo; or &ldquo;put off&rdquo;), and academic vocabulary (formal register words used in workplace and general-interest texts).
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            At Band 5.5, you need to recognise and use common vocabulary accurately, demonstrate some collocation awareness, and avoid consistent misuse of frequent words. You do not need a wide range of rare or specialist vocabulary — precise use of everyday vocabulary at B2 level is enough to meet the UK settlement threshold.
          </p>
        </div>

        <div>
          <h2 className="font-display font-bold text-ink mb-4">B2 vocabulary — frequently asked questions</h2>
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
            <Link href="/b2-practice/grammar" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Grammar</Link>
            <Link href="/b2-practice/writing" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Writing</Link>
            <Link href="/b2-practice/reading" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Reading</Link>
            <Link href="/b2-practice/mock-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Mock Tests →</Link>
          </div>
        </div>

      </div>
    </>
  )
}
