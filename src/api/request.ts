// src/utils/http.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// 可根据环境设置 baseURL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

/** 自定义响应类型 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

class Http {
  private instance: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    })

    this.setupInterceptors()
  }

  /** 请求 & 响应拦截器 */
  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 可加 token 或其他全局配置
        const token = localStorage.getItem('token')
        if (token) {
          config.headers = config.headers || {}
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const res = response.data
        if (res.code !== 0) {
          // 可统一处理错误
          return Promise.reject(new Error(res.message || 'Error'))
        }
        return res.data
      },
      (error: AxiosError) => {
        let msg = 'Network Error'
        if (error.response) {
          msg = `${error.response.status} - ${error.response.statusText}`
        } else if (error.message) {
          msg = error.message
        }
        return Promise.reject(new Error(msg))
      }
    )
  }

  /** GET 请求 */
  get<T = any>(url: string, params?: object, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, { params, ...config })
  }

  /** POST 请求 */
  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, config)
  }

  /** PUT 请求 */
  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, data, config)
  }

  /** DELETE 请求 */
  delete<T = any>(url: string, params?: object, config?: AxiosRequestConfig) {
    return this.instance.delete<T>(url, { params, ...config })
  }

  /** 支持自定义实例 */
  request<T = any>(config: AxiosRequestConfig) {
    return this.instance.request<T>(config)
  }
}

// 默认导出单例
export default new Http()
