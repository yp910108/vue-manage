<template>
  <div class="app-content">
    <aside>
      1、与官方 <code>api</code> 尽量保持了一致性，比官方 <code>api</code> 增加了 <code>props</code> 属性
      <br />
      2、简化 <code>el-select</code> 用法，不需要手动添加 <code>el-option</code>
      <br />
      3、修改 <code>change</code> 事件，参数为一个对象
    </aside>
    <aside>
      普通用法
      <br />
      <i-select v-model="val1" :options="options1" placeholder="请选择" /> {{ val1 }}
    </aside>
    <aside>
      设置
      <code>props: { value: 'id', label: 'name' }</code>
      <br />
      <i-select
        v-model="val2"
        :props="{ value: 'id', label: 'name' }"
        :options="options2"
        placeholder="请选择"
        @change="val2Change"
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
      val2: undefined,
      options1: [
        { value: '10001', label: '黄金糕' },
        { value: '10002', label: '双皮奶' },
        { value: '10003', label: '蚵仔煎' },
        { value: '10004', label: '龙须面' },
        { value: '10005', label: '北京烤鸭' }
      ],
      options2: [
        { id: '10001', name: '黄金糕' },
        { id: '10002', name: '双皮奶' },
        { id: '10003', name: '蚵仔煎' },
        { id: '10004', name: '龙须面' },
        { id: '10005', name: '北京烤鸭' }
      ]
    }
  },
  methods: {
    val2Change(arg) {
      console.log(arg)
    }
  }
}
</script>
