import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
  baseURL: '/api', // 统一使用/api作为前缀
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  withCredentials: true // 允许携带cookie
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 打印请求信息，便于调试
    console.log('Request URL:', config.baseURL + config.url)
    console.log('Request Method:', config.method)
    console.log('Request Headers:', config.headers)
    
    // 从localStorage获取token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = token
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 打印响应信息，便于调试
    console.log('Response:', response.data)
    
    const res = response.data
    if (res.success && res.code === 200) {
      // 如果data为null且success为true，返回整个响应对象
      if (res.data === null) {
        return res
      }
      return res.data
    } else {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  error => {
    // 打印详细错误信息
    console.error('Response Error:', error)
    console.error('Error Config:', error.config)
    console.error('Error Response:', error.response)
    
    let message = '请求失败'
    if (error.response) {
      switch (error.response.status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '未登录或登录已过期'
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          message = '没有权限访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = error.response.data?.message || `请求失败(${error.response.status})`
      }
    } else if (error.request) {
      message = '服务器无响应'
      console.error('No Response Received:', error.request)
    } else {
      message = '请求配置错误'
    }
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default service 