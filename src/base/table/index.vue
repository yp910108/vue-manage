<template>
  <el-table v-bind="$attrs" v-on="$listeners">
    <el-table-column
      v-for="({ slotTitle, slot, ..._column }, index) of _columns"
      v-bind="{
        resizable: false,
        showOverflowTooltip: true,
        ..._column
      }"
      :key="index"
    >
      <template #header="{ column, $index }">
        <slot :name="slotTitle" :column="column" :$index="$index">
          {{ _column.label }}
        </slot>
      </template>
      <template v-if="!_column.type" #default="{ row, $index }">
        <slot :name="slot" :row="row" :$index="$index">
          {{ renderText(_column, row, $index) }}
        </slot>
      </template>
    </el-table-column>
    <template #append>
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
        return result
      })
    }
  }
}
</script>
