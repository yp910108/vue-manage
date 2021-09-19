<template>
  <div class="pro-table-content">
    <query :columns="_columns" />
    <el-table v-bind="$attrs" v-on="$listeners">
      <el-table-column
        v-for="(_column, index) of _columns"
        v-bind="{
          resizable: false,
          showOverflowTooltip: true,
          ..._column
        }"
        :key="index"
      >
        <template #header="{ column, $index }">
          <slot :name="_column.slotTitle" :column="column" :$index="$index">
            {{ _column.label }}
          </slot>
        </template>
        <template v-if="!_column.type" #default="{ row, $index }">
          <slot :name="_column.slotName" :row="row" :$index="$index">
            {{ renderText(_column, row, $index) }}
          </slot>
        </template>
      </el-table-column>
      <template slot="append">
        <slot name="append" />
      </template>
    </el-table>
  </div>
</template>

<script>
import { camelize } from '@/utils'
import Query from './query'

export default {
  name: 'ITable',
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    Query
  },
  methods: {
    renderText({ render, prop }, row, index) {
      if (render && typeof render === 'function') {
        return render(row[prop], row, index)
      } else {
        return row[prop]
      }
    }
  },
  computed: {
    _columns() {
      return this.columns.map((column) => {
        const result = {}
        for (const key in column) {
          result[camelize(key)] = column[key]
        }
        if (result.slot) {
          result.slotName = result.slot
          delete result.slot
        }
        return result
      })
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
