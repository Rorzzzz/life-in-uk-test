import Link from 'next/link'
import B2ReadingClient from './B2ReadingClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'B2 Reading Practice Free — IELTS General Training Passages & Questions 2026',
  description: 'Free B2 reading practice for IELTS and UK settlement. 15 passages, 89 comprehension questions — everyday texts, workplace documents and general articles. Instant explanations. No sign-up.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/reading' },
  openGraph: {
    title: 'B2 Reading Practice Free — IELTS General Training Passages',
    description: 'Free B2 reading comprehension practice aligned to IELTS General Training. 15 passages, 89 questions across 3 sections. Instant explanations, no sign-up.',
    url: 'https://passtheuktest.co.uk/b2-practice/reading',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  keywords: ['b2 reading practice', 'ielts general training reading', 'b2 english reading', 'ielts reading passages free', 'b2 reading comprehension', 'ielts general training reading passages', 'ielts reading practice free 2026'],
}

const FAQS = [
  {
    q: 'What is in the IELTS General Training reading test?',
    a: 'IELTS General Training Reading has three sections: Section 1 (short everyday texts like notices, signs and timetables), Section 2 (workplace texts like job descriptions and training guides) and Section 3 (a longer general-interest article). There are 40 questions in total and 60 minutes to answer them.',
  },
  {
    q: 'How hard is B2 reading comprehension?',
    a: 'B2 reading requires understanding main ideas, implied meaning and specific detail in a range of text types. IELTS General Training reading is slightly easier than Academic — but you still need to read quickly and scan accurately under time pressure. Band 5.5 means correctly answering roughly 23 out of 40 questions.',
  },
  {
    q: 'What question types appear in IELTS General Training reading?',
    a: 'IELTS General Training reading includes multiple choice, true/false/not given, matching headings, sentence completion and short answer questions. These practice sessions focus on multiple-choice comprehension — the format that most directly trains accuracy with the text.',
  },
  {
    q: 'How can I improve my reading score quickly?',
    a: 'Skim for the main idea first, then scan for specific details. Always read the questions before the passage and focus on the key words. Practise on everyday texts (notices, leaflets) as well as longer articles. For IELTS GT, Section 1 and 2 must be near-perfect — they are the easier texts that you should not lose marks on.',
  },
  {
    q: 'What is a good reading score to pass B2?',
    a: 'IELTS Band 5.5 in Reading means correctly answering roughly 23 out of 40 questions (around 58%). For General Training, this means handling everyday texts reliably and extracting the main points from longer articles. Consistently scoring above 70% in these practice sessions signals readiness for the real test.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'B2 English Reading Practice — IELTS General Training',
  description: 'Free B2 reading comprehension practice aligned to IELTS General Training format. 15 passages and 89 questions covering everyday texts, workplace documents and general articles.',
  provider: { '@type': 'Organization', name: 'PassTheUKTest', url: 'https://passtheuktest.co.uk' },
  isAccessibleForFree: true,
  educationalLevel: 'B2 CEFR',
  about: { '@type': 'Thing', name: 'IELTS General Training Reading for UK Settlement' },
  hasCourseInstance: [
    { '@type': 'CourseInstance', name: 'Section 1 — Everyday Texts', url: 'https://passtheuktest.co.uk/b2-practice/reading' },
    { '@type': 'CourseInstance', name: 'Section 2 — Workplace Texts', url: 'https://passtheuktest.co.uk/b2-practice/reading' },
    { '@type': 'CourseInstance', name: 'Section 3 — General Articles', url: 'https://passtheuktest.co.uk/b2-practice/reading' },
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

export default function B2ReadingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'Reading', path: '/b2-practice/reading' },
      ]} />

      <B2ReadingClient />

      <div className="max-w-2xl mx-auto px-4 pb-8 space-y-4 mt-2">

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-display font-bold text-ink mb-2">B2 Reading — what you need to know</h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-2">
            These B2 reading practice sessions use the same three-section structure as IELTS General Training: Section 1 tests everyday texts like notices, advertisements and timetables; Section 2 tests workplace texts like job descriptions, training guides and contracts; Section 3 tests longer general-interest articles on topics like health, environment and society. Each passage is paired with comprehension questions that mirror the real exam format.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            IELTS General Training Reading is generally considered more accessible than IELTS Academic — the texts are shorter and closer to everyday life — but time pressure is still the main challenge. Practising the three section types separately lets you identify which text format causes the most errors, so you can target that area before your exam.
          </p>
        </div>

        <div>
          <h2 className="font-display font-bold text-ink mb-4">B2 reading — frequently asked questions</h2>
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
            <Link href="/b2-practice/listening" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Listening</Link>
            <Link href="/b2-practice/writing" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Writing</Link>
            <Link href="/b2-practice/vocabulary" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Vocabulary</Link>
            <Link href="/b2-practice/mock-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Mock Tests →</Link>
          </div>
        </div>

      </div>
    </>
  )
}
