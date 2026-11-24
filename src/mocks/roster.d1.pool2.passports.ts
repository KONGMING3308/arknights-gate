/**
 * 用途：第 1 天第二批候选池 —— 通行证（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：印章（仿真假章 / 完全错误机构）。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY1_POOL2_PASSPORTS。
 * 依赖：@/types
 */
import type { Passport } from '@/types'

export const DAY1_POOL2_PASSPORTS: Record<string, Passport> = {
  'op_w-d1q': {
    number: 'RI-1001-200', holderName: 'W', photo: 'op_w.png',
    issueDate: '1096-01-10', expiryDate: '1097-01-10',
    route: '卡兹戴尔 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'niyan-d1q': {
    number: 'RI-1002-203', holderName: '泥岩', photo: 'niyan.png',
    issueDate: '1096-01-11', expiryDate: '1097-01-11',
    route: '卡兹戴尔 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'wendi-d1q': {
    number: 'RI-1003-206', holderName: '温蒂', photo: 'wendi.png',
    issueDate: '1096-01-12', expiryDate: '1097-01-12',
    route: '伊比利亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'helage-d1q': {
    number: 'RI-1004-209', holderName: '赫拉格', photo: 'helage.png',
    issueDate: '1096-01-13', expiryDate: '1097-01-13',
    route: '乌萨斯 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部（形制不符）', sealId: 'fake',
  },
  'senran-d1q': {
    number: 'RI-1005-212', holderName: '森蚺', photo: 'senran.png',
    issueDate: '1096-01-14', expiryDate: '1097-01-14',
    route: '萨尔贡 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'kuiying-d1q': {
    number: 'RI-1006-215', holderName: '傀影', photo: 'kuiying.png',
    issueDate: '1096-01-15', expiryDate: '1097-01-15',
    route: '维多利亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'baitie-d1q': {
    number: 'RI-1007-218', holderName: '白铁', photo: 'baitie.png',
    issueDate: '1096-01-16', expiryDate: '1097-01-16',
    route: '维多利亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'shuiyue-d1q': {
    number: 'RI-1008-221', holderName: '水月', photo: 'shuiyue.png',
    issueDate: '1096-01-17', expiryDate: '1097-01-17',
    route: '东国 → 罗德岛本舰',
    stampType: 'clear', sealText: '其他机构', sealId: 'foreign',
  },
  'ling-d1q': {
    number: 'RI-1009-224', holderName: '令', photo: 'ling.png',
    issueDate: '1096-01-18', expiryDate: '1097-01-18',
    route: '炎 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'xi-d1q': {
    number: 'RI-1010-227', holderName: '夕', photo: 'xi.png',
    issueDate: '1096-01-10', expiryDate: '1097-01-10',
    route: '炎 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
}
