<template>
  <div class="app-content">
    <pro-table :columns="columns" :data="list" border @selection-change="handleSelectionChange">
      <template slot="action" slot-scope="{ row }">
        <el-button type="text" size="small" @click="handleAdd(row)">新增</el-button>
        <el-button type="text" size="small">修改</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </pro-table>
  </div>
</template>

<script>
import ProTable from '@/components/pro-table'

export default {
  components: {
    ProTable
  },
  data() {
    return {
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          align: 'center',
          label: '姓名',
          prop: 'name'
        },
        {
          align: 'center',
          label: '性别',
          prop: 'sex'
        },
        {
          align: 'center',
          label: '手机号',
          prop: 'phone'
        },
        {
          align: 'center',
          label: '身份证号',
          prop: 'idCard'
        },
        {
          align: 'center',
          label: '操作',
          slot: 'action'
        }
      ],
      list: new Array(10)
        .fill({
          name: '张三',
          sex: '男',
          phone: '13812345678',
          idCard: '370181200022222222'
        })
        .map((item, index) => ({ id: index, ...item }))
    }
  },
  methods: {
    handleSelectionChange(checked) {
      console.log(checked)
    },
    handleAdd(item) {
      console.log(item)
    }
  }
}
</script>
