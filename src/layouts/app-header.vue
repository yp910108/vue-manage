<template>
  <div class="app-header">
    <div class="logo">{{ settings.title }}</div>
    <el-dropdown @command="handleLogout">
      <span class="user-name">欢迎您，{{ user.username }}<i class="el-icon-arrow-down ml-10" /></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import settings from '@/settings'
import { removeLocalToken } from '@/utils'

export default {
  data() {
    return { settings }
  },
  methods: {
    async handleLogout() {
      try {
        await this.$confirm('确定要注销登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        removeLocalToken()
        window.location.href = '/'
      } catch (e) {
        // do nothing
      }
    }
  },
  computed: {
    ...mapState('user', ['user'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 50px;
  background: $--color-primary;
  .logo {
    margin-left: 20px;
    font-size: 16px;
    color: #fefefe;
  }
  .el-dropdown {
    margin-right: 10px;
    .user-name {
      font-size: 14px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
