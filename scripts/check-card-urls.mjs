import {
  CARDS_ACTION,
  CARDS_ACTION_INPUTS,
  cardsWorkflowYaml,
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

// Card services answer failures with a 200 SVG; these are the texts they use.
const ERROR_CARD = /something went wrong|rate limit|could not|error lable/i

let failed = 0
const report = (ok, line) => {
  if (!ok) failed++
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${line}`)
}

for (const [name, url] of Object.entries(cards)) {
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20_000) })
    const type = res.headers.get('content-type') || ''
    const errorCard = ERROR_CARD.test(await res.text())
    report(res.ok && type.startsWith('image/') && !errorCard,
      `${name} ${res.status} ${type}${errorCard ? ' error-card' : ''} ${url}`)
  } catch (err) {
    report(false, `${name} ${err.name}: ${err.message} ${url}`)
  }
}

// The generated workflow must only use inputs the pinned action declares.
try {
  const res = await fetch(`https://raw.githubusercontent.com/${CARDS_ACTION}/v2/action.yml`, {
    signal: AbortSignal.timeout(20_000),
  })
  const actionYml = await res.text()
  const inputsBlock = actionYml.split(/^inputs:\s*$/m)[1]?.split(/^\S/m)[0] ?? ''
  const declared = [...inputsBlock.matchAll(/^ {2}([a-z_]+):\s*$/gm)].map((m) => m[1])
  const workflow = cardsWorkflowYaml({ stats: true, topLangs: true })
  const used = [...new Set([...workflow.matchAll(/^ {10}([a-z_]+):/gm)].map((m) => m[1]))]
  const missing = used.filter((input) => !declared.includes(input))
  report(res.ok && missing.length === 0 && CARDS_ACTION_INPUTS.every((i) => declared.includes(i)),
    `workflow inputs ${used.join(',')}${missing.length ? ` not declared by ${CARDS_ACTION}@v2: ${missing.join(',')}` : ''}`)
} catch (err) {
  report(false, `workflow inputs ${err.name}: ${err.message}`)
}

if (failed) {
  console.error(`${failed} check(s) failed`)
  process.exit(1)
}
