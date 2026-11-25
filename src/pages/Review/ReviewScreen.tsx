/**
 * 用途：核心审查界面——三栏布局 + 处置 + 突脸求援事件，负责把数据流串起来。
 *       响应式：手机单列分段（申请人 / 证件 / 档案），md 两栏，lg 起经典三栏。
 * 输入：store 中的天数/进度/数值。输出：可交互的审查台。
 * 依赖：react-router-dom, store, api, hooks, 子组件
 */
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROSTER_SIZE } from '@/constants/game'
import { REVIEW_SCREEN } from '@/constants/copy'
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
import ReviewHeader from './ReviewHeader'
import ReviewTabs, { type ReviewTab } from './ReviewTabs'
import SweepEvent from './SweepEvent'

/** 手机端只显示当前分段；md 起三块全部显示 */
const panelVisibility = (active: ReviewTab, own: ReviewTab) =>
  active === own ? 'min-h-0' : 'hidden min-h-0 md:tall:block'

/** 手机单列 → md 证件在左、申请人与档案在右 → lg 起经典三栏 */
const GRID_CLASS = [
  'mx-auto grid w-full max-w-[1800px] min-h-0 flex-1 grid-cols-1 gap-3 bg-ink-900 p-3',
  'md:tall:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]',
  'xl:tall:grid-cols-[330px_minmax(0,1fr)_360px] 2xl:tall:grid-cols-[380px_minmax(0,1fr)_420px]',
].join(' ')

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
  const [tab, setTab] = useState<ReviewTab>('applicant')

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
      <main className="flex min-h-dvh items-center justify-center bg-ink-900 text-sm text-gold-300/50">
        {REVIEW_SCREEN.loadingRoster}
      </main>
    )
  }

  return (
    <main className="flex min-h-dvh flex-col bg-ink-900 md:tall:h-dvh md:tall:overflow-hidden">
      <ReviewHeader
        day={day}
        slotIndex={slotIndex}
        total={total}
        safety={safety}
        trust={trust}
        hintsEnabled={hintsEnabled}
        onToggleHints={toggleHints}
      />
      <ReviewTabs value={tab} onChange={setTab} />

      <div className={GRID_CLASS}>
        <div className={[panelVisibility(tab, 'documents'), 'md:tall:col-start-1'].join(' ')}>
          <DocumentTray
            applicant={applicant}
            passport={passport}
            verdict={verdictOf(applicant)}
            hintsEnabled={hintsEnabled}
          />
        </div>

        {/* 手机端 contents 回到单列分段；md 右列竖排两块各自滚动；xl 拆回三栏 */}
        <div className="contents md:tall:col-start-2 md:tall:flex md:tall:min-h-0 md:tall:flex-col md:tall:gap-3 xl:tall:contents">
          <div className={[panelVisibility(tab, 'applicant'), 'md:tall:min-h-0 md:tall:flex-1'].join(' ')}>
            <ApplicantWindow applicant={applicant} asked={asked} onAsk={handleAsk} />
          </div>
          <div className={[panelVisibility(tab, 'dossier'), 'md:tall:min-h-0 md:tall:flex-1'].join(' ')}>
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
        </div>
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
