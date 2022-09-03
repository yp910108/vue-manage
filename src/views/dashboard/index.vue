<template>
  <div class="app-content">
    <y-card shadow="hover" @click.native="$router.push('/demo')">
      <y-button size="medium" type="text">Demo 演示</y-button>
    </y-card>
  </div>
</template>

<style lang="scss" scoped>
.el-card {
  margin: 10px 0;
  cursor: pointer;
}
</style>
