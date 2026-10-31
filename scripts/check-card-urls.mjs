import {
  profileViewsUrl,
  statsCardUrl,
  streakCardUrl,
  topLangsCardUrl,
} from '../lib/stats-cards.mjs'

const username = process.argv[2] || 'octocat'
const cards = {
  stats: statsCardUrl(username),
  topLangs: topLangsCardUrl(username),
  streak: streakCardUrl(username),
  profileViews: profileViewsUrl(username),
}

let failed = 0
for (const [name, url] of Object.entries(cards)) {
  const res = await fetch(url, { redirect: 'follow' })
  const type = res.headers.get('content-type') || ''
  const body = await res.text()
  // Card services answer rate limits and errors with a 200 SVG that says so.
  const errorCard = /something went wrong|rate limit/i.test(body)
  const ok = res.ok && type.startsWith('image/') && !errorCard
  if (!ok) failed++
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${name} ${res.status} ${type}${errorCard ? ' error-card' : ''} ${url}`)
}

if (failed) {
  console.error(`${failed} card URL(s) broken`)
  process.exit(1)
}
