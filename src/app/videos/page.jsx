import LiteYouTube from '@/components/ui/LiteYouTube'
import Link from 'next/link'

export const metadata = {
  title: 'Free Life in the UK Test Videos 2026 — PassTheUKTest',
  description: 'Watch free Life in the UK test practice videos, mock exam walkthroughs, and study guides. Pass your citizenship test first time.',
  alternates: { canonical: 'https://passtheuktest.co.uk/videos' },
}

const VIDEOS = [
  {
    id: '4XKqOlGB3Bg',
    title: 'Free Life in the UK Test Practice 2026 + Mock Exams',
    description: '570 free practice questions, adaptive learning, and full mock exams. No login. No paywall. Everything you need to pass first time.',
    date: 'May 2026',
  },
]

export default function VideosPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          Free Videos
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          Practice walkthroughs, mock exams, and study guides — all free.{' '}
          <a
            href="https://www.youtube.com/@PasstheUKTest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:text-brand-300 transition-colors"
          >
            Subscribe on YouTube
          </a>{' '}
          to get new videos when they drop.
        </p>
      </div>

      <div className="space-y-6">
        {VIDEOS.map(video => (
          <div key={video.id} className="bg-card rounded-2xl border border-border overflow-hidden">
            <LiteYouTube videoId={video.id} title={video.title} className="rounded-none" />
            <div className="p-4">
              <p className="text-xs text-ink-muted font-mono mb-1">{video.date}</p>
              <h2 className="text-base font-display font-bold text-ink mb-2">{video.title}</h2>
              <p className="text-sm text-ink-muted leading-relaxed">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-5 bg-card rounded-2xl border border-border text-center">
        <p className="text-sm text-ink-muted mb-3">More videos coming soon.</p>
        <a
          href="https://www.youtube.com/@PasstheUKTest"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-xl transition-colors"
        >
          Subscribe on YouTube
        </a>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm font-semibold text-ink mb-3">Start practising free</p>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/practice" className="bg-card border border-border rounded-xl p-3 text-sm text-ink hover:bg-raised transition-colors text-center">
            570 Practice Questions
          </Link>
          <Link href="/exam" className="bg-card border border-border rounded-xl p-3 text-sm text-ink hover:bg-raised transition-colors text-center">
            Full Mock Exam
          </Link>
        </div>
      </div>
    </main>
  )
}
