/**
 * 用途：汇总全部剧本数据（原 33 人 + 新增 50 人候选池），并按天随机抽取固定人数。
 *       每天人数与入侵者数量保持不变，但具体是谁每局不同。
 * 输入：无。输出：按天查询名单的函数 + 全量索引表。
 * 依赖：roster*.ts、draw.ts
 */
import type { Applicant, Dossier, Passport } from '@/types'
import { drawRoster, shuffleWithSeed } from './draw'
import { DAY1_APPLICANTS, DAY1_DOSSIERS, DAY1_PASSPORTS } from './roster'
import { DAY2_APPLICANTS, DAY2_DOSSIERS, DAY2_PASSPORTS } from './roster.d2'
import { DAY2_EXTRA_APPLICANTS, DAY2_EXTRA_DOSSIERS, DAY2_EXTRA_PASSPORTS } from './roster.d2.extra'
import { DAY3_APPLICANTS, DAY3_DOSSIERS, DAY3_PASSPORTS } from './roster.d3'
import { DAY3_EXTRA_APPLICANTS, DAY3_EXTRA_DOSSIERS, DAY3_EXTRA_PASSPORTS } from './roster.d3.extra'
import { DAY4_APPLICANTS, DAY4_DOSSIERS, DAY4_PASSPORTS } from './roster.d4'
import { DAY4_EXTRA_APPLICANTS, DAY4_EXTRA_DOSSIERS, DAY4_EXTRA_PASSPORTS } from './roster.d4.extra'
import { DAY5_APPLICANTS, DAY5_DOSSIERS, DAY5_PASSPORTS } from './roster.d5'
import { DAY5_EXTRA_APPLICANTS, DAY5_EXTRA_DOSSIERS, DAY5_EXTRA_PASSPORTS } from './roster.d5.extra'
import { DAY1_POOL_APPLICANTS } from './roster.d1.pool'
import { DAY1_POOL_PASSPORTS } from './roster.d1.pool.passports'
import { DAY1_POOL_DOSSIERS } from './roster.d1.pool.dossiers'
import { DAY2_POOL_APPLICANTS } from './roster.d2.pool'
import { DAY2_POOL_PASSPORTS } from './roster.d2.pool.passports'
import { DAY2_POOL_DOSSIERS } from './roster.d2.pool.dossiers'
import { DAY3_POOL_APPLICANTS } from './roster.d3.pool'
import { DAY3_POOL_PASSPORTS } from './roster.d3.pool.passports'
import { DAY3_POOL_DOSSIERS } from './roster.d3.pool.dossiers'
import { DAY4_POOL_APPLICANTS } from './roster.d4.pool'
import { DAY4_POOL_PASSPORTS } from './roster.d4.pool.passports'
import { DAY4_POOL_DOSSIERS } from './roster.d4.pool.dossiers'
import { DAY5_POOL_APPLICANTS } from './roster.d5.pool'
import { DAY5_POOL_PASSPORTS } from './roster.d5.pool.passports'
import { DAY5_POOL_DOSSIERS } from './roster.d5.pool.dossiers'
import { DAY1_POOL2_APPLICANTS } from './roster.d1.pool2'
import { DAY1_POOL2_PASSPORTS } from './roster.d1.pool2.passports'
import { DAY1_POOL2_DOSSIERS } from './roster.d1.pool2.dossiers'
import { DAY2_POOL2_APPLICANTS } from './roster.d2.pool2'
import { DAY2_POOL2_PASSPORTS } from './roster.d2.pool2.passports'
import { DAY2_POOL2_DOSSIERS } from './roster.d2.pool2.dossiers'
import { DAY3_POOL2_APPLICANTS } from './roster.d3.pool2'
import { DAY3_POOL2_PASSPORTS } from './roster.d3.pool2.passports'
import { DAY3_POOL2_DOSSIERS } from './roster.d3.pool2.dossiers'
import { DAY4_POOL2_APPLICANTS } from './roster.d4.pool2'
import { DAY4_POOL2_PASSPORTS } from './roster.d4.pool2.passports'
import { DAY4_POOL2_DOSSIERS } from './roster.d4.pool2.dossiers'
import { DAY5_POOL2_APPLICANTS } from './roster.d5.pool2'
import { DAY5_POOL2_PASSPORTS } from './roster.d5.pool2.passports'
import { DAY5_POOL2_DOSSIERS } from './roster.d5.pool2.dossiers'
import {
  getAnomalyPlacement,
  PRESETH_APPLICANT,
  PRESETH_DOSSIER,
  PRESETH_ID,
  PRESETH_PASSPORT,
} from './roster.anomaly'

/** 每天从候选池抽的人数（与原有规模一致） */
export const DAILY_COUNT: Record<number, number> = { 1: 3, 2: 6, 3: 7, 4: 8, 5: 8 }
/** 每天抽到的入侵者数量（保持原难度） */
export const DAILY_IMPOSTORS: Record<number, number> = { 1: 1, 2: 1, 3: 2, 4: 2, 5: 2 }

/** 按天合并的候选池 */
const POOL_BY_DAY: Record<number, Applicant[]> = {
  1: [...DAY1_APPLICANTS, ...DAY1_POOL_APPLICANTS, ...DAY1_POOL2_APPLICANTS],
  2: [...DAY2_APPLICANTS, ...DAY2_EXTRA_APPLICANTS, ...DAY2_POOL_APPLICANTS, ...DAY2_POOL2_APPLICANTS],
  3: [...DAY3_APPLICANTS, ...DAY3_EXTRA_APPLICANTS, ...DAY3_POOL_APPLICANTS, ...DAY3_POOL2_APPLICANTS],
  4: [...DAY4_APPLICANTS, ...DAY4_EXTRA_APPLICANTS, ...DAY4_POOL_APPLICANTS, ...DAY4_POOL2_APPLICANTS],
  5: [...DAY5_APPLICANTS, ...DAY5_EXTRA_APPLICANTS, ...DAY5_POOL_APPLICANTS, ...DAY5_POOL2_APPLICANTS],
}

export const ALL_APPLICANTS: Applicant[] = [
  ...POOL_BY_DAY[1]!,
  ...POOL_BY_DAY[2]!,
  ...POOL_BY_DAY[3]!,
  ...POOL_BY_DAY[4]!,
  ...POOL_BY_DAY[5]!,
]

export const ALL_PASSPORTS: Record<string, Passport> = {
  ...DAY1_PASSPORTS,
  ...DAY2_PASSPORTS,
  ...DAY2_EXTRA_PASSPORTS,
  ...DAY3_PASSPORTS,
  ...DAY3_EXTRA_PASSPORTS,
  ...DAY4_PASSPORTS,
  ...DAY4_EXTRA_PASSPORTS,
  ...DAY5_PASSPORTS,
  ...DAY5_EXTRA_PASSPORTS,
  ...DAY1_POOL_PASSPORTS,
  ...DAY2_POOL_PASSPORTS,
  ...DAY3_POOL_PASSPORTS,
  ...DAY4_POOL_PASSPORTS,
  ...DAY5_POOL_PASSPORTS,
  ...DAY1_POOL2_PASSPORTS,
  ...DAY2_POOL2_PASSPORTS,
  ...DAY3_POOL2_PASSPORTS,
  ...DAY4_POOL2_PASSPORTS,
  ...DAY5_POOL2_PASSPORTS,
  [PRESETH_ID]: PRESETH_PASSPORT,
}

export const ALL_DOSSIERS: Record<string, Dossier> = {
  ...DAY1_DOSSIERS,
  ...DAY2_DOSSIERS,
  ...DAY2_EXTRA_DOSSIERS,
  ...DAY3_DOSSIERS,
  ...DAY3_EXTRA_DOSSIERS,
  ...DAY4_DOSSIERS,
  ...DAY4_EXTRA_DOSSIERS,
  ...DAY5_DOSSIERS,
  ...DAY5_EXTRA_DOSSIERS,
  ...DAY1_POOL_DOSSIERS,
  ...DAY2_POOL_DOSSIERS,
  ...DAY3_POOL_DOSSIERS,
  ...DAY4_POOL_DOSSIERS,
  ...DAY5_POOL_DOSSIERS,
  ...DAY1_POOL2_DOSSIERS,
  ...DAY2_POOL2_DOSSIERS,
  ...DAY3_POOL2_DOSSIERS,
  ...DAY4_POOL2_DOSSIERS,
  ...DAY5_POOL2_DOSSIERS,
  普瑞塞斯: PRESETH_DOSSIER,
}

/** 顺序随机种子：一局固定，重开新局时清除 */
export const ORDER_SEED_KEY = 'arknights-gate-order'

function getOrderSeed(): number {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(ORDER_SEED_KEY) : null
    if (raw) {
      const n = Number(raw)
      if (Number.isFinite(n)) return n
    }
  } catch {
    // 忽略
  }
  const seed = Math.floor(Math.random() * 1_000_000_000)
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(ORDER_SEED_KEY, String(seed))
  } catch {
    // 忽略
  }
  return seed
}

/**
 * 按天数取当天名单：
 * 1. 用本局种子从当日候选池里抽取固定人数（入侵者配额固定）
 * 2. 随机插入普瑞塞斯（不影响人数上限，额外多一位）
 */
export function getMockRoster(day: number): Applicant[] {
  const pool = POOL_BY_DAY[day] ?? []
  const seed = getOrderSeed() + day * 7919
  const picked = drawRoster(pool, DAILY_COUNT[day] ?? 6, DAILY_IMPOSTORS[day] ?? 1, seed)

  const placement = getAnomalyPlacement()
  const list = [...picked]
  if (day === placement.day) {
    const index = Math.min(placement.slot, list.length)
    list.splice(index, 0, { ...PRESETH_APPLICANT, day: day as 3 | 4 | 5 })
  }
  return list.map((item, i) => ({ ...item, slot: i }))
}

/** 当天候选池大小（用于调试/校验） */
export function poolSize(day: number): number {
  return POOL_BY_DAY[day]?.length ?? 0
}

export const MAX_DAY = 5 as const
export { shuffleWithSeed }
