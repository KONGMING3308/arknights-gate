/**
 * 用途：第 4 天的通行证与人事档案数据（从 roster.d4.ts 拆出，控制单文件行数）。
 * 输入：无。
 * 输出：DAY4_PASSPORTS / DAY4_DOSSIERS。
 * 依赖：@/types
 */
import type { Dossier, Passport } from '@/types'

export const DAY4_PASSPORTS: Record<string, Passport> = {
  'texas-d4': {
    number: 'RI-7701-334',
    holderName: '德克萨斯',
    photo: 'texas.png',
    issueDate: '1096-06-15',
    expiryDate: '1097-06-14',
    route: '哥伦比亚 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
  },
  'exusiai-d4': {
    number: 'RI-5523-891',
    holderName: '能天使',
    photo: 'exusiai_glitch.png',
    issueDate: '1096-04-01',
    expiryDate: '1097-03-31',
    route: '拉特兰 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
  },
  'lappland-d4': {
    number: 'RI-6634-207',
    holderName: '拉普兰德',
    photo: 'lappland.png',
    issueDate: '1096-05-20',
    expiryDate: '1097-05-19',
    route: '叙拉古 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
  },
  'croissant-d4': {
    number: 'RI-9918-445',
    holderName: '可颂',
    photo: 'croissant_glitch.png',
    issueDate: '1096-07-10',
    expiryDate: '1097-07-09',
    route: '米诺斯 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
  },
  'silverash-d4': {
    number: 'RI-2207-668',
    holderName: '银灰',
    photo: 'silverash.png',
    issueDate: '1096-02-28',
    expiryDate: '1097-02-27',
    route: '谢拉格 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
  },
}

export const DAY4_DOSSIERS: Record<string, Dossier> = {
  德克萨斯: {
    codeName: '德克萨斯',
    number: 'RI-7701-334',
    occupation: '先锋干员',
    origin: '哥伦比亚',
    recommender: '博士',
    photo: 'texas.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  能天使: {
    codeName: '能天使',
    number: 'RI-5523-819',
    occupation: '狙击干员',
    origin: '拉特兰',
    recommender: '德克萨斯',
    photo: 'exusiai.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  拉普兰德: {
    codeName: '拉普兰德',
    number: 'RI-6634-207',
    occupation: '近卫干员',
    origin: '叙拉古',
    recommender: '凯尔希',
    photo: 'lappland.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  可颂: {
    codeName: '可颂',
    number: 'RI-4418-995',
    occupation: '重装干员',
    origin: '米诺斯',
    recommender: '银灰',
    photo: 'croissant.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  银灰: {
    codeName: '银灰',
    number: 'RI-2207-668',
    occupation: '近卫干员',
    origin: '谢拉格',
    recommender: '博士',
    photo: 'silverash.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
}
