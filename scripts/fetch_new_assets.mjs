/**
 * 用途：批量抓取新角色素材（头像 / 立绘），来源 prts.wiki。
 * 输入：内置文件名单。
 * 输出：public/assets/ 下的 PNG + 抓取结果。
 * 依赖：Node 内置 fetch
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const UA = 'Mozilla/5.0 arknights-gate/0.1'
const PORTRAIT_DIR = join(process.cwd(), 'public', 'assets', 'portraits')
const EVENT_DIR = join(process.cwd(), 'public', 'assets', 'events')

/** [文件标题, 输出路径] */
const TARGETS = [
  // 10 位新干员头像
  ['头像_赫默.png', 'portraits/hemmer.png'],
  ['头像_临光.png', 'portraits/nearl.png'],
  ['头像_华法琳.png', 'portraits/warfarin.png'],
  ['头像_可露希尔.png', 'portraits/closure.png'],
  ['头像_清道夫.png', 'portraits/scavenger.png'],
  ['头像_讯使.png', 'portraits/courier.png'],
  ['头像_末药.png', 'portraits/myrtle.png'],
  ['头像_芙蓉.png', 'portraits/hibiscus.png'],
  ['头像_嘉维尔.png', 'portraits/gavial.png'],
  ['头像_芙兰卡.png', 'portraits/franka.png'],
  // 事件角色：阿斯卡纶（优先立绘，退回头像）
  ['立绘_阿斯卡纶_1.png', 'events/ascalon.png'],
  ['头像_阿斯卡纶.png', 'events/ascalon_avatar.png'],
  // 变形者集群
  ['头像_变形者集群.png', 'portraits/shapeshifter.png'],
]

async function resolveUrl(title) {
  const u = new URL('https://prts.wiki/api.php')
  u.search = new URLSearchParams({
    action: 'query',
    format: 'json',
    prop: 'imageinfo',
    iiprop: 'url',
    titles: `File:${title}`,
  }).toString()
  const res = await fetch(u, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`api ${res.status}`)
  const json = await res.json()
  const page = Object.values(json?.query?.pages ?? {})[0]
  return page?.imageinfo?.[0]?.url ?? null
}

const report = []
for (const [title, out] of TARGETS) {
  try {
    const url = await resolveUrl(title)
    if (!url) {
      report.push({ title, status: 'not-found' })
      continue
    }
    const res = await fetch(url, { headers: { 'User-Agent': UA, Referer: 'https://prts.wiki/' } })
    const buf = Buffer.from(await res.arrayBuffer())
    const full = join(process.cwd(), 'public', 'assets', out)
    mkdirSync(join(full, '..'), { recursive: true })
    writeFileSync(full, buf)
    report.push({ title, status: 'ok', bytes: buf.length, out })
  } catch (e) {
    report.push({ title, status: 'fail', error: String(e.message) })
  }
  await new Promise((r) => setTimeout(r, 250))
}

console.log(JSON.stringify(report, null, 1))
