/**
 * 用途：审查台的键盘快捷键（1 批准 / 2 拒绝）。射击系统已移除。
 * 输入：动作回调与启用状态。输出：无（只绑定事件）。
 * 依赖：react
 */
import { useEffect } from 'react'

interface HotkeysOptions {
  enabled: boolean
  onApprove: () => void
  onReject: () => void
}

export function useHotkeys({ enabled, onApprove, onReject }: HotkeysOptions): void {
  useEffect(() => {
    if (!enabled) return

    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && /^(INPUT|TEXTAREA)$/.test(target.tagName)) return

      switch (event.key) {
        case '1':
          onApprove()
          break
        case '2':
          onReject()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [enabled, onApprove, onReject])
}
