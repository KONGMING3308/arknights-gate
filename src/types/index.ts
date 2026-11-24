/**
 * 用途：全局类型定义，文档 docs/04 的字段表与此文件一一对应。
 * 输入：无。输出：类型导出。依赖：无。
 */

export type Day = 1 | 2 | 3 | 4 | 5

/** 申请人的真实身份：正常干员 / 入侵者 / 无法判定的异常存在 */
export type ApplicantKind = 'operator' | 'impostor' | 'anomaly'

/** 玩家可执行的处置（已移除射击） */
export type VerdictAction = 'approve' | 'reject'

/** 游戏阶段 */
export type Phase = 'title' | 'review' | 'dayEnd' | 'ending'

/** 通行证印章状态 */
export type StampType = 'clear' | 'smudged' | 'missing'

/** 档案状态 */
export type DossierStatus = 'active' | 'missing' | 'revoked'

export interface DialogueLine {
  /** 玩家点击的问题按钮 label，如「代号」「来意」「推荐人」 */
  question: string
  /** 申请人的回答 */
  answer: string
}

export interface Applicant {
  id: string
  /** 干员代号（档案上的名字） */
  codeName: string
  /** 立绘/头像文件名，位于 public/assets/portraits/ */
  portrait: string
  race: string
  origin: string
  occupation: string
  kind: ApplicantKind
  day: Day
  /** 当天出场顺序，从 0 开始 */
  slot: number
  intent: string
  recommender: string
  dialogue: DialogueLine[]
  /** 通行证编号（伪造者会与档案对不上） */
  passportNumber: string
  /** 档案编号 */
  dossierNumber: string
  /** 护照照片与本人是否一致 */
  photoMatch: boolean
  /**
   * 「拒绝时必定突脸」标记。
   * 目前只有变形者集群为 true；其余入侵者被拒绝时按 SWEEP.chance 随机触发。
   */
  attacksWhenRejected?: boolean
  /** 所有证件信息均为乱码（普瑞塞斯），无法按常规规则判断 */
  scrambled?: boolean
  /**
   * 台词与证件自相矛盾之处（有值即生成「言行」破绽）。
   * 用于「数据全对、只能靠问话识破」的入侵者。
   */
  dialogueConflict?: string
}

export interface Passport {
  /** 与 Applicant.passportNumber 对应 */
  number: string
  holderName: string
  photo: string
  issueDate: string
  expiryDate: string
  route: string
  stampType: StampType
  /** 印章上刻的机构名，玩家要拿它比对档案要求 */
  sealText: string
}

export interface Dossier {
  codeName: string
  number: string
  occupation: string
  origin: string
  recommender: string
  photo: string
  status: DossierStatus
  /** 罗德岛要求入境必须持有的印章机构名 */
  requiredSeal: string
  /**
   * 档案备注（如「旧号已换发」）。
   * 有备注说明的编号差异不算破绽——逼玩家读档案而不是只看字段是否相等。
   */
  note?: string
}

/** 一条「材料之间对不上」的破绽 */
export interface Discrepancy {
  /** 比对维度，如「印章」「编号」 */
  field: string
  /** 档案/规范要求的值 */
  expected: string
  /** 通行证上实际呈现的值 */
  actual: string
  /** 给玩家的提示语 */
  hint: string
}

export interface VerdictRecord {
  applicantId: string
  codeName: string
  action: VerdictAction
  correct: boolean
  day: Day
}

export interface GameState {
  day: Day
  slotIndex: number
  safety: number
  trust: number
  phase: Phase
  records: VerdictRecord[]
  /** 新手提示开关：开启后显示破绽计数 */
  hintsEnabled: boolean
}
