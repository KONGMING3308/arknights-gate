/**
 * 用途：处置结算规则——根据身份、动作与担保有效性计算数值变化与判断正误。
 * 输入：申请人身份、玩家动作、担保人是否在册。输出：安全度/信任度变化与是否正确。
 * 依赖：@/constants/game, @/types
 */
import { VERDICT_EFFECT } from '@/constants/game'
import type { ApplicantKind, VerdictAction } from '@/types'

export interface VerdictOutcome {
  safety: number
  trust: number
  /** 玩家的处置是否符合规则 */
  correct: boolean
}

/**
 * 担保失效（担保人不在册）时的判定：
 * 派遣函写明「担保人须为在册干员」，因此这类申请人不具备入境资格——
 * 拒绝一定正确，批准属于放行手续不全者。
 */
const INVALID_SPONSOR_EFFECT = {
  approve: { safety: -15, trust: 0, correct: false },
  reject: { safety: 5, trust: 0, correct: true },
} as const

export function computeOutcome(
  kind: ApplicantKind,
  action: VerdictAction,
  recommenderValid = true,
): VerdictOutcome {
  // 异常存在（普瑞塞斯）：无论放行还是拒绝都不计分、也不判定对错
  if (kind === 'anomaly') {
    return { safety: 0, trust: 0, correct: true }
  }

  if (!recommenderValid) {
    const effect = INVALID_SPONSOR_EFFECT[action]
    return { safety: effect.safety, trust: effect.trust, correct: effect.correct }
  }

  const effect = VERDICT_EFFECT[kind][action]
  const correct = kind === 'operator' ? action === 'approve' : action === 'reject'
  return { safety: effect.safety, trust: effect.trust, correct }
}

/** 是否放走了入侵者（用于结算文案） */
export function isLeak(kind: ApplicantKind, action: VerdictAction): boolean {
  return kind === 'impostor' && action === 'approve'
}

/** 按总分给出评级 */
export function computeGrade(total: number, table: readonly { grade: string; min: number }[]): string {
  for (const row of table) {
    if (total >= row.min) return row.grade
  }
  return 'D'
}
