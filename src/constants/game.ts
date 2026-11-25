/**
 * 用途：游戏数值与平衡常量，集中在此便于调参。
 * 输入：无。输出：常量导出。
 */
import type { Day } from '@/types'

/** 初始安全度与信任度 */
export const INITIAL_STAT = 100

/**
 * 游戏内当前日期（泰拉历）：入境审查发生日。
 * 通行证的「有效至」早于这一天即视为许可过期（`compare.ts` 的「有效期」破绽）。
 */
export const CURRENT_DATE = '1096-04-01'

/** 处置对数值的影响：operator 表示正常干员，impostor 表示入侵者 */
export const VERDICT_EFFECT = {
  operator: { approve: { trust: 2, safety: 0 }, reject: { trust: -8, safety: 0 } },
  impostor: { approve: { trust: 0, safety: -25 }, reject: { trust: 0, safety: 5 } },
} as const

/** 突脸事件（S.W.E.E.P.）参数 */
export const SWEEP = {
  /** 需要点按的次数 */
  taps: 10,
  /** 限时（毫秒） */
  duration: 9000,
  /** 失败时扣除的安全度 */
  failSafety: 15,
  /**
   * 普通入侵者被拒绝时，突脸的概率。
   * 「变形者集群」不受此概率影响，一律触发。
   */
  chance: 0.35,
} as const

/** 屏幕震动阈值（保留给未来的视觉反馈使用） */
export const DANGER_THRESHOLD = 30

/**
 * 每天抽取的人数（与 `mocks/index.ts` 的 DAILY_COUNT 保持一致）。
 * 页面在名单尚未加载时用作进度条总数兜底。
 */
export const ROSTER_SIZE: Record<Day, number> = { 1: 3, 2: 6, 3: 7, 4: 8, 5: 8 }

/** 通关评级阈值（安全度 + 信任度） */
export const RATING_THRESHOLDS = [
  { grade: 'S', min: 190 },
  { grade: 'A', min: 170 },
  { grade: 'B', min: 145 },
  { grade: 'C', min: 110 },
  { grade: 'D', min: 0 },
] as const

/** 查档模拟延迟（毫秒），让玩家感受到「调档案」的过程 */
export const DOSSIER_FETCH_DELAY = 800

/**
 * 当前已开放到第几天。M2 起开放全部 5 天（21 人剧本已就位）。
 */
export const UNLOCKED_DAYS: Day = 5
