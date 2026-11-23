/**
 * 用途：第 3 天候选池 —— 申请人（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：职业不符（申报说谎）。
 *       种族 / 出身 / 职业均来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY3_POOL_APPLICANTS。
 * 依赖：@/types
 */
import type { Applicant } from '@/types'

export const DAY3_POOL_APPLICANTS: Applicant[] = [
  {
    id: 'rope-d3p', codeName: '暗索', portrait: 'rope.png',
    race: '卡特斯', origin: '雷姆必拓', occupation: '特种干员',
    kind: 'operator', day: 3, slot: 0,
    intent: '返舰报到', recommender: '杜宾',
    dialogue: [
      { question: '代号', answer: '暗索，材料已核三遍，无误。' }, { question: '来意', answer: '外派结束，回舰复命。' },
      { question: '担保人', answer: '杜宾是我直属上级，她清楚。' },
    ],
    passportNumber: 'RI-3001-600', dossierNumber: 'RI-3001-100', photoMatch: true,
  },
  {
    id: 'deepcolor-d3p', codeName: '深海色', portrait: 'deepcolor.png',
    race: '未公开', origin: '未公开', occupation: '辅助干员',
    kind: 'operator', day: 3, slot: 1,
    intent: '返舰述职', recommender: '闪灵',
    dialogue: [
      { question: '代号', answer: '深海色，档案随你调阅。' }, { question: '来意', answer: '轮换期满，返舰述职。' },
      { question: '担保人', answer: '闪灵签的推荐表在本部。' },
    ],
    passportNumber: 'RI-3002-607', dossierNumber: 'RI-3002-107', photoMatch: true,
  },
  {
    id: 'mayer-d3p', codeName: '梅尔', portrait: 'mayer.png',
    race: '阿纳缇', origin: '哥伦比亚', occupation: '辅助干员',
    kind: 'operator', day: 3, slot: 2,
    intent: '返舰交接', recommender: '银灰',
    dialogue: [
      { question: '代号', answer: '梅尔，这行我干惯了。' }, { question: '来意', answer: '回来带新人，轻车熟路。' },
      { question: '担保人', answer: '银灰了解我的底细。' },
    ],
    passportNumber: 'RI-3003-114', dossierNumber: 'RI-3003-114', photoMatch: true,
  },
  {
    id: 'magallan-d3p', codeName: '麦哲伦', portrait: 'magallan.png',
    race: '黎博利', origin: '哥伦比亚', occupation: '辅助干员',
    kind: 'impostor', day: 3, slot: 3,
    intent: '归队报到', recommender: '嘉维尔',
    dialogue: [
      { question: '代号', answer: '麦哲伦。科考队的，你应该听说过我们那批。' }, { question: '来意', answer: '从外围考察点回来。舰上三号食堂还开着吗？我记得往左转。' },
      { question: '担保人', answer: '凯尔希主任签的。她一向支持我们科考队。' },
    ],
    passportNumber: 'RI-3004-121', dossierNumber: 'RI-3004-121', photoMatch: true,
    dialogueConflict: '自称担保人是凯尔希，与证件上的嘉维尔不符',
  },
  {
    id: 'ifrit-d3p', codeName: '伊芙利特', portrait: 'ifrit.png',
    race: '萨卡兹', origin: '未公开', occupation: '术师干员',
    kind: 'operator', day: 3, slot: 4,
    intent: '返舰休整', recommender: '芙蓉',
    dialogue: [
      { question: '代号', answer: '伊芙利特，证件齐了别磨蹭。' }, { question: '来意', answer: '赶着交接，快点办完。' },
      { question: '担保人', answer: '芙蓉开的函就在我手里。' },
    ],
    passportNumber: 'RI-3005-128', dossierNumber: 'RI-3005-128', photoMatch: true,
  },
  {
    id: 'eyjafjalla-d3p', codeName: '艾雅法拉', portrait: 'eyjafjalla.png',
    race: '卡普里尼', origin: '莱塔尼亚', occupation: '术师干员',
    kind: 'operator', day: 3, slot: 5,
    intent: '返舰报到', recommender: '临光',
    dialogue: [
      { question: '代号', answer: '我是艾雅法拉，别耽误时间。' }, { question: '来意', answer: '换防归舰，补个入境登记。' },
      { question: '担保人', answer: '临光替我担保，她在册。' },
    ],
    passportNumber: 'RI-3006-135', dossierNumber: 'RI-3006-135', photoMatch: true,
  },
  {
    id: 'skyfire-d3p', codeName: '天火', portrait: 'skyfire.png',
    race: '菲林', origin: '维多利亚', occupation: '术师干员',
    kind: 'operator', day: 3, slot: 6,
    intent: '返舰述职', recommender: '塞雷娅',
    dialogue: [
      { question: '代号', answer: '天火。查就查，我没在怕的。' }, { question: '来意', answer: '外勤刚撤回来，歇口气。' },
      { question: '担保人', answer: '塞雷娅已报备过我的事。' },
    ],
    passportNumber: 'RI-3007-142', dossierNumber: 'RI-3007-142', photoMatch: true,
  },
  {
    id: 'gitano-d3p', codeName: '远山', portrait: 'gitano.png',
    race: '埃拉菲亚', origin: '萨米', occupation: '狙击干员',
    kind: 'impostor', day: 3, slot: 7,
    intent: '归队报到', recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '远山。萨米来的，做术式研究。' }, { question: '来意', answer: '轮换期到了，回来办手续。' },
      { question: '担保人', answer: '凯尔希主任。呃……还是叫医生？反正就是她。' },
    ],
    passportNumber: 'RI-3008-149', dossierNumber: 'RI-3008-149', photoMatch: true,
  },
  {
    id: 'nightmare-d3p', codeName: '夜魔', portrait: 'nightmare.png',
    race: '菲林', origin: '维多利亚', occupation: '术师干员',
    kind: 'operator', day: 3, slot: 8,
    intent: '返舰补给', recommender: '阿米娅',
    dialogue: [
      { question: '代号', answer: '夜魔在此，还需要验证吗？' }, { question: '来意', answer: '前线轮替下来，休整几日。' },
      { question: '担保人', answer: '阿米娅亲自为我作保。' },
    ],
    passportNumber: 'RI-3009-156', dossierNumber: 'RI-3009-156', photoMatch: true,
  },
  {
    id: 'saria-d3p', codeName: '塞雷娅', portrait: 'saria.png',
    race: '瓦伊凡', origin: '哥伦比亚', occupation: '重装干员',
    kind: 'operator', day: 3, slot: 9,
    intent: '返舰休整', recommender: '博士',
    dialogue: [
      { question: '代号', answer: '塞雷娅。请按规定核查。' }, { question: '来意', answer: '任务结束，返回本部述职。' },
      { question: '担保人', answer: '博士已签署担保文件。' },
    ],
    passportNumber: 'RI-3010-163', dossierNumber: 'RI-3010-163', photoMatch: true,
  },
]
