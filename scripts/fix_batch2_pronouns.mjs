/**
 * 用途：修正 pool2 担保人台词里的性别代词（自动替换人名后，"他/她"可能对不上）。
 * 输入：src/mocks/roster.dN.pool2.ts
 * 输出：就地修正
 * 依赖：Node 内置 fs
 */
import { readFileSync, writeFileSync } from 'node:fs'

/** 男性担保人（其余按女性处理；博士用中性表述） */
const MALE = new Set(['银灰', '艾尔文', '赫拉格', '傀影', '重岳', '炎客', '吽', '阿', '断崖', '布洛卡', '史尔特尔'])
const NEUTRAL = new Set(['博士'])

const FILES = ['roster.d1.pool2.ts', 'roster.d2.pool2.ts', 'roster.d3.pool2.ts', 'roster.d4.pool2.ts', 'roster.d5.pool2.ts']

let fixed = 0
const report = []

for (const f of FILES) {
  const path = `src/mocks/${f}`
  let text = readFileSync(path, 'utf8')
  const blocks = text.split('\n  {')

  for (let i = 1; i < blocks.length; i += 1) {
    let b = blocks[i]
    const kind = b.match(/kind: '(operator|impostor)'/)?.[1]
    const rec = b.match(/recommender: '([^']+)'/)?.[1]
    if (kind !== 'operator' || !rec) continue

    const m = b.match(/\{ question: '担保人', answer: '([^']*)' \}/)
    if (!m) continue
    const line = m[1]
    if (!/他|她/.test(line)) continue

    // 先保护「其他」这类词
    let work = line.replace(/其他/g, '\u0001').replace(/他们/g, '\u0002')
    let want = '她'
    if (MALE.has(rec)) want = '他'
    else if (NEUTRAL.has(rec)) want = 'TA'

    const before = work
    work = work.split('他').join(want).split('她').join(want)
    if (work === before) continue

    work = work.replace(/\u0001/g, '其他').replace(/\u0002/g, '他们')
    b = b.replace(m[0], `{ question: '担保人', answer: '${work}' }`)
    blocks[i] = b
    fixed += 1
    report.push(`${rec}: ${line} → ${work}`)
  }

  writeFileSync(path, blocks.join('\n  {'), 'utf8')
}

console.log(`修正代词 ${fixed} 处`)
for (const r of report.slice(0, 15)) console.log('  ' + r)
