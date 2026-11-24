/**
 * 用途：第 2 天第二批候选池 —— 通行证（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：编号不符。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY2_POOL2_PASSPORTS。
 * 依赖：@/types
 */
import type { Passport } from '@/types'

export const DAY2_POOL2_PASSPORTS: Record<string, Passport> = {
  'chongyue-d2q': {
    number: 'RI-2001-200', holderName: '重岳', photo: 'chongyue.png',
    issueDate: '1096-02-10', expiryDate: '1097-02-10',
    route: '炎 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'nian-d2q': {
    number: 'RI-2002-203', holderName: '年', photo: 'nian.png',
    issueDate: '1096-02-11', expiryDate: '1097-02-11',
    route: '炎 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'yanke-d2q': {
    number: 'RI-2003-206', holderName: '炎客', photo: 'yanke.png',
    issueDate: '1096-02-12', expiryDate: '1097-02-12',
    route: '卡兹戴尔 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'a-d2q': {
    number: 'RI-2004-209', holderName: '阿', photo: 'a.png',
    issueDate: '1096-02-13', expiryDate: '1097-02-13',
    route: '龙门 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'hou-d2q': {
    number: 'RI-2005-212', holderName: '吽', photo: 'hou.png',
    issueDate: '1096-02-14', expiryDate: '1097-02-14',
    route: '龙门 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'keebo-d2q': {
    number: 'RI-2006-215', holderName: '刻俄柏', photo: 'keebo.png',
    issueDate: '1096-02-15', expiryDate: '1097-02-15',
    route: '玻利瓦尔 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'fiammetta-d2q': {
    number: 'RI-2007-218', holderName: '菲亚梅塔', photo: 'fiammetta.png',
    issueDate: '1096-02-16', expiryDate: '1097-02-16',
    route: '拉特兰 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'irene-d2q': {
    number: 'RI-2008-221', holderName: '艾丽妮', photo: 'irene.png',
    issueDate: '1096-02-17', expiryDate: '1097-02-17',
    route: '伊比利亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'hongxue-d2q': {
    number: 'RI-2009-224', holderName: '鸿雪', photo: 'hongxue.png',
    issueDate: '1096-02-18', expiryDate: '1097-02-18',
    route: '乌萨斯 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
  'midiexiang-d2q': {
    number: 'RI-2010-227', holderName: '迷迭香', photo: 'midiexiang.png',
    issueDate: '1096-02-10', expiryDate: '1097-02-10',
    route: '哥伦比亚 → 罗德岛本舰',
    stampType: 'clear', sealText: '罗德岛人事部', sealId: 'standard',
  },
}
