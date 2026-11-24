/**
 * 用途：全量核对 33 位申请人的「种族 / 出身 / 职业」是否与 prts.wiki 官方一致。
 * 输入：src/mocks/*.ts + prts.wiki API
 * 输出：不一致清单。
 * 依赖：Node 内置 fetch
 */
import { readFileSync } from 'node:fs'

const UA = 'Mozilla/5.0 arknights-gate/0.1'
const FILES = [
  'roster.ts',
  'roster.d2.ts',
  'roster.d2.extra.ts',
  'roster.d3.ts',
  'roster.d3.extra.ts',
  'roster.d4.ts',
  'roster.d4.extra.ts',
  'roster.d5.ts',
  'roster.d5.extra.ts',
  'roster.d1.pool.ts','roster.d2.pool.ts','roster.d3.pool.ts','roster.d4.pool.ts','roster.d5.pool.ts',
]

function loadLocal() {
  const map = new Map()
  for (const f of FILES) {
    const src = readFileSync(`src/mocks/${f}`, 'utf8')
    for (const block of src.split('\n  {')) {
      if (!block.includes("id: '")) continue
      const name = block.match(/codeName: '([^']+)'/)?.[1]
      const race = block.match(/race: '([^']+)'/)?.[1]
      const origin = block.match(/origin: '([^']+)'/)?.[1]
      const occupation = block.match(/occupation: '([^']+)'/)?.[1]
      if (name && !map.has(name)) map.set(name, { race, origin, occupation })
    }
  }
  return map
}

async function fetchProfile(name) {
  const u = new URL('https://prts.wiki/api.php')
  u.search = new URLSearchParams({ action: 'parse', page: name, prop: 'wikitext', format: 'json' }).toString()
  const res = await fetch(u, { headers: { 'User-Agent': UA } })
  const json = await res.json()
  const t = json?.parse?.wikitext?.['*'] ?? ''
  return {
    race: t.match(/\|\s*种族\s*=\s*([^\n|]+)/)?.[1]?.trim() ?? '',
    origin: t.match(/\|\s*出身地\s*=\s*([^\n|]+)/)?.[1]?.trim() ?? '',
    career: t.match(/\|\s*职业\s*=\s*([^\n|]+)/)?.[1]?.trim() ?? '',
  }
}

const local = loadLocal()
const rows = []
for (const [name, mine] of local) {
  const official = await fetchProfile(name)
  const raceOk = !official.race || mine.race === official.race
  const originOk = !official.origin || mine.origin === official.origin
  const careerOk = !official.career || (mine.occupation ?? '').startsWith(official.career)
  rows.push({
    干员: name,
    种族: `${mine.race}${raceOk ? '' : ` → 应为 ${official.race}`}`,
    出身: `${mine.origin}${originOk ? '' : ` → 应为 ${official.origin}`}`,
    职业: `${mine.occupation}${careerOk ? '' : ` → 应为 ${official.career}`}`,
    通过: raceOk && originOk && careerOk ? '✓' : '✗',
  })
  await new Promise((r) => setTimeout(r, 220))
}

console.table(rows)
const bad = rows.filter((r) => r.通过 === '✗')
console.log(bad.length ? `\n需要修正：${bad.map((b) => b.干员).join('、')}` : '\n全部一致')
