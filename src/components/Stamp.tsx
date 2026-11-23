/**
 * 用途：印章视觉（批准/拒绝/伪造三种），用于证件与动作反馈。
 * 输入：类型、文字。输出：旋转的印章方块。
 * 依赖：无
 */
interface StampProps {
  type: 'approve' | 'reject' | 'forged'
  text: string
  /** 小号用于证件角标 */
  small?: boolean
}

const STYLE = {
  approve: 'border-trust text-trust',
  reject: 'border-danger text-danger',
  forged: 'border-gold-500 text-gold-500',
} as const

export default function Stamp({ type, text, small = false }: StampProps) {
  return (
    <div
      className={[
        'inline-flex select-none items-center justify-center border-2 uppercase tracking-widest',
        small ? 'px-2 py-0.5 text-[10px]' : 'px-4 py-1.5 text-sm',
        '-rotate-6 opacity-90',
        STYLE[type],
      ].join(' ')}
    >
      {text}
    </div>
  )
}
