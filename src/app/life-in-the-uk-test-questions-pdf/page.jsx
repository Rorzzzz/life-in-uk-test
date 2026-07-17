import Link from 'next/link'
import { CHAPTERS, getByChapter } from '@/data/questions'
import DownloadPdfButton from './DownloadPdfButton'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'Life in the UK Test Questions PDF — Free Download',
    description: 'Download 50 free Life in the UK test practice questions with answers and explanations as a printable PDF — based on the current handbook, no sign-up.',
    alternates: { canonical: 'https://passtheuktest.co.uk/life-in-the-uk-test-questions-pdf' },
    keywords: ['life in the uk test questions pdf', 'life in the uk test questions and answers pdf', 'life in the uk test practice questions pdf free download', 'printable life in the uk test questions'],
    openGraph: {
      title: 'Life in the UK Test Questions PDF — Free Download',
      description: 'Download 50 free Life in the UK test practice questions with answers and explanations as a printable PDF — based on the current handbook, no sign-up.',
      url: 'https://passtheuktest.co.uk/life-in-the-uk-test-questions-pdf',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

const QUESTIONS_PER_CHAPTER = 10

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this an official Life in the UK test questions PDF?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. The Home Office does not publish an official questions PDF. These 50 questions are written by PassTheUKTest from the current 3rd edition handbook, with full explanations, and are free to download as a PDF.' },
    },
    {
      '@type': 'Question',
      name: 'How do I download this as a PDF?',
      acceptedAnswer: { '@type': 'Answer', text: 'Click the Download PDF button. This opens your browser\'s print dialog — choose "Save as PDF" as the destination instead of a physical printer to save it as a file on your device.' },
    },
    {
      '@type': 'Question',
      name: 'Are the answers included?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every question includes the correct answer marked and a short explanation, so the PDF works as a standalone answer key — you do not need to check answers elsewhere.' },
    },
    {
      '@type': 'Question',
      name: 'Is this the same as the real test?',
      acceptedAnswer: { '@type': 'Answer', text: 'These questions are written from the same source as the real test — the official 3rd edition handbook — and cover the same topics. The exact wording of official test questions is never published, so no source, PDF or otherwise, can claim to reproduce the real questions word for word.' },
    },
    {
      '@type': 'Question',
      name: 'Do I need to give my email to download this?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. There is no sign-up, no email, and no payment. Click the button and save the file.' },
    },
  ],
}

function QuestionBlock({ question, number }) {
  return (
    <div className="mb-6 pb-6 border-b border-border last:border-b-0" style={{ breakInside: 'avoid' }}>
      <p className="text-sm font-semibold text-ink mb-2">
        {number}. {question.q}
      </p>
      <ul className="text-sm text-ink-muted space-y-1 mb-2 ml-4">
        {question.options.map((opt, i) => (
          <li key={i} className={i === question.answer ? 'text-success font-semibold' : ''}>
            {String.fromCharCode(65 + i)}) {opt} {i === question.answer && '✓'}
          </li>
        ))}
      </ul>
      <p className="text-xs text-ink-muted italic">{question.explanation}</p>
    </div>
  )
}

export default function QuestionsPdfPage() {
  const chapterSets = CHAPTERS.map(ch => ({
    ...ch,
    questions: getByChapter(ch.id).slice(0, QUESTIONS_PER_CHAPTER),
  }))
  const totalQuestions = chapterSets.reduce((sum, ch) => sum + ch.questions.length, 0)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          Life in the UK Test Questions PDF — {totalQuestions} Free Questions &amp; Answers
        </h1>
        <p className="text-base text-ink leading-relaxed mb-3">
          There is no official Life in the UK test questions PDF from the Home Office — but here is a free one we built instead. {totalQuestions} practice questions with answers and explanations, written from the current 3rd edition handbook, ready to download and print.
        </p>
        <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-4 list-disc list-inside print:hidden">
          <li>{totalQuestions} questions across all chapters — answers and explanations included</li>
          <li>Written from the current 3rd edition handbook</li>
          <li>No sign-up, no email, no payment</li>
          <li>For unlimited practice with all 570 questions, use our <Link href="/practice" className="text-brand underline">free practice tool</Link> instead</li>
        </ul>

        <div className="flex items-center gap-3 mb-6 print:hidden">
          <DownloadPdfButton />
          <ShareButton
            url="https://passtheuktest.co.uk/life-in-the-uk-test-questions-pdf"
            title={`Life in the UK Test Questions PDF — ${totalQuestions} Free Questions & Answers`}
            text="Free Life in the UK test questions PDF — download instantly, no sign-up 🇬🇧"
          />
        </div>

        {/* ── Printable content starts here ── */}
        <div className="border-t border-border pt-6">
          {chapterSets.map(ch => (
            <div key={ch.id} className="mb-8">
              <h2 className="text-lg font-display font-bold text-ink mb-4">
                Chapter {ch.id} — {ch.title}
              </h2>
              {ch.questions.map((q, i) => (
                <QuestionBlock key={q.id} question={q} number={i + 1} />
              ))}
            </div>
          ))}
        </div>
        {/* ── Printable content ends here ── */}

        <div className="print:hidden">
          <div className="mt-8 pt-6 border-t border-white/10">
            <h2 className="text-lg font-display font-bold text-ink mb-3">
              Why there is no official PDF — and why this one is safe to use
            </h2>
            <p className="text-base text-ink leading-relaxed mb-3">
              The Home Office publishes the study handbook but has never published a question bank in any format. Any file online claiming to be the &ldquo;official&rdquo; questions PDF is not from the government. These {totalQuestions} questions are written directly from the current 3rd edition handbook and dated so you can confirm they are current.
            </p>
            <p className="text-base text-ink leading-relaxed mb-3">
              For the full 570-question bank with spaced repetition and a timed mock exam, use the{' '}
              <Link href="/practice" className="text-brand underline">free practice questions</Link>{' '}
              or read the full explanation in our guide on{' '}
              <Link href="/articles/life-in-the-uk-test-questions-pdf" className="text-brand underline">why no official Life in the UK test questions PDF exists</Link>.
            </p>
          </div>

          <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
            Frequently Asked Questions
          </h2>

          <h3 className="text-sm font-bold text-ink mb-1">Is this an official Life in the UK test questions PDF?</h3>
          <p className="text-sm text-ink-muted leading-relaxed mb-4">
            No. The Home Office does not publish an official questions PDF. These questions are written by PassTheUKTest from the current 3rd edition handbook, with full explanations, and are free to download.
          </p>

          <h3 className="text-sm font-bold text-ink mb-1">How do I download this as a PDF?</h3>
          <p className="text-sm text-ink-muted leading-relaxed mb-4">
            Click the Download PDF button above. This opens your browser&apos;s print dialog — choose &ldquo;Save as PDF&rdquo; as the destination instead of a physical printer to save it as a file on your device.
          </p>

          <h3 className="text-sm font-bold text-ink mb-1">Are the answers included?</h3>
          <p className="text-sm text-ink-muted leading-relaxed mb-4">
            Yes. Every question includes the correct answer marked with a checkmark and a short explanation, so the PDF works as a standalone answer key.
          </p>

          <h3 className="text-sm font-bold text-ink mb-1">Is this the same as the real test?</h3>
          <p className="text-sm text-ink-muted leading-relaxed mb-4">
            These questions are written from the same source as the real test — the official 3rd edition handbook — and cover the same topics. The exact wording of official test questions is never published, so no source can claim to reproduce them word for word.
          </p>

          <h3 className="text-sm font-bold text-ink mb-1">Do I need to give my email to download this?</h3>
          <p className="text-sm text-ink-muted leading-relaxed mb-4">
            No. There is no sign-up, no email, and no payment. Click the button and save the file.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm font-bold text-ink mb-2">Related guides and tools</p>
            <ul className="text-sm text-ink-muted space-y-1">
              <li><Link href="/articles/life-in-the-uk-test-questions-pdf" className="text-brand underline">Why no official Life in the UK test questions PDF exists</Link></li>
              <li><Link href="/practice" className="text-brand underline">All 570 free practice questions</Link></li>
              <li><Link href="/mock-test" className="text-brand underline">Free timed mock exams</Link></li>
              <li><Link href="/cheat-sheet" className="text-brand underline">Key facts cheat sheet (also printable)</Link></li>
              <li><Link href="/articles/life-in-the-uk-test-official-handbook" className="text-brand underline">Official handbook study guide</Link></li>
            </ul>
          </div>

          <p className="text-xs text-ink-muted mt-8 leading-relaxed">
            Last reviewed: July 2026 — questions written from the current 3rd edition handbook. Always check GOV.UK for the latest test guidance.
          </p>
        </div>
      </div>
    </>
  )
}
