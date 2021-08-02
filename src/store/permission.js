import { combineURL } from '@/utils'
import Layout, { EmptyLayout } from '@/layouts' // eslint-disable-line

function processMenus(menus, parentPath) {
  return menus.map((menu) => {
    const path = `/${combineURL(parentPath || '', menu.path || '')}`
    const children = processMenus(menu.children || [], path)
    return {
      ...menu,
      path,
      parentPath,
      children: children && children.length ? children : undefined
    }
  })
}

function generateRoutes(menus, parentPage) {
  return menus.map(({ path, name, children, ...restProps }) => {
    const page = combineURL(parentPage || '', path || '')
    const childrenRoutes = generateRoutes(children || [], page)
    const hasChildrenRoutes = childrenRoutes && childrenRoutes.length
    return {
      path: combineURL(path),
      component: hasChildrenRoutes ? EmptyLayout : () => import('@/views/' + page), // eslint-disable-line
      redirect: hasChildrenRoutes ? combineURL(page, childrenRoutes[0].path) : undefined,
      meta: { title: name, ...restProps },
      children: hasChildrenRoutes ? childrenRoutes : undefined
    }
  })
}

const state = {
  menus: []
}

const mutations = {
  SET_MENUS(_state, menus) {
    _state.menus = menus
  }
}

const actions = {
  setMenus({ commit }, user) {
    const menus = processMenus(user.menus || [])
    menus.unshift({ path: '/dashboard', name: '首页', icon: 'home' })
    commit('SET_MENUS', menus)
  },
  generateRoute(_, user) {
    const menus = user.menus || []
    return {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
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
        ...generateRoutes(menus)
      ]
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
