<template>
  <el-table ref="table" v-bind="{ border: true, ...$attrs }" v-on="$listeners">
    <el-table-column
      v-for="({ slotHeader, slot, ..._column }, index) of _columns"
      v-bind="{
        resizable: false,
        showOverflowTooltip: true,
        ..._column
      }"
      :key="_column.prop || _column.type || index"
    >
      <template #header="{ column, $index }">
        <slot :name="slotHeader" :column="column" :$index="$index">
          {{ column.label }}
        </slot>
      </template>
      <template v-if="!_column.type || _column.type === 'expand'" #default="{ row, $index }">
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
      if (!!render && typeof render === 'function') {
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
  },
  watch: {
    '$attrs.data'() {
      this.$nextTick(this.$refs.table.doLayout)
    }
  },
  activated() {
    this.$refs.table.doLayout()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$refs.table.doLayout)
  },
  mounted() {
    for (const key in this.$refs.table) {
      if (!(key in this) && typeof this.$refs.table[key] === 'function') {
        this[key] = this.$refs.table[key]
      }
    }
    window.addEventListener('resize', this.$refs.table.doLayout)
  }
}
</script>
