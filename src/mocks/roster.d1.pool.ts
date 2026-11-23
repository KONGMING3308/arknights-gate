/**
 * 用途：第 1 天候选池 —— 申请人（10 人：8 正常 + 2 入侵者）。
 *       破绽阶梯：印章（污损 / 机构不符）。
 *       种族 / 出身 / 职业均来自 prts.wiki 官方数据。
 * 输入：无。输出：DAY1_POOL_APPLICANTS。
 * 依赖：@/types
 */
import type { Applicant } from '@/types'

export const DAY1_POOL_APPLICANTS: Applicant[] = [
  {
    id: 'skadi-d1p', codeName: '斯卡蒂', portrait: 'skadi.png',
    race: '未公开', origin: '阿戈尔', occupation: '近卫干员',
    kind: 'operator', day: 1, slot: 0,
    intent: '返舰报到', recommender: '阿米娅',
    dialogue: [
      { question: '代号', answer: '斯卡蒂，别紧张，按流程来就好。' }, { question: '来意', answer: '轮换结束回舰，交完材料就走。' },
      { question: '担保人', answer: '阿米娅签过许可了，你核对便是。' },
    ],
    passportNumber: 'RI-1001-600', dossierNumber: 'RI-1001-100', photoMatch: true,
  },
  {
    id: 'specter-d1p', codeName: '幽灵鲨', portrait: 'specter.png',
    race: '未公开', origin: '阿戈尔', occupation: '近卫干员',
    kind: 'operator', day: 1, slot: 1,
    intent: '返舰述职', recommender: '博士',
    dialogue: [
      { question: '代号', answer: '幽灵鲨呀，文件都齐了，尽管查。' }, { question: '来意', answer: '外勤收队回来补手续，辛苦啦。' },
      { question: '担保人', answer: '博士那边早打过招呼了，放心。' },
    ],
    passportNumber: 'RI-1002-607', dossierNumber: 'RI-1002-107', photoMatch: true,
  },
  {
    id: 'platinum-d1p', codeName: '白金', portrait: 'platinum.png',
    race: '库兰塔', origin: '卡西米尔', occupation: '狙击干员',
    kind: 'operator', day: 1, slot: 2,
    intent: '返舰交接', recommender: '杜宾',
    dialogue: [
      { question: '代号', answer: '白金，护照照片本人没错吧？' }, { question: '来意', answer: '任务完了，就想回来歇两天。' },
      { question: '担保人', answer: '杜宾教官的推荐表在我包里。' },
    ],
    passportNumber: 'RI-1003-114', dossierNumber: 'RI-1003-114', photoMatch: true,
  },
  {
    id: 'bluepoison-d1p', codeName: '蓝毒', portrait: 'bluepoison.png',
    race: '安努拉', origin: '未公开', occupation: '狙击干员',
    kind: 'impostor', day: 1, slot: 3,
    intent: '归队报到', recommender: '闪灵',
    dialogue: [
      { question: '代号', answer: '蓝毒。我的编号是 RI-1004-121，你核对就知道，绝对没错。' }, { question: '来意', answer: '轮换归队。野外采样本做了三个月，报告写了四十多页。' },
      { question: '担保人', answer: '闪灵医生。她签的推荐函在档案袋第三层，我亲手放的。' },
    ],
    passportNumber: 'RI-1004-121', dossierNumber: 'RI-1004-121', photoMatch: true,
  },
  {
    id: 'ptilopsis-d1p', codeName: '白面鸮', portrait: 'ptilopsis.png',
    race: '黎博利', origin: '哥伦比亚', occupation: '医疗干员',
    kind: 'operator', day: 1, slot: 4,
    intent: '返舰休整', recommender: '银灰',
    dialogue: [
      { question: '代号', answer: '白面鸮，材料已备妥，请审阅。' }, { question: '来意', answer: '例行返舰报备，无其他事项。' },
      { question: '担保人', answer: '银灰已完成担保备案，可查证。' },
    ],
    passportNumber: 'RI-1005-128', dossierNumber: 'RI-1005-128', photoMatch: true,
  },
  {
    id: 'liskarm-d1p', codeName: '雷蛇', portrait: 'liskarm.png',
    race: '瓦伊凡', origin: '瓦伊凡', occupation: '重装干员',
    kind: 'operator', day: 1, slot: 5,
    intent: '返舰报到', recommender: '嘉维尔',
    dialogue: [
      { question: '代号', answer: '雷蛇，报到。放轻松，我不咬人。' }, { question: '来意', answer: '前线撤下来的，补装备和弹药。' },
      { question: '担保人', answer: '嘉维尔开的担保函，她脾气你懂的。' },
    ],
    passportNumber: 'RI-1006-135', dossierNumber: 'RI-1006-135', photoMatch: true,
  },
  {
    id: 'pramanix-d1p', codeName: '初雪', portrait: 'pramanix.png',
    race: '菲林', origin: '谢拉格', occupation: '辅助干员',
    kind: 'operator', day: 1, slot: 6,
    intent: '返舰述职', recommender: '芙蓉',
    dialogue: [
      { question: '代号', answer: '初雪。名字核对过了吗？' }, { question: '来意', answer: '交接文书，签完就走，不耽搁。' },
      { question: '担保人', answer: '芙蓉担保的，她在舰上很久了。' },
    ],
    passportNumber: 'RI-1007-142', dossierNumber: 'RI-1007-142', photoMatch: true,
  },
  {
    id: 'cliffheart-d1p', codeName: '崖心', portrait: 'cliffheart.png',
    race: '菲林', origin: '谢拉格', occupation: '特种干员',
    kind: 'impostor', day: 1, slot: 7,
    intent: '归队报到', recommender: '临光',
    dialogue: [
      { question: '代号', answer: '崖心。啊，这窗口比以前亮多了，是新装的灯吗？' }, { question: '来意', answer: '回来报到。对了，你们现在还查行李吗？' },
      { question: '担保人', answer: '银灰。他说会给我留个位置。' },
    ],
    passportNumber: 'RI-1008-149', dossierNumber: 'RI-1008-149', photoMatch: true,
    dialogueConflict: '自称担保人是银灰，与证件上的临光不符',
  },
  {
    id: 'matterhorn-d1p', codeName: '角峰', portrait: 'matterhorn.png',
    race: '丰蹄', origin: '谢拉格', occupation: '重装干员',
    kind: 'operator', day: 1, slot: 8,
    intent: '返舰补给', recommender: '塞雷娅',
    dialogue: [
      { question: '代号', answer: '角峰。赶了三天路，嗓子都哑了。' }, { question: '来意', answer: '回舰休整，顺带交述职报告。' },
      { question: '担保人', answer: '塞雷娅签的字，你可以核实。' },
    ],
    passportNumber: 'RI-1009-156', dossierNumber: 'RI-1009-156', photoMatch: true,
  },
  {
    id: 'cuora-d1p', codeName: '蛇屠箱', portrait: 'cuora.png',
    race: '匹特拉姆', origin: '未公开', occupation: '重装干员',
    kind: 'operator', day: 1, slot: 9,
    intent: '返舰休整', recommender: '凯尔希',
    dialogue: [
      { question: '代号', answer: '蛇屠箱，你尽管查，我等着。' }, { question: '来意', answer: '外派任务完了，回本部待命。' },
      { question: '担保人', answer: '凯尔希医生签过字了，没问题的。' },
    ],
    passportNumber: 'RI-1010-163', dossierNumber: 'RI-1010-163', photoMatch: true,
  },
]
