/**
 * 用途：申请人侧栏——立绘 + 三个固定问题按钮 + 回答区。
 * 输入：申请人、已问问题、提问回调。输出：左侧交互面板。
 * 依赖：@/components/Panel, @/constants/copy, @/types
 */
import Panel from '@/components/Panel'
import { APPLICANT_COPY, QUESTION_LABEL, REVIEW_SCREEN } from '@/constants/copy'
import type { Applicant, DialogueLine } from '@/types'
import { asset } from '@/utils/asset'

interface ApplicantWindowProps {
  applicant: Applicant
  asked: string[]
  onAsk: (line: DialogueLine) => void
}

export const QUESTION_KEYS = [
  { key: QUESTION_LABEL.codeName, label: QUESTION_LABEL.codeName },
  { key: QUESTION_LABEL.intent, label: QUESTION_LABEL.intent },
  { key: QUESTION_LABEL.recommender, label: QUESTION_LABEL.recommender },
] as const

export default function ApplicantWindow({ applicant, asked, onAsk }: ApplicantWindowProps) {
  const replies = applicant.dialogue.filter((line) => asked.includes(line.question))

  return (
    <Panel
      title={REVIEW_SCREEN.dialogue}
      className="h-full"
      extra={
        <span
          className={[
            'font-mono text-[10px] tracking-widest text-gold-300/50',
            applicant.scrambled ? 'animate-pulse text-danger/80' : '',
          ].join(' ')}
        >
          {applicant.codeName}
        </span>
      }
    >
      <div className="flex gap-3">
        <div
          className={[
            'relative h-28 w-24 shrink-0 overflow-hidden rounded-sm border bg-ink-800',
            applicant.scrambled ? 'animate-glitch border-danger/60' : 'border-gold-500/30',
          ].join(' ')}
        >
          <img
            src={asset(`assets/portraits/${applicant.portrait}`)}
            alt={applicant.codeName}
            className="h-full w-full object-cover"
          />
        </div>
        <dl className="grid flex-1 grid-cols-2 content-start gap-x-2 gap-y-1.5 text-[11px]">
          <dt className="text-gold-300/50">{APPLICANT_COPY.race}</dt>
          <dd className="text-gold-300">{applicant.race}</dd>
          <dt className="text-gold-300/50">{APPLICANT_COPY.origin}</dt>
          <dd className="text-gold-300">{applicant.origin}</dd>
          <dt className="text-gold-300/50">{APPLICANT_COPY.occupation}</dt>
          <dd className="text-gold-300">{applicant.occupation}</dd>
        </dl>
      </div>

      <div className="mt-3 flex gap-2">
        {QUESTION_KEYS.map((q) => {
          const line = applicant.dialogue.find((d) => d.question === q.key)
          const disabled = !line || asked.includes(q.key)
          return (
            <button
              key={q.key}
              type="button"
              disabled={disabled}
              onClick={() => line && onAsk(line)}
              className={[
                'flex-1 rounded-sm border px-2 py-1.5 text-xs transition-colors',
                disabled
                  ? 'cursor-not-allowed border-ink-600/70 bg-ink-700/40 text-gold-300/45'
                  : 'border-gold-500/40 text-gold-300 hover:border-gold-500 hover:bg-gold-500/10',
              ].join(' ')}
            >
              {disabled ? `${q.label} · ${REVIEW_SCREEN.asked}` : q.label}
            </button>
          )
        })}
      </div>

      <div className="mt-3 min-h-24 space-y-2 border-t border-gold-500/15 pt-3">
        {replies.length === 0 && (
          <p className="text-[11px] leading-relaxed text-gold-300/40">{APPLICANT_COPY.idle}</p>
        )}
        {replies.map((line) => (
          <div key={line.question} className="animate-rise">
            <p className="text-[10px] tracking-widest text-gold-500/60">
              {APPLICANT_COPY.questionPrefix}
              {line.question}
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-gold-300/90">「{line.answer}」</p>
          </div>
        ))}
      </div>
    </Panel>
  )
}
