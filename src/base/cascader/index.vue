<template>
  <el-cascader ref="cascader" v-bind="$_attrs" v-on="$_listeners" :value="newVal" />
</template>

<script>
/**
 * 组件属性，参见 element 官网：http://element-cn.eleme.io/#/zh-CN/component/cascader
 * 注：props 属性比官方 api 多了一个 parentValue 属性
 */
import { getParents } from '@/utils'

export default {
  name: 'ICascader',
  inheritAttrs: false,
  props: ['value'],
  methods: {
    change(value) {
      if (!value.length) {
        return this.$emit('change', value)
      }
      const { props, options } = this.$_attrs
      const parents = getParents(options, value[value.length - 1], props)
      this.$emit('change', parents)
    }
  },
  computed: {
    $_attrs() {
      const { props } = this.$attrs
      return {
        filterable: true,
        clearable: true,
        ...this.$attrs,
        props: {
          value: 'value',
          label: 'label',
          parentValue: 'parentValue',
          children: 'children',
          ...props
        }
      }
    },
    $_listeners() {
      return {
        ...this.$listeners,
        change: this.change,
        input: (newVal) => {
          this.$emit('input', [...newVal])
        }
      }
    },
    newVal: {
      get() {
        if (!this.value || !this.value.length) {
          return [...(this.value || [])]
        }
        const { options } = this.$_attrs
        const parents = getParents(options, this.value[this.value.length - 1], this.$_attrs.props)
        const parentIds = parents.map((p) => p[this.$_attrs.props.value])
        return [...parentIds]
      }
    }
  },
  mounted() {
    for (const key in this.$refs.cascader) {
      if (!(key in this) && typeof this.$refs.cascader[key] === 'function') {
        this[key] = this.$refs.cascader[key]
      }
    }
  }
}
</script>
