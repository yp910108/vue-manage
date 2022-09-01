<template>
  <div class="app-content">
    <y-card shadow="hover" @click.native="$router.push('/example/table')">
      <y-button size="medium" type="text"> 表格 </y-button>
    </y-card>
  </div>
</template>

<style lang="scss" scoped>
.el-card {
  margin: 10px 0;
  cursor: pointer;
}
</style>
