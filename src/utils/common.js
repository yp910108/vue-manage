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
 * 根据时间段进行友好提示
 */
export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
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
