import { combineURL } from '@/utils'
import { route } from '@/router'
import { EmptyLayout } from '@/layouts' // eslint-disable-line

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
    const page = `/${combineURL(parentPage || '', path || '')}`
    const childRoutes = generateRoutes(children || [], page)
    const hasChildRoutes = childRoutes && childRoutes.length
    return {
      path: combineURL(path),
      component: hasChildRoutes ? EmptyLayout : () => import('@/views' + page), // eslint-disable-line
      redirect: hasChildRoutes ? combineURL(page, childRoutes[0].path) : undefined,
      meta: { title: name, ...restProps },
      children: hasChildRoutes ? childRoutes : undefined
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
    const initMenus = route.children.map(({ path = '', meta = {} }) => ({
      path: `/${combineURL(path)}`,
      name: meta.title,
      icon: meta.icon
    }))
    commit('SET_MENUS', [...initMenus, ...processMenus(user.menus || [])])
  },
  generateRoute(_, user) {
    const menus = user.menus || []
    const children = [...route.children, ...generateRoutes(menus)]
    return {
      ...route,
      redirect: children && children.length ? `/${children[0].path}` : undefined,
      children
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
