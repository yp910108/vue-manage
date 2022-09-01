<template>
  <div class="app-content">
    <y-pro-table :columns="columns" :request="methodRequest">
      <template #toolbar-left>
        <y-button v-has="'add'" type="primary">新 建</y-button>
      </template>
      <template #action="{ row }">
        <y-button v-has="'edit'" type="text" @click="handleEdit(row)">修改</y-button>
        <y-divider direction="vertical" />
        <y-popconfirm v-has="'delete'" title="确定删除该条数据吗？" @onConfirm="handleDelete(row)">
          <y-button slot="reference" type="text">删除</y-button>
        </y-popconfirm>
      </template>
    </y-pro-table>
  </div>
</template>

<script>
import { has } from '@/directives'
import { sexOptions, sexKeyValue, SEX } from './constant'
import { fetchList } from './api'

export default {
  directives: { has },
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
          hideInSearch: true,
          hideInTable: !this.has('edit', 'delete')
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
