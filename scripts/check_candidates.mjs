/**
 * 用途：验证一批干员名在 prts.wiki 是否存在，用于扩充候选池。
 * 输入：内置候选名单。
 * 输出：存在/不存在的名单。
 * 依赖：Node 内置 fetch
 */
const UA = 'Mozilla/5.0 arknights-gate/0.4'

/** 已有 82 人（需排除） */
const EXISTING = new Set([
  '克洛丝','芬','米格鲁','安赛尔','卡缇','玫兰莎','炎熔','杰西卡','流星','阿米娅','杜宾',
  '德克萨斯','能天使','拉普兰德','可颂','银灰','夜莺','闪灵','星熊','陈','推进之王',
  '芙蓉','嘉维尔','赫默','临光','可露希尔','华法琳','清道夫','讯使','末药','芙兰卡',
  '斯卡蒂','幽灵鲨','白金','蓝毒','白面鸮','雷蛇','初雪','崖心','角峰','蛇屠箱','古米','空',
  '真理','凛冬','因陀罗','慕斯','猎蜂','送葬人','红','砾','暗索','深海色','梅尔','麦哲伦',
  '伊芙利特','艾雅法拉','天火','远山','夜魔','塞雷娅','星极','诗怀雅','陨星','白雪',
  '安德切尔','史都华德','泡普卡','月见夜','普罗旺斯','守林人','灰喉','安比尔','奥斯塔',
  '鞭刃','瑕光','石棉','极境','早露','棘刺','格拉尼','变形者集群',
])

/** 候选 60 个（留 10 个冗余，取前 50 个可用的） */
const CANDIDATES = [
  'W','泥岩','温蒂','赫拉格','森蚺','傀影','白铁','水月','令','夕',
  '重岳','年','炎客','阿','吽','刻俄柏','菲亚梅塔','艾丽妮','鸿雪','迷迭香',
  '澄闪','铃兰','桃金娘','阿消','卡达','松果','稀音','苦艾','莱恩哈特','断崖',
  '露托','达格达','格劳克斯','苇草','布洛卡','惊蛰','折光','电弧','夜刀','瑕光',
  '史尔特尔','嵯峨','红隼','泥岩','深海色','讯使','炎熔','星熊','银灰','陈',
  'W','菲亚梅塔','斯卡蒂','临光','赫默','梅尔','真理','古米','蛇屠箱','极境',
]

async function exists(name) {
  const u = new URL('https://prts.wiki/api.php')
  u.search = new URLSearchParams({ action: 'parse', page: name, prop: 'wikitext', format: 'json' }).toString()
  try {
    const res = await fetch(u, { headers: { 'User-Agent': UA } })
    const json = await res.json()
    return Boolean(json?.parse?.wikitext)
  } catch {
    return false
  }
}

async function profile(name) {
  const u = new URL('https://prts.wiki/api.php')
  u.search = new URLSearchParams({ action: 'parse', page: name, prop: 'wikitext', format: 'json' }).toString()
  const res = await fetch(u, { headers: { 'User-Agent': UA } })
  const json = await res.json()
  const t = json?.parse?.wikitext?.['*'] ?? ''
  return {
    race: t.match(/\|\s*种族\s*=\s*([^\n|]+)/)?.[1]?.trim() ?? '未公开',
    origin: t.match(/\|\s*出身地\s*=\s*([^\n|]+)/)?.[1]?.trim() ?? '未公开',
    career: t.match(/\|\s*职业\s*=\s*([^\n|]+)/)?.[1]?.trim() ?? '',
  }
}

const seen = new Set()
const ok = []
const bad = []
for (const name of CANDIDATES) {
  if (EXISTING.has(name) || seen.has(name)) continue
  seen.add(name)
  if (await exists(name)) {
    const p = await profile(name)
    ok.push({ name, ...p })
  } else {
    bad.push(name)
  }
  await new Promise((r) => setTimeout(r, 180))
}

console.log(`可用 ${ok.length} 个：`)
for (const x of ok) console.log(`  ${x.name}\t${x.race}\t${x.origin}\t${x.career}`)
console.log(`\n不可用 ${bad.length} 个：${bad.join('、')}`)
