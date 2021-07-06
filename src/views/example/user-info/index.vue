<template>
  <div class="app-content">
    <aside>由于用户信息使用交频繁，所以直接将用户信息放入全局 <code>mixin</code> 中</aside>
    <aside>用户信息：{{ user }}</aside>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.user)
  }
}
</script>
