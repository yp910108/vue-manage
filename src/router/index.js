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
