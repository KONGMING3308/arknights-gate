/**
 * 用途：第 3 天第二批候选池 —— 档案（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：照片不符。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY3_POOL2_DOSSIERS。
 * 依赖：@/types
 */
import type { Dossier } from '@/types'

export const DAY3_POOL2_DOSSIERS: Record<string, Dossier> = {
  澄闪: {
    codeName: '澄闪', number: 'RI-3001-200', occupation: '术师干员',
    origin: '维多利亚', recommender: '嘉维尔', photo: 'chengshan.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  铃兰: {
    codeName: '铃兰', number: 'RI-3002-203', occupation: '辅助干员',
    origin: '东国', recommender: '芙蓉', photo: 'linglan.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  桃金娘: {
    codeName: '桃金娘', number: 'RI-3003-206', occupation: '先锋干员',
    origin: '未公开', recommender: '临光', photo: 'taojinniang.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  阿消: {
    codeName: '阿消', number: 'RI-3004-209', occupation: '特种干员',
    origin: '龙门', recommender: '塞雷娅', photo: 'axiao.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  卡达: {
    codeName: '卡达', number: 'RI-3005-212', occupation: '术师干员',
    origin: '未公开', recommender: '凯尔希', photo: 'kada.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  松果: {
    codeName: '松果', number: 'RI-3006-215', occupation: '狙击干员',
    origin: '哥伦比亚', recommender: '阿米娅', photo: 'songguo.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  稀音: {
    codeName: '稀音', number: 'RI-3007-218', occupation: '辅助干员',
    origin: '萨尔贡', recommender: '博士', photo: 'xiyin.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  苦艾: {
    codeName: '苦艾', number: 'RI-3008-221', occupation: '术师干员',
    origin: '乌萨斯', recommender: '杜宾', photo: 'kuai.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  莱恩哈特: {
    codeName: '莱恩哈特', number: 'RI-3009-224', occupation: '术师干员',
    origin: '雷姆必拓', recommender: '闪灵', photo: 'lainhard.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  断崖: {
    codeName: '断崖', number: 'RI-3010-227', occupation: '近卫干员',
    origin: '雷姆必拓', recommender: '银灰', photo: 'duanya.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
}
