<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>
<script>
export default {
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables';

.app-main {
  position: relative;
  padding: 15px;
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  overflow-x: hidden;
  .fade-transform-enter-active,
  .fade-transform-leave-active {
    transition: all 0.5s;
  }
  .fade-transform-enter {
    transform: translate3d(-30px, 0, 0);
    opacity: 0;
  }
  .fade-transform-leave-to {
    transform: translate3d(30px, 0, 0);
    opacity: 0;
  }
}
</style>
