<template>
  <div class="app-content">
    <pro-table :columns="columns" :request="methodRequest">
      <template #action="{ row }">
        <el-button type="text" size="small" @click="handleEdit(row)">修改</el-button>
        <el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
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
    }, 1000)
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
      ]
    }
  },
  methods: {
    async methodRequest(params) {
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
