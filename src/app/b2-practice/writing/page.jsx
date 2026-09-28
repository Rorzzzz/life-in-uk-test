import Link from 'next/link'
import B2WritingClient from './B2WritingClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'B2 Writing Practice Free — Examiner Feedback on IELTS Letters & Essays 2026',
  description: 'Free B2 writing practice with instant examiner feedback. 30 IELTS General Training prompts — Task 1 letters and Task 2 essays. PASS/FAIL verdict, band score and model answers. No sign-up.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/writing' },
  openGraph: {
    title: 'B2 Writing Practice Free — Examiner Feedback on IELTS Letters & Essays',
    description: 'Write a response, get instant examiner feedback. 30 IELTS General Training prompts, PASS/FAIL verdict, band score and model Band 7 answers. Free, no sign-up.',
    url: 'https://passtheuktest.co.uk/b2-practice/writing',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  keywords: ['b2 writing practice', 'ielts writing practice free', 'b2 english writing', 'ielts general training writing', 'ielts task 1 letter writing practice', 'ielts task 2 essay practice', 'b2 writing feedback', 'ielts band 5.5 writing'],
}

const FAQS = [
  {
    q: 'What is in the IELTS General Training writing test?',
    a: 'IELTS General Training Writing has two tasks: Task 1 (write a letter of at least 150 words — formal, semi-formal or informal depending on the prompt) and Task 2 (write an essay of at least 250 words presenting an argument, discussing two views or proposing a solution). You have 60 minutes total — recommended 20 minutes for Task 1 and 40 minutes for Task 2.',
  },
  {
    q: 'How is B2 writing assessed in IELTS?',
    a: 'IELTS writing is scored on four criteria: Task Achievement (did you fully address the prompt?), Coherence and Cohesion (is it logically organised with linking words?), Lexical Resource (vocabulary range and accuracy), and Grammatical Range and Accuracy (use of complex and varied structures). Each criterion is worth 25% of the total band score.',
  },
  {
    q: 'What is Band 5.5 writing level?',
    a: 'At Band 5.5 you address the main aspects of the task with some incompleteness, organise ideas with basic cohesive devices, use common vocabulary with some errors, and produce some complex sentences with inaccuracies. Meaning is generally clear. This is the B2 threshold accepted for UK settlement applications.',
  },
  {
    q: 'How long should an IELTS Task 1 letter be?',
    a: 'IELTS Task 1 letters must be at least 150 words. Responses below the word count are penalised on Task Achievement. Aim for 170–190 words — enough to cover all three bullet points from the prompt fully without padding. Covering all bullet points is more important than exceeding the word count.',
  },
  {
    q: 'What is the difference between formal and informal letters in IELTS Task 1?',
    a: 'Formal letters address an organisation or unknown person and use formal register ("I am writing to enquire...", "I would be grateful if..."). Semi-formal letters address known professionals. Informal letters address a friend and use natural register ("I was so glad to hear..."). Using the wrong register is one of the most common mistakes and directly lowers the Task Achievement score.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'B2 English Writing Practice with Examiner Feedback',
  description: 'Free B2 writing practice for IELTS General Training. Write responses to 30 real prompts (Task 1 letters and Task 2 essays) and receive instant examiner feedback with PASS/FAIL verdict and band score estimate.',
  provider: { '@type': 'Organization', name: 'PassTheUKTest', url: 'https://passtheuktest.co.uk' },
  isAccessibleForFree: true,
  educationalLevel: 'B2 CEFR',
  about: { '@type': 'Thing', name: 'IELTS General Training Writing for UK Settlement' },
  hasCourseInstance: [
    { '@type': 'CourseInstance', name: 'Task 1 — Letter Writing', url: 'https://passtheuktest.co.uk/b2-practice/writing' },
    { '@type': 'CourseInstance', name: 'Task 2 — Essay Writing', url: 'https://passtheuktest.co.uk/b2-practice/writing' },
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

export default function B2WritingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'Writing', path: '/b2-practice/writing' },
      ]} />

      <B2WritingClient />

      <div className="max-w-2xl mx-auto px-4 pb-8 space-y-4 mt-2">

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-display font-bold text-ink mb-2">B2 Writing — what you need to know</h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-2">
            These B2 writing sessions cover both IELTS General Training writing tasks. Task 1 prompts ask you to write a letter — formal, semi-formal or informal — covering three bullet points in at least 150 words. Task 2 prompts ask you to write an essay presenting an argument, discussing two views, or proposing a solution to a problem in at least 250 words. Each response is assessed by the examiner against the four IELTS writing criteria.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            The examiner feedback gives you a PASS or FAIL verdict, a band score estimate, and specific comments on Task Achievement, Vocabulary, Grammar and Cohesion — plus a model Band 7 answer you can compare your response against. This is the closest free alternative to paying for official IELTS marking, and the only way to get written feedback on your writing before sitting the real exam.
          </p>
        </div>

        <div>
          <h2 className="font-display font-bold text-ink mb-4">B2 writing — frequently asked questions</h2>
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
            <Link href="/b2-practice/speaking" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Speaking</Link>
            <Link href="/b2-practice/grammar" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Grammar</Link>
            <Link href="/b2-practice/vocabulary" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Vocabulary</Link>
            <Link href="/b2-practice/mock-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Mock Tests →</Link>
          </div>
        </div>

      </div>
    </>
  )
}
