/**
 * 用途：审查台顶部站台信息条——站名、值班号、当前队列。
 * 输入：天数、当前序号、总人数。输出：页头左半边。
 * 依赖：@/components/DayHeader, @/constants/copy
 */
import DayHeader from '@/components/DayHeader'
import { APP_SUBTITLE, STATION_COPY } from '@/constants/copy'

interface StationHeaderProps {
  day: number
  slotIndex: number
  total: number
}

export default function StationHeader({ day, slotIndex, total }: StationHeaderProps) {
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-3 border-r border-gold-500/20 pr-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/50">
          <span className="h-2.5 w-2.5 rounded-full bg-danger" />
        </span>
        <div className="leading-tight">
          <p className="font-mono text-[9px] tracking-[0.35em] text-gold-500/70">{APP_SUBTITLE}</p>
          <p className="text-sm font-semibold tracking-[0.2em] text-gold-300">{STATION_COPY.name}</p>
        </div>
      </div>
      <DayHeader day={day} slotIndex={slotIndex} total={total} />
    </div>
  )
}
