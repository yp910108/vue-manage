import { MessageBox } from '@yp910108/y-components'
import { login, fetchUser } from '@/api'
import { setLocalToken, removeLocalToken } from '@/utils'

const state = {
  user: undefined
}

const mutations = {
  SET_USER(_state, user) {
    _state.user = user
  }
}
const actions = {
  // 登录
  login(_, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await login(data)
        setLocalToken(res.token)
        resolve(res)
      } catch (e) {
        reject(e)
      }
    })
  },
  // 前端登出
  async fedLogout(_, msg) {
    removeLocalToken()
    await MessageBox.confirm(msg || '用户信息失效，请重新登录', '提示', {
      type: 'warning',
      confirmButtonText: '确定',
      showCancelButton: false,
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false
    })
    window.location.reload()
  },
  // 获取用户信息
  async getUser({ commit }) {
    const user = (await fetchUser()) || {}
    commit('SET_USER', user)
    return user
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
