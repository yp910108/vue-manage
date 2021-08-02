<template>
  <div class="app-header">
    <div class="logo">基础后台管理系统</div>
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

export default {
  methods: {
    async handleLogout() {
      try {
        await this.$confirm('确定要注销登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this.$store.dispatch('user/fedLogout')
        window.location.reload()
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
.app-header {
  position: relative;
  z-index: 1002;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 60px;
  background: #1677ff;
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
