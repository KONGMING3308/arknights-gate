/**
 * 用途：第 4 天候选池 —— 申请人（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：档案状态（查无此人 / 已注销）。
 *       种族 / 出身 / 职业均来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY4_POOL_APPLICANTS。
 * 依赖：@/types
 */
import type { Applicant } from '@/types'

export const DAY4_POOL_APPLICANTS: Applicant[] = [
  {
    id: 'astesia-d4p', codeName: '星极', portrait: 'astesia.png',
    race: '黎博利', origin: '哥伦比亚', occupation: '近卫干员',
    kind: 'operator', day: 4, slot: 0,
    intent: '返舰报到', recommender: '闪灵',
    dialogue: [
      { question: '代号', answer: '星极，材料都在桌上，您慢慢核对。' }, { question: '来意', answer: '外派太久，回来把手续补全。' },
      { question: '担保人', answer: '闪灵是我老上级，她清楚我的底细。' },
    ],
    passportNumber: 'RI-4001-600', dossierNumber: 'RI-4001-100', photoMatch: true,
  },
  {
    id: 'swire-d4p', codeName: '诗怀雅', portrait: 'swire.png',
    race: '菲林', origin: '龙门', occupation: '近卫干员',
    kind: 'operator', day: 4, slot: 1,
    intent: '返舰述职', recommender: '银灰',
    dialogue: [
      { question: '代号', answer: '诗怀雅，证件函件一样不少。' }, { question: '来意', answer: '轮换返舰，交完材料就走。' },
      { question: '担保人', answer: '推荐人是银灰，本舰在册可查。' },
    ],
    passportNumber: 'RI-4002-607', dossierNumber: 'RI-4002-107', photoMatch: true,
  },
  {
    id: 'meteorite-d4p', codeName: '陨星', portrait: 'meteorite.png',
    race: '萨卡兹', origin: '卡兹戴尔', occupation: '狙击干员',
    kind: 'operator', day: 4, slot: 2,
    intent: '返舰交接', recommender: '嘉维尔',
    dialogue: [
      { question: '代号', answer: '陨星，本人站在这儿，无需多言。' }, { question: '来意', answer: '任务结束，回舰述职报备。' },
      { question: '担保人', answer: '嘉维尔替我担保，她最了解情况。' },
    ],
    passportNumber: 'RI-4003-114', dossierNumber: 'RI-4003-114', photoMatch: true,
  },
  {
    id: 'shirayuki-d4p', codeName: '白雪', portrait: 'shirayuki.png',
    race: '阿纳缇', origin: '东国', occupation: '狙击干员',
    kind: 'impostor', day: 4, slot: 3,
    intent: '归队报到', recommender: '芙蓉',
    dialogue: [
      { question: '代号', answer: '白雪。快点吧，后面还有人排队呢。' }, { question: '来意', answer: '归队。没什么特别的，就是归队。' },
      { question: '担保人', answer: '嘉维尔。她在医疗部，你去问她就是了。' },
    ],
    passportNumber: 'RI-4004-121', dossierNumber: 'RI-4004-121', photoMatch: true,
    dialogueConflict: '自称担保人是嘉维尔，与证件上的芙蓉不符',
  },
  {
    id: 'adnachiel-d4p', codeName: '安德切尔', portrait: 'adnachiel.png',
    race: '萨科塔', origin: '拉特兰', occupation: '狙击干员',
    kind: 'operator', day: 4, slot: 4,
    intent: '返舰休整', recommender: '临光',
    dialogue: [
      { question: '代号', answer: '安德切尔，您看材料，我看着您。' }, { question: '来意', answer: '补给三天，之后又要出发。' },
      { question: '担保人', answer: '临光已在册，您一查便知。' },
    ],
    passportNumber: 'RI-4005-128', dossierNumber: 'RI-4005-128', photoMatch: true,
  },
  {
    id: 'steward-d4p', codeName: '史都华德', portrait: 'steward.png',
    race: '沃尔珀', origin: '谢拉格', occupation: '术师干员',
    kind: 'operator', day: 4, slot: 5,
    intent: '返舰报到', recommender: '塞雷娅',
    dialogue: [
      { question: '代号', answer: '史都华德，术师。要查就查，我不赶时间。' }, { question: '来意', answer: '外勤收队回舰休整，路上耗得够久了。' },
      { question: '担保人', answer: '塞雷娅，推荐信随身带着，签名页在最后。' },
    ],
    passportNumber: 'RI-4006-135', dossierNumber: 'RI-4006-135', photoMatch: true,
  },
  {
    id: 'popukar-d4p', codeName: '泡普卡', portrait: 'popukar.png',
    race: '卡特斯', origin: '雷姆必拓', occupation: '近卫干员',
    kind: 'operator', day: 4, slot: 6,
    intent: '返舰述职', recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '泡普卡！耳朵没问题吧？再念一遍也是这仨字。' }, { question: '来意', answer: '调岗报到，手续麻利点，我急着上岗呢。' },
      { question: '担保人', answer: '凯尔希。白纸黑字签了名的，还能有假？' },
    ],
    passportNumber: 'RI-4007-142', dossierNumber: 'RI-4007-142', photoMatch: true,
  },
  {
    id: 'midnight-d4p', codeName: '月见夜', portrait: 'midnight.png',
    race: '萨卡兹', origin: '东国', occupation: '近卫干员',
    kind: 'impostor', day: 4, slot: 7,
    intent: '归队报到', recommender: '阿米娅',
    dialogue: [
      { question: '代号', answer: '月见夜。名字挺拗口是吧，我也这么觉得。' }, { question: '来意', answer: '回来……处理一些事。对，就是些私事。' },
      { question: '担保人', answer: '阿米娅。她知道的，你问她就行。' },
    ],
    passportNumber: 'RI-4008-149', dossierNumber: 'RI-4008-149', photoMatch: true,
  },
  {
    id: 'provence-d4p', codeName: '普罗旺斯', portrait: 'provence.png',
    race: '鲁珀', origin: '叙拉古', occupation: '狙击干员',
    kind: 'operator', day: 4, slot: 8,
    intent: '返舰补给', recommender: '博士',
    dialogue: [
      { question: '代号', answer: '普罗旺斯，狙击干员。程序上有问必答。' }, { question: '来意', answer: '任务交接，舰队等着，时间不多。' },
      { question: '担保人', answer: '博士。本部有备案，调出来核对即可。' },
    ],
    passportNumber: 'RI-4009-156', dossierNumber: 'RI-4009-156', photoMatch: true,
  },
  {
    id: 'firewatch-d4p', codeName: '守林人', portrait: 'firewatch.png',
    race: '埃拉菲亚', origin: '未公开', occupation: '狙击干员',
    kind: 'operator', day: 4, slot: 9,
    intent: '返舰休整', recommender: '杜宾',
    dialogue: [
      { question: '代号', answer: '守林人。就仨字，你慢慢核。' }, { question: '来意', answer: '返舰休整，顺道交外勤报告。' },
      { question: '担保人', answer: '杜宾。担保函她开的，我带来了。' },
    ],
    passportNumber: 'RI-4010-163', dossierNumber: 'RI-4010-163', photoMatch: true,
  },
]
