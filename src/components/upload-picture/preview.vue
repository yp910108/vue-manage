<template>
  <y-dialog
    :visible.sync="visible"
    :modal-append-to-body="true"
    :append-to-body="true"
    title="图片预览"
    custom-class="upload-picture-preview-dialog"
  >
    <img :src="url" alt />
  </y-dialog>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
    }
  }
}
</script>

<style lang="scss">
.upload-picture-preview-dialog {
  .el-dialog__header {
    line-height: normal;
  }
  .el-dialog__body {
    text-align: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
