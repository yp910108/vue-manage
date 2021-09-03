<template>
  <el-popover
    ref="popover"
    v-model="visible"
    :width="popoverWidth"
    popper-class="i__select__tree__popover"
    transition="el-zoom-in-top"
    placement="bottom-start"
    @show="show"
  >
    <el-scrollbar ref="scrollbar">
      <el-tree ref="tree" v-bind="$_attrs" v-on="$_listeners" :filter-node-method="filterMethod">
        <template slot-scope="{ node }">
          <slot :node="node">
            {{ node.label }}
          </slot>
        </template>
      </el-tree>
    </el-scrollbar>
    <div ref="reference" slot="reference" class="reference">
      <el-input
        ref="value"
        v-model="text"
        :placeholder="placeholder"
        :class="{ 'arrow-up': this.visible, 'is-focus': this.visible }"
        :clearable="$_attrs.clearable"
        suffix-icon="el-icon-arrow-down"
        @clear="clear"
      />
    </div>
  </el-popover>
</template>

<script>
/**
 * 插件参数，参见 element 官网：http://element-cn.eleme.io/#/zh-CN/component/tree
 * 注：比官方 api 多了一个 placeholder、clearable、filterable 属性
 *    props 属性比官方 api 多了一个 value、parentValue
 */
/* eslint-disable vue/no-side-effects-in-computed-properties */
import { getParents } from '@/utils'

export default {
  name: 'ISelectTree',
  inheritAttrs: false,
  props: ['value'],
  data() {
    return {
      visible: false,
      popoverWidth: 0,
      filterText: undefined
    }
  },
  methods: {
    show() {
      this.popoverWidth = this.$refs.reference.clientWidth
      this.$refs.tree.setCurrentKey(this.value)
      this.$nextTick(() => {
        this.scrollToCurrent()
      })
    },
    getCurrentNode() {
      const nodeKey = this.$_attrs['node-key']
      const { options, props } = this.$_attrs
      const { children } = props
      const inner = (list) => {
        list = list || options
        for (const item of list) {
          const currentId = item[nodeKey]
          const arr = item[children]
          if (currentId === this.value) {
            const ret = { ...item }
            delete ret[children]
            return ret
          } else if (arr && arr.length) {
            const ret = inner(arr)
            if (ret) {
              return ret
            }
          }
        }
      }
      return inner()
    },
    scrollToCurrent() {
      const $container = this.$refs.scrollbar.$el.querySelector('.el-scrollbar__wrap')
      if (!this.value) {
        $container.scrollTop = 0
        return
      }
      const { offsetHeight } = $container
      const $target = this.$refs.tree.$el.querySelector('.is-current')
      if (!$target) return
      const { offsetTop } = $target
      if (offsetTop >= offsetHeight - 30) {
        $container.scrollTop = offsetTop - offsetHeight + 30
      }
    },
    removeCurrentKey() {
      const $target = this.$refs.tree.$el.querySelector('.is-current')
      if ($target) {
        const cls = $target.className
        $target.className = cls.replace('is-current', '')
      }
    },
    updatePopper() {
      setTimeout(() => {
        this.$refs.popover.updatePopper()
      }, 300)
    },
    filterMethod(value, data) {
      if (!value) return true
      const { props, options } = this.$_attrs
      const arr = getParents(options, data[props.value], props)
      return arr.some((item) => item[props.label].indexOf(value) !== -1)
    },
    clear() {
      this.$emit('input', undefined)
    }
  },
  computed: {
    $_attrs() {
      const { props = {}, options } = this.$attrs
      return {
        clearable: true,
        filterable: true,
        placeholder: '请选择',
        'default-expand-all': true,
        'expand-on-click-node': false,
        'highlight-current': true,
        'node-key': props.value || 'value',
        ...this.$attrs,
        props: {
          value: 'value',
          label: 'label',
          parentValue: 'parentValue',
          children: 'children',
          ...props
        },
        data: options
      }
    },
    $_listeners() {
      const nodeKey = this.$_attrs['node-key']
      return {
        ...this.$listeners,
        'node-click': (item) => {
          this.$emit('input', item[nodeKey])
          this.$emit('node-click', item)
          this.visible = false
        },
        'node-expand': () => {
          this.updatePopper()
          this.$emit('node-expand')
        },
        'node-collapse': () => {
          this.updatePopper()
          this.$emit('node-collapse')
        }
      }
    },
    editable() {
      return this.$_attrs.filterable
    },
    label() {
      const node = this.getCurrentNode()
      return node ? node[this.$_attrs.props.label] : ''
    },
    text: {
      get() {
        if (!this.editable) {
          return this.label
        } else {
          return this.visible ? this.filterText : this.label
        }
      },
      set(newVal) {
        this.filterText = newVal
      }
    },
    placeholder() {
      const { placeholder } = this.$_attrs
      if (!this.editable) {
        return placeholder
      } else {
        return !this.label ? placeholder : this.visible ? this.label : placeholder
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    visible() {
      this.filterText = undefined
    }
  },
  mounted() {
    if (!this.editable) {
      this.$refs.value.$el.querySelector('.el-input__inner').setAttribute('readonly', true)
    }
  }
}
</script>

<style lang="scss">
.i__select__tree__popover {
  padding: 8px 0;
  min-width: 0;
  .popper__arrow {
    left: 35px !important;
  }
}
</style>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.el-scrollbar ::v-deep {
  .el-scrollbar__wrap {
    max-height: 260px;
    overflow-x: hidden;
  }
  .el-tree > .el-tree-node > .el-tree-node__content {
    padding: 0 3px !important;
  }
  .el-tree-node {
    white-space: normal;
    .el-tree-node__content {
      padding-right: 20px;
      height: auto;
      line-height: 30px;
    }
  }
  .el-tree-node__content {
    align-items: flex-start;
    .el-tree-node__expand-icon {
      padding: 9px;
    }
  }
  .is-current > .el-tree-node__content {
    font-weight: bold;
    background-color: #fff;
    color: $--color-primary;
    &:hover {
      background-color: #f5f7fa;
    }
  }
}

.reference ::v-deep {
  .el-input {
    .el-input__inner {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .el-input__inner,
    .el-input__suffix {
      cursor: pointer;
    }
    &.is-focus {
      .el-input__inner {
        border-color: $--color-primary;
      }
    }
  }
  .el-icon-circle-close {
    position: absolute;
    top: 1px;
    margin-left: -25px;
    height: 30px;
    line-height: 30px;
    background: #fff;
  }
  .arrow-up {
    .el-icon-arrow-down {
      transform: rotate(-180deg);
    }
  }
}
</style>
