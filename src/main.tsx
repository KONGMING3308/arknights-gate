/**
 * 用途：应用入口。
 * 输入：无。输出：挂载 React 应用。依赖：react-dom, ./App
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('缺少 #root 挂载点')

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
