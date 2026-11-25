/**
 * 用途：审查页页头——站台 / 天数进度 / 新手提示开关 / 安全度与信任度。
 *       手机分两行（站台 / 开关+数值条），md 起并成一行。
 * 输入：审查进度、数值、提示开关状态。输出：响应式页头。
 * 依赖：StatBar, StationHeader, @/constants/copy
 */
import StatBar from '@/components/StatBar'
import { HINT_LABEL, REVIEW_SCREEN } from '@/constants/copy'
import StationHeader from './StationHeader'

interface ReviewHeaderProps {
  day: number
  slotIndex: number
  total: number
  safety: number
  trust: number
  hintsEnabled: boolean
  onToggleHints: () => void
}

export default function ReviewHeader({
  day,
  slotIndex,
  total,
  safety,
  trust,
  hintsEnabled,
  onToggleHints,
}: ReviewHeaderProps) {
  return (
    <header className="border-b border-gold-500/20 bg-ink-800/40">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-2 px-3 py-2 md:px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-5 lg:py-2.5">
        <StationHeader day={day} slotIndex={slotIndex} total={total} />
        <div className="flex items-center justify-between gap-3 lg:justify-end lg:gap-5">
          <button
            type="button"
            onClick={onToggleHints}
            className={[
              'flex shrink-0 items-center gap-2 rounded-sm border px-2.5 py-1 text-[11px] transition-colors',
              hintsEnabled
                ? 'border-gold-500/60 bg-gold-500/10 text-gold-300'
                : 'border-ink-600 text-gold-300/40',
            ].join(' ')}
            title={HINT_LABEL.master}
          >
            <span
              className={[
                'flex h-3.5 w-3.5 items-center justify-center rounded-[2px] border text-[9px]',
                hintsEnabled ? 'border-gold-500 bg-gold-500 text-ink-900' : 'border-ink-600',
              ].join(' ')}
            >
              {hintsEnabled ? '✓' : ''}
            </span>
            {HINT_LABEL.toggle}
          </button>
          <div className="flex flex-1 items-center gap-3 md:flex-none md:gap-5">
            <StatBar
              label={REVIEW_SCREEN.safety}
              value={safety}
              tone="safety"
              className="md:w-40 md:flex-none"
            />
            <StatBar
              label={REVIEW_SCREEN.trust}
              value={trust}
              tone="trust"
              className="md:w-40 md:flex-none"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
