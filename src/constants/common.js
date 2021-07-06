import { getKeyValue } from '@/utils'

export const CONTACT = '0531-XXXXXXX / XXXXXXXXXXX'

export const COPYRIGHT = 'Copyright© XXX科技有限公司'

// 是、否
export const YES_OR_NO = {
  yes: 1, // 是
  no: 0 // 否
}
export const yesOrNoOptions = [
  { value: YES_OR_NO.yes, label: '是' },
  { value: YES_OR_NO.no, label: '否' }
]
export const yesOrNoKeyValue = getKeyValue(yesOrNoOptions)
