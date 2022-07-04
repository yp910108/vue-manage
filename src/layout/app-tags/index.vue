<template>
  <div class="app-tags">
    <scroll-panel ref="scrollPane">
      <router-link
        v-for="tag of tags"
        ref="scrollItem"
        :key="tag.path"
        :to="{ path: tag.path }"
        class="tag"
        @contextmenu.native.prevent="handleOpenMenu(tag, $event)"
      >
        <span class="title">{{ tag.meta.title }}</span>
        <i class="close" @click.prevent.stop="handleClose(tag)" />
      </router-link>
    </scroll-panel>
    <ul v-show="visible" :style="styleMenu" class="contextmenu">
      <li @click="handleRefresh">刷新</li>
      <li @click="handleClose(selected)">关闭</li>
      <li @click="handleCloseOther">关闭其他</li>
      <li @click="handleCloseAll">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ScrollPanel from '@/components/scroll-panel'

export default {
  components: {
    ScrollPanel
  },
  data() {
    return {
      visible: false,
      styleMenu: {},
      selected: undefined
    }
  },
  methods: {
    ...mapActions('tagsView', ['addTag', 'deleteTag', 'deleteView', 'deleteOtherTags', 'deleteAllTags']),
    moveToCurrentTag() {
      const tags = this.$refs.scrollItem
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
          }
        }
      })
    },
    handleClose(tag) {
      this.deleteTag(tag)
      if (tag.path === this.$route.path) {
        const lastRoute = this.tags[this.tags.length - 1]
        if (lastRoute) {
          this.$router.push(lastRoute.path)
        } else {
          this.$router.push('/redirect')
        }
      }
    },
    handleOpenMenu(tag, e) {
      const { left: offsetLeft, top: offsetTop } = this.$el.getBoundingClientRect()
      const { clientWidth } = this.$el
      this.styleMenu = {
        left: `${Math.min(clientWidth - 105, e.clientX - offsetLeft + 15)}px`,
        top: `${e.clientY - offsetTop}px`
      }
      this.visible = true
      this.selected = tag
    },
    hanldeCloseMenu() {
      this.visible = false
    },
    handleRefresh() {
      this.deleteView(this.selected)
      const { fullPath } = this.selected
      this.$router.replace(`/redirect${fullPath}`)
    },
    handleCloseOther() {
      this.deleteOtherTags(this.selected)
      this.$router.push(this.selected.path)
    },
    handleCloseAll() {
      this.deleteAllTags()
      this.$router.push('/redirect')
    }
  },
  computed: {
    ...mapState('tagsView', ['tags'])
  },
  watch: {
    $route(newVal) {
      if (newVal.name) {
        this.addTag(newVal)
        this.moveToCurrentTag()
      }
    },
    tags() {
      this.$nextTick(this.$refs.scrollPane.update)
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.hanldeCloseMenu)
      } else {
        document.body.removeEventListener('click', this.hanldeCloseMenu)
      }
    }
  },
  mounted() {
    this.addTag(this.$route)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

.app-tags {
  border-bottom: 1px solid #d8dce5;
  height: 34px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  user-select: none;
  .tag {
    display: inline-block;
    vertical-align: top;
    margin-left: 5px;
    margin-top: 4px;
    border: 1px solid #d8dce5;
    padding: 6px 8px;
    font-size: 0;
    background: #fff;
    cursor: pointer;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    .title {
      display: inline-block;
      vertical-align: top;
      margin-left: 6px;
      line-height: 1;
      font-size: 12px;
      color: #495060;
    }
    .close {
      position: relative;
      display: inline-block;
      vertical-align: top;
      margin-left: 8px;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      transform: rotate(45deg);
      &:before {
        content: '';
        position: absolute;
        left: 2px;
        top: 50%;
        right: 2px;
        height: 1px;
        background: #495060;
        transform: translateY(-50%);
      }
      &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 2px;
        bottom: 2px;
        width: 1px;
        background: #495060;
        transform: translateX(-50%);
      }
      &:hover {
        background-color: #b4bccc;
        &:before,
        &:after {
          background: #fff;
        }
      }
    }
    &.router-link-active {
      border-color: $--color-primary;
      background-color: $--color-primary;
      &:before {
        content: '';
        display: inline-block;
        vertical-align: top;
        border-radius: 50%;
        margin-top: 2px;
        width: 8px;
        height: 8px;
        background: #fff;
      }
      .title {
        color: #fff;
      }
      .close:before,
      .close:after {
        background: #fff;
      }
    }
  }
  .contextmenu {
    position: absolute;
    z-index: 1;
    border-radius: 4px;
    padding: 5px 0;
    font-weight: 400;
    font-size: 12px;
    background: #fff;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
