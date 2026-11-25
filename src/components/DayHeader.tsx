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
    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
      <div className="whitespace-nowrap font-mono text-xs tracking-[0.2em] text-gold-400 sm:text-sm sm:tracking-[0.3em]">
        {REVIEW_SCREEN.dayPrefix} {day} {REVIEW_SCREEN.daySuffix}
      </div>
      {/* 进度点占宽较多，手机改为直接看「待审 x / y」 */}
      <div className="hidden items-center gap-1.5 sm:flex">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={[
              'h-1.5 w-4 rounded-sm sm:w-6',
              i < slotIndex ? 'bg-gold-500/70' : i === slotIndex ? 'bg-gold-300' : 'bg-ink-600',
            ].join(' ')}
          />
        ))}
      </div>
      <div className="whitespace-nowrap text-[10px] tracking-widest text-gold-300/60 sm:text-[11px]">
        {REVIEW_SCREEN.slotPrefix} {Math.min(slotIndex + 1, total)} / {total}
      </div>
    </div>
  )
}
