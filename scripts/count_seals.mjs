import { ALL_APPLICANTS, ALL_PASSPORTS } from '../src/mocks/index.ts'
const resolveSealId = (p) => {
  if (p.sealId) return p.sealId
  if (p.stampType === 'missing') return 'none'
  if (p.stampType === 'smudged') return 'smudged'
  if (p.sealText === '罗德岛人事部') return 'standard'
  if (p.sealText.includes('后勤')) return 'wrong_dept'
  return 'foreign'
}
const dist = {}
const odd = []
const dateBad = []
for (const a of ALL_APPLICANTS) {
  const p = ALL_PASSPORTS[a.id]
  if (!p) { console.log('缺通行证:', a.codeName); continue }
  const sid = resolveSealId(p)
  dist[sid] = (dist[sid] || 0) + 1
  if (sid !== 'standard') odd.push(`${a.codeName}(${a.day}日/${sid})`)
  if (p.issueDate >= p.expiryDate) dateBad.push(`${a.codeName}(${a.day}日/${a.kind}/签发${p.issueDate}/到期${p.expiryDate})`)
}
console.log('印章分布:', JSON.stringify(dist))
console.log('非标准章:', odd.join('、'))
console.log('日期倒置:', dateBad.join('、') || '无')
