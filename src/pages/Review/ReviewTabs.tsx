/**
 * 用途：手机端审查页的三段切换（申请人 / 证件 / 档案）。
 * 输入：当前选中段、切换回调。输出：仅 md 以下显示的标签条。
 * 依赖：@/constants/copy
 */
import { REVIEW_SCREEN } from '@/constants/copy'

export type ReviewTab = 'applicant' | 'documents' | 'dossier'

const TABS: Array<{ key: ReviewTab; label: string }> = [
  { key: 'applicant', label: REVIEW_SCREEN.tabApplicant },
  { key: 'documents', label: REVIEW_SCREEN.tabDocuments },
  { key: 'dossier', label: REVIEW_SCREEN.tabDossier },
]

interface ReviewTabsProps {
  value: ReviewTab
  onChange: (next: ReviewTab) => void
}

export default function ReviewTabs({ value, onChange }: ReviewTabsProps) {
  return (
    <nav className="border-b border-gold-500/15 bg-ink-800/30 px-3 py-1.5 md:tall:hidden">
      <div className="mx-auto flex w-full max-w-[1800px] gap-1.5">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            aria-pressed={value === tab.key}
            onClick={() => onChange(tab.key)}
            className={[
              'flex-1 rounded-sm border px-2 py-1.5 text-xs tracking-widest transition-colors',
              value === tab.key
                ? 'border-gold-500/50 bg-gold-500/10 text-gold-300'
                : 'border-transparent text-gold-300/45 hover:text-gold-300/80',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
