/**
 * 用途：顶部天数与进度条。
 * 输入：天数、当前序号、当日总人数。输出：页头条。
 * 依赖：@/constants/copy
 */
import { REVIEW_SCREEN } from '@/constants/copy'

interface DayHeaderProps {
  day: number
  slotIndex: number
  total: number
}

export default function DayHeader({ day, slotIndex, total }: DayHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="font-mono text-sm tracking-[0.3em] text-gold-400">
        {REVIEW_SCREEN.dayPrefix} {day} {REVIEW_SCREEN.daySuffix}
      </div>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={[
              'h-1.5 w-6 rounded-sm',
              i < slotIndex ? 'bg-gold-500/70' : i === slotIndex ? 'bg-gold-300' : 'bg-ink-600',
            ].join(' ')}
          />
        ))}
      </div>
      <div className="text-[11px] tracking-widest text-gold-300/60">
        {REVIEW_SCREEN.slotPrefix} {Math.min(slotIndex + 1, total)} / {total}
      </div>
    </div>
  )
}
