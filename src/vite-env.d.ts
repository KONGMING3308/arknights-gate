/**
 * 用途：Vite 环境变量与客户端类型声明。
 * 输入：无。输出：import.meta.env 的类型定义。
 * 依赖：vite/client
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_MOCK: string
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
