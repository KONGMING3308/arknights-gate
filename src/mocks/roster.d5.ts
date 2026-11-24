/**
 * 用途：第 5 天 Mock 剧本数据（终局：本日固定名单 + 变形者集群，共 3 名入侵者）。
 *       伪造手法：多重破绽 + 对话矛盾。
 *       · 闪灵（入侵者）：passportNumber 与档案不一致；sealText 错误（"罗德岛后勤部"而非要求的"罗德岛人事部"）；
 *         担保人「洛肯」不在在册名录（申请人与档案一致，均为洛肯）。
 *       · 推进之王（入侵者）：photoMatch=false；dossier.status='revoked'；突脸随机。
 *       · 变形者集群（入侵者）：担保人「——」不在名录；编号全零且与档案不一致；无入境章；突脸随机。
 *       正常干员：夜莺、星熊、陈的通行证与档案完全自洽，零破绽（不使用「可疑假象」干扰项）。
 * 输入：无。输出：DAY5_APPLICANTS / DAY5_PASSPORTS / DAY5_DOSSIERS。
 * 依赖：@/types
 */
import type { Applicant } from '@/types'
import { DAY5_PASSPORTS, DAY5_DOSSIERS } from './roster.d5.docs'

export const DAY5_APPLICANTS: Applicant[] = [
  {
    id: 'nightingale-d5',
    codeName: '夜莺',
    portrait: 'nightingale.png',
    race: '萨卡兹',
    origin: '卡兹戴尔',
    occupation: '医疗干员',
    kind: 'operator',
    day: 5,
    slot: 0,
    intent: '战地医疗支援结束，返舰休整',
    recommender: '闪灵',
    dialogue: [
      { question: '代号', answer: '夜莺……我回来了。' },
      { question: '来意', answer: '前线医疗任务结束了，回来休整。路上的手续都齐了。' },
      { question: '担保人', answer: '闪灵。她和我一起从卡兹戴尔回来的。' },
    ],
    passportNumber: 'RI-3389-112',
    dossierNumber: 'RI-3389-112',
    photoMatch: true,
  },
  {
    id: 'shining-d5',
    codeName: '闪灵',
    portrait: 'shining.png',
    race: '萨卡兹',
    origin: '卡兹戴尔',
    occupation: '医疗干员',
    kind: 'impostor',
    day: 5,
    slot: 1,
    intent: '陪同夜莺返舰，提交战后医疗报告',
    recommender: '洛肯',
    dialogue: [
      { question: '代号', answer: '闪灵。我和夜莺一起回来的……你应该认识我吧？' },
      { question: '来意', answer: '陪夜莺回来，顺便交报告。嗯……就是医疗报告。' },
      { question: '担保人', answer: '洛肯。他在外务处做事，你们应该有备案吧？' },
    ],
    passportNumber: 'RI-7742-558',
    dossierNumber: 'RI-1142-778',
    photoMatch: true,
  },
  {
    id: 'hoshiguma-d5',
    codeName: '星熊',
    portrait: 'hoshiguma.png',
    race: '鬼',
    origin: '东国',
    occupation: '重装干员',
    kind: 'operator',
    day: 5,
    slot: 2,
    intent: '防卫演习完毕，归队报到',
    recommender: '陈',
    dialogue: [
      { question: '代号', answer: '星熊！哟，又见面了。演习刚结束，浑身都是灰。' },
      { question: '来意', answer: '防卫演习收队，回来报到。老陈应该在我后面。' },
      { question: '担保人', answer: '老陈。这次演习她全程盯着呢。' },
    ],
    passportNumber: 'RI-8856-301',
    dossierNumber: 'RI-8856-301',
    photoMatch: true,
  },
  {
    id: 'chen-d5',
    codeName: '陈',
    portrait: 'chen.png',
    race: '龙',
    origin: '龙门',
    occupation: '近卫干员',
    kind: 'operator',
    day: 5,
    slot: 3,
    intent: '联合行动收尾，返回本舰汇报',
    recommender: '博士',
    dialogue: [
      { question: '代号', answer: '陈。联合行动已结束，前来汇报。' },
      { question: '来意', answer: '行动收尾，回舰提交总结。星熊已经先到了。' },
      { question: '担保人', answer: '博士替我做的担保。星熊那边……只是打了个照面。' },
    ],
    passportNumber: 'RI-4471-889',
    dossierNumber: 'RI-4471-889',
    photoMatch: true,
  },
  {
    id: 'siege-d5',
    codeName: '推进之王',
    portrait: 'siege.png',
    race: '阿斯兰',
    origin: '维多利亚',
    occupation: '先锋干员',
    kind: 'impostor',
    day: 5,
    slot: 4,
    intent: '紧急调防，转隶罗德岛指挥序列',
    recommender: '博士',
    dialogue: [
      { question: '代号', answer: '推进之王……对，是我。来报到的。' },
      { question: '来意', answer: '呃……述职。就是例行述职，没什么特别的。' },
      { question: '担保人', answer: '博士。他……应该还记得这回事吧。' },
    ],
    passportNumber: 'RI-6693-224',
    dossierNumber: 'RI-6693-224',
    photoMatch: false,
  },
]

export { DAY5_PASSPORTS, DAY5_DOSSIERS }
