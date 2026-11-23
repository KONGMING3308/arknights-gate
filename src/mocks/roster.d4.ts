/**
 * 用途：第 4 天 Mock 剧本数据（5 人，2 名入侵者）。
 *       伪造手法：冒名在册干员——入侵者顶替真实在册干员身份。
 *       · 能天使（入侵者）：passportNumber 与档案不一致（RI-5523-891 vs RI-5523-819），且 photoMatch=false。
 *       · 可颂（入侵者）：档案 status='active' 但 photoMatch=false 且 passportNumber 与档案不一致。
 *       印章均清晰，不提供印章维度破绽。
 * 输入：无。输出：DAY4_APPLICANTS / DAY4_PASSPORTS / DAY4_DOSSIERS。
 * 依赖：@/types
 */
import type { Applicant } from '@/types'
import { DAY4_PASSPORTS, DAY4_DOSSIERS } from './roster.d4.docs'

export const DAY4_APPLICANTS: Applicant[] = [
  {
    id: 'texas-d4',
    codeName: '德克萨斯',
    portrait: 'texas.png',
    race: '鲁珀',
    origin: '哥伦比亚',
    occupation: '先锋干员',
    kind: 'operator',
    day: 4,
    slot: 0,
    intent: '外勤任务结束，返回本舰述职',
    recommender: '博士',
    dialogue: [
      { question: '代号', answer: '德克萨斯。外勤结束了，回来交报告。' },
      { question: '来意', answer: '任务收尾，回舰述职。文书已经提前递交了。' },
      { question: '担保人', answer: '博士。公文上是他签的字，拉普兰德只是陪我跑了一趟。' },
    ],
    passportNumber: 'RI-7701-334',
    dossierNumber: 'RI-7701-334',
    photoMatch: true,
  },
  {
id: 'exusiai-d4',
    codeName: '能天使',
    portrait: 'exusiai.png',
    race: '萨科塔',
    origin: '拉特兰',
    occupation: '狙击干员',
    kind: 'impostor',
    day: 4,
    slot: 1,
    intent: '休假归队，顺便带了点特产',
    recommender: '德克萨斯',
    dialogue: [
      { question: '代号', answer: '能、能天使……对，是我。好久没回来了。' },
      { question: '来意', answer: '休假结束，归队。嗯……就是归队，没别的。' },
      { question: '担保人', answer: '德克萨斯。我跟她一直有联络的。' },
    ],
    passportNumber: 'RI-5523-891',
    dossierNumber: 'RI-5523-891',
    photoMatch: false,
    attacksWhenRejected: true,
  },
  {
    id: 'lappland-d4',
    codeName: '拉普兰德',
    portrait: 'lappland.png',
    race: '鲁珀',
    origin: '叙拉古',
    occupation: '近卫干员',
    kind: 'operator',
    day: 4,
    slot: 2,
    intent: '应召返舰，协助训练新兵',
    recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '拉普兰德。别用那种眼神看我，我是来办正事的。' },
      { question: '来意', answer: '收到调令，回来带新人。调令是凯尔希签的。' },
      { question: '担保人', answer: '凯尔希。调令上她签的字。' },
    ],
    passportNumber: 'RI-6634-207',
    dossierNumber: 'RI-6634-207',
    photoMatch: true,
  },
  {
    id: 'croissant-d4',
    codeName: '可颂',
    portrait: 'croissant.png',
    race: '丰蹄',
    origin: '米诺斯',
    occupation: '重装干员',
    kind: 'impostor',
    day: 4,
    slot: 3,
    intent: '后勤物资押运完毕，归建报到',
    recommender: '银灰',
    dialogue: [
      { question: '代号', answer: '可颂！啊哈哈……是我是我，刚从米诺斯卸完货。' },
      { question: '来意', answer: '米诺斯的货押运完了嘛，回来报到。那个……编号？应该没写错吧。' },
      { question: '担保人', answer: '银灰老板。他亲自签的字，绝对没问题！' },
    ],
    passportNumber: 'RI-9918-445',
    dossierNumber: 'RI-4418-995',
    photoMatch: false,
  },
  {
    id: 'silverash-d4',
    codeName: '银灰',
    portrait: 'silverash.png',
    race: '菲林',
    origin: '谢拉格',
    occupation: '近卫干员',
    kind: 'operator',
    day: 4,
    slot: 4,
    intent: '商务洽谈结束，返回罗德岛复命',
    recommender: '博士',
    dialogue: [
      { question: '代号', answer: '银灰。谢拉格的事务已处理妥当。' },
      { question: '来意', answer: '商谈告一段落，回舰复命。一切按计划进行。' },
      { question: '担保人', answer: '博士本人。此次行程由他直接批准。' },
    ],
    passportNumber: 'RI-2207-668',
    dossierNumber: 'RI-2207-668',
    photoMatch: true,
  },
]

export { DAY4_PASSPORTS, DAY4_DOSSIERS }
