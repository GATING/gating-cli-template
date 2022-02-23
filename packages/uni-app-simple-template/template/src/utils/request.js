import Request from 'uview-ui/libs/luch-request'
import store from '@/store'
import { errorStatus } from './variables'

let loadingNum = 0 // 在加载中的页面
const setLoading = () => {
  loadingNum += 1
  if (loadingNum === 1) {
    uni.showLoading({
      title: '加载中...',
      icon: 'loading'
    })
  }
}

const deleteLoading = () => {
  loadingNum -= 1
  if (loadingNum === 0) {
    // 关闭loading
    uni.hideLoading()
  }
}
/**
 * 请求失败后的错误统一处理
 */
const errorHandler = error => {
  deleteLoading()
  const status = error?.statusCode
  error.message = errorStatus[status] || '未知错误'
  uni.showToast({ icon: 'none', title: error.message })
  return Promise.reject(error)
}

const request = new Request({
  baseURL: process.env.VUE_APP_BASE_API,
  dataType: 'json',
  // 配置通用请求头信息
  header: {}
})

request.interceptors.request.use(config => {
  const { loading } = config.header
  if (typeof loading === 'undefined' || loading === true) {
    setLoading()
  }
  const token = store.getters.token
  if (token) {
    config.header.token = token
  }
  return config
})

request.interceptors.response.use(response => {
  const { data, config } = response
  const { loading } = config
  if (typeof loading === 'undefined' || loading === true) {
    deleteLoading()
  }
  if (data.code >= 200 && data.code < 300) {
    return data.data
  }
  return Promise.reject(response)
})

export function get(url, ...config) {
  return request.get(url, ...config).catch(err => errorHandler(err))
}

export function post(url, ...config) {
  return request.post(url, ...config).catch(err => errorHandler(err))
}

export function put(url, ...config) {
  return request.put(url, ...config).catch(err => errorHandler(err))
}
