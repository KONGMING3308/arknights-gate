/**
 * 用途：第 3 天第二批候选池 —— 通行证（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：照片不符。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY3_POOL2_PASSPORTS。
 * 依赖：@/types
 */
import type { Passport } from '@/types'

export const DAY3_POOL2_PASSPORTS: Record<string, Passport> = {
  'chengshan-d3q': {
    number: 'RI-3001-200', holderName: '澄闪', photo: 'chengshan.png',
    issueDate: '1096-03-10', expiryDate: '1097-03-10',
    route: '维多利亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'linglan-d3q': {
    number: 'RI-3002-203', holderName: '铃兰', photo: 'linglan.png',
    issueDate: '1096-03-11', expiryDate: '1097-03-11',
    route: '东国 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'taojinniang-d3q': {
    number: 'RI-3003-206', holderName: '桃金娘', photo: 'taojinniang.png',
    issueDate: '1096-03-12', expiryDate: '1097-03-12',
    route: '未知地区 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'axiao-d3q': {
    number: 'RI-3004-209', holderName: '阿消', photo: 'axiao_glitch.png',
    issueDate: '1096-03-13', expiryDate: '1097-03-13',
    route: '龙门 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'kada-d3q': {
    number: 'RI-3005-212', holderName: '卡达', photo: 'kada.png',
    issueDate: '1096-03-14', expiryDate: '1097-03-14',
    route: '未知地区 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'songguo-d3q': {
    number: 'RI-3006-215', holderName: '松果', photo: 'songguo.png',
    issueDate: '1096-03-15', expiryDate: '1097-03-15',
    route: '哥伦比亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'xiyin-d3q': {
    number: 'RI-3007-218', holderName: '稀音', photo: 'xiyin.png',
    issueDate: '1096-03-16', expiryDate: '1097-03-16',
    route: '萨尔贡 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'kuai-d3q': {
    number: 'RI-3008-221', holderName: '苦艾', photo: 'kuai_glitch.png',
    issueDate: '1096-03-17', expiryDate: '1097-03-17',
    route: '乌萨斯 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'lainhard-d3q': {
    number: 'RI-3009-224', holderName: '莱恩哈特', photo: 'lainhard.png',
    issueDate: '1096-03-18', expiryDate: '1097-03-18',
    route: '雷姆必拓 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'duanya-d3q': {
    number: 'RI-3010-227', holderName: '断崖', photo: 'duanya.png',
    issueDate: '1096-03-10', expiryDate: '1097-03-10',
    route: '雷姆必拓 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
}
