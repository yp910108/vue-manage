import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layouts' // eslint-disable-line

/* Router Modules */
import user from './user'

Vue.use(Router)

// vue-router3.0+ 版本返回 promise，要求增加 catch 函数 此处进行 hack
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  user,
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: ':path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  }
]

// 初始路由在这里配置
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
    },
    {
      path: 'nested/child1/second',
      name: 'NestedChild1Second',
      component: () => import('@/views/nested/child1/second'),
      meta: {
        title: '嵌套的路由 / 子路由1 / 二级路由',
        hidden: true
      }
    },
    {
      path: 'without-nested/second',
      name: 'WithoutNestedSecond',
      component: () => import('@/views/without-nested/second'),
      meta: {
        title: '无嵌套的路由 / 二级路由',
        hidden: true
      }
    }
  ]
}

// 未匹配的路由需要跳转的页面在这里配置
export const unmatchedRoute = {
  path: '*',
  redirect: '/'
}

export default new Router({
  mode: 'history',
  routes
})
