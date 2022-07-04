<template>
  <i-icon :icon="icon" @click="toggleSideBar" />
</template>
<script>
import { mapState } from 'vuex'

export default {
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/setSidebar', this.sidebarOpened ? 0 : 1)
    }
  },
  computed: {
    ...mapState('app', ['sidebarOpened']),
    icon() {
      return this.sidebarOpened ? 'menu-fold' : 'menu-unfold'
    }
  }
}
</script>
<style lang="scss" scoped>
.i-icon {
  padding: 5px;
  font-size: 30px;
  color: #7d7e80;
  cursor: pointer;
}
</style>
