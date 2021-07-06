<template>
  <div class="app-content">
    <aside>
      请切换至其他路由，然后返回此路由查看控制台输出
    </aside>
    <aside>
      {{ dict }}
    </aside>
  </div>
</template>

<script>
import remotes from '@/mixins/remotes'

export default {
  mixins: [remotes]
}
</script>
