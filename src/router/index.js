import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'
import Login from '@/views/user/login'
import Redirect from '@/views/redirect'
import NotFound from '@/views/404'

Vue.use(Router)

// vue-router3.0+ 版本返回 promise，要求增加 catch 函数 此处进行 hack
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export { default as routes } from './routes'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/user/login',
      name: 'UserLogin',
      component: Login
    },
    {
      path: '/redirect',
      component: Layout,
      children: [
        {
          path: ':path*',
          component: Redirect
        }
      ]
    },
    {
      path: '/404',
      component: NotFound
    }
  ]
})
