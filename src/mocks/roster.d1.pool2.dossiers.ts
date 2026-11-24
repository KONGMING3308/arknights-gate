/**
 * 用途：第 1 天第二批候选池 —— 档案（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：印章（仿真假章 / 完全错误机构）。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY1_POOL2_DOSSIERS。
 * 依赖：@/types
 */
import type { Dossier } from '@/types'

export const DAY1_POOL2_DOSSIERS: Record<string, Dossier> = {
  W: {
    codeName: 'W', number: 'RI-1001-200', occupation: '狙击干员',
    origin: '卡兹戴尔', recommender: '博士', photo: 'op_w.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  泥岩: {
    codeName: '泥岩', number: 'RI-1002-203', occupation: '重装干员',
    origin: '卡兹戴尔', recommender: '杜宾', photo: 'niyan.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  温蒂: {
    codeName: '温蒂', number: 'RI-1003-206', occupation: '特种干员',
    origin: '伊比利亚', recommender: '闪灵', photo: 'wendi.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  赫拉格: {
    codeName: '赫拉格', number: 'RI-1004-209', occupation: '近卫干员',
    origin: '乌萨斯', recommender: '银灰', photo: 'helage.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  森蚺: {
    codeName: '森蚺', number: 'RI-1005-212', occupation: '重装干员',
    origin: '萨尔贡', recommender: '嘉维尔', photo: 'senran.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  傀影: {
    codeName: '傀影', number: 'RI-1006-215', occupation: '特种干员',
    origin: '维多利亚', recommender: '芙蓉', photo: 'kuiying.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  白铁: {
    codeName: '白铁', number: 'RI-1007-218', occupation: '辅助干员',
    origin: '维多利亚', recommender: '临光', photo: 'baitie.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  水月: {
    codeName: '水月', number: 'RI-1008-221', occupation: '特种干员',
    origin: '东国', recommender: '塞雷娅', photo: 'shuiyue.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  令: {
    codeName: '令', number: 'RI-1009-224', occupation: '辅助干员',
    origin: '炎', recommender: '凯尔希', photo: 'ling.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  夕: {
    codeName: '夕', number: 'RI-1010-227', occupation: '术师干员',
    origin: '炎', recommender: '阿米娅', photo: 'xi.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
}
