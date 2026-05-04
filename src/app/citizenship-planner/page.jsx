import CitizenshipPlannerClient from './CitizenshipPlannerClient'

export async function generateMetadata() {
  return {
    title: 'UK Citizenship Planner 2026 — Timeline & Cost Calculator',
    description: 'Find out when you can apply for British citizenship and the total cost. Enter your ILR date and route — get your eligibility date and complete fee breakdown.',
    alternates: { canonical: 'https://passtheuktest.co.uk/citizenship-planner' },
    openGraph: {
      title: 'UK Citizenship Planner 2026 — Timeline & Cost Calculator',
      description: 'Find out when you can apply for British citizenship and the total cost. Enter your ILR date and route — get your eligibility date and complete fee breakdown.',
      url: 'https://passtheuktest.co.uk/citizenship-planner',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default function CitizenshipPlannerPage() {
  return <CitizenshipPlannerClient />
}
