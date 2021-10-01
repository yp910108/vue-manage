<template>
  <el-pagination
    v-show="$attrs.total > 0"
    v-bind="{
      layout: 'total, sizes, prev, pager, next, jumper',
      background: true,
      pageSizes: [5, 10, 20, 30, 50],
      ...$attrs
    }"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'IPagination',
  inheritAttrs: false
}
</script>
