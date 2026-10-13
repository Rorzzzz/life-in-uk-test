import { NextResponse } from 'next/server'

// Articles permanently removed (410 Gone). These MDX files no longer exist.
// Returning 410 (not 404) tells Google the removal is intentional and permanent.
const GONE_410 = new Set([
  '/articles/skilled-worker-visa-requirements',
  '/articles/skilled-worker-visa-renewal-uk',
  '/articles/change-employer-skilled-worker-visa',
  '/articles/second-job-skilled-worker-visa-uk',
  '/articles/sponsor-licence-revoked-skilled-worker',
  '/articles/spouse-visa-financial-requirement',
  '/articles/ict-visa-ilr-uk',
  '/articles/scale-up-visa-ilr-uk',
  '/articles/global-talent-visa-ilr',
  '/articles/graduate-visa-ilr-uk',
  '/articles/health-and-care-worker-visa-ilr',
  '/articles/uk-ancestry-visa-ilr-settlement',
  '/articles/ilr-10-year-long-residence-route',
  '/articles/ilr-for-spouse-and-family-visa-2026',
  '/articles/ilr-for-children-uk',
  '/articles/section-3c-leave-uk',
  '/articles/no-recourse-to-public-funds-uk',
  '/articles/immigration-health-surcharge-refund',
  '/articles/immigration-health-surcharge-ilr',
  '/articles/is-nhs-free-for-ilr-holders',
  '/articles/how-to-get-a-share-code',
  '/articles/how-to-create-a-ukvi-account',
  '/articles/what-is-evisa-uk',
  '/articles/biometric-residence-permit-guide',
  '/articles/ile-vs-ilr-uk',
  '/articles/ilr-vs-settled-status',
  '/articles/benefits-of-ilr-uk',
  '/articles/disadvantages-of-ilr',
  '/articles/does-ilr-expire',
  '/articles/ilr-travel-rights-uk',
  '/articles/ilr-priority-service-uk',
  '/articles/ilr-processing-time-2026',
  '/articles/ilr-refusal-reasons-2026',
  '/articles/ilr-refused-what-to-do',
  '/articles/dual-citizenship-uk-countries',
  '/articles/british-citizenship-by-descent',
  '/articles/british-children-born-abroad',
  '/articles/child-british-citizenship-born-in-uk',
  '/articles/can-you-lose-british-citizenship',
  '/articles/can-i-get-uk-pr-in-2-years',
])

export function middleware(request) {
  const host = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  // Redirect www → non-www (permanent 301)
  if (host.startsWith('www.')) {
    const nonWwwHost = host.slice(4)
    const url = request.nextUrl.clone()
    url.host = nonWwwHost
    return NextResponse.redirect(url, { status: 301 })
  }

  // Return 410 Gone for permanently removed articles
  if (GONE_410.has(pathname)) {
    return new NextResponse('Gone', { status: 410 })
  }

  return NextResponse.next()
}

export const config = {
  // Run on all paths except static files and API routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
