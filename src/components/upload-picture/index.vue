<template>
  <div class="upload-picture">
    <y-upload v-bind="$_attrs" v-on="$listeners" :class="{ 'upload-icon-hide': !uploadAble }">
      <y class="el-icon-plus" />
    </y-upload>
    <preview ref="preview" :url="currUrl" />
  </div>
</template>

<script>
import Preview from './preview'

export default {
  inheritAttrs: false,
  components: { Preview },
  data() {
    return {
      currUrl: ''
    }
  },
  methods: {
    preview({ url }) {
      this.currUrl = url
      this.$refs.preview.show()
    },
    exceed() {
      const { limit } = this.$attrs
      if (limit) {
        this.$message({
          message: `最多上传${limit}张`,
          type: 'warning'
        })
      }
    }
  },
  computed: {
    $_attrs() {
      const { disabled } = this.$attrs
      return {
        accept: 'image/jpg, image/jpeg, image/gif, image/png',
        'list-type': 'picture-card',
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
.upload-picture ::v-deep {
  line-height: 1;
  .el-upload--picture-card {
    margin: 0 8px 8px 0;
  }
  .upload-icon-hide {
    .el-upload__tip,
    .el-upload--picture-card {
      display: none;
    }
  }
}
</style>
