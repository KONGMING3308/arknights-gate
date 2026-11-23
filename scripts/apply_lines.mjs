/**
 * 用途：把子代理产出的新台词按「天 + 代号」写回候选池文件。
 * 输入：scripts/data/new_lines.json（键为 `dN:代号`）
 * 输出：就地更新 src/mocks/roster.dN.pool.ts 的 dialogue 与 intent
 * 依赖：Node 内置 fs
 */
import { readFileSync, writeFileSync } from 'node:fs'

const NEW = JSON.parse(readFileSync('scripts/data/new_lines.json', 'utf8'))

let ok = 0
let miss = 0

for (let day = 1; day <= 5; day += 1) {
  const path = `src/mocks/roster.d${day}.pool.ts`
  let text = readFileSync(path, 'utf8')

  for (const [key, lines] of Object.entries(NEW)) {
    const [d, name] = key.split(':')
    if (Number(d.replace('d', '')) !== day) continue

    // 定位该申请人的 dialogue 块并替换
    const re = new RegExp(
      `(codeName: '${name}',[\\s\\S]*?dialogue: \\[\\s*\\r?\\n)\\s*\\{ question: '代号', answer: '[^']*' \\}, \\{ question: '来意', answer: '[^']*' \\},\\r?\\n\\s*\\{ question: '担保人', answer: '[^']*' \\},\\r?\\n(\\s*\\],)`,
    )
    const replacement = `$1      { question: '代号', answer: '${lines.code}' }, { question: '来意', answer: '${lines.intent}' },\n      { question: '担保人', answer: '${lines.rec}' },\n$2`

    if (re.test(text)) {
      text = text.replace(re, replacement)
      ok += 1
    } else {
      console.log(`  未匹配：${key}`)
      miss += 1
    }
  }

  writeFileSync(path, text, 'utf8')
}

console.log(`写回完成：成功 ${ok}，未匹配 ${miss}`)
