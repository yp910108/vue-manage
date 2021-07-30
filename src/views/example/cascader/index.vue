<template>
  <div class="app-content">
    <aside>
      1、与官方 <code>api</code> 尽量保持了一致性，比官方 <code>api</code> 增加了
      <code>parentValue</code> 属性，用于指定父节点的 <code>value</code>
      <br />
      2、<code>value</code> 支持只设置最后一级
      <br />
      3、修改 <code>change</code> 事件，参数为若干对象组成的数组
    </aside>
    <aside>
      普通用法
      <br />
      <i-cascader v-model="val1" :options="options1" placeholder="请选择" />
      {{ val1 }}
    </aside>
    <aside>
      设置
      <code>props: { value: 'id', label: 'name', parentValue: 'parentId', children: 'childNode' }</code>
      <br />
      <i-cascader
        v-model="val2"
        :props="{
          value: 'id',
          label: 'name',
          parentValue: 'parentId',
          children: 'childNode'
        }"
        :options="options2"
        placeholder="请选择"
        @change="val2Change"
      />
      {{ val2 }}
    </aside>
    <aside>
      <code>value</code> 只设置最后一级 <code>val3: ['310118']</code>
      <br />
      <i-cascader v-model="val3" :options="options1" placeholder="请选择" />
      {{ val3 }}
    </aside>
  </div>
</template>

<script>
import { options1, options2 } from './city'

export default {
  data() {
    return {
      val1: undefined,
      val2: ['310000', '310100', '310118'],
      val3: ['310118'],
      options1,
      options2
    }
  },
  methods: {
    val2Change(arg) {
      console.log(arg)
    }
  }
}
</script>
