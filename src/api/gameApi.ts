/**
 * 用途：游戏接口层。函数签名按 RESTful 约定，内部按 VITE_USE_MOCK 切换 mock/真实。
 * 输入：天、申请人 id、代号。输出：申请人列表 / 通行证 / 档案 / 处置结果。
 * 依赖：@/api/client, @/mocks/roster, @/types
 */
import { API_BASE, USE_MOCK, request, sleep } from '@/api/client'
import { DOSSIER_FETCH_DELAY } from '@/constants/game'
import { ALL_DOSSIERS, ALL_PASSPORTS, getMockRoster } from '@/mocks/index'
import type { Applicant, Dossier, Passport, VerdictAction } from '@/types'

/** GET /days/:day/roster —— 取当天待审人员 */
export async function fetchDayRoster(day: number): Promise<Applicant[]> {
  if (USE_MOCK) {
    await sleep(200)
    return getMockRoster(day)
  }
  return request<Applicant[]>(`/days/${day}/roster`)
}

/** GET /passports/:applicantId —— 取通行证 */
export async function fetchPassport(applicantId: string): Promise<Passport> {
  if (USE_MOCK) {
    await sleep(150)
    const passport = ALL_PASSPORTS[applicantId]
    if (!passport) throw new Error(`通行证不存在：${applicantId}`)
    return passport
  }
  return request<Passport>(`/passports/${applicantId}`)
}

/** GET /dossiers/:codeName —— 调取人事档案（故意带延迟，模拟检索） */
export async function fetchDossier(codeName: string): Promise<Dossier> {
  if (USE_MOCK) {
    await sleep(DOSSIER_FETCH_DELAY)
    const dossier = ALL_DOSSIERS[codeName]
    if (!dossier) throw new Error(`档案查无此人：${codeName}`)
    return dossier
  }
  return request<Dossier>(`/dossiers/${encodeURIComponent(codeName)}`)
}

/** POST /verdicts —— 提交处置决定 */
export async function submitVerdict(applicantId: string, action: VerdictAction): Promise<void> {
  if (USE_MOCK) {
    await sleep(120)
    return
  }
  await request<void>(`/verdicts`, {
    method: 'POST',
    body: JSON.stringify({ applicantId, action }),
  })
}

export { API_BASE }
