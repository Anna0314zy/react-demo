import http from '@/api/request'

// 获取用户信息
interface User {
  id: number
  name: string
}

export async function getUser(id: number) {
  return http.get<User>(`/users/${id}`)
}

// 提交表单
export async function submitForm(data: { title: string; content: string }) {
  return http.post<{ id: number }>('/posts', data)
}
