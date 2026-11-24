/**
 * 用途：修正 pool2 台词里提到错误担保人的问题。
 *       正常干员：台词说的人名必须等于 recommender → 自动替换为正确人名
 *       入侵者：保留（言行破绽是设计），除非台词里根本没提担保人
 * 输入：src/mocks/roster.dN.pool2.ts、src/constants/registry.ts
 * 输出：就地修正 + 报告
 * 依赖：Node 内置 fs
 */
import { readFileSync, writeFileSync } from 'node:fs'

const FILES = ['roster.d1.pool2.ts', 'roster.d2.pool2.ts', 'roster.d3.pool2.ts', 'roster.d4.pool2.ts', 'roster.d5.pool2.ts']

// 收集所有人名（用于识别人名替换目标）
const registry = readFileSync('src/constants/registry.ts', 'utf8')
const REG_NAMES = [...registry.slice(registry.indexOf('REGISTERED_OPERATORS')).matchAll(/'([^']+)'/g)]
  .map((m) => m[1])
  .filter((n) => n.length >= 2)

const allNames = new Set(REG_NAMES)
for (const f of FILES) {
  const s = readFileSync(`src/mocks/${f}`, 'utf8')
  for (const m of s.matchAll(/codeName: '([^']+)'/g)) allNames.add(m[1])
}
const NAMES = [...allNames].sort((a, b) => b.length - a.length)

let fixed = 0
const report = []

for (const f of FILES) {
  const path = `src/mocks/${f}`
  let text = readFileSync(path, 'utf8')
  const blocks = text.split('\n  {')

  for (let i = 1; i < blocks.length; i += 1) {
    let b = blocks[i]
    const name = b.match(/codeName: '([^']+)'/)?.[1]
    const kind = b.match(/kind: '(operator|impostor)'/)?.[1]
    const rec = b.match(/recommender: '([^']+)'/)?.[1]
    if (!name || !rec) continue

    const m = b.match(/\{ question: '担保人', answer: '([^']*)' \}/)
    if (!m) continue
    const line = m[1]

    // 台词里提到的人名（排除本人）
    const mentioned = NAMES.filter((n) => n !== name && line.includes(n))
    const ok = mentioned.includes(rec)
    if (ok) continue

    if (kind === 'impostor') {
      // 入侵者：只报告，不改（言行破绽是设计）
      report.push(`保留（入侵者言行破绽）${name}：数据=${rec} 台词提到=${mentioned.join('、') || '无'}`)
      continue
    }

    // 正常干员：把台词里错的人名换成正确担保人
    let newLine = line
    for (const wrong of mentioned) {
      newLine = newLine.split(wrong).join(rec)
    }
    // 台词里没人名 → 在句首补上
    if (mentioned.length === 0) {
      newLine = `${rec}${line.startsWith(rec) ? '' : '。'}${line}`
    }
    b = b.replace(m[0], `{ question: '担保人', answer: '${newLine}' }`)
    blocks[i] = b
    fixed += 1
    report.push(`修正 ${name}：${mentioned.join('、') || '（无人名）'} → ${rec}`)
  }

  writeFileSync(path, blocks.join('\n  {'), 'utf8')
}

console.log(`修正 ${fixed} 处`)
for (const r of report.slice(0, 60)) console.log('  ' + r)
