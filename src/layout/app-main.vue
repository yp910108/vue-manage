<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
    <div class="copy-right">{{ COPYRIGHT }}提供技术服务 <br />联系电话：{{ CONTACT }}</div>
  </div>
</template>
<script>
import { CONTACT, COPYRIGHT } from '@/constants/common'

export default {
  data() {
    return {
      CONTACT,
      COPYRIGHT
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.app-main {
  position: relative;
  padding: 15px 15px 0;
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  overflow: auto;
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
  .copy-right {
    box-sizing: content-box;
    padding: 15px 0;
    line-height: 25px;
    text-align: center;
    color: #00000073;
  }
}
</style>
