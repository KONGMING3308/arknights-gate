/**
 * 用途：第 1 天第二批候选池 —— 申请人（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：印章（仿真假章 / 完全错误机构）。
 *       种族 / 出身 / 职业来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY1_POOL2_APPLICANTS。
 * 依赖：@/types
 */
import type { Applicant } from '@/types'

export const DAY1_POOL2_APPLICANTS: Applicant[] = [
  {
    id: 'op_w-d1q', codeName: 'W', portrait: 'op_w.png',
    race: '萨卡兹', origin: '卡兹戴尔', occupation: '狙击干员',
    kind: 'operator', day: 1, slot: 0,
    intent: '返舰报到', recommender: '博士',
    dialogue: [
      { question: '代号', answer: 'W，萨卡兹雇佣兵，你应该听过这名字。' }, { question: '来意', answer: '外勤结束回舰补给，顺便找博士叙旧。' },
      { question: '担保人', answer: '博士亲自担保的，不信你去问TA本人。' },
    ],
    passportNumber: 'RI-1001-200', dossierNumber: 'RI-1001-200', photoMatch: true,
  },
  {
    id: 'niyan-d1q', codeName: '泥岩', portrait: 'niyan.png',
    race: '萨卡兹', origin: '卡兹戴尔', occupation: '重装干员',
    kind: 'operator', day: 1, slot: 1,
    intent: '返舰报到', recommender: '杜宾',
    dialogue: [
      { question: '代号', answer: '泥岩，前卡兹戴尔重装干员。' }, { question: '来意', answer: '轮换期到了，回来提交任务报告。' },
      { question: '担保人', answer: '杜宾教官签的担保，她最讲规矩。' },
    ],
    passportNumber: 'RI-1002-203', dossierNumber: 'RI-1002-203', photoMatch: true,
  },
  {
    id: 'wendi-d1q', codeName: '温蒂', portrait: 'wendi.png',
    race: '阿戈尔', origin: '伊比利亚', occupation: '特种干员',
    kind: 'operator', day: 1, slot: 2,
    intent: '返舰报到', recommender: '闪灵',
    dialogue: [
      { question: '代号', answer: '温蒂，伊比利亚出身的特种干员。' }, { question: '来意', answer: '任务收尾了，回舰向闪灵述职。' },
      { question: '担保人', answer: '闪灵为我担保，她了解我的能力。' },
    ],
    passportNumber: 'RI-1003-206', dossierNumber: 'RI-1003-206', photoMatch: true,
  },
  {
    id: 'helage-d1q', codeName: '赫拉格', portrait: 'helage.png',
    race: '黎博利', origin: '乌萨斯', occupation: '近卫干员',
    kind: 'impostor', day: 1, slot: 3,
    intent: '归队报到', recommender: '银灰',
    dialogue: [
      { question: '代号', answer: '我……是叫赫拉格对吧？档案上写的。' }, { question: '来意', answer: '呃，归队而已，没什么特别的事。' },
      { question: '担保人', answer: '好像是银灰？对，应该是他担保的。' },
    ],
    passportNumber: 'RI-1004-209', dossierNumber: 'RI-1004-209', photoMatch: true,
  },
  {
    id: 'senran-d1q', codeName: '森蚺', portrait: 'senran.png',
    race: '斐迪亚', origin: '萨尔贡', occupation: '重装干员',
    kind: 'operator', day: 1, slot: 4,
    intent: '返舰报到', recommender: '嘉维尔',
    dialogue: [
      { question: '代号', answer: '森蚺，萨尔贡的重装战士。' }, { question: '来意', answer: '外勤收队，回本部修整装备。' },
      { question: '担保人', answer: '嘉维尔帮我做的担保，她靠谱。' },
    ],
    passportNumber: 'RI-1005-212', dossierNumber: 'RI-1005-212', photoMatch: true,
  },
  {
    id: 'kuiying-d1q', codeName: '傀影', portrait: 'kuiying.png',
    race: '菲林', origin: '维多利亚', occupation: '特种干员',
    kind: 'operator', day: 1, slot: 5,
    intent: '返舰报到', recommender: '芙蓉',
    dialogue: [
      { question: '代号', answer: '傀影，维多利亚的特种干员。' }, { question: '来意', answer: '返舰报到，有新的情报要汇报。' },
      { question: '担保人', answer: '芙蓉小姐担保的我，她人很好。' },
    ],
    passportNumber: 'RI-1006-215', dossierNumber: 'RI-1006-215', photoMatch: true,
  },
  {
    id: 'baitie-d1q', codeName: '白铁', portrait: 'baitie.png',
    race: '菲林', origin: '维多利亚', occupation: '辅助干员',
    kind: 'operator', day: 1, slot: 6,
    intent: '返舰报到', recommender: '临光',
    dialogue: [
      { question: '代号', answer: '白铁，维多利亚辅助干员。' }, { question: '来意', answer: '轮换回舰，交一下材料归档。' },
      { question: '担保人', answer: '临光女士担保的，她向来公正。' },
    ],
    passportNumber: 'RI-1007-218', dossierNumber: 'RI-1007-218', photoMatch: true,
  },
  {
    id: 'shuiyue-d1q', codeName: '水月', portrait: 'shuiyue.png',
    race: '阿戈尔', origin: '东国', occupation: '特种干员',
    kind: 'impostor', day: 1, slot: 7,
    intent: '归队报到', recommender: '塞雷娅',
    dialogue: [
      { question: '代号', answer: '我叫……水月？应该是这个名字吧。' }, { question: '来意', answer: '呃，就是归队嘛，没什么好说的。' },
      { question: '担保人', answer: '塞雷娅……对，是她给我担保的。' },
    ],
    passportNumber: 'RI-1008-221', dossierNumber: 'RI-1008-221', photoMatch: true,
  },
  {
    id: 'ling-d1q', codeName: '令', portrait: 'ling.png',
    race: '未公开', origin: '炎', occupation: '辅助干员',
    kind: 'operator', day: 1, slot: 8,
    intent: '返舰报到', recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '令，炎国诗人，也是辅助干员。' }, { question: '来意', answer: '任务结束，回来向凯尔希述职。' },
      { question: '担保人', answer: '凯尔希医生担保的我，无需多言。' },
    ],
    passportNumber: 'RI-1009-224', dossierNumber: 'RI-1009-224', photoMatch: true,
  },
  {
    id: 'xi-d1q', codeName: '夕', portrait: 'xi.png',
    race: '未公开', origin: '炎', occupation: '术师干员',
    kind: 'operator', day: 1, slot: 9,
    intent: '返舰报到', recommender: '阿米娅',
    dialogue: [
      { question: '代号', answer: '夕，炎国画师，术师干员。' }, { question: '来意', answer: '外勤收队，回本部继续作画。' },
      { question: '担保人', answer: '阿米娅为我担保，她很信任我。' },
    ],
    passportNumber: 'RI-1010-227', dossierNumber: 'RI-1010-227', photoMatch: true,
  },
]
