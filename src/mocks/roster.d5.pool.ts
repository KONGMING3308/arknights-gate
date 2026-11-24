/**
 * 用途：第 5 天候选池 —— 申请人（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：多重破绽。
 *       种族 / 出身 / 职业均来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY5_POOL_APPLICANTS。
 * 依赖：@/types
 */
import type { Applicant } from '@/types'

export const DAY5_POOL_APPLICANTS: Applicant[] = [
  {
    id: 'greyy-d5p', codeName: '灰喉', portrait: 'greyy.png',
    race: '黎博利', origin: '未公开', occupation: '狙击干员',
    kind: 'operator', day: 5, slot: 0,
    intent: '返舰报到', recommender: '塞雷娅',
    dialogue: [
      { question: '代号', answer: '灰喉，材料齐了，你过目便是。' }, { question: '来意', answer: '最后一趟外派结束，往后不走了。' },
      { question: '担保人', answer: '塞雷娅签的字，她比谁都清楚我。' },
    ],
    passportNumber: 'RI-5001-100', dossierNumber: 'RI-5001-100', photoMatch: true,
  },
  {
    id: 'ambriel-d5p', codeName: '安比尔', portrait: 'ambriel.png',
    race: '萨科塔', origin: '拉特兰', occupation: '狙击干员',
    kind: 'operator', day: 5, slot: 1,
    intent: '返舰述职', recommender: '嘉维尔',
    dialogue: [
      { question: '代号', answer: '安比尔。流程烦人，但我照办。' }, { question: '来意', answer: '轮换返舰，报告在桌上自己看。' },
      { question: '担保人', answer: '嘉维尔推荐的，人在本部可查。' },
    ],
    passportNumber: 'RI-5002-107', dossierNumber: 'RI-5002-107', photoMatch: true,
  },
  {
    id: 'aosta-d5p', codeName: '奥斯塔', portrait: 'aosta.png',
    race: '鲁珀', origin: '叙拉古', occupation: '狙击干员',
    kind: 'operator', day: 5, slot: 2,
    intent: '返舰交接', recommender: '芙蓉',
    dialogue: [
      { question: '代号', answer: '奥斯塔。证件干净，挑不出毛病。' }, { question: '来意', answer: '任务收了尾，回来述职交差。' },
      { question: '担保人', answer: '芙蓉亲手签的名，不信问她。' },
    ],
    passportNumber: 'RI-5003-114', dossierNumber: 'RI-5003-114', photoMatch: true,
  },
  {
    id: 'whislash-d5p', codeName: '鞭刃', portrait: 'whislash.png',
    race: '库兰塔', origin: '卡西米尔', occupation: '近卫干员',
    kind: 'impostor', day: 5, slot: 3,
    intent: '归队报到', recommender: '临光',
    dialogue: [
      { question: '代号', answer: '鞭刃！哎呀，审查官辛苦了，天天看材料也不容易吧？' }, { question: '来意', answer: '归队报到，顺便给你们带了两盒点心，路上买的。' },
      { question: '担保人', answer: '临光。她人可好了，一口就答应了。' },
    ],
    passportNumber: 'RI-5004-121', dossierNumber: 'RI-5004-903', photoMatch: false,
  },
  {
    id: 'blemishine-d5p', codeName: '瑕光', portrait: 'blemishine.png',
    race: '库兰塔', origin: '卡西米尔', occupation: '重装干员',
    kind: 'operator', day: 5, slot: 4,
    intent: '返舰休整', recommender: '塞雷娅',
    dialogue: [
      { question: '代号', answer: '瑕光。怎么，我像可疑人物吗？' }, { question: '来意', answer: '补给完明天就走，不多待一刻。' },
      { question: '担保人', answer: '塞雷娅在册担保，尽管去核实。' },
    ],
    passportNumber: 'RI-5005-128', dossierNumber: 'RI-5005-128', photoMatch: true,
  },
  {
    id: 'asbestos-d5p', codeName: '石棉', portrait: 'asbestos.png',
    race: '萨弗拉', origin: '雷姆必拓', occupation: '重装干员',
    kind: 'operator', day: 5, slot: 5,
    intent: '返舰报到', recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '石棉，重装干员，证件你核对。' }, { question: '来意', answer: '外勤撤回来了，交个任务报告。' },
      { question: '担保人', answer: '凯尔希医生签的字，她知情。' },
    ],
    passportNumber: 'RI-5006-135', dossierNumber: 'RI-5006-135', photoMatch: true,
  },
  {
    id: 'elysium-d5p', codeName: '极境', portrait: 'elysium.png',
    race: '黎博利', origin: '伊比利亚', occupation: '先锋干员',
    kind: 'operator', day: 5, slot: 6,
    intent: '返舰述职', recommender: '阿米娅',
    dialogue: [
      { question: '代号', answer: '极境！先锋报到，别板着脸嘛。' }, { question: '来意', answer: '调令到手了，赶紧办完上岗。' },
      { question: '担保人', answer: '阿米娅亲自批的，她最了解我。' },
    ],
    passportNumber: 'RI-5007-142', dossierNumber: 'RI-5007-142', photoMatch: true,
  },
  {
    id: 'rosa-d5p', codeName: '早露', portrait: 'rosa.png',
    race: '乌萨斯', origin: '乌萨斯', occupation: '狙击干员',
    kind: 'impostor', day: 5, slot: 7,
    intent: '归队报到', recommender: '艾尔文',
    dialogue: [
      { question: '代号', answer: '早露。名字在第二页，你自己看吧。' }, { question: '来意', answer: '回来报到。别的不方便多说。' },
      { question: '担保人', answer: '艾尔文……他前阵子还在舰上的，你查查看？' },
    ],
    passportNumber: 'RI-5008-149', dossierNumber: 'RI-5008-149', photoMatch: true,
  },
  {
    id: 'thorns-d5p', codeName: '棘刺', portrait: 'thorns.png',
    race: '阿戈尔', origin: '伊比利亚', occupation: '近卫干员',
    kind: 'operator', day: 5, slot: 8,
    intent: '返舰补给', recommender: '杜宾',
    dialogue: [
      { question: '代号', answer: '棘刺。近卫，资料已备齐。' }, { question: '来意', answer: '任务结束，回舰休整待命。' },
      { question: '担保人', answer: '杜宾教官确认过，签字无误。' },
    ],
    passportNumber: 'RI-5009-156', dossierNumber: 'RI-5009-156', photoMatch: true,
  },
  {
    id: 'grani-d5p', codeName: '格拉尼', portrait: 'grani.png',
    race: '库兰塔', origin: '维多利亚', occupation: '先锋干员',
    kind: 'operator', day: 5, slot: 9,
    intent: '返舰休整', recommender: '闪灵',
    dialogue: [
      { question: '代号', answer: '格拉尼，按流程审查就好。' }, { question: '来意', answer: '轮换期到了，补全入境手续。' },
      { question: '担保人', answer: '闪灵女士担保，本部有备案。' },
    ],
    passportNumber: 'RI-5010-163', dossierNumber: 'RI-5010-163', photoMatch: true,
  },
]
