/**
 * 获取原始类型的值
 * @param {*} val
 */
export function toRawType(val) {
  return {}.toString.call(val).slice(8, -1)
}

/**
 * 将数组转化为 key: value 的格式
 * @param {*} options
 * @example getKeyValue([{ value: 1, label: '通过' }, { value: 2, label: '不通过' }]) => { 1: '通过', 2: '不通过' }
 */
export function getKeyValue(options) {
  return options.reduce((prev, curr) => {
    prev[curr.value] = curr.label
    return prev
  }, {})
}

/**
 * 根据对象获取类名
 * @param {*} obj prefix
 * @example getCls({ draft: 0, revoke: 1, pass: 2 }, 'color-status-')
 *           => { 0: 'color-status-draft', 1: 'color-status-revoke', 2: 'color-status-pass' }
 */
export function getCls(obj, prefix) {
  const cls = {}
  Object.keys(obj).forEach((key) => {
    cls[obj[key]] = prefix + key
  })
  return cls
}

/**
 * 函数截流
 * @param {*} func
 * @param {*} delay
 * @returns
 */
export function debounce(func, delay) {
  let timer
  return function _debounce(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 将中划线转化为驼峰
 * @param {*} str
 * @returns
 */
const camelizeRE = /-(\w)/g
export function camelize(str) {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * 将首字母转化为大写开头
 * @param {*} str
 * @returns
 */
export function toUpperCase(str) {
  const strs = str.split('-').filter((s) => !!s)
  return strs.map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`).join('')
}
