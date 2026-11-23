/**
 * 用途：从 prts.wiki 拉取 21 位干员的官方职业，与剧本数据逐条比对。
 * 输入：src/mocks/*.ts
 * 输出：不一致清单。
 * 依赖：Node 内置 fetch
 */
import { readFileSync } from 'node:fs'

const FILES = [
  'roster.ts',
  'roster.d2.ts',
  'roster.d3.ts',
  'roster.d4.ts',
  'roster.d5.ts',
  'roster.d4.docs.ts',
  'roster.d5.docs.ts',
]

const NAMES = [
  '克洛丝', '芬', '米格鲁',
  '安赛尔', '卡缇', '玫兰莎', '炎熔',
  '杰西卡', '流星', '阿米娅', '杜宾',
  '德克萨斯', '能天使', '拉普兰德', '可颂', '银灰',
  '夜莺', '闪灵', '星熊', '陈', '推进之王',
]

function localCareers() {
  // 读取「档案」里的职业（档案代表真实在册信息；申报职业可能是入侵者的伪造自述）
  const map = new Map()
  const re = /codeName: '([^']+)',\s*\n\s*number: '[^']+',\s*\n\s*occupation: '([^']+)'/
  for (const f of FILES) {
    const src = readFileSync(`src/mocks/${f}`, 'utf8')
    for (const m of src.matchAll(new RegExp(re, 'g'))) {
      if (!map.has(m[1])) map.set(m[1], m[2])
    }
  }
  return map
}

async function wikiCareer(name) {
  const u = new URL('https://prts.wiki/api.php')
  u.search = new URLSearchParams({ action: 'parse', page: name, prop: 'wikitext', format: 'json' }).toString()
  const res = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0 arknights-gate/0.1' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  const text = json?.parse?.wikitext?.['*'] ?? ''
  const career = text.match(/\|\s*职业\s*=\s*([^\n|]+)/)?.[1]?.trim() ?? '?'
  const branch = text.match(/\|\s*分支\s*=\s*([^\n|]+)/)?.[1]?.trim() ?? ''
  return `${career}${branch ? `·${branch}` : ''}`
}

const local = localCareers()
const rows = []
for (const name of NAMES) {
  const w = await wikiCareer(name)
  const l = local.get(name) ?? '（数据缺失）'
  const ok = w.startsWith(l.replace('干员', ''))
  rows.push({ 干员: name, 本地: l, 官方: w, 一致: ok ? '✓' : '✗' })
  await new Promise((r) => setTimeout(r, 250))
}

console.table(rows)
const bad = rows.filter((r) => r.一致 === '✗')
console.log(bad.length ? `\n需要修正：${bad.map((b) => b.干员).join('、')}` : '\n全部一致')
