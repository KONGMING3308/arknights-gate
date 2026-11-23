/**
 * 用途：通行证卡片（纸张质感），展示编号、照片、日期、路线与印章。
 *       照片与本人不符时，红框与红字仅在「破绽提示」开启时显示（照片本身仍是干扰图）。
 * 输入：通行证数据、申请人、是否显示提示。输出：证件视觉。
 * 依赖：@/components/Stamp, @/constants/copy, @/types
 */
import Stamp from '@/components/Stamp'
import { ISSUER_LINE, PASSPORT_COPY, REVIEW_SCREEN } from '@/constants/copy'
import type { Applicant, Passport, VerdictAction } from '@/types'

interface PassportCardProps {
  passport: Passport
  applicant: Applicant
  /** 刚做出的处置，用于在证件上盖章反馈 */
  verdict?: VerdictAction | null
  /** 新手提示开关：关闭时不显示红框与「与本人不符」标注 */
  hintsEnabled?: boolean
}

const VERDICT_STAMP = {
  approve: { type: 'approve' as const, text: PASSPORT_COPY.stampApprove },
  reject: { type: 'reject' as const, text: PASSPORT_COPY.stampReject },
}

export default function PassportCard({
  passport,
  applicant,
  verdict = null,
  hintsEnabled = true,
}: PassportCardProps) {
  const sealTone = passport.stampType === 'clear' ? 'approve' : 'forged'
  const verdictStamp = verdict ? VERDICT_STAMP[verdict] : null
  const flagPhoto = hintsEnabled && !applicant.photoMatch

  return (
    <article className="paper relative rounded-sm p-3 shadow-seal">
      <header className="mb-2 flex items-baseline justify-between border-b border-ink-900/25 pb-1.5">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-ink-900/80">
          {REVIEW_SCREEN.passport} · {ISSUER_LINE}
        </h3>
        <span className="font-mono text-[10px] text-ink-900/50">PASSPORT</span>
      </header>

      <div className="flex gap-3">
        <div
          className={[
            'relative h-28 w-24 shrink-0 overflow-hidden rounded-sm border bg-ink-800',
            flagPhoto ? 'border-2 border-danger' : 'border-ink-900/30',
          ].join(' ')}
        >
          <img
            src={`/assets/portraits/${passport.photo}`}
            alt={passport.holderName}
            className="h-full w-full object-cover grayscale-[15%]"
          />
          {!applicant.photoMatch && (
            <span className="pointer-events-none absolute inset-0 animate-flicker bg-white" />
          )}
        </div>

        <dl className="grid flex-1 grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-[11px] leading-tight">
          <dt className="text-ink-900/55">{REVIEW_SCREEN.fieldLabel.holderName}</dt>
          <dd className="font-semibold text-ink-900">{passport.holderName}</dd>
          <dt className="text-ink-900/55">{REVIEW_SCREEN.fieldLabel.number}</dt>
          <dd className="font-mono text-ink-900">{passport.number}</dd>
          <dt className="text-ink-900/55">{REVIEW_SCREEN.fieldLabel.issueDate}</dt>
          <dd className="font-mono text-ink-900/80">{passport.issueDate}</dd>
          <dt className="text-ink-900/55">{REVIEW_SCREEN.fieldLabel.expiryDate}</dt>
          <dd className="font-mono text-ink-900/80">{passport.expiryDate}</dd>
          <dt className="text-ink-900/55">{REVIEW_SCREEN.fieldLabel.route}</dt>
          <dd className="text-ink-900/80">{passport.route}</dd>
          <dt className="text-ink-900/55">{REVIEW_SCREEN.fieldLabel.photo}</dt>
          <dd className={flagPhoto ? 'font-semibold text-danger' : 'text-ink-900/80'}>
            {applicant.photoMatch
              ? PASSPORT_COPY.photoMatch
              : hintsEnabled
                ? PASSPORT_COPY.photoMismatch
                : PASSPORT_COPY.photoPending}
          </dd>
        </dl>
      </div>

      <footer className="mt-3 flex items-end justify-between border-t border-ink-900/25 pt-2">
        <div className="text-[10px] text-ink-900/55">
          <p>{REVIEW_SCREEN.fieldLabel.seal}</p>
          <p className="mt-0.5 font-mono text-[10px] text-ink-900/80">{passport.sealText}</p>
        </div>
        {passport.stampType === 'missing' ? (
          <span className="text-[10px] text-danger">{PASSPORT_COPY.noStamp}</span>
        ) : (
          <Stamp
            type={sealTone}
            text={passport.stampType === 'smudged' ? PASSPORT_COPY.smudged : PASSPORT_COPY.entry}
            small
          />
        )}
      </footer>

      {passport.stampType === 'smudged' && (
        <div className="pointer-events-none absolute inset-0 rounded-sm bg-ink-900/5" />
      )}

      {verdictStamp && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-rise">
            <Stamp type={verdictStamp.type} text={verdictStamp.text} />
          </div>
        </div>
      )}
    </article>
  )
}
