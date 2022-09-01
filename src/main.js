import Vue from 'vue'
import router from './router'

import './icons'
import './styles/index.scss'
import './plugins'
import './mixins'
import './directives'
import './permission'
import store from './store' // TODO tree-select

import App from './App'

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
