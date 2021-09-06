<template>
  <el-pagination
    v-show="total > 0"
    v-bind="$attrs"
    :layout="layout"
    :background="background"
    :current-page.sync="page"
    :page-size.sync="limit"
    :page-sizes="pageSizes"
    :total="total"
    @size-change="handleChange"
    @current-change="handleChange"
  />
</template>

<script>
export default {
  name: 'IPagination',
  inheritAttrs: false,
  props: {
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    total: {
      required: true,
      type: Number
    },
    pageNo: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 20, 30, 50]
      }
    }
  },
  methods: {
    handleChange() {
      this.$emit('pagination')
    }
  },
  computed: {
    page: {
      get() {
        return this.pageNo
      },
      set(val) {
        this.$emit('update:pageNo', val)
      }
    },
    limit: {
      get() {
        return this.pageSize
      },
      set(val) {
        this.$emit('update:pageSize', val)
      }
    }
  }
}
</script>
