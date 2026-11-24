/**
 * 用途：生成第二批 50 位干员的候选池数据（5 天 × 10 人，每天 2 名入侵者）。
 *       破绽按天阶梯，并让 5 种印章状态（standard/wrong_dept/foreign/fake/smudged/none）都出现。
 * 输入：脚本内置名单与官方设定（已通过 prts.wiki 核对）
 * 输出：src/mocks/roster.d1~d5.pool2.ts 与 .passports.ts / .dossiers.ts
 * 依赖：Node 内置 fs
 */
import { readFileSync, writeFileSync } from 'node:fs'

const PROFILES = JSON.parse(readFileSync('scripts/data/batch2_profiles.json', 'utf8'))
const SPONSORS = ['凯尔希', '阿米娅', '博士', '杜宾', '闪灵', '银灰', '嘉维尔', '芙蓉', '临光', '塞雷娅']

/** 每天 10 人；第 3、7 位是入侵者 */
const IMPOSTOR_SLOTS = [3, 7]

/** 各天入侵者的破绽配置 */
const FLAWS = {
  1: [
    { sealId: 'fake', note: '仿真假章：形制与标准章不符' },
    { sealId: 'foreign', note: '完全错误的机构章' },
  ],
  2: [{ num: true }, { num: true }],
  3: [{ photo: true }, { photo: true }],
  4: [{ status: 'missing' }, { status: 'revoked' }],
  5: [
    { num: true, sealId: 'wrong_dept' },
    { photo: true, badSponsor: true },
  ],
}

const SEAL_TEXT = {
  standard: '罗德岛人事部',
  wrong_dept: '罗德岛后勤部',
  foreign: '其他机构',
  fake: '罗德岛人事部（形制不符）',
  smudged: '污损，无法辨认',
  none: '无',
}

const LADDER = [
  '印章（仿真假章 / 完全错误机构）',
  '编号不符',
  '照片不符',
  '档案状态（查无此人 / 已注销）',
  '多重破绽（编号+印章 / 照片+担保人）',
]

const summary = []

for (let day = 1; day <= 5; day += 1) {
  const group = PROFILES.slice((day - 1) * 10, day * 10)
  const appLines = []
  const passLines = []
  const dosLines = []
  const imps = []

  group.forEach((p, i) => {
    const isImp = IMPOSTOR_SLOTS.includes(i)
    const impIdx = IMPOSTOR_SLOTS.indexOf(i)
    const flaw = isImp ? FLAWS[day][impIdx] : {}
    const id = `${p.id}-d${day}q`
    const num = `RI-${day}${String(i + 1).padStart(3, '0')}-${200 + i * 3}`
    const dnum = flaw.num ? `RI-${day}${String(i + 1).padStart(3, '0')}-${800 + i}` : num
    const photo = flaw.photo ? `${p.id}_glitch.png` : `${p.id}.png`
    const status = flaw.status ?? 'active'
    const sponsor = flaw.badSponsor ? '艾尔文' : SPONSORS[(i + day * 2) % SPONSORS.length]
    const sealId = flaw.sealId ?? 'standard'
    const stampType = sealId === 'none' ? 'missing' : sealId === 'smudged' ? 'smudged' : 'clear'
    if (isImp) imps.push(p.cn)

    const tpl = isImp
      ? [
          ['代号', ['我……是这个名字吧？', '表上写什么就是什么。', '对，是我。', '名字……嗯，没错。'][impIdx % 4]],
          ['来意', ['呃，归队而已。', '回来报到，别问那么多。', '就是常规返舰。', '赶时间，快办吧。'][impIdx % 4]],
          ['担保人', `这个我记不太清了，你看档案吧。`],
        ]
      : [
          ['代号', `${p.cn}。`],
          ['来意', ['返舰报到。', '轮换回舰，交材料。', '任务结束，回来述职。', '换防入境，办手续。', '外勤收队，回本部。'][i % 5]],
          ['担保人', `${sponsor}。`],
        ]

    appLines.push(`  {
    id: '${id}', codeName: '${p.cn}', portrait: '${p.id}.png',
    race: '${p.race}', origin: '${p.origin}', occupation: '${p.career}',
    kind: '${isImp ? 'impostor' : 'operator'}', day: ${day}, slot: ${i},
    intent: '${isImp ? '归队报到' : '返舰报到'}', recommender: '${sponsor}',
    dialogue: [
      { question: '代号', answer: '${tpl[0][1]}' }, { question: '来意', answer: '${tpl[1][1]}' },
      { question: '担保人', answer: '${tpl[2][1]}' },
    ],
    passportNumber: '${num}', dossierNumber: '${dnum}', photoMatch: ${flaw.photo ? 'false' : 'true'},
  },`)

    passLines.push(`  '${id}': {
    number: '${num}', holderName: '${p.cn}', photo: '${photo}',
    issueDate: '1096-0${day}-1${i % 9}', expiryDate: '1097-0${day}-1${i % 9}',
    route: '${p.origin === '未公开' ? '未知地区' : p.origin} → 罗德岛本舰',
    stampType: '${stampType}', sealText: '${SEAL_TEXT[sealId]}', sealId: '${sealId}',
  },`)

    dosLines.push(`  ${p.cn}: {
    codeName: '${p.cn}', number: '${dnum}', occupation: '${p.career}',
    origin: '${p.origin}', recommender: '${sponsor}', photo: '${p.id}.png',
    status: '${status}', requiredSeal: '罗德岛人事部',
  },`)
  })

  const head = (kind) => `/**
 * 用途：第 ${day} 天第二批候选池 —— ${kind}（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：${LADDER[day - 1]}。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY${day}_POOL2_${kind === '申请人' ? 'APPLICANTS' : kind === '通行证' ? 'PASSPORTS' : 'DOSSIERS'}。
 * 依赖：@/types
 */
import type { ${kind === '申请人' ? 'Applicant' : kind === '通行证' ? 'Passport' : 'Dossier'} } from '@/types'
`

  writeFileSync(`src/mocks/roster.d${day}.pool2.ts`, `${head('申请人')}\nexport const DAY${day}_POOL2_APPLICANTS: Applicant[] = [\n${appLines.join('\n')}\n]\n`, 'utf8')
  writeFileSync(`src/mocks/roster.d${day}.pool2.passports.ts`, `${head('通行证')}\nexport const DAY${day}_POOL2_PASSPORTS: Record<string, Passport> = {\n${passLines.join('\n')}\n}\n`, 'utf8')
  writeFileSync(`src/mocks/roster.d${day}.pool2.dossiers.ts`, `${head('档案')}\nexport const DAY${day}_POOL2_DOSSIERS: Record<string, Dossier> = {\n${dosLines.join('\n')}\n}\n`, 'utf8')

  summary.push({ day, imps: imps.join('、') })
}

console.log('生成完成，每天入侵者：')
for (const s of summary) console.log(`  D${s.day}: ${s.imps}`)
