const state = {
  device: 'desktop',
  sidebarOpened: localStorage.sidebarStatus ? !!+localStorage.sidebarStatus : true
}

const mutations = {
  SET_DEVICE(_state, device) {
    _state.device = device
  },
  SET_SIDEBAR(_state, status) {
    localStorage.sidebarStatus = status
    _state.sidebarOpened = !!status
  }
}

const actions = {
  setDevice({ commit }, device) {
    commit('SET_DEVICE', device)
  },
  setSidebar({ commit }, status) {
    commit('SET_SIDEBAR', status)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
