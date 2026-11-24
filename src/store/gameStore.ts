/**
 * 用途：全局游戏状态（Zustand + localStorage 存档）。管天数、进度、两项数值、处置记录与新手提示开关。
 * 输入：玩家动作。输出：状态与方法。
 * 依赖：zustand, zustand/middleware, @/constants/game, @/utils/verdict, @/types
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { INITIAL_STAT, UNLOCKED_DAYS } from '@/constants/game'
import { computeOutcome } from '@/utils/verdict'
import type { ApplicantKind, Day, GameState, VerdictAction, VerdictRecord } from '@/types'

export interface LastOutcome {
  codeName: string
  action: VerdictAction
  kind: ApplicantKind
  correct: boolean
  safetyDelta: number
  trustDelta: number
}

interface GameStore extends GameState {
  lastOutcome: LastOutcome | null
  startGame: () => void
  resumeGame: () => void
  toggleHints: () => void
  applyVerdict: (
    applicantId: string,
    codeName: string,
    kind: ApplicantKind,
    action: VerdictAction,
    recommenderValid: boolean,
  ) => void
  penalize: (safetyDelta: number, trustDelta: number) => void
  advanceSlot: (total: number) => void
  goNextDay: () => void
  reset: () => void
}

const initialState: GameState = {
  day: 1,
  slotIndex: 0,
  safety: INITIAL_STAT,
  trust: INITIAL_STAT,
  phase: 'title',
  records: [],
  // 默认关闭：让玩家在无提示的情况下自行比对材料，需要时再手动开启
  hintsEnabled: false,
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      lastOutcome: null,

      startGame: () => {
        // 新的一局：清掉普瑞塞斯落点与出场顺序种子，重新随机
        try {
          localStorage.removeItem('arknights-gate-anomaly')
          localStorage.removeItem('arknights-gate-order')
        } catch {
          // 忽略存储异常
        }
        set({
          ...initialState,
          phase: 'review',
          lastOutcome: null,
        })
      },

      resumeGame: () => set({ lastOutcome: null }),

      toggleHints: () => set((s) => ({ hintsEnabled: !s.hintsEnabled })),

      applyVerdict: (applicantId, codeName, kind, action, recommenderValid) => {
        const state = get()
        const outcome = computeOutcome(kind, action, recommenderValid)
        const record: VerdictRecord = {
          applicantId,
          codeName,
          action,
          correct: outcome.correct,
          day: state.day,
        }
        const safety = Math.max(0, state.safety + outcome.safety)
        const trust = Math.max(0, state.trust + outcome.trust)
        const failed = safety <= 0 || trust <= 0

        set({
          safety,
          trust,
          records: [...state.records, record],
          phase: failed ? 'ending' : state.phase,
          lastOutcome: {
            codeName,
            action,
            kind,
            correct: outcome.correct,
            safetyDelta: outcome.safety,
            trustDelta: outcome.trust,
          },
        })
      },

      penalize: (safetyDelta, trustDelta) => {
        const state = get()
        const safety = Math.max(0, state.safety + safetyDelta)
        const trust = Math.max(0, state.trust + trustDelta)
        set({ safety, trust, phase: safety <= 0 || trust <= 0 ? 'ending' : state.phase })
      },

      advanceSlot: (total: number) => {
        // 已经进入失败/结局分支时不再推进，否则会把 ending 覆盖成 dayEnd
        if (get().phase === 'ending') return
        const { slotIndex } = get()
        // 名单长度由页面传入（普瑞塞斯会随机插入，导致当天人数与固定表不同）
        if (slotIndex + 1 >= total) {
          set({ phase: 'dayEnd' })
          return
        }
        set({ slotIndex: slotIndex + 1, lastOutcome: null })
      },

      goNextDay: () => {
        const { day } = get()
        // 超过当前已开放的天数（UNLOCKED_DAYS）就直接进结局评级
        if (day >= UNLOCKED_DAYS) {
          set({ phase: 'ending' })
          return
        }
        const nextDay = (day + 1) as Day
        set({ day: nextDay, slotIndex: 0, phase: 'review', lastOutcome: null })
      },

      reset: () => set({ ...initialState, lastOutcome: null }),
    }),
    {
      name: 'arknights-gate-save',
      // v2：新手提示改为默认关闭，老存档一并重置一次
      version: 2,
      migrate: (persisted, version) => {
        const state = persisted as Partial<GameState> | undefined
        if (!state) return persisted as never
        if (version < 2) {
          return { ...state, hintsEnabled: false }
        }
        return state as never
      },
      partialize: (state) => ({
        day: state.day,
        slotIndex: state.slotIndex,
        safety: state.safety,
        trust: state.trust,
        records: state.records,
        hintsEnabled: state.hintsEnabled,
        // phase 必须一起存：否则刷新后回到 title，会重复审查当天最后一人或绕过失败结局
        phase: state.phase,
      }),
    },
  ),
)
