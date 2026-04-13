import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'Life in the UK Test Format 2026 — Question Types, Timer & Interface Explained',
  description: 'Complete guide to the Life in the UK test format: 24 questions, 45 minutes, 4 question types, practice test, timer alerts, and how to flag and review answers.',
  alternates: { canonical: 'https://passtheuktest.co.uk/exam-format' },
}

export default function ExamFormatPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Exam Format', path: '/exam-format' }]} />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">Life in the UK Test Format</h1>
        <p className="text-ink-muted text-base mb-8">Everything you need to know about how the test works — question types, the interface, the timer, and what happens on the day.</p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: 'Questions',  value: '24',     icon: '📝' },
            { label: 'Time limit', value: '45 min', icon: '⏱️' },
            { label: 'Pass mark',  value: '18/24',  icon: '🎯' },
            { label: 'Cost',       value: '£50',    icon: '💷' },
            { label: 'Format',     value: 'Computer', icon: '🖥️' },
            { label: 'Results',    value: 'Instant', icon: '⚡' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-card rounded-2xl p-4 text-center">
              <p className="text-2xl mb-1">{icon}</p>
              <p className="font-mono font-bold text-lg text-ink">{value}</p>
              <p className="text-xs text-ink-muted">{label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-5">

          {/* Overview */}
          <div className="bg-card rounded-2xl p-5">
            <h2 className="font-semibold text-ink mb-2">What is the Life in the UK test?</h2>
            <p className="text-base text-ink-muted leading-relaxed">
              The Life in the UK test is a mandatory computer-based test for anyone applying for Indefinite Leave to Remain (ILR/settlement) or British citizenship (naturalisation). It tests knowledge of British history, culture, government, law, and values — all drawn from the official handbook.
            </p>
          </div>

          {/* Question types */}
          <div className="bg-card rounded-2xl p-5">
            <h2 className="font-semibold text-ink mb-3">The 4 question types</h2>
            <p className="text-base text-ink-muted leading-relaxed mb-4">
              The test uses four distinct question formats. Knowing them in advance prevents surprises on the day.
            </p>
            <div className="space-y-4">
              <div className="bg-raised rounded-xl p-4 border-l-4 border-brand-500">
                <p className="text-sm font-semibold text-ink mb-1">Type 1 — Single correct answer</p>
                <p className="text-sm text-ink-muted mb-2">The most common format. Four options are shown and you select one correct answer.</p>
                <div className="bg-surface rounded-lg p-3 text-sm">
                  <p className="text-ink-muted italic mb-2">&ldquo;In what year did women get the right to vote on the same terms as men?&rdquo;</p>
                  <p className="text-xs text-ink-muted">○ 1902 &nbsp; ● <span className="text-success font-medium">1928</span> &nbsp; ○ 1918 &nbsp; ○ 1945</p>
                </div>
              </div>

              <div className="bg-raised rounded-xl p-4 border-l-4 border-amber-500">
                <p className="text-sm font-semibold text-ink mb-1">Type 2 — Two correct answers</p>
                <p className="text-sm text-ink-muted mb-2">Some questions explicitly ask you to select <strong className="text-ink">two</strong> correct answers from four options. The question will state this clearly. Both must be correct to earn the mark.</p>
                <div className="bg-surface rounded-lg p-3 text-sm">
                  <p className="text-ink-muted italic mb-2">&ldquo;Which TWO of the following are roles of the Prime Minister?&rdquo;</p>
                  <p className="text-xs text-ink-muted">☑ <span className="text-success font-medium">Appointing Cabinet ministers</span> &nbsp; ☐ Signing all laws &nbsp; ☑ <span className="text-success font-medium">Recommending appointments to the Queen</span> &nbsp; ☐ Chairing the Supreme Court</p>
                </div>
              </div>

              <div className="bg-raised rounded-xl p-4 border-l-4 border-success">
                <p className="text-sm font-semibold text-ink mb-1">Type 3 — True or False</p>
                <p className="text-sm text-ink-muted mb-2">A statement is presented and you select whether it is true or false. Straightforward in format but candidates often get caught out by statements that are partially correct.</p>
                <div className="bg-surface rounded-lg p-3 text-sm">
                  <p className="text-ink-muted italic mb-2">&ldquo;The UK has a written constitution.&rdquo;</p>
                  <p className="text-xs text-ink-muted">○ True &nbsp; ● <span className="text-success font-medium">False</span></p>
                </div>
              </div>

              <div className="bg-raised rounded-xl p-4 border-l-4 border-danger">
                <p className="text-sm font-semibold text-ink mb-1">Type 4 — Choose the correct statement</p>
                <p className="text-sm text-ink-muted mb-2">Two statements are presented (Statement A and Statement B) and you choose which one is correct, both, or neither. Tests fine-grained knowledge of specific facts.</p>
                <div className="bg-surface rounded-lg p-3 text-sm">
                  <p className="text-ink-muted italic mb-2">&ldquo;Which statement is correct?&rdquo;</p>
                  <p className="text-xs text-ink-muted">○ Statement A: The Magna Carta was signed in 1215 by King John &nbsp; ○ Statement B: Both A and B &nbsp; ● <span className="text-success font-medium">Statement A only</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Practice test */}
          <div className="bg-card rounded-2xl p-5">
            <h2 className="font-semibold text-ink mb-2">The 4-question practice test</h2>
            <p className="text-base text-ink-muted leading-relaxed mb-3">
              Before your real test begins, you are given a short <strong className="text-ink">4-question practice test</strong> to familiarise yourself with the computer interface and the question formats. The practice test does not count towards your score and is not timed.
            </p>
            <p className="text-base text-ink-muted leading-relaxed">
              Use this time to check the screen brightness, ensure you understand how to select and deselect answers, and confirm the navigation buttons work as expected. Do not rush through it.
            </p>
          </div>

          {/* The interface */}
          <div className="bg-card rounded-2xl p-5">
            <h2 className="font-semibold text-ink mb-3">The computer interface</h2>
            <p className="text-base text-ink-muted leading-relaxed mb-4">
              The test runs on a standard web browser at the test centre. Questions appear one at a time on a clean interface. Here is what you will see:
            </p>
            <ul className="space-y-3">
              {[
                { icon: '🔢', label: 'Question counter', detail: 'Shows your position — e.g. "Question 7 of 24" — so you always know how many remain.' },
                { icon: '⏱️', label: 'Countdown timer', detail: 'Displayed continuously on screen. A visual alert appears when you have 5 minutes remaining. Most candidates finish well within 45 minutes.' },
                { icon: '🚩', label: 'Flag for review', detail: 'You can flag any question to revisit later. A flagged question appears in a different colour on the review screen.' },
                { icon: '◀▶', label: 'Navigation', detail: 'Previous and Next buttons let you move freely between questions at any time. You are not locked into a linear order.' },
                { icon: '📋', label: 'Review screen', detail: 'Before submitting, a summary screen shows every question as answered, unanswered, or flagged. You can click any question to return to it.' },
              ].map(({ icon, label, detail }) => (
                <li key={label} className="flex gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{label}</p>
                    <p className="text-sm text-ink-muted">{detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Timer strategy */}
          <div className="bg-card rounded-2xl p-5">
            <h2 className="font-semibold text-ink mb-2">How to use the 45 minutes</h2>
            <p className="text-base text-ink-muted leading-relaxed mb-3">
              45 minutes is generous for 24 questions — roughly 112 seconds per question. The average candidate finishes in 15–25 minutes. Time pressure is almost never the reason people fail.
            </p>
            <p className="text-base text-ink-muted leading-relaxed mb-3">
              The recommended approach:
            </p>
            <ol className="space-y-2 text-sm text-ink-muted list-decimal list-inside">
              <li>Answer every question you are confident about first, flagging any you are unsure of</li>
              <li>Return to flagged questions and use the process of elimination</li>
              <li>Never leave a question unanswered — there is no penalty for a wrong answer, so always guess if unsure</li>
              <li>Use the review screen before submitting to confirm no questions are blank</li>
            </ol>
          </div>

          {/* Results */}
          <div className="bg-card rounded-2xl p-5">
            <h2 className="font-semibold text-ink mb-2">How are results given?</h2>
            <p className="text-base text-ink-muted leading-relaxed mb-3">
              Your result (pass or fail) is displayed on screen immediately when you submit the test. If you pass, you receive a <strong className="text-ink">pass notification letter</strong> from the test centre — keep this document carefully, as you will need it for your ILR or citizenship application.
            </p>
            <p className="text-base text-ink-muted leading-relaxed">
              If you fail, the screen shows your score. You can rebook and retake the test as soon as a slot is available — there is no mandatory waiting period. Each retake costs £50.
            </p>
          </div>

          {/* Pass mark */}
          <div className="bg-card rounded-2xl p-5">
            <h2 className="font-semibold text-ink mb-2">Pass mark and scoring</h2>
            <p className="text-base text-ink-muted leading-relaxed">
              You need <strong className="text-ink">18 out of 24 correct (75%)</strong> to pass. For two-correct-answer questions, both selections must be right to receive the mark — a partial answer scores zero. There is no negative marking, so always make a selection even if you are unsure.
            </p>
          </div>

          {/* What to bring */}
          <div className="bg-card rounded-2xl p-5">
            <h2 className="font-semibold text-ink mb-2">What to bring on test day</h2>
            <ul className="space-y-2 text-base text-ink-muted">
              {[
                'Valid photo ID — passport or Biometric Residence Permit (BRP). Driving licences are not accepted.',
                'Your booking confirmation email or reference number.',
                'Arrive at least 15 minutes before your appointment — late arrival may result in losing your slot and fee.',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-brand-400 flex-shrink-0 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-8 bg-brand-500/10 border border-brand-500/20 rounded-2xl p-5 text-center">
          <p className="font-semibold text-ink mb-1">Now you know the format — practise it</p>
          <p className="text-sm text-ink-muted mb-4">Our mock exam replicates the real test: 24 questions, 45 minutes, immediate result.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/exam" className="px-5 py-2.5 bg-brand-500 text-white rounded-xl font-semibold text-sm hover:bg-brand-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              Take a mock exam
            </Link>
            <Link href="/practice" className="px-5 py-2.5 bg-card border border-border text-ink rounded-xl font-semibold text-sm hover:bg-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              Practise questions
            </Link>
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-center flex-wrap">
          <Link href="/articles/what-is-the-life-in-the-uk-test" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">What is the test?</Link>
          <Link href="/articles/how-much-does-the-life-in-the-uk-test-cost" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Test cost</Link>
          <Link href="/pass-rate" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Pass rate</Link>
          <Link href="/faq" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Full FAQ</Link>
          <Link href="/how-to-pass" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">How to pass</Link>
        </div>
      </div>
    </>
  )
}
