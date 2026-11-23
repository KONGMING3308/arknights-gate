/**
 * 用途：审查台的处置流程——含幂等保护、突脸事件（S.W.E.E.P.）触发与结算。
 * 输入：当前申请人、store 的三个动作。输出：busy/事件状态与各处理函数。
 * 依赖：react, @/constants/registry, @/constants/game, @/types
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { isRegisteredRecommender } from '@/constants/registry'
import { SWEEP } from '@/constants/game'
import type { Applicant, VerdictAction } from '@/types'
import { playStamp } from '@/utils/audio'

interface VerdictFlowOptions {
  applicant: Applicant | null
  applyVerdict: (
    applicantId: string,
    codeName: string,
    kind: Applicant['kind'],
    action: VerdictAction,
    recommenderValid: boolean,
  ) => void
  advanceSlot: () => void
  penalize: (safetyDelta: number, trustDelta: number) => void
  submitVerdict: (applicantId: string, action: VerdictAction) => Promise<void>
}

export function useVerdictFlow({
  applicant,
  applyVerdict,
  advanceSlot,
  penalize,
  submitVerdict,
}: VerdictFlowOptions) {
  const [busy, setBusy] = useState(false)
  const [sweep, setSweep] = useState<Applicant | null>(null)

  /** 幂等锁：防止 setTimeout、快捷键、事件回调重复结算同一人 */
  const settledRef = useRef<string | null>(null)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    settledRef.current = null
    setBusy(false)
    setSweep(null)
  }, [applicant?.id])

  useEffect(
    () => () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
      timersRef.current = []
    },
    [],
  )

  const doSettle = useCallback(
    (action: VerdictAction) => {
      if (!applicant || settledRef.current === applicant.id) return
      settledRef.current = applicant.id
      setBusy(true)
      playStamp()
      void submitVerdict(applicant.id, action)
      applyVerdict(
        applicant.id,
        applicant.codeName,
        applicant.kind,
        action,
        isRegisteredRecommender(applicant.recommender),
      )
      const timer = window.setTimeout(() => {
        setBusy(false)
        advanceSlot()
      }, 1400)
      timersRef.current.push(timer)
    },
    [applicant, applyVerdict, advanceSlot, submitVerdict],
  )

  const settle = useCallback(
    (action: VerdictAction) => {
      if (!applicant || settledRef.current === applicant.id) return
      // 拒绝会「突脸」的入侵者：先进入求援事件，不直接结算
      if (action === 'reject' && applicant.attacksWhenRejected) {
        setSweep(applicant)
        return
      }
      doSettle(action)
    },
    [applicant, doSettle],
  )

  const resolveSweep = useCallback(
    (success: boolean) => {
      setSweep(null)
      if (!success) penalize(-SWEEP.failSafety, 0)
      doSettle('reject')
    },
    [doSettle, penalize],
  )

  return { busy, settle, sweep, resolveSweep }
}
