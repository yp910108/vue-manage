<template>
  <el-submenu v-if="!!item.children && !!item.children.length" :index="item.path">
    <div slot="title" class="title-wrapper">
      <i-icon v-if="item.icon" :icon="item.icon" />
      <span class="title">{{ item.name }}</span>
    </div>
    <sidebar-item v-for="child in item.children" :key="child.path" :item="child" />
  </el-submenu>
  <el-menu-item v-else :index="item.path" @click="handleItemClick(item.path)">
    <i-icon v-if="item.icon" :icon="item.icon" />
    <span class="title" slot="title">{{ item.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleItemClick(targetPath) {
      const { path, fullPath } = this.$route
      if (path === targetPath) {
        this.$router.replace(`/redirect${fullPath}`) // fullPath: /foo/index/123456?name=tom
      } else {
        this.$router.push(targetPath)
      }
    }
  }
}
</script>
