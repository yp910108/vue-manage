<template>
  <div v-if="visiable" class="sidebar-item-wrapper">
    <el-submenu v-if="isMenu" :index="resolve(router.path)">
      <div v-if="router.meta" slot="title" class="title-wrapper">
        <i-icon v-if="router.meta.icon" class="sidebar-icon-wrapper" :icon="router.meta.icon" />
        <span class="title">{{ router.meta.title }}</span>
      </div>
      <template v-for="child in router.children">
        <template v-if="!child.hidden">
          <sidebar-item
            v-if="child.children && child.children.length"
            :key="resolve(child.path)"
            :item="child"
            :basePath="resolve(child.path)"
          />
          <el-menu-item v-else :key="resolve(child.path)" :index="resolve(child.path)" @click="redirect(child)">
            {{ child.meta.title }}
          </el-menu-item>
        </template>
      </template>
    </el-submenu>
    <el-menu-item
      v-else-if="router.meta"
      :key="resolve(router.path)"
      :index="resolve(router.path)"
      @click="redirect(router)"
    >
      <i-icon v-if="router.meta.icon" class="sidebar-icon-wrapper" :icon="router.meta.icon" />
      <span class="title" slot="title">{{ router.meta.title }}</span>
    </el-menu-item>
  </div>
</template>
<script>
import path from 'path'

export default {
  name: 'SidebarItem',
  props: {
    basePath: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    resolve(url) {
      return path.resolve(this.basePath, url)
    },
    redirect(route) {
      let { path, fullPath } = this.$route
      let targetPath = this.resolve(route.path)
      if (path === targetPath) {
        this.$router.replace({
          path: `/redirect${fullPath}` // fullPath: /foo/index/123456?name=tom
        })
      } else {
        this.$router.push(targetPath)
      }
    }
  },
  computed: {
    visiable() {
      let { children, hidden } = this.item
      if (children && children.length) {
        children = children.filter((child) => !child.hidden)
      }
      return !hidden && children && children.length
    },
    isMenu() {
      let { alwaysShow, children } = this.item
      if (alwaysShow) {
        return true
      }
      if (children && children.length) {
        children = children.filter((child) => !child.hidden)
      }
      if (children.length === 1) {
        let child = children[0]
        if (!child || !child.children || !child.children.length) {
          return false
        }
      }
      return true
    },
    router() {
      let { children } = this.item
      if (!this.isMenu) {
        let child = children[0]
        return child
      }
      return this.item
    }
  }
}
</script>
