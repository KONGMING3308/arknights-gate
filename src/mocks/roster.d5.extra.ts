/**
 * 用途：第 5 天追加 Mock 剧本数据（2 名正常干员 + 1 名入侵者「变形者集群」）。
 *       · 末药、芙兰卡：零破绽正常入境者，证件与档案完全自洽。
 *       · 变形者集群：伪装成人的异常存在，kind='impostor'。
 *         破绽：passportNumber 格式不存在（RI-0000-000）；印章文字为「罗德岛人事部」
 *         但 stampType='missing'（根本没有章）；passportNumber ≠ dossierNumber；
 *         对话诡异但不直接暴露身份；attacksWhenRejected=true。
 * 输入：无。
 * 输出：DAY5_EXTRA_APPLICANTS / DAY5_EXTRA_PASSPORTS / DAY5_EXTRA_DOSSIERS。
 * 依赖：@/types
 */
import type { Applicant, Dossier, Passport } from '@/types'

export const DAY5_EXTRA_APPLICANTS: Applicant[] = [
  {
    id: 'myrtle-d5',
    codeName: '末药',
    portrait: 'myrtle.png',
    race: '沃尔珀',
    origin: '卡兹戴尔',
    occupation: '医疗干员',
    kind: 'operator',
    day: 5,
    slot: 5,
    intent: '药草采集外勤结束，返舰制药',
    recommender: '嘉维尔',
    dialogue: [
      { question: '代号', answer: '末药……嗯，是我。药材已经采齐了。' },
      { question: '来意', answer: '从卡兹戴尔采药回来，要赶在药效过期前制成药丸。' },
      { question: '担保人', answer: '嘉维尔医生。她帮我批的外勤申请。' },
    ],
    passportNumber: 'RI-4429-773',
    dossierNumber: 'RI-4429-773',
    photoMatch: true,
  },
  {
    id: 'franka-d5',
    codeName: '芙兰卡',
    portrait: 'franka.png',
    race: '沃尔珀',
    origin: '哥伦比亚',
    occupation: '近卫干员',
    kind: 'operator',
    day: 5,
    slot: 6,
    intent: '黑钢联合行动结束，返回罗德岛接受治疗',
    recommender: '博士',
    dialogue: [
      { question: '代号', answer: '芙兰卡～哎呀，审查官大人，又见面了呢。' },
      { question: '来意', answer: '哥伦比亚的联合行动收队啦，回来做例行治疗。证件都齐全的哦？' },
      { question: '担保人', answer: '博士亲自签的字。不信的话，可以去问他本人呀。' },
    ],
    passportNumber: 'RI-7781-335',
    dossierNumber: 'RI-7781-335',
    photoMatch: true,
  },
  {
    id: 'shapeshifter-d5',
    codeName: '变形者集群',
    portrait: 'shapeshifter.png',
    race: '未知',
    origin: '未知',
    occupation: '未知',
    kind: 'impostor',
    day: 5,
    slot: 7,
    intent: '申请入境登记',
    recommender: '——',
    dialogue: [
      { question: '代号', answer: '我叫……你们不是都这么叫我吗？' },
      { question: '来意', answer: '来学习怎么当一个人。' },
      { question: '担保人', answer: '推荐人？我认识很多人。真的很多。' },
    ],
    passportNumber: 'RI-0000-000',
    dossierNumber: 'RI-0000-001',
    photoMatch: true,
    attacksWhenRejected: true,
  },
]

export const DAY5_EXTRA_PASSPORTS: Record<string, Passport> = {
  'myrtle-d5': {
    number: 'RI-4429-773',
    holderName: '末药',
    photo: 'myrtle.png',
    issueDate: '1096-07-14',
    expiryDate: '1097-07-13',
    route: '卡兹戴尔 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
  },
  'franka-d5': {
    number: 'RI-7781-335',
    holderName: '芙兰卡',
    photo: 'franka.png',
    issueDate: '1096-06-03',
    expiryDate: '1097-06-02',
    route: '哥伦比亚 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
  },
  'shapeshifter-d5': {
    number: 'RI-0000-000',
    holderName: '变形者集群',
    photo: 'shapeshifter.png',
    issueDate: '1096-01-01',
    expiryDate: '1097-01-01',
    route: '未知 → 罗德岛本舰',
    stampType: 'missing',
    sealText: '罗德岛人事部',
  },
}

export const DAY5_EXTRA_DOSSIERS: Record<string, Dossier> = {
  末药: {
    codeName: '末药',
    number: 'RI-4429-773',
    occupation: '医疗干员',
    origin: '卡兹戴尔',
    recommender: '嘉维尔',
    photo: 'myrtle.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  芙兰卡: {
    codeName: '芙兰卡',
    number: 'RI-7781-335',
    occupation: '近卫干员',
    origin: '哥伦比亚',
    recommender: '博士',
    photo: 'franka.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  变形者集群: {
    codeName: '变形者集群',
    number: 'RI-0000-001',
    occupation: '未知',
    origin: '未知',
    recommender: '——',
    photo: 'shapeshifter.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
}
