<template>
  <div class="app-header">
    <div class="logo">
      <span class="text">基础后台管理系统</span>
    </div>
    <div class="right-wrapper">
      <span class="user-info">欢迎您，{{ user.username }}</span>
      <i-icon icon="logout" class="logout fr" @click="logout" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    async logout() {
      try {
        await this.$confirm('确定要注销登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this.$store.dispatch('user/fedLogout')
        location.reload()
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
@import '@/styles/variables.scss';
.app-header {
  position: relative;
  z-index: 1002;
  padding: 0 10px;
  height: 60px;
  background: $--color-primary;
  .logo {
    float: left;
    height: 100%;
    .text {
      float: left;
      margin-left: 20px;
      margin-top: 14px;
      height: 32px;
      line-height: 32px;
      font-size: 16px;
      color: #fefefe;
    }
  }
  .right-wrapper {
    float: right;
    margin-right: 10px;
    margin-top: 20px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    .user-info {
      display: inline-block;
      vertical-align: top;
      margin-right: 10px;
      margin-top: 2px;
      border-right: 2px solid #fff;
      padding-right: 10px;
      line-height: 1;
      font-size: 16px;
    }
  }
}
</style>
