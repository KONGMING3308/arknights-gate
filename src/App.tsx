/**
 * 用途：路由配置。
 * 输入：无。输出：四个页面的路由表。依赖：react-router-dom, pages/*
 */
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import TitleScreen from '@/pages/TitleScreen/TitleScreen'
import ReviewScreen from '@/pages/Review/ReviewScreen'
import DayEndScreen from '@/pages/DayEnd/DayEndScreen'
import EndingScreen from '@/pages/Ending/EndingScreen'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TitleScreen />} />
        <Route path="/review" element={<ReviewScreen />} />
        <Route path="/day-end" element={<DayEndScreen />} />
        <Route path="/ending" element={<EndingScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
