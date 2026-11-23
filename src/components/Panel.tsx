/**
 * 用途：通用面板容器（带标题与细线框）。
 * 输入：标题、动作区、内容。输出：卡片容器。
 * 依赖：无
 */
import type { ReactNode } from 'react'

interface PanelProps {
  title?: string
  extra?: ReactNode
  children: ReactNode
  className?: string
  tone?: 'dark' | 'paper'
}

export default function Panel({ title, extra, children, className = '', tone = 'dark' }: PanelProps) {
  return (
    <section
      className={[
        'relative flex flex-col overflow-hidden rounded-sm shadow-panel',
        tone === 'paper' ? 'paper text-ink-900' : 'paper-dark text-ink-900 hairline',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {(title || extra) && (
        <header className="flex items-center justify-between border-b border-gold-500/20 px-3 py-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{title}</h2>
          {extra}
        </header>
      )}
      <div className="min-h-0 flex-1 overflow-auto p-3">{children}</div>
    </section>
  )
}
