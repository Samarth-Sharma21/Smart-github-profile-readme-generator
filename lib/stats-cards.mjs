// github-readme-stats.vercel.app is paused; Stats-Extended documents itself as a drop-in replacement.
const HOSTED_STATS_BASE = 'https://github-stats-extended.vercel.app'

export const PROFILE_CARD_PATHS = {
  stats: 'profile/stats.svg',
  topLangs: 'profile/top-langs.svg',
}

const user = (username) => encodeURIComponent(username.trim())

export const statsCardUrl = (username) =>
  `${HOSTED_STATS_BASE}/api?username=${user(username)}&locale=en&theme=dark&hide_border=false&border_radius=5&show_icons=true`

export const topLangsCardUrl = (username) =>
  `${HOSTED_STATS_BASE}/api/top-langs?username=${user(username)}&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=dark&hide_border=false&border_radius=5`

export const streakCardUrl = (username) =>
  `https://streak-stats.demolab.com?user=${user(username)}&locale=en&mode=daily&theme=dark&hide_border=false&border_radius=5`

export const profileViewsUrl = (username) =>
  `https://komarev.com/ghpvc/?username=${user(username)}&label=Profile%20views&color=0e75b6&style=flat&base=1000`

export function cardsWorkflowYaml({ stats, topLangs }) {
  const steps = []
  if (stats) {
    steps.push(`      - name: Generate stats card
        uses: stats-organization/github-readme-stats-action@v2
        with:
          card: stats
          options: username=\${{ github.repository_owner }}&show_icons=true&theme=dark
          path: ${PROFILE_CARD_PATHS.stats}
          token: \${{ secrets.GITHUB_TOKEN }}`)
  }
  if (topLangs) {
    steps.push(`      - name: Generate top languages card
        uses: stats-organization/github-readme-stats-action@v2
        with:
          card: top-langs
          options: username=\${{ github.repository_owner }}&layout=compact&langs_count=5&theme=dark
          path: ${PROFILE_CARD_PATHS.topLangs}
          token: \${{ secrets.GITHUB_TOKEN }}`)
  }
  if (steps.length === 0) return ''

  return `name: Update README cards

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v7

${steps.join('\n\n')}

      - name: Commit cards
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add profile/*.svg
          git commit -m "Update README cards" || exit 0
          git push
`
}
