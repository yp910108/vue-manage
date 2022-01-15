<template>
  <el-dropdown type="primary" trigger="click" :hide-on-click="false">
    <el-button type="primary" icon="el-icon-setting" />
    <el-dropdown-menu ref="dropdown" slot="dropdown" class="pro-table-settings-popper">
      <el-dropdown-item class="check-all-wrapper">
        <el-checkbox v-model="checkAll" :indeterminate="indeterminate">列展示/排序</el-checkbox>
        <el-button type="text" @click="handleReset">重置</el-button>
      </el-dropdown-item>
      <el-scrollbar>
        <el-checkbox-group v-model="checked">
          <el-dropdown-item v-for="({ label, prop }, index) of columns" :key="prop">
            <i-icon icon="drag-column" />
            <el-checkbox :label="prop">{{ label }}</el-checkbox>
            <span class="operation">
              <i v-if="index !== 0" class="el-icon-upload2" @click="handleUp(prop)" />
              <i v-if="index !== columns.length - 1" class="el-icon-download" @click="handleDown(prop)" />
            </span>
          </el-dropdown-item>
        </el-checkbox-group>
      </el-scrollbar>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import sortable from 'sortablejs'

export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleReset() {
      this.$emit('column-reset')
    },
    handleUp(prop) {
      this.$emit('column-up', prop)
    },
    handleDown(prop) {
      this.$emit('column-down', prop)
    },
    setSort() {
      if (this.sortable) {
        this.sortable.destroy()
      }
      const el = this.$refs.dropdown.$el.querySelector('.el-checkbox-group')
      this.sortable = sortable.create(el, {
        animation: 200,
        easing: 'linear',
        onEnd: ({ oldIndex, newIndex }) => {
          this.$emit('column-move', oldIndex, newIndex)
        }
      })
    }
  },
  computed: {
    checked: {
      get() {
        const columnsChecked = this.columns.filter(({ hideInSettings }) => !hideInSettings)
        return columnsChecked.map(({ prop }) => prop)
      },
      set(newVal) {
        this.$emit('column-toggle', newVal)
      }
    },
    checkAll: {
      get() {
        return this.checked.length === this.columns.length
      },
      set(newVal) {
        if (newVal) {
          this.checked = this.columns.map(({ prop }) => prop)
        } else {
          this.checked = []
        }
      }
    },
    indeterminate() {
      return !this.checkAll && !!this.checked.length
    }
  },
  watch: {
    columns() {
      this.$nextTick(() => {
        this.setSort()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.pro-table-settings-popper ::v-deep {
  padding-bottom: 8px;
  width: 200px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  .check-all-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebeef5;
    padding: 10px 18px;
    line-height: 1;
    &:hover {
      background: transparent;
    }
    .el-checkbox {
      .el-checkbox__input {
        vertical-align: top;
        .el-checkbox__inner {
          vertical-align: top;
        }
      }
      .el-checkbox__label {
        vertical-align: top;
        line-height: 1;
        color: inherit;
      }
    }
    .el-button {
      padding: 0;
      font-weight: bold;
      font-size: 14px;
    }
  }
  .el-scrollbar {
    .el-scrollbar__wrap {
      max-height: 270px;
      .el-checkbox-group {
        padding-top: 8px;
        .el-dropdown-menu__item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          height: 28px;
          line-height: 1;
          .i-icon {
            flex: 0 0 auto;
            font-size: 12px;
          }
          .el-checkbox {
            display: flex;
            flex: 1;
            align-items: center;
            margin-left: 6px;
            width: 0;
            height: 100%;
            font-weight: normal;
            .el-checkbox__input {
              flex: 0 0 auto;
              .el-checkbox__inner {
                vertical-align: top;
              }
            }
            .el-checkbox__label {
              flex: 1;
              width: 0;
              line-height: 1;
              @include nowrap();
              color: inherit;
            }
          }
          .operation {
            display: none;
            flex: 0 0 auto;
            margin-left: 5px;
            margin-right: -6px;
            width: 42px;
            i {
              vertical-align: top;
              font-size: 16px;
            }
          }
          &:focus {
            background: transparent;
          }
          &:hover {
            background: $--dropdown-menuItem-hover-fill;
            .operation {
              display: block;
            }
          }
        }
        .sortable-ghost {
          opacity: 0.8;
          background: $--color-primary;
          .i-icon {
            color: #fff;
          }
          .el-checkbox__label {
            color: #fff !important;
          }
        }
      }
    }
  }
}
</style>
