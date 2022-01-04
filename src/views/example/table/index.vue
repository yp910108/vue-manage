<template>
  <div class="app-content">
    <pro-table :columns="columns" :request="methodRequest">
      <template #toolbar>
        <el-button type="primary">新 建</el-button>
      </template>
      <template #action="{ row }">
        <el-button type="text" @click="handleEdit(row)">修改</el-button>
        <el-popconfirm title="确定删除该条数据吗？" class="pop-btn" @onConfirm="handleDelete(row)">
          <el-button slot="reference" type="text">删除</el-button>
        </el-popconfirm>
      </template>
    </pro-table>
  </div>
</template>

<script>
import ProTable from '@/components/pro-table'
import { sexOptions, sexKeyValue, SEX } from './constant'
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
          valueEnum: sexOptions,
          render: (text) => sexKeyValue[text],
          initialValue: SEX.woman
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
      ]
    }
  },
  methods: {
    async methodRequest(params) {
      console.log(params)
      params = { ...params, pageNo: params.currentPage }
      delete params.currentPage
      const { list, total } = await fetchList(params)
      return { data: list, total }
    },
    handleEdit(item) {
      console.log(item)
    },
    handleDelete(item) {
      console.log(item)
    }
  }
}
</script>
