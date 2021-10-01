import { getKeyValue } from '@/utils'

export const SEX = {
  man: 1,
  woman: 2
}
export const sexOptions = [
  { value: SEX.man, label: '男' },
  { value: SEX.woman, label: '女' }
]
export const sexKeyValue = getKeyValue(sexOptions)
