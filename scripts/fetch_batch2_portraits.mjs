/**
 * 用途：抓取第二批扩充的 50 位干员头像（prts.wiki）。
 * 输入：内置名单（中文名 + 输出文件名）。
 * 输出：public/assets/portraits/*.png
 * 依赖：Node 内置 fetch
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const UA = 'Mozilla/5.0 arknights-gate/0.4'
const DIR = join(process.cwd(), 'public', 'assets', 'portraits')

/** 第二批 50 人：[中文名, 输出 id] */
export const BATCH2 = [
  ['W', 'op_w'],
  ['泥岩', 'niyan'],
  ['温蒂', 'wendi'],
  ['赫拉格', 'helage'],
  ['森蚺', 'senran'],
  ['傀影', 'kuiying'],
  ['白铁', 'baitie'],
  ['水月', 'shuiyue'],
  ['令', 'ling'],
  ['夕', 'xi'],
  ['重岳', 'chongyue'],
  ['年', 'nian'],
  ['炎客', 'yanke'],
  ['阿', 'a'],
  ['吽', 'hou'],
  ['刻俄柏', 'keebo'],
  ['菲亚梅塔', 'fiammetta'],
  ['艾丽妮', 'irene'],
  ['鸿雪', 'hongxue'],
  ['迷迭香', 'midiexiang'],
  ['澄闪', 'chengshan'],
  ['铃兰', 'linglan'],
  ['桃金娘', 'taojinniang'],
  ['阿消', 'axiao'],
  ['卡达', 'kada'],
  ['松果', 'songguo'],
  ['稀音', 'xiyin'],
  ['苦艾', 'kuai'],
  ['莱恩哈特', 'lainhard'],
  ['断崖', 'duanya'],
  ['露托', 'luotuo'],
  ['达格达', 'dageda'],
  ['格劳克斯', 'glaucus'],
  ['苇草', 'weicao'],
  ['布洛卡', 'broca'],
  ['惊蛰', 'jingzhe'],
  ['折光', 'zheguang'],
  ['电弧', 'dianhu'],
  ['夜刀', 'yadao'],
  ['史尔特尔', 'surtr'],
  ['嵯峨', 'cuoe'],
  ['红隼', 'hongzhun'],
  ['霜叶', 'shuangye'],
  ['艾丝黛尔', 'estelle'],
  ['卡夫卡', 'kafka'],
  ['泡泡', 'paopao'],
  ['褐果', 'heguo'],
  ['郁金香', 'yujinxiang'],
  ['蜜蜡', 'mila'],
  ['微风', 'weifeng'],
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
for (const [cn, id] of BATCH2) {
  const file = join(DIR, `${id}.png`)
  if (existsSync(file)) {
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
    report.push({ cn, id, status: 'ok' })
  } catch (e) {
    report.push({ cn, id, status: 'fail', error: String(e.message).slice(0, 40) })
  }
  await new Promise((r) => setTimeout(r, 200))
}

const ok = report.filter((r) => r.status === 'ok' || r.status === 'exists')
const bad = report.filter((r) => r.status !== 'ok' && r.status !== 'exists')
console.log(`头像成功 ${ok.length} / 失败 ${bad.length}`)
if (bad.length) console.log('失败：', bad.map((b) => `${b.cn}(${b.status})`).join('、'))
