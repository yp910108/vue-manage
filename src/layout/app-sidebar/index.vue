<template>
  <el-scrollbar>
    <el-menu unique-opened :default-active="$route.path" :collapse="isCollapse">
      <sidebar-item v-for="item in routes" :key="item.path" :item="item" :basePath="item.path" />
    </el-menu>
  </el-scrollbar>
</template>
<script>
import { mapState } from 'vuex'
import SidebarItem from './sidebar-item.vue'

export default {
  components: {
    SidebarItem
  },
  computed: {
    ...mapState('app', ['device', 'sidebarOpened']),
    ...mapState('permission', ['routes']),
    isCollapse() {
      if (this.device === 'mobile') {
        return false
      }
      return !this.sidebarOpened
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.el-scrollbar /deep/ {
  .el-scrollbar__wrap {
    overflow-x: hidden;
    background: #fff;
  }
  .el-menu {
    border-right: 0;
    width: 100%;
  }
  .el-submenu.is-active {
    .i__icon__wrapper,
    .title {
      color: $--color-primary;
    }
  }
  .i__icon__wrapper {
    margin-right: 5px;
  }
  .title {
    transition: opacity 0s;
    transition-delay: 0.3s;
  }
  .el-menu--collapse {
    .i__icon__wrapper {
      margin-left: 5px;
    }
    .el-submenu__icon-arrow {
      opacity: 0;
    }
  }
  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }
  .el-scrollbar__bar.is-horizontal {
    display: none;
  }
}
</style>
