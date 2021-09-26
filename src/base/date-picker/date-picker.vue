<template>
  <div
    :class="{ 'i-date-editor-wrapper': true, 'i-date-editor-hide-icon-wrapper': hideIcon }"
    @mouseenter="isMouseEnter = true"
    @mouseleave="isMouseEnter = false"
  >
    <el-date-picker v-bind="{ valueFormat, placeholder: '请选择', ...$attrs }" v-on="$listeners" />
  </div>
</template>

<script>
import { TYPE } from './constant'

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
    },
    valueFormat() {
      return {
        [TYPE.year]: 'yyyy',
        [TYPE.month]: 'yyyy-MM',
        [TYPE.date]: 'yyyy-MM-dd',
        [TYPE.dates]: 'yyyy-MM-dd',
        [TYPE.datetime]: 'yyyy-MM-dd HH:mm:ss'
      }[this.$attrs.type]
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
