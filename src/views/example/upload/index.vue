<template>
  <div class="app-content">
    <aside>
      1、简化调用方式，直接通过 <code>v-model</code> 的方式调用即可
      <br />
      2、考虑到上传图片和上传文件用到的最多，所以基于 <code>i-upload</code> 封装了 <code>upload-picture</code> 和
      <code>upload-file</code> 公用组件
    </aside>
    <aside>
      上传图片
      <br />
      <upload-picture v-model="pics" /> {{ pics }}
    </aside>
    <aside>
      上传文件
      <br />
      <upload-file v-model="files" /> {{ files }}
    </aside>
  </div>
</template>

<script>
import UploadPicture from '@/components/upload-picture'
import UploadFile from '@/components/upload-file'

export default {
  components: {
    UploadPicture,
    UploadFile
  },
  data() {
    return {
      pics: undefined,
      files: undefined
    }
  }
}
</script>
