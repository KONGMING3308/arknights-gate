/**
 * 用途：数据访问层公共配置。所有请求必须经 src/api/ 且在这里切换 mock / 真实接口。
 * 输入：环境变量。输出：USE_MOCK、API_BASE。依赖：无。
 */

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

/** 模拟网络延迟 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** 统一 JSON 请求，真实接口模式下使用 */
export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    throw new Error(`请求失败：${res.status} ${path}`)
  }
  return (await res.json()) as T
}
