/**
 * 用途：对固定名单的入侵者注入额外破绽——「许可已过期」与「双重错误」。
 *       名单由固定种子一次性抽定并写死（见 docs/12），运行时只做数据覆盖，
 *       保证每局遇到的身份与破绽固定，只是出场顺序随机。
 * 输入：无。输出：数据覆盖函数 + 注入名单。
 * 依赖：@/types
 */
import type { Applicant, Passport } from '@/types'

/**
 * 许可已过期：到期日期早于 `CURRENT_DATE`。
 * 新的签发 / 到期 = 原值各提前 2 年，保证「签发 < 到期 < 今日」，只触发「有效期」一处新破绽。
 */
const EXPIRED_PASSPORTS: Record<string, Pick<Passport, 'issueDate' | 'expiryDate'>> = {
  'beagle-d1': { issueDate: '1094-01-20', expiryDate: '1095-01-19' },
  'kuai-d3q': { issueDate: '1094-03-17', expiryDate: '1095-03-17' },
  'melantha-d2': { issueDate: '1094-07-20', expiryDate: '1095-07-19' },
  'axiao-d3q': { issueDate: '1094-03-13', expiryDate: '1095-03-13' },
  'a-d2q': { issueDate: '1094-02-13', expiryDate: '1095-02-13' },
  'magallan-d3p': { issueDate: '1094-03-13', expiryDate: '1095-03-13' },
}

/** 双重错误：在原有 1 处破绽之外，再叠加「照片与本人不符」 */
const DOUBLE_FAULT_IDS = new Set(['shuiyue-d1q', 'executor-d2p', 'zima-d2p', 'midnight-d4p'])

/** 给申请人列表叠加「双重错误」（照片不符） */
export function overrideApplicants(list: Applicant[]): Applicant[] {
  return list.map((a) => (DOUBLE_FAULT_IDS.has(a.id) ? { ...a, photoMatch: false } : a))
}

/** 给通行证表叠加「许可过期」（改签发与到期日期） */
export function overridePassports(map: Record<string, Passport>): Record<string, Passport> {
  const out = { ...map }
  for (const [id, patch] of Object.entries(EXPIRED_PASSPORTS)) {
    const passport = out[id]
    if (passport) out[id] = { ...passport, ...patch }
  }
  return out
}

/** 注入名单：供文档与校验脚本引用 */
export const EXPIRED_IDS = Object.keys(EXPIRED_PASSPORTS)
export const DOUBLE_FAULT_LIST = [...DOUBLE_FAULT_IDS]
