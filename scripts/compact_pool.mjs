/**
 * 用途：把候选池 applicant 文件压缩成紧凑格式（每人多字段同行），满足单文件 ≤200 行。
 * 输入：src/mocks/roster.dN.pool.ts
 * 输出：同文件，紧凑重写
 * 依赖：Node 内置 fs
 */
import { readFileSync, writeFileSync } from 'node:fs'

for (let day = 1; day <= 5; day += 1) {
  const path = `src/mocks/roster.d${day}.pool.ts`
  const src = readFileSync(path, 'utf8')

  // 提取头部注释 + import
  const headMatch = src.match(/^([\s\S]*?from '@\/types'\r?\n)/)
  const head = headMatch ? headMatch[1] : ''

  const blocks = []
  const re = /\{\s*id: '([^']+)',\s*codeName: '([^']+)',\s*portrait: '([^']+)',\s*race: '([^']+)',\s*origin: '([^']+)',\s*occupation: '([^']+)',\s*kind: '([^']+)',\s*day: (\d+),\s*slot: (\d+),\s*intent: '([^']*)',\s*recommender: '([^']+)',\s*dialogue: \[\s*\{\s*question: '代号',\s*answer: '([^']*)'\s*\},\s*\{\s*question: '来意',\s*answer: '([^']*)'\s*\},\s*\{\s*question: '担保人',\s*answer: '([^']*)'\s*\},?\s*\],\s*passportNumber: '([^']+)',\s*dossierNumber: '([^']+)',\s*photoMatch: (true|false),\s*\}/g

  let m
  while ((m = re.exec(src))) {
    const [, id, name, portrait, race, origin, occ, kind, d, slot, intent, rec, code, intentLine, recLine, pnum, dnum, photo] = m
    blocks.push(`  {
    id: '${id}', codeName: '${name}', portrait: '${portrait}',
    race: '${race}', origin: '${origin}', occupation: '${occ}',
    kind: '${kind}', day: ${d}, slot: ${slot},
    intent: '${intent}', recommender: '${rec}',
    dialogue: [
      { question: '代号', answer: '${code}' }, { question: '来意', answer: '${intentLine}' },
      { question: '担保人', answer: '${recLine}' },
    ],
    passportNumber: '${pnum}', dossierNumber: '${dnum}', photoMatch: ${photo},
  },`)
  }

  if (!blocks.length) {
    console.log(`D${day}: 解析失败，跳过`)
    continue
  }

  const out = `${head}\nexport const DAY${day}_POOL_APPLICANTS: Applicant[] = [\n${blocks.join('\n')}\n]\n`
  writeFileSync(path, out, 'utf8')
  console.log(`D${day}: ${blocks.length} 人 → ${out.split('\n').length} 行`)
}
