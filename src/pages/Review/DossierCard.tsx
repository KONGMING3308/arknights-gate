/**
 * 用途：人事档案卡片（深色终端质感）。
 * 输入：档案数据。输出：档案视觉与状态标记。
 * 依赖：@/constants/copy, @/types
 */
import { DOSSIER_COPY, REVIEW_SCREEN } from '@/constants/copy'
import type { Dossier } from '@/types'
import { asset } from '@/utils/asset'

interface DossierCardProps {
  dossier: Dossier
}

const STATUS_STYLE = {
  active: 'border-trust/40 text-trust',
  missing: 'border-danger/40 text-danger',
  revoked: 'border-gold-500/40 text-gold-500',
} as const

export default function DossierCard({ dossier }: DossierCardProps) {
  return (
    <article className="paper-dark relative rounded-sm border border-gold-500/20 p-2.5 sm:p-3">
      <header className="mb-2 flex items-baseline justify-between border-b border-gold-500/20 pb-1.5">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400">
          {REVIEW_SCREEN.dossier}
        </h3>
        <span
          className={`rounded-sm border px-1.5 py-0.5 text-[10px] tracking-widest ${STATUS_STYLE[dossier.status]}`}
        >
          {REVIEW_SCREEN.dossierStatus[dossier.status]}
        </span>
      </header>

      <div className="flex gap-3">
        <div className="h-20 w-16 shrink-0 overflow-hidden rounded-sm border border-gold-500/20 bg-ink-800 sm:h-24 sm:w-20">
          <img
            src={asset(`assets/portraits/${dossier.photo}`)}
            alt={dossier.codeName}
            className="h-full w-full object-cover"
          />
        </div>

        <dl className="grid flex-1 grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-[11px] leading-tight">
          <dt className="text-gold-300/50">{REVIEW_SCREEN.fieldLabel.number}</dt>
          <dd className="font-mono text-gold-300">{dossier.number}</dd>
          <dt className="text-gold-300/50">{REVIEW_SCREEN.fieldLabel.occupation}</dt>
          <dd className="text-gold-300">{dossier.occupation}</dd>
          <dt className="text-gold-300/50">{REVIEW_SCREEN.fieldLabel.origin}</dt>
          <dd className="text-gold-300">{dossier.origin}</dd>
          <dt className="text-gold-300/50">{REVIEW_SCREEN.fieldLabel.recommender}</dt>
          <dd className="text-gold-300">{dossier.recommender}</dd>
          <dt className="text-gold-300/50">{DOSSIER_COPY.requiredSeal}</dt>
          <dd className="text-gold-300/90">{dossier.requiredSeal}</dd>
        </dl>
      </div>

      <p className="mt-3 border-t border-gold-500/15 pt-2 font-mono text-[10px] tracking-wider text-gold-300/35">
        {DOSSIER_COPY.ruleNote} {dossier.requiredSeal}
      </p>

      {dossier.note && (
        <p className="mt-2 rounded-sm border-l-2 border-gold-500/60 bg-gold-500/10 px-2 py-1.5 text-[11px] leading-relaxed text-gold-300/90">
          {DOSSIER_COPY.notePrefix}
          {dossier.note}
        </p>
      )}
    </article>
  )
}
