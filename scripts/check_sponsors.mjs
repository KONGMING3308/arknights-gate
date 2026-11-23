/**
 * 用途：检测担保关系是否出现「互相担保」的环（A 担保 B，B 又担保 A）。
 * 输入：src/mocks/*.ts
 * 输出：环清单 + 每位申请人的担保人。
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
]

const people = []
for (const f of FILES) {
  const src = readFileSync(`src/mocks/${f}`, 'utf8')
  const re = /codeName: '([^']+)',[\s\S]*?day: (\d),[\s\S]*?recommender: '([^']+)'/
  for (const block of src.split('\n  {')) {
    const m = block.match(re)
    if (m) people.push({ name: m[1], day: Number(m[2]), recommender: m[3] })
  }
}

const byName = new Map(people.map((p) => [p.name, p]))
const cycles = []
for (const p of people) {
  const other = byName.get(p.recommender)
  if (other && other.recommender === p.name && p.name < other.name) {
    cycles.push(`${p.name}（D${p.day}） ↔ ${other.name}（D${other.day}）`)
  }
}

console.log('担保关系：')
for (const p of people.sort((a, b) => a.day - b.day)) {
  console.log(`  D${p.day} ${p.name} → ${p.recommender}`)
}
console.log(cycles.length ? `\n发现互保：\n- ${cycles.join('\n- ')}` : '\n没有互相担保')
