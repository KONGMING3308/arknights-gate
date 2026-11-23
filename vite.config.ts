import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * 用途：Vite 构建配置。输入：构建模式。输出：开发/生产构建配置。
 * 说明：生产构建挂到 GitHub Pages 的 /arknights-gate/ 子路径，开发时仍用根路径。
 * 依赖：@vitejs/plugin-react
 */
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/arknights-gate/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5273,
    // 监听所有网卡，便于局域网 / 公网隧道分享；本地开发也可用 127.0.0.1 访问
    host: '0.0.0.0',
    allowedHosts: true,
    // 编辑器落盘时会生成 .tmpdir 临时目录，原生 watcher 遇到会 EBUSY 崩溃，改用轮询并忽略之
    watch: {
      usePolling: true,
      interval: 400,
      ignored: ['**/*.tmpdir/**', '**/.*.tmp', '**/node_modules/**', '**/dist/**'],
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
}))
