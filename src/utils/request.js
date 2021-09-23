import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { baseUrl } from '@/config'
import { getLocalToken } from './local'

// 请求成功
const ERRS_OK = 0
// token 失效或未登录
const ERRS_INVALID = 40010

const fedLogout = () => {
  MessageBox.confirm('用户信息失效，请重新登录', '提示', {
    type: 'warning',
    confirmButtonText: '重新登录',
    showCancelButton: false,
    showClose: false,
    closeOnClickModal: false,
    closeOnPressEscape: false
  })
    .then(() => {
      store.dispatch('user/fedLogout')
      window.location.reload()
    })
    .catch(() => {})
}

const service = axios.create({
  baseURL: baseUrl,
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
      return fedLogout()
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
      return fedLogout()
    }
    Message.error('服务器异常')
    return Promise.reject(e)
  }
)

export default service
