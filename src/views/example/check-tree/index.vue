<template>
  <div class="app-content">
    <aside>
      1、因为官方没有下拉树组件，所以此组件是基于 <code>el-tree</code> 进行封装的
      <br />
      2、与官方 <code>api</code> 尽量保持了一致性，比官方 <code>api</code> 增加了
      <code>placeholder</code>、<code>clearable</code>、<code>filterable</code> 属性，<code>props</code> 属性比官方
      <code>api</code> 多了一个 <code>value</code>、<code>parentValue</code>，数据属性为
      <code>options</code>
      <br />
      3、官方文档 <code>http://element-cn.eleme.io/#/zh-CN/component/tree</code>
    </aside>
    <aside>
      普通用法
      <br />
      <i-check-tree v-model="val1" :options="options1" placeholder="请选择" />
      {{ val1 }}
    </aside>
    <aside>
      设置
      <code>props: { value: 'id', label: 'name', parentValue: 'parentId', children: 'childNode' }</code>
      <br />
      <i-check-tree
        v-model="val2"
        :props="{
          value: 'id',
          label: 'name',
          parentValue: 'parentId',
          children: 'childNode'
        }"
        :options="options2"
        placeholder="请选择"
      />
      {{ val2 }}
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val1: undefined,
      val2: [1000103, 1000203],
      options1: [
        {
          value: 10001,
          label: '1-1',
          children: [
            {
              value: 1000101,
              parentValue: 10001,
              label: '1-1-1'
            },
            {
              value: 1000102,
              parentValue: 10001,
              label: '1-1-2'
            },
            {
              value: 1000103,
              parentValue: 10001,
              label: '1-1-3'
            },
            {
              value: 1000104,
              parentValue: 10001,
              label: '测试超出长度测试超出长度测试超出长度测试超出长度'
            },
            {
              value: 1000105,
              parentValue: 10001,
              label: '1-1-5'
            }
          ]
        },
        {
          value: 10002,
          label: '1-2',
          children: [
            {
              value: 1000201,
              parentValue: 10002,
              label: '1-2-1'
            },
            {
              value: 1000202,
              parentValue: 10002,
              label: '1-2-2'
            },
            {
              value: 1000203,
              parentValue: 10002,
              label: '1-2-3'
            },
            {
              value: 1000204,
              parentValue: 10002,
              label: '1-2-4'
            },
            {
              value: 1000205,
              parentValue: 10002,
              label: '1-2-5'
            }
          ]
        }
      ],
      options2: [
        {
          id: 10001,
          name: '1-1',
          childNode: [
            {
              id: 1000101,
              parentId: 10001,
              name: '1-1-1'
            },
            {
              id: 1000102,
              parentId: 10001,
              name: '1-1-2'
            },
            {
              id: 1000103,
              parentId: 10001,
              name: '1-1-3'
            },
            {
              id: 1000104,
              parentId: 10001,
              name: '测试超出长度测试超出长度测试超出长度测试超出长度'
            },
            {
              id: 1000105,
              parentId: 10001,
              name: '1-1-5'
            }
          ]
        },
        {
          id: 10002,
          name: '1-3',
          childNode: [
            {
              id: 1000201,
              parentId: 10002,
              name: '1-2-1'
            },
            {
              id: 1000202,
              parentId: 10002,
              name: '1-2-2'
            },
            {
              id: 1000203,
              parentId: 10002,
              name: '1-2-3'
            },
            {
              id: 1000204,
              parentId: 10002,
              name: '1-2-4'
            },
            {
              id: 1000205,
              parentId: 10002,
              name: '1-2-5'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.app-content ::v-deep {
  .el-popover__reference {
    display: inline-block;
    width: 300px;
  }
}
</style>
