<template>
  <el-scrollbar ref="scrollContainer" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script>
export default {
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap
      $scrollWrapper.scrollLeft -= eventDelta / 4
    },
    moveToTarget(target) {
      const vnodes = this.$slots.default
      if (!target || !vnodes || !vnodes.length) return
      const $container = this.$refs.scrollContainer.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap
      const $scrollWidth = $scrollWrapper.scrollWidth
      if ($scrollWidth <= $containerWidth) return
      const $els = vnodes.map((vnode) => vnode.elm)
      const currentIndex = $els.findIndex(($el) => $el === target)
      if (currentIndex === -1) return
      let $prev = target
      let $next = target
      if (currentIndex !== 0) {
        $prev = $els[currentIndex - 1]
      }
      if (currentIndex !== $els.length - 1) {
        $next = $els[currentIndex + 1]
      }
      const $scrollLeft = $scrollWrapper.scrollLeft
      const $prevLeft = $prev.offsetLeft
      const $nextLeft = $next.offsetLeft + $next.offsetWidth
      if ($prevLeft < $scrollLeft) {
        $scrollWrapper.scrollLeft = $prevLeft
      } else if ($nextLeft > $scrollLeft + $containerWidth) {
        $scrollWrapper.scrollLeft = $nextLeft - $containerWidth
      }
    },
    update() {
      this.$refs.scrollContainer.update()
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container ::v-deep {
  position: relative;
  width: 100%;
  height: calc(100% + 10px);
  white-space: nowrap;
  overflow: hidden;
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
