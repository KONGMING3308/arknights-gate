/**
 * 用途：把子代理产出的新台词（D|角色|字段|台词 格式）写回 pool2 数据文件。
 * 输入：scripts/data/batch2_lines.txt（每行一条）
 * 输出：就地更新 src/mocks/roster.dN.pool2.ts 的 dialogue
 * 依赖：Node 内置 fs
 */
import { readFileSync, writeFileSync } from 'node:fs'

const raw = readFileSync('scripts/data/batch2_lines.txt', 'utf8')

/** 解析成 { 'D1|W|代号': '台词' } */
const map = new Map()
for (const line of raw.split('\n')) {
  const s = line.trim()
  if (!s || s.startsWith('#')) continue
  const parts = s.split('|')
  if (parts.length < 4) continue
  const [d, name, field, ...rest] = parts
  const text = rest.join('|').trim()
  if (!/^D[1-5]$/.test(d) || !['代号', '来意', '担保人'].includes(field)) continue
  map.set(`${d}|${name}|${field}`, text)
}

console.log(`解析到 ${map.size} 条台词`)

let applied = 0
let missed = 0

for (let day = 1; day <= 5; day += 1) {
  const path = `src/mocks/roster.d${day}.pool2.ts`
  let text
  try {
    text = readFileSync(path, 'utf8')
  } catch {
    continue
  }

  const blocks = text.split('\n  {')
  for (let i = 1; i < blocks.length; i += 1) {
    let b = blocks[i]
    const name = b.match(/codeName: '([^']+)'/)?.[1]
    if (!name) continue

    for (const field of ['代号', '来意', '担保人']) {
      const newLine = map.get(`D${day}|${name}|${field}`)
      if (!newLine) continue
      const re = new RegExp(`\\{ question: '${field}', answer: '[^']*' \\}`)
      if (re.test(b)) {
        b = b.replace(re, `{ question: '${field}', answer: '${newLine}' }`)
        applied += 1
      } else {
        missed += 1
      }
    }
    blocks[i] = b
  }

  writeFileSync(path, blocks.join('\n  {'), 'utf8')
}

console.log(`写回 ${applied} 条，未匹配 ${missed} 条`)
