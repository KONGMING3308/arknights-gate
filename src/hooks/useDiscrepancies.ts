/**
 * 用途：计算当前申请人材料之间的破绽（供新手提示显示数量）。
 * 输入：申请人、通行证、档案。输出：破绽数组。
 * 依赖：react, @/utils/compare, @/types
 */
import { useMemo } from 'react'
import type { Applicant, Discrepancy, Dossier, Passport } from '@/types'
import { buildDiscrepancies } from '@/utils/compare'

export function useDiscrepancies(
  applicant: Applicant | null,
  passport: Passport | null,
  dossier: Dossier | null,
): Discrepancy[] {
  return useMemo(() => {
    if (!applicant || !passport || !dossier) return []
    return buildDiscrepancies(applicant, passport, dossier)
  }, [applicant, passport, dossier])
}
