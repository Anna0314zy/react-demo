// components/RequireAuth.tsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

// 模拟登录状态（实际可改成 Redux、Context、localStorage 等）
const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

interface Props {
  children: React.ReactNode
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  const location = useLocation()

  if (!isAuthenticated()) {
    // 未登录 -> 跳转登录页，并记录来源地址
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default RequireAuth
