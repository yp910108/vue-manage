<template>
  <div
    :class="{ 'i-date-editor-wrapper': true, 'i-date-editor-hide-icon-wrapper': hideIcon }"
    @mouseenter="isMouseEnter = true"
    @mouseleave="isMouseEnter = false"
  >
    <el-time-picker v-bind="{ valueFormat: 'HH:mm:ss', placeholder: '请选择', ...$attrs }" v-on="$listeners" />
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
      return this.$attrs.disabled === undefined && this.$attrs.value && this.isMouseEnter
    }
  }
}
</script>

<style lang="scss" scoped>
.i-date-editor-wrapper ::v-deep {
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
.i-date-editor-wrapper.i-date-editor-hide-icon-wrapper {
  .el-date-editor .el-input__prefix {
    display: none;
  }
}
</style>
