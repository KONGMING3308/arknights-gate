import { ALL_APPLICANTS, ALL_PASSPORTS, ALL_DOSSIERS } from '../src/mocks/index.ts'
let tot = 0, imp = 0
for (const d of [1, 2, 3, 4, 5]) {
  const pool = ALL_APPLICANTS.filter((a) => a.day === d)
  const i = pool.filter((a) => a.kind === 'impostor').length
  tot += pool.length; imp += i
  console.log(`D${d}: ${pool.length} 人 / 入侵者 ${i} / 正常 ${pool.length - i}`)
}
console.log(`合计 ${tot} 人，入侵者 ${imp}，正常 ${tot - imp}`)
console.log(`通行证 ${Object.keys(ALL_PASSPORTS).length}，档案 ${Object.keys(ALL_DOSSIERS).length}`)
