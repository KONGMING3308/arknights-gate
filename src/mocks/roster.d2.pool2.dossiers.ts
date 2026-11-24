/**
 * 用途：第 2 天第二批候选池 —— 档案（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：编号不符。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY2_POOL2_DOSSIERS。
 * 依赖：@/types
 */
import type { Dossier } from '@/types'

export const DAY2_POOL2_DOSSIERS: Record<string, Dossier> = {
  重岳: {
    codeName: '重岳', number: 'RI-2001-200', occupation: '近卫干员',
    origin: '炎', recommender: '闪灵', photo: 'chongyue.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  年: {
    codeName: '年', number: 'RI-2002-203', occupation: '重装干员',
    origin: '炎', recommender: '银灰', photo: 'nian.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  炎客: {
    codeName: '炎客', number: 'RI-2003-206', occupation: '近卫干员',
    origin: '卡兹戴尔', recommender: '嘉维尔', photo: 'yanke.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  阿: {
    codeName: '阿', number: 'RI-2004-803', occupation: '特种干员',
    origin: '龙门', recommender: '芙蓉', photo: 'a.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  吽: {
    codeName: '吽', number: 'RI-2005-212', occupation: '重装干员',
    origin: '龙门', recommender: '临光', photo: 'hou.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  刻俄柏: {
    codeName: '刻俄柏', number: 'RI-2006-215', occupation: '术师干员',
    origin: '玻利瓦尔', recommender: '塞雷娅', photo: 'keebo.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  菲亚梅塔: {
    codeName: '菲亚梅塔', number: 'RI-2007-218', occupation: '狙击干员',
    origin: '拉特兰', recommender: '凯尔希', photo: 'fiammetta.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  艾丽妮: {
    codeName: '艾丽妮', number: 'RI-2008-807', occupation: '近卫干员',
    origin: '伊比利亚', recommender: '阿米娅', photo: 'irene.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  鸿雪: {
    codeName: '鸿雪', number: 'RI-2009-224', occupation: '狙击干员',
    origin: '乌萨斯', recommender: '博士', photo: 'hongxue.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
  迷迭香: {
    codeName: '迷迭香', number: 'RI-2010-227', occupation: '狙击干员',
    origin: '哥伦比亚', recommender: '杜宾', photo: 'midiexiang.png',
    status: 'active', requiredSeal: '罗德岛人事部',
  },
}
