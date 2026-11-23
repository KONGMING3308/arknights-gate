/**
 * 用途：桌面证件托盘——通行证 + 派遣函，模拟审查台上的两叠纸。
 * 输入：申请人、通行证。输出：中栏。
 * 依赖：PassportCard, DispatchLetter, @/constants/copy
 */
import { REVIEW_SCREEN } from '@/constants/copy'
import type { Applicant, Passport, VerdictAction } from '@/types'
import DispatchLetter from './DispatchLetter'
import PassportCard from './PassportCard'

interface DocumentTrayProps {
  applicant: Applicant
  passport: Passport | null
  verdict?: VerdictAction | null
  hintsEnabled?: boolean
}

export default function DocumentTray({
  applicant,
  passport,
  verdict = null,
  hintsEnabled = true,
}: DocumentTrayProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between px-1">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold-500/60">
          {REVIEW_SCREEN.passport}
        </p>
        <p className="font-mono text-[10px] tracking-widest text-gold-300/30">DESK · 01</p>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center gap-4 overflow-auto rounded-sm border border-gold-500/10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(200,164,92,0.10),rgba(11,14,19,0)_65%)] px-4 py-6">
        {passport ? (
          <>
            <div className="w-full max-w-xl animate-rise">
              <PassportCard
                passport={passport}
                applicant={applicant}
                verdict={verdict}
                hintsEnabled={hintsEnabled}
              />
            </div>
            <div className="w-full max-w-xl animate-rise">
              <DispatchLetter applicant={applicant} hintsEnabled={hintsEnabled} />
            </div>
          </>
        ) : (
          <div className="flex h-40 w-full max-w-xl items-center justify-center rounded-sm border border-dashed border-gold-500/20 text-xs text-gold-300/40">
            {REVIEW_SCREEN.loadingPassport}
          </div>
        )}
      </div>
    </div>
  )
}
