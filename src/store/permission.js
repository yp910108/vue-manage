/* eslint-disable */
import { getMenuData, combineURL, toUpperCase } from '@/utils'
import { routes } from '@/router'
import Layout from '@/layout'
import NotFound from '@/views/404'

function generateMenus(menuData, parentPath = '') {
  return (menuData || []).map(({ path, title, icon, children }) => {
    const _path = `/${combineURL(parentPath, path || '')}`
    const _children = generateMenus(children, _path)
    return { path: _path, parentPath, title, icon, children: !!_children && !!_children.length ? _children : undefined }
  })
}

function generateRoutes(originMenuData) {
  const routes = []
  const generate = (menuData, parentPageUrl = '') => {
    for (const { path, children, ...restProps } of menuData || []) {
      const pageUrl = combineURL(parentPageUrl, path || '')
      const name = pageUrl
        .split('/')
        .map((s) => toUpperCase(s))
        .join('')
      if (!!children && !!children.length) {
        generate(children, pageUrl)
      } else {
        const page = () =>
          import('@/views/' + pageUrl)
            .then((res) => {
              res.default.name = name
              return res
            })
            .catch((e) => {
              console.error(e)
              return NotFound
            })
        routes.push({ path: pageUrl, name, component: page, meta: restProps })
      }
    }
  }
  generate(originMenuData)
  return routes
}

const state = {
  menuAuthData: [],
  menus: [],
  route: {}
}

const mutations = {
  SET_MENU_AUTH_DATA(_state, menuAuthData) {
    _state.menuAuthData = menuAuthData
  },
  SET_MENUS(_state, menus) {
    _state.menus = menus
  }
}

const actions = {
  setMenus({ commit }, { menus } = {}) {
    commit('SET_MENU_AUTH_DATA', menus || [])
    const menuData = getMenuData(menus || [])
    commit('SET_MENUS', generateMenus([...routes, ...menuData]))
  },
  generateRoute({ state }, { menus } = {}) {
    const menuData = getMenuData(menus || [])
    const _routes = generateRoutes([...routes, ...menuData])
    const result = {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: _routes && _routes.length ? `/${_routes[0].path}` : undefined,
      children: _routes
    }
    state.route = result
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
