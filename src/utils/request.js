import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getLocalToken } from './local'

// 请求成功
const ERRS_OK = 0
// token 失效或未登录
const ERRS_INVALID = 40010

const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 20000
})

service.interceptors.request.use((config) => {
  const token = getLocalToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

service.interceptors.response.use(
  (response) => {
    const { request } = response
    const { data: { code, data, msg } = {} } = response
    if (code === ERRS_OK) {
      return data
    } else if (code === ERRS_INVALID) {
      store.dispatch('user/fedLogout')
    } else {
      if (request.responseType !== 'blob') {
        Message.error(msg || '请求失败')
      }
      return Promise.reject(response.data)
    }
  },
  (e) => {
    const { status } = e.response
    if (status === 401) {
      return store.dispatch('user/fedLogout')
    }
    Message.error('服务器异常')
    return Promise.reject(e)
  }
)

export default service
