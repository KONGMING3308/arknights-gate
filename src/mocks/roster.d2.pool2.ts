/**
 * 用途：第 2 天第二批候选池 —— 申请人（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：编号不符。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY2_POOL2_APPLICANTS。
 * 依赖：@/types
 */
import type { Applicant } from '@/types'

export const DAY2_POOL2_APPLICANTS: Applicant[] = [
  {
    id: 'chongyue-d2q', codeName: '重岳', portrait: 'chongyue.png',
    race: '未公开', origin: '炎', occupation: '近卫干员',
    kind: 'operator', day: 2, slot: 0,
    intent: '返舰报到', recommender: '闪灵',
    dialogue: [
      { question: '代号', answer: '重岳，炎国近卫干员。' }, { question: '来意', answer: '返舰报到，有武学心得要记录。' },
      { question: '担保人', answer: '闪灵亲自担保，她认可我的为人。' },
    ],
    passportNumber: 'RI-2001-200', dossierNumber: 'RI-2001-200', photoMatch: true,
  },
  {
    id: 'nian-d2q', codeName: '年', portrait: 'nian.png',
    race: '未公开', origin: '炎', occupation: '重装干员',
    kind: 'operator', day: 2, slot: 1,
    intent: '返舰报到', recommender: '银灰',
    dialogue: [
      { question: '代号', answer: '年，炎国重装干员，铸剑师。' }, { question: '来意', answer: '轮换回舰，顺便交些新材料样本。' },
      { question: '担保人', answer: '担保人是银灰。他的印章我核对过，没问题。' },
    ],
    passportNumber: 'RI-2002-203', dossierNumber: 'RI-2002-203', photoMatch: true,
  },
  {
    id: 'yanke-d2q', codeName: '炎客', portrait: 'yanke.png',
    race: '萨卡兹', origin: '卡兹戴尔', occupation: '近卫干员',
    kind: 'operator', day: 2, slot: 2,
    intent: '返舰报到', recommender: '嘉维尔',
    dialogue: [
      { question: '代号', answer: '炎客，萨卡兹近卫，用刀的。' }, { question: '来意', answer: '任务结束了，回来找闪灵述职。' },
      { question: '担保人', answer: '嘉维尔担保的我，她知道我的实力。' },
    ],
    passportNumber: 'RI-2003-206', dossierNumber: 'RI-2003-206', photoMatch: true,
  },
  {
    id: 'a-d2q', codeName: '阿', portrait: 'a.png',
    race: '菲林', origin: '龙门', occupation: '特种干员',
    kind: 'impostor', day: 2, slot: 3,
    intent: '归队报到', recommender: '芙蓉',
    dialogue: [
      { question: '代号', answer: '阿……对，我是叫阿没错吧？' }, { question: '来意', answer: '呃，归队而已，别问那么多了。' },
      { question: '担保人', answer: '芙蓉……应该是她，我记得是她。' },
    ],
    passportNumber: 'RI-2004-209', dossierNumber: 'RI-2004-803', photoMatch: true,
  },
  {
    id: 'hou-d2q', codeName: '吽', portrait: 'hou.png',
    race: '佩洛', origin: '龙门', occupation: '重装干员',
    kind: 'operator', day: 2, slot: 4,
    intent: '返舰报到', recommender: '临光',
    dialogue: [
      { question: '代号', answer: '吽，龙门重装干员，守门的。' }, { question: '来意', answer: '外勤收队，回本部休整待命。' },
      { question: '担保人', answer: '临光担保的我，她说话算数。' },
    ],
    passportNumber: 'RI-2005-212', dossierNumber: 'RI-2005-212', photoMatch: true,
  },
  {
    id: 'keebo-d2q', codeName: '刻俄柏', portrait: 'keebo.png',
    race: '佩洛', origin: '玻利瓦尔', occupation: '术师干员',
    kind: 'operator', day: 2, slot: 5,
    intent: '返舰报到', recommender: '塞雷娅',
    dialogue: [
      { question: '代号', answer: '刻俄柏，玻利瓦尔术师干员。' }, { question: '来意', answer: '返舰报到，带了新矿石标本。' },
      { question: '担保人', answer: '塞雷娅女士担保的，她对我很好。' },
    ],
    passportNumber: 'RI-2006-215', dossierNumber: 'RI-2006-215', photoMatch: true,
  },
  {
    id: 'fiammetta-d2q', codeName: '菲亚梅塔', portrait: 'fiammetta.png',
    race: '黎博利', origin: '拉特兰', occupation: '狙击干员',
    kind: 'operator', day: 2, slot: 6,
    intent: '返舰报到', recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '菲亚梅塔，拉特兰狙击干员。' }, { question: '来意', answer: '轮换回舰，提交任务材料归档。' },
      { question: '担保人', answer: '凯尔希担保的我，她值得信赖。' },
    ],
    passportNumber: 'RI-2007-218', dossierNumber: 'RI-2007-218', photoMatch: true,
  },
  {
    id: 'irene-d2q', codeName: '艾丽妮', portrait: 'irene.png',
    race: '黎博利', origin: '伊比利亚', occupation: '近卫干员',
    kind: 'impostor', day: 2, slot: 7,
    intent: '归队报到', recommender: '阿米娅',
    dialogue: [
      { question: '代号', answer: '艾丽妮……嗯，应该是这个名字。' }, { question: '来意', answer: '呃，归队嘛，就……正常归队。' },
      { question: '担保人', answer: '凯尔希……对，是她担保的我。' },
    ],
    passportNumber: 'RI-2008-221', dossierNumber: 'RI-2008-807', photoMatch: true,
  },
  {
    id: 'hongxue-d2q', codeName: '鸿雪', portrait: 'hongxue.png',
    race: '鲁珀', origin: '乌萨斯', occupation: '狙击干员',
    kind: 'operator', day: 2, slot: 8,
    intent: '返舰报到', recommender: '博士',
    dialogue: [
      { question: '代号', answer: '鸿雪，乌萨斯鲁珀族狙击手。' }, { question: '来意', answer: '任务结束，回来向阿米娅述职。' },
      { question: '担保人', answer: '博士担保的，TA从不看错人。' },
    ],
    passportNumber: 'RI-2009-224', dossierNumber: 'RI-2009-224', photoMatch: true,
  },
  {
    id: 'midiexiang-d2q', codeName: '迷迭香', portrait: 'midiexiang.png',
    race: '菲林', origin: '哥伦比亚', occupation: '狙击干员',
    kind: 'operator', day: 2, slot: 9,
    intent: '返舰报到', recommender: '杜宾',
    dialogue: [
      { question: '代号', answer: '迷迭香，哥伦比亚狙击干员。' }, { question: '来意', answer: '外勤收队，回本部整理记忆。' },
      { question: '担保人', answer: '杜宾签的字。她带过我一段，认得我。' },
    ],
    passportNumber: 'RI-2010-227', dossierNumber: 'RI-2010-227', photoMatch: true,
  },
]
