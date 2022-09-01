import { getKeyValue, getCls } from '@/utils'

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

// 用户审核状态
export const USER_AUDIT_STATUS = {
  pass: 1, // 通过
  back: 2 // 驳回
}
export const userAuditStatusOptions = [
  { value: USER_AUDIT_STATUS.pass, label: '通过' },
  { value: USER_AUDIT_STATUS.back, label: '驳回' }
]
export const userAuditStatusKeyValue = getKeyValue(userAuditStatusOptions)

export const userAuditStatusColorCls = getCls(USER_AUDIT_STATUS, 'color-status-')
