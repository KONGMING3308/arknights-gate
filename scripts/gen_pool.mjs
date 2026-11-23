/**
 * 用途：根据官方设定生成 5 天 × 10 人候选池，拆成 applicant / passport / dossier 三个文件以控制行数。
 *       破绽按天阶梯：D1 印章 → D2 编号 → D3 职业 → D4 档案状态 → D5 多重破绽。
 * 输入：scripts/data/new_profiles.json
 * 输出：src/mocks/roster.dN.pool.ts + .passports.ts + .dossiers.ts
 * 依赖：Node 内置 fs
 */
import { readFileSync, writeFileSync } from 'node:fs'

const PROFILES = JSON.parse(readFileSync('scripts/data/new_profiles.json', 'utf8'))
const SPONSORS = ['凯尔希', '阿米娅', '博士', '杜宾', '闪灵', '银灰', '嘉维尔', '芙蓉', '临光', '塞雷娅']

const OP_LINES = {
  1: [['报到规矩我懂，不耽误你。', '轮换返舰，交完表就走。', '返舰许可上有签字。'], ['材料都在这儿，慢慢看。', '外勤收队，回来补个手续。', '担保人那边知会过了。'], ['我是本人，证据在护照上。', '任务结束，回来歇两天。', '推荐表我带着。'], ['手续齐的，你随便核。', '换防返舰，赶时间。', '是本部签的。'], ['先看材料，我不急。', '例行返舰，没别的事。', '担保人已经报备。'], ['别紧张，我就是来报到的。', '前线回来，需要补给。', '本部那边给我开了函。'], ['名字对得上吧？', '回来交接，半小时就好。', '担保人是本舰的老干员。'], ['单子在这儿，章也盖了。', '押运结束，货要卸。', '担保人在舰上。'], ['路上跑了三天，累。', '返舰休整，顺便述职。', '推荐人写得很清楚。'], ['我都配合，你查吧。', '外派结束，回本部。', '担保人签过字了。']],
  2: [['材料带了，编号你核对一下。', '换岗返舰，手续都办了。', '担保人在这边等。'], ['我是来交报告的。', '外勤一个月，总算回舰。', '推荐表在夹层里。'], ['证件是真的，放心。', '回来补装备。', '本部开的函。'], ['别耽误太久，我还要上岗。', '轮换返舰。', '担保人已经签了。'], ['手续不会少，你放心。', '收队回舰，报个到。', '推荐人是老资格。'], ['第一次走这道流程。', '调岗过来，先办入境。', '担保人写在本部名单上。'], ['材料齐，你慢慢核。', '任务交接，时间紧。', '担保人那边清楚。'], ['护照在这儿。', '返舰补给，明天就走。', '推荐表本人签的。'], ['我是本舰的人。', '前哨回来，交差。', '担保人在册。'], ['例行公事，配合你。', '换防结束，回来休整。', '担保人开了证明。']],
  3: [['材料我看了三遍，没问题。', '外派归来，办入境。', '担保人是我的直属。'], ['你可以随便查。', '轮换返舰，报告带齐了。', '推荐表在本部。'], ['我是干这行的老手。', '回来带新人。', '担保人清楚我的底细。'], ['别用那种眼神看我。', '任务结束，回来述职。', '担保人签的字。'], ['证件没毛病。', '返舰交接，赶时间。', '本部那份函在我手上。'], ['流程我熟，快一点。', '换防回舰，补个手续。', '担保人是在册干员。'], ['要核就核，我不怕。', '外勤收队，回来喘口气。', '推荐人已经报备。'], ['东西都在这儿。', '调岗入境，办完就走。', '担保人开的证明。'], ['我看上去像假的？', '前线轮换，返舰休整。', '担保人是本舰的。'], ['配合你工作。', '任务收尾，回本部。', '担保人签过字。']],
  4: [['材料齐，随便核。', '这次外派时间长，回来补手续。', '担保人是我老上级。'], ['护照、档案、函，都在这儿。', '轮换返舰，交完就走。', '推荐人是本舰的。'], ['我是本人，别怀疑。', '任务结束，回来述职。', '担保人清楚得很。'], ['手续我办得干净。', '换防回舰。', '本部开的证明。'], ['你看材料，我看着你。', '返舰补给，三天后又走。', '担保人已经在册。'], ['我没什么好藏的。', '外勤收队，回来歇脚。', '推荐表带在身上的。'], ['流程走完我就上岗。', '调岗入境，办手续。', '担保人签了字。'], ['材料经得起看。', '前哨轮换，返舰。', '担保人是老资格。'], ['都合规的。', '任务交接，时间不多。', '本部有备案。'], ['你核你的，我等着。', '返舰休整，顺便交差。', '担保人开了函。']],
  5: [['材料我核对过了，没问题。', '最后一趟外派，回来就不走了。', '担保人很清楚我。'], ['我不喜欢这道流程，但还是配合。', '轮换返舰，报告齐。', '推荐人在本部。'], ['证件没有任何问题。', '任务收尾，回来述职。', '担保人亲自签的字。'], ['你可以查到底。', '换防回舰，办入境。', '本部开的函在夹层。'], ['我看上去像来路不明的？', '返舰补给，明天就走。', '担保人在册，你可以核。'], ['手续都在，你慢慢看。', '外勤结束，回来交接。', '推荐人报备过了。'], ['没什么好问的。', '调岗入境，办完上岗。', '担保人清楚我底细。'], ['材料齐，别拖。', '前哨回来，交差。', '担保人是本舰老干员。'], ['我都准备好了。', '任务完成，返舰休整。', '担保人签过字。'], ['按规矩办吧。', '轮换回舰，补手续。', '推荐表在本部有备案。']],
}

const IMP_LINES = [
  ['我……是这个名字吧？对，就是这个。', '呃，归队。就是归队，没什么好说的。', '担保人？他应该记得我吧。'],
  ['材料上写的都是我。', '回来报到。别问那么多。', '推荐人……我记不太清了。'],
  ['对，是我本人。', '任务结束了嘛，回来歇着。', '担保人肯定记得我。'],
  ['证件是真的，我发誓。', '赶紧办完吧，我还有事。', '名字都在档案上，你自己看。'],
  ['我怎么会不是本人？', '呃……例行返舰而已。', '推荐人？我认识不少人。'],
  ['照片是我，只是有点走样。', '快点，别耽误我时间。', '担保人在本部，你去问。'],
  ['是我。别看了。', '回来述职。就这样。', '推荐人……记不清了。'],
  ['文件都对得上吧？', '我一个人回来的。', '担保人应该还在舰上。'],
  ['我是本人，没错。', '任务收尾，回来交报告。', '担保人那边会证明我的。'],
  ['你怀疑我？没必要。', '归队。没别的。', '担保人……会认我的。'],
]

function makeFlaws(day, impIdx, isImp) {
  const f = { stampType: 'clear', sealText: '罗德岛人事部', numMismatch: false, occMismatch: false, status: 'active', badSponsor: false }
  if (!isImp) return f
  if (day === 1) {
    if (impIdx === 0) f.stampType = 'smudged'
    else f.sealText = '罗德岛后勤部'
  } else if (day === 2) f.numMismatch = true
  else if (day === 3) f.occMismatch = true
  else if (day === 4) f.status = impIdx === 0 ? 'missing' : 'revoked'
  else {
    if (impIdx === 0) { f.numMismatch = true; f.sealText = '罗德岛后勤部' }
    else { f.stampType = 'missing'; f.badSponsor = true }
  }
  return f
}

const IMPOSTOR_SLOTS = [3, 7]
const HEAD = (day, title) => `/**
 * 用途：第 ${day} 天候选池 —— ${title}。
 *       破绽阶梯：${['印章（污损 / 机构不符）', '编号不符', '职业不符', '档案状态（查无此人 / 已注销）', '多重破绽'][day - 1]}。
 *       种族 / 出身 / 职业均来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY${day}_POOL_${title === '申请人' ? 'APPLICANTS' : title === '通行证' ? 'PASSPORTS' : 'DOSSIERS'}。
 * 依赖：@/types
 */
import type { ${title === '申请人' ? 'Applicant' : title === '通行证' ? 'Passport' : 'Dossier'} } from '@/types'
`

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
    const f = makeFlaws(day, impIdx, isImp)
    const id = `${p.id}-d${day}p`
    const num = `RI-${day}${String(i + 1).padStart(3, '0')}-${100 + i * 7}`
    const dnum = f.numMismatch ? `RI-${day}${String(i + 1).padStart(3, '0')}-${900 + i}` : num
    const occ = f.occMismatch ? '狙击干员' : p.career
    const sponsor = f.badSponsor ? '艾尔文' : SPONSORS[(i + day) % SPONSORS.length]
    const tpl = isImp ? IMP_LINES[impIdx] : OP_LINES[day][i]
    const origin = /未公开|不公开|不明/.test(p.origin) ? '未公开' : p.origin
    if (isImp) imps.push(p.cn)

    appLines.push(`  {
    id: '${id}',
    codeName: '${p.cn}',
    portrait: '${p.id}.png',
    race: '${p.race}',
    origin: '${origin}',
    occupation: '${occ}',
    kind: '${isImp ? 'impostor' : 'operator'}',
    day: ${day},
    slot: ${i},
    intent: '${isImp ? '归队报到' : `返舰${['报到', '述职', '交接', '补给', '休整'][i % 5]}`}',
    recommender: '${sponsor}',
    dialogue: [
      { question: '代号', answer: '${isImp ? tpl[0] : `${p.cn}。${tpl[0]}`}' },
      { question: '来意', answer: '${tpl[1]}' },
      { question: '担保人', answer: '${isImp ? tpl[2] : `${sponsor}。${tpl[2]}`}' },
    ],
    passportNumber: '${num}',
    dossierNumber: '${dnum}',
    photoMatch: true,
  },`)

    passLines.push(`  '${id}': {
    number: '${num}',
    holderName: '${p.cn}',
    photo: '${p.id}.png',
    issueDate: '1096-0${day}-1${i % 9}',
    expiryDate: '1097-0${day}-1${i % 9}',
    route: '${origin === '未公开' ? '未知地区' : origin} → 罗德岛本舰',
    stampType: '${f.stampType}',
    sealText: '${f.sealText}',
  },`)

    dosLines.push(`  ${p.cn}: {
    codeName: '${p.cn}',
    number: '${dnum}',
    occupation: '${p.career}',
    origin: '${origin}',
    recommender: '${sponsor}',
    photo: '${p.id}.png',
    status: '${f.status}',
    requiredSeal: '罗德岛人事部',
  },`)
  })

  writeFileSync(`src/mocks/roster.d${day}.pool.ts`, `${HEAD(day, '申请人')}\nexport const DAY${day}_POOL_APPLICANTS: Applicant[] = [\n${appLines.join('\n')}\n]\n`, 'utf8')
  writeFileSync(`src/mocks/roster.d${day}.pool.passports.ts`, `${HEAD(day, '通行证')}\nexport const DAY${day}_POOL_PASSPORTS: Record<string, Passport> = {\n${passLines.join('\n')}\n}\n`, 'utf8')
  writeFileSync(`src/mocks/roster.d${day}.pool.dossiers.ts`, `${HEAD(day, '档案')}\nexport const DAY${day}_POOL_DOSSIERS: Record<string, Dossier> = {\n${dosLines.join('\n')}\n}\n`, 'utf8')

  summary.push({ day, imps: imps.join('、') })
}

console.log('生成完成，入侵者：')
for (const s of summary) console.log(`  D${s.day}: ${s.imps}`)
