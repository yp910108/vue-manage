<template>
  <el-upload ref="upload" v-bind="$_attrs">
    <slot />
  </el-upload>
</template>

<script>
import { getLocalToken, combineURL } from '@/utils'

export default {
  name: 'IUpload',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    setValue() {
      const files = this.$refs.upload.uploadFiles.filter((file) => file.status === 'success')
      const newVal = files.map((file) => {
        const { response } = file
        if (response) {
          let { value } = response
          try {
            value = JSON.parse(value)
            const { fileId: id, fileName: name, size } = value
            value = { id, name, size, username: this.user.name }
          } catch (e) {
            value = {}
          }
          return value
        } else {
          const { id, name, size, username } = file
          return { id, name, size, username }
        }
      })
      this.isSetValue = true
      this.$emit('input', newVal)
    }
  },
  computed: {
    $_attrs() {
      return {
        name: 'file',
        headers: {
          Authorization: `Bearer ${getLocalToken()}`
        },
        action: combineURL(process.env.VUE_APP_API_URL, '/portal/system/file/v1/upload'),
        'file-list': this.fileList,
        'on-success': this.setValue,
        'on-remove': this.setValue,
        multiple: true,
        ...this.$attrs
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if (this.isSetValue) {
          this.isSetValue = false
          return
        }
        if (newVal && newVal instanceof Array) {
          this.fileList = newVal.map((item) => {
            const { id } = item
            return {
              ...item,
              url: combineURL(process.env.VUE_APP_API_URL, `/portal/file/onlinePreviewController/v1/getFileById_${id}`)
            }
          })
        }
      }
    }
  }
}
</script>
