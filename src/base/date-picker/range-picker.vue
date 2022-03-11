<template>
  <div
    :class="{ 'i-date-editor-wrapper': true, 'i-date-editor-hide-icon-wrapper': hideIcon }"
    @mouseenter="isMouseEnter = true"
    @mouseleave="isMouseEnter = false"
  >
    <el-date-picker
      v-bind="{ valueFormat, rangeSeparator: '至', startPlaceholder, endPlaceholder, ...$attrs }"
      v-on="$listeners"
    />
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
      return this.$attrs.disabled === undefined && this.$attrs.value && this.isMouseEnter
    },
    valueFormat() {
      return {
        [TYPE.monthrange]: 'yyyy-MM',
        [TYPE.daterange]: 'yyyy-MM-dd',
        [TYPE.datetimerange]: 'yyyy-MM-dd HH:mm:ss'
      }[this.$attrs.type]
    },
    startPlaceholder() {
      return {
        [TYPE.monthrange]: '开始月份',
        [TYPE.daterange]: '开始日期',
        [TYPE.datetimerange]: '开始日期'
      }[this.$attrs.type]
    },
    endPlaceholder() {
      return {
        [TYPE.monthrange]: '结束月份',
        [TYPE.daterange]: '结束日期',
        [TYPE.datetimerange]: '结束日期'
      }[this.$attrs.type]
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
