/**
 * 用途：拼接静态资源的正确路径。
 *       生产构建部署在子路径（如 GitHub Pages 的 /arknights-gate/）时，
 *       必须以 import.meta.env.BASE_URL 开头，否则绝对路径 /assets/... 会 404。
 * 输入：资源相对路径，如 'portraits/kroos.png'。
 * 输出：可直接放进 src 的完整路径。
 * 依赖：无
 */

const BASE = import.meta.env.BASE_URL // 开发为 '/'，生产为 '/arknights-gate/'

export function asset(relativePath: string): string {
  return `${BASE}${relativePath.replace(/^\//, '')}`
}
