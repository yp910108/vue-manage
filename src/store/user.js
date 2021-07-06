import { login, getUser } from '@/api/user'
import { setLocalToken, removeLocalToken } from '@/utils'

const state = {
  user: {}
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
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
  // 前端 登出
  fedLogout() {
    removeLocalToken()
  },
  // 获取用户信息
  getUser({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await getUser()
        commit('SET_USER', user)
        resolve(user)
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
