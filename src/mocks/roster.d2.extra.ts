/**
 * 用途：提供第 2 天额外正常干员的剧本数据。
 * 输入：无。
 * 输出：导出第 2 天额外的 Applicant 列表、Passport 字典与 Dossier 字典。
 * 依赖：@/types
 */

import type { Applicant, Dossier, Passport } from '@/types'

export const DAY2_EXTRA_APPLICANTS: Applicant[] = [
  {
    id: 'hibiscus-d2',
    codeName: '芙蓉',
    portrait: 'hibiscus.png',
    race: '萨卡兹',
    origin: '维多利亚',
    occupation: '医疗干员',
    kind: 'operator',
    day: 2,
    slot: 4,
    intent: '医疗部物资补给申请',
    recommender: '嘉维尔',
    dialogue: [
      { question: '代号', answer: '我是芙蓉，医疗部的。' },
      { question: '来意', answer: '来提交医疗物资补给的申请单，顺便把上个月的消耗报表交上去。' },
      { question: '担保人', answer: '嘉维尔医生帮我签的字，她说流程没问题。' },
    ],
    passportNumber: 'RI-1201-005',
    dossierNumber: 'RI-1201-005',
    photoMatch: true,
  },
  {
    id: 'gavial-d2',
    codeName: '嘉维尔',
    portrait: 'gavial.png',
    race: '阿达克利斯',
    origin: '萨尔贡',
    occupation: '医疗干员',
    kind: 'operator',
    day: 2,
    slot: 5,
    intent: '外勤医疗队归队汇报',
    recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '嘉维尔，医疗干员。别看我这样，我可是有执照的。' },
      { question: '来意', answer: '刚从外勤回来，得把任务报告交了，还有几个伤员的情况要跟进。' },
      { question: '担保人', answer: '凯尔希。外勤申请是她批的。' },
    ],
    passportNumber: 'RI-1202-006',
    dossierNumber: 'RI-1202-006',
    photoMatch: true,
  },
]

export const DAY2_EXTRA_PASSPORTS: Record<string, Passport> = {
  'hibiscus-d2': {
    number: 'RI-1201-005',
    holderName: '芙蓉',
    photo: 'hibiscus.png',
    issueDate: '1096-09-01',
    expiryDate: '1097-08-31',
    route: '维多利亚 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
    sealId: 'standard',
  },
  'gavial-d2': {
    number: 'RI-1202-006',
    holderName: '嘉维尔',
    photo: 'gavial.png',
    issueDate: '1096-09-05',
    expiryDate: '1097-09-04',
    route: '萨尔贡 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
    sealId: 'standard',
  },
}

export const DAY2_EXTRA_DOSSIERS: Record<string, Dossier> = {
  芙蓉: {
    codeName: '芙蓉',
    number: 'RI-1201-005',
    occupation: '医疗干员',
    origin: '维多利亚',
    recommender: '嘉维尔',
    photo: 'hibiscus.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  嘉维尔: {
    codeName: '嘉维尔',
    number: 'RI-1202-006',
    occupation: '医疗干员',
    origin: '萨尔贡',
    recommender: '凯尔希',
    photo: 'gavial.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
}
