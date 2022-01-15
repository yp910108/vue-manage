import { processMenuAuthData, getAuthData } from '@/utils'

const has = {
  inserted(el, { value }, { context }) {
    if (value && value.length > 0) {
      const { path } = context.$route
      const menus = processMenuAuthData(context.$store.state.permission.menuAuthData)
      const auth = getAuthData(menus, path) || []
      if (!auth.includes(value)) {
        if (!!el.parentNode) {
          el.parentNode.removeChild(el)
        }
      }
    } else {
      console.error('need args like v-has="add"')
    }
  }
}

export default function (Vue) {
  Vue.directive('has', has)
}
