<template>
  <div class="app-content">
    <pro-table :columns="columns" :data="list" border @selection-change="handleSelectionChange">
      <template #action="{ row }">
        <el-button type="text" size="small" @click="handleAdd(row)">新增</el-button>
        <el-button type="text" size="small">修改</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </pro-table>
  </div>
</template>

<script>
import ProTable from '@/components/pro-table'

const SEX = {
  man: 1,
  woman: 2
}
const sexOptions = [
  { value: SEX.man, label: '男' },
  { value: SEX.woman, label: '女' }
]
const sexKeyValue = {
  [SEX.man]: '男',
  [SEX.woman]: '女'
}

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
          align: 'center',
          label: '操作',
          slot: 'action',
          hideInSearch: true
        }
      ],
      list: new Array(20)
        .fill({
          name: '张三',
          sex: SEX.man,
          phone: '13812345678',
          idCard: '370181200022222222',
          birthDate: '1991-04-01'
        })
        .map((item, index) => ({ id: index, ...item, sex: index % 2 === 0 ? SEX.man : SEX.woman }))
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
