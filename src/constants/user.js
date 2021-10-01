import { getKeyValue, getCls } from '@/utils'

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
