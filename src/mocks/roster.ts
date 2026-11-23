/**
 * 用途：Mock 剧本数据（M1 只做第 1 天，三人）。后续天数的数据在 roster.d2 等文件扩展。
 * 输入：day 天数。输出：申请人及其证件。
 * 依赖：@/types
 */
import type { Applicant, Dossier, Passport } from '@/types'

/** 第 1 天：三名申请人，其中一人是冒名者 */
export const DAY1_APPLICANTS: Applicant[] = [
  {
    id: 'kroos-d1',
    codeName: '克洛丝',
    portrait: 'kroos.png',
    race: '卡特斯',
    origin: '雷姆必拓',
    occupation: '狙击干员',
    kind: 'operator',
    day: 1,
    slot: 0,
    intent: '轮换返舰，向狙击小组报到',
    recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '克洛丝。出去太久了，差点忘了报到的规矩。' },
      { question: '来意', answer: '轮换返舰，归队报到。我带了外地机场的通行证。' },
      { question: '担保人', answer: '凯尔希医生。返舰许可上是她签的字。' },
    ],
    passportNumber: 'RI-8841-207',
    dossierNumber: 'RI-8841-207',
    photoMatch: true,
  },
  {
    id: 'fang-d1',
    codeName: '芬',
    portrait: 'fang.png',
    race: '库兰塔',
    origin: '卡西米尔',
    occupation: '先锋干员',
    kind: 'operator',
    day: 1,
    slot: 1,
    intent: '护送补给车队返舰',
    recommender: '阿米娅',
    dialogue: [
      { question: '代号', answer: '芬。车队已经停在闸口外了。' },
      { question: '来意', answer: '护送补给返舰，单据都在通行证夹层里。' },
      { question: '担保人', answer: '阿米娅。派遣函是她那边开的。' },
    ],
    passportNumber: 'RI-6612-118',
    dossierNumber: 'RI-6612-118',
    photoMatch: true,
  },
  {
    id: 'beagle-d1',
    codeName: '米格鲁',
    portrait: 'beagle.png',
    race: '佩洛',
    origin: '玻利瓦尔',
    occupation: '重装干员',
    kind: 'impostor',
    day: 1,
    slot: 2,
    intent: '重装小队归建',
    recommender: '杜宾',
    dialogue: [
      { question: '代号', answer: '米格鲁。重装小队归建。' },
      { question: '来意', answer: '……归建。就是归建，没什么好说的。' },
      { question: '担保人', answer: '杜宾教官。你可以去问她。' },
    ],
    passportNumber: 'RI-3020-441',
    dossierNumber: 'RI-3020-441',
    photoMatch: true,
  },
]

/** 通行证：印章文字是第 1 天唯一的破绽 */
export const DAY1_PASSPORTS: Record<string, Passport> = {
  'kroos-d1': {
    number: 'RI-8841-207',
    holderName: '克洛丝',
    photo: 'kroos.png',
    issueDate: '1096-03-12',
    expiryDate: '1097-03-11',
    route: '雷姆必拓 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
  },
  'fang-d1': {
    number: 'RI-6612-118',
    holderName: '芬',
    photo: 'fang.png',
    issueDate: '1095-11-02',
    expiryDate: '1096-11-01',
    route: '卡西米尔 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
  },
  'beagle-d1': {
    number: 'RI-3020-441',
    holderName: '米格鲁',
    photo: 'beagle.png',
    issueDate: '1096-01-20',
    expiryDate: '1097-01-19',
    route: '玻利瓦尔 → 罗德岛本舰',
    stampType: 'smudged',
    sealText: '（污损）…人事部',
  },
}

/** 人事档案：requiredSeal 是入境必须持有的印章机构 */
export const DAY1_DOSSIERS: Record<string, Dossier> = {
  克洛丝: {
    codeName: '克洛丝',
    number: 'RI-8841-207',
    occupation: '狙击干员',
    origin: '雷姆必拓',
    recommender: '凯尔希',
    photo: 'kroos.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  芬: {
    codeName: '芬',
    number: 'RI-6612-118',
    occupation: '先锋干员',
    origin: '卡西米尔',
    recommender: '阿米娅',
    photo: 'fang.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  米格鲁: {
    codeName: '米格鲁',
    number: 'RI-3020-441',
    occupation: '重装干员',
    origin: '玻利瓦尔',
    recommender: '杜宾',
    photo: 'beagle.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
}
