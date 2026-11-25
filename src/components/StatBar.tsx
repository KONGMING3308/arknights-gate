/**
 * 用途：安全度 / 信任度数值条。
 * 输入：标签、当前值、色调、额外宽度类。输出：带数值的横向进度条。
 * 依赖：无（宽度用静态 Tailwind 档位，避免内联 style）
 */
interface StatBarProps {
  label: string
  value: number
  tone: 'safety' | 'trust'
  /** 宽度由调用方控制：手机铺满、桌面固定宽度 */
  className?: string
}

const TONE = {
  safety: { bar: 'bg-safety', text: 'text-safety' },
  trust: { bar: 'bg-trust', text: 'text-trust' },
} as const

/** 每 5% 一档，共 21 档，全部写成静态 class 以便 Tailwind 提取 */
const WIDTH_STEPS = [
  'w-[0%]',
  'w-[5%]',
  'w-[10%]',
  'w-[15%]',
  'w-[20%]',
  'w-[25%]',
  'w-[30%]',
  'w-[35%]',
  'w-[40%]',
  'w-[45%]',
  'w-[50%]',
  'w-[55%]',
  'w-[60%]',
  'w-[65%]',
  'w-[70%]',
  'w-[75%]',
  'w-[80%]',
  'w-[85%]',
  'w-[90%]',
  'w-[95%]',
  'w-[100%]',
] as const

export default function StatBar({ label, value, tone, className = '' }: StatBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const step = Math.round(clamped / 5)
  const style = TONE[tone]
  return (
    <div className={['min-w-0 flex-1', className].filter(Boolean).join(' ')}>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="truncate text-[10px] tracking-widest text-gold-300/70 sm:text-[11px]">
          {label}
        </span>
        <span className={`font-mono text-xs sm:text-sm ${style.text}`}>{clamped}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-600">
        <div
          className={`h-full rounded-full transition-all duration-500 ${style.bar} ${WIDTH_STEPS[step]}`}
        />
      </div>
    </div>
  )
}
