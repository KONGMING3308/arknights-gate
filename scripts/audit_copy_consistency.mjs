/**
 * 用途：检查「台词」与「数据字段」是否自相矛盾（审计的第三路证据）。
 *       例如：recommender 是博士，台词却说「星熊替我担保」。
 * 输入：src/mocks/*.ts
 * 输出：可疑条目清单。
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
  const chunks = src.split(/\n  \{\n/)
  for (const c of chunks) {
    if (!c.includes("id: '")) continue
    const id = c.match(/id: '([^']+)'/)?.[1]
    const codeName = c.match(/codeName: '([^']+)'/)?.[1]
    const recommender = c.match(/recommender: '([^']+)'/)?.[1]
    const intent = c.match(/intent: '([^']+)'/)?.[1]
    const recLine = c.match(/question: '推荐人', answer: '([^']+)'/)?.[1]
    const intentLine = c.match(/question: '来意', answer: '([^']+)'/)?.[1]
    if (id && codeName) people.push({ id, codeName, recommender, intent, recLine, intentLine })
  }
}

const issues = []
for (const p of people) {
  if (p.recLine && p.recommender && !p.recLine.includes(p.recommender)) {
    // 台词里没提到实际担保人 → 可能自相矛盾
    const mentioned = ['星熊', '陈', '博士', '凯尔希', '阿米娅', '杜宾', '芙蓉', '嘉维尔', '银灰', '闪灵'].filter((n) =>
      p.recLine.includes(n),
    )
    issues.push({
      type: '担保人台词不符',
      who: `${p.codeName}（${p.id}）`,
      数据: p.recommender,
      台词: p.recLine,
      台词提到的: mentioned.join('、') || '无',
    })
  }
}

// 印章类台词与 stampType 交叉检查（只抽「章」字相关）
for (const f of FILES) {
  const src = readFileSync(`src/mocks/${f}`, 'utf8')
  const chunks = src.split(/\n  \{\n/)
  for (const c of chunks) {
    if (!c.includes("id: '")) continue
    const codeName = c.match(/codeName: '([^']+)'/)?.[1]
    const lines = [...c.matchAll(/answer: '([^']*)'/g)].map((m) => m[1])
    for (const line of lines) {
      if (line && /章/.test(line)) {
        issues.push({ type: '台词提到印章（需核对 stampType）', who: codeName ?? '?', 台词: line })
      }
    }
  }
}

console.log(JSON.stringify({ total: people.length, issues }, null, 1))
