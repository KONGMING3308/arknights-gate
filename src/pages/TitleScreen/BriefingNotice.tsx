/**
 * 用途：标题页的「人事部内部通告」——交代玩家身份、变形者威胁与审核职责，落款凯尔希。
 * 输入：通告文案（来自 constants/copy.ts）。输出：一张内部公文卡片。
 * 依赖：@/constants/copy
 */
import { INTRO_NOTICE } from '@/constants/copy'

export default function BriefingNotice() {
  return (
    <article className="relative rounded-sm border border-gold-500/25 bg-ink-800/50 px-4 py-3.5 sm:px-5 sm:py-4">
      <header className="mb-3 flex items-baseline justify-between border-b border-gold-500/20 pb-2">
        <h2 className="text-[11px] font-semibold tracking-[0.25em] text-gold-400">
          {INTRO_NOTICE.title}
        </h2>
        <span className="font-mono text-[9px] tracking-[0.2em] text-gold-300/35">
          {INTRO_NOTICE.classification}
        </span>
      </header>

      <div className="space-y-2">
        {INTRO_NOTICE.paragraphs.map((line) => (
          <p key={line} className="text-[12px] leading-relaxed text-gold-300/75 sm:text-[13px]">
            {line}
          </p>
        ))}
      </div>

      <footer className="mt-4 flex items-end justify-between border-t border-gold-500/15 pt-2">
        <span className="font-mono text-[9px] tracking-[0.2em] text-gold-300/30">
          {INTRO_NOTICE.department}
        </span>
        <span className="text-right text-[12px] italic tracking-wider text-gold-300/70">
          {INTRO_NOTICE.signature}
        </span>
      </footer>
    </article>
  )
}
