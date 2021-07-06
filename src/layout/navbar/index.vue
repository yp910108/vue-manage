<template>
  <div class="nav-bar">
    <hamburger class="hamburger-wrapper" />
    <span class="breadcrumb-wrapper">当前位置：{{ locations }}</span>
  </div>
</template>
<script>
import Hamburger from './hamburger'

export default {
  components: {
    Hamburger
  },
  computed: {
    locations() {
      const matched = this.$route.matched.filter((item) => item.meta && item.meta.title)
      return matched.map((m) => m.meta.title).join(' / ')
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-bar {
  position: absolute;
  z-index: 10000;
  left: 0;
  top: 0;
  right: 0;
  height: 50px;
  background-color: #fff;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
  .hamburger-wrapper {
    float: left;
    margin-left: 18px;
    margin-top: 10px;
  }
  .breadcrumb-wrapper {
    float: left;
    margin-left: 18px;
    margin-top: 17px;
  }
}
</style>
