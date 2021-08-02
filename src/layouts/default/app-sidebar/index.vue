<template>
  <el-scrollbar>
    <el-menu unique-opened :default-active="$route.path" :collapse="isCollapse">
      <sidebar-item v-for="menu in menus" :key="menu.path" :item="menu" />
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
    ...mapState('permission', ['menus']),
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
    .i__icon__wrapper {
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
    }
    &.el-menu--collapse {
      .i__icon__wrapper {
        margin-left: 5px;
        width: auto;
        height: auto;
        visibility: visible;
      }
    }
  }
}
</style>
