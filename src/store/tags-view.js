const state = {
  tags: [],
  views: []
}

const mutations = {
  ADD_VIEW: (_state, name) => {
    if (!_state.views.includes(name)) {
      _state.views.push(name)
    }
  },
  DELETE_VIEW(_state, name) {
    const index = _state.views.indexOf(name)
    _state.views.splice(index, 1)
  },
  DELETE_OTHER_VIEWS(_state, name) {
    _state.views = [name]
  },
  DELETE_ALL_VIEWS(_state) {
    _state.views = []
  },
  ADD_TAG: (_state, tag) => {
    if (!tag.name || !tag.meta || !tag.meta.title) return
    if (_state.tags.some((v) => v.path === tag.path)) return
    _state.tags.push(tag)
  },
  DELETE_TAG: (_state, tag) => {
    const index = _state.tags.indexOf(tag)
    _state.tags.splice(index, 1)
  },
  DELETE_OTHER_TAGS: (_state, tag) => {
    _state.tags = [tag]
  },
  DELETE_ALL_TAGS: (_state) => {
    _state.tags = []
  }
}

const actions = {
  deleteView({ commit }, route) {
    commit('DELETE_VIEW', route.name)
  },
  addTag({ commit }, route) {
    commit('ADD_VIEW', route.name)
    commit('ADD_TAG', route)
  },
  deleteTag({ commit, dispatch }, route) {
    dispatch('deleteView', route)
    commit('DELETE_TAG', route)
  },
  deleteOtherTags({ commit }, route) {
    commit('DELETE_OTHER_VIEWS', route.name)
    commit('DELETE_OTHER_TAGS', route)
  },
  deleteAllTags({ commit }) {
    commit('DELETE_ALL_VIEWS')
    commit('DELETE_ALL_TAGS')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
