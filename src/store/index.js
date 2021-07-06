import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import user from './user'
import permission from './permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  }
})

export default store
