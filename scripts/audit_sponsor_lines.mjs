/**
 * 用途：全量检查「担保人」台词里提到的人名，是否与数据字段一致。
 *       这是最容易让玩家误判的一类矛盾：台词说 A 担保，数据写 B，玩家拒绝后却判错。
 * 输入：src/mocks/*.ts、src/constants/registry.ts
 * 输出：不一致清单（附出现的所有人名）。
 * 依赖：Node 内置 fs
 */
import { readFileSync } from 'node:fs'

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

/** 收集所有可能的人名（剧本代号 + 名录 + 常见干员） */
function collectNames() {
  const names = new Set()
  const registry = readFileSync('src/constants/registry.ts', 'utf8')
  const block = registry.slice(registry.indexOf('REGISTERED_OPERATORS'))
  for (const m of block.matchAll(/'([^']+)'/g)) names.add(m[1])
  for (const f of FILES) {
    const src = readFileSync(`src/mocks/${f}`, 'utf8')
    for (const m of src.matchAll(/codeName: '([^']+)'/g)) names.add(m[1])
  }
  return [...names].filter((n) => n.length >= 2)
}

const NAMES = collectNames()
const people = []

for (const f of FILES) {
  const src = readFileSync(`src/mocks/${f}`, 'utf8')
  for (const block of src.split('\n  {')) {
    if (!block.includes("id: '")) continue
    const codeName = block.match(/codeName: '([^']+)'/)?.[1]
    const recommender = block.match(/recommender: '([^']+)'/)?.[1]
    const kind = block.match(/kind: '([^']+)'/)?.[1]
    const line = block.match(/question: '担保人', answer: '([^']+)'/)?.[1]
    if (!codeName || !line) continue
    people.push({ file: f, codeName, recommender, kind, line })
  }
}

const issues = []
for (const p of people) {
  const mentioned = NAMES.filter((n) => n !== p.codeName && p.line.includes(n))
  if (!mentioned.length) continue
  const consistent = p.recommender && mentioned.includes(p.recommender)
  if (!consistent) {
    issues.push({
      干员: p.codeName,
      身份: p.kind === 'impostor' ? '入侵者' : p.kind === 'anomaly' ? '异常' : '正常',
      数据担保人: p.recommender,
      台词提到: mentioned.join('、'),
      台词: p.line,
      风险: p.kind === 'operator' ? '⚠ 正常干员：玩家会据此误拒并判错' : '可接受（入侵者故意误导）',
    })
  }
}

console.log(`检查 ${people.length} 人，发现 ${issues.length} 处「台词担保人与数据不符」：\n`)
for (const i of issues) {
  console.log(`- ${i.干员}（${i.身份}） 数据=${i.数据担保人} 台词提到=${i.台词提到}`)
  console.log(`  台词：${i.台词}`)
  console.log(`  风险：${i.风险}\n`)
}
