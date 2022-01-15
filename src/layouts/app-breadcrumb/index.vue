<template>
  <div class="app-breadcrumb">
    <hamburger class="hamburger-wrapper" />
    <el-breadcrumb class="breadcrumb-wrapper">
      <el-breadcrumb-item v-for="{ path, title } of matched" :key="path" :to="{ path: getFirstPath(menus, path) }">
        {{ title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getParents } from '@/utils'
import Hamburger from './hamburger'

function getFirstPath(menus, targetPath) {
  for (const menu of menus) {
    const { path, children } = menu
    if (path === targetPath) {
      if (!!children && !!children.length) {
        const ret = getFirstPath(children, children[0].path)
        if (ret) return ret
      } else {
        return path
      }
    } else if (!!children && !!children.length) {
      const ret = getFirstPath(children, targetPath)
      if (ret) return ret
    }
  }
}

export default {
  components: {
    Hamburger
  },
  methods: {
    getFirstPath
  },
  computed: {
    ...mapState('permission', ['menus']),
    matched() {
      return getParents(this.menus, this.$route.path, { value: 'path', parentValue: 'parentPath' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables';

.app-breadcrumb ::v-deep {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  .hamburger-wrapper {
    margin-left: 18px;
  }
  .breadcrumb-wrapper {
    margin-left: 18px;
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        color: rgb(48, 49, 51);
        &:hover {
          color: $--color-primary;
        }
      }
      &:last-child .el-breadcrumb__inner {
        color: rgb(151, 168, 190);
      }
    }
  }
}
</style>
