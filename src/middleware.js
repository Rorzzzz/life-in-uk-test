import { NextResponse } from 'next/server'

export function middleware(request) {
  const host = request.headers.get('host') || ''

  // Redirect www → non-www (permanent 301)
  if (host.startsWith('www.')) {
    const nonWwwHost = host.slice(4)
    const url = request.nextUrl.clone()
    url.host = nonWwwHost
    return NextResponse.redirect(url, { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  // Run on all paths except static files and API routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
