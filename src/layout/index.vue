<template>
  <div class="app-wrapper" :class="classApp">
    <div class="drawer-bg" @click="handleClickOutside"></div>
    <app-header />
    <sidebar class="sidebar-wrapper" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>
<script>
import resizeHandler from './mixin/resize'
import { mapState } from 'vuex'
import AppHeader from './header'
import Sidebar from './sidebar'
import Navbar from './navbar'
import AppMain from './app-main'

export default {
  mixins: [resizeHandler],
  components: {
    AppHeader,
    Sidebar,
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
<style lang="scss">
.app-wrapper {
  width: 100%;
  height: 100%;
  // 主体区域
  .main-container {
    position: relative;
    margin-left: 200px;
    padding-top: 50px;
    height: calc(100vh - 60px);
    overflow: auto;
  }
}
</style>
