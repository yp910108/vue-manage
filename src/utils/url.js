import { publicPath } from '../../vue.config'
import { toRawType } from './'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 拼接 url
 * @param {*} urls
 */
export function combineURL(...urls) {
  const ret = urls.map((url) => {
    if (!url) return url
    if (isExternal(url)) {
      return url.replace(/\/+$/, '')
    } else {
      return url.replace(/^\/+/, '').replace(/\/+$/, '')
    }
  })
  return ret.filter((r) => r).join('/')
}

/**
 * 获取当前项目的域名
 */
export function getRootUrl() {
  return combineURL(window.location.origin, publicPath, '/#/')
}

/**
 * 解析对象为 query { a: 1, b: 2 } => ?a=1&b=2
 * @param {*} data
 */
export function obj2Query(data) {
  if (toRawType(data) !== 'Object') return ''
  let ret = ''
  Object.keys(data).forEach((key) => {
    const val = data[key]
    if (val || val === 0 || val === false) {
      ret += (ret.indexOf('?') === -1 ? '?' : '&') + `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
    }
  })
  return ret
}
