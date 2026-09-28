import Link from 'next/link'
import B2ListeningClient from './B2ListeningClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'B2 Listening Practice Free — IELTS Audio Comprehension Questions 2026',
  description: 'Free B2 listening practice for UK settlement. 15 IELTS-style audio clips, 60 comprehension questions — all four sections covered. Text hidden while listening. Works in all browsers.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/listening' },
  openGraph: {
    title: 'B2 Listening Practice Free — IELTS Audio Comprehension Questions',
    description: 'Listen to IELTS-style audio clips and answer comprehension questions. All 4 sections covered. 15 clips, 60 questions. Free, works in all browsers.',
    url: 'https://passtheuktest.co.uk/b2-practice/listening',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  keywords: ['b2 listening practice', 'ielts listening practice free', 'b2 english listening', 'ielts general training listening', 'ielts listening comprehension practice', 'b2 listening exercises free', 'ielts listening sections practice 2026'],
}

const FAQS = [
  {
    q: 'What is the IELTS listening test format?',
    a: 'IELTS Listening has four sections: Section 1 (everyday conversation between two people), Section 2 (monologue in a social context), Section 3 (academic discussion between up to four people) and Section 4 (academic lecture or talk). There are 40 questions played once over 30 minutes, with 10 minutes to transfer answers to the answer sheet.',
  },
  {
    q: 'How hard is the B2 listening test?',
    a: 'B2 listening requires understanding main ideas and specific detail in conversations and monologues. Section 1 and 2 use everyday topics; Section 3 and 4 are more academic. Band 5.5 (B2) means correctly answering around 23 out of 40 questions — a pass rate of roughly 58%. Sections 1 and 2 should be near-perfect.',
  },
  {
    q: 'Why is the text hidden during listening practice?',
    a: 'Text is hidden to replicate real exam conditions. In the real IELTS listening test, you hear the audio once and cannot read a transcript. Practising without the script trains your ear to catch key information on the first listen — the skill the exam actually tests. The text is revealed after you have answered each question.',
  },
  {
    q: 'Can I replay the audio in the real IELTS test?',
    a: 'No. In the real IELTS listening test, each audio recording is played only once. You have a short time to read the questions before each section begins, but you cannot replay any part of the recording. These practice sessions allow replaying to help you identify what you missed and improve your listening accuracy over time.',
  },
  {
    q: 'How can I improve my IELTS listening score?',
    a: 'Focus on keywords: numbers, names, times and specific nouns are most frequently tested. Read the questions before each audio plays — predict what type of answer you are listening for. Practise with British and Australian English accents, as IELTS predominantly uses those varieties. For Section 4, practise note-taking while listening.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'B2 English Listening Practice — IELTS General Training',
  description: 'Free B2 listening practice for IELTS General Training. 15 audio clips and 60 comprehension questions across all four IELTS listening sections. Text hidden while listening to replicate real exam conditions.',
  provider: { '@type': 'Organization', name: 'PassTheUKTest', url: 'https://passtheuktest.co.uk' },
  isAccessibleForFree: true,
  educationalLevel: 'B2 CEFR',
  about: { '@type': 'Thing', name: 'IELTS General Training Listening for UK Settlement' },
  hasCourseInstance: [
    { '@type': 'CourseInstance', name: 'Section 1 — Everyday Conversation', url: 'https://passtheuktest.co.uk/b2-practice/listening' },
    { '@type': 'CourseInstance', name: 'Section 2 — Monologue', url: 'https://passtheuktest.co.uk/b2-practice/listening' },
    { '@type': 'CourseInstance', name: 'Section 3 — Academic Discussion', url: 'https://passtheuktest.co.uk/b2-practice/listening' },
    { '@type': 'CourseInstance', name: 'Section 4 — Academic Lecture', url: 'https://passtheuktest.co.uk/b2-practice/listening' },
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

export default function B2ListeningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'Listening', path: '/b2-practice/listening' },
      ]} />

      <B2ListeningClient />

      <div className="max-w-2xl mx-auto px-4 pb-8 space-y-4 mt-2">

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-display font-bold text-ink mb-2">B2 Listening — what you need to know</h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-2">
            These B2 listening sessions replicate the IELTS General Training listening test format across all four sections: Section 1 (everyday conversation, easiest), Section 2 (social monologue), Section 3 (academic discussion) and Section 4 (academic lecture, hardest). The audio plays through your browser using text-to-speech technology — the transcript is hidden while you listen, exactly as in the real exam.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            The key skill IELTS Listening tests is catching specific information — numbers, names, times, conditions — on a single listen. Practising with the text hidden trains this skill directly. After you answer, the transcript and explanation are revealed so you can identify exactly what you missed and why.
          </p>
        </div>

        <div>
          <h2 className="font-display font-bold text-ink mb-4">B2 listening — frequently asked questions</h2>
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
            <Link href="/b2-practice/reading" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Reading</Link>
            <Link href="/b2-practice/speaking" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Speaking</Link>
            <Link href="/b2-practice/vocabulary" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Vocabulary</Link>
            <Link href="/b2-practice/mock-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Mock Tests →</Link>
          </div>
        </div>

      </div>
    </>
  )
}
