/**
 * 用途：从 prts.wiki 抓取干员头像，落到 public/assets/portraits/。
 * 输入：内置干员名单（中文名 + 文件名 id）。
 * 输出：PNG 文件 + 抓取结果清单。
 * 依赖：Node 26 内置 fetch。
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'

const OUT_DIR = join(process.cwd(), 'public', 'assets', 'portraits')
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) arknights-gate-prototype/0.1 (contact: local-dev)'

/** 干员名单：中文名 -> 本地文件名 */
const ROSTER = [
  ['克洛丝', 'kroos'],
  ['芬', 'fang'],
  ['米格鲁', 'beagle'],
  ['安赛尔', 'ansel'],
  ['卡缇', 'catapult'],
  ['玫兰莎', 'melantha'],
  ['炎熔', 'haze'],
  ['杰西卡', 'jessica'],
  ['流星', 'meteor'],
  ['杜宾', 'dobermann'],
  ['阿米娅', 'amiya'],
  ['德克萨斯', 'texas'],
  ['能天使', 'exusiai'],
  ['拉普兰德', 'lappland'],
  ['可颂', 'croissant'],
  ['银灰', 'silverash'],
  ['夜莺', 'nightingale'],
  ['闪灵', 'shining'],
  ['星熊', 'hoshiguma'],
  ['推进之王', 'siege'],
]

async function resolveUrl(cnName) {
  const u = new URL('https://prts.wiki/api.php')
  u.search = new URLSearchParams({
    action: 'query',
    format: 'json',
    prop: 'imageinfo',
    iiprop: 'url',
    titles: `File:头像_${cnName}.png`,
  }).toString()
  const res = await fetch(u, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`api ${res.status}`)
  const json = await res.json()
  const pages = json?.query?.pages ?? {}
  const page = Object.values(pages)[0]
  const url = page?.imageinfo?.[0]?.url
  if (!url) throw new Error('no imageinfo')
  return url
}

async function download(url, file) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Referer: 'https://prts.wiki/' } })
  if (!res.ok) throw new Error(`download ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.subarray(1, 4).toString() !== 'PNG') throw new Error('not png')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, buf)
  return buf.length
}

const report = []
for (const [cn, id] of ROSTER) {
  const file = join(OUT_DIR, `${id}.png`)
  if (existsSync(file)) {
    report.push({ id, cn, status: 'skip-exists' })
    continue
  }
  try {
    const url = await resolveUrl(cn)
    const bytes = await download(url, file)
    report.push({ id, cn, status: 'ok', bytes })
  } catch (e) {
    report.push({ id, cn, status: 'fail', error: String(e.message) })
  }
  await new Promise((r) => setTimeout(r, 300))
}

console.log(JSON.stringify(report, null, 1))
