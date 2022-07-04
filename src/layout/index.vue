<template>
  <div class="app-wrapper" :class="classApp">
    <div class="drawer-bg" @click="handleClickOutside" />
    <app-header />
    <app-sidebar />
    <div class="app-container">
      <app-breadcrumb />
      <app-tags />
      <app-main />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import resizeHandler from './mixin/resize'
import AppHeader from './app-header'
import AppSidebar from './app-sidebar'
import AppBreadcrumb from './app-breadcrumb'
import AppTags from './app-tags'
import AppMain from './app-main'

export default {
  name: 'Layout',
  mixins: [resizeHandler],
  components: {
    AppHeader,
    AppSidebar,
    AppBreadcrumb,
    AppTags,
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
  .app-header {
    position: relative;
    z-index: 1002;
  }
  .app-sidebar {
    position: fixed;
    left: 0;
    top: 50px;
    bottom: 0;
    z-index: 1002;
    width: 200px;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    user-select: none;
  }
  .app-container {
    position: relative;
    z-index: 1000;
    margin-left: 200px;
    padding-top: 84px;
    height: calc(100vh - 50px);
    transition: margin-left 0.3s ease-in-out;
    overflow: auto;
    .app-breadcrumb {
      position: absolute;
      z-index: 1000;
      left: 0;
      top: 0;
      right: 0;
    }
    .app-tags {
      position: absolute;
      z-index: 1000;
      left: 0;
      top: 50px;
      right: 0;
    }
  }
  &.hide-sidebar:not(.mobile) ::v-deep {
    .app-sidebar {
      width: 64px;
      .el-submenu__title .el-submenu__icon-arrow {
        display: none;
      }
      .title {
        opacity: 0;
      }
    }
    .app-container {
      margin-left: 64px;
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
