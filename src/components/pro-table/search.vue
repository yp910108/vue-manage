<template>
  <div ref="wrapper" :class="{ 'search-wrapper': true, collapse }">
    <el-form :model="form" class="search-content" @submit.native.prevent>
      <el-form-item
        v-for="({ label, slotSearch, searchType, valueEnum, prop }, index) of columns"
        :key="index"
        :label="label"
      >
        <slot :name="slotSearch" :params="form" :prop="prop">
          <i-select v-if="searchType === SEARCH_TYPE.select || !!valueEnum" v-model="form[prop]" :options="valueEnum" />
          <i-date-picker v-else-if="SEARCH_TYPE.date.includes(searchType)" v-model="form[prop]" :type="searchType" />
          <i-input v-else v-model.trim="form[prop]" />
        </slot>
      </el-form-item>
    </el-form>
    <div class="btn-group">
      <el-button type="primary" @click="handleSearch">查 询</el-button>
      <el-button plain @click="handleReset">重 置</el-button>
    </div>
    <i v-show="visibleCollapse" class="el-icon-arrow-up" @click="collapse = !collapse" />
  </div>
</template>

<script>
import { filterData } from '@/utils'
import { TYPE as DATE_TYPE } from '@/base/date-picker/constant'

const SEARCH_TYPE = {
  select: 'select',
  date: Object.keys(DATE_TYPE)
}

const HEIGHT_WRAPPER = 51

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
      visibleCollapse: false,
      collapse: true,
      form: {}
    }
  },
  methods: {
    initForm() {
      this.columns.forEach(({ prop, initialValue }) => {
        this.$set(this.form, prop, initialValue)
      })
    },
    setVisibleCollapse() {
      const elSearchContent = this.$refs.wrapper.querySelector('.search-content')
      const heightContent = elSearchContent.clientHeight
      this.visibleCollapse = heightContent > HEIGHT_WRAPPER
    },
    handleSearch() {
      this.$emit('search', filterData(this.form))
    },
    handleReset() {
      this.form = this.$options.data().form
      this.handleSearch()
    }
  },
  watch: {
    columns: {
      immediate: true,
      handler() {
        this.$nextTick(this.setVisibleCollapse)
      }
    }
  },
  created() {
    this.initForm()
  },
  beforeMount() {
    window.addEventListener('resize', this.setVisibleCollapse)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setVisibleCollapse)
  }
}
</script>
