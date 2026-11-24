/**
 * 用途：第 5 天的通行证与人事档案数据（从 roster.d5.ts 拆出，控制单文件行数）。
 * 输入：无。
 * 输出：DAY5_PASSPORTS / DAY5_DOSSIERS。
 * 依赖：@/types
 */
import type { Dossier, Passport } from '@/types'

export const DAY5_PASSPORTS: Record<string, Passport> = {
  'nightingale-d5': {
    number: 'RI-3389-112',
    holderName: '夜莺',
    photo: 'nightingale.png',
    issueDate: '1096-08-05',
    expiryDate: '1097-08-04',
    route: '卡兹戴尔 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
    sealId: 'standard',
  },
  'shining-d5': {
    number: 'RI-7742-558',
    holderName: '闪灵',
    photo: 'shining.png',
    issueDate: '1096-08-05',
    expiryDate: '1097-08-04',
    route: '卡兹戴尔 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛后勤部',
    sealId: 'wrong_dept',
  },
  'hoshiguma-d5': {
    number: 'RI-8856-301',
    holderName: '星熊',
    photo: 'hoshiguma.png',
    issueDate: '1096-07-18',
    expiryDate: '1097-07-17',
    route: '东国 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
    sealId: 'standard',
  },
  'chen-d5': {
    number: 'RI-4471-889',
    holderName: '陈',
    photo: 'chen.png',
    issueDate: '1096-06-30',
    expiryDate: '1097-06-29',
    route: '龙门 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
    sealId: 'standard',
  },
  'siege-d5': {
    number: 'RI-6693-224',
    holderName: '推进之王',
    photo: 'siege_glitch.png',
    issueDate: '1096-09-01',
    expiryDate: '1097-08-31',
    route: '维多利亚 → 罗德岛本舰',
    stampType: 'clear',
    sealText: '罗德岛人事部',
    sealId: 'standard',
  },
}

export const DAY5_DOSSIERS: Record<string, Dossier> = {
  夜莺: {
    codeName: '夜莺',
    number: 'RI-3389-112',
    occupation: '医疗干员',
    origin: '卡兹戴尔',
    recommender: '闪灵',
    photo: 'nightingale.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  闪灵: {
    codeName: '闪灵',
    number: 'RI-1142-778',
    occupation: '医疗干员',
    origin: '卡兹戴尔',
    recommender: '洛肯',
    photo: 'shining.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  星熊: {
    codeName: '星熊',
    number: 'RI-8856-301',
    occupation: '重装干员',
    origin: '东国',
    recommender: '陈',
    photo: 'hoshiguma.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  陈: {
    codeName: '陈',
    number: 'RI-4471-889',
    occupation: '近卫干员',
    origin: '龙门',
    recommender: '博士',
    photo: 'chen.png',
    status: 'active',
    requiredSeal: '罗德岛人事部',
  },
  推进之王: {
    codeName: '推进之王',
    number: 'RI-6693-224',
    occupation: '先锋干员',
    origin: '维多利亚',
    recommender: '博士',
    photo: 'siege.png',
    status: 'revoked',
    requiredSeal: '罗德岛人事部',
  },
}
