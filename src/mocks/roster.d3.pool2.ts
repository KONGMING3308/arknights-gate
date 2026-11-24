/**
 * 用途：第 3 天第二批候选池 —— 申请人（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：照片不符。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY3_POOL2_APPLICANTS。
 * 依赖：@/types
 */
import type { Applicant } from '@/types'

export const DAY3_POOL2_APPLICANTS: Applicant[] = [
  {
    id: 'chengshan-d3q', codeName: '澄闪', portrait: 'chengshan.png',
    race: '菲林', origin: '维多利亚', occupation: '术师干员',
    kind: 'operator', day: 3, slot: 0,
    intent: '返舰报到', recommender: '嘉维尔',
    dialogue: [
      { question: '代号', answer: '澄闪，金色的澄，闪光的闪，从维多利亚来的。' }, { question: '来意', answer: '外勤结束返舰报到，还给大家带了维多利亚的点心。' },
      { question: '担保人', answer: '嘉维尔亲自签的字，她说欢迎我回舰，错不了。' },
    ],
    passportNumber: 'RI-3001-200', dossierNumber: 'RI-3001-200', photoMatch: true,
  },
  {
    id: 'linglan-d3q', codeName: '铃兰', portrait: 'linglan.png',
    race: '沃尔珀', origin: '东国', occupation: '辅助干员',
    kind: 'operator', day: 3, slot: 1,
    intent: '返舰报到', recommender: '芙蓉',
    dialogue: [
      { question: '代号', answer: '铃兰……那个，我会努力不拖后腿的，请多关照！' }, { question: '来意', answer: '轮换回舰，这些是东国任务的材料，请您检查。' },
      { question: '担保人', answer: '担保人填的是芙蓉，手续都是她经手的。' },
    ],
    passportNumber: 'RI-3002-203', dossierNumber: 'RI-3002-203', photoMatch: true,
  },
  {
    id: 'taojinniang-d3q', codeName: '桃金娘', portrait: 'taojinniang.png',
    race: '杜林', origin: '未公开', occupation: '先锋干员',
    kind: 'operator', day: 3, slot: 2,
    intent: '返舰报到', recommender: '临光',
    dialogue: [
      { question: '代号', answer: '桃金娘！杜林族的战士，可别因为我矮就小看我！' }, { question: '来意', answer: '任务完成回来述职，我的小旗子都快磨破了。' },
      { question: '担保人', answer: '临光替我做的保。她答应的事从不反悔。' },
    ],
    passportNumber: 'RI-3003-206', dossierNumber: 'RI-3003-206', photoMatch: true,
  },
  {
    id: 'axiao-d3q', codeName: '阿消', portrait: 'axiao.png',
    race: '札拉克', origin: '龙门', occupation: '特种干员',
    kind: 'impostor', day: 3, slot: 3,
    intent: '归队报到', recommender: '塞雷娅',
    dialogue: [
      { question: '代号', answer: '阿、阿消……对，就是那个……负责灭火的阿消。' }, { question: '来意', answer: '呃，归队而已。龙门那边的火……都扑完了。' },
      { question: '担保人', answer: '担保人应该是芙蓉吧？对，医疗队的芙蓉，没错。' },
    ],
    passportNumber: 'RI-3004-209', dossierNumber: 'RI-3004-209', photoMatch: false,
  },
  {
    id: 'kada-d3q', codeName: '卡达', portrait: 'kada.png',
    race: '札拉克', origin: '未公开', occupation: '术师干员',
    kind: 'operator', day: 3, slot: 4,
    intent: '返舰报到', recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '卡达，罗德岛特聘摄像师，镜头就是我的武器！' }, { question: '来意', answer: '外勤收队回本部，素材拍满了，赶着回去剪片子。' },
      { question: '担保人', answer: '凯尔希担保我。她的名字在册上，一查就知道。' },
    ],
    passportNumber: 'RI-3005-212', dossierNumber: 'RI-3005-212', photoMatch: true,
  },
  {
    id: 'songguo-d3q', codeName: '松果', portrait: 'songguo.png',
    race: '黎博利', origin: '哥伦比亚', occupation: '狙击干员',
    kind: 'operator', day: 3, slot: 5,
    intent: '返舰报到', recommender: '阿米娅',
    dialogue: [
      { question: '代号', answer: '松果。以前在哥伦比亚的工地干活，力气活都行。' }, { question: '来意', answer: '返舰报到。宿舍床板要是松了，我顺手就能修。' },
      { question: '担保人', answer: '阿米娅小姐给我担保，她说我干活踏实。' },
    ],
    passportNumber: 'RI-3006-215', dossierNumber: 'RI-3006-215', photoMatch: true,
  },
  {
    id: 'xiyin-d3q', codeName: '稀音', portrait: 'xiyin.png',
    race: '皮洛萨', origin: '萨尔贡', occupation: '辅助干员',
    kind: 'operator', day: 3, slot: 6,
    intent: '返舰报到', recommender: '博士',
    dialogue: [
      { question: '代号', answer: '稀……音……请……慢慢听……我说……' }, { question: '来意', answer: '轮换……回舰……材料……都拍好了……' },
      { question: '担保人', answer: '博士……签的字……我确认过……' },
    ],
    passportNumber: 'RI-3007-218', dossierNumber: 'RI-3007-218', photoMatch: true,
  },
  {
    id: 'kuai-d3q', codeName: '苦艾', portrait: 'kuai.png',
    race: '乌萨斯', origin: '乌萨斯', occupation: '术师干员',
    kind: 'impostor', day: 3, slot: 7,
    intent: '归队报到', recommender: '杜宾',
    dialogue: [
      { question: '代号', answer: '苦艾……嗯，是这名字，档案上写着呢，应该没错。' }, { question: '来意', answer: '就……回来归队呗，乌萨斯人还能去哪。' },
      { question: '担保人', answer: '担保人？凯、凯尔希医生……对，是她，我没记错。' },
    ],
    passportNumber: 'RI-3008-221', dossierNumber: 'RI-3008-221', photoMatch: false,
  },
  {
    id: 'lainhard-d3q', codeName: '莱恩哈特', portrait: 'lainhard.png',
    race: '卡特斯', origin: '雷姆必拓', occupation: '术师干员',
    kind: 'operator', day: 3, slot: 8,
    intent: '返舰报到', recommender: '闪灵',
    dialogue: [
      { question: '代号', answer: '莱恩哈特！雷姆必拓来的，断崖是我老搭档。' }, { question: '来意', answer: '任务完成回来述职，报告我昨晚就写完了。' },
      { question: '担保人', answer: '闪灵担保我，不信你去问她，她可了解我了。' },
    ],
    passportNumber: 'RI-3009-224', dossierNumber: 'RI-3009-224', photoMatch: true,
  },
  {
    id: 'duanya-d3q', codeName: '断崖', portrait: 'duanya.png',
    race: '卡特斯', origin: '雷姆必拓', occupation: '近卫干员',
    kind: 'operator', day: 3, slot: 9,
    intent: '返舰报到', recommender: '银灰',
    dialogue: [
      { question: '代号', answer: '断崖。拿钱办事，就这么简单。' }, { question: '来意', answer: '外勤收队，回本部交差，别耽误我结算佣金。' },
      { question: '担保人', answer: '担保人是银灰。他信得过我，你也可以。' },
    ],
    passportNumber: 'RI-3010-227', dossierNumber: 'RI-3010-227', photoMatch: true,
  },
]
