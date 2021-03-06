/* eslint-disable */
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getLocalToken } from '@/utils'

NProgress.configure({ showSpinner: false })

// 白名单
const whiteList = ['/user/login']

router.beforeEach(async (to, _, next) => {
  NProgress.start()
  if (getLocalToken()) {
    /* has token */
    if (to.path === '/user/login') {
      next('/')
    } else {
      if (!store.state.user.user) {
        // 如果用户没有拉取完用户信息（当用户F5刷新页面时，没有用户信息）
        try {
          const user = await store.dispatch('user/getUser')
          store.dispatch('permission/setMenus', user)
          const route = await store.dispatch('permission/generateRoute', user)
          router.addRoute(route)
          router.addRoute({ path: '*', redirect: '/404' })
          next({ ...to, replace: true }) // hack 确保刷新页面时可以加载当前路由, set replace: true 设置之后不会留下当前路由的记录
        } catch (e) {
          console.warn(e)
          store.dispatch('user/fedLogout')
          next('/')
        }
      } else {
        next()
      }
    }
  } else {
    /* no token */
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 否则全部重定向到登录页
      next(`/user/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
