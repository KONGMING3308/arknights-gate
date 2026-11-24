/**
 * 用途：第 5 天第二批候选池 —— 申请人（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：多重破绽（编号+印章 / 照片+担保人）。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY5_POOL2_APPLICANTS。
 * 依赖：@/types
 */
import type { Applicant } from '@/types'

export const DAY5_POOL2_APPLICANTS: Applicant[] = [
  {
    id: 'cuoe-d5q', codeName: '嵯峨', portrait: 'cuoe.png',
    race: '佩洛', origin: '东国', occupation: '先锋干员',
    kind: 'operator', day: 5, slot: 0,
    intent: '返舰报到', recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '在下嵯峨，请多指教。' }, { question: '来意', answer: '在外云游历练已毕，今日返舰，向各位问安。' },
      { question: '担保人', answer: '凯尔希为我作保，初登舰时承蒙她照拂至今。' },
    ],
    passportNumber: 'RI-5001-200', dossierNumber: 'RI-5001-200', photoMatch: true,
  },
  {
    id: 'hongzhun-d5q', codeName: '红隼', portrait: 'hongzhun.png',
    race: '黎博利', origin: '萨尔贡', occupation: '先锋干员',
    kind: 'operator', day: 5, slot: 1,
    intent: '返舰报到', recommender: '阿米娅',
    dialogue: [
      { question: '代号', answer: '红隼，念一遍就该记住了吧。' }, { question: '来意', answer: '轮换回舰，材料备齐了，请按流程查验。' },
      { question: '担保人', answer: '阿米娅担保。她亲自过问过我这次轮换。' },
    ],
    passportNumber: 'RI-5002-203', dossierNumber: 'RI-5002-203', photoMatch: true,
  },
  {
    id: 'shuangye-d5q', codeName: '霜叶', portrait: 'shuangye.png',
    race: '沃尔珀', origin: '哥伦比亚', occupation: '近卫干员',
    kind: 'operator', day: 5, slot: 2,
    intent: '返舰报到', recommender: '博士',
    dialogue: [
      { question: '代号', answer: '霜叶，怎么，长耳朵很稀奇吗？' }, { question: '来意', answer: '任务收尾，回来述职，报告我早写好了。' },
      { question: '担保人', answer: '博士前辈作保，疗养舱那阵子多亏TA照看。' },
    ],
    passportNumber: 'RI-5003-206', dossierNumber: 'RI-5003-206', photoMatch: true,
  },
  {
    id: 'estelle-d5q', codeName: '艾丝黛尔', portrait: 'estelle.png',
    race: '阿达克利斯', origin: '未公开', occupation: '近卫干员',
    kind: 'impostor', day: 5, slot: 3,
    intent: '归队报到', recommender: '杜宾',
    dialogue: [
      { question: '代号', answer: '我……是叫艾丝黛尔对吧？' }, { question: '来意', answer: '呃，就是归队而已，别问那么细行吗？' },
      { question: '担保人', answer: '芙蓉……医疗部应该有这个人吧，嗯，有。' },
    ],
    passportNumber: 'RI-5004-209', dossierNumber: 'RI-5004-803', photoMatch: true,
  },
  {
    id: 'kafka-d5q', codeName: '卡夫卡', portrait: 'kafka.png',
    race: '黎博利', origin: '哥伦比亚', occupation: '特种干员',
    kind: 'operator', day: 5, slot: 4,
    intent: '返舰报到', recommender: '闪灵',
    dialogue: [
      { question: '代号', answer: '卡夫卡，今晚牌桌记得给我留位。' }, { question: '来意', answer: '外勤收队，回本部，战利品回头分你点。' },
      { question: '担保人', answer: '闪灵医师作保，上次赛跑我只输她半步。' },
    ],
    passportNumber: 'RI-5005-212', dossierNumber: 'RI-5005-212', photoMatch: true,
  },
  {
    id: 'paopao-d5q', codeName: '泡泡', portrait: 'paopao.png',
    race: '塞拉托', origin: '萨尔贡', occupation: '重装干员',
    kind: 'operator', day: 5, slot: 5,
    intent: '返舰报到', recommender: '银灰',
    dialogue: [
      { question: '代号', answer: '泡泡，不许盯着我头上的角看啦。' }, { question: '来意', answer: '返舰报到，工地那摊活儿总算交差了。' },
      { question: '担保人', answer: '银灰担保的。他说过会认这笔账。' },
    ],
    passportNumber: 'RI-5006-215', dossierNumber: 'RI-5006-215', photoMatch: true,
  },
  {
    id: 'heguo-d5q', codeName: '褐果', portrait: 'heguo.png',
    race: '杜林', origin: '未公开', occupation: '医疗干员',
    kind: 'operator', day: 5, slot: 6,
    intent: '返舰报到', recommender: '嘉维尔',
    dialogue: [
      { question: '代号', answer: '褐果，姓名条目都写在这里了，请核对。' }, { question: '来意', answer: '轮换回舰，交接材料在包里，我这就取。' },
      { question: '担保人', answer: '嘉维尔女士担保，手续齐全，随时可查。' },
    ],
    passportNumber: 'RI-5007-218', dossierNumber: 'RI-5007-218', photoMatch: true,
  },
  {
    id: 'yujinxiang-d5q', codeName: '郁金香', portrait: 'yujinxiang.png',
    race: '斐迪亚', origin: '伊比利亚', occupation: '先锋干员',
    kind: 'impostor', day: 5, slot: 7,
    intent: '归队报到', recommender: '艾尔文',
    dialogue: [
      { question: '代号', answer: '郁金香……表上是这么写的。' }, { question: '来意', answer: '呃，归队，别的你翻档案吧。' },
      { question: '担保人', answer: '担保人叫艾尔文……大概在舰上吧，我没见过。' },
    ],
    passportNumber: 'RI-5008-221', dossierNumber: 'RI-5008-221', photoMatch: false,
  },
  {
    id: 'mila-d5q', codeName: '蜜蜡', portrait: 'mila.png',
    race: '卡普里尼', origin: '萨尔贡', occupation: '术师干员',
    kind: 'operator', day: 5, slot: 8,
    intent: '返舰报到', recommender: '临光',
    dialogue: [
      { question: '代号', answer: '蜜蜡，如假包换。' }, { question: '来意', answer: '任务结束，回来述职，恳请放行。' },
      { question: '担保人', answer: '临光小姐担保，罗德岛的规程我早已读熟。' },
    ],
    passportNumber: 'RI-5009-224', dossierNumber: 'RI-5009-224', photoMatch: true,
  },
  {
    id: 'weifeng-d5q', codeName: '微风', portrait: 'weifeng.png',
    race: '沃尔珀', origin: '维多利亚', occupation: '医疗干员',
    kind: 'operator', day: 5, slot: 9,
    intent: '返舰报到', recommender: '塞雷娅',
    dialogue: [
      { question: '代号', answer: '微风，风和日丽的那个风。' }, { question: '来意', answer: '外勤收队，回本部，药箱请轻拿轻放。' },
      { question: '担保人', answer: '塞雷娅担保我。她的签名在推荐函末尾。' },
    ],
    passportNumber: 'RI-5010-227', dossierNumber: 'RI-5010-227', photoMatch: true,
  },
]
