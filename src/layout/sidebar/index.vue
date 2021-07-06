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

<style lang="scss">
@import './index.scss';
</style>
