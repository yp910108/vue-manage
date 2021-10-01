<template>
  <div class="pro-table-content">
    <search :columns="searchColumns" @search="handleSearch">
      <template v-for="searchSlot of searchSlots" #[searchSlot]="{ params, prop }">
        <slot :name="searchSlot" :params="params" :prop="prop" />
      </template>
    </search>
    <i-table v-loading="$attrs.loading" v-bind="$attrs" v-on="$listeners">
      <template v-for="headerSlot of headerSlots" #[headerSlot]="{ column, $index }">
        <slot :name="headerSlot" :column="column" :$index="$index" />
      </template>
      <template v-for="slot of slots" #[slot]="{ row, $index }">
        <slot :name="slot" :row="row" :$index="$index" />
      </template>
      <template #append>
        <slot name="append" />
      </template>
    </i-table>
    <i-pagination v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import { camelize } from '@/utils'
import Search from './search'

export default {
  inheritAttrs: false,
  components: {
    Search
  },
  methods: {
    handleSearch(params) {
      this.$emit('search', params)
    }
  },
  computed: {
    searchColumns() {
      const _columns = this.$attrs.columns.map((column) => {
        const result = {}
        for (const key in column) {
          result[camelize(key)] = column[key]
        }
        return result
      })
      return _columns.filter((column) => !column.type && !column.hideInSearch)
    },
    searchSlots() {
      const columns = this.searchColumns.filter((column) => !!column.searchSlot)
      return columns.map((column) => column.searchSlot)
    },
    headerSlots() {
      const columns = this.$attrs.columns.filter((column) => !!column.headerSlot)
      return columns.map((column) => column.headerSlot)
    },
    slots() {
      const columns = this.$attrs.columns.filter((column) => !!column.slot)
      return columns.map((column) => column.slot)
    }
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
    > .collapse {
      transform: rotate(-180deg);
    }
  }
  > .table-wrapper {
    flex: 1;
    height: 0;
  }
}
</style>
