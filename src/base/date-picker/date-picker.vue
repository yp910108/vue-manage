<template>
  <div
    :class="{ i__date__editor__wrapper: true, __hide__icon: hideIcon }"
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
.i__date__editor__wrapper ::v-deep {
  display: inline-block;
  .el-date-editor {
    .el-input__prefix {
      left: auto;
      right: 5px;
    }
    .el-input__inner {
      padding-left: 15px;
    }
  }
}
</style>

<style lang="scss">
.i__date__editor__wrapper.__hide__icon {
  .el-date-editor .el-input__prefix {
    display: none;
  }
}
</style>
