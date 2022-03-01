import axios from 'axios'
import { Toast, Notify } from 'vant'
import store from '@/store'
import { getToken } from './auth'
import { errorStatus } from './variables'

// 全局loading，这里以element-ui为例

let loadingNum = 0 // 在加载中的页面
let globalLoading = null
const setLoading = () => {
  loadingNum += 1
  if (loadingNum === 1) {
    globalLoading = Toast.loading({
      message: '加载中...',
      duration: 0,
      forbidClick: true
    })
  }
}
const deleteLoading = () => {
  loadingNum -= 1
  if (loadingNum === 0) {
    // 关闭loading
    globalLoading?.clear && globalLoading?.clear()
    // 手动释放
    globalLoading = null
  }
}

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  // withCredentials: true,
  timeout: 10000
})

// Toast提示，根据不同的ui库来
const errorHandler = error => {
  deleteLoading()
  const status = error?.response?.status
  error.message = errorStatus[status] || '未知错误'
  Notify({ type: 'danger', message: error.message })
  return Promise.reject(error)
}

service.interceptors.request.use(
  config => {
    const { loading } = config
    if (typeof loading === 'undefined' || loading === true) {
      setLoading()
    }
    if (store.getters.token) {
      config.headers.token = getToken()
    }
    config.cancelToken = store.getters.source.token
    return config
  },
  error => errorHandler(error)
)

service.interceptors.response.use(
  response => {
    const { data, config } = response
    const { loading, responseType } = config
    if (typeof loading === 'undefined' || loading === true) {
      deleteLoading()
    }
    if (responseType === 'blob') return data
    // 根据后端的code进行返回，不同项目处理的可能不同
    if (data.code >= 200 && data.code < 300) {
      return data.data
    }
    return Promise.reject(new Error(data.message || 'Error'))
  },
  error => {
    if (error instanceof axios.Cancel) return
    return errorHandler(error)
  }
)

export function post(url, ...config) {
  return service.post(url, ...config)
}
export function put(url, ...config) {
  return service.put(url, ...config)
}
export function del(url, params, config) {
  return service.delete(url, {
    params,
    ...config
  })
}
export function get(url, params, config) {
  return service.get(url, {
    params,
    ...config
  })
}
