import { YES_OR_NO } from '@/constants'
import { combineURL } from './url'

/**
 * 处理菜单，将菜单和按钮分离开，获取菜单信息
 * @param {*} menuAuthData
 * @returns
 */
export function getMenuData(menuAuthData) {
  menuAuthData = menuAuthData
    .filter(({ isMenu }) => isMenu === YES_OR_NO.yes)
    .map((item) => ({ ...item, title: item.title, path: item.path }))
  return menuAuthData.map((menu) => ({
    ...menu,
    children: getMenuData(menu.children || [])
  }))
}

/**
 *处理菜单权限，将菜单的 path 设置为全路径
 * @param {*} menus
 * @param {*} parentPath
 * @returns
 */
export function processMenuAuthData(menus, parentPath = '') {
  return (menus || []).map(({ path, isMenu, children }) => {
    const _path = `/${combineURL(parentPath, path || '')}`
    const _children = processMenuAuthData(children, _path)
    return {
      path: isMenu === YES_OR_NO.yes ? _path : path,
      children: !!_children && !!_children.length ? _children : undefined
    }
  })
}

/**
 * 返回权限信息
 * @param {*} menus
 * @param {*} path
 * @returns
 */
export function getAuthData(menus, path) {
  for (const menu of menus) {
    if (path === menu.path) {
      return (menu.children || []).map(({ path: auth }) => auth)
    } else if (!!menu.children && !!menu.children.length) {
      const ret = getAuthData(menu.children, path)
      if (ret) return ret
    }
  }
}
