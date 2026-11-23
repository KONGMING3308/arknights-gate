/**
 * 用途：第 4 天追加 Mock 剧本数据（3 名正常干员）。
 *       均为零破绽的正常入境者，证件与档案完全自洽。
 * 输入：无。
 * 输出：DAY4_EXTRA_APPLICANTS / DAY4_EXTRA_PASSPORTS / DAY4_EXTRA_DOSSIERS。
 * 依赖：@/types
 */
import type { Applicant, Dossier, Passport } from '@/types'

export const DAY4_EXTRA_APPLICANTS: Applicant[] = [
  {
    id: 'warfarin-d4',
    codeName: '华法琳',
    portrait: 'warfarin.png',
    race: '萨卡兹',
    origin: '卡兹戴尔',
    occupation: '医疗干员',
    kind: 'operator',
    day: 4,
    slot: 5,
    intent: '血液样本采集外勤结束，返舰归档',
    recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '华法琳。血库还有三批样本没入库，我得赶回去。' },
      { question: '来意', answer: '外勤采血任务结束了，回来整理数据。凯尔希医生批准过的。' },
      { question: '担保人', answer: '凯尔希。她签的字，你可以去核实。' },
    ],
    passportNumber: 'RI-8812-447',
    dossierNumber: 'RI-8812-447',
    photoMatch: true,
  },
  {
    id: 'scavenger-d4',
    codeName: '清道夫',
    portrait: 'scavenger.png',
    race: '札拉克',
    origin: '维多利亚',
    occupation: '先锋干员',
    kind: 'operator',
    day: 4,
    slot: 6,
    intent: 'S.W.E.E.P. 清扫任务完毕，归队报到',
    recommender: '博士',
    dialogue: [
      { question: '代号', answer: '清道夫。……别挡路，我赶时间。' },
      { question: '来意', answer: '清扫任务做完了，回来交差。编号没问题的，我自己核对过。' },
      { question: '担保人', answer: '博士。他下达的任务指令，档案里有备案。' },
    ],
    passportNumber: 'RI-3347-619',
    dossierNumber: 'RI-3347-619',
    photoMatch: true,
  },
  {
    id: 'courier-d4',
    codeName: '讯使',
    portrait: 'courier.png',
    race: '依特拉',
    origin: '谢拉格',
    occupation: '先锋干员',
    kind: 'operator',
    day: 4,
    slot: 7,
    intent: '喀兰贸易信使任务完成，返回罗德岛述职',
    recommender: '银灰',
    dialogue: [
      { question: '代号', answer: '讯使。信件已全部送达，回执也带回来了。' },
      { question: '来意', answer: '替恩希欧迪斯老爷送完最后一批文书，回舰复命。' },
      { question: '担保人', answer: '银灰老爷。这趟差事是他亲自安排的。' },
    ],
    passportNumber: 'RI-5563-281',
    dossierNumber: 'RI-5563-281',
    photoMatch: true,
  },
]

export const DAY4_EXTRA_PASSPORTS: Record<string, Passport> = {
  'warfarin-d4': {
    number: 'RI-8812-447',
    holderName: '华法琳',
    photo: 'warfarin.png',
    issueDate: '1096-03-12',
    expiryDate: '1097-03-11',
    route: '卡兹戴尔 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
  },
  'scavenger-d4': {
    number: 'RI-3347-619',
    holderName: '清道夫',
    photo: 'scavenger.png',
    issueDate: '1096-05-08',
    expiryDate: '1097-05-07',
    route: '维多利亚 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
  },
  'courier-d4': {
    number: 'RI-5563-281',
    holderName: '讯使',
    photo: 'courier.png',
    issueDate: '1096-04-22',
    expiryDate: '1097-04-21',
    route: '谢拉格 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
  },
}

export const DAY4_EXTRA_DOSSIERS: Record<string, Dossier> = {
  华法琳: {
    codeName: '华法琳',
    number: 'RI-8812-447',
    occupation: '医疗干员',
    origin: '卡兹戴尔',
    recommender: '凯尔希',
    photo: 'warfarin.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  清道夫: {
    codeName: '清道夫',
    number: 'RI-3347-619',
    occupation: '先锋干员',
    origin: '维多利亚',
    recommender: '博士',
    photo: 'scavenger.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  讯使: {
    codeName: '讯使',
    number: 'RI-5563-281',
    occupation: '先锋干员',
    origin: '谢拉格',
    recommender: '银灰',
    photo: 'courier.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
}
