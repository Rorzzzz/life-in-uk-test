// IndexNow submitter — notifies Bing/Yandex/Seznam/Naver (and Bing-powered AI
// search) of our URLs. Google does NOT use IndexNow.
//
// Usage:
//   npm run indexnow            → submit ALL sitemap URLs (use sparingly / to prime)
//   npm run indexnow -- <url>…  → submit only the given URL(s) (preferred for updates)
//
// The key file public/<KEY>.txt must be live in production first (IndexNow
// fetches it to verify ownership before accepting the URLs).

import { readFileSync } from 'node:fs'

const KEY  = 'f3f3638814b644f7b126cd2e43f4650a' // Bing Webmaster Tools-generated IndexNow key
const HOST = 'passtheuktest.co.uk'
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const SITEMAP = 'public/sitemap-0.xml'

function sitemapUrls() {
  const xml = readFileSync(SITEMAP, 'utf8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim())
}

const args = process.argv.slice(2).filter(Boolean)
const urlList = args.length ? args : sitemapUrls()

if (!urlList.length) {
  console.error('No URLs to submit.')
  process.exit(1)
}

// IndexNow accepts up to 10,000 URLs per request; we are well under that.
const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
}

console.log(`Submitting ${urlList.length} URL(s) to IndexNow…`)
const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})
const text = await res.text().catch(() => '')
console.log(`IndexNow response: ${res.status} ${res.statusText}`)
if (text) console.log(text)
// 200 = accepted; 202 = accepted, key validation pending. Both are success.
process.exit(res.status === 200 || res.status === 202 ? 0 : 1)
