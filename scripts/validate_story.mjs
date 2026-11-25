/**
 * 用途：静态校验 5 天剧本数据——证件与档案的字段是否自洽、入侵者是否真有可检出破绽。
 * 输入：src/mocks/*.ts
 * 输出：每位申请人的校验行 + 问题汇总。
 * 依赖：Node 内置 fs（正则解析，避免引入 TS 运行器）
 */
import { readFileSync } from 'node:fs'

const FILES = [
  'roster.ts',
  'roster.d2.ts',
  'roster.d2.extra.ts',
  'roster.d3.ts',
  'roster.d3.extra.ts',
  'roster.d4.ts',
  'roster.d4.docs.ts',
  'roster.d4.extra.ts',
  'roster.d5.ts',
  'roster.d5.docs.ts',
  'roster.d5.extra.ts',
  'roster.d1.pool.ts','roster.d1.pool.passports.ts','roster.d1.pool.dossiers.ts',
  'roster.d2.pool.ts','roster.d2.pool.passports.ts','roster.d2.pool.dossiers.ts',
  'roster.d3.pool.ts','roster.d3.pool.passports.ts','roster.d3.pool.dossiers.ts',
  'roster.d4.pool.ts','roster.d4.pool.passports.ts','roster.d4.pool.dossiers.ts',
  'roster.d5.pool.ts','roster.d5.pool.passports.ts','roster.d5.pool.dossiers.ts',
  'roster.d1.pool2.ts','roster.d1.pool2.passports.ts','roster.d1.pool2.dossiers.ts',
  'roster.d2.pool2.ts','roster.d2.pool2.passports.ts','roster.d2.pool2.dossiers.ts',
  'roster.d3.pool2.ts','roster.d3.pool2.passports.ts','roster.d3.pool2.dossiers.ts',
  'roster.d4.pool2.ts','roster.d4.pool2.passports.ts','roster.d4.pool2.dossiers.ts',
  'roster.d5.pool2.ts','roster.d5.pool2.passports.ts','roster.d5.pool2.dossiers.ts',
]

function pick(text, re) {
  const m = text.match(re)
  return m ? m[1] : null
}

/** 按顶层对象切块：以 "\n  {" 开头（applicant），兼容 CRLF */
function splitApplicants(src) {
  const out = []
  const re = /\r?\n  \{\r?\n([\s\S]*?)\r?\n  \},/g
  let m
  while ((m = re.exec(src))) {
    const body = m[1]
    if (!body.includes("id: '")) continue
    out.push({
      id: pick(body, /id: '([^']+)'/),
      codeName: pick(body, /codeName: '([^']+)'/),
      occupation: pick(body, /occupation: '([^']+)'/),
      kind: pick(body, /kind: '([^']+)'/),
      day: Number(pick(body, /day: (\d)/)),
      recommender: pick(body, /recommender: '([^']+)'/),
      passportNumber: pick(body, /passportNumber: '([^']+)'/),
      dossierNumber: pick(body, /dossierNumber: '([^']+)'/),
      photoMatch: body.includes('photoMatch: true'),
      dialogueConflict: pick(body, /dialogueConflict: '([^']+)'/),
    })
  }
  return out
}

/** 从 registry.ts 解析在册干员名录 */
/** 从 overrides.ts 解析「过期注入 / 双重错误」名单 */
function loadOverrides() {
  const src = readFileSync('src/mocks/overrides.ts', 'utf8')
  const expired = [...src.matchAll(/'([\w-]+)': \{ issueDate: '([\d-]+)', expiryDate: '([\d-]+)' \}/g)].map((m) => ({
    id: m[1],
    issue: m[2],
    expiry: m[3],
  }))
  const setStart = src.indexOf('new Set([')
  const setBlock = setStart >= 0 ? src.slice(setStart, src.indexOf('])', setStart)) : ''
  const doubleIds = [...setBlock.matchAll(/'([\w-]+)'/g)].map((m) => m[1])
  return { expired, doubleIds }
}

/** 从 game.ts 读取游戏内当前日期 */
function loadCurrentDate() {
  const src = readFileSync('src/constants/game.ts', 'utf8')
  const m = src.match(/CURRENT_DATE = '([\d-]+)'/)
  return m ? m[1] : null
}

function loadRegistry() {
  const src = readFileSync('src/constants/registry.ts', 'utf8')
  const block = src.slice(src.indexOf('REGISTERED_OPERATORS'))
  const names = [...block.matchAll(/'([^']+)'/g)].map((m) => m[1])
  return new Set(names)
}

function splitRecords(src, quote) {
  const out = {}
  const re = quote
    ? /\r?\n  '([^']+)': \{\r?\n([\s\S]*?)\r?\n  \},/g
    : /\r?\n  ([^'{\n][^:\n]*): \{\r?\n([\s\S]*?)\r?\n  \},/g
  let m
  while ((m = re.exec(src))) out[m[1].trim()] = m[2]
  return out
}

const applicants = []
const passports = {}
const dossiers = {}

for (const f of FILES) {
  const src = readFileSync(`src/mocks/${f}`, 'utf8')
  applicants.push(...splitApplicants(src))
  Object.assign(passports, splitRecords(src, true))
  Object.assign(dossiers, splitRecords(src, false))
}

const registry = loadRegistry()
const { expired, doubleIds } = loadOverrides()
const currentDate = loadCurrentDate()
const problems = []
const notes = []
console.log('| 天 | 代号 | 身份 | 编号 | 印章 | 照片 | 职业 | 担保 | 可检出破绽 |')
console.log('|---|---|---|---|---|---|---|---|---|')

for (const a of applicants) {
  const p = passports[a.id]
  const d = dossiers[a.codeName]
  if (!p) {
    problems.push(`${a.id} 缺少通行证`)
    continue
  }
  if (!d) {
    problems.push(`${a.codeName} 缺少档案`)
    continue
  }

  const pNum = pick(p, /number: '([^']+)'/)
  const dNum = pick(d, /number: '([^']+)'/)
  const seal = pick(p, /sealText: '([^']+)'/)
  const stampType = pick(p, /stampType: '([^']+)'/)
  const issueDate = pick(p, /issueDate: '([^']+)'/) ?? ''
  const expiryDate = pick(p, /expiryDate: '([^']+)'/) ?? ''
  const sealId = pick(p, /sealId: '([^']+)'/) ?? ''
  const requiredSeal = pick(d, /requiredSeal: '([^']+)'/)
  const dOcc = pick(d, /occupation: '([^']+)'/)
  const dStatus = pick(d, /status: '([^']+)'/)
  const dNote = pick(d, /note: '([^']+)'/)

  const checks = []
  if (pNum !== dNum && !dNote) checks.push('编号')
  if (pNum !== dNum && dNote) checks.push('编号差异(有换发备注✓)')
  if (sealId === 'smudged' || stampType === 'smudged') checks.push('印章污损')
  if (sealId === 'none' || stampType === 'missing') checks.push('印章缺失')
  if (['wrong_dept', 'foreign', 'fake'].includes(sealId)) checks.push('印章不符(' + sealId + ')')
  else if (stampType === 'clear' && seal !== requiredSeal && !sealId) checks.push('印章机构')
  if (!a.photoMatch) checks.push('照片')
  if (a.occupation !== dOcc) checks.push('职业')
  if (!registry.has(a.recommender)) checks.push('担保人不在册')
  if (dStatus !== 'active') checks.push('档案状态')
  if (a.dialogueConflict) checks.push('言行')
  if (issueDate && expiryDate && issueDate >= expiryDate) checks.push('日期倒置')

  const row = [
    a.day,
    a.codeName,
    a.kind === 'impostor' ? '入侵者' : '正常',
    pNum === dNum ? '一致' : '不符',
    stampType === 'clear' ? '清晰' : stampType === 'smudged' ? '污损' : '缺失',
    a.photoMatch ? '相符' : '不符',
    a.occupation === dOcc ? '一致' : '不符',
    registry.has(a.recommender) ? '在册' : `不在册(${a.recommender})`,
    checks.length ? checks.join('、') : '无',
  ]
  console.log(`| ${row.join(' | ')} |`)

  const realChecks = checks.filter((c) => !c.includes('有换发备注'))

  if (a.kind === 'impostor' && realChecks.length === 0) {
    problems.push(`${a.codeName}（D${a.day}）是入侵者但没有任何可检出破绽`)
  }
  if (a.kind === 'operator' && realChecks.length > 0) {
    problems.push(`${a.codeName}（D${a.day}）是正常干员但存在破绽：${realChecks.join('、')}`)
  }
  if (a.kind === 'operator' && pNum !== dNum && dNote) {
    notes.push(`${a.codeName}（D${a.day}）编号差异有换发备注 → 应批准`)
  }
}


// ---- 注入校验：许可过期 / 双重错误 ----
const byId = new Map(applicants.map((a) => [a.id, a]))
if (!currentDate) problems.push('无法读取 CURRENT_DATE')
for (const e of expired) {
  const a = byId.get(e.id)
  if (!a) problems.push(`过期注入：${e.id} 不在名单中`)
  else if (a.kind !== 'impostor') problems.push(`过期注入：${a.codeName} 不是入侵者`)
  if (!(e.issue < e.expiry && e.expiry < currentDate)) problems.push(`过期注入：${e.id} 日期不成立（${e.issue} / ${e.expiry}）`)
}
for (const id of doubleIds) {
  const a = byId.get(id)
  if (!a) problems.push(`双重错误：${id} 不在名单中`)
  else if (a.kind !== 'impostor') problems.push(`双重错误：${a.codeName} 不是入侵者`)
}
const expiredIds = new Set(expired.map((e) => e.id))
for (const a of applicants) {
  if (expiredIds.has(a.id)) continue
  const p = passports[a.id]
  const exp = p ? pick(p, /expiryDate: '([^']+)'/) : null
  if (exp && currentDate && exp < currentDate) problems.push(`${a.codeName} 未注入却已过期`)
}

console.log('\n统计：申请人', applicants.length, '| 通行证', Object.keys(passports).length, '| 档案', Object.keys(dossiers).length)
console.log('入侵者', applicants.filter((a) => a.kind === 'impostor').length)
console.log('当前日期', currentDate, '| 许可过期注入', expired.length, '（运行时覆盖，表格未含）| 双重错误', doubleIds.length, '（运行时叠加照片破绽）')
console.log(notes.length ? '\n新机制样本：\n- ' + notes.join('\n- ') : '')
console.log(problems.length ? '\n问题：\n- ' + problems.join('\n- ') : '\n全部通过：入侵者均有可检出破绽，正常干员均无破绽。')
