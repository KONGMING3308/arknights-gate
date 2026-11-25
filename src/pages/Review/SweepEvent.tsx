/**
 * 用途：被拒绝的入侵者「突脸」事件——手剪影不断伸向屏幕，玩家连点「呼叫 S.W.E.E.P.」求援。
 * 输入：袭击者、完成后回调（是否及时呼叫成功）。
 * 输出：全屏事件层；成功展示阿斯卡纶处决通告，失败显示失守。
 * 依赖：react, @/constants/copy, @/constants/game
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { SWEEP } from '@/constants/game'
import { SWEEP_COPY } from '@/constants/copy'
import type { Applicant } from '@/types'
import { asset } from '@/utils/asset'

interface SweepEventProps {
  attacker: Applicant
  onResolved: (success: boolean) => void
}

/** 多只手的分布（静态 class，避免运行时拼样式） */
const HANDS = [
  { cls: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-[46%] rotate-0 scale-100', delay: '0s' },
  { cls: 'left-[12%] top-[18%] -translate-x-1/2 -translate-y-1/2 -rotate-[28deg] scale-75', delay: '0.6s' },
  { cls: 'right-[10%] top-[26%] translate-x-1/2 -translate-y-1/2 rotate-[24deg] scale-2/3', delay: '1.2s' },
  { cls: 'left-[24%] bottom-[6%] -translate-x-1/2 rotate-[16deg] scale-90', delay: '0.3s' },
]

export default function SweepEvent({ attacker, onResolved }: SweepEventProps) {
  const [taps, setTaps] = useState(0)
  const [result, setResult] = useState<'success' | 'fail' | null>(null)
  const doneRef = useRef(false)
  const timerRef = useRef<number | null>(null)

  const finish = useCallback(
    (ok: boolean) => {
      if (doneRef.current) return
      doneRef.current = true
      if (timerRef.current) window.clearTimeout(timerRef.current)
      setResult(ok ? 'success' : 'fail')
      window.setTimeout(() => onResolved(ok), ok ? 2600 : 1400)
    },
    [onResolved],
  )

  // 超时未呼叫成功 → 失守
  useEffect(() => {
    timerRef.current = window.setTimeout(() => finish(false), SWEEP.duration)
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [finish])

  const tap = () => {
    if (doneRef.current || result) return
    setTaps((prev) => {
      const next = prev + 1
      if (next >= SWEEP.taps) finish(true)
      return next
    })
  }

  const progress = Math.min(1, taps / SWEEP.taps)

  return (
    <div className="fixed inset-0 z-[120] select-none overflow-hidden bg-[#05070a]">
      {/* 血色雾气 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(232,72,60,0.26),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_22%,rgba(0,0,0,0.92)_100%)]" />

      {/* 不断伸向屏幕的手 */}
      {HANDS.map((hand) => (
        <img
          key={hand.cls}
          src={asset('assets/events/reaching_hand.png')}
          alt=""
          className={`pointer-events-none absolute h-[54vh] w-auto animate-reach opacity-80 sm:h-[70vh] ${hand.cls}`}
          style={{ animationDelay: hand.delay }}
        />
      ))}

      {result === 'fail' && <div className="pointer-events-none absolute inset-0 animate-flash bg-danger/50" />}

      {/* 成功：阿斯卡纶登场 */}
      {result === 'success' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#05070a]/92">
          <img
            src={asset('assets/events/ascalon.png')}
            alt="阿斯卡纶"
            className="absolute bottom-0 left-1/2 h-[80vh] w-auto -translate-x-1/2 object-contain opacity-95 mix-blend-screen sm:h-[92vh]"
          />
          <div className="relative z-10 mx-4 max-w-lg animate-rise rounded-sm border border-gold-500/40 bg-ink-900/85 px-5 py-5 text-center shadow-panel sm:mx-6 sm:px-8 sm:py-6">
            <p className="font-mono text-[10px] tracking-[0.4em] text-gold-500/70">S.W.E.E.P.</p>
            <p className="mt-3 text-lg font-semibold tracking-widest text-gold-300">
              {SWEEP_COPY.successTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gold-300/70">{SWEEP_COPY.successBody}</p>
          </div>
        </div>
      )}

      {/* 失败 */}
      {result === 'fail' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#05070a]/90">
          <div className="animate-rise px-4 text-center">
            <p className="text-lg font-semibold tracking-widest text-danger">{SWEEP_COPY.failTitle}</p>
            <p className="mt-2 text-sm text-gold-300/60">{SWEEP_COPY.failBody}</p>
          </div>
        </div>
      )}

      {/* HUD：进度与呼叫按钮 */}
      {!result && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 px-4 py-4 sm:px-6 sm:py-5">
            <p className="animate-pulse text-center font-mono text-sm tracking-[0.35em] text-danger">
              {SWEEP_COPY.alert}
            </p>
            <p className="mt-1 text-center font-mono text-[10px] tracking-[0.25em] text-gold-300/45">
              {attacker.codeName}
            </p>
            <div className="mx-auto mt-3 h-1 w-56 overflow-hidden rounded-full bg-white/10 sm:w-64">
              <div
                className="h-full rounded-full bg-danger transition-all duration-150"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-16 flex flex-col items-center">
            <button
              type="button"
              onClick={tap}
              className="animate-pulseRing rounded-sm border-2 border-danger bg-danger/15 px-8 py-3.5 text-base font-bold tracking-[0.2em] text-danger transition-transform active:scale-95 sm:px-10 sm:py-4 sm:text-lg"
            >
              {SWEEP_COPY.call}
            </button>
            <p className="mt-3 font-mono text-[10px] tracking-[0.3em] text-gold-300/45">
              {SWEEP_COPY.tapHint} {taps}/{SWEEP.taps}
            </p>
          </div>
        </>
      )}
    </div>
  )
}
