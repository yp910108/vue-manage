<template>
  <div class="pro-table-content">
    <query :columns="columnSearches">
      <template v-for="slotSearch of slotSearches" #[slotSearch]>
        <slot :name="slotSearch" />
      </template>
    </query>
    <i-table v-bind="$attrs" v-on="$listeners">
      <template v-for="slotTitle of slotTitles" #[slotTitle]="{ column, $index }">
        <slot :name="slotTitle" :column="column" :$index="$index" />
      </template>
      <template v-for="slot of slots" #[slot]="{ row, $index }">
        <slot :name="slot" :row="row" :$index="$index" />
      </template>
      <template #append>
        <slot name="append" />
      </template>
    </i-table>
  </div>
</template>

<script>
import { camelize } from '@/utils'
import Query from './query'

export default {
  inheritAttrs: false,
  components: {
    Query
  },
  computed: {
    columnSearches() {
      const _columns = this.$attrs.columns.map((column) => {
        const result = {}
        for (const key in column) {
          result[camelize(key)] = column[key]
        }
        return result
      })
      return _columns.filter((column) => !column.type && !column.hideInSearch)
    },
    slotSearches() {
      const columns = this.columnSearches.filter((column) => !!column.slotSearch)
      return columns.map((column) => column.slotSearch)
    },
    slots() {
      const columns = this.$attrs.columns.filter((column) => !!column.slot)
      return columns.map((column) => column.slot)
    },
    slotTitles() {
      const columns = this.$attrs.columns.filter((column) => !!column.slotTitle)
      return columns.map((column) => column.slotTitle)
    }
  }
}
</script>

<style lang="scss" scoped>
.pro-table-content ::v-deep {
  display: flex;
  flex-direction: column;
  > .query-wrapper {
    flex: 0 0 auto;
    display: flex;
    align-items: flex-start;
    margin-left: -30px;
    margin-bottom: 4px;
    > .query-content {
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
