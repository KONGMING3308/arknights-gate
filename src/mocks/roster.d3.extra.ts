/**
 * 用途：提供第 3 天额外正常干员的剧本数据。
 * 输入：无。
 * 输出：导出第 3 天额外的 Applicant 列表、Passport 字典与 Dossier 字典。
 * 依赖：@/types
 */

import type { Applicant, Dossier, Passport } from '@/types'

export const DAY3_EXTRA_APPLICANTS: Applicant[] = [
  {
    id: 'hemmer-d3',
    codeName: '赫默',
    portrait: 'hemmer.png',
    race: '黎博利',
    origin: '哥伦比亚',
    occupation: '医疗干员',
    kind: 'operator',
    day: 3,
    slot: 4,
    intent: '医疗设备校准与维护',
    recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '赫默，莱茵生命的前研究员，现在是医疗干员。' },
      { question: '来意', answer: '医疗无人机需要定期校准，我来提交维护申请和测试报告。' },
      { question: '担保人', answer: '凯尔希医生批准了这次设备维护计划。' },
    ],
    passportNumber: 'RI-1301-007',
    dossierNumber: 'RI-1301-007',
    photoMatch: true,
  },
  {
    id: 'nearl-d3',
    codeName: '临光',
    portrait: 'nearl.png',
    race: '库兰塔',
    origin: '卡西米尔',
    occupation: '重装干员',
    kind: 'operator',
    day: 3,
    slot: 5,
    intent: '骑士装备检修与战术复盘',
    recommender: '闪灵',
    dialogue: [
      { question: '代号', answer: '临光，前卡西米尔耀骑士，现为重装干员。' },
      { question: '来意', answer: '装备需要检修，另外想和杜宾教官讨论一下最近的战术演练安排。' },
      { question: '担保人', answer: '闪灵。她建议我在任务间隙把装备问题处理一下。' },
    ],
    passportNumber: 'RI-1302-008',
    dossierNumber: 'RI-1302-008',
    photoMatch: true,
  },
  {
    id: 'closure-d3',
    codeName: '可露希尔',
    portrait: 'closure.png',
    race: '萨卡兹',
    origin: '卡兹戴尔',
    occupation: '先锋干员',
    kind: 'operator',
    day: 3,
    slot: 6,
    intent: '工程部采购审批与系统升级',
    recommender: '博士',
    dialogue: [
      { question: '代号', answer: '可露希尔，总工程师兼采购部负责人。有什么事找我？' },
      { question: '来意', answer: '有几笔采购需要你签字确认，顺便把指挥系统的升级方案过一遍。' },
      { question: '担保人', answer: '博士。他说这次系统升级很重要，让我亲自跑一趟。' },
    ],
    passportNumber: 'RI-1303-009',
    dossierNumber: 'RI-1303-009',
    photoMatch: true,
  },
]

export const DAY3_EXTRA_PASSPORTS: Record<string, Passport> = {
  'hemmer-d3': {
    number: 'RI-1301-007',
    holderName: '赫默',
    photo: 'hemmer.png',
    issueDate: '1096-10-10',
    expiryDate: '1097-10-09',
    route: '哥伦比亚 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
    sealId: 'standard',
  },
  'nearl-d3': {
    number: 'RI-1302-008',
    holderName: '临光',
    photo: 'nearl.png',
    issueDate: '1096-10-15',
    expiryDate: '1097-10-14',
    route: '卡西米尔 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
    sealId: 'standard',
  },
  'closure-d3': {
    number: 'RI-1303-009',
    holderName: '可露希尔',
    photo: 'closure.png',
    issueDate: '1096-10-20',
    expiryDate: '1097-10-19',
    route: '卡兹戴尔 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
    sealId: 'standard',
  },
}

export const DAY3_EXTRA_DOSSIERS: Record<string, Dossier> = {
  赫默: {
    codeName: '赫默',
    number: 'RI-1301-007',
    occupation: '医疗干员',
    origin: '哥伦比亚',
    recommender: '凯尔希',
    photo: 'hemmer.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  临光: {
    codeName: '临光',
    number: 'RI-1302-008',
    occupation: '重装干员',
    origin: '卡西米尔',
    recommender: '闪灵',
    photo: 'nearl.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  可露希尔: {
    codeName: '可露希尔',
    number: 'RI-1303-009',
    occupation: '先锋干员',
    origin: '卡兹戴尔',
    recommender: '博士',
    photo: 'closure.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
}
