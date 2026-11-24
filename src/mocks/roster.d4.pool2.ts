/**
 * 用途：第 4 天第二批候选池 —— 申请人（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：档案状态（查无此人 / 已注销）。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY4_POOL2_APPLICANTS。
 * 依赖：@/types
 */
import type { Applicant } from '@/types'

export const DAY4_POOL2_APPLICANTS: Applicant[] = [
  {
    id: 'luotuo-d4q', codeName: '露托', portrait: 'luotuo.png',
    race: '札拉克', origin: '玻利瓦尔', occupation: '重装干员',
    kind: 'operator', day: 4, slot: 0,
    intent: '返舰报到', recommender: '临光',
    dialogue: [
      { question: '代号', answer: '露托。在玻利瓦尔当过兵，挡在最前面是我的活。' }, { question: '来意', answer: '返舰报到。有仗打就叫我，没仗我去训练室。' },
      { question: '担保人', answer: '临光给我作保，她看过我挡刀，说我靠谱。' },
    ],
    passportNumber: 'RI-4001-200', dossierNumber: 'RI-4001-200', photoMatch: true,
  },
  {
    id: 'dageda-d4q', codeName: '达格达', portrait: 'dageda.png',
    race: '菲林', origin: '维多利亚', occupation: '近卫干员',
    kind: 'operator', day: 4, slot: 1,
    intent: '返舰报到', recommender: '塞雷娅',
    dialogue: [
      { question: '代号', answer: '达格达。格拉斯哥帮出来的，拳头比嘴快。' }, { question: '来意', answer: '轮换回舰交材料，顺便看看有没有新任务。' },
      { question: '担保人', answer: '塞雷娅担保。她的名字在册，你可以查。' },
    ],
    passportNumber: 'RI-4002-203', dossierNumber: 'RI-4002-203', photoMatch: true,
  },
  {
    id: 'glaucus-d4q', codeName: '格劳克斯', portrait: 'glaucus.png',
    race: '未公开', origin: '阿戈尔地区', occupation: '辅助干员',
    kind: 'operator', day: 4, slot: 2,
    intent: '返舰报到', recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '格劳克斯。阿戈尔地区来的，机械方面可以找我。' }, { question: '来意', answer: '任务结束回来述职，设备数据都备份好了。' },
      { question: '担保人', answer: '凯尔希担保我，我的定期检查一直是她负责。' },
    ],
    passportNumber: 'RI-4003-206', dossierNumber: 'RI-4003-206', photoMatch: true,
  },
  {
    id: 'weicao-d4q', codeName: '苇草', portrait: 'weicao.png',
    race: '德拉克', origin: '维多利亚', occupation: '先锋干员',
    kind: 'impostor', day: 4, slot: 3,
    intent: '归队报到', recommender: '阿米娅',
    dialogue: [
      { question: '代号', answer: '苇草……对，苇草，草字头的那个……苇草。' }, { question: '来意', answer: '回来……归队嘛，维多利亚的事办完了，大概。' },
      { question: '担保人', answer: '担保人是芙蓉……吧？医疗干员，应该是她。' },
    ],
    passportNumber: 'RI-4004-209', dossierNumber: 'RI-4004-209', photoMatch: true,
  },
  {
    id: 'broca-d4q', codeName: '布洛卡', portrait: 'broca.png',
    race: '菲林', origin: '叙拉古', occupation: '近卫干员',
    kind: 'operator', day: 4, slot: 4,
    intent: '返舰报到', recommender: '博士',
    dialogue: [
      { question: '代号', answer: '布洛卡。叙拉古来的。话少，事多干。' }, { question: '来意', answer: '外勤收队回本部。报告很短，事都办完了。' },
      { question: '担保人', answer: '博士担保我。TA治过我的伤，我信TA。' },
    ],
    passportNumber: 'RI-4005-212', dossierNumber: 'RI-4005-212', photoMatch: true,
  },
  {
    id: 'jingzhe-d4q', codeName: '惊蛰', portrait: 'jingzhe.png',
    race: '麒麟', origin: '炎', occupation: '术师干员',
    kind: 'operator', day: 4, slot: 5,
    intent: '返舰报到', recommender: '杜宾',
    dialogue: [
      { question: '代号', answer: '惊蛰。炎国雷法正宗传人，可不是普通术师。' }, { question: '来意', answer: '返舰报到。炎国的事办妥了，还带了些点心回来。' },
      { question: '担保人', answer: '杜宾担保我。她的规矩，我守得起。' },
    ],
    passportNumber: 'RI-4006-215', dossierNumber: 'RI-4006-215', photoMatch: true,
  },
  {
    id: 'zheguang-d4q', codeName: '折光', portrait: 'zheguang.png',
    race: '卡普里尼', origin: '莱塔尼亚', occupation: '术师干员',
    kind: 'operator', day: 4, slot: 6,
    intent: '返舰报到', recommender: '闪灵',
    dialogue: [
      { question: '代号', answer: '折光。莱塔尼亚人，音乐和源石技艺都懂一点。' }, { question: '来意', answer: '轮换回舰交材料，写了一半的曲子总算能谱完。' },
      { question: '担保人', answer: '闪灵女士担保我。她的严谨，我很敬佩。' },
    ],
    passportNumber: 'RI-4007-218', dossierNumber: 'RI-4007-218', photoMatch: true,
  },
  {
    id: 'dianhu-d4q', codeName: '电弧', portrait: 'dianhu.png',
    race: '黎博利', origin: '乌萨斯', occupation: '辅助干员',
    kind: 'impostor', day: 4, slot: 7,
    intent: '归队报到', recommender: '银灰',
    dialogue: [
      { question: '代号', answer: '电弧……嗯，就是电弧，会放电的那个电弧。' }, { question: '来意', answer: '呃，归队。乌萨斯冷得要命，办完事就赶紧回了。' },
      { question: '担保人', answer: '担保人是凯尔希医生……我记得是她，大概。' },
    ],
    passportNumber: 'RI-4008-221', dossierNumber: 'RI-4008-221', photoMatch: true,
  },
  {
    id: 'yadao-d4q', codeName: '夜刀', portrait: 'yadao.png',
    race: '鬼', origin: '东国', occupation: '先锋干员',
    kind: 'operator', day: 4, slot: 8,
    intent: '返舰报到', recommender: '嘉维尔',
    dialogue: [
      { question: '代号', answer: '夜刀。罗德岛的老人了，这名字用了很多年。' }, { question: '来意', answer: '任务结束回来述职。队里的新人有几个好苗子。' },
      { question: '担保人', answer: '嘉维尔给我担保。她的名字在册上，查得到。' },
    ],
    passportNumber: 'RI-4009-224', dossierNumber: 'RI-4009-224', photoMatch: true,
  },
  {
    id: 'surtr-d4q', codeName: '史尔特尔', portrait: 'surtr.png',
    race: '萨卡兹', origin: '不明', occupation: '近卫干员',
    kind: 'operator', day: 4, slot: 9,
    intent: '返舰报到', recommender: '芙蓉',
    dialogue: [
      { question: '代号', answer: '史尔特尔。别的记不清，名字总不会错。' }, { question: '来意', answer: '外勤收队回本部。有冰淇淋的话，麻烦快点办。' },
      { question: '担保人', answer: '芙蓉担保我。她说罗德岛值得留，我就留下了。' },
    ],
    passportNumber: 'RI-4010-227', dossierNumber: 'RI-4010-227', photoMatch: true,
  },
]
