<template>
  <el-select ref="select" v-bind="$_attrs" v-on="$_listeners" :value="value">
    <el-option
      v-for="item in $_attrs.options"
      :key="item[$_attrs.props.value]"
      :label="item[$_attrs.props.label]"
      :value="item[$_attrs.props.value]"
    />
  </el-select>
</template>

<script>
export default {
  name: 'ISelect',
  inheritAttrs: false,
  props: ['value'],
  methods: {
    getItem() {
      const { label, value } = this.$_attrs.props
      const { options } = this.$_attrs
      const items = options.filter((o) => o[value] === this.value)
      const item = items[0]
      return item ? { ...item, value: item[value], label: item[label] } : {}
    }
  },
  computed: {
    $_attrs() {
      const { props = {} } = this.$attrs
      return {
        clearable: true,
        ...this.$attrs,
        props: {
          value: 'value',
          label: 'label',
          ...props
        }
      }
    },
    $_listeners() {
      return {
        ...this.$listeners,
        input: (newVal) => {
          this.$emit('input', newVal)
        },
        change: () => {
          this.$nextTick(() => {
            this.$emit('change', this.getItem())
          })
        }
      }
    }
  },
  mounted() {
    for (const key in this.$refs.select) {
      if (!(key in this) && typeof this.$refs.select[key] === 'function') {
        this[key] = this.$refs.select[key]
      }
    }
  }
}
</script>
