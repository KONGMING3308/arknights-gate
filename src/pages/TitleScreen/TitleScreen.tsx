/**
 * 用途：标题页。展示背景通告（凯尔希签发）、开始/继续、新手提示开关。
 * 输入：无。输出：标题界面。
 * 依赖：react-router-dom, @/store/gameStore, @/constants/copy, @/components/Button
 */
import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import { APP_SUBTITLE, APP_TITLE, FOOTER_TEXT, HINT_LABEL, TITLE_SCREEN } from '@/constants/copy'
import { useGameStore } from '@/store/gameStore'
import BriefingNotice from './BriefingNotice'

export default function TitleScreen() {
  const navigate = useNavigate()
  const startGame = useGameStore((s) => s.startGame)
  const resumeGame = useGameStore((s) => s.resumeGame)
  const hintsEnabled = useGameStore((s) => s.hintsEnabled)
  const toggleHints = useGameStore((s) => s.toggleHints)
  const phase = useGameStore((s) => s.phase)
  const hasSave = useGameStore((s) => s.records.length > 0 && s.phase !== 'ending')

  const handleStart = () => {
    startGame()
    navigate('/review')
  }

  const handleResume = () => {
    resumeGame()
    if (phase === 'dayEnd') navigate('/day-end')
    else navigate('/review')
  }

  return (
    <main className="flex min-h-full items-center justify-center bg-ink-900 px-6 py-12">
      <div className="w-full max-w-2xl">
        <p className="mb-3 font-mono text-[11px] tracking-[0.5em] text-gold-500/70">{APP_SUBTITLE}</p>
        <h1 className="mb-6 text-5xl font-bold tracking-[0.12em] text-gold-300">{APP_TITLE}</h1>

        <BriefingNotice />

        <div className="mt-5 mb-6 flex items-center justify-between rounded-sm border border-danger/30 bg-danger/5 px-4 py-3">
          <p className="max-w-lg text-sm leading-relaxed text-danger/95">{TITLE_SCREEN.warning}</p>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="primary" onClick={handleStart} className="px-8 py-3 text-base">
            {TITLE_SCREEN.start}
          </Button>
          {hasSave && (
            <Button variant="ghost" onClick={handleResume} className="px-6 py-3">
              {TITLE_SCREEN.continue}
            </Button>
          )}
          <button
            type="button"
            onClick={toggleHints}
            className="text-xs tracking-widest text-gold-300/60 underline-offset-4 hover:text-gold-300 hover:underline"
          >
            {HINT_LABEL.master}：{hintsEnabled ? HINT_LABEL.on : HINT_LABEL.off}
          </button>
        </div>

        <p className="mt-8 font-mono text-[10px] tracking-widest text-gold-300/40">{FOOTER_TEXT}</p>
      </div>
    </main>
  )
}
