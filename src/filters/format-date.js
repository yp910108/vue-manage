import dayjs from 'dayjs'

export default function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  return value ? dayjs(value).format(formatString) : ''
}
