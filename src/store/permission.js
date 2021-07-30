import { constantRoutes, asyncRoutes, unmatchedRoute } from '@/router'

/**
 * 如果只有一个 hidden 不为 true 的子菜单，并且路由的 alwaysShow 不为 true，则需要给父菜单设置 seq
 * @param {*} routes
 */
function setSeq(routes) {
  routes.forEach((route) => {
    const { alwaysShow, meta = {} } = route
    let { children = [] } = route
    if (children && children.length) {
      children = children.filter((child) => !child.hidden)
      if (!alwaysShow && children.length === 1) {
        const child = children[0]
        route.meta = {
          ...meta,
          seq: child.meta ? child.meta.seq : 0
        }
      }
    }
  })
}

/**
 * 对路由进行排序
 * @param routes
 */
function sortRoutes(routes) {
  routes.sort((a, b) => {
    const { meta: metaA = {} } = a
    const { meta: metaB = {} } = b
    if (metaA.seq - metaB.seq < 0) {
      return -1
    } else if (metaA.seq - metaB.seq > 0) {
      return 1
    }
    return 0
  })
  routes.forEach((route) => {
    const { children } = route
    if (children && children.length) {
      sortRoutes(children)
    }
  })
}

/**
 * 根据后台返回的菜单判断当前路由是否有权限
 * @param menus
 * @param route
 * @returns {boolean}
 */
function hasPermission(menus, route) {
  const { name, ignorePermission, meta = {} } = route
  if (ignorePermission) return true
  for (const menu of menus) {
    const { code, menuName: title, icon, seq, children } = menu
    if (code && code === name) {
      route.meta = {
        ...meta,
        title: title || meta.title,
        icon: icon || meta.icon,
        seq: seq || 0
      }
      return true
    }
    if (children && children.length) {
      const ret = hasPermission(children, route)
      if (ret) {
        return ret
      }
    }
  }
}

/**
 * 过滤异步路由表，返回符合用户角色权限的路由表
 * @param menus
 * @param routes
 */
function filterAsyncRoutes(menus, routes) {
  const ret = []
  routes.forEach((router) => {
    const temp = { ...router }
    if (hasPermission(menus, temp)) {
      ret.push(temp)
      if (temp.children) {
        temp.children = filterAsyncRoutes(menus, temp.children)
      }
    }
  })
  return ret
}

const state = {
  routes: constantRoutes,
  addRoutes: []
}

const mutations = {
  SET_ROUTES(_state, routes) {
    _state.addRoutes = [...routes, unmatchedRoute]
    _state.routes = [...constantRoutes, ...routes, unmatchedRoute]
  }
}

const actions = {
  generateRoutes({ commit }, user) {
    const { menus } = user
    const accessedRoutes = filterAsyncRoutes(menus || [], asyncRoutes)
    setSeq(accessedRoutes)
    sortRoutes(accessedRoutes)
    commit('SET_ROUTES', accessedRoutes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
