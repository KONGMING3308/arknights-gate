/**
 * 用途：通用按钮。
 * 输入：variant/尺寸/禁用/点击。输出：按钮元素。
 * 依赖：无
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'danger' | 'ghost' | 'paper'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
  block?: boolean
}

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    'bg-gold-500 text-ink-900 hover:bg-gold-400 active:translate-y-px font-semibold tracking-wide',
  danger: 'bg-danger text-white hover:brightness-110 active:translate-y-px font-semibold tracking-wide',
  ghost:
    'bg-transparent text-gold-300 border border-gold-500/40 hover:border-gold-500 hover:bg-gold-500/10',
  paper:
    'bg-gold-500/15 text-gold-300 border border-gold-500/60 hover:bg-gold-500/25 hover:border-gold-500',
}

export default function Button({
  variant = 'primary',
  block = false,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={[
        'rounded-sm px-4 py-2 text-sm transition-colors duration-150',
        'disabled:cursor-not-allowed disabled:opacity-40',
        VARIANT_CLASS[variant],
        block ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
