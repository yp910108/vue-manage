<template>
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
      <template slot="header" slot-scope="{ column, $index }">
        <slot :name="_column.slotTitle" :column="column" :$index="$index">
          {{ _column.label }}
        </slot>
      </template>
      <template v-if="!_column.type" #default="{ row, $index }">
        <slot :name="_column.slotName" :row="row" :$index="$index">
          {{ row[_column.prop] }}
        </slot>
      </template>
    </el-table-column>
    <template slot="append">
      <slot name="append" />
    </template>
  </el-table>
</template>

<script>
import { camelize } from '@/utils'

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
