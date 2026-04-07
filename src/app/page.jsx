import Link from 'next/link'
import { CHAPTERS } from '@/data/questions'
import HomeDashboard from './HomeDashboard'

export const metadata = {
  title: 'Pass the UK Test — Free Life in the UK Test Practice 2026',
  description: 'Practice for your Life in the UK citizenship test with 570 free questions, adaptive learning, and gamified revision. Pass first time.',
  alternates: { canonical: 'https://passtheuktest.co.uk' },
}

export default function HomePage() {
  return <HomeDashboard chapters={CHAPTERS} />
}
