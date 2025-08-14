import { useMemo } from 'react'
import { getUrlParameter } from '@/utils'

/**
 * React Hook 获取 URL 查询参数
 * @param name 参数名
 * @returns 参数值或 null
 */
export const useQueryParam = (name: string): string | null => {
  return useMemo(() => getUrlParameter(name), [name])
}
