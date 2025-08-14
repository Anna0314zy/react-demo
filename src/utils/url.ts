/**
 * 获取 URL 查询参数
 * @param name 参数名
 * @returns 参数值或 null
 */
export const getUrlParameter = (name: string): string | null => {
  if (!name) return null
  return new URLSearchParams(window.location.search).get(name)
}
