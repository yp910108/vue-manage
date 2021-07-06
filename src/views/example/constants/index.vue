<template>
  <div class="app-content">
    <aside>
      以用户状态为例演示常量的用法，假设用户状态为：1 通过、2 驳回，后台返回的数据为 <code>{ status: 1 }</code>
    </aside>
    <aside>
      <h3>下拉框</h3>
      审核状态：<i-select v-model="status" :options="userAuditStatusOptions" />
    </aside>
    <aside>
      <h3>显示文字，并设置状态颜色</h3>
      审核状态：
      <span :class="auditStatusColorCls[res.status]">
        {{ userAuditStatusKeyValue[res.status] }}
      </span>
    </aside>
    <aside>
      <h3>判断逻辑</h3>
      <el-button v-if="res.status === USER_AUDIT_STATUS.pass">测试按钮</el-button>
    </aside>
  </div>
</template>

<script>
import {
  USER_AUDIT_STATUS,
  userAuditStatusOptions,
  userAuditStatusKeyValue,
  auditStatusColorCls
} from '@/constants/user'
export default {
  data() {
    return {
      USER_AUDIT_STATUS,
      userAuditStatusOptions,
      userAuditStatusKeyValue,
      auditStatusColorCls,
      status: undefined,
      res: {}
    }
  },
  methods: {
    fetchRes() {
      this.res = {
        status: 1
      }
    }
  },
  created() {
    setTimeout(() => {
      this.fetchRes()
    }, 1000)
  }
}
</script>
