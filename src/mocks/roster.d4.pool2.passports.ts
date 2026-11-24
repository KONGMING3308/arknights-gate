/**
 * 用途：第 4 天第二批候选池 —— 通行证（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：档案状态（查无此人 / 已注销）。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY4_POOL2_PASSPORTS。
 * 依赖：@/types
 */
import type { Passport } from '@/types'

export const DAY4_POOL2_PASSPORTS: Record<string, Passport> = {
  'luotuo-d4q': {
    number: 'RI-4001-200', holderName: '露托', photo: 'luotuo.png',
    issueDate: '1096-04-10', expiryDate: '1097-04-10',
    route: '玻利瓦尔 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'dageda-d4q': {
    number: 'RI-4002-203', holderName: '达格达', photo: 'dageda.png',
    issueDate: '1096-04-11', expiryDate: '1097-04-11',
    route: '维多利亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'glaucus-d4q': {
    number: 'RI-4003-206', holderName: '格劳克斯', photo: 'glaucus.png',
    issueDate: '1096-04-12', expiryDate: '1097-04-12',
    route: '阿戈尔地区 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'weicao-d4q': {
    number: 'RI-4004-209', holderName: '苇草', photo: 'weicao.png',
    issueDate: '1096-04-13', expiryDate: '1097-04-13',
    route: '维多利亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'broca-d4q': {
    number: 'RI-4005-212', holderName: '布洛卡', photo: 'broca.png',
    issueDate: '1096-04-14', expiryDate: '1097-04-14',
    route: '叙拉古 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'jingzhe-d4q': {
    number: 'RI-4006-215', holderName: '惊蛰', photo: 'jingzhe.png',
    issueDate: '1096-04-15', expiryDate: '1097-04-15',
    route: '炎 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'zheguang-d4q': {
    number: 'RI-4007-218', holderName: '折光', photo: 'zheguang.png',
    issueDate: '1096-04-16', expiryDate: '1097-04-16',
    route: '莱塔尼亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'dianhu-d4q': {
    number: 'RI-4008-221', holderName: '电弧', photo: 'dianhu.png',
    issueDate: '1096-04-17', expiryDate: '1097-04-17',
    route: '乌萨斯 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'yadao-d4q': {
    number: 'RI-4009-224', holderName: '夜刀', photo: 'yadao.png',
    issueDate: '1096-04-18', expiryDate: '1097-04-18',
    route: '东国 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'surtr-d4q': {
    number: 'RI-4010-227', holderName: '史尔特尔', photo: 'surtr.png',
    issueDate: '1096-04-10', expiryDate: '1097-04-10',
    route: '不明 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
}
