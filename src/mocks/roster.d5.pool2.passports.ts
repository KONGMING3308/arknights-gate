/**
 * 用途：第 5 天第二批候选池 —— 通行证（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：多重破绽（编号+印章 / 照片+担保人）。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY5_POOL2_PASSPORTS。
 * 依赖：@/types
 */
import type { Passport } from '@/types'

export const DAY5_POOL2_PASSPORTS: Record<string, Passport> = {
  'cuoe-d5q': {
    number: 'RI-5001-200', holderName: '嵯峨', photo: 'cuoe.png',
    issueDate: '1096-05-10', expiryDate: '1097-05-10',
    route: '东国 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'hongzhun-d5q': {
    number: 'RI-5002-203', holderName: '红隼', photo: 'hongzhun.png',
    issueDate: '1096-05-11', expiryDate: '1097-05-11',
    route: '萨尔贡 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'shuangye-d5q': {
    number: 'RI-5003-206', holderName: '霜叶', photo: 'shuangye.png',
    issueDate: '1096-05-12', expiryDate: '1097-05-12',
    route: '哥伦比亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'estelle-d5q': {
    number: 'RI-5004-209', holderName: '艾丝黛尔', photo: 'estelle.png',
    issueDate: '1096-05-13', expiryDate: '1097-05-13',
    route: '未知地区 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛后勤部', sealId: 'wrong_dept',
  },
  'kafka-d5q': {
    number: 'RI-5005-212', holderName: '卡夫卡', photo: 'kafka.png',
    issueDate: '1096-05-14', expiryDate: '1097-05-14',
    route: '哥伦比亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'paopao-d5q': {
    number: 'RI-5006-215', holderName: '泡泡', photo: 'paopao.png',
    issueDate: '1096-05-15', expiryDate: '1097-05-15',
    route: '萨尔贡 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'heguo-d5q': {
    number: 'RI-5007-218', holderName: '褐果', photo: 'heguo.png',
    issueDate: '1096-05-16', expiryDate: '1097-05-16',
    route: '未知地区 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'yujinxiang-d5q': {
    number: 'RI-5008-221', holderName: '郁金香', photo: 'yujinxiang_glitch.png',
    issueDate: '1096-05-17', expiryDate: '1097-05-17',
    route: '伊比利亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'mila-d5q': {
    number: 'RI-5009-224', holderName: '蜜蜡', photo: 'mila.png',
    issueDate: '1096-05-18', expiryDate: '1097-05-18',
    route: '萨尔贡 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'weifeng-d5q': {
    number: 'RI-5010-227', holderName: '微风', photo: 'weifeng.png',
    issueDate: '1096-05-10', expiryDate: '1097-05-10',
    route: '维多利亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
}
