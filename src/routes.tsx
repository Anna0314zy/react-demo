// routes.tsx
import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import User from './pages/User'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
export interface RouteConfig {
  path: string
  element: React.ReactNode
  children?: RouteConfig[]
  requireAuth?: boolean // 是否需要登录
}

const routes: RouteConfig[] = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/login', element: <Login /> },
  { path: '/user/:id', element: <User />, requireAuth: true }, // 需要登录
  {
    path: '/dashboard',
    element: <Dashboard />,
    requireAuth: true, // 整个 dashboard 需要登录
    children: [
      { path: 'analytics', element: <Analytics />, requireAuth: true },
      { path: 'settings', element: <Settings />, requireAuth: true },
    ],
  },
  { path: '*', element: <NotFound /> }, // 👈 兜底路由
]

export default routes
