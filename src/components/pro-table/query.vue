<template>
  <div class="query-wrapper">
    <el-form :model="form" class="query-content" @submit.native.prevent>
      <!-- <el-form-item label="所属项目">
        <i-select v-model="form.projectId" :options="[]" />
      </el-form-item>
      <el-form-item label="任务环节">
        <i-select v-model="form.projectLinkStatus" :options="[]" />
      </el-form-item>
      <el-form-item label="创建时间">
        <i-date-picker
          v-model="form.createTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="创建人">
        <i-select v-model="form.createPerson" :options="[]" />
      </el-form-item> -->
      <el-form-item v-for="(column, index) of columns" :key="index" :label="column.label">
        <el-input v-model.trim="form.projectId" />
      </el-form-item>
    </el-form>
    <div class="btn-group">
      <el-button type="primary" @click="query">查 询</el-button>
      <el-button plain @click="reset">重 置</el-button>
    </div>
  </div>
</template>

<script>
import { filterData } from '@/utils/data'

const form = {
  projectId: undefined,
  projectLinkStatus: undefined,
  createTime: undefined,
  createPerson: undefined
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
      form: { ...form }
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
  }
}
</script>
