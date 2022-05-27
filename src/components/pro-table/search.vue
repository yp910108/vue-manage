<template>
  <div ref="wrapper" :class="{ 'search-wrapper': true, collapse }">
    <el-form v-if="!!columns && !!columns.length" :model="form" class="search-content" @submit.native.prevent>
      <el-form-item
        v-for="{ label, slotSearch, searchType, valueEnum, prop } of columns"
        :key="prop"
        :label="label"
        :style="styleFormItem"
      >
        <slot :name="slotSearch" :params="form" :prop="prop">
          <i-select
            v-if="searchType === SEARCH_TYPE.select || !!valueEnum"
            v-model="form[prop]"
            filterable
            :options="valueEnum"
            :placeholder="`请选择${extraPlaceholder}`"
          />
          <i-date-picker
            v-else-if="SEARCH_TYPE.date.includes(searchType)"
            v-model="form[prop]"
            :type="searchType"
            :placeholder="`请选择${extraPlaceholder}`"
          />
          <i-input v-else v-model.trim="form[prop]" :placeholder="`请输入${extraPlaceholder}`" />
        </slot>
      </el-form-item>
    </el-form>
    <div class="btn-group">
      <el-button type="primary" @click="handleSearch">查 询</el-button>
      <el-button plain @click="handleReset">重 置</el-button>
    </div>
    <i v-if="visibleCollapse" class="el-icon-arrow-up" @click="collapse = !collapse" />
  </div>
</template>

<script>
import { debounce, toRawType, getParentDom, filterData } from '@/utils'
import { TYPE as DATE_TYPE } from '@/base/date-picker/constant'

const SEARCH_TYPE = {
  select: 'select',
  date: Object.keys(DATE_TYPE)
}

const WIDTH = {
  xl: 1658,
  lg: 1238,
  md: 888
}
const WRAPPER_HEIGHT = 50

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
      styleFormItem: undefined,
      visibleCollapse: false,
      collapse: true,
      form: {}
    }
  },
  methods: {
    initForm() {
      for (const { prop, initialValue } of this.columns) {
        if (toRawType(initialValue) === 'Array') {
          this.$set(this.form, prop, [...initialValue])
        } else if (toRawType(initialValue) === 'Object') {
          this.$set(this.form, prop, { ...initialValue })
        } else {
          this.$set(this.form, prop, initialValue)
        }
      }
    },
    initWatch() {
      for (const { prop, searchOnFieldChange, searchDebounce } of this.columns) {
        if (searchOnFieldChange) {
          this.$watch(
            `form.${[prop]}`,
            debounce(() => {
              if (this.reseting) return
              this.handleSearch()
            }, searchDebounce || 0)
          )
        }
      }
    },
    getFieldValue(prop) {
      return this.form[prop]
    },
    getFielsValue(...props) {
      const result = {}
      for (const prop of props) {
        result[prop] = this.getFieldValue(prop)
      }
      return result
    },
    setFieldValue(prop, value) {
      this.form[prop] = value
    },
    setFieldsValue(fields) {
      for (const prop of Object.keys(fields)) {
        this.setFieldValue(prop, fields[prop])
      }
    },
    resetFieldValue(prop) {
      const { initialValue } = this.columns.find(({ prop: _prop }) => _prop === prop)
      if (toRawType(initialValue) === 'Array') {
        this.form[prop] = [...initialValue]
      } else if (toRawType(initialValue) === 'Object') {
        this.form[prop] = { ...initialValue }
      } else {
        this.form[prop] = initialValue
      }
    },
    resetFieldsValue(...props) {
      props = !!props.length
        ? props
        : this.columns.filter(({ ignoreOnReset }) => !ignoreOnReset).map(({ prop: _prop }) => _prop)
      for (const prop of props) {
        this.resetFieldValue(prop)
      }
    },
    setInitialValue(prop, value) {
      const column = this.columns.find(({ prop: _prop }) => _prop === prop)
      column.initialValue = value
      this.setFieldValue(prop, value)
    },
    setInitialsValue(fields) {
      for (const prop of Object.keys(fields)) {
        this.setInitialValue(prop, fields[prop])
      }
    },
    setWidth() {
      if (this.$refs.wrapper) {
        const elParent = getParentDom(this.$refs.wrapper, 'pro-table-content', true)
        const parentWidth = elParent.clientWidth
        if (parentWidth >= WIDTH.xl) {
          this.styleFormItem = { width: '25%' }
        } else if (parentWidth >= WIDTH.lg) {
          this.styleFormItem = { width: '33.3%' }
        } else if (parentWidth >= WIDTH.md) {
          this.styleFormItem = { width: '50%' }
        } else {
          this.styleFormItem = undefined
        }
      }
    },
    setCollapseVisible() {
      if (this.$refs.wrapper) {
        const elSearchContent = this.$refs.wrapper.querySelector('.search-content')
        if (elSearchContent) {
          const contentHeight = elSearchContent.clientHeight
          this.visibleCollapse = contentHeight > WRAPPER_HEIGHT
        }
      }
    },
    handleSearch() {
      this.$emit('search', filterData(this.form))
    },
    handleReset() {
      this.reseting = true
      setTimeout(() => {
        this.reseting = false
      }, 100)
      this.resetFieldsValue()
      this.handleSearch()
    },
    submit() {
      this.handleSearch()
    },
    reset() {
      this.handleReset()
    }
  },
  computed: {
    extraPlaceholder() {
      const { columns } = this
      return !!columns && columns.length === 1 ? columns[0].label : ''
    }
  },
  created() {
    this.initForm()
    this.initWatch()
    this.handleSearch()
  },
  beforeMount() {
    window.addEventListener('resize', this.setWidth)
    window.addEventListener('resize', this.setCollapseVisible)
  },
  mounted() {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    const elParent = getParentDom(this.$refs.wrapper, 'pro-table-content', true)
    const observer = new MutationObserver(() => {
      this.setWidth()
      this.setCollapseVisible()
    })
    observer.observe(elParent, { attributes: true, subtree: true, attributeFilter: ['style'] })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setWidth)
    window.removeEventListener('resize', this.setCollapseVisible)
  }
}
</script>
