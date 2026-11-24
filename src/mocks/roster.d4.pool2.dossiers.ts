/**
 * 用途：第 4 天第二批候选池 —— 档案（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：档案状态（查无此人 / 已注销）。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY4_POOL2_DOSSIERS。
 * 依赖：@/types
 */
import type { Dossier } from '@/types'

export const DAY4_POOL2_DOSSIERS: Record<string, Dossier> = {
  露托: {
    codeName: '露托', number: 'RI-4001-200', occupation: '重装干员',
    origin: '玻利瓦尔', recommender: '临光', photo: 'luotuo.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  达格达: {
    codeName: '达格达', number: 'RI-4002-203', occupation: '近卫干员',
    origin: '维多利亚', recommender: '塞雷娅', photo: 'dageda.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  格劳克斯: {
    codeName: '格劳克斯', number: 'RI-4003-206', occupation: '辅助干员',
    origin: '阿戈尔地区', recommender: '凯尔希', photo: 'glaucus.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  苇草: {
    codeName: '苇草', number: 'RI-4004-209', occupation: '先锋干员',
    origin: '维多利亚', recommender: '阿米娅', photo: 'weicao.png',
    status: 'missing', requiredSeal: '罗德岛人事部',
  },
  布洛卡: {
    codeName: '布洛卡', number: 'RI-4005-212', occupation: '近卫干员',
    origin: '叙拉古', recommender: '博士', photo: 'broca.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  惊蛰: {
    codeName: '惊蛰', number: 'RI-4006-215', occupation: '术师干员',
    origin: '炎', recommender: '杜宾', photo: 'jingzhe.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  折光: {
    codeName: '折光', number: 'RI-4007-218', occupation: '术师干员',
    origin: '莱塔尼亚', recommender: '闪灵', photo: 'zheguang.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  电弧: {
    codeName: '电弧', number: 'RI-4008-221', occupation: '辅助干员',
    origin: '乌萨斯', recommender: '银灰', photo: 'dianhu.png',
    status: 'revoked', requiredSeal: '罗德岛人事部',
  },
  夜刀: {
    codeName: '夜刀', number: 'RI-4009-224', occupation: '先锋干员',
    origin: '东国', recommender: '嘉维尔', photo: 'yadao.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  史尔特尔: {
    codeName: '史尔特尔', number: 'RI-4010-227', occupation: '近卫干员',
    origin: '不明', recommender: '芙蓉', photo: 'surtr.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
}
