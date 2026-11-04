'use client'

import { useEffect } from 'react'

// Pauses AdSense ad requests on screens that must not show ads (e.g. the 404
// page, per Google Publisher Policy 11112688), using AdSense's documented
// `pauseAdRequests` flag. Resumes on unmount so the next page's ads load.
//
// The inline script covers full page loads (it runs while the HTML is parsed,
// before adsbygoogle.js usually arrives); the effect covers client-side nav.
const PAUSE = '(window.adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=1;'

export default function NoAds() {
  useEffect(() => {
    window.adsbygoogle = window.adsbygoogle || []
    window.adsbygoogle.pauseAdRequests = 1
    return () => { window.adsbygoogle.pauseAdRequests = 0 }
  }, [])

  return <script dangerouslySetInnerHTML={{ __html: PAUSE }} />
}
