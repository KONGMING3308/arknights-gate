/**
 * 用途：每天的结算页——当日处置记录与数值变化。
 * 输入：store 中的记录与数值。输出：结算界面。
 * 依赖：react-router-dom, store, @/constants/copy
 */
import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import { DAY_END, RESULT_TEXT } from '@/constants/copy'
import { UNLOCKED_DAYS } from '@/constants/game'
import { useGameStore } from '@/store/gameStore'

export default function DayEndScreen() {
  const navigate = useNavigate()
  const day = useGameStore((s) => s.day)
  const records = useGameStore((s) => s.records)
  const safety = useGameStore((s) => s.safety)
  const trust = useGameStore((s) => s.trust)
  const goNextDay = useGameStore((s) => s.goNextDay)

  const todayRecords = records.filter((r) => r.day === day)
  const correct = todayRecords.filter((r) => r.correct).length
  const isLastDay = day >= UNLOCKED_DAYS

  const handleNext = () => {
    goNextDay()
    navigate(isLastDay ? '/ending' : '/review')
  }

  return (
    <main className="flex min-h-full items-center justify-center bg-ink-900 px-6 py-12">
      <div className="w-full max-w-xl">
        <p className="font-mono text-[11px] tracking-[0.4em] text-gold-500/70">
          {DAY_END.kicker} {day}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-widest text-gold-300">{DAY_END.title}</h1>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-sm border border-safety/30 bg-safety/5 p-4">
            <p className="text-[11px] tracking-[0.3em] text-safety/75">{DAY_END.safety}</p>
            <p className="mt-1 font-mono text-3xl text-safety">{safety}</p>
          </div>
          <div className="rounded-sm border border-trust/30 bg-trust/5 p-4">
            <p className="text-[11px] tracking-[0.3em] text-trust/75">{DAY_END.trust}</p>
            <p className="mt-1 font-mono text-3xl text-trust">{trust}</p>
          </div>
        </div>

        <section className="mt-6">
          <h2 className="mb-2 text-[11px] uppercase tracking-[0.3em] text-gold-500/60">
            {DAY_END.records}
          </h2>
          <ul className="divide-y divide-gold-500/10 border-y border-gold-500/10">
            {todayRecords.map((r) => (
              <li key={r.applicantId} className="flex items-center justify-between py-2 text-xs">
                <span className="text-gold-300/90">{r.codeName}</span>
                <span className="flex items-center gap-3">
                  <span className="text-gold-300/50">{RESULT_TEXT[r.action]}</span>
                  <span className={r.correct ? 'text-trust' : 'text-danger'}>
                    {r.correct ? RESULT_TEXT.correct : RESULT_TEXT.wrong}
                  </span>
                </span>
              </li>
            ))}
            {todayRecords.length === 0 && (
              <li className="py-3 text-xs text-gold-300/40">{DAY_END.noVisitor}</li>
            )}
          </ul>
          <p className="mt-2 text-xs text-gold-300/70">
            {DAY_END.summaryPrefix} {todayRecords.length} {DAY_END.summaryMiddle} {correct}{' '}
            {DAY_END.summarySuffix}
          </p>
        </section>

        <div className="mt-8">
          <Button variant="primary" onClick={handleNext} className="px-8 py-3">
            {isLastDay ? DAY_END.final : DAY_END.next}
          </Button>
        </div>
      </div>
    </main>
  )
}
