<template>
  <div class="query-wrapper">
    <el-form :model="form" class="query-content" @submit.native.prevent>
      <el-form-item v-for="({ label, searchType, valueEnum, prop }, index) of _columns" :key="index" :label="label">
        <i-select v-if="searchType === SEARCH_TYPE.select || !!valueEnum" v-model="form[prop]" :options="valueEnum" />
        <i-date-picker v-else-if="SEARCH_TYPE.date.includes(searchType)" v-model="form[prop]" :type="searchType" />
        <el-input v-else v-model.trim="form[prop]" placeholder="请选择" />
      </el-form-item>
    </el-form>
    <div class="btn-group">
      <el-button type="primary" @click="query">查 询</el-button>
      <el-button plain @click="reset">重 置</el-button>
    </div>
  </div>
</template>

<script>
import { camelize, filterData } from '@/utils'
import { TYPE as DATE_TYPE } from '@/base/date-picker/constant'

const SEARCH_TYPE = {
  select: 'select',
  date: Object.keys(DATE_TYPE)
}

export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      SEARCH_TYPE,
      form: {}
    }
  },
  methods: {
    query() {
      this.$emit('query', filterData(this.form))
    },
    reset() {
      this.form = this.$options.data().form
      this.query()
    }
  },
  computed: {
    _columns() {
      const _columns = this.columns.map((column) => {
        const result = {}
        for (const key in column) {
          result[camelize(key)] = column[key]
        }
        return result
      })
      return _columns.filter((column) => !column.type && !column.hideInSearch)
    }
  }
}
</script>
