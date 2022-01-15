import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import tagsView from './tags-view'
import user from './user'
import permission from './permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    tagsView,
    user,
    permission
  }
})

export default store
