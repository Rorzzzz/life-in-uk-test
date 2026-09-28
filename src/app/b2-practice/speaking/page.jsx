import Link from 'next/link'
import B2SpeakingClient from './B2SpeakingClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'B2 Speaking Practice Free — Record & Get Examiner Feedback 2026',
  description: 'Free B2 speaking practice for UK settlement. Record your spoken answers to IELTS Part 1, 2 and 3 questions and get instant examiner feedback with band score. Works on all browsers.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/speaking' },
  openGraph: {
    title: 'B2 Speaking Practice Free — Record & Get Examiner Feedback',
    description: 'Record your spoken answers to IELTS Part 1, 2 and 3 questions. Instant examiner feedback with band score. 30 prompts. Free, all browsers.',
    url: 'https://passtheuktest.co.uk/b2-practice/speaking',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  keywords: ['b2 speaking practice', 'ielts speaking practice free', 'b2 english speaking', 'ielts speaking part 1 practice', 'ielts speaking part 2 cue card', 'ielts speaking feedback', 'b2 speaking test preparation 2026', 'ielts speaking band 5.5'],
}

const FAQS = [
  {
    q: 'What is the IELTS speaking test format?',
    a: 'IELTS Speaking has three parts: Part 1 (a general interview on familiar topics, 4-5 minutes), Part 2 (an individual long turn using a cue card, 3-4 minutes — you have 1 minute to prepare) and Part 3 (a discussion of abstract topics related to Part 2, 4-5 minutes). The whole test takes 11-14 minutes with a trained examiner.',
  },
  {
    q: 'How is B2 speaking assessed in IELTS?',
    a: 'IELTS speaking is assessed on four criteria: Fluency and Coherence (can you speak at length without long pauses?), Lexical Resource (range and accuracy of vocabulary), Grammatical Range and Accuracy (use of complex structures), and Pronunciation (clarity and natural rhythm). Band 5.5 requires competence in all four areas.',
  },
  {
    q: 'What does Band 5.5 speaking sound like?',
    a: 'At Band 5.5 you can discuss familiar and some abstract topics, maintain fluency with some repetition or hesitation, use a range of vocabulary with occasional inaccuracy, and produce some complex sentences with errors. Pronunciation is generally clear and does not impede understanding.',
  },
  {
    q: 'Can I practise IELTS speaking on my phone?',
    a: 'Yes. These sessions use your phone or laptop microphone to record your response, then transcribe and assess it automatically. Chrome, Firefox, Safari and Edge all support audio recording — the tool works in all modern browsers on both Android and iOS.',
  },
  {
    q: 'How can I improve my IELTS speaking score?',
    a: 'Extend answers with reasons and examples — one-sentence answers score poorly on Fluency and Coherence. Use discourse markers ("However", "On the other hand", "For example") to organise ideas. Record yourself regularly — hearing your own speech is one of the fastest ways to identify weak areas. Aim for 1-2 minutes when answering Part 2 cue cards.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'B2 English Speaking Practice with Examiner Feedback',
  description: 'Free B2 speaking practice for IELTS General Training. Record spoken responses to 30 real IELTS-style prompts across Parts 1, 2 and 3, and receive instant examiner feedback with band score estimate.',
  provider: { '@type': 'Organization', name: 'PassTheUKTest', url: 'https://passtheuktest.co.uk' },
  isAccessibleForFree: true,
  educationalLevel: 'B2 CEFR',
  about: { '@type': 'Thing', name: 'IELTS Speaking for UK Settlement' },
  hasCourseInstance: [
    { '@type': 'CourseInstance', name: 'Part 1 — Interview Questions', url: 'https://passtheuktest.co.uk/b2-practice/speaking' },
    { '@type': 'CourseInstance', name: 'Part 2 — Long Turn (Cue Card)', url: 'https://passtheuktest.co.uk/b2-practice/speaking' },
    { '@type': 'CourseInstance', name: 'Part 3 — Discussion', url: 'https://passtheuktest.co.uk/b2-practice/speaking' },
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

export default function B2SpeakingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'Speaking', path: '/b2-practice/speaking' },
      ]} />

      <B2SpeakingClient />

      <div className="max-w-2xl mx-auto px-4 pb-8 space-y-4 mt-2">

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-display font-bold text-ink mb-2">B2 Speaking — what you need to know</h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-2">
            These B2 speaking sessions cover all three parts of the IELTS Speaking test: Part 1 familiar interview questions (home, work, hobbies), Part 2 individual long turn with a cue card and one minute to prepare, and Part 3 abstract discussion questions. Your spoken response is transcribed using Whisper and assessed against the four IELTS criteria — Fluency, Vocabulary, Grammar and Pronunciation.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Unlike most speaking practice tools, this gives you a written PASS/FAIL verdict and a band score estimate for every response. The examiner feedback is specific — it tells you which criterion is dragging your score down and how to fix it, not just whether you passed. Recording yourself and reading the feedback is one of the fastest ways to move from B1 to B2 speaking level.
          </p>
        </div>

        <div>
          <h2 className="font-display font-bold text-ink mb-4">B2 speaking — frequently asked questions</h2>
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
            <Link href="/b2-practice/writing" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Writing</Link>
            <Link href="/b2-practice/listening" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Listening</Link>
            <Link href="/b2-practice/vocabulary" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Vocabulary</Link>
            <Link href="/b2-practice/mock-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Mock Tests →</Link>
          </div>
        </div>

      </div>
    </>
  )
}
