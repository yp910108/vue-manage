import axios from 'axios'
import store from '@/store'
import { baseUrl } from '@/config'
import { getLocalToken } from './local'
import { Notification } from 'element-ui'

// 请求成功
const ERRS_OK = 0

const fadeLogout = () => {
  Notification({
    type: 'error',
    title: '提示',
    message: '用户信息失效，请重新登录'
  })
  setTimeout(() => {
    store.dispatch('user/fedLogout')
    location.reload()
  }, 1000)
}

const service = axios.create({
  baseURL: baseUrl,
  timeout: 20000
})

service.interceptors.request.use((config) => {
  const token = getLocalToken()
  if (token) {
    config['headers']['Authorization'] = `Bearer ${token}`
  }
  return config
})

service.interceptors.response.use(
  (response) => {
    const { request } = response
    const { data: { code, data, msg } = {} } = response
    if (code === ERRS_OK) {
      return data
    } else if (code === 1) {
      return fadeLogout()
    } else {
      if (request.responseType !== 'blob') {
        Notification({
          type: 'error',
          title: '提示',
          message: msg || '请求失败'
        })
      }
      return Promise.reject(response.data)
    }
  },
  (e) => {
    const { status } = e.response
    if (status === 401) {
      return fadeLogout()
    }
    Notification({
      type: 'error',
      title: '提示',
      message: '服务器异常'
    })
    return Promise.reject(e)
  }
)

export default service
