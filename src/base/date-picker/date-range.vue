<template>
  <div
    :class="{ 'i-date-editor-wrapper': true, 'i-date-editor-hide-icon-wrapper': hideIcon }"
    @mouseenter="isMouseEnter = true"
    @mouseleave="isMouseEnter = false"
  >
    <el-date-picker v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {
      isMouseEnter: true
    }
  },
  computed: {
    hideIcon() {
      return this.$attrs.value && this.isMouseEnter
    }
  }
}
</script>

<style lang="scss" scoped>
.i-date-editor-wrapper ::v-deep {
  display: inline-block;
  .el-date-editor {
    display: flex;
    padding-left: 15px;
    .el-range__icon {
      position: absolute;
      z-index: 0;
      right: 5px;
      line-height: 30px;
    }
    .el-range-input {
      flex: 1;
      text-align: left;
    }
    .el-range-separator {
      flex: 0 0 auto;
      width: 26px;
    }
    .el-range__close-icon {
      position: relative;
      z-index: 1;
      flex: 0 0 auto;
      margin-right: -5px;
    }
  }
}
</style>

<style lang="scss">
.i-date-editor-wrapper.i-date-editor-hide-icon-wrapper {
  .el-date-editor .el-range__icon {
    display: none;
  }
}
</style>
