<template>
  <div class="pro-table-content">
    <search v-if="!!columnsSearch && columnsSearch.length > 1" :columns="columnsSearch" @search="handleSearch">
      <template v-for="slotSearch of slotsSearch" #[slotSearch]="{ params, prop }">
        <slot :name="slotSearch" :params="params" :prop="prop" />
      </template>
    </search>
    <div v-if="$slots.toolbar || (!!columnsSearch && columnsSearch.length === 1)" class="toolbar">
      <slot name="toolbar" />
      <search v-if="!!columnsSearch && columnsSearch.length === 1" :columns="columnsSearch" @search="handleSearch">
        <template v-for="slotSearch of slotsSearch" #[slotSearch]="{ params, prop }">
          <slot :name="slotSearch" :params="params" :prop="prop" />
        </template>
      </search>
    </div>
    <div class="table-wrapper">
      <i-table v-loading="loadingTable" v-bind="{ data, ...$attrs, columns: columnsTable }" v-on="$listeners">
        <template v-for="slotHeader of slotsHeader" #[slotHeader]="{ column, $index }">
          <slot :name="slotHeader" :column="column" :$index="$index" />
        </template>
        <template v-for="slotColumn of slotsColumn" #[slotColumn]="{ row, $index }">
          <slot :name="slotColumn" :row="row" :$index="$index" />
        </template>
        <template #append>
          <slot name="append" />
        </template>
      </i-table>
      <i-pagination
        v-if="paginationProps"
        v-bind="{
          total,
          'current-page': currentPage,
          'page-size': pageSize,
          ...paginationProps
        }"
        v-on="{
          'update:currentPage': (newCurrentPage) => (currentPage = newCurrentPage),
          'update:pageSize': (newPageSize) => (pageSize = newPageSize),
          'current-change': fetch,
          'size-change': fetch,
          ...paginationProps
        }"
      />
    </div>
  </div>
</template>

<script>
import { camelize } from '@/utils'
import Search from './search'

export default {
  inheritAttrs: false,
  props: {
    paginationProps: {
      type: [Object, Boolean],
      default: () => ({})
    },
    request: {
      type: Function,
      default: () => async () => {}
    }
  },
  components: {
    Search
  },
  data() {
    return {
      loading: false,
      currentPage: 1, // 当前页码
      pageSize: 20, // 每页显示条数
      total: 0, // 总条数
      params: undefined,
      data: undefined
    }
  },
  methods: {
    async fetch() {
      if (this.request) {
        const { currentPage, pageSize } = this
        try {
          this.loading = true
          const { total = 0, data = [] } = (await this.request({ currentPage, pageSize, ...this.params })) || {}
          this.loading = false
          this.total = total
          this.data = data
        } catch (e) {
          console.warn(e)
          this.loading = false
        }
      }
    },
    handleSearch(params) {
      this.currentPage = 1
      this.params = params
      this.fetch()
      this.$emit('search', params)
    }
  },
  computed: {
    _columns() {
      return this.$attrs.columns.map((column) => {
        const result = {}
        for (const key in column) {
          result[camelize(key)] = column[key]
        }
        return result
      })
    },
    columnsSearch() {
      return this._columns.filter((column) => !column.type && !column.hideInSearch)
    },
    columnsTable() {
      return this._columns.filter((column) => !column.hideInTable)
    },
    slotsSearch() {
      const columns = this.columnsSearch.filter((column) => !!column.slotSearch)
      return columns.map((column) => column.slotSearch)
    },
    slotsHeader() {
      const columns = this.columnsTable.filter((column) => !!column.slotHeader)
      return columns.map((column) => column.slotHeader)
    },
    slotsColumn() {
      const columns = this._columns.filter((column) => !!column.slot)
      return columns.map((column) => column.slot)
    },
    loadingTable() {
      const { $attrs, loading } = this
      return $attrs.loading !== undefined ? $attrs.loading : loading
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
.pro-table-content ::v-deep {
  display: flex;
  flex-direction: column;
  > .search-wrapper {
    flex: 0 0 auto;
    display: flex;
    align-items: flex-start;
    margin-left: -30px;
    margin-bottom: 4px;
    overflow: hidden;
    > .search-content {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        flex: 0 0 auto;
        width: 100%;
        @media screen and (min-width: 1150px) {
          width: 50%;
        }
        @media screen and (min-width: 1500px) {
          width: 33.3%;
        }
        @media screen and (min-width: 1920px) {
          width: 25%;
        }
        display: flex;
        align-items: flex-start;
        .el-form-item__label {
          flex: 0 0 auto;
          width: 123px;
        }
        .el-form-item__content {
          flex: 1;
          width: 0;
        }
      }
    }
    > .btn-group {
      flex: 0 0 auto;
      margin-left: 10px;
    }
    > .el-icon-arrow-up {
      flex: 0 0 auto;
      margin-left: 6px;
      margin-right: -3px;
      padding: 7px 8px;
      font-size: 18px;
      color: #1890ff;
      cursor: pointer;
      transition: transform 0.2s linear;
    }
    &.collapse {
      height: 50px;
      > .el-icon-arrow-up {
        transform: rotate(-180deg);
      }
    }
  }
  > .toolbar {
    flex: 0 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    .search-wrapper {
      display: flex;
      .search-content {
        margin-right: 10px;
        .el-form-item {
          margin-bottom: 0;
          .el-form-item__label {
            display: none;
          }
          .el-form-item__content {
            .el-input,
            .el-input-number,
            .el-select,
            .i-date-editor-wrapper,
            .el-date-editor-wrapper,
            .el-date-editor {
              width: 250px;
            }
          }
        }
      }
      .btn-group {
        .el-button:nth-child(2) {
          display: none;
        }
      }
    }
  }
  > .table-wrapper {
    flex: 1;
    height: 0;
  }
}
</style>
