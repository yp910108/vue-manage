import Vue from 'vue'
import store from './store'
import router from './router'

import './styles/index.scss'
import './plugins'
import './base'
import './mixins'
import './filters'
import './directives'
import './permission'

import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App)
})
