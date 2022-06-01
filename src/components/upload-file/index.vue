<template>
  <div class="upload-file">
    <i-upload v-bind="$_attrs" v-on="$listeners" :class="{ 'upload-btn-hide': !uploadAble }">
      <el-button plain>点击上传</el-button>
    </i-upload>
  </div>
</template>

<script>
import { combineURL } from '@/utils'

export default {
  inheritAttrs: false,
  methods: {
    async preview({ response, url }) {
      if (response) {
        url = `/${combineURL(process.env.VUE_APP_API_URL, response.url)}`
      }
      window.open(url)
    },
    exceed() {
      const { limit } = this.$attrs
      if (limit) {
        this.$message({
          message: `最多上传${limit}个`,
          type: 'warning'
        })
      }
    }
  },
  computed: {
    $_attrs() {
      const { disabled } = this.$attrs
      return {
        limit: 0,
        'on-preview': this.preview,
        'on-exceed': this.exceed,
        ...this.$attrs,
        disabled: disabled === '' ? true : disabled
      }
    },
    uploadAble() {
      const { disabled, value, limit } = this.$_attrs
      if (disabled) return false
      if (!limit) return true
      if (!value || !value.length) return true
      return value.length < limit
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-file ::v-deep {
  .upload-btn-hide {
    .el-upload__tip,
    .el-upload--text {
      display: none;
    }
  }
}
</style>
