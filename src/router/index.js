import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layouts'

Vue.use(Router)

// vue-router3.0+ 版本返回 promise，要求增加 catch 函数 此处进行 hack
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

// 初始路由（不需要 layout 的路由）在这里配置
const routes = [
  {
    path: '/user/login',
    name: 'UserLogin',
    component: () => import('@/views/user/login')
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: ':path*',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  }
]

// 初始路由（需要 layout 的路由）在这里配置（注：配置在 children 中 🙌）
export const route = {
  path: '/',
  component: Layout,
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard'),
      meta: {
        title: '首页',
        icon: 'home'
      }
    }
  ]
}

// 页面级路由（一般为二级路由）在这里配置，此类路由不会出现在导航菜单中
export const pageRoutes = [
  {
    path: 'nested/child1/second',
    name: 'NestedChild1Second',
    component: () => import('@/views/nested/child1/second'),
    meta: {
      title: '嵌套的路由 / 子路由1 / 二级路由'
    }
  },
  {
    path: 'without-nested/second',
    name: 'WithoutNestedSecond',
    component: () => import('@/views/without-nested/second'),
    meta: {
      title: '无嵌套的路由 / 二级路由'
    }
  }
]

// 未匹配的路由需要跳转的页面在这里配置
export const unmatchedRoute = {
  path: '*',
  redirect: '/404'
}

export default new Router({
  mode: 'history',
  routes
})
