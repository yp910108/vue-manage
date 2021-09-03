<template>
  <div v-show="total > 0" class="i__pagination__container">
    <el-pagination
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
  </div>
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

<style lang="scss" scoped>
.i__pagination__container ::v-deep {
  padding: 15px 16px 0;
  text-align: right;
  background: #fff;
  @media screen and (max-width: 750px) {
    .btn-prev,
    .el-pager,
    .btn-next {
      display: none;
    }
  }
  .el-input__inner {
    vertical-align: middle;
  }
}
</style>
