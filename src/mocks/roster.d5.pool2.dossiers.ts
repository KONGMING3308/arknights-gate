/**
 * 用途：第 5 天第二批候选池 —— 档案（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：多重破绽（编号+印章 / 照片+担保人）。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY5_POOL2_DOSSIERS。
 * 依赖：@/types
 */
import type { Dossier } from '@/types'

export const DAY5_POOL2_DOSSIERS: Record<string, Dossier> = {
  嵯峨: {
    codeName: '嵯峨', number: 'RI-5001-200', occupation: '先锋干员',
    origin: '东国', recommender: '凯尔希', photo: 'cuoe.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  红隼: {
    codeName: '红隼', number: 'RI-5002-203', occupation: '先锋干员',
    origin: '萨尔贡', recommender: '阿米娅', photo: 'hongzhun.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  霜叶: {
    codeName: '霜叶', number: 'RI-5003-206', occupation: '近卫干员',
    origin: '哥伦比亚', recommender: '博士', photo: 'shuangye.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  艾丝黛尔: {
    codeName: '艾丝黛尔', number: 'RI-5004-803', occupation: '近卫干员',
    origin: '未公开', recommender: '杜宾', photo: 'estelle.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  卡夫卡: {
    codeName: '卡夫卡', number: 'RI-5005-212', occupation: '特种干员',
    origin: '哥伦比亚', recommender: '闪灵', photo: 'kafka.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  泡泡: {
    codeName: '泡泡', number: 'RI-5006-215', occupation: '重装干员',
    origin: '萨尔贡', recommender: '银灰', photo: 'paopao.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  褐果: {
    codeName: '褐果', number: 'RI-5007-218', occupation: '医疗干员',
    origin: '未公开', recommender: '嘉维尔', photo: 'heguo.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  郁金香: {
    codeName: '郁金香', number: 'RI-5008-221', occupation: '先锋干员',
    origin: '伊比利亚', recommender: '艾尔文', photo: 'yujinxiang.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  蜜蜡: {
    codeName: '蜜蜡', number: 'RI-5009-224', occupation: '术师干员',
    origin: '萨尔贡', recommender: '临光', photo: 'mila.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  微风: {
    codeName: '微风', number: 'RI-5010-227', occupation: '医疗干员',
    origin: '维多利亚', recommender: '塞雷娅', photo: 'weifeng.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
}
