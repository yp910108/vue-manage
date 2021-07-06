<template>
  <span class="hamburger" @click="toggleSideBar">
    <i-icon :icon="icon" />
  </span>
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
.hamburger {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  color: #7d7e80;
  cursor: pointer;
}
</style>
