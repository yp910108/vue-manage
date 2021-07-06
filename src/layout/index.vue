<template>
  <div class="app-wrapper" :class="classApp">
    <div class="drawer-bg" @click="handleClickOutside"></div>
    <app-header />
    <app-sidebar class="app-sidebar" />
    <div class="app-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>
<script>
import resizeHandler from './mixin/resize'
import { mapState } from 'vuex'
import AppHeader from './app-header'
import AppSidebar from './app-sidebar'
import Navbar from './navbar'
import AppMain from './app-main'

export default {
  mixins: [resizeHandler],
  components: {
    AppHeader,
    AppSidebar,
    Navbar,
    AppMain
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/setDevice', 'mobile')
      this.$store.dispatch('app/setSidebar', 0)
    }
  },
  computed: {
    ...mapState('app', ['device', 'sidebarOpened']),
    classApp() {
      return {
        mobile: this.device === 'mobile',
        'hide-sidebar': !this.sidebarOpened
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  .drawer-bg {
    display: none;
    position: fixed;
    z-index: 1001;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
  .app-sidebar {
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    z-index: 1002;
    border-right: solid 1px #e6e6e6;
    width: 200px;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    user-select: none;
  }
  .app-container {
    position: relative;
    z-index: 1000;
    margin-left: 200px;
    padding-top: 50px;
    height: calc(100vh - 60px);
    transition: margin-left 0.3s ease-in-out;
    overflow: auto;
  }
  &.hide-sidebar:not(.mobile) /deep/ {
    .app-sidebar {
      width: 64px;
    }
    .el-submenu__title .el-submenu__icon-arrow {
      display: none;
    }
    .app-container {
      margin-left: 64px;
    }
    .title {
      opacity: 0;
    }
  }
  &.mobile {
    .drawer-bg {
      display: block;
    }
    .app-container {
      margin-left: 0;
    }
    &.hide-sidebar {
      .drawer-bg {
        display: none;
      }
      .app-sidebar {
        transform: translateX(-100%);
      }
    }
  }
}
</style>
