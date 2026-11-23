/**
 * 用途：普瑞塞斯——无法判定的异常存在。所有证件信息均为乱码，
 *       随机出现在第 3–5 天的某一次；放行或拒绝都不计分，也不会触发突脸。
 * 输入：无。输出：申请人、通行证、档案，以及本局随机落点（天 + 序号）。
 * 依赖：@/types
 */
import type { Applicant, Dossier, Passport } from '@/types'

/** 乱码占位（避免使用字体可能缺失的方块字符） */
const GARBLED = '？？？？'

/** 落点存储键：一局之内保持不变，重开新局时清除 */
export const ANOMALY_PLACEMENT_KEY = 'arknights-gate-anomaly'

interface Placement {
  day: 3 | 4 | 5
  slot: number
}

/** 读取本局落点；没有就随机生成并记住（避免刷新页面就换位置） */
export function getAnomalyPlacement(): Placement {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(ANOMALY_PLACEMENT_KEY) : null
    if (raw) {
      const parsed = JSON.parse(raw) as Placement
      if (parsed?.day >= 3 && parsed?.day <= 5) return parsed
    }
  } catch {
    // 忽略存储异常，退化为随机
  }
  const placement: Placement = {
    day: (3 + Math.floor(Math.random() * 3)) as 3 | 4 | 5,
    slot: Math.floor(Math.random() * 4),
  }
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(ANOMALY_PLACEMENT_KEY, JSON.stringify(placement))
    }
  } catch {
    // 忽略
  }
  return placement
}

export const PRESETH_ID = 'preseth-anomaly'

export const PRESETH_APPLICANT: Applicant = {
  id: PRESETH_ID,
  codeName: '普瑞塞斯',
  portrait: 'preseth_avatar.png',
  race: GARBLED,
  origin: GARBLED,
  // 本次落点的天数与序号在运行时由 getMockRoster 覆盖，这里给默认值
  occupation: GARBLED,
  kind: 'anomaly',
  day: 3,
  slot: 0,
  intent: GARBLED,
  recommender: GARBLED,
  dialogue: [
    { question: '代号', answer: '想我了吗，预言家？' },
    { question: '来意', answer: '你忘记我了吗？没关系。' },
    { question: '担保人', answer: '我们该如何确定，一颗星星是在接近，还是远离我们？' },
  ],
  passportNumber: 'RI-？？？？-？？？',
  dossierNumber: 'RI-？？？？-？？？',
  photoMatch: true,
  scrambled: true,
}

export const PRESETH_PASSPORT: Passport = {
  number: 'RI-？？？？-？？？',
  holderName: '普瑞塞斯',
  photo: 'preseth_avatar.png',
  issueDate: '？？？？-？？-？？',
  expiryDate: '？？？？-？？-？？',
  route: '？？？？ → ？？？？',
  stampType: 'missing',
  sealText: GARBLED,
}

export const PRESETH_DOSSIER: Dossier = {
  codeName: '普瑞塞斯',
  number: GARBLED,
  occupation: GARBLED,
  origin: GARBLED,
  recommender: GARBLED,
  photo: 'preseth_avatar.png',
  status: 'missing',
  requiredSeal: GARBLED,
}
