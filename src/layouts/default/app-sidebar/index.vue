<template>
  <el-scrollbar class="app-sidebar">
    <el-menu unique-opened :default-active="defaultActive" :collapse="isCollapse">
      <sidebar-item v-for="menu in menus" :key="menu.path" :item="menu" />
    </el-menu>
  </el-scrollbar>
</template>
<script>
import { mapState } from 'vuex'
import { getChild } from '@/utils'
import SidebarItem from './sidebar-item.vue'

export default {
  components: {
    SidebarItem
  },
  computed: {
    ...mapState('app', ['device', 'sidebarOpened']),
    ...mapState('permission', ['menus']),
    defaultActive() {
      let { path } = this.$route
      while (path) {
        if (getChild(this.menus, path, { value: 'path' })) break
        path = path.slice(0, path.lastIndexOf('/'))
      }
      return path
    },
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
@import '@/styles/variables';

.app-sidebar ::v-deep {
  .el-scrollbar__wrap {
    overflow-x: hidden;
    background: #2b2b2d;
  }
  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }
  .el-scrollbar__bar.is-horizontal {
    display: none;
  }
  .el-menu {
    border-right: 0;
    width: 100%;
    background-color: #2b2b2d;
    .i-icon {
      margin-right: 14px;
    }
    .el-menu-item {
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      font-size: 14px;
      color: #cdcdcd;
      &.is-active {
        color: $--color-primary;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 21px;
          width: 2px;
          height: 14px;
          background: $--color-primary;
        }
      }
      &:hover,
      &:focus {
        background: transparent;
      }
    }
    .el-submenu {
      .el-submenu__title {
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        font-size: 14px;
        color: #cdcdcd;
        &:hover,
        &:focus {
          background: transparent;
        }
      }
      &.is-active {
        .el-submenu__title {
          color: $--color-primary;
        }
        .el-submenu__title:before {
          content: '';
          position: absolute;
          left: 0;
          top: 21px;
          width: 2px;
          height: 14px;
          background: $--color-primary;
        }
        .el-menu .el-menu-item:before {
          display: none;
        }
      }
      &.is-opened {
        .el-menu {
          display: block !important;
        }
      }
    }
    &.el-menu--collapse {
      .i-icon {
        margin-left: 5px;
      }
    }
  }
}
</style>
