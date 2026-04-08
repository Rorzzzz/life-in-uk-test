import Link from 'next/link'

export const metadata = {
  title: 'Life in the UK Test Format — How the Test Works',
  description: 'Everything about the Life in the UK test format: 24 questions, 45 minutes, multiple choice, computer-based, immediate results.',
  alternates: { canonical: 'https://passtheuktest.co.uk/exam-format' },
}

export default function ExamFormatPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">Life in the UK Test Format</h1>
      <p className="text-ink-muted text-base mb-8">Everything you need to know about how the test works.</p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {[
          { label: 'Questions',   value: '24',        icon: '📝' },
          { label: 'Time limit',  value: '45 min',    icon: '⏱️' },
          { label: 'Pass mark',   value: '18/24',     icon: '🎯' },
          { label: 'Cost',        value: '£50',       icon: '💷' },
          { label: 'Format',      value: 'Multiple choice', icon: '☑️' },
          { label: 'Results',     value: 'Immediate', icon: '⚡' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-card rounded-2xl p-4 text-center">
            <p className="text-2xl mb-1">{icon}</p>
            <p className="font-mono font-bold text-lg text-ink">{value}</p>
            <p className="text-xs text-ink-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        {[
          {
            heading: 'What is the Life in the UK test?',
            content: 'The Life in the UK test is a mandatory computer-based test that people applying for Indefinite Leave to Remain (settlement) or British citizenship must pass. It tests knowledge of British history, culture, government, law, and values.',
          },
          {
            heading: 'How many questions are there?',
            content: 'There are 24 questions in the test. Each question has 4 possible answers and you must select the correct one. There is no penalty for wrong answers.',
          },
          {
            heading: 'What is the pass mark?',
            content: 'You need to answer at least 18 questions correctly to pass — that is 75% (three-quarters of the questions). If you score 17 or fewer, you fail and must retake.',
          },
          {
            heading: 'How long do you have?',
            content: 'You have 45 minutes to complete the test. Most people finish in 15-25 minutes. The test is not time-pressured for the average candidate.',
          },
          {
            heading: 'What is the test based on?',
            content: 'Every question comes from the official handbook: "Life in the United Kingdom: A Guide for New Residents" (3rd edition). You must study the whole book — questions cover all 5 chapters.',
          },
          {
            heading: 'How are results given?',
            content: 'Your result (pass or fail) is shown on screen immediately when you finish. If you pass, you will also receive a pass notification letter, which you use for your visa or citizenship application.',
          },
        ].map(({ heading, content }) => (
          <div key={heading} className="bg-card rounded-2xl p-5">
            <h2 className="font-semibold text-ink mb-2">{heading}</h2>
            <p className="text-base text-ink-muted leading-relaxed">{content}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-2 justify-center flex-wrap">
        <Link href="/articles/what-is-the-life-in-the-uk-test" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Full test overview</Link>
        <Link href="/articles/how-much-does-the-life-in-the-uk-test-cost" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Test cost</Link>
        <Link href="/faq" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Full FAQ</Link>
        <Link href="/exam" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Take a mock exam</Link>
        <Link href="/how-to-pass" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">How to pass</Link>
      </div>
    </div>
  )
}
