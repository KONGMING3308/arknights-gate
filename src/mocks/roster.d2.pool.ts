/**
 * 用途：第 2 天候选池 —— 申请人（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：编号不符。
 *       种族 / 出身 / 职业均来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY2_POOL_APPLICANTS。
 * 依赖：@/types
 */
import type { Applicant } from '@/types'

export const DAY2_POOL_APPLICANTS: Applicant[] = [
  {
    id: 'gummy-d2p', codeName: '古米', portrait: 'gummy.png',
    race: '乌萨斯', origin: '乌萨斯', occupation: '重装干员',
    kind: 'operator', day: 2, slot: 0,
    intent: '返舰报到', recommender: '博士',
    dialogue: [
      { question: '代号', answer: '古米。材料在这儿，还带了包茶叶。' }, { question: '来意', answer: '换岗返舰，手续都齐了。' },
      { question: '担保人', answer: '博士。他昨晚还念叨要喝我炖的汤。' },
    ],
    passportNumber: 'RI-2001-600', dossierNumber: 'RI-2001-100', photoMatch: true,
  },
  {
    id: 'sora-d2p', codeName: '空', portrait: 'sora.png',
    race: '因经纪公司要求不公开', origin: '因经纪公司要求不公开', occupation: '辅助干员',
    kind: 'operator', day: 2, slot: 1,
    intent: '返舰述职', recommender: '杜宾',
    dialogue: [
      { question: '代号', answer: '空。别盯着我看，没上台的我也就是普通女孩子。' }, { question: '来意', answer: '外勤一个月总算回来了，交报告。' },
      { question: '担保人', answer: '杜宾的推荐表在证件夹层。' },
    ],
    passportNumber: 'RI-2002-607', dossierNumber: 'RI-2002-107', photoMatch: true,
  },
  {
    id: 'istina-d2p', codeName: '真理', portrait: 'istina.png',
    race: '乌萨斯', origin: '乌萨斯', occupation: '辅助干员',
    kind: 'operator', day: 2, slot: 2,
    intent: '返舰交接', recommender: '闪灵',
    dialogue: [
      { question: '代号', answer: '真理。我的名字和真相是同一个词。' }, { question: '来意', answer: '回舰补领装备，清单备好了。' },
      { question: '担保人', answer: '闪灵，本部公函在此，可留副本。' },
    ],
    passportNumber: 'RI-2003-114', dossierNumber: 'RI-2003-114', photoMatch: true,
  },
  {
    id: 'zima-d2p', codeName: '凛冬', portrait: 'zima.png',
    race: '乌萨斯', origin: '乌萨斯', occupation: '先锋干员',
    kind: 'impostor', day: 2, slot: 3,
    intent: '归队报到', recommender: '银灰',
    dialogue: [
      { question: '代号', answer: '凛冬。看清楚了，别让我重复第二遍。' }, { question: '来意', answer: '归队。在外头蹲了两个月，这舰上还没人有资格拦我。' },
      { question: '担保人', answer: '银灰。那位大人物亲自点的头，你还有什么要问的？' },
    ],
    passportNumber: 'RI-2004-121', dossierNumber: 'RI-2004-903', photoMatch: true,
  },
  {
    id: 'indra-d2p', codeName: '因陀罗', portrait: 'indra.png',
    race: '菲林', origin: '不明', occupation: '近卫干员',
    kind: 'operator', day: 2, slot: 4,
    intent: '返舰休整', recommender: '嘉维尔',
    dialogue: [
      { question: '代号', answer: '因陀罗！记好了，就三个字。' }, { question: '来意', answer: '收队回舰。让条道儿，我等着上岗。' },
      { question: '担保人', answer: '嘉维尔。她那拳头我都扛得住。' },
    ],
    passportNumber: 'RI-2005-128', dossierNumber: 'RI-2005-128', photoMatch: true,
  },
  {
    id: 'mousse-d2p', codeName: '慕斯', portrait: 'mousse.png',
    race: '菲林', origin: '维多利亚', occupation: '近卫干员',
    kind: 'operator', day: 2, slot: 5,
    intent: '返舰报到', recommender: '芙蓉',
    dialogue: [
      { question: '代号', answer: '我是慕斯，头一回走这流程。' }, { question: '来意', answer: '刚从外勤调岗回来报到。' },
      { question: '担保人', answer: '芙蓉姐签的字，她认得我。' },
    ],
    passportNumber: 'RI-2006-135', dossierNumber: 'RI-2006-135', photoMatch: true,
  },
  {
    id: 'beehunter-d2p', codeName: '猎蜂', portrait: 'beehunter.png',
    race: '乌萨斯', origin: '乌萨斯', occupation: '近卫干员',
    kind: 'operator', day: 2, slot: 6,
    intent: '返舰述职', recommender: '临光',
    dialogue: [
      { question: '代号', answer: '猎蜂，档案都在你手上了。' }, { question: '来意', answer: '交接任务赶时间，麻烦快点。' },
      { question: '担保人', answer: '临光大人作保，随时能核实。' },
    ],
    passportNumber: 'RI-2007-142', dossierNumber: 'RI-2007-142', photoMatch: true,
  },
  {
    id: 'executor-d2p', codeName: '送葬人', portrait: 'executor.png',
    race: '萨科塔', origin: '拉特兰', occupation: '狙击干员',
    kind: 'impostor', day: 2, slot: 7,
    intent: '归队报到', recommender: '塞雷娅',
    dialogue: [
      { question: '代号', answer: '代号已核对，与档案一致。请继续。' }, { question: '来意', answer: '任务终止，依规程返舰，等待下一次指派。流程完毕。' },
      { question: '担保人', answer: '阿米娅。她批准了本次行动，档案可查。' },
    ],
    passportNumber: 'RI-2008-907', dossierNumber: 'RI-2008-907', photoMatch: true,
    dialogueConflict: '自称担保人是阿米娅，与证件上的塞雷娅不符',
  },
  {
    id: 'projektred-d2p', codeName: '红', portrait: 'projektred.png',
    race: '鲁珀', origin: '未公开', occupation: '特种干员',
    kind: 'operator', day: 2, slot: 8,
    intent: '返舰补给', recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '红。' }, { question: '来意', answer: '归队。' },
      { question: '担保人', answer: '凯尔希。' },
    ],
    passportNumber: 'RI-2009-156', dossierNumber: 'RI-2009-156', photoMatch: true,
  },
  {
    id: 'gravel-d2p', codeName: '砾', portrait: 'gravel.png',
    race: '札拉克', origin: '卡西米尔', occupation: '特种干员',
    kind: 'operator', day: 2, slot: 9,
    intent: '返舰休整', recommender: '阿米娅',
    dialogue: [
      { question: '代号', answer: '砾，按规矩来就好。' }, { question: '来意', answer: '换防结束，回本舰休整。' },
      { question: '担保人', answer: '阿米娅批的条子，请过目。' },
    ],
    passportNumber: 'RI-2010-163', dossierNumber: 'RI-2010-163', photoMatch: true,
  },
]
