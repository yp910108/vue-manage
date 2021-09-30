<template>
  <div class="app-content">
    <pro-table
      :columns="columns"
      :loading="loading"
      :data="list"
      :total="total"
      :pageNo.sync="pageNo"
      :pageSize.sync="pageSize"
      border
      @search="handleSearch"
      @selection-change="handleSelectionChange"
      @pagination="fetchList"
    >
      <template #action="{ row }">
        <el-button type="text" size="small" @click="handleEdit(row)">修改</el-button>
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

function fetchList({ name, sex, idCard, startBirthDate, endBirthDate, pageNo, pageSize }) {
  return new Promise((resolve) => {
    let list = []
    for (let i = 0; i < 23; i++) {
      list.push({
        name: `张三${i + 1}`,
        sex: i % 2 === 0 ? SEX.man : SEX.woman,
        phone: '13812345678',
        idCard: '370181200022222222',
        birthDate: `${1991 + i * 2}-10-01`
      })
    }
    if (name) {
      list = list.filter((item) => item.name.includes(name))
    }
    if (sex) {
      list = list.filter((item) => item.sex === sex)
    }
    if (idCard) {
      list = list.filter((item) => item.idCard.includes(idCard))
    }
    if (startBirthDate && endBirthDate) {
      list = list.filter(
        (item) =>
          new Date(item.birthDate).getTime() >= new Date(startBirthDate).getTime() && // eslint-disable-line
          new Date(item.birthDate).getTime() <= new Date(endBirthDate).getTime()
      )
    }
    let result = list
    if (pageNo) {
      result = list.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    }
    setTimeout(() => {
      resolve({ total: list.length, list: result })
    }, 500)
  })
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
          width: 110,
          align: 'center',
          label: '操作',
          slot: 'action',
          hideInSearch: true
        }
      ],
      loading: false,
      pageNo: 1, // 当前页码
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
        pageNo: this.pageNo,
        pageSize: this.pageSize
      })
      this.loading = false
      this.total = total
      this.list = list
    },
    handleSearch(params) {
      params = {
        ...params,
        startBirthDate: (params.birthDate || [])[0],
        endBirthDate: (params.birthDate || [])[1]
      }
      delete params.birthDate
      this.params = params
      this.fetchList()
    },
    handleSelectionChange(checked) {
      console.log(checked)
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
