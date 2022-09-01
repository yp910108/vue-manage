import { processMenuAuthData, getAuthData } from '@/utils'

function has(...vals) {
  const { path } = this.$route
  const menus = processMenuAuthData(this.$store.state.permission.menuAuthData)
  const auth = getAuthData(menus, path) || []
  return vals.some((val) => auth.includes(val))
}

export default {
  install(Vue) {
    Vue.prototype.has = has
  }
}
