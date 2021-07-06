import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

/* Router Modules */
import user from './user'
import example from './example'

Vue.use(Router)

// vue-router3.0+ 版本返回 promise，要求增加 catch 函数 此处进行 hack
const originalPush = Router.prototype.push
Router.prototype.push = function(location) {
  return originalPush.call(this, location).catch((err) => err)
}

/**
 * hidden: true               如果设置为 true，则不会在导航菜单中显示
 * alwaysShow: true           默认父菜单下面只有一个子菜单时，父菜单不会显示，如果设置该字段为 ture，那么父菜单下面只有一个子菜单时也会显示父菜单
 * ignorePermission: true,    如果设置为 ture，则无论当前路由是否有权限，都会加入到路由中
 * meta: {
 *   title: '系统管理',        菜单名称，如果后台数据库没有设置菜单名称字段，将根据此字段显示
 *   icon: 'system'           菜单图标的名称（注：只会在根菜单下出现图标，子菜单不会出现）
 * }
 */

// 不需要权限控制的路由在此处配置
export const constantRoutes = [
  user,
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    ignorePermission: true,
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
  },
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
  },
  example
]

// 需要控制权限的路由在此配置
export const asyncRoutes = []

// 未匹配的路由需要跳转的页面在这里配置
export const unmatchedRoute = {
  path: '*',
  redirect: '/'
}

export default new Router({
  routes: constantRoutes
})
