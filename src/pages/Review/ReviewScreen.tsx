/**
 * 用途：核心审查界面——三栏布局 + 处置 + 突脸求援事件，负责把数据流串起来。
 * 输入：store 中的天数/进度/数值。输出：可交互的审查台。
 * 依赖：react-router-dom, store, api, hooks, 子组件
 */
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatBar from '@/components/StatBar'
import { ROSTER_SIZE } from '@/constants/game'
import { HINT_LABEL, REVIEW_SCREEN } from '@/constants/copy'
import { useHotkeys } from '@/hooks/useHotkeys'
import { useDiscrepancies } from '@/hooks/useDiscrepancies'
import { useVerdictFlow } from '@/hooks/useVerdictFlow'
import { useGameStore } from '@/store/gameStore'
import type { Applicant, Dossier, DialogueLine, Passport } from '@/types'
import { playTick } from '@/utils/audio'
import { fetchDayRoster, fetchDossier, fetchPassport, submitVerdict } from '@/api/gameApi'
import ActionBar from './ActionBar'
import ApplicantWindow from './ApplicantWindow'
import DocumentTray from './DocumentTray'
import DossierPanel from './DossierPanel'
import StationHeader from './StationHeader'
import SweepEvent from './SweepEvent'

export default function ReviewScreen() {
  const navigate = useNavigate()
  const day = useGameStore((s) => s.day)
  const slotIndex = useGameStore((s) => s.slotIndex)
  const safety = useGameStore((s) => s.safety)
  const trust = useGameStore((s) => s.trust)
  const phase = useGameStore((s) => s.phase)
  const hintsEnabled = useGameStore((s) => s.hintsEnabled)
  const toggleHints = useGameStore((s) => s.toggleHints)
  const lastOutcome = useGameStore((s) => s.lastOutcome)
  const applyVerdict = useGameStore((s) => s.applyVerdict)
  const advanceSlot = useGameStore((s) => s.advanceSlot)
  const penalize = useGameStore((s) => s.penalize)
  const startGame = useGameStore((s) => s.startGame)

  const [roster, setRoster] = useState<Applicant[]>([])
  const [passport, setPassport] = useState<Passport | null>(null)
  const [dossier, setDossier] = useState<Dossier | null>(null)
  const [asked, setAsked] = useState<string[]>([])
  const [loadingDossier, setLoadingDossier] = useState(false)

  const applicant = roster[slotIndex] ?? null
  const total = roster.length || ROSTER_SIZE[day]
  const discrepancies = useDiscrepancies(applicant, passport, dossier)
  const verdictOf = (target: Applicant) =>
    lastOutcome?.codeName === target.codeName ? lastOutcome.action : null

  // 名单长度会因「普瑞塞斯」随机插入而变化，推进时以实际长度为准
  const advance = useCallback(() => advanceSlot(roster.length), [advanceSlot, roster.length])
  const flow = useVerdictFlow({ applicant, applyVerdict, advanceSlot: advance, penalize, submitVerdict })

  useEffect(() => {
    let cancelled = false
    setRoster([])
    fetchDayRoster(day)
      .then((list) => {
        if (!cancelled) setRoster(list)
      })
      .catch(() => {
        if (!cancelled) setRoster([])
      })
    return () => {
      cancelled = true
    }
  }, [day])

  useEffect(() => {
    setDossier(null)
    setAsked([])
    setPassport(null)
    if (!applicant) return
    let cancelled = false
    fetchPassport(applicant.id)
      .then((p) => {
        if (!cancelled) setPassport(p)
      })
      .catch(() => {
        if (!cancelled) setPassport(null)
      })
    return () => {
      cancelled = true
    }
  }, [applicant])

  useEffect(() => {
    // 直接访问 /review（分享链接、刷新）时自动开局，而不是弹回标题页
    if (phase === 'title') startGame()
    if (phase === 'dayEnd') navigate('/day-end')
    if (phase === 'ending') navigate('/ending')
  }, [phase, navigate, startGame])

  const handleFetchDossier = useCallback(() => {
    if (!applicant) return
    playTick()
    setLoadingDossier(true)
    fetchDossier(applicant.codeName)
      .then(setDossier)
      .catch(() => setDossier(null))
      .finally(() => setLoadingDossier(false))
  }, [applicant])

  const handleAsk = (line: DialogueLine) => {
    playTick()
    setAsked((prev) => (prev.includes(line.question) ? prev : [...prev, line.question]))
  }

  useHotkeys({
    enabled: !!applicant && !flow.busy && !flow.sweep,
    onApprove: () => flow.settle('approve'),
    onReject: () => flow.settle('reject'),
  })

  if (!applicant) {
    return (
      <main className="flex min-h-full items-center justify-center bg-ink-900 text-sm text-gold-300/50">
        {REVIEW_SCREEN.loadingRoster}
      </main>
    )
  }

  return (
    <main className="flex min-h-full flex-col bg-ink-900">
      <header className="flex items-center justify-between border-b border-gold-500/20 bg-ink-800/40 px-5 py-3">
        <StationHeader day={day} slotIndex={slotIndex} total={total} />
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={toggleHints}
            className={[
              'flex items-center gap-2 rounded-sm border px-2.5 py-1 text-[11px] transition-colors',
              hintsEnabled
                ? 'border-gold-500/60 bg-gold-500/10 text-gold-300'
                : 'border-ink-600 text-gold-300/40',
            ].join(' ')}
            title={HINT_LABEL.master}
          >
            <span
              className={[
                'flex h-3.5 w-3.5 items-center justify-center rounded-[2px] border text-[9px]',
                hintsEnabled ? 'border-gold-500 bg-gold-500 text-ink-900' : 'border-ink-600',
              ].join(' ')}
            >
              {hintsEnabled ? '✓' : ''}
            </span>
            {HINT_LABEL.toggle}
          </button>
          <StatBar label={REVIEW_SCREEN.safety} value={safety} tone="safety" />
          <StatBar label={REVIEW_SCREEN.trust} value={trust} tone="trust" />
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[330px_1fr_360px] gap-3 bg-ink-900 p-3">
        <ApplicantWindow applicant={applicant} asked={asked} onAsk={handleAsk} />
        <DocumentTray
          applicant={applicant}
          passport={passport}
          verdict={verdictOf(applicant)}
          hintsEnabled={hintsEnabled}
        />
        <DossierPanel
          applicant={applicant}
          dossier={dossier}
          loading={loadingDossier}
          onFetch={handleFetchDossier}
          discrepancyCount={discrepancies.length}
          discrepancyFields={discrepancies.map((d) => d.field)}
          hintsEnabled={hintsEnabled}
          isAnomaly={applicant.kind === 'anomaly'}
        />
      </div>

      <ActionBar
        disabled={flow.busy}
        outcome={lastOutcome}
        onApprove={() => flow.settle('approve')}
        onReject={() => flow.settle('reject')}
      />

      {flow.sweep && <SweepEvent attacker={flow.sweep} onResolved={flow.resolveSweep} />}
    </main>
  )
}
