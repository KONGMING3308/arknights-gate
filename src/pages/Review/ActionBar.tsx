/**
 * 用途：底部处置栏——批准 / 拒绝两个动作，附快捷键提示与即时反馈。
 *       （射击系统已移除，不再有「拔枪」按钮）
 * 输入：是否禁用、回调、上一处置结果。输出：动作栏。
 * 依赖：@/components/Button, @/constants/copy, @/store/gameStore
 */
import Button from '@/components/Button'
import { ACTION_BAR_DELTA, ACTION_BAR_HINT, ACTION_LABEL, RESULT_TEXT } from '@/constants/copy'
import type { LastOutcome } from '@/store/gameStore'

interface ActionBarProps {
  disabled: boolean
  onApprove: () => void
  onReject: () => void
  outcome: LastOutcome | null
}

function KeyHint({ k }: { k: string }) {
  return (
    <span className="ml-2 rounded border border-current px-1 font-mono text-[10px] opacity-50">{k}</span>
  )
}

export default function ActionBar({ disabled, onApprove, onReject, outcome }: ActionBarProps) {
  return (
    <div className="flex items-center gap-3 border-t border-gold-500/20 bg-ink-800/90 px-5 py-3">
      <div className="flex flex-1 items-center gap-2">
        <Button
          variant="primary"
          disabled={disabled}
          onClick={onApprove}
          className="shrink-0 whitespace-nowrap py-2.5"
        >
          {ACTION_LABEL.approve}
          <KeyHint k="1" />
        </Button>
        <Button
          variant="ghost"
          disabled={disabled}
          onClick={onReject}
          className="shrink-0 whitespace-nowrap py-2.5"
        >
          {ACTION_LABEL.reject}
          <KeyHint k="2" />
        </Button>
      </div>

      <p className="hidden font-mono text-[10px] tracking-widest text-gold-300/30 2xl:block">
        {ACTION_BAR_HINT}
      </p>

      <div className="flex shrink-0 items-center justify-end gap-4">
        {outcome && (
          <div className="animate-rise text-right text-[11px] leading-tight">
            <p className={outcome.correct ? 'text-trust' : 'text-danger'}>
              {outcome.correct ? RESULT_TEXT.correct : RESULT_TEXT.wrong} ·{' '}
              {RESULT_TEXT[outcome.action]}
            </p>
            <p className="font-mono text-gold-300/60">
              {outcome.safetyDelta !== 0 &&
                `${ACTION_BAR_DELTA.safety} ${outcome.safetyDelta > 0 ? '+' : ''}${outcome.safetyDelta} `}
              {outcome.trustDelta !== 0 &&
                `${ACTION_BAR_DELTA.trust} ${outcome.trustDelta > 0 ? '+' : ''}${outcome.trustDelta}`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
