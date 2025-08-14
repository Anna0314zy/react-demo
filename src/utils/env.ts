const TOKEN_KEY = 'systemToken'

/**
 * 获取 Token
 * - 开发环境：读取 VITE_ADMIN_TOKEN
 * - 生产环境：读取 localStorage
 */
export const getToken = (): string | null => {
  const isDev = import.meta.env.MODE === 'development'

  if (isDev) {
    return (import.meta.env.VITE_ADMIN_TOKEN as string | undefined)?.trim() || null
  }

  return localStorage.getItem(TOKEN_KEY)
}
