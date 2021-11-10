import { combineURL } from '@/utils'
import { route, pageRoutes } from '@/router'
import { EmptyLayout } from '@/layouts' // eslint-disable-line

function processInitMenus(initMenus = [], parentPath = '') {
  return initMenus.map(({ path = '', meta = {}, children = [] }) => {
    const _path = `/${combineURL(parentPath, path)}`
    const _children = processInitMenus(children, _path)
    return {
      path: _path,
      name: meta.title,
      icon: meta.icon,
      children: !!_children && !!_children.length ? _children : undefined
    }
  })
}

function processMenus(menus, parentPath = '') {
  return (menus || []).map((menu) => {
    const path = `/${combineURL(parentPath, menu.path || '')}`
    const children = processMenus(menu.children, path)
    return {
      ...menu,
      path,
      children: !!children && !!children.length ? children : undefined
    }
  })
}

function generateRoutes(menus, parentPage = '') {
  return (menus || []).map(({ path, name, children, ...restProps }) => {
    const page = `/${combineURL(parentPage, path || '')}`
    const _children = generateRoutes(children, page)
    const hasChild = !!_children && !!_children.length
    return {
      path: combineURL(path),
      component: hasChild ? EmptyLayout : () => import('@/views' + page), // eslint-disable-line
      redirect: hasChild ? combineURL(page, _children[0].path) : undefined,
      meta: { title: name, ...restProps },
      children: hasChild ? _children : undefined
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
    commit('SET_MENUS', [...processInitMenus(route.children), ...processMenus(user.menus)])
  },
  generateRoute(_, user) {
    const children = [...route.children, ...generateRoutes(user.menus), ...pageRoutes]
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
