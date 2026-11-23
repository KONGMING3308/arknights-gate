/**
 * 用途：右栏档案区——调档按钮、档案卡片、破绽提示与比对说明。
 * 输入：申请人、档案、加载态、调档回调、破绽数（新手提示开关）。输出：右栏面板。
 * 依赖：DossierCard, Button, @/constants/copy
 */
import Button from '@/components/Button'
import { DOSSIER_COPY, REVIEW_SCREEN } from '@/constants/copy'
import type { Applicant, Dossier } from '@/types'
import DossierCard from './DossierCard'

interface DossierPanelProps {
  applicant: Applicant
  dossier: Dossier | null
  loading: boolean
  onFetch: () => void
  discrepancyCount: number
  /** 破绽所在字段名（用于提示「是哪几处」） */
  discrepancyFields?: string[]
  hintsEnabled: boolean
  /** 异常存在（普瑞塞斯）：材料无法按常规规则核对 */
  isAnomaly?: boolean
}

export default function DossierPanel({
  applicant,
  dossier,
  loading,
  onFetch,
  discrepancyCount,
  discrepancyFields = [],
  hintsEnabled,
  isAnomaly = false,
}: DossierPanelProps) {
  return (
    <aside className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold-500/60">
          {REVIEW_SCREEN.dossier}
        </p>
        {!dossier && (
          <Button variant="paper" onClick={onFetch} disabled={loading}>
            {loading ? REVIEW_SCREEN.dossierLoading : REVIEW_SCREEN.openDossier}
          </Button>
        )}
      </div>

      {dossier ? (
        <DossierCard dossier={dossier} />
      ) : (
        <div className="flex min-h-44 flex-1 items-center justify-center rounded-sm border border-dashed border-gold-500/20 px-4 text-center text-sm leading-relaxed text-gold-300/55">
          {loading ? REVIEW_SCREEN.dossierLoading : REVIEW_SCREEN.dossierEmpty}
        </div>
      )}

      <div className="mt-auto space-y-2 rounded-sm border border-gold-500/15 bg-ink-800/40 p-3">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold-500/50">
          {REVIEW_SCREEN.compare}
        </p>

        {isAnomaly ? (
          <p className="text-xs leading-relaxed text-gold-500/80">{DOSSIER_COPY.invalid}</p>
        ) : hintsEnabled ? (
          <p className="text-xs leading-relaxed text-gold-300/80">
            {DOSSIER_COPY.hintPrefix}
            {dossier
              ? `${DOSSIER_COPY.hintCount} ${discrepancyCount} ${DOSSIER_COPY.hintUnit}${
                  discrepancyFields.length
                    ? `${DOSSIER_COPY.hintFieldsPrefix}${discrepancyFields.join('、')}${DOSSIER_COPY.hintFieldsSuffix}`
                    : ''
                }`
              : DOSSIER_COPY.hintReady}
          </p>
        ) : (
          <p className="text-xs leading-relaxed text-gold-300/50">{DOSSIER_COPY.hintOff}</p>
        )}

        <p className="border-t border-gold-500/10 pt-2 text-xs leading-relaxed text-gold-300/55">
          {REVIEW_SCREEN.compareHint}
        </p>
        <p className="text-xs text-gold-300/70">
          {DOSSIER_COPY.currentApplicant}
          <span className="text-gold-300">{applicant.codeName}</span>
        </p>
      </div>
    </aside>
  )
}
