/**
 * 用途：批量抓取 50 位新干员的官方设定（种族 / 出身地 / 职业），存成 JSON 供后续生成剧本。
 * 输入：内置名单。
 * 输出：scripts/data/new_profiles.json
 * 依赖：Node 内置 fetch
 */
import { mkdirSync, writeFileSync } from 'node:fs'

const UA = 'Mozilla/5.0 arknights-gate/0.3'

/** [中文名, 文件名, 我预设的职业（仅作参考，以 API 为准）] */
const ROSTER = [
  ['斯卡蒂', 'skadi', '近卫干员'],
  ['幽灵鲨', 'specter', '近卫干员'],
  ['白金', 'platinum', '狙击干员'],
  ['蓝毒', 'bluepoison', '狙击干员'],
  ['白面鸮', 'ptilopsis', '医疗干员'],
  ['雷蛇', 'liskarm', '重装干员'],
  ['初雪', 'pramanix', '辅助干员'],
  ['崖心', 'cliffheart', '特种干员'],
  ['角峰', 'matterhorn', '重装干员'],
  ['蛇屠箱', 'cuora', '重装干员'],
  ['古米', 'gummy', '重装干员'],
  ['空', 'sora', '辅助干员'],
  ['真理', 'istina', '辅助干员'],
  ['凛冬', 'zima', '先锋干员'],
  ['因陀罗', 'indra', '近卫干员'],
  ['慕斯', 'mousse', '近卫干员'],
  ['猎蜂', 'beehunter', '近卫干员'],
  ['送葬人', 'executor', '狙击干员'],
  ['红', 'projektred', '特种干员'],
  ['砾', 'gravel', '特种干员'],
  ['暗索', 'rope', '特种干员'],
  ['深海色', 'deepcolor', '辅助干员'],
  ['梅尔', 'mayer', '辅助干员'],
  ['麦哲伦', 'magallan', '辅助干员'],
  ['伊芙利特', 'ifrit', '术师干员'],
  ['艾雅法拉', 'eyjafjalla', '术师干员'],
  ['天火', 'skyfire', '术师干员'],
  ['远山', 'gitano', '术师干员'],
  ['夜魔', 'nightmare', '术师干员'],
  ['塞雷娅', 'saria', '重装干员'],
  ['星极', 'astesia', '近卫干员'],
  ['诗怀雅', 'swire', '近卫干员'],
  ['陨星', 'meteorite', '狙击干员'],
  ['白雪', 'shirayuki', '狙击干员'],
  ['安德切尔', 'adnachiel', '狙击干员'],
  ['史都华德', 'steward', '狙击干员'],
  ['泡普卡', 'popukar', '近卫干员'],
  ['月见夜', 'midnight', '近卫干员'],
  ['普罗旺斯', 'provence', '狙击干员'],
  ['守林人', 'firewatch', '狙击干员'],
  ['灰喉', 'greyy', '术师干员'],
  ['安比尔', 'ambriel', '狙击干员'],
  ['奥斯塔', 'aosta', '狙击干员'],
  ['鞭刃', 'whislash', '近卫干员'],
  ['瑕光', 'blemishine', '重装干员'],
  ['石棉', 'asbestos', '重装干员'],
  ['极境', 'elysium', '先锋干员'],
  ['早露', 'rosa', '狙击干员'],
  ['棘刺', 'thorns', '近卫干员'],
  ['格拉尼', 'grani', '先锋干员'],
]

async function profile(name) {
  const u = new URL('https://prts.wiki/api.php')
  u.search = new URLSearchParams({ action: 'parse', page: name, prop: 'wikitext', format: 'json' }).toString()
  const res = await fetch(u, { headers: { 'User-Agent': UA } })
  const json = await res.json()
  const t = json?.parse?.wikitext?.['*'] ?? ''
  const race = t.match(/\|\s*种族\s*=\s*([^\n|]+)/)?.[1]?.trim() ?? ''
  const origin = t.match(/\|\s*出身地\s*=\s*([^\n|]+)/)?.[1]?.trim() ?? ''
  const career = t.match(/\|\s*职业\s*=\s*([^\n|]+)/)?.[1]?.trim() ?? ''
  return { race, origin, career }
}

const out = []
for (const [cn, id, fallbackCareer] of ROSTER) {
  try {
    const p = await profile(cn)
    out.push({
      cn,
      id,
      race: p.race || '未公开',
      origin: p.origin || '未公开',
      career: p.career ? `${p.career}干员` : fallbackCareer,
    })
  } catch (e) {
    out.push({ cn, id, race: '未公开', origin: '未公开', career: fallbackCareer, error: String(e.message).slice(0, 40) })
  }
  await new Promise((r) => setTimeout(r, 200))
}

mkdirSync('scripts/data', { recursive: true })
writeFileSync('scripts/data/new_profiles.json', JSON.stringify(out, null, 2), 'utf8')
console.log(`抓取完成 ${out.length} 位`)
for (const p of out) console.log(`${p.cn}\t${p.race}\t${p.origin}\t${p.career}`)
