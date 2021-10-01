<template>
  <div class="app-content">
    <el-card shadow="hover" @click.native="$router.push('/example/select')">
      <el-button size="medium" type="text"> 下拉框演示 </el-button>
    </el-card>
    <el-card shadow="hover" @click.native="$router.push('/example/tree-select')">
      <el-button size="medium" type="text"> 下拉树演示 </el-button>
    </el-card>
    <el-card shadow="hover" @click.native="$router.push('/example/tree-checkbox')">
      <el-button size="medium" type="text"> 下拉多选树演示 </el-button>
    </el-card>
    <el-card shadow="hover" @click.native="$router.push('/example/cascader')">
      <el-button size="medium" type="text"> 级联选择演示 </el-button>
    </el-card>
    <el-card shadow="hover" @click.native="$router.push('/example/upload')">
      <el-button size="medium" type="text"> 上传演示 </el-button>
    </el-card>
    <el-card shadow="hover" @click.native="$router.push('/example/dict')">
      <el-button size="medium" type="text"> 字典 </el-button>
    </el-card>
    <el-card shadow="hover" @click.native="$router.push('/example/loading')">
      <el-button size="medium" type="text"> Loading </el-button>
    </el-card>
    <el-card shadow="hover" @click.native="$router.push('/example/table')">
      <el-button size="medium" type="text"> 表格 </el-button>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.el-card {
  margin: 10px 0;
  cursor: pointer;
}
</style>
