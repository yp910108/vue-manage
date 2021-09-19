<template>
  <div class="upload-file">
    <i-upload v-bind="$_attrs" v-on="$listeners" :class="{ 'hide-upload-btn': !uploadAble }">
      <el-button plain>点击上传</el-button>
    </i-upload>
  </div>
</template>

<script>
import { baseUrl } from '@/config'
import { combineURL } from '@/utils'
import { getPreviewUrl } from '@/api/common'

export default {
  inheritAttrs: false,
  methods: {
    async preview({ response, id }) {
      try {
        if (response) {
          let { value } = response.value
          value = JSON.parse(value)
          id = value.fileId
        }
        const { pdfUrl, currentUrl } = await getPreviewUrl({ fileId: id })
        const url = combineURL(baseUrl, '/portal/', pdfUrl || currentUrl)
        window.open(url)
      } catch (e) {
        // do nothing
      }
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
  .hide-upload-btn {
    .el-upload__tip,
    .el-upload--text {
      display: none;
    }
  }
}
</style>
