/**
 * 用途：结局页——展示评级与最终数值，支持重开。
 * 输入：store 中的数值与记录。输出：结局界面。
 * 依赖：react-router-dom, store, @/constants/game, @/constants/copy
 */
import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import { ENDING, FAIL_TEXT } from '@/constants/copy'
import { RATING_THRESHOLDS } from '@/constants/game'
import { useGameStore } from '@/store/gameStore'
import { computeGrade } from '@/utils/verdict'

export default function EndingScreen() {
  const navigate = useNavigate()
  const safety = useGameStore((s) => s.safety)
  const trust = useGameStore((s) => s.trust)
  const records = useGameStore((s) => s.records)
  const reset = useGameStore((s) => s.reset)

  const total = safety + trust
  const grade = computeGrade(total, RATING_THRESHOLDS)
  const failed = safety <= 0 || trust <= 0
  const failReason = safety <= 0 ? FAIL_TEXT.safety : trust <= 0 ? FAIL_TEXT.trust : null
  const correct = records.filter((r) => r.correct).length

  const handleRestart = () => {
    reset()
    navigate('/')
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-ink-900 px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-xl text-center">
        <p className="font-mono text-[11px] tracking-[0.4em] text-gold-500/70">{ENDING.kicker}</p>
        <h1 className="mt-2 text-2xl font-bold tracking-widest text-gold-300 sm:text-3xl">{ENDING.title}</h1>

        {failed ? (
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-danger/90">{failReason}</p>
        ) : (
          <div className="mt-6">
            <p className="text-[11px] tracking-[0.4em] text-gold-500/60">{ENDING.grade}</p>
            <p className="font-mono text-6xl text-gold-300 sm:text-7xl">{grade}</p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-2 text-left sm:gap-3">
          <div className="rounded-sm border border-safety/30 bg-safety/5 p-3 sm:p-4">
            <p className="text-[11px] tracking-[0.3em] text-safety/75">{ENDING.safety}</p>
            <p className="mt-1 font-mono text-2xl text-safety">{safety}</p>
          </div>
          <div className="rounded-sm border border-trust/30 bg-trust/5 p-3 sm:p-4">
            <p className="text-[11px] tracking-[0.3em] text-trust/75">{ENDING.trust}</p>
            <p className="mt-1 font-mono text-2xl text-trust">{trust}</p>
          </div>
        </div>

        <p className="mt-4 text-xs text-gold-300/70">
          {ENDING.summaryPrefix} {records.length} {ENDING.summaryMiddle} {correct}{' '}
          {ENDING.summarySuffix}
        </p>

        <div className="mt-8 flex justify-center">
          <Button variant="primary" onClick={handleRestart} className="px-8 py-3">
            {ENDING.restart}
          </Button>
        </div>
      </div>
    </main>
  )
}
