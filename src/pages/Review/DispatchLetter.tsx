/**
 * 用途：派遣函——桌上的第二份纸面材料，提供「来意 / 推荐人」的书面版本，供与对话比对。
 *       担保人不在在册名录时，函面直接打上失效标记（对应「担保人一并追责」的规则）。
 * 输入：申请人。输出：派遣函纸片。
 * 依赖：@/constants/copy, @/constants/registry, @/types
 */
import { DISPATCH_COPY } from '@/constants/copy'
import { isRegisteredRecommender } from '@/constants/registry'
import type { Applicant } from '@/types'

interface DispatchLetterProps {
  applicant: Applicant
  /** 新手提示开关：关闭时不显示「担保失效」红条 */
  hintsEnabled?: boolean
}

export default function DispatchLetter({ applicant, hintsEnabled = true }: DispatchLetterProps) {
  const sponsorValid = isRegisteredRecommender(applicant.recommender)
  const showWarning = hintsEnabled && !sponsorValid

  return (
    <article className="relative -rotate-1 rounded-sm border border-ink-900/20 bg-[linear-gradient(165deg,#e8dfc8_0%,#ded3b6_100%)] p-3 text-ink-900 shadow-seal">
      <header className="mb-2 flex items-baseline justify-between border-b border-ink-900/25 pb-1">
        <h3 className="text-[11px] font-bold tracking-[0.2em]">{DISPATCH_COPY.title}</h3>
        <span className="font-mono text-[10px] text-ink-900/45">{DISPATCH_COPY.form}</span>
      </header>

      <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-[11px] leading-snug">
        <dt className="text-ink-900/55">{DISPATCH_COPY.target}</dt>
        <dd className="font-semibold">{applicant.codeName}</dd>
        <dt className="text-ink-900/55">{DISPATCH_COPY.intent}</dt>
        <dd>{applicant.intent}</dd>
        <dt className="text-ink-900/55">{DISPATCH_COPY.recommender}</dt>
        <dd className={showWarning ? 'font-semibold text-danger' : ''}>
          {applicant.recommender}
        </dd>
      </dl>

      {showWarning && (
        <p className="mt-2 border-l-2 border-danger bg-danger/10 px-2 py-1 text-[10px] font-semibold tracking-wide text-danger">
          {DISPATCH_COPY.invalid}
        </p>
      )}

      <footer className="mt-2 flex items-end justify-between border-t border-ink-900/20 pt-1.5">
        <p className="max-w-[70%] text-[9px] leading-tight text-ink-900/45">{DISPATCH_COPY.note}</p>
        <span className="font-serif text-[10px] italic text-ink-900/50">{DISPATCH_COPY.sign}</span>
      </footer>
    </article>
  )
}
