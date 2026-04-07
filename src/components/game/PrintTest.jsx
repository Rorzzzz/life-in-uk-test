'use client'

import { Printer } from 'lucide-react'
import Button from '@/components/ui/Button'

// Gap 6: PDF Export via window.print()
// Uses @media print CSS in globals.css to hide navigation and gamification elements
export default function PrintTest({ testNumber, score, total, questions }) {
  function handlePrint() {
    window.print()
  }

  return (
    <>
      {/* Print button — hidden in print */}
      <Button variant="secondary" onClick={handlePrint} className="print:hidden gap-2">
        <Printer size={16} />
        Download / Print Results
      </Button>

      {/* Printable content — only visible when printing */}
      <div className="hidden print:block">
        <h1 className="text-2xl font-bold mb-2">Pass the UK Test — Mock Test {testNumber} Results</h1>
        <p className="text-lg mb-6">Score: {score}/{total} ({Math.round(score/total*100)}%) — {score >= 18 ? 'PASS ✓' : 'FAIL ✗'}</p>
        {questions.map((q, i) => (
          <div key={q.id} className="mb-6 pb-6 border-b border-gray-300">
            <p className="font-semibold mb-2">{i + 1}. {q.q}</p>
            <p className="text-green-700 font-medium">Answer: {q.options[q.answer]}</p>
            <p className="text-gray-600 text-sm mt-1">{q.explanation}</p>
          </div>
        ))}
        <p className="text-xs text-gray-400 mt-8">passtheuktest.co.uk — Free Life in the UK Test Practice</p>
      </div>
    </>
  )
}
