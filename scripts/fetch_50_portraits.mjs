/**
 * 用途：批量抓取新增 50 位干员的头像（prts.wiki）。
 * 输入：内置名单（中文名 -> 本地文件名）。
 * 输出：public/assets/portraits/*.png + 成功/失败清单。
 * 依赖：Node 内置 fetch
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const UA = 'Mozilla/5.0 arknights-gate/0.2'
const DIR = join(process.cwd(), 'public', 'assets', 'portraits')

/** 中文名 -> 文件名 */
const ROSTER = [
  ['斯卡蒂', 'skadi'],
  ['幽灵鲨', 'specter'],
  ['白金', 'platinum'],
  ['蓝毒', 'bluepoison'],
  ['白面鸮', 'ptilopsis'],
  ['雷蛇', 'liskarm'],
  ['初雪', 'pramanix'],
  ['崖心', 'cliffheart'],
  ['角峰', 'matterhorn'],
  ['蛇屠箱', 'cuora'],
  ['古米', 'gummy'],
  ['空', 'sora'],
  ['真理', 'istina'],
  ['凛冬', 'zima'],
  ['因陀罗', 'indra'],
  ['慕斯', 'mousse'],
  ['猎蜂', 'beehunter'],
  ['送葬人', 'executor'],
  ['红', 'projektred'],
  ['砾', 'gravel'],
  ['暗索', 'rope'],
  ['深海色', 'deepcolor'],
  ['梅尔', 'mayer'],
  ['麦哲伦', 'magallan'],
  ['伊芙利特', 'ifrit'],
  ['艾雅法拉', 'eyjafjalla'],
  ['天火', 'skyfire'],
  ['远山', 'gitano'],
  ['夜魔', 'nightmare'],
  ['塞雷娅', 'saria'],
  ['星极', 'astesia'],
  ['诗怀雅', 'swire'],
  ['陨星', 'meteorite'],
  ['白雪', 'shirayuki'],
  ['安德切尔', 'adnachiel'],
  ['史都华德', 'steward'],
  ['泡普卡', 'popukar'],
  ['月见夜', 'midnight'],
  ['普罗旺斯', 'provence'],
  ['守林人', 'firewatch'],
  ['灰喉', 'greyy'],
  ['安比尔', 'ambriel'],
  ['奥斯塔', 'aosta'],
  ['鞭刃', 'whislash'],
  ['瑕光', 'blemishine'],
  ['石棉', 'asbestos'],
  ['极境', 'elysium'],
  ['早露', 'rosa'],
  ['棘刺', 'thorns'],
  ['格拉尼', 'grani'],
]

async function resolveUrl(cn) {
  const u = new URL('https://prts.wiki/api.php')
  u.search = new URLSearchParams({
    action: 'query',
    format: 'json',
    prop: 'imageinfo',
    iiprop: 'url',
    titles: `File:头像_${cn}.png`,
  }).toString()
  const res = await fetch(u, { headers: { 'User-Agent': UA } })
  const json = await res.json()
  const page = Object.values(json?.query?.pages ?? {})[0]
  return page?.imageinfo?.[0]?.url ?? null
}

const report = []
for (const [cn, id] of ROSTER) {
  const file = join(DIR, `${id}.png`)
  if (existsSync(file) && id !== 'x') {
    report.push({ cn, id, status: 'exists' })
    continue
  }
  try {
    const url = await resolveUrl(cn)
    if (!url) {
      report.push({ cn, id, status: 'not-found' })
      continue
    }
    const res = await fetch(url, { headers: { 'User-Agent': UA, Referer: 'https://prts.wiki/' } })
    const buf = Buffer.from(await res.arrayBuffer())
    mkdirSync(DIR, { recursive: true })
    writeFileSync(file, buf)
    report.push({ cn, id, status: 'ok', kb: Math.round(buf.length / 1024) })
  } catch (e) {
    report.push({ cn, id, status: 'fail', error: String(e.message).slice(0, 60) })
  }
  await new Promise((r) => setTimeout(r, 220))
}

const ok = report.filter((r) => r.status === 'ok' || r.status === 'exists')
const bad = report.filter((r) => r.status !== 'ok' && r.status !== 'exists')
console.log(`成功 ${ok.length} / 失败 ${bad.length}`)
if (bad.length) console.log('失败：', bad.map((b) => `${b.cn}(${b.status})`).join('、'))
