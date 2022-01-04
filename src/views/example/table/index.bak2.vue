<template>
  <div class="app-content">
    <pro-table :columns="columns" :loading="loading" :data="list" :pagination="false" @search="handleSearch">
      <template #action="{ row }">
        <el-button type="text" size="small" @click="handleEdit(row)">修改</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </pro-table>
    <i-pagination
      :total="total"
      :currentPage="currentPage"
      :pageSize="pageSize"
      @update:currentPage="(newCurrentPage) => (currentPage = newCurrentPage)"
      @update:pageSize="(newPageSize) => (pageSize = newPageSize)"
      @size-change="fetchList"
      @current-change="fetchList"
    />
  </div>
</template>

<script>
import ProTable from '@/components/pro-table'
import { sexOptions, sexKeyValue } from './constant'
import { fetchList } from './api'

export default {
  components: {
    ProTable
  },
  data() {
    return {
      columns: [
        {
          type: 'index',
          width: 50,
          align: 'center',
          label: '序号'
        },
        {
          prop: 'name',
          align: 'center',
          label: '姓名'
        },
        {
          prop: 'sex',
          align: 'center',
          label: '性别',
          slot: 'sex',
          valueEnum: sexOptions,
          render: (text) => sexKeyValue[text]
        },
        {
          prop: 'phone',
          align: 'center',
          label: '手机号',
          hideInSearch: true
        },
        {
          prop: 'idCard',
          align: 'center',
          label: '身份证号'
        },
        {
          prop: 'birthDate',
          align: 'center',
          label: '出生日期',
          searchType: 'daterange'
        },
        {
          width: 110,
          align: 'center',
          label: '操作',
          slot: 'action',
          hideInSearch: true
        }
      ],
      loading: false,
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条数
      total: 0, // 总条数
      params: undefined,
      list: undefined
    }
  },
  methods: {
    async fetchList() {
      this.loading = true
      const { total, list } = await fetchList({
        ...this.params,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      this.loading = false
      this.total = total
      this.list = list
    },
    handleSearch(params) {
      this.currentPage = 1
      params = {
        ...params,
        startBirthDate: (params.birthDate || [])[0],
        endBirthDate: (params.birthDate || [])[1]
      }
      delete params.birthDate
      this.params = params
      this.fetchList()
    },
    handleEdit(item) {
      console.log(item)
    }
  },
  created() {
    this.fetchList()
  }
}
</script>

<style scoped>
.pro-table-content {
  height: 90%;
}
</style>
